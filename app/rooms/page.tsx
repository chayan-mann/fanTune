
import { prismaClient } from "@/app/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import Link from "next/link";

async function getRooms() {
  const rooms = await prismaClient.room.findMany({
    // Fetch the most recently created rooms first
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      // Include the admin's public info to display on the card
      admin: {
        select: {
          name: true,
          image: true,
        },
      },
      // We can also include a count of how many songs are in the queue
      _count: {
        select: { streams: true },
      },
    },
  });
  return rooms;
}

export default async function RoomsPage() {
  const rooms = await getRooms();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white p-6 pt-24">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Join a Room
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Select a room below to start listening and voting with the community.
          </p>
        </div>

        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <Link href={`/rooms/${room.id}`} key={room.id} className="group">
                <Card className="h-full border-gray-800 bg-black hover:border-purple-500/50 transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-white truncate group-hover:text-purple-400 transition-colors">
                      {room.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={room.admin.image ?? '/images/default-avatar.png'}
                        alt={room.admin.name ?? 'Admin'}
                        className="h-10 w-10 rounded-full border-2 border-gray-700"
                      />
                      <div>
                        <p className="text-sm text-gray-400">Hosted by</p>
                        <p className="font-semibold text-white truncate">
                          {room.admin.name ?? 'Admin'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm pt-4 border-t border-gray-800">
                      <Users className="h-4 w-4" />
                      <span>{room._count.streams} songs in queue</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 rounded-lg border-2 border-dashed border-gray-800">
            <h2 className="text-2xl font-semibold text-white">No Rooms Available</h2>
            <p className="mt-2 text-gray-500">
              It looks like there are no active rooms right now. Admins can create one from their dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
