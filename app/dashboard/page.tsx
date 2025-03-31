"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Play, Share2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Video {
  id: string;
  title: string;
  upvotes: number;
  downvotes: number;
  thumbnail: string;
}

export default function Component() {
  const [inputLink, setInputLink] = useState("");
  const [queue, setQueue] = useState<Video[]>([
    {
      id: "1",
      title: "Awesome Song 1",
      upvotes: 5,
      downvotes: 1,
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg", // Example YouTube thumbnail
    },
    {
      id: "2",
      title: "Cool Music Video",
      upvotes: 3,
      downvotes: 0,
      thumbnail: "https://i.ytimg.com/vi/3JZ_D3ELwOQ/hqdefault.jpg",
    },
    {
      id: "3",
      title: "Top Hit 2023",
      upvotes: 2,
      downvotes: 1,
      thumbnail: "https://i.ytimg.com/vi/V-_O7nl0Ii0/hqdefault.jpg",
    },
  ]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputLink.trim()) return;

    const newVideo: Video = {
      id: String(queue.length + 1),
      title: `New Song ${queue.length + 1}`,
      upvotes: 0,
      downvotes: 0,
      thumbnail: "https://via.placeholder.com/150", // Placeholder image for new entries
    };
    setQueue([...queue, newVideo]);
    setInputLink("");
  };

  const handleVote = (id: string, isUpvote: boolean) => {
    setQueue(
      queue
        .map((video) =>
          video.id === id
            ? {
                ...video,
                upvotes: isUpvote ? video.upvotes + 1 : video.upvotes,
                downvotes: !isUpvote ? video.downvotes + 1 : video.downvotes,
              }
            : video
        )
        .sort((a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes))
    );
  };

  const playNext = () => {
    if (queue.length > 0) {
      setCurrentVideo(queue[0]);
      setQueue(queue.slice(1));
    }
  };

  const handleShare = () => {
    const shareableLink = window.location.href;
    navigator.clipboard.writeText(shareableLink).then(
      () => {
        toast.success("Link copied to clipboard!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy link. Please try again.");
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-950 to-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-6">
        Choose the Next Song
      </h1>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-lg flex gap-3">
        <Input
          type="text"
          placeholder="Paste YouTube video link..."
          value={inputLink}
          onChange={(e) => setInputLink(e.target.value)}
          className="flex-1 bg-gray-900 border-gray-800 text-white placeholder-gray-500 focus:ring-purple-500"
        />
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
        >
          Add to Queue
        </Button>
      </form>

      {/* Now Playing Section */}
      <div className="mt-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold">Now Playing</h2>
        <Card className="bg-gray-900 border-gray-800 mt-4">
          <CardContent className="p-4">
            {currentVideo ? (
              <>
                <img
                  src={currentVideo.thumbnail}
                  alt="Current video"
                  className="w-full h-72 object-cover rounded"
                />
                <p className="mt-2 text-center font-semibold">{currentVideo.title}</p>
              </>
            ) : (
              <p className="text-center py-8 text-gray-400">No video playing</p>
            )}
          </CardContent>
        </Card>
        <Button onClick={playNext} className="w-full bg-purple-700 hover:bg-purple-800 text-white mt-4">
          <Play className="mr-2 h-4 w-4" /> Play Next
        </Button>
      </div>

      {/* Queue Section with Thumbnails */}
      <div className="mt-10 w-full max-w-2xl">
        <h2 className="text-2xl font-bold">Upcoming Songs</h2>
        <div className="space-y-4 mt-4">
          {queue.map((video) => (
            <Card key={video.id} className="bg-gray-900 border-gray-800 text-white">
              <CardContent className="p-4 flex items-center gap-4">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-40 h-25 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-lg font-semibold">{video.title}</p>
                  <div className="flex items-center space-x-3 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVote(video.id, true)}
                      className="flex items-center space-x-1 bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{video.upvotes}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVote(video.id, false)}
                      className="flex items-center space-x-1 bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                    >
                      <ThumbsDown className="h-4 w-4" />
                      <span>{video.downvotes}</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Share Button */}
      <Button onClick={handleShare} className="mt-6  bg-purple-700 hover:bg-purple-800 text-white">
        <Share2 className="mr-2 h-4 w-4" /> Share Voting Page
      </Button>

      <ToastContainer theme="dark" />
    </div>
  );
}
