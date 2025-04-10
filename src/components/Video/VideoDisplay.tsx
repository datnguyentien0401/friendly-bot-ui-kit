
import React, { useState, useEffect } from "react";
import { Volume2, Pause, Play, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "@/components/ui/use-toast";

const VideoDisplay = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(75);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  // YouTube video ID
  const videoId = "D2YhKaANbWE";
  
  useEffect(() => {
    const downloadYouTubeVideo = async () => {
      setIsLoading(true);
      try {
        // In a real application, you would implement a server-side proxy to download the video
        // For demo purposes, we're using a direct MP4 file
        const videoUrl = `https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`;
        setVideoUrl(videoUrl);
        toast({
          title: "Video loaded",
          description: "Sample video has been loaded as a demonstration",
        });
      } catch (error) {
        console.error("Failed to load video:", error);
        toast({
          title: "Error loading video",
          description: "Could not load the YouTube video. Using sample video instead.",
          variant: "destructive",
        });
        // Fallback to a sample video
        setVideoUrl("https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
      } finally {
        setIsLoading(false);
      }
    };

    downloadYouTubeVideo();
  }, [videoId]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Video Player</h2>
      </div>
      
      <div className="flex-1 flex flex-col bg-gray-900 relative">
        <div className="flex-1 w-full">
          <AspectRatio ratio={16 / 9} className="bg-black">
            {isLoading ? (
              <div className="flex items-center justify-center w-full h-full text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : videoUrl ? (
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onVolumeChange={(e) => setVolume(Math.round((e.target as HTMLVideoElement).volume * 100))}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-white">
                <p>No video available</p>
              </div>
            )}
          </AspectRatio>
        </div>
        
        {/* Custom video controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between text-white">
            <Button variant="ghost" size="icon" className="text-white" onClick={togglePlay}>
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            
            <div className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              <div 
                className="w-24 h-1 bg-white/30 rounded-full cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const percentage = Math.round((x / rect.width) * 100);
                  handleVolumeChange(Math.max(0, Math.min(100, percentage)));
                }}
              >
                <div 
                  className="h-full bg-white rounded-full" 
                  style={{ width: `${volume}%` }}
                ></div>
              </div>
              <Button variant="ghost" size="icon" className="text-white ml-2" onClick={handleFullscreen}>
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDisplay;
