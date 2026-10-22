import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Dumbbell, 
  Sparkles, 
  Compass, 
  Sliders, 
  BarChart3, 
  Settings as SettingsIcon,
  Tv
} from 'lucide-react';
import { TVScreen, UserStats } from '../../types';

interface TVHeaderProps {
  currentScreen: TVScreen;
  onSelectScreen: (screen: TVScreen) => void;
  stats: UserStats;
}

export const TVHeader: React.FC<TVHeaderProps> = ({
  currentScreen,
  onSelectScreen,
  stats,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const navItems: { id: TVScreen; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Tv className="w-5 h-5" /> },
    { id: 'discover', label: 'Discover', icon: <Compass className="w-5 h-5" /> },
    { id: 'setup', label: 'Custom Workout', icon: <Sliders className="w-5 h-5" /> },
    { id: 'coach', label: 'AI Coach', icon: <Sparkles className="w-5 h-5 text-[#d4ff00]" /> },
    { id: 'progress', label: 'Progress', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon className="w-5 h-5" /> },
  ];

  return (
    <header className="w-full flex items-center justify-between pb-4 mb-4 border-b border-neutral-800/80 z-20">
      {/* Brand & Fire TV Edition Tag */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4ff00] to-[#99cc00] flex items-center justify-center shadow-lg shadow-[#d4ff00]/20">
            <Dumbbell className="w-6 h-6 text-black" strokeWidth={2.4} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-white uppercase font-sans">
                VISION<span className="text-[#d4ff00]">FIT</span>
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-neutral-800 font-semibold text-neutral-300 tracking-wider border border-neutral-700">
                TV
              </span>
            </div>
            <span className="text-[11px] font-medium tracking-wide text-neutral-400">
              Fire TV Hackathon 2026 Edition
            </span>
          </div>
        </div>
      </div>

      {/* Screen Navigation Tabs (Spatial TV Focusable) */}
      <nav className="flex items-center gap-2 bg-[#12151d] p-1.5 rounded-2xl border border-neutral-800/90 shadow-inner">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectScreen(item.id)}
              className={`tv-focusable flex items-center gap-2.5 px-4 py-2 rounded-xl text-base font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-neutral-800 text-white shadow-md border border-neutral-700'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
              }`}
              data-tv-focus="true"
              aria-label={`Navigate to ${item.label}`}
            >
              {item.icon}
              <span>{item.label}</span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4ff00] animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right Stats & Clock Widget */}
      <div className="flex items-center gap-3">
        {/* Streak Counter Pill */}
        <div 
          onClick={() => onSelectScreen('progress')}
          className="tv-focusable flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900/90 border border-amber-500/30 text-amber-400 cursor-pointer shadow-sm"
          tabIndex={0}
          role="button"
          aria-label={`Current workout streak: ${stats.currentStreakDays} days`}
        >
          <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
          <div className="flex flex-col text-left">
            <span className="text-sm font-bold text-amber-300 leading-tight">
              {stats.currentStreakDays} Day Streak
            </span>
            <span className="text-[10px] text-amber-500/80 font-medium">
              {stats.totalMinutes}m this week
            </span>
          </div>
        </div>

        {/* Live TV Clock */}
        <div className="px-3 py-1.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-neutral-300 font-mono text-base font-medium">
          {timeStr || '12:00'}
        </div>
      </div>
    </header>
  );
};
