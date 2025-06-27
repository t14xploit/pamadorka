"use client";

import React, { useState } from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import {
  Brain,
  Gamepad2,
  Headphones,
  Monitor,
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
      icon: Brain,
      label: "Neural Study",
      color: "text-cyan-400",
      neonColor: "cyan",
      glowColor: "shadow-cyan-500/50",
      borderColor: "border-cyan-500/30",
    },
    {
      id: "playing" as PomodoroMode,
      icon: Gamepad2,
      label: "VR Play",
      color: "text-green-400",
      neonColor: "green",
      glowColor: "shadow-green-500/50",
      borderColor: "border-green-500/30",
    },
    {
      id: "music" as PomodoroMode,
      icon: Headphones,
      label: "Audio Matrix",
      color: "text-purple-400",
      neonColor: "purple",
      glowColor: "shadow-purple-500/50",
      borderColor: "border-purple-500/30",
    },
    {
      id: "videos" as PomodoroMode,
      icon: Monitor,
      label: "Holo Display",
      color: "text-pink-400",
      neonColor: "pink",
      glowColor: "shadow-pink-500/50",
      borderColor: "border-pink-500/30",
    },
  ];

  return (
    <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50">
      {/* Holographic Grid Background */}
      <div className="absolute -inset-4 bg-gradient-to-b from-cyan-500/10 via-transparent to-purple-500/10 rounded-3xl blur-xl"></div>

      {/* Main Dock Container */}
      <div className="relative bg-black/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-3 shadow-2xl">
        {/* Animated Border Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-sm animate-pulse"></div>

        <Dock
          iconMagnification={70}
          iconDistance={120}
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
                  relative group transition-all duration-300 ease-out
                  ${isActive
                    ? `${item.color} shadow-2xl ${item.glowColor} scale-110 bg-gradient-to-br from-black/90 to-gray-900/90 ${item.borderColor} border-2`
                    : 'text-gray-500 hover:text-white bg-black/60 hover:bg-gradient-to-br hover:from-gray-800/80 hover:to-black/80 border border-gray-700/50 hover:border-cyan-500/50'
                  }
                  backdrop-blur-md rounded-xl
                  before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                `}
                onClick={() => handleModeChange(item.id)}
              >
                {/* Holographic Glow Effect */}
                {isActive && (
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-${item.neonColor}-400/20 to-${item.neonColor}-600/20 blur-md animate-pulse`}></div>
                )}

                {/* Icon */}
                <Icon
                  size={28}
                  className={`
                    relative z-10 transition-all duration-300
                    ${isActive ? 'scale-110 drop-shadow-lg' : 'group-hover:scale-105'}
                    ${isActive ? `filter drop-shadow-[0_0_8px_${item.neonColor === 'cyan' ? '#00ffff' : item.neonColor === 'green' ? '#00ff00' : item.neonColor === 'purple' ? '#8b5cf6' : '#ec4899'}]` : ''}
                  `}
                />

                {/* Tooltip */}
                <div className={`
                  absolute left-full ml-4 px-3 py-2 bg-black/90 backdrop-blur-md
                  border ${item.borderColor} rounded-lg text-sm ${item.color}
                  opacity-0 group-hover:opacity-100 transition-all duration-300
                  pointer-events-none whitespace-nowrap z-20
                  shadow-lg ${item.glowColor}
                `}>
                  {item.label}
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-black/90 border-l ${item.borderColor} border-b rotate-45`}></div>
                </div>
              </DockIcon>
            );
          })}
        </Dock>
      </div>
    </div>
  );
}
