"use client";

import React, { useState, useEffect } from "react";

export function DateTimeDisplay() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getGreeting = () => {
    if (!currentTime) return "Welcome";
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Avoid hydration mismatch
  if (!mounted || !currentTime) {
    return (
      <div className="fixed top-4 left-4 z-10 pointer-events-none">
        <div className="text-cyan-400/60 font-mono text-xs space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span>SYNC: ...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 left-4 z-10 pointer-events-none">
      <div className="text-cyan-400/60 font-mono text-xs space-y-2">
        {/* Date and Greeting */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span>{formatDate(currentTime)}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <span>{getGreeting().toUpperCase()}</span>
        </div>

        {/* System Status */}
       
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span>SYNC: 98.7%</span>
        </div>
      </div>
    </div>
  );
}
