"use client";

import React, { useEffect, useState } from "react";

export function AREffects() {
  const [dataStreams, setDataStreams] = useState<Array<{ id: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate random data streams
    const streams = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 2,
    }));
    setDataStreams(streams);
  }, []);

  return (
    <>
      {/* Holographic Scan Lines */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-pulse"></div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              animation: `hologram-flicker ${2 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Data Streams */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {dataStreams.map((stream) => (
          <div
            key={stream.id}
            className="absolute w-px bg-gradient-to-b from-transparent via-green-400/60 to-transparent data-stream"
            style={{
              left: `${10 + stream.id * 12}%`,
              height: "200px",
              animationDelay: `${stream.delay}s`,
              animationDuration: `${stream.duration}s`,
            }}
          >
            {/* Binary code effect */}
            <div className="absolute inset-0 text-green-400/40 text-xs font-mono leading-none overflow-hidden">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="animate-pulse">
                  {Math.random() > 0.5 ? "1" : "0"}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Holograms */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-16 h-16 border border-cyan-400/20 rounded-lg hologram"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              transform: `rotate(${i * 45}deg)`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            <div className="absolute inset-2 border border-cyan-400/10 rounded"></div>
            <div className="absolute inset-4 border border-cyan-400/5 rounded"></div>
          </div>
        ))}
      </div>

      {/* Corner UI Elements */}
      <div className="fixed top-4 left-4 z-10 pointer-events-none">
        <div className="text-cyan-400/60 font-mono text-xs space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>NEURAL LINK: ACTIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span>AR MODE: ENABLED</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span>SYNC: 98.7%</span>
          </div>
        </div>
      </div>

      <div className="fixed top-4 right-4 z-10 pointer-events-none">
        <div className="text-cyan-400/60 font-mono text-xs text-right space-y-1">
          <div>TIMESTAMP: {new Date().toLocaleTimeString()}</div>
          <div>SESSION: ACTIVE</div>
          <div>FOCUS LEVEL: OPTIMAL</div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
        <div className="bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-lg px-6 py-2">
          <div className="flex items-center gap-4 text-cyan-400/80 font-mono text-sm">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
              <span>SYSTEM READY</span>
            </div>
            <div className="w-px h-4 bg-cyan-500/30"></div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
              <span>COGNITIVE ENHANCEMENT</span>
            </div>
            <div className="w-px h-4 bg-cyan-500/30"></div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
              <span>NEURAL SYNC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Peripheral Glow Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>
    </>
  );
}
