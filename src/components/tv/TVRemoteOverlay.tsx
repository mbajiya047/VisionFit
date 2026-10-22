import React, { useState, useEffect } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  CornerDownLeft, 
  Home, 
  Play, 
  Pause, 
  RotateCcw, 
  SlidersHorizontal,
  X,
  Tv
} from 'lucide-react';
import { tvAudio } from '../../services/audioService';

interface TVRemoteOverlayProps {
  onNavigateHome: () => void;
  onBack: () => void;
  onPlayPauseToggle?: () => void;
  isPlaying?: boolean;
}

export const TVRemoteOverlay: React.FC<TVRemoteOverlayProps> = ({
  onNavigateHome,
  onBack,
  onPlayPauseToggle,
  isPlaying = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeElementName, setActiveElementName] = useState<string>('None');

  // Track focused element for developer debugging
  useEffect(() => {
    const updateFocus = () => {
      const el = document.activeElement as HTMLElement;
      if (el && el !== document.body) {
        const label = el.getAttribute('aria-label') || el.innerText?.slice(0, 24) || el.tagName;
        setActiveElementName(label.trim() || el.tagName);
      } else {
        setActiveElementName('None');
      }
    };

    document.addEventListener('focusin', updateFocus);
    // Listen for toggle key 'r' or 'R'
    const handleKey = (e: KeyboardEvent) => {
      if ((e.key === 'r' || e.key === 'R') && (e.target === document.body || !(e.target as HTMLElement).tagName.match(/INPUT|TEXTAREA/))) {
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('focusin', updateFocus);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const sendKeyEvent = (key: string, code?: string) => {
    tvAudio.playNavTick();
    const event = new KeyboardEvent('keydown', {
      key,
      code: code || key,
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(event);
  };

  const handleSelect = () => {
    tvAudio.playNavTick();
    const activeEl = document.activeElement as HTMLElement;
    if (activeEl && typeof activeEl.click === 'function') {
      activeEl.click();
    } else {
      sendKeyEvent('Enter');
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 text-neutral-200 text-sm font-medium shadow-2xl backdrop-blur-md transition-all hover:scale-105"
        title="Open Fire TV Remote Simulator (Shortcut: R)"
        tabIndex={-1}
      >
        <Tv className="w-4 h-4 text-[#d4ff00]" />
        <span>Remote Simulator</span>
        <span className="px-1.5 py-0.5 text-xs bg-neutral-800 text-neutral-400 rounded border border-neutral-700">R</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center bg-[#131722]/95 border border-neutral-700/80 rounded-3xl p-5 shadow-2xl backdrop-blur-xl w-68 select-none transition-all animate-in fade-in slide-in-from-bottom-4">
      {/* Remote Header */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#d4ff00] animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-neutral-300 uppercase">
            Fire TV Remote
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-neutral-400 hover:text-white p-1 rounded-md hover:bg-neutral-800"
          tabIndex={-1}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Focus state pill */}
      <div className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-neutral-800 mb-4 text-center">
        <span className="text-[10px] uppercase font-mono text-neutral-500 block">TV Focused Element</span>
        <span className="text-xs font-mono text-[#d4ff00] truncate block">
          {activeElementName}
        </span>
      </div>

      {/* D-Pad Directional Ring */}
      <div className="relative w-44 h-44 rounded-full bg-[#1b212f] border-2 border-neutral-700/80 shadow-inner flex items-center justify-center my-1">
        {/* Up */}
        <button
          onClick={() => sendKeyEvent('ArrowUp')}
          className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-10 flex items-center justify-center text-neutral-300 hover:text-[#d4ff00] active:scale-95 transition-transform"
          title="D-Pad Up"
          tabIndex={-1}
        >
          <ChevronUp className="w-6 h-6" />
        </button>

        {/* Down */}
        <button
          onClick={() => sendKeyEvent('ArrowDown')}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-10 flex items-center justify-center text-neutral-300 hover:text-[#d4ff00] active:scale-95 transition-transform"
          title="D-Pad Down"
          tabIndex={-1}
        >
          <ChevronDown className="w-6 h-6" />
        </button>

        {/* Left */}
        <button
          onClick={() => sendKeyEvent('ArrowLeft')}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-12 flex items-center justify-center text-neutral-300 hover:text-[#d4ff00] active:scale-95 transition-transform"
          title="D-Pad Left"
          tabIndex={-1}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right */}
        <button
          onClick={() => sendKeyEvent('ArrowRight')}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-12 flex items-center justify-center text-neutral-300 hover:text-[#d4ff00] active:scale-95 transition-transform"
          title="D-Pad Right"
          tabIndex={-1}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Center Select Button */}
        <button
          onClick={handleSelect}
          className="w-18 h-18 rounded-full bg-[#273043] hover:bg-[#323d54] active:bg-[#d4ff00] active:text-black border border-neutral-600 text-neutral-100 font-bold text-xs tracking-wider uppercase shadow-lg flex items-center justify-center transition-all"
          title="Center Select (Enter)"
          tabIndex={-1}
        >
          SELECT
        </button>
      </div>

      {/* Standard TV Action Buttons Row 1: Back, Home, Menu */}
      <div className="grid grid-cols-3 gap-3 w-full mt-4">
        <button
          onClick={onBack}
          className="flex flex-col items-center justify-center py-2.5 rounded-xl bg-[#1f2637] hover:bg-[#2b354c] active:scale-95 border border-neutral-700/60 text-neutral-300 hover:text-white transition-all"
          title="Back (Escape)"
          tabIndex={-1}
        >
          <CornerDownLeft className="w-4 h-4 text-neutral-400 mb-1" />
          <span className="text-[10px] font-semibold tracking-wide">BACK</span>
        </button>

        <button
          onClick={onNavigateHome}
          className="flex flex-col items-center justify-center py-2.5 rounded-xl bg-[#1f2637] hover:bg-[#2b354c] active:scale-95 border border-neutral-700/60 text-neutral-300 hover:text-white transition-all"
          title="Home"
          tabIndex={-1}
        >
          <Home className="w-4 h-4 text-[#d4ff00] mb-1" />
          <span className="text-[10px] font-semibold tracking-wide">HOME</span>
        </button>

        <button
          onClick={() => sendKeyEvent('m')}
          className="flex flex-col items-center justify-center py-2.5 rounded-xl bg-[#1f2637] hover:bg-[#2b354c] active:scale-95 border border-neutral-700/60 text-neutral-300 hover:text-white transition-all"
          title="Menu / Options"
          tabIndex={-1}
        >
          <SlidersHorizontal className="w-4 h-4 text-neutral-400 mb-1" />
          <span className="text-[10px] font-semibold tracking-wide">MENU</span>
        </button>
      </div>

      {/* Row 2: Media Controls (Rewind, Play/Pause, Fast-Forward) */}
      <div className="grid grid-cols-3 gap-3 w-full mt-2.5">
        <button
          onClick={() => sendKeyEvent('ArrowLeft')}
          className="flex items-center justify-center py-2.5 rounded-xl bg-[#1a202e] hover:bg-[#252e42] active:scale-95 border border-neutral-800 text-neutral-400 hover:text-white transition-all"
          title="Rewind"
          tabIndex={-1}
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            if (onPlayPauseToggle) {
              onPlayPauseToggle();
            } else {
              sendKeyEvent('MediaPlayPause', 'Space');
            }
          }}
          className="flex items-center justify-center py-2.5 rounded-xl bg-[#2a3449] hover:bg-[#374561] active:bg-[#d4ff00] active:text-black border border-neutral-600 text-neutral-100 transition-all shadow-md"
          title="Play / Pause"
          tabIndex={-1}
        >
          {isPlaying ? <Pause className="w-4 h-4 text-[#d4ff00]" /> : <Play className="w-4 h-4 fill-current text-[#d4ff00]" />}
        </button>

        <button
          onClick={() => sendKeyEvent('ArrowRight')}
          className="flex items-center justify-center py-2.5 rounded-xl bg-[#1a202e] hover:bg-[#252e42] active:scale-95 border border-neutral-800 text-neutral-400 hover:text-white transition-all"
          title="Fast Forward"
          tabIndex={-1}
        >
          <RotateCcw className="w-4 h-4 transform -scale-x-100" />
        </button>
      </div>

      {/* Keyboard Shortcut Helper */}
      <div className="mt-3 text-center">
        <span className="text-[10px] text-neutral-500 font-sans">
          Use Physical Arrow Keys + Enter or Click Remote
        </span>
      </div>
    </div>
  );
};
