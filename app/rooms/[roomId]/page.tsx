import StreamView from "@/app/components/StreamView";
import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// This is a Server Component, so we can fetch data directly from the database
// for better performance, instead of calling our own API route.
async function getRoomData(roomId: string) {
    const session = await getServerSession(authOptions);
    const viewerId = session?.user?.id;

    const room = await prismaClient.room.findUnique({
        where: { id: roomId },
        include: {
            streams: {
                where: { active: true },
                include: {
                    _count: { select: { upvotes: true } },
                    upvotes: viewerId ? { where: { userId: viewerId } } : false,
                },
                orderBy: { upvotes: { _count: "desc" } },
            },
            admin: {
                select: { id: true, name: true, image: true },
            },
        },
    });

    if (!room) {
        return null;
    }

    // Format the streams data exactly as the StreamView component expects it
    const formattedStreams = room.streams.map(({ upvotes, _count, ...rest }) => ({
        ...rest,
        upvotes: _count.upvotes,
        haveUpvoted: !!(upvotes && upvotes.length > 0),
    }));

    return { ...room, streams: formattedStreams };
}

// Define the props type for Next.js 15+
type Props = {
  params: Promise<{ roomId: string }>;
};

export default async function RoomPage({ params }: Props) {
  // 1. Get the unique roomId from the URL
  const { roomId } = await params;
  
  // 2. Fetch the data for ONLY this room
  const roomData = await getRoomData(roomId);

  // 3. Handle the case where the room doesn't exist
  if (!roomData) {
      return (
          <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white flex items-center justify-center text-center p-4">
              <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">404</h1>
                  <h2 className="mt-4 text-3xl font-semibold text-white">Room Not Found</h2>
                  <p className="mt-2 text-gray-400">The room you are looking for does not exist or may have been deleted.</p>
                  <Button asChild className="mt-8 bg-purple-600 hover:bg-purple-700">
                    <Link href="/rooms">
                      Back to Rooms
                    </Link>
                  </Button>
              </div>
          </div>
      );
  }

  // 4. Pass the room-specific data to your StreamView component
  return (
    <div>
      <StreamView initialRoomData={roomData} />
    </div>
  );
}
