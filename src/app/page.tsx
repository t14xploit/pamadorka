"use client";

import { useState, useEffect } from "react";
import { PomodoroDock, PomodoroMode } from "@/components/pomodoro-dock";
import { AREffects } from "@/components/ar-effects";
import { PomodoroTimer, TimerMode, timerSettings } from "@/components/pomodoro-timer";
import { YouTubeMusicSearch } from "@/components/youtube-music-search";
import { DateTimeDisplay } from "@/components/date-time-display";
import { StatisticsDashboard } from "@/components/statistics-dashboard";
import dynamic from 'next/dynamic';
const TicTacToe = dynamic(() => import('@/components/tic-tac-toe'), { ssr: false });

interface Particle {
  id: number;
  left: number;
  top: number;
  animationDelay: number;
  animationDuration: number;
}

interface SessionData {
  date: string;
  workSessions: number;
  totalFocusTime: number;
  shortBreaks: number;
  longBreaks: number;
}

interface StatisticsData {
  totalSessions: number;
  totalFocusTime: number;
  currentStreak: number;
  longestStreak: number;
  todaysSessions: number;
  weeklyData: SessionData[];
}

export default function Home() {
  const [currentMode, setCurrentMode] = useState<PomodoroMode>("studying");
  const [particles, setParticles] = useState<Particle[]>([]);

  // Timer state with localStorage persistence
  const [timerMode, setTimerMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [completedMode, setCompletedMode] = useState<TimerMode | null>(null);
  const [timerStartTime, setTimerStartTime] = useState<number | null>(null);
  const [initialTimeLeft, setInitialTimeLeft] = useState(25 * 60);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [accumulatedFocusTime, setAccumulatedFocusTime] = useState(0); // in seconds

  // Load timer state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTimerState = localStorage.getItem('pomodoroTimerState');
      if (savedTimerState) {
        try {
          const parsed = JSON.parse(savedTimerState);
          setTimerMode(parsed.timerMode || "work");
          setSessions(parsed.sessions || 0);

          // If timer was running when saved, calculate current time left
          if (parsed.isRunning && parsed.timerStartTime && parsed.initialTimeLeft) {
            const now = Date.now();
            const elapsed = Math.floor((now - parsed.timerStartTime) / 1000);
            const currentTimeLeft = Math.max(0, parsed.initialTimeLeft - elapsed);

            if (currentTimeLeft > 0) {
              setTimeLeft(currentTimeLeft);
              setIsTimerRunning(true);
              setTimerStartTime(parsed.timerStartTime);
              setInitialTimeLeft(parsed.initialTimeLeft);
              setSessionStartTime(parsed.sessionStartTime || null);
              setAccumulatedFocusTime(parsed.accumulatedFocusTime || 0);
            } else {
              // Timer has completed while away - save any accumulated focus time
              if (parsed.timerMode === "work" && parsed.sessionStartTime) {
                const totalSessionTime = Math.floor((now - parsed.sessionStartTime) / 1000);
                const totalFocusTime = (parsed.accumulatedFocusTime || 0) + totalSessionTime;
                updateFocusTimeStatistics(totalFocusTime);
              }
              setTimeLeft(0);
              setIsTimerRunning(false);
            }
          } else {
            setTimeLeft(parsed.timeLeft || timerSettings.work);
            setAccumulatedFocusTime(parsed.accumulatedFocusTime || 0);
          }
        } catch (error) {
          console.log("Failed to parse saved timer state:", error);
        }
      }
    }
  }, []);

  // Save timer state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timerState = {
        timerMode,
        timeLeft,
        sessions,
        isRunning: isTimerRunning,
        timerStartTime,
        initialTimeLeft,
        sessionStartTime,
        accumulatedFocusTime,
        lastSaved: Date.now()
      };
      localStorage.setItem('pomodoroTimerState', JSON.stringify(timerState));
    }
  }, [timerMode, timeLeft, sessions, isTimerRunning, timerStartTime, initialTimeLeft, sessionStartTime, accumulatedFocusTime]);

  const handleModeChange = (mode: PomodoroMode) => {
    setCurrentMode(mode);
    console.log("Mode changed to:", mode);
  };

  // Timer handlers
  const handleTimerModeChange = (mode: TimerMode) => {
    // Save any accumulated focus time before switching modes
    if (timerMode === "work" && isTimerRunning && sessionStartTime) {
      const focusTimeSpent = Math.floor((Date.now() - sessionStartTime) / 1000);
      const totalFocusTime = accumulatedFocusTime + focusTimeSpent;
      updateFocusTimeStatistics(totalFocusTime);
    }

    setTimerMode(mode);
    const newTime = timerSettings[mode];
    setTimeLeft(newTime);
    setInitialTimeLeft(newTime);
    setAccumulatedFocusTime(0); // Reset accumulated time

    if (isTimerRunning) {
      setTimerStartTime(Date.now());
      // Start new session tracking for work mode
      if (mode === "work") {
        setSessionStartTime(Date.now());
      } else {
        setSessionStartTime(null);
      }
    } else {
      setSessionStartTime(null);
    }
  };

  const handleTimeChange = (time: number) => {
    setTimeLeft(time);
    setInitialTimeLeft(time);
    if (isTimerRunning) {
      setTimerStartTime(Date.now());
    }
  };

  const handleToggleTimer = () => {
    if (!isTimerRunning) {
      // Starting the timer
      const now = Date.now();
      setTimerStartTime(now);
      setInitialTimeLeft(timeLeft);
      setIsTimerRunning(true);

      // Start tracking session time for work mode
      if (timerMode === "work") {
        setSessionStartTime(now);
      }
    } else {
      // Stopping the timer - save accumulated focus time
      if (timerMode === "work" && sessionStartTime) {
        const focusTimeSpent = Math.floor((Date.now() - sessionStartTime) / 1000);
        const newAccumulatedTime = accumulatedFocusTime + focusTimeSpent;
        setAccumulatedFocusTime(newAccumulatedTime);

        // Update statistics with the focus time spent
        updateFocusTimeStatistics(focusTimeSpent);
      }

      setIsTimerRunning(false);
      setTimerStartTime(null);
      setSessionStartTime(null);
    }
  };



  const handleSessionsChange = (newSessions: number) => {
    setSessions(newSessions);

    // Update statistics when a work session is completed
    if (newSessions > sessions && typeof window !== 'undefined') {
      updateStatistics();
    }
  };

  const updateFocusTimeStatistics = (focusTimeInSeconds: number) => {
    const today = new Date().toISOString().split('T')[0];
    const savedStats = localStorage.getItem('pomodoroStats');

    let stats: StatisticsData = {
      totalSessions: 0,
      totalFocusTime: 0,
      currentStreak: 0,
      longestStreak: 0,
      todaysSessions: 0,
      weeklyData: []
    };

    if (savedStats) {
      try {
        stats = JSON.parse(savedStats);
      } catch (error) {
        console.log("Failed to parse saved statistics:", error);
      }
    }

    // Convert seconds to minutes
    const focusTimeInMinutes = Math.round(focusTimeInSeconds / 60);

    // Update total focus time
    stats.totalFocusTime += focusTimeInMinutes;

    // Update today's focus time
    const todayData = stats.weeklyData.find((day: SessionData) => day.date === today);
    if (todayData) {
      todayData.totalFocusTime += focusTimeInMinutes;
    } else {
      stats.weeklyData.push({
        date: today,
        workSessions: 0,
        totalFocusTime: focusTimeInMinutes,
        shortBreaks: 0,
        longBreaks: 0
      });
    }

    // Update streak logic based on focus time (at least 5 minutes counts as active day)
    const todayTotalFocus = stats.weeklyData.find((day: SessionData) => day.date === today)?.totalFocusTime || 0;

    if (todayTotalFocus >= 5) { // At least 5 minutes of focus time
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      const yesterdayData = stats.weeklyData.find((day: SessionData) => day.date === yesterdayStr);

      // Check if this is the first time today we reach 5+ minutes
      if (todayTotalFocus - focusTimeInMinutes < 5) {
        if (yesterdayData && yesterdayData.totalFocusTime >= 5) {
          stats.currentStreak += 1;
        } else {
          stats.currentStreak = 1;
        }

        if (stats.currentStreak > stats.longestStreak) {
          stats.longestStreak = stats.currentStreak;
        }
      }
    }

    // Keep only last 30 days of data
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    stats.weeklyData = stats.weeklyData.filter((day: SessionData) =>
      new Date(day.date) >= thirtyDaysAgo
    );

    localStorage.setItem('pomodoroStats', JSON.stringify(stats));
  };

  const updateStatistics = () => {
    const today = new Date().toISOString().split('T')[0];
    const savedStats = localStorage.getItem('pomodoroStats');

    let stats: StatisticsData = {
      totalSessions: 0,
      totalFocusTime: 0,
      currentStreak: 0,
      longestStreak: 0,
      todaysSessions: 0,
      weeklyData: []
    };

    if (savedStats) {
      try {
        stats = JSON.parse(savedStats);
      } catch (error) {
        console.log("Failed to parse saved statistics:", error);
      }
    }

    // Update completed sessions
    stats.totalSessions += 1;

    // Update today's sessions
    const todayData = stats.weeklyData.find((day: SessionData) => day.date === today);
    if (todayData) {
      todayData.workSessions += 1;
    } else {
      stats.weeklyData.push({
        date: today,
        workSessions: 1,
        totalFocusTime: 0,
        shortBreaks: 0,
        longBreaks: 0
      });
    }

    stats.todaysSessions = stats.weeklyData.find((day: SessionData) => day.date === today)?.workSessions || 0;

    localStorage.setItem('pomodoroStats', JSON.stringify(stats));
  };

  const handleShowAlert = (show: boolean) => {
    setShowAlert(show);
  };

  const handleCompletedModeChange = (mode: TimerMode | null) => {
    setCompletedMode(mode);
  };

  // Timestamp-based timer that works even when tab is inactive
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isTimerRunning && timerStartTime && initialTimeLeft > 0) {
      intervalId = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - timerStartTime) / 1000);
        const currentTimeLeft = Math.max(0, initialTimeLeft - elapsed);

        setTimeLeft(currentTimeLeft);

        // Timer completed
        if (currentTimeLeft === 0) {
          setIsTimerRunning(false);
          setTimerStartTime(null);

          // Handle timer completion
          setCompletedMode(timerMode);
          setShowAlert(true);

          // Auto-hide alert after 5 seconds
          setTimeout(() => {
            setShowAlert(false);
            setCompletedMode(null);
          }, 5000);

          if (timerMode === "work") {
            // Save focus time for completed session
            if (sessionStartTime) {
              const focusTimeSpent = Math.floor((Date.now() - sessionStartTime) / 1000);
              const totalFocusTime = accumulatedFocusTime + focusTimeSpent;
              updateFocusTimeStatistics(totalFocusTime);
              setAccumulatedFocusTime(0); // Reset for next session
            }

            const newSessions = sessions + 1;
            setSessions(newSessions);

            // Update completed session statistics
            updateStatistics();

            // Every 4 work sessions, take a long break
            const nextMode = newSessions % 4 === 0 ? "longBreak" : "shortBreak";
            setTimerMode(nextMode);
            setTimeLeft(timerSettings[nextMode]);
            setInitialTimeLeft(timerSettings[nextMode]);
            setSessionStartTime(null);
          } else {
            setTimerMode("work");
            setTimeLeft(timerSettings.work);
            setInitialTimeLeft(timerSettings.work);
          }
        }
      }, 100); // Update every 100ms for smooth display
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isTimerRunning, timerStartTime, initialTimeLeft, timerMode, sessions, accumulatedFocusTime, sessionStartTime]);

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
            <div className="relativesu">
              
              <div className="absolute inset-0 text-6xl font-bold text-cyan-400/20 blur-sm">
                POMODORO
              </div>
            </div>

            <div className="text-center mb-8">
              <p className="text-xl text-cyan-300/80 font-mono mb-3">
                &gt; You have 2 choices today:
              </p>
              <div className="space-y-2">
                <p className="text-lg text-cyan-400 font-bold font-mono">
                  [1] Work hard
                </p>
                <p className="text-lg text-cyan-400 font-bold font-mono">
                  [2] Work SMART and hard
                </p>
              </div>
            </div>

            {/* Pomodoro Timer */}
            <PomodoroTimer
              mode={timerMode}
              timeLeft={timeLeft}
              isRunning={isTimerRunning}
              sessions={sessions}
              showAlert={showAlert}
              completedMode={completedMode}
              onModeChange={handleTimerModeChange}
              onTimeChange={handleTimeChange}
              onToggleTimer={handleToggleTimer}

              onSessionsChange={handleSessionsChange}
              onShowAlert={handleShowAlert}
              onCompletedModeChange={handleCompletedModeChange}
            />
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
                <main className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Rest Time 🧘</h1>
      <TicTacToe />
    </main>
              </div>
            </div>
          </div>
        );
      case "music":
        return (
          <div className="text-center relative">
            

            <p className="text-xl text-purple-300/80 mb-8 font-mono">
              &gt; Neural frequency synchronization active...
            </p>

            {/* YouTube Music Search Interface */}
            <div className="relative mt-12 p-8 bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-violet-500/10 rounded-2xl"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-purple-400 mb-6 font-mono">[MUSIC SEARCH PROTOCOL]</h2>
                <YouTubeMusicSearch />
              </div>
            </div>
          </div>
        );
      case "statistics":
        return (
          <div className="text-center relative">
            <StatisticsDashboard />
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

      {/* Date Time Display */}
      <DateTimeDisplay />

      {/* Mini Timer Display - Visible in all modes */}
      <div className="fixed top-6 right-6 z-40">
        <div className="bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-lg px-4 py-2">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${isTimerRunning ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
            <div className="text-cyan-400 font-mono text-sm">
              {Math.floor(timeLeft / 60).toString().padStart(2, "0")}:{(timeLeft % 60).toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-gray-400 font-mono">
              {timerMode === "work" ? "FOCUS" : timerMode === "shortBreak" ? "BREAK" : "LONG BREAK"}
            </div>
          </div>
        </div>
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
