// "use client";

// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Card, CardContent } from '@/components/ui/card'
// import { ThumbsUp, ThumbsDown, Play, Share2 } from "lucide-react"
// import { toast, ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// interface Video {
//   id: string;
//   title: string;
//   upvotes: number;
//   downvotes: number;
// }

// export default function Component() {
//   const [inputLink, setInputLink] = useState('')
//   const [queue, setQueue] = useState<Video[]>([
//     { id: '1', title: 'Awesome Song 1', upvotes: 5, downvotes: 1 },
//     { id: '2', title: 'Cool Music Video', upvotes: 3, downvotes: 0 },
//     { id: '3', title: 'Top Hit 2023', upvotes: 2, downvotes: 1 },
//   ])
//   const [currentVideo, setCurrentVideo] = useState<Video | null>(null)

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newVideo: Video = {
//         id : String(queue.length+1),
//         title : `New Song ${queue.length+1}`,
//         upvotes:0,
//         downvotes: 0
//     }
//     setQueue([...queue, newVideo])
//     setInputLink('')

//   const handleVote = (id: string, isUpvote: boolean) => {
//     setQueue(queue.map(video =>
//       video.id === id
//       ? {
//           ...video,
//           upvotes: isUpvote ? video.upvotes + 1 : video.upvotes,
//           downvotes: !isUpvote ? video.downvotes + 1 : video.downvotes
//         }
//       : video
//     ).sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)))
//   }

//   const playNext = () => {
//     if (queue.length > 0) {
//       setCurrentVideo(queue[0])
//       setQueue(queue.slice(1))
//     }
//   }

//   const handleShare = () => {
//     const shareableLink = window.location.href
//     navigator.clipboard.writeText(shareableLink).then(() => {
//       toast.success('Link copied to clipboard!', {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       })
//     }, (err) => {
//       console.error('Could not copy text: ', err)
//       toast.error('Failed to copy link. Please try again.', {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,

//         <Card className="bg-gray-900 border-gray-800">
//   <CardContent className="p-4">
//     <img
//       src="/placeholder.svg?height=200&width=320"
//       alt="Video preview"
//       className="w-full h-48 object-cover rounded"
//     />
//     <p className="mt-2 text-center text-gray-400">Video Preview</p>
//   </CardContent>
// </Card>
// ))}

// <div className="space-y-4">
//   <h2 className="text-2xl font-bold text-white">Now Playing</h2>
//   <Card className="bg-gray-900 border-gray-800">
//     <CardContent className="p-4">
//       {currentVideo ? (
//         <>
//           <img
//             src="/placeholder.svg?height=360&width=640"
//             alt="Current video"
//             className="w-full h-72 object-cover rounded"
//           />
//           <p className="mt-2 text-center font-semibold text-white">{currentVideo.title}</p>
//         </>
//       ) : (
//         <p className="text-center py-8 text-gray-400">No video playing</p>
//       )}
//     </CardContent>
//   </Card>
//   <Button onClick={playNext} className="w-full bg-purple-700 hover:bg-purple-800 text-white">
//     Play className="mr-2 h-4 w-4" /> Play Next
//   </Button>
// </div>

//         <span>{video.upvotes}</span>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => handleVote(video.id, false)}
//           className="flex items-center space-x-1 bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
//         >
//           <ThumbsDown className="h-4 w-4" />
//           <span>{video.downvotes}</span>
//         </Button>
//       </div>
//     </CardContent>
//     </Card>
//     ))}
//     </div>
//     <ToastContainer
//       position="top-right"
//       autoClose={3000}
//       hideProgressBar={false}
//       newestOnTop={false}
//       closeOnClick
//       rtl={false}
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//       theme="dark"
//     />
//     </div>
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
}

export default function Component() {
  const [inputLink, setInputLink] = useState("");
  const [queue, setQueue] = useState<Video[]>([
    { id: "1", title: "Awesome Song 1", upvotes: 5, downvotes: 1 },
    { id: "2", title: "Cool Music Video", upvotes: 3, downvotes: 0 },
    { id: "3", title: "Top Hit 2023", upvotes: 2, downvotes: 1 },
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
          Submit
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
                  src="/placeholder.svg?height=360&width=640"
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

      {/* Queue Section */}
      <div className="mt-10 w-full max-w-2xl">
        <h2 className="text-2xl font-bold">Upcoming Songs</h2>
        <div className="space-y-4 mt-4">
          {queue.map((video) => (
            <Card key={video.id} className="bg-gray-900 border-gray-800">
              <CardContent className="p-4 flex justify-between items-center">
                <p className="text-lg font-semibold">{video.title}</p>
                <div className="flex items-center space-x-3">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Share Button */}
      <Button onClick={handleShare} className="mt-6 bg-gray-800 hover:bg-gray-700 text-white">
        <Share2 className="mr-2 h-4 w-4" /> Share Voting Page
      </Button>

      <ToastContainer theme="dark" />
    </div>
  );
}
