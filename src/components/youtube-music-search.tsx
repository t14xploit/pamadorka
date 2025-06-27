"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Play, Pause, Music, Heart, Coffee, Zap, Moon, Sun, Headphones, Volume2 } from "lucide-react";

interface YouTubePlayer {
  loadVideoById: (options: { videoId: string; startSeconds: number }) => void;
  playVideo: () => void;
  pauseVideo: () => void;
}

interface MusicCategory {
  id: string;
  title: string;
  description: string;
  videoId: string;
  duration: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  gradient: string;
  borderColor: string;
}

interface YouTubeMusicCategoriesProps {
  className?: string;
}

export function YouTubeMusicSearch({ className }: YouTubeMusicCategoriesProps) {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // Music categories with curated playlists
  const musicCategories: MusicCategory[] = useMemo(() => [
    {
      id: "lofi",
      title: "LoFi Chill",
      description: "Relaxing beats for focus and study",
      videoId: "jfKfPfyJRdk", // LoFi Girl 24/7
      duration: "LIVE",
      icon: Coffee,
      color: "text-purple-400",
      gradient: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30"
    },
    {
      id: "love",
      title: "Love Songs 2024",
      description: "Romantic hits and timeless classics",
      videoId: "kJQP7kiw5Fk", // Popular love song
      duration: "2:30:00",
      icon: Heart,
      color: "text-pink-400",
      gradient: "from-pink-500/20 to-red-500/20",
      borderColor: "border-pink-500/30"
    },
    {
      id: "acoustic",
      title: "Acoustic Sessions",
      description: "Unplugged and intimate performances",
      videoId: "5qap5aO4i9A", // Acoustic playlist
      duration: "1:45:00",
      icon: Music,
      color: "text-amber-400",
      gradient: "from-amber-500/20 to-orange-500/20",
      borderColor: "border-amber-500/30"
    },
    {
      id: "energetic",
      title: "Energy Boost",
      description: "High-energy tracks for motivation",
      videoId: "at-m6klQ-oA", // Energetic music
      duration: "1:20:00",
      icon: Zap,
      color: "text-yellow-400",
      gradient: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30"
    },
    {
      id: "night",
      title: "Night Vibes",
      description: "Smooth tracks for evening relaxation",
      videoId: "neV3EPgvZ3g", // Night/jazz playlist
      duration: "2:00:00",
      icon: Moon,
      color: "text-blue-400",
      gradient: "from-blue-500/20 to-indigo-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      id: "morning",
      title: "Morning Fresh",
      description: "Uplifting songs to start your day",
      videoId: "9bZkp7q19f0", // Upbeat morning music
      duration: "1:30:00",
      icon: Sun,
      color: "text-cyan-400",
      gradient: "from-cyan-500/20 to-blue-500/20",
      borderColor: "border-cyan-500/30"
    },
    {
      id: "focus",
      title: "Deep Focus",
      description: "Instrumental music for concentration",
      videoId: "nDq6TstdEi8", // Focus/ambient music
      duration: "3:00:00",
      icon: Headphones,
      color: "text-green-400",
      gradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30"
    },
    {
      id: "party",
      title: "Party Mix",
      description: "Dance hits and party anthems",
      videoId: "fJ9rUzIMcZQ", // Party music
      duration: "1:15:00",
      icon: Volume2,
      color: "text-red-400",
      gradient: "from-red-500/20 to-pink-500/20",
      borderColor: "border-red-500/30"
    }
  ], []);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = () => {
        console.log('YouTube API ready for Audio Matrix');
        setIsLoaded(true);
      };
    } else {
      setIsLoaded(true);
    }
  }, []);

  // Initialize player when API is ready
  useEffect(() => {
    if (isLoaded && playerRef.current && !player) {
      try {
        console.log('Initializing YouTube player for Audio Matrix...');
        new window.YT.Player(playerRef.current, {
          height: '0',
          width: '0',
          videoId: musicCategories[0].videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
          },
          events: {
            onReady: (event: { target: YouTubePlayer }) => {
              console.log('Audio Matrix YouTube player ready');
              setPlayer(event.target);
            },
            onStateChange: (event: { data: number }) => {
              // Handle state changes if needed
              console.log('Player state changed:', event.data);
            },
            onError: (event: { data: number }) => {
              console.error('Audio Matrix YouTube player error:', event);
            },
          },
        });
      } catch (error) {
        console.error('Failed to initialize Audio Matrix YouTube player:', error);
      }
    }
  }, [isLoaded, musicCategories, player]);

  const playCategory = (categoryId: string) => {
    const category = musicCategories.find(cat => cat.id === categoryId);
    if (!category) return;

    if (currentPlaying === categoryId && isPlaying) {
      // Pause current category
      if (player && typeof player.pauseVideo === 'function') {
        player.pauseVideo();
      }
      setIsPlaying(false);
    } else {
      // Play new category
      if (player && typeof player.loadVideoById === 'function') {
        player.loadVideoById({ videoId: category.videoId, startSeconds: 0 });
        setCurrentPlaying(categoryId);
        setIsPlaying(true);
        console.log(`Playing category: ${category.title}`);
      }
    }
  };



  return (
    <div className={`${className}`}>
      {/* Hidden YouTube Player */}
      <div ref={playerRef} style={{ display: 'none' }}></div>

      {/* Music Categories Grid */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-purple-400 font-mono text-center">CHOOSE YOUR VIBE</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {musicCategories.map((category) => {
            const Icon = category.icon;
            const isActive = currentPlaying === category.id;

            return (
              <div
                key={category.id}
                className="group relative cursor-pointer"
                onClick={() => playCategory(category.id)}
              >
                {/* Background Glow */}
                <div className={`absolute -inset-2 bg-gradient-to-br ${category.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>

                {/* Main Card */}
                <div className={`
                  relative bg-black/60 backdrop-blur-md border rounded-xl p-6
                  transition-all duration-300 group-hover:scale-105
                  ${isActive
                    ? `${category.borderColor} border-2 shadow-2xl`
                    : 'border-purple-500/20 hover:border-purple-400/50'
                  }
                `}>
                  {/* Active Pulse Ring */}
                  {isActive && (
                    <div className={`absolute -inset-1 rounded-xl border-2 ${category.borderColor} animate-ping opacity-30`}></div>
                  )}

                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className={`
                      w-16 h-16 rounded-full flex items-center justify-center
                      ${isActive ? `bg-gradient-to-br ${category.gradient}` : 'bg-black/40'}
                      transition-all duration-300 group-hover:scale-110
                    `}>
                      <Icon
                        size={28}
                        className={`${category.color} transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h4 className={`font-bold text-lg mb-2 ${category.color} transition-colors duration-300`}>
                      {category.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="text-xs text-gray-500 font-mono">
                      {category.duration}
                    </div>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 rounded-xl">
                    {isActive && isPlaying ? (
                      <Pause className="w-8 h-8 text-white drop-shadow-lg" />
                    ) : (
                      <Play className="w-8 h-8 text-white drop-shadow-lg" />
                    )}
                  </div>

                  {/* Now Playing Indicator */}
                  {isActive && isPlaying && (
                    <div className="absolute top-3 right-3">
                      <div className="flex gap-1">
                        <div className={`w-1 h-4 ${category.color.replace('text-', 'bg-')} rounded-full animate-pulse`}></div>
                        <div className={`w-1 h-4 ${category.color.replace('text-', 'bg-')} rounded-full animate-pulse`} style={{ animationDelay: '0.2s' }}></div>
                        <div className={`w-1 h-4 ${category.color.replace('text-', 'bg-')} rounded-full animate-pulse`} style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Currently Playing Info */}
        {currentPlaying && isPlaying && (
          <div className="mt-8 p-4 bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-lg">
            <div className="flex items-center justify-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="text-purple-400 font-medium">
                Now Playing: {musicCategories.find(cat => cat.id === currentPlaying)?.title}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
