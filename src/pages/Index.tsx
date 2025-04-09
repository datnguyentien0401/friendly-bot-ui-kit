
import React from "react";
import ChatContainer from "@/components/ChatBot/ChatContainer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Friendly Chat Bot</h1>
      <p className="text-gray-600 max-w-md text-center mb-8">
        Welcome to our chat bot demo! Start chatting below to see how it works.
      </p>
      <ChatContainer />
    </div>
  );
};

export default Index;
