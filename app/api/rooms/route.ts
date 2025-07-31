import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/db";
import { z } from "zod";
import { Role } from "@prisma/client";

const createRoomSchema = z.object({
  name: z.string().min(3, "Room name must be at least 3 characters long."),
});

// This route is for creating a new room
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  const user = await prismaClient.user.findUnique({
    where :{
        id: session.user.id
    },
  })

  
  if(user?.role !== Role.Admin){
    return NextResponse.json({ message: "Forbidden: Only admins can create rooms." }, { status: 403 });
  }

  
  try {
    const body = await req.json();
    const { name } = createRoomSchema.parse(body);

    const newRoom = await prismaClient.room.create({
      data: {
        name: name,
        adminId: session.user.id,
      },
    });

    return NextResponse.json(newRoom, { status: 201 });

  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ message: e.errors[0].message }, { status: 400 });
    }
    console.error(e);
    return NextResponse.json({ message: "An unexpected error occurred." }, { status: 500 });
  }
}