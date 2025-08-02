import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/db";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ streamId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  const {streamId} = await context.params;
  const userId = session.user.id;

  try {
    const stream = await prismaClient.stream.findUnique({
      where: { id: streamId },
      include: { room: true },
    });

    if (!stream) {
      return NextResponse.json({ message: "Stream not found" }, { status: 404 });
    }

    if (stream.room.adminId !== userId) {
      return NextResponse.json({ message: "Forbidden: Only the room admin can delete songs." }, { status: 403 });
    }

    await prismaClient.stream.delete({
      where: { id: streamId },
    });

    return NextResponse.json({ message: "Stream deleted successfully." });

  } catch (error) {
    console.error("Delete stream error:", error);
    return NextResponse.json({ message: "An unexpected error occurred." }, { status: 500 });
  }
}
