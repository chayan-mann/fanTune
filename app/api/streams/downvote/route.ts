import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/app/lib/auth"; 
import { Prisma } from "@prisma/client"; 

const DownvoteSchema = z.object({
  streamId: z.string().uuid("Invalid Stream ID format"),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 403 }
    );
  }

  try {
    const data = DownvoteSchema.parse(await req.json());

    await prismaClient.upvote.delete({
      where: {
        userId_streamId: {
          userId: userId,
          streamId: data.streamId,
        },
      },
    });

    return NextResponse.json({ message: "Vote removed successfully!" });

  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ message: e.errors[0].message }, { status: 400 });
    }
    
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2025') {
        return NextResponse.json(
          { message: "You have not upvoted this stream." },
          { status: 404 } // 404 Not Found 
        );
      }
    }

    console.error(e); 
    return NextResponse.json(
      { message: "An error occurred while removing the vote." },
      { status: 500 }
    );
  }
}