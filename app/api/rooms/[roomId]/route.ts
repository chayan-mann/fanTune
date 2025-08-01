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


// controller to delete the room 
export async function DELETE(req: NextRequest, {params} : {params : {roomId: string}}){

    const session = await getServerSession(authOptions);
    if(!session?.user?.id){
        return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const roomId = params.roomId;
    const userId = session.user.id;

    try{
        const room = await prismaClient.room.findUnique({
            where : {id : roomId},
        });
        
        if(!room){
            return NextResponse.json({message : "Room not found"}, {status : 404});
        }

        if (room.adminId !== userId) {
            return NextResponse.json({ message: "Forbidden: Only the room admin can delete this room." }, { status: 403 });
        }

        await prismaClient.room.delete({
            where: { id: roomId },
        });

        return NextResponse.json({ message: "Room deleted successfully." });
    } catch(error){
        console.log("Delete room error:", error);
        return NextResponse.json({ message: "An unexpected error occurred." }, { status: 500 });
    }
}