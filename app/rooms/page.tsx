import { prismaClient } from "@/app/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Music} from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { Role } from "@prisma/client";
import { CreateRoomButton } from "../components/CreateRoomButton";
import { DeleteRoomButton } from "../components/DeleteRoomButton";
import Image from "next/image";

export const dynamic = 'force-dynamic'

async function getRooms() {
  const rooms = await prismaClient.room.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      admin: { select: { name: true, image: true } },
      _count: { select: { streams: true } },
    },
  });
  return rooms;
}

async function getUser() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return null;

    const user = await prismaClient.user.findUnique({
        where: { id: session.user.id },
        select: { role: true },
    });
    return user;
}

export default async function RoomsPage() {
  const rooms = await getRooms();
  const user = await getUser();
  const isAdmin = user?.role === Role.Admin;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white relative overflow-hidden p-6 pt-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
              <Music className="w-8 h-8" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Join a Room
            </h1>
          </div>
          <p className="text-xl text-gray-300 font-light">
            Select a room to start listening and voting with the community.
          </p>
        </div>
        
        {isAdmin && (
            <div className="mb-8 flex justify-center">
                <CreateRoomButton />
            </div>
        )}

        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <Link href={`/rooms/${room.id}`} key={room.id} className="group">
                <Card className="h-full bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-500/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold text-white truncate group-hover:text-purple-400 transition-colors">
                        {room.name}
                      </CardTitle>
                        {isAdmin && (
                          <DeleteRoomButton roomId={room.id} />
                        )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      
                      <Image
                        src = {room.admin.image ?? '/images/default-avatar.png'}
                        alt = {room.admin.name ?? 'Admin'}
                        className="h-10 w-10 rounded-full border-2 border-gray-700"
                        width={40}
                        height = {40}
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
          <div className="text-center py-16 px-6 rounded-2xl border-2 border-dashed border-slate-800 bg-slate-900/40">
            <div className="p-4 bg-slate-700/30 rounded-full w-fit mx-auto mb-4">
                <Music className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">No Rooms Available</h2>
            <p className="mt-2 text-gray-500">
              It looks like no one is streaming right now.
              {isAdmin ? " Why don't you create one?" : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
