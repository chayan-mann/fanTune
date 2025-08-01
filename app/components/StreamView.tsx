"use client"

import { useEffect, useState, useCallback } from "react"
import type React from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import YouTube from "react-youtube"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Play, Share2, Music, Users, Clock, Zap, Trash2 } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { YT_REGEX } from "../lib/utils"

interface Room {
  id: string;
  name: string;
  admin: { id: string; name: string | null; image: string | null; };
  streams: Video[];
  currentStream: Video | null; 

}

interface Video {
  id: string
  url: string
  extractedId: string
  title: string
  smallImg: string
  upvotes: number
  haveUpvoted: boolean
}

// Main component that receives initial room data
export default function StreamView({ initialRoomData }: { initialRoomData: Room }) {
  const { data: session } = useSession();
  const [inputLink, setInputLink] = useState("")
  const [room, setRoom] = useState<Room>(initialRoomData);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(initialRoomData.currentStream || null);


  // Determine if the current user is the admin of this room
  const isAdmin = session?.user?.id === room.admin.id;

  // A single function to refresh all room data from the server
  const refreshRoomData = useCallback(async () => {
    try {
      const res = await fetch(`/api/rooms/${room.id}`);
      if (!res.ok) throw new Error("Failed to fetch room data");
      const updatedRoomData: Room = await res.json();
      setRoom(updatedRoomData);
    } catch (error) {
      console.error(error);
      toast.error("Could not refresh the queue.");
    }
  }, [room.id]);

  // Effect to handle polling (will be replaced by real-time subscription)
  useEffect(() => {
    const interval = setInterval(() => {
      refreshRoomData();
    }, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, [refreshRoomData]);

  // Function for the admin to play the next video
  const playNextVideo = async () => {
    if (!isAdmin) {
      toast.error("Only the admin can play the next song.");
      return;
    }
    try {
      const res = await fetch(`/api/rooms/${room.id}/play-next`, { method: "POST" });
      if (!res.ok) {
        setCurrentVideo(null);
        toast.info("The queue is empty!");
        return;
      }
      const { stream } = await res.json();
      setCurrentVideo(stream);
      await refreshRoomData();
    } catch (error) {
      console.error("Failed to play next video:", error);
      setCurrentVideo(null);
    }
  };

  // Function for any user to add a song to the current room
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputLink.trim() || !YT_REGEX.test(inputLink)) {
      toast.error("Please enter a valid YouTube link.");
      return;
    }
    try {
      const res = await fetch(`/api/rooms/${room.id}/streams`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: inputLink }),
      });
      if (!res.ok) throw new Error("Failed to add video.");
      toast.success("Video added to the queue!");
      setInputLink("");
      await refreshRoomData();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the video.");
    }
  };

  // Function for any user to vote on a song
  const handleVote = async (videoId: string, isUpvote: boolean) => {
    try {
      const endpoint = isUpvote ? "upvote" : "downvote";
      const res = await fetch(`/api/streams/${videoId}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ streamId: videoId }),
      });
      if (!res.ok) throw new Error("Vote failed.");
      await refreshRoomData();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while voting.");
    }
  };
  
  // Function for the admin to delete a song
  const handleDelete = async (streamId: string) => {
    if (!isAdmin) return;
    try {
        const res = await fetch(`/api/streams/${streamId}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete stream');
        toast.success('Song removed from queue.');
        await refreshRoomData();
    } catch (error) {
        console.error(error);
        toast.error('Failed to remove song.');
    }
  };


  const handleVideoEnd = () => {
    if (isAdmin) {
      playNextVideo();
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => toast.success("Link copied to clipboard!"),
      (err) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy link.");
      },
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
              <Music className="w-8 h-8" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {room.name}
            </h1>
          </div>
          <p className="text-xl text-gray-300 font-light">Let the community choose the next song</p>
        </div>

        {/* Add Song Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSubmit} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="🎵 Paste your YouTube link here..."
                  value={inputLink}
                  onChange={(e) => setInputLink(e.target.value)}
                  className="flex-1 bg-slate-800/50 border-slate-600/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent rounded-xl h-12 text-lg"
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-xl px-8 h-12 font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Add Song
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column: Player */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <h2 className="text-3xl font-bold text-white">Now Playing</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
            </div>

            <Card className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="aspect-video relative">
                  {currentVideo ? (
                    <>
                      <YouTube
                        videoId={currentVideo.extractedId}
                        opts={{ height: "100%", width: "100%", playerVars: { autoplay: 1 } }}
                        onEnd={handleVideoEnd}
                        className="w-full h-full rounded-t-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none"></div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-800 to-slate-900 text-gray-400">
                      <div className="p-6 bg-slate-700/50 rounded-full mb-4">
                        <Music className="w-12 h-12" />
                      </div>
                      <p className="text-xl font-medium">No song playing</p>
                      <p className="text-sm text-gray-500 mt-2">{isAdmin ? "Click 'Play Next' to start the party!" : "Waiting for the admin to play a song."}</p>
                    </div>
                  )}
                </div>
                {currentVideo && (
                  <div className="p-6 bg-gradient-to-r from-slate-800/80 to-slate-900/80">
                    <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">{currentVideo.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>Community Choice</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {isAdmin && (
              <Button
                onClick={playNextVideo}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-14 rounded-xl font-semibold text-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300"
              >
                <Play className="mr-3 h-6 w-6" />
                Play Next Song
              </Button>
            )}
          </div>

          {/* Right Column: Queue */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-purple-400" />
              <h2 className="text-3xl font-bold text-white">Up Next</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
              <span className="text-sm text-gray-400 bg-slate-800/50 px-3 py-1 rounded-full">{room.streams.length} songs</span>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {room.streams.length === 0 ? (
                <Card className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-xl">
                  <CardContent className="p-8 text-center">
                    <div className="p-4 bg-slate-700/30 rounded-full w-fit mx-auto mb-4">
                      <Music className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-400 text-lg">Queue is empty</p>
                    <p className="text-gray-500 text-sm mt-2">Add some songs to get the party started!</p>
                  </CardContent>
                </Card>
              ) : (
                room.streams.map((video, index) => (
                  <Card
                    key={video.id}
                    className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-xl hover:bg-slate-800/50 transition-all duration-300 group"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          
                          <Image
                            src = {video.smallImg || "/placeholder.svg"}
                            alt = {video.title}
                            className="relative w-20 h-14 object-cover rounded-lg shadow-lg"
                            width={40}
                            height = {40}
                          />

                          <div className="absolute top-1 left-1 bg-slate-900/80 text-white text-xs px-2 py-1 rounded">
                            #{index + 1}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white text-sm line-clamp-2 mb-2 group-hover:text-purple-300 transition-colors">
                            {video.title}
                          </h3>
                          <div className="flex items-center justify-between">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleVote(video.id, !video.haveUpvoted)}
                              className={`flex items-center gap-2 rounded-lg border-slate-600/50 transition-all duration-300 ${
                                video.haveUpvoted
                                  ? "bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                                  : "bg-green-500/20 border-green-500/50 text-green-400 hover:bg-green-500/30"
                              }`}
                            >
                              {video.haveUpvoted ? <ThumbsDown className="h-4 w-4" /> : <ThumbsUp className="h-4 w-4" />}
                              <span className="font-semibold">{video.upvotes}</span>
                            </Button>
                            {isAdmin && (
                                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-500" onClick={() => handleDelete(video.id)}>
                                    <Trash2 className="h-4 w-4"/>
                                </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={handleShare}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-700/50 text-white rounded-xl px-8 py-3 font-semibold shadow-lg hover:shadow-slate-500/25 transition-all duration-300"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share This Room
          </Button>
        </div>
      </div>

      <ToastContainer
        theme="dark"
        position="bottom-right"
        autoClose={3000}
        toastClassName="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50"
      />
    </div>
  )
}
