import type React from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { getAnimalEmojiForUser } from "@/lib/emoji";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { roomName } = useParams<{ roomName?: string }>();
  const navigate = useNavigate();
  const nickname = localStorage.getItem("eurovisionNickname") || "Guest";
  const storedRoomId = localStorage.getItem("eurovisionRoomId");
  const userId = localStorage.getItem("eurovisionUserId");

  const handleViewOverview = () => {
    if (roomName) {
      void navigate(`/room/${roomName}/overview`);
    } else if (storedRoomId) {
      console.warn(
        "Navigating to overview without roomName in URL, using stored info or redirecting to home.",
      );
      void navigate("/");
    } else {
      void navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 shadow-md bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex-none">
            <Button
              variant="ghost"
              onClick={handleViewOverview}
              className="text-purple-600 hover:text-purple-700"
              size="icon"
              title="View Overview"
            >
              <span className="text-2xl">📊</span>
            </Button>
          </div>

          <div className="flex-grow text-center">
            <p className="text-lg font-semibold text-purple-700">{roomName}</p>
          </div>

          <div className="flex-none flex items-center space-x-2">
            <span className="text-lg">
              {getAnimalEmojiForUser(userId ?? "")}
            </span>
            <p className="text-gray-600 text-base font-semibold">{nickname}</p>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-8">{children}</main>
    </div>
  );
};

export default Layout;
