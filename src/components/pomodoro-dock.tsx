"use client";

import React, { useState } from "react";
import {
  Brain,
  Gamepad2,
  Headphones,
  BarChart3,
  Menu,
  X,
} from "lucide-react";

export type PomodoroMode = "studying" | "playing" | "music" | "statistics";

interface PomodoroDockProps {
  onModeChange?: (mode: PomodoroMode) => void;
  currentMode?: PomodoroMode;
}

export function PomodoroDock({ onModeChange, currentMode = "studying" }: PomodoroDockProps) {
  const [activeMode, setActiveMode] = useState<PomodoroMode>(currentMode);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleModeChange = (mode: PomodoroMode) => {
    setActiveMode(mode);
    onModeChange?.(mode);
    setIsMobileMenuOpen(false); // Close mobile menu after selection
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
      id: "statistics" as PomodoroMode,
      icon: BarChart3,
      label: "Neural Analytics",
      color: "text-yellow-400",
      neonColor: "yellow",
      glowColor: "shadow-yellow-500/50",
      borderColor: "border-yellow-500/30",
    },
  ];

  return (
    <>
      {/* Desktop Dock - Hidden on mobile */}
      <div className="hidden md:block fixed left-6 top-1/2 transform -translate-y-1/2 z-50">
        {/* Attention-Grabbing Background */}
        <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl animate-pulse"></div>

        {/* Main Dock Container */}
        <div className="relative bg-black/90 backdrop-blur-xl border-2 border-cyan-400/50 rounded-2xl p-4 shadow-2xl">
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-cyan-400/30 via-purple-400/30 to-pink-400/30 blur-sm animate-pulse"></div>

          {/* Dock Items */}
          <div className="relative flex flex-col gap-4">
            {dockItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeMode === item.id;

              return (
                <div
                  key={item.id}
                  className="relative group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                {/* Main Button */}
                <button
                  onClick={() => handleModeChange(item.id)}
                  className={`
                    relative w-14 h-14 rounded-full flex items-center justify-center
                    transition-all duration-300 ease-out transform
                    ${isActive
                      ? `${item.color} bg-gradient-to-br from-black/90 to-gray-900/80 scale-125 shadow-2xl ${item.glowColor}`
                      : 'text-gray-400 bg-gradient-to-br from-black/50 to-black/30 hover:from-black/80 hover:to-black/60 hover:text-white hover:scale-115'
                    }
                    backdrop-blur-md border border-white/20 hover:border-white/40
                    group-hover:shadow-xl
                    before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                  `}
                >
                  {/* Glow Ring for Active */}
                  {isActive && (
                    <div className={`absolute -inset-3 rounded-full border-2 ${item.borderColor} opacity-40 animate-pulse`}></div>
                  )}

                  {/* Hover Glow Effect */}
                  <div className={`absolute -inset-4 rounded-full bg-gradient-to-br from-${item.neonColor}-500/0 to-${item.neonColor}-600/0 group-hover:from-${item.neonColor}-500/20 group-hover:to-${item.neonColor}-600/10 blur-xl transition-all duration-300`}></div>

                  {/* Icon */}
                  <Icon
                    size={24}
                    className={`relative z-10 transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-125'}`}
                  />

                  {/* Active Indicator Dot */}
                  {isActive && (
                    <div className={`absolute -top-1 -right-1 w-3 h-3 ${item.color.replace('text-', 'bg-')} rounded-full animate-pulse shadow-lg`}></div>
                  )}
                </button>

                {/* Hover Label */}
                <div className={`
                  absolute left-16 top-1/2 transform -translate-y-1/2
                  px-3 py-1 bg-black/90 backdrop-blur-md rounded-md
                  ${item.color} text-sm font-medium
                  opacity-0 group-hover:opacity-100 transition-all duration-300
                  pointer-events-none whitespace-nowrap
                  translate-x-2 group-hover:translate-x-0
                  border border-white/20
                `}>
                  {item.label}
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="relative w-12 h-12 rounded-full flex items-center justify-center
                     bg-black/90 backdrop-blur-xl border-2 border-cyan-400/50
                     text-cyan-400 hover:text-white transition-all duration-300
                     shadow-2xl hover:shadow-cyan-500/50"
        >
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 to-purple-400/30 blur-sm animate-pulse"></div>

          {/* Icon */}
          {isMobileMenuOpen ? (
            <X size={20} className="relative z-10 transition-transform duration-300 rotate-0" />
          ) : (
            <Menu size={20} className="relative z-10 transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="relative bg-black/95 backdrop-blur-xl border-2 border-cyan-400/50 rounded-3xl p-6 shadow-2xl max-w-sm w-full">
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-cyan-400/30 via-purple-400/30 to-pink-400/30 blur-sm animate-pulse"></div>

              {/* Title */}
              <div className="relative text-center mb-6">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">Neural Interface</h3>
                <p className="text-gray-400 text-sm">Select your mode</p>
              </div>

              {/* Mobile Dock Items */}
              <div className="relative grid grid-cols-2 gap-4">
                {dockItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeMode === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleModeChange(item.id)}
                      className={`
                        relative p-4 rounded-xl flex flex-col items-center gap-2
                        transition-all duration-300 ease-out transform
                        ${isActive
                          ? `${item.color} bg-gradient-to-br from-black/90 to-gray-900/80 scale-105 shadow-2xl ${item.glowColor}`
                          : 'text-gray-400 bg-gradient-to-br from-black/50 to-black/30 hover:from-black/80 hover:to-black/60 hover:text-white hover:scale-105'
                        }
                        backdrop-blur-md border border-white/20 hover:border-white/40
                        before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                      `}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Glow Ring for Active */}
                      {isActive && (
                        <div className={`absolute -inset-1 rounded-xl border-2 ${item.borderColor} opacity-40 animate-pulse`}></div>
                      )}

                      {/* Icon */}
                      <Icon
                        size={28}
                        className={`relative z-10 transition-all duration-300 ${isActive ? 'scale-110' : ''}`}
                      />

                      {/* Label */}
                      <span className="relative z-10 text-xs font-medium text-center">
                        {item.label}
                      </span>

                      {/* Active Indicator */}
                      {isActive && (
                        <div className={`absolute -top-1 -right-1 w-3 h-3 ${item.color.replace('text-', 'bg-')} rounded-full animate-pulse shadow-lg`}></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
