import type React from "react";
import { useState } from "react";
import { useMutation, useConvex } from "convex/react";
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
  const client = useConvex();
  const joinOrCreateRoomMutation = useMutation(api.rooms.joinOrCreateRoom);

  const handleJoinOrCreateRoom = async () => {
    if (!roomName.trim() || !nickname.trim()) {
      alert("Please enter both Room Name and Nickname.");
      return;
    }
    try {
      let resolvedUserId: string;

      // Try to find user by nickname in the room
      const existingUserData = await client.query(
        api.rooms.findUserInRoomByNickname,
        { roomName, nickname },
      );

      if (existingUserData) {
        resolvedUserId = existingUserData.userId;
      } else {
        resolvedUserId = generateTemporaryUserId();
      }

      const result = await joinOrCreateRoomMutation({
        roomName,
        nickname,
        userId: resolvedUserId,
      });
      console.log("Room joined/created:", result);
      localStorage.setItem("eurovisionUserId", resolvedUserId);
      localStorage.setItem("eurovisionNickname", nickname);
      // Use the roomId from the mutation result as it's the most definitive
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
