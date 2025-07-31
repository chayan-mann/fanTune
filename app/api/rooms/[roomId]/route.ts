import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

// This route is for getting all the data for a specific room

export async function GET(
    req:NextRequest,
    {params} : {params : {roomId: string}}
){
    const roomId = params.roomId;
    const session = await getServerSession(authOptions);
    const viewerId = session?.user?.id;

    if (!roomId) {
        return NextResponse.json({ message: "Room ID is required" }, { status: 400 });
    }

    const room = await prismaClient.room.findUnique({
        where: {
        id: roomId,
        },
        include: {
        // Include the queue of active streams
        streams: {
            where: { active: true },
            include: {
            _count: {
                select: { upvotes: true },
            },
            // Include the viewer's vote on each stream
            upvotes: viewerId ? { where: { userId: viewerId } } : false,
            },
            // Order the queue by the number of upvotes
            orderBy: {
            upvotes: {
                _count: "desc",
            },
            },
        },
        // You can also include the admin's public info if needed
        admin: {
            select: {
            id: true,
            name: true,
            image: true,
            },
        },
        },
    });

    if (!room) {
        return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }

    const formattedStreams = room.streams.map(({ upvotes, _count, ...rest }) => ({
        ...rest,
        upvotes: _count.upvotes,
        haveUpvoted: !!upvotes?.length,
    }));

    const response = {
        ...room,
        streams: formattedStreams,
    };

    return NextResponse.json(response);

}