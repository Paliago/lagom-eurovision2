import type React from "react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

// A simple way to generate a temporary unique ID for the user before full auth/user management
const generateTemporaryUserId = () => {
  return `tempUser_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
};

const LandingPage: React.FC = () => {
  const [roomName, setRoomName] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  const joinOrCreateRoomMutation = useMutation(api.rooms.joinOrCreateRoom);

  const handleJoinOrCreateRoom = async () => {
    if (!roomName.trim() || !nickname.trim()) {
      alert("Please enter both Room Name and Nickname.");
      return;
    }
    try {
      const tempUserId =
        localStorage.getItem("eurovisionUserId") || generateTemporaryUserId();

      const result = await joinOrCreateRoomMutation({
        roomName,
        nickname,
        userId: tempUserId,
      });
      console.log("Room joined/created:", result);
      localStorage.setItem("eurovisionUserId", tempUserId);
      localStorage.setItem("eurovisionNickname", nickname);
      if (result.roomId) {
        localStorage.setItem("eurovisionRoomId", result.roomId.toString());
        void navigate(`/room/${roomName}/contestants`);
      }
    } catch (error) {
      console.error("Failed to join or create room:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to join or create room.";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            Lagom Eurovision
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="roomName">Room Name:</Label>
            <Input
              type="text"
              id="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nickname">Nickname:</Label>
            <Input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter your nickname"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  void handleJoinOrCreateRoom();
                }
              }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              void handleJoinOrCreateRoom();
            }}
            className="w-full"
          >
            Join Room
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LandingPage;
