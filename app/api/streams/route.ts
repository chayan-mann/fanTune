import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth"; 
import { z } from "zod";
import { prismaClient } from "@/app/lib/db";
import { YT_REGEX } from "@/app/lib/utils";
import getVideoId from "get-video-id";
// import youtubesearchapi from "youtube-search-api";

const CreateStreamSchema = z.object({
    url: z.string().regex(YT_REGEX, { message: "Invalid YouTube URL format" })
});

export async function POST(req: NextRequest) {
    console.log("Received POST request to /api/streams"); // Initial log

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ message: "Unauthenticated" }, { status: 403 });
    }
    const creatorId = session.user.id; // creator ID

    try {

        const body = await req.json();
        console.log("Request body received:", body); // Log the incoming data

        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const youtubesearchapi = require("youtube-search-api");

        const data = CreateStreamSchema.parse(body);
        console.log("Zod parsing successful.");

        const { id: extractedId } = getVideoId(data.url);
        if (!extractedId) {
            console.log("Could not extract video ID from URL:", data.url);
            return NextResponse.json({ message: "Invalid YouTube URL" }, { status: 400 });
        }
        // Set the API key before making the request
        youtubesearchapi.SetKey(process.env.YOUTUBE_API_KEY);


        const res = await youtubesearchapi.GetVideoDetails(extractedId);
        if (!res || !res?.thumbnail?.thumbnails) {
            console.error("YouTube API response was invalid:", res);
            return NextResponse.json({ message: "Failed to fetch video details from YouTube" }, { status: 502 });
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
            console.error("Zod validation failed:", e.errors);
            return NextResponse.json({ message: e.errors[0].message }, { status: 400 });
        }
        console.error("An unexpected error occurred in POST /api/streams:", e);
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