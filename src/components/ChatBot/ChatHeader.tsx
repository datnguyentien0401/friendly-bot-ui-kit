
import React from "react";
import { Bot } from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="flex items-center gap-3 bg-white border-b p-4 shadow-sm">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500">
        <Bot className="w-5 h-5 text-white" />
      </div>
      <div>
        <h3 className="font-medium">Friendly Bot</h3>
        <p className="text-xs text-gray-500">Online</p>
      </div>
    </div>
  );
};

export default ChatHeader;
