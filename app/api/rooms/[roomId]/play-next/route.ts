import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/db";
import { Role } from "@prisma/client";

export async function POST(
  req: NextRequest,
  // The `params` object is now a Promise
  context: { params: Promise<{ roomId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }
  const {roomId} = await context.params

  const room = await prismaClient.room.findUnique({
    where: { id: roomId },
  });

  if (room?.adminId !== session.user.id) {
    return NextResponse.json({ message: "Forbidden: Only the admin can perform this action." }, { status: 403 });
  }

  try {
    const mostUpvotedStream = await prismaClient.stream.findFirst({
      where: {
        roomId: roomId,
        active: true,
      },
      orderBy: {
        upvotes: {
          _count: 'desc',
        },
      },
    });

    if (!mostUpvotedStream) {
      await prismaClient.room.update({
        where: { id: roomId },
        data: { currentStreamId: null },
      });
      return NextResponse.json({ message: "Queue is empty" }, { status: 404 });
    }

    await prismaClient.$transaction([
      prismaClient.room.update({
        where: { id: roomId },
        data: { currentStreamId: mostUpvotedStream.id },
      }),
      prismaClient.stream.update({
        where: { id: mostUpvotedStream.id },
        data: { active: false },
      }),
    ]);

    return NextResponse.json({ stream: mostUpvotedStream });
    
  } catch (error) {
    console.error("Play next error:", error);
    return NextResponse.json({ message: "An unexpected error occurred." }, { status: 500 });
  }
}