"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Play, Share2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import LiteYoutubeEmbed from 'react-lite-youtube-embed';
// import 'react-lite-youtube-embed/dist/LiteYoutubeEmbed.css'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import { YT_REGEX } from "../lib/utils";

interface Video {
  "id": string;
  "type" : string,
  "url" : string,
  "extractedId" : string,
  "title": string,
  "smallImg": string,
  "bigImg" : string,
  "active" : boolean,
  "userId" : string,
  "upvotes" : number,
  "haveUpvoted" : boolean
}

const REFRESH_INTERVAL_MS = 10 * 1000;

export default function Component() {
  const [inputLink, setInputLink] = useState("");
  const [queue, setQueue] = useState<Video[]>([])
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);


  async function refreshStreams(){
    const res = await fetch(`api/streams/my`,{
      credentials: "include"
    });
    const json = await res.json();
    setQueue(json.streams);
  }

  useEffect(()=>{
    refreshStreams();
    const interval = setInterval(()=>{

    }, REFRESH_INTERVAL_MS)
    }, [])


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputLink.trim()) return;

    const newVideo: Video = {
      id: String(queue.length + 1),
      title: `New Song ${queue.length + 1}`,
      upvotes: 0,
    };
    setQueue([...queue, newVideo]);
    setInputLink('');
  };

  const handleVote = (id: string, isUpvote: boolean) => {
    setQueue(
      queue
        .map((video) =>
          video.id === id
            ? {
                ...video,
                upvotes: isUpvote ? video.upvotes + 1 : video.upvotes-1,
                haveUpvoted : !video.haveUpvoted
              }
            : video
        )
        .sort((a, b) => b.upvotes - (a.upvotes))
    );
    fetch(`/api/streams/${isUpvote ? "upvote" : "downvote"}`, {
      method : "POST",
      body: JSON.stringify({
        streamId : id
      })
    })
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
        <Button onClick={() =>{
          fetch("api/streams", {
            method : "POST",
            body: JSON.stringify({
              creatorId : "creatorId" ,
              url : inputLink
            })
          })
        }}
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
        >
          Add to Queue
        </Button>
      </form>

      {inputLink && YT_REGEX.test(inputLink) && (
        <Card className="bg-gray-900 border-gray-800 mt-6 w-full max-w-2xl">
          <CardContent className="p-4">
            <LiteYoutubeEmbed
              id={inputLink.match(YT_REGEX)?.[1] || ""}
              title="Video Preview"
            />
            <p className="mt-2 text-center text-gray-400">Video Preview</p>
          </CardContent>
        </Card>
      )}


      {/* Now Playing Section */}
      <div className="mt-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold">Now Playing</h2>
        <Card className="bg-gray-900 border-gray-800 mt-4">
          <CardContent className="p-4">
            {currentVideo ? (
              <>
                <img
                  src={currentVideo.bigImg}
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
                  src={video.bigImg}
                  alt={video.title}
                  className="w-40 h-25 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-lg font-semibold">{video.title}</p>
                  <div className="flex items-center space-x-3 mt-2">
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVote(video.id, video.haveUpvoted? false: true)}
                      className="flex items-center space-x-1 bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                    >
                      {video.haveUpvoted ? <ThumbsDown className="h-4 w-4" /> : <ThumbsUp className="h-4 w-4" />}
                      <span>{video.upvotes}</span>
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
