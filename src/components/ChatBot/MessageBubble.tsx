
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
    <div className={cn(
      "mb-6 animate-fade-in",
      message.isBot ? "" : "bg-gray-50"
    )}>
      <div className="flex max-w-3xl mx-auto">
        {message.isBot && <ChatBotAvatar isBot={true} className="mt-1 mr-4" />}
        <div className="flex-1">
          <div
            className={cn(
              "px-4 py-2 rounded-lg",
              message.isBot 
                ? "bg-white text-gray-800" 
                : "bg-blue-500 text-white"
            )}
          >
            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
          </div>
          <span className="text-xs text-gray-500 mt-1 inline-block">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        {!message.isBot && <ChatBotAvatar isBot={false} className="mt-1 ml-4" />}
      </div>
    </div>
  );
};

export default MessageBubble;
