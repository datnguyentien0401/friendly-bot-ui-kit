
import React from "react";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatBotAvatarProps {
  isBot?: boolean;
  className?: string;
}

const ChatBotAvatar = ({ isBot = true, className }: ChatBotAvatarProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-8 h-8 rounded-full",
        isBot ? "bg-blue-500" : "bg-gray-200",
        className
      )}
    >
      {isBot ? (
        <Bot className="w-5 h-5 text-white" />
      ) : (
        <User className="w-5 h-5 text-gray-700" />
      )}
    </div>
  );
};

export default ChatBotAvatar;
