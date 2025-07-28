import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { z } from "zod";
import { prismaClient } from "@/app/lib/db";
import { YT_REGEX } from "@/app/lib/utils";
import getVideoId from "get-video-id";
//@ts-ignore
import youtubesearchapi from "youtube-search-api";

const CreateStreamSchema = z.object({
    url: z.string().regex(YT_REGEX, { message: "Invalid YouTube URL format" })
});

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ message: "Unauthenticated" }, { status: 403 });
    }
    const creatorId = session.user.id; // creator ID

    try {
        const body = await req.json();
        const data = CreateStreamSchema.parse(body);

        const { id: extractedId } = getVideoId(data.url);
        if (!extractedId) {
            return NextResponse.json({ message: "Invalid YouTube URL" }, { status: 400 });
        }

        const res = await youtubesearchapi.GetVideoDetails(extractedId);
        if (!res?.thumbnail?.thumbnails) {
            return NextResponse.json({ message: "Failed to fetch video details" }, { status: 400 });
        }
        
        const thumbnails = res.thumbnail.thumbnails.sort((a: {width:number}, b:{width:number}) => a.width - b.width);

        const stream = await prismaClient.stream.create({
            data: {
                userId: creatorId, 
                url: data.url,
                extractedId,
                type: "Youtube",
                title: res.title ?? "Title not available",
                smallImg: thumbnails[thumbnails.length > 1 ? thumbnails.length - 2 : thumbnails.length - 1]?.url ?? "",
                bigImg: thumbnails[thumbnails.length - 1]?.url ?? ""
            }
        });

        return NextResponse.json({
            ...stream,
            hasUpvoted: false,
            upvotes: 0
        });

    } catch (e) {
        if (e instanceof z.ZodError) {
            return NextResponse.json({ message: e.errors[0].message }, { status: 400 });
        }
        console.error(e);
        return NextResponse.json({ message: "Error while adding a stream" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    if (!creatorId) {
        return NextResponse.json({ message: "Creator ID is required" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    const viewerId = session?.user?.id; 

    const streams = await prismaClient.stream.findMany({
        where: {
            userId: creatorId,
            active: true
        },
        include: {
            _count: {
                select: {
                    upvotes: true
                }
            },
            upvotes: viewerId ? {
                where: {
                    userId: viewerId
                }
            } : false
        }
    });

    const response = streams.map(({ upvotes, _count, ...rest }) => ({
        ...rest,
        upvotes: _count.upvotes,
        haveUpvoted: !!upvotes?.length
    }));

    return NextResponse.json({
        streams: response
    });
}