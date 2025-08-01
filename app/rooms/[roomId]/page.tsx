import StreamView from "@/app/components/StreamView";
import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

    // If a current stream ID exists, fetch the full stream object
    let currentStreamData = null;
    if (room.currentStreamId) {
        // Fetch the current stream with its upvote data
        const currentStream = await prismaClient.stream.findUnique({
            where: { id: room.currentStreamId },
            include: {
                _count: { select: { upvotes: true } },
                upvotes: viewerId ? { where: { userId: viewerId } } : false,
            }
        });

        // Format the current stream to match the Video interface
        if (currentStream) {
            const { _count, upvotes, ...rest } = currentStream;
            currentStreamData = {
                ...rest,
                upvotes: _count.upvotes,
                haveUpvoted: !!(upvotes && upvotes.length > 0),
            };
        }
    }

    const formattedStreams = room.streams.map(({ upvotes, _count, ...rest }) => ({
        ...rest,
        upvotes: _count.upvotes,
        haveUpvoted: !!(upvotes && upvotes.length > 0),
    }));

    return { ...room, streams: formattedStreams, currentStream : currentStreamData };
}

type Props = {
  params: Promise<{ roomId: string }>;
};

export default async function RoomPage({ params }: Props) {
  // Get the unique roomId from the URL
  const { roomId } = await params;
  
  // Fetch the data for ONLY this room
  const roomData = await getRoomData(roomId);

  // Handle the case where the room doesn't exist
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

  // Pass the room-specific data to your StreamView component
  return (
    <div>
      <StreamView initialRoomData={roomData} />
    </div>
  );
}
