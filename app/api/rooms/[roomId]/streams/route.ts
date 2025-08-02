
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { z } from "zod";
import { prismaClient } from "@/app/lib/db";
import { YT_REGEX } from "@/app/lib/utils";
import getVideoId from "get-video-id";
import { google } from "googleapis";

const CreateStreamSchema = z.object({
    url: z.string().regex(YT_REGEX, { message: "Invalid YouTube URL format" })
});

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

export async function POST(
    req: NextRequest,
    context: { params: Promise<{ roomId: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const {roomId} = await context.params
    if (!roomId) {
        return NextResponse.json({ message: "Room ID is required" }, { status: 400 });
    }

    try {
        const body = await req.json();
        const { url } = CreateStreamSchema.parse(body);

        const { id: extractedId } = getVideoId(url);
        if (!extractedId) {
            return NextResponse.json({ message: "Invalid YouTube URL" }, { status: 400 });
        }

        const response = await youtube.videos.list({
            part: ['snippet'],
            id: [extractedId],
        });

        const video = response.data.items?.[0];

        if (!video || !video.snippet || !video.snippet.thumbnails) {
            return NextResponse.json({ message: "Failed to fetch video details" }, { status: 404 });
        }
        
        const thumbnails = video.snippet.thumbnails;

        const newStream = await prismaClient.stream.create({
            data: {
                roomId: roomId,
                userId: session.user.id, // The user who submitted the song
                url: url,
                extractedId,
                type: "Youtube",
                title: video.snippet.title ?? "Title not available",
                smallImg: thumbnails.medium?.url ?? thumbnails.default?.url ?? "",
                bigImg: thumbnails.maxres?.url ?? thumbnails.high?.url ?? thumbnails.standard?.url ?? "",
            }
        });

        return NextResponse.json(newStream, { status: 201 });

    } catch (e) {
        if (e instanceof z.ZodError) {
            return NextResponse.json({ message: e.errors[0].message }, { status: 400 });
        }
        console.error("Error adding stream to room:", e);
        return NextResponse.json({ message: "An unexpected error occurred." }, { status: 500 });
    }
}
