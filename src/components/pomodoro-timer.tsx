"use client";

import React, { useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Coffee, Brain } from "lucide-react";

export type TimerMode = "work" | "shortBreak" | "longBreak";

interface PomodoroTimerProps {
  className?: string;
  mode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  sessions: number;
  showAlert: boolean;
  completedMode: TimerMode | null;
  onModeChange: (mode: TimerMode) => void;
  onTimeChange: (time: number) => void;
  onToggleTimer: () => void;


  onShowAlert: (show: boolean) => void;
  onCompletedModeChange: (mode: TimerMode | null) => void;
}

export const timerSettings = {
  work: 25 * 60,      // 25 minutes
  shortBreak: 5 * 60, // 5 minutes
  longBreak: 15 * 60  // 15 minutes
};

export function PomodoroTimer({
  className,
  mode,
  timeLeft,
  isRunning,
  sessions,
  showAlert,
  completedMode,
  onModeChange,
  onTimeChange,
  onToggleTimer,


  onShowAlert,
  onCompletedModeChange
}: PomodoroTimerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const modeConfig = {
    work: {
      label: "FOCUS SESSION",
      color: "text-cyan-400",
      bgColor: "from-cyan-500/10",
      borderColor: "border-cyan-500/30",
      icon: Brain,
    },
    shortBreak: {
      label: "SHORT BREAK",
      color: "text-green-400",
      bgColor: "from-green-500/10",
      borderColor: "border-green-500/30",
      icon: Coffee,
    },
    longBreak: {
      label: "LONG BREAK",
      color: "text-purple-400",
      bgColor: "from-purple-500/10",
      borderColor: "border-purple-500/30",
      icon: Coffee,
    },
  };

  // Initialize audio
  useEffect(() => {
    // Create a simple beep sound using Web Audio API
    const createBeepSound = () => {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800; // Frequency in Hz
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    };

    if (typeof window !== 'undefined') {
      audioRef.current = { play: createBeepSound } as HTMLAudioElement;
    }
  }, []);

  // Play sound when timer completes
  useEffect(() => {
    if (timeLeft === 0 && showAlert) {
      if (audioRef.current) {
        try {
          audioRef.current.play();
        } catch (error) {
          console.log("Audio play failed:", error);
        }
      }
    }
  }, [timeLeft, showAlert]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const switchMode = (newMode: TimerMode) => {
    onModeChange(newMode);
  };

  const resetTimer = () => {
    onTimeChange(timerSettings[mode]);
  };

  const progress = ((timerSettings[mode] - timeLeft) / timerSettings[mode]) * 100;
  const currentConfig = modeConfig[mode];
  const Icon = currentConfig.icon;

  return (
    <div className={`relative ${className}`}>
      {/* Alert Notification */}
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-black/90 backdrop-blur-xl border border-cyan-500/50 rounded-2xl p-8 text-center shadow-2xl animate-pulse">
            <div className="text-6xl mb-4">⏰</div>
            <h2 className="text-3xl font-bold text-cyan-400 mb-4 font-mono">
              {completedMode === "work" ? "BREAK TIME!" : "BACK TO WORK!"}
            </h2>
            <p className="text-lg text-cyan-300/80 mb-6 font-mono">
              {completedMode === "work"
                ? "Great job! Time for a well-deserved break."
                : "Break's over! Ready to focus again?"
              }
            </p>
            <button
              onClick={() => {
                onShowAlert(false);
                onCompletedModeChange(null);
              }}
              className="px-6 py-3 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-cyan-400 font-mono hover:bg-cyan-500/30 transition-all duration-300"
            >
              CONTINUE
            </button>
          </div>
        </div>
      )}

      {/* Mode Selector */}
      <div className="flex justify-center gap-2 mb-8">
        {Object.entries(modeConfig).map(([key, config]) => (
          <button
            key={key}
            onClick={() => switchMode(key as TimerMode)}
            className={`
              px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300
              ${mode === key 
                ? `${config.color} bg-black/60 ${config.borderColor} border backdrop-blur-md` 
                : 'text-gray-500 hover:text-gray-300 bg-black/30 border border-gray-700/50 hover:border-gray-500/50'
              }
            `}
          >
            {config.label}
          </button>
        ))}
      </div>

      {/* Main Timer Display */}
      <div className={`relative p-8 bg-black/60 backdrop-blur-xl border ${currentConfig.borderColor} rounded-2xl shadow-2xl`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${currentConfig.bgColor} via-transparent to-black/10 rounded-2xl`}></div>
        
        {/* Progress Ring */}
        <div className="relative flex items-center justify-center mb-6">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-gray-700/50"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className={`${currentConfig.color} transition-all duration-1000 ease-out`}
            />
          </svg>
          
          {/* Timer Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Icon size={28} className={`${currentConfig.color} mb-3`} />
            <div className={`text-4xl font-mono font-bold ${currentConfig.color}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="text-xs font-mono text-gray-400 mt-2">
              SESSION {sessions + 1}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onToggleTimer}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-mono font-bold
              ${currentConfig.color} bg-black/60 ${currentConfig.borderColor} border
              backdrop-blur-md transition-all duration-300 hover:scale-105
              shadow-lg hover:shadow-xl
            `}
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
            {isRunning ? "PAUSE" : "START"}
          </button>
          
          <button
            onClick={resetTimer}
            className="
              flex items-center gap-2 px-6 py-3 rounded-lg font-mono font-bold
              text-gray-400 bg-black/60 border border-gray-700/50
              backdrop-blur-md transition-all duration-300 hover:scale-105
              hover:text-gray-300 hover:border-gray-500/50
            "
          >
            <RotateCcw size={20} />
            RESET
          </button>
        </div>

        {/* Status */}
        <div className="mt-6 text-center">
          <div className={`text-lg font-mono ${currentConfig.color} mb-2`}>
            {currentConfig.label}
          </div>
          <div className="text-sm text-gray-400 font-mono">
            {mode === "work" 
              ? "Focus on your task. Eliminate distractions."
              : "Take a break. Relax and recharge."
            }
          </div>
        </div>
      </div>
    </div>
  );
}
