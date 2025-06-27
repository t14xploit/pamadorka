"use client";

import React, { useState } from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { 
  BookOpen, 
  Play, 
  Music, 
  Video,
} from "lucide-react";

export type PomodoroMode = "studying" | "playing" | "music" | "videos";

interface PomodoroDockProps {
  onModeChange?: (mode: PomodoroMode) => void;
  currentMode?: PomodoroMode;
}

export function PomodoroDock({ onModeChange, currentMode = "studying" }: PomodoroDockProps) {
  const [activeMode, setActiveMode] = useState<PomodoroMode>(currentMode);

  const handleModeChange = (mode: PomodoroMode) => {
    setActiveMode(mode);
    onModeChange?.(mode);
  };

  const dockItems = [
    {
      id: "studying" as PomodoroMode,
      icon: BookOpen,
      label: "Study Mode",
      color: "text-blue-500",
      bgColor: "bg-blue-500/20",
    },
    {
      id: "playing" as PomodoroMode,
      icon: Play,
      label: "Play Mode", 
      color: "text-green-500",
      bgColor: "bg-green-500/20",
    },
    {
      id: "music" as PomodoroMode,
      icon: Music,
      label: "Music Mode",
      color: "text-purple-500", 
      bgColor: "bg-purple-500/20",
    },
    {
      id: "videos" as PomodoroMode,
      icon: Video,
      label: "Videos Mode",
      color: "text-red-500",
      bgColor: "bg-red-500/20",
    },
  ];

  return (
    <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50">
      <Dock

        iconMagnification={60}
        iconDistance={140}
        direction="middle"
        orientation="vertical"
      >
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMode === item.id;

          return (
            <DockIcon
              key={item.id}
              className={`
                transition-all duration-200
                ${isActive
                  ? `${item.bgColor} ${item.color} shadow-lg scale-110`
                  : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                }
                backdrop-blur-md border border-white/20
              `}
              onClick={() => handleModeChange(item.id)}
            >
              <Icon
                size={24}
                className={`transition-all duration-200 ${isActive ? 'scale-110' : ''}`}
              />
            </DockIcon>
          );
        })}
      </Dock>
    </div>
  );
}
