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
import StreamView from "../components/StreamView";

import { YT_REGEX } from "../lib/utils";
import { randomUUID } from "crypto";

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
const creatorId = "fe296b7d-96b1-458e-a1b4-0a4afbaa8a3f"

export default function Component() {
  return <StreamView creatorId= {creatorId} />
}
