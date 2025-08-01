"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function DeleteRoomButton({ roomId }: { roomId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this room? This action cannot be undone.");
    if (!confirmed) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/rooms/${roomId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete room.");
      }
      toast.success("Room deleted successfully.");
      router.refresh();
    } catch (error) {
      toast.error("An error occurred while deleting the room.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={isLoading}
      className="text-gray-500 hover:text-red-500 hover:bg-red-500/10"
      aria-label="Delete room"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
