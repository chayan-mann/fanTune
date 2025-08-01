"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function CreateRoomButton() {
  const [showInput, setShowInput] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (roomName.trim().length < 3) {
      toast.error("Room name must be at least 3 characters.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: roomName }),
      });
      if (!res.ok) {
        throw new Error("Failed to create room.");
      }
      toast.success(`Room "${roomName}" created!`);
      setRoomName("");
      setShowInput(false);
      // Refresh the page to show the new room
      router.refresh(); 
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the room.");
    } finally {
      setIsLoading(false);
    }
  };

  if (showInput) {
    return (
      <form onSubmit={handleCreateRoom} className="flex gap-2 items-center bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 w-full max-w-md">
        <Input
          type="text"
          placeholder="Enter new room name..."
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="flex-1 bg-slate-800/50 border-slate-600/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent rounded-lg h-10"
          disabled={isLoading}
        />
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-10 px-4 rounded-lg font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </form>
    );
  }

  return (
    <Button
      onClick={() => setShowInput(true)}
      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-12 rounded-xl font-semibold text-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300 px-6"
    >
      <PlusCircle className="mr-3 h-6 w-6" />
      Create a New Room
    </Button>
  );
}