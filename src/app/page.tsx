"use client";

import { useState } from "react";
import { PomodoroDock, PomodoroMode } from "@/components/pomodoro-dock";

export default function Home() {
  const [currentMode, setCurrentMode] = useState<PomodoroMode>("studying");

  const handleModeChange = (mode: PomodoroMode) => {
    setCurrentMode(mode);
    console.log("Mode changed to:", mode);
  };

  const getModeContent = () => {
    switch (currentMode) {
      case "studying":
        return (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-500 mb-4">Study Mode</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Focus on your studies with the Pomodoro technique
            </p>
            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Ready to Study?</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Start your focused study session. We'll help you stay productive!
              </p>
            </div>
          </div>
        );
      case "playing":
        return (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-green-500 mb-4">Play Mode</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Take a break and enjoy some games
            </p>
            <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Break Time!</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Relax and recharge with some fun activities.
              </p>
            </div>
          </div>
        );
      case "music":
        return (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-purple-500 mb-4">Music Mode</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Listen to focus music while studying
            </p>
            <div className="mt-8 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Focus Sounds</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Enhance your concentration with ambient music.
              </p>
            </div>
          </div>
        );
      case "videos":
        return (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-500 mb-4">Videos Mode</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Watch educational or relaxing videos
            </p>
            <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Video Content</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Educational videos and relaxing content for your breaks.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <div className="max-w-2xl w-full">
          {getModeContent()}
        </div>
      </main>

      <PomodoroDock
        currentMode={currentMode}
        onModeChange={handleModeChange}
      />
    </div>
  );
}
