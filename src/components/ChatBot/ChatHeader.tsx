
import React from "react";
import { Bot } from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="flex items-center gap-3 bg-blue-500 text-white p-3 rounded-t-lg shadow-sm">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white">
        <Bot className="w-5 h-5 text-blue-500" />
      </div>
      <div>
        <h3 className="font-medium">Friendly Bot</h3>
        <p className="text-xs text-blue-100">Online</p>
      </div>
    </div>
  );
};

export default ChatHeader;
