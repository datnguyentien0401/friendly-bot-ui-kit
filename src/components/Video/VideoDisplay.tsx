
import React from "react";
import { Volume2, Pause, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const VideoDisplay = () => {
  // Extract the video ID from the YouTube URL
  const videoId = "D2YhKaANbWE";
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Video Player</h2>
      </div>
      
      <div className="flex-1 flex flex-col bg-gray-900 relative">
        <div className="flex-1 w-full">
          <AspectRatio ratio={16 / 9} className="bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            ></iframe>
          </AspectRatio>
        </div>
        
        {/* Custom video controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between text-white">
            <Button variant="ghost" size="icon" className="text-white">
              <Pause className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              <div className="w-24 h-1 bg-white/30 rounded-full">
                <div className="w-3/4 h-full bg-white rounded-full"></div>
              </div>
              <Maximize className="h-5 w-5 ml-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDisplay;
