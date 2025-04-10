
import React from "react";
import { Play, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoDisplay = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Video Player</h2>
      </div>
      
      <div className="flex-1 flex items-center justify-center bg-gray-900 relative">
        <div className="text-white text-center">
          <div className="mb-4">
            <Play size={48} className="mx-auto text-white opacity-70" />
          </div>
          <p>No video selected</p>
          <p className="text-sm text-gray-400">Click to upload or select a video to play</p>
        </div>
        
        {/* Video controls that will appear when a video is loaded */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between text-white">
            <Button variant="ghost" size="icon" className="text-white">
              <Play className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              <div className="w-24 h-1 bg-white/30 rounded-full">
                <div className="w-3/4 h-full bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDisplay;
