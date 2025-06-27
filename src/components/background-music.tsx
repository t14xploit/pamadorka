"use client";

import React, { useState, useRef, useEffect } from "react";
import { VolumeX, Music, Coffee, CloudRain } from "lucide-react";

type MusicType = "lofi" | "jazz" | "rain" | null;

interface BackgroundMusicProps {
  className?: string;
}

interface YouTubePlayer {
  loadVideoById: (options: { videoId: string; startSeconds: number }) => void;
  playVideo: () => void;
  pauseVideo: () => void;
}

interface YouTubePlayerConfig {
  height: string;
  width: string;
  videoId: string;
  playerVars: Record<string, number | string>;
  events: {
    onReady: (event: { target: YouTubePlayer }) => void;
    onStateChange: (event: { data: number }) => void;
    onError: (event: { data: number }) => void;
  };
}

declare global {
  interface Window {
    YT: {
      Player: new (element: HTMLElement, config: YouTubePlayerConfig) => YouTubePlayer;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

export function BackgroundMusic({ className }: BackgroundMusicProps) {
  const [currentMusic, setCurrentMusic] = useState<MusicType>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // YouTube video IDs for different music types - Using embed-friendly videos
  const musicVideos = {
    lofi: "jfKfPfyJRdk", // LoFi Girl - beats to relax/study to (24/7 stream)
    jazz: "neV3EPgvZ3g", // Smooth Jazz Instrumental Music for Work & Study
    rain: "nDq6TstdEi8", // Rain Sounds for Sleeping - 10 Hours
  } as const;

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = () => {
        setIsLoaded(true);
      };
    } else {
      setIsLoaded(true);
    }
  }, []);

  // Initialize player when API is ready
  useEffect(() => {
    if (isLoaded && !player && playerRef.current && window.YT && window.YT.Player) {
      console.log('Initializing YouTube player...');
      try {
        new window.YT.Player(playerRef.current, {
          height: '0',
          width: '0',
          videoId: musicVideos.lofi,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            loop: 1,
            playlist: musicVideos.lofi,
          },
          events: {
            onReady: (event: { target: YouTubePlayer }) => {
              console.log('YouTube player ready');
              console.log('Player methods:', Object.getOwnPropertyNames(event.target));
              setPlayer(event.target);
            },
            onStateChange: (event: { data: number }) => {
              console.log('Player state changed:', event.data);
            },
            onError: (event: { data: number }) => {
              console.error('YouTube player error:', event);
              console.error('Error code:', event.data);
              // Error codes: 2=Invalid video ID, 5=HTML5 player error, 100=Video not found, 101/150=Video not available
              if (event.data === 2) {
                console.error('Invalid video ID');
              } else if (event.data === 5) {
                console.error('HTML5 player error');
              } else if (event.data === 100) {
                console.error('Video not found or private');
              } else if (event.data === 101 || event.data === 150) {
                console.error('Video not available in this country or restricted');
              }
            },
          },
        });
      } catch (error) {
        console.error('Error creating YouTube player:', error);
      }
    }
  }, [isLoaded, player, musicVideos.lofi]);

  const musicConfig = {
    lofi: {
      label: "LoFi",
      icon: Music,
      color: "text-purple-400",
      glowColor: "shadow-purple-500/50",
      borderColor: "border-purple-500/30",
    },
    jazz: {
      label: "Jazz",
      icon: Coffee,
      color: "text-amber-400",
      glowColor: "shadow-amber-500/50",
      borderColor: "border-amber-500/30",
    },
    rain: {
      label: "Rain",
      icon: CloudRain,
      color: "text-blue-400",
      glowColor: "shadow-blue-500/50",
      borderColor: "border-blue-500/30",
    },
  };

  const playMusic = (type: MusicType) => {
    console.log('playMusic called with:', type);
    console.log('player:', player);
    console.log('isLoaded:', isLoaded);

    if (!player || !isLoaded) {
      console.log('Player not ready yet');
      return;
    }

    if (currentMusic === type) {
      // Stop current music
      try {
        if (typeof player.pauseVideo === 'function') {
          player.pauseVideo();
          setCurrentMusic(null);
        }
      } catch (error) {
        console.error('Error pausing video:', error);
      }
    } else {
      // Play new music
      if (type && musicVideos[type]) {
        try {
          if (typeof player.loadVideoById === 'function') {
            player.loadVideoById({
              videoId: musicVideos[type],
              startSeconds: 0,
            });
            if (typeof player.playVideo === 'function') {
              player.playVideo();
            }
            setCurrentMusic(type);
          } else {
            console.error('loadVideoById is not a function');
          }
        } catch (error) {
          console.error('Error playing video:', error);
        }
      }
    }
  };

  return (
    <div className={`${className}`}>
      {/* Hidden YouTube Player */}
      <div ref={playerRef} style={{ display: 'none' }}></div>

      {/* Music Controls */}
      <div className="flex items-center gap-4 text-cyan-400/80 font-mono text-sm pointer-events-auto">
        {Object.entries(musicConfig).map(([key, config]) => {
          const Icon = config.icon;
          const isActive = currentMusic === key;
          
          return (
            <button
              key={key}
              onClick={() => playMusic(key as MusicType)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer pointer-events-auto
                ${isActive
                  ? `${config.color} bg-black/60 ${config.borderColor} border backdrop-blur-md ${config.glowColor} shadow-lg scale-105`
                  : 'text-gray-500 hover:text-gray-300 bg-black/30 border border-gray-700/50 hover:border-gray-500/50'
                }
              `}
            >
              <Icon size={16} className={isActive ? 'animate-pulse' : ''} />
              <span>{config.label}</span>
              {isActive && (
                <div className="flex gap-1">
                  <div className="w-1 h-3 bg-current rounded-full animate-pulse"></div>
                  <div className="w-1 h-3 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-3 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              )}
            </button>
          );
        })}
        
        {/* Mute All Button */}
        {currentMusic && (
          <button
            onClick={() => {
              if (player) {
                player.pauseVideo();
              }
              setCurrentMusic(null);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 bg-black/30 border border-red-700/50 hover:border-red-500/50 transition-all duration-300 cursor-pointer pointer-events-auto"
          >
            <VolumeX size={16} />
            <span>Mute</span>
          </button>
        )}
      </div>
    </div>
  );
}
