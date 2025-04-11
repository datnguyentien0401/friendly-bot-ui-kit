
import React, { useState, useEffect, useRef } from "react";
import { Volume2, Pause, Play, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "@/components/ui/use-toast";

declare global {
  interface Window {
    YT: {
      Player: any;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

const VideoDisplay = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(75);
  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  
  // YouTube video ID - this is the ID from the link the user provided
  const videoId = "D2YhKaANbWE";
  
  useEffect(() => {
    // Function to load the YouTube API script
    const loadYouTubeAPI = () => {
      // Check if script is already loaded
      if (window.YT) {
        initializePlayer();
        return;
      }

      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = initializePlayer;
    };

    // Function to initialize the YouTube player
    const initializePlayer = () => {
      if (!playerContainerRef.current) return;
      
      setIsLoading(true);
      
      try {
        playerRef.current = new window.YT.Player(playerContainerRef.current, {
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            rel: 0,
            showinfo: 0,
            mute: 0,
            modestbranding: 1,
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: onPlayerError,
          }
        });
      } catch (error) {
        console.error("Failed to initialize YouTube player:", error);
        toast({
          title: "Error loading video",
          description: "Could not load the YouTube video.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    const onPlayerReady = (event: any) => {
      setIsLoading(false);
      // Set initial volume
      event.target.setVolume(volume);
      toast({
        title: "Video loaded",
        description: "YouTube video has been loaded successfully",
      });
    };

    const onPlayerStateChange = (event: any) => {
      const playerState = event.data;
      if (playerState === window.YT.PlayerState.PLAYING) {
        setIsPlaying(true);
      } else if (playerState === window.YT.PlayerState.PAUSED || 
                playerState === window.YT.PlayerState.ENDED) {
        setIsPlaying(false);
      }
    };
    
    const onPlayerError = (event: any) => {
      console.error("YouTube player error:", event);
      toast({
        title: "Video error",
        description: "An error occurred while playing the video.",
        variant: "destructive",
      });
      setIsLoading(false);
    };

    loadYouTubeAPI();

    // Cleanup function
    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  // Handle play/pause toggle
  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  };

  // Handle volume change
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  // Handle fullscreen
  const handleFullscreen = () => {
    if (playerContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        playerContainerRef.current.requestFullscreen();
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
            ) : (
              <div 
                ref={playerContainerRef} 
                className="w-full h-full"
                onClick={togglePlay}
              />
            )}
          </AspectRatio>
        </div>
        
        {/* Custom video controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-100 hover:opacity-100 transition-opacity">
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
