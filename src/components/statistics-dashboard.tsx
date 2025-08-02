"use client";

import React, { useState, useEffect } from "react";
import { Brain, Clock, Target, TrendingUp, Calendar } from "lucide-react";

interface SessionData {
  date: string;
  workSessions: number;
  totalFocusTime: number; // in minutes
  shortBreaks: number;
  longBreaks: number;
}

interface StatisticsData {
  totalSessions: number;
  totalFocusTime: number; // in minutes
  currentStreak: number;
  longestStreak: number;
  todaysSessions: number;
  weeklyData: SessionData[];
}

export function StatisticsDashboard() {
  const [stats, setStats] = useState<StatisticsData>({
    totalSessions: 0,
    totalFocusTime: 0,
    currentStreak: 0,
    longestStreak: 0,
    todaysSessions: 0,
    weeklyData: []
  });

  // Load statistics from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedStats = localStorage.getItem('pomodoroStats');
      if (savedStats) {
        try {
          const parsed = JSON.parse(savedStats);
          setStats(parsed);
        } catch (error) {
          console.log("Failed to parse saved statistics:", error);
        }
      }
    }
  }, []);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getStreakStatus = () => {
    if (stats.currentStreak === 0) {
      return "Start your journey!";
    } else if (stats.currentStreak < 3) {
      return "Building momentum...";
    } else if (stats.currentStreak < 7) {
      return "Great progress!";
    } else if (stats.currentStreak < 14) {
      return "Excellent consistency!";
    } else {
      return "Productivity master!";
    }
  };

  const getWeeklyAverage = () => {
    if (stats.weeklyData.length === 0) return 0;
    const totalSessions = stats.weeklyData.reduce((sum, day) => sum + day.workSessions, 0);
    return Math.round(totalSessions / stats.weeklyData.length);
  };

  const statCards = [
    {
      title: "Total Sessions",
      value: stats.totalSessions.toString(),
      icon: Brain,
      color: "text-cyan-400",
      bgColor: "from-cyan-500/10",
      borderColor: "border-cyan-500/30",
      description: "Completed focus sessions"
    },
    {
      title: "Focus Time",
      value: formatTime(stats.totalFocusTime),
      icon: Clock,
      color: "text-green-400",
      bgColor: "from-green-500/10",
      borderColor: "border-green-500/30",
      description: "Total time in deep focus"
    },
    {
      title: "Current Streak",
      value: `${stats.currentStreak} days`,
      icon: Target,
      color: "text-purple-400",
      bgColor: "from-purple-500/10",
      borderColor: "border-purple-500/30",
      description: getStreakStatus()
    },
    {
      title: "Best Streak",
      value: `${stats.longestStreak} days`,
      icon: TrendingUp,
      color: "text-yellow-400",
      bgColor: "from-yellow-500/10",
      borderColor: "border-yellow-500/30",
      description: "Your longest streak"
    }
  ];

  return (
    <div className="text-center relative max-w-6xl mx-auto">
      {/* Header */}
      <div className="relative mb-8">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600 bg-clip-text text-transparent mb-4 animate-pulse">
          NEURAL ANALYTICS
        </h1>
        <div className="absolute inset-0 text-6xl font-bold text-cyan-400/20 blur-sm">
          NEURAL ANALYTICS
        </div>
      </div>

      <p className="text-xl text-cyan-300/80 mb-8 font-mono">
        &gt; Analyzing productivity patterns and cognitive performance...
      </p>

      {/* Today's Summary */}
      <div className="mb-8 p-6 bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 rounded-2xl"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 font-mono">[TODAY'S PERFORMANCE]</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 font-mono">{stats.todaysSessions}</div>
              <div className="text-sm text-gray-400 font-mono">Sessions Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 font-mono">{getWeeklyAverage()}</div>
              <div className="text-sm text-gray-400 font-mono">Weekly Average</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 font-mono">
                {stats.totalSessions > 0 ? Math.round((stats.totalFocusTime / stats.totalSessions) * 10) / 10 : 0}m
              </div>
              <div className="text-sm text-gray-400 font-mono">Avg Session Length</div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`relative p-6 bg-black/60 backdrop-blur-xl border ${card.borderColor} rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.bgColor} via-transparent to-black/10 rounded-2xl`}></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <Icon size={24} className={card.color} />
                  <div className={`text-2xl font-bold ${card.color} font-mono`}>
                    {card.value}
                  </div>
                </div>
                <h3 className={`text-lg font-bold ${card.color} mb-2 font-mono`}>
                  {card.title}
                </h3>
                <p className="text-sm text-gray-400 font-mono">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Progress */}
      <div className="p-6 bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 rounded-2xl"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-purple-400 mb-6 font-mono">[WEEKLY PROGRESS MATRIX]</h2>
          
          {stats.weeklyData.length > 0 ? (
            <div className="grid grid-cols-7 gap-3 md:gap-4">
              {stats.weeklyData.slice(-7).map((day, index) => {
                const intensity = Math.min(day.workSessions / 8, 1); // Max 8 sessions for full intensity
                return (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div className="text-xs text-gray-400 font-mono text-center min-h-[16px]">
                      {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                    </div>
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-lg border border-purple-500/30 flex items-center justify-center font-mono text-xs md:text-sm transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30`}
                      style={{
                        backgroundColor: `rgba(168, 85, 247, ${intensity * 0.5})`,
                        borderColor: intensity > 0 ? 'rgba(168, 85, 247, 0.6)' : 'rgba(168, 85, 247, 0.3)'
                      }}
                    >
                      {day.workSessions}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar size={48} className="text-purple-400/50 mx-auto mb-4" />
              <p className="text-purple-300/70 font-mono">
                Start completing sessions to see your weekly progress
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
