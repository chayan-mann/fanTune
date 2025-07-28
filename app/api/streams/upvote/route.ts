import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client"; 
import { authOptions } from "@/app/lib/auth"; 


const UpvoteSchema = z.object({
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
    const data = UpvoteSchema.parse(await req.json());

    await prismaClient.upvote.create({
      data: {
        userId: userId,
        streamId: data.streamId,
      },
    });

    return NextResponse.json({ message: "Upvoted successfully!" });

  } catch (e) {
    if (e instanceof z.ZodError) {
        return NextResponse.json({ message: e.errors[0].message }, { status: 400 });
    }
    
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return NextResponse.json(
          { message: "You have already upvoted this stream." },
          { status: 409 } 
        );
      }
    }

    console.error(e);
    return NextResponse.json(
      { message: "An error occurred while upvoting." },
      { status: 500 }
    );
  }
}