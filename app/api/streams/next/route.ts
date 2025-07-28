import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ message: "Unauthenticated" }, { status: 403 });
    }

    const mostUpvotedStream = await prismaClient.stream.findFirst({
        where: {
            userId: userId,
            active: true
        },
        orderBy: {
            upvotes: {
                _count: 'desc'
            }
        }
    });

    if (!mostUpvotedStream) {
        await prismaClient.currentStream.upsert({
            where: { userId: userId },
            update: { streamId: null },
            create: { userId: userId, streamId: null },
        });
        return NextResponse.json({ stream: null, message: "Queue is empty." });
    }

    const [updatedCurrentStream, deactivatedStream] = await prismaClient.$transaction([
        prismaClient.currentStream.upsert({
            where: {
                userId: userId
            },
            update: {
                streamId: mostUpvotedStream.id
            },
            create: {
                userId: userId,
                streamId: mostUpvotedStream.id
            }
        }),

        prismaClient.stream.update({
            where: {
                id: mostUpvotedStream.id
            },
            data: {
                active: false 
            }
        })
    ]);

    return NextResponse.json({
        stream: mostUpvotedStream
    });
}