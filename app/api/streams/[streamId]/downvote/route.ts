import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/db";

export async function POST(
  req: NextRequest,
  context: { params: { streamId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  const streamId = context.params.streamId;
  const userId = session.user.id;

  try {
    await prismaClient.upvote.delete({
      where: {
        userId_streamId: {
          userId: userId,
          streamId: streamId,
        },
      },
    });

    return NextResponse.json({ message: "Downvoted successfully" });

  } catch (error) {
    console.error("Downvote error:", error);
    return NextResponse.json({ message: "An unexpected error occurred." }, { status: 500 });
  }
}