"use client";

import { useState, useEffect } from "react";
import { PomodoroDock, PomodoroMode } from "@/components/pomodoro-dock";
import { AREffects } from "@/components/ar-effects";
import { PomodoroTimer } from "@/components/pomodoro-timer";

interface Particle {
  id: number;
  left: number;
  top: number;
  animationDelay: number;
  animationDuration: number;
}

export default function Home() {
  const [currentMode, setCurrentMode] = useState<PomodoroMode>("studying");
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleModeChange = (mode: PomodoroMode) => {
    setCurrentMode(mode);
    console.log("Mode changed to:", mode);
  };

  // Generate particles on client side only
  useEffect(() => {
    const generatedParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: 2 + Math.random() * 3,
    }));
    setParticles(generatedParticles);
  }, []);

  const getModeContent = () => {
    switch (currentMode) {
      case "studying":
        return (
          <div className="text-center relative">
            {/* Holographic Title */}
            <div className="relative mb-8">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-600 bg-clip-text text-transparent mb-4 animate-pulse">
                POMODORO
              </h1>
              <div className="absolute inset-0 text-6xl font-bold text-cyan-400/20 blur-sm">
                POMODORO
              </div>
            </div>

            <p className="text-xl text-cyan-300/80 mb-8 font-mono">
              &gt; Time management protocol active...
            </p>

            {/* Pomodoro Timer */}
            <PomodoroTimer />
          </div>
        );
      case "playing":
        return (
          <div className="text-center relative">
            <div className="relative mb-8">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent mb-4 animate-pulse">
                VR PLAYGROUND
              </h1>
              <div className="absolute inset-0 text-6xl font-bold text-green-400/20 blur-sm">
                VR PLAYGROUND
              </div>
            </div>

            <p className="text-xl text-green-300/80 mb-8 font-mono">
              &gt; Loading virtual reality environment...
            </p>

            <div className="relative mt-12 p-8 bg-black/60 backdrop-blur-xl border border-green-500/30 rounded-2xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10 rounded-2xl"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-green-400 mb-6 font-mono">[BREAK PROTOCOL]</h2>
                <p className="text-green-300/70 text-lg leading-relaxed">
                  Reality simulation active. Stress levels: <span className="text-green-400 font-bold">MINIMAL</span>
                  <br />
                  Recharge sequence initiated.
                </p>
              </div>
            </div>
          </div>
        );
      case "music":
        return (
          <div className="text-center relative">
            <div className="relative mb-8">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-violet-500 to-purple-600 bg-clip-text text-transparent mb-4 animate-pulse">
                AUDIO MATRIX
              </h1>
              <div className="absolute inset-0 text-6xl font-bold text-purple-400/20 blur-sm">
                AUDIO MATRIX
              </div>
            </div>

            <p className="text-xl text-purple-300/80 mb-8 font-mono">
              &gt; Synchronizing neural frequencies...
            </p>

            <div className="relative mt-12 p-8 bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-violet-500/10 rounded-2xl"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-purple-400 mb-6 font-mono">[AUDIO SYNC]</h2>
                <p className="text-purple-300/70 text-lg leading-relaxed">
                  Binaural beats activated. Concentration enhancement: <span className="text-purple-400 font-bold">ONLINE</span>
                  <br />
                  Neural harmony achieved.
                </p>
              </div>
            </div>
          </div>
        );
      case "videos":
        return (
          <div className="text-center relative">
            <div className="relative mb-8">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-400 via-rose-500 to-pink-600 bg-clip-text text-transparent mb-4 animate-pulse">
                HOLO DISPLAY
              </h1>
              <div className="absolute inset-0 text-6xl font-bold text-pink-400/20 blur-sm">
                HOLO DISPLAY
              </div>
            </div>

            <p className="text-xl text-pink-300/80 mb-8 font-mono">
              &gt; Projecting holographic content...
            </p>

            <div className="relative mt-12 p-8 bg-black/60 backdrop-blur-xl border border-pink-500/30 rounded-2xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-rose-500/10 rounded-2xl"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-pink-400 mb-6 font-mono">[HOLO ACTIVE]</h2>
                <p className="text-pink-300/70 text-lg leading-relaxed">
                  Visual cortex stimulation: <span className="text-pink-400 font-bold">OPTIMAL</span>
                  <br />
                  Knowledge transfer protocol engaged.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* AR/VR Effects */}
      <AREffects />

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-pink-500/10"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}
        ></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60 animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl w-full">
          {getModeContent()}
        </div>
      </main>

      {/* Cyberpunk Dock */}
      <PomodoroDock
        currentMode={currentMode}
        onModeChange={handleModeChange}
      />

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
}
