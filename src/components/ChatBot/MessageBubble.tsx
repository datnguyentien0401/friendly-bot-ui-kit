
import React from "react";
import { cn } from "@/lib/utils";
import ChatBotAvatar from "./ChatBotAvatar";

export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        "flex items-start gap-2 mb-4 animate-fade-in",
        message.isBot ? "justify-start" : "justify-end"
      )}
    >
      {message.isBot && <ChatBotAvatar isBot={true} />}
      
      <div
        className={cn(
          "px-4 py-2 rounded-2xl max-w-[80%]",
          message.isBot 
            ? "bg-blue-500 text-white rounded-bl-none" 
            : "bg-gray-100 text-gray-800 rounded-br-none"
        )}
      >
        <p className="text-sm">{message.text}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      {!message.isBot && <ChatBotAvatar isBot={false} />}
    </div>
  );
};

export default MessageBubble;
