
import React from "react";
import ChatContainer from "@/components/ChatBot/ChatContainer";
import VideoDisplay from "@/components/Video/VideoDisplay";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const Index = () => {
  return (
    <div className="h-screen flex flex-col bg-white">
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={50} minSize={30}>
          <VideoDisplay />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={50} minSize={30}>
          <ChatContainer />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Index;
