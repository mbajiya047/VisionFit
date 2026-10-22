import React from 'react';

interface ExerciseAnimatorProps {
  animationType: string;
  isPaused: boolean;
  phase: 'prepare' | 'work' | 'rest' | 'cooldown';
}

export const ExerciseAnimator: React.FC<ExerciseAnimatorProps> = ({
  animationType,
  isPaused,
  phase,
}) => {
  // If in rest phase, show restful breathing silhouette
  if (phase === 'rest') {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0d1017] rounded-3xl p-6 border border-neutral-800">
        <svg viewBox="0 0 200 200" className="w-48 h-48 animate-pulse text-sky-400">
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="6 6" opacity="0.4" />
          <circle cx="100" cy="100" r="45" fill="rgba(56, 189, 248, 0.15)" stroke="currentColor" strokeWidth="2" />
          <path d="M75 100 Q100 80 125 100 T175 100" fill="none" stroke="#d4ff00" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        </svg>
        <span className="text-sm font-mono uppercase tracking-wider text-neutral-400 mt-2">
          Deep Recovery Breathing
        </span>
      </div>
    );
  }

  // Biomechanical animated figures for active workout
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0d1017] rounded-3xl p-6 border border-neutral-800 overflow-hidden">
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className={`w-2.5 h-2.5 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-[#d4ff00] animate-ping'}`} />
        <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
          {isPaused ? 'Motion Paused' : 'Biomechanics Guidance'}
        </span>
      </div>

      <div className="w-56 h-56 flex items-center justify-center">
        {animationType === 'squat' && (
          <svg viewBox="0 0 100 120" className={`w-full h-full ${!isPaused ? 'animate-bounce duration-1000' : ''}`}>
            {/* Head */}
            <circle cx="50" cy="20" r="8" fill="#d4ff00" />
            {/* Spine */}
            <line x1="50" y1="28" x2="50" y2="60" stroke="#f3f4f6" strokeWidth="4" strokeLinecap="round" />
            {/* Arms extended for balance */}
            <line x1="50" y1="38" x2="25" y2="38" stroke="#f3f4f6" strokeWidth="3.5" strokeLinecap="round" />
            {/* Thighs */}
            <line x1="50" y1="60" x2="32" y2="78" stroke="#d4ff00" strokeWidth="5" strokeLinecap="round" />
            <line x1="50" y1="60" x2="68" y2="78" stroke="#d4ff00" strokeWidth="5" strokeLinecap="round" />
            {/* Calves & Feet */}
            <line x1="32" y1="78" x2="30" y2="105" stroke="#f3f4f6" strokeWidth="4" strokeLinecap="round" />
            <line x1="68" y1="78" x2="70" y2="105" stroke="#f3f4f6" strokeWidth="4" strokeLinecap="round" />
            <line x1="30" y1="105" x2="20" y2="105" stroke="#9ca3af" strokeWidth="4" strokeLinecap="round" />
            <line x1="70" y1="105" x2="80" y2="105" stroke="#9ca3af" strokeWidth="4" strokeLinecap="round" />
          </svg>
        )}

        {animationType === 'pushup' && (
          <svg viewBox="0 0 140 80" className={`w-full h-full ${!isPaused ? 'animate-pulse duration-700' : ''}`}>
            {/* Head */}
            <circle cx="30" cy="35" r="7" fill="#d4ff00" />
            {/* Torso & Legs Plank Line */}
            <line x1="37" y1="38" x2="115" y2="48" stroke="#d4ff00" strokeWidth="5" strokeLinecap="round" />
            {/* Arms */}
            <line x1="45" y1="40" x2="45" y2="65" stroke="#f3f4f6" strokeWidth="4" strokeLinecap="round" />
            {/* Feet on floor */}
            <circle cx="115" cy="50" r="3" fill="#f3f4f6" />
            {/* Floor baseline */}
            <line x1="20" y1="66" x2="130" y2="66" stroke="#262626" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        )}

        {animationType === 'jumping-jacks' && (
          <svg viewBox="0 0 100 120" className={`w-full h-full ${!isPaused ? 'animate-bounce duration-500' : ''}`}>
            {/* Head */}
            <circle cx="50" cy="18" r="8" fill="#d4ff00" />
            {/* Spine */}
            <line x1="50" y1="26" x2="50" y2="65" stroke="#f3f4f6" strokeWidth="4" strokeLinecap="round" />
            {/* Arms reaching up */}
            <line x1="50" y1="36" x2="20" y2="15" stroke="#f3f4f6" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="50" y1="36" x2="80" y2="15" stroke="#f3f4f6" strokeWidth="3.5" strokeLinecap="round" />
            {/* Legs wide */}
            <line x1="50" y1="65" x2="25" y2="110" stroke="#d4ff00" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="50" y1="65" x2="75" y2="110" stroke="#d4ff00" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
        )}

        {animationType === 'plank' && (
          <svg viewBox="0 0 140 80" className="w-full h-full">
            {/* Head */}
            <circle cx="32" cy="38" r="7" fill="#d4ff00" />
            {/* Flat rigid plank */}
            <line x1="39" y1="40" x2="118" y2="40" stroke="#d4ff00" strokeWidth="5" strokeLinecap="round" />
            {/* Forearm stack */}
            <line x1="45" y1="41" x2="45" y2="58" stroke="#f3f4f6" strokeWidth="4" strokeLinecap="round" />
            <line x1="45" y1="58" x2="56" y2="58" stroke="#f3f4f6" strokeWidth="4" strokeLinecap="round" />
            {/* Feet */}
            <line x1="118" y1="40" x2="120" y2="58" stroke="#f3f4f6" strokeWidth="3.5" strokeLinecap="round" />
            {/* Floor */}
            <line x1="20" y1="60" x2="130" y2="60" stroke="#262626" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        )}

        {/* Fallback default posture loop */}
        {['lunge', 'mountain-climbers', 'glute-bridge', 'cat-cow', 'downward-dog', 'arm-circles'].includes(animationType) === false &&
         !['squat', 'pushup', 'jumping-jacks', 'plank'].includes(animationType) && (
          <svg viewBox="0 0 100 120" className="w-full h-full animate-pulse">
            <circle cx="50" cy="22" r="8" fill="#d4ff00" />
            <line x1="50" y1="30" x2="50" y2="70" stroke="#f3f4f6" strokeWidth="4" strokeLinecap="round" />
            <line x1="50" y1="45" x2="25" y2="60" stroke="#f3f4f6" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="50" y1="45" x2="75" y2="60" stroke="#f3f4f6" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="50" y1="70" x2="35" y2="110" stroke="#d4ff00" strokeWidth="4" strokeLinecap="round" />
            <line x1="50" y1="70" x2="65" y2="110" stroke="#d4ff00" strokeWidth="4" strokeLinecap="round" />
          </svg>
        )}

        {/* Dynamic Lunge */}
        {animationType === 'lunge' && (
          <svg viewBox="0 0 120 120" className={`w-full h-full ${!isPaused ? 'animate-pulse duration-1000' : ''}`}>
            <circle cx="50" cy="22" r="8" fill="#d4ff00" />
            <line x1="50" y1="30" x2="50" y2="68" stroke="#f3f4f6" strokeWidth="4" strokeLinecap="round" />
            <line x1="50" y1="42" x2="35" y2="52" stroke="#f3f4f6" strokeWidth="3" strokeLinecap="round" />
            <line x1="50" y1="42" x2="65" y2="52" stroke="#f3f4f6" strokeWidth="3" strokeLinecap="round" />
            {/* Front 90-deg leg */}
            <line x1="50" y1="68" x2="75" y2="72" stroke="#d4ff00" strokeWidth="5" strokeLinecap="round" />
            <line x1="75" y1="72" x2="75" y2="105" stroke="#f3f4f6" strokeWidth="4" strokeLinecap="round" />
            {/* Back leg drop */}
            <line x1="50" y1="68" x2="30" y2="85" stroke="#d4ff00" strokeWidth="5" strokeLinecap="round" />
            <line x1="30" y1="85" x2="20" y2="105" stroke="#f3f4f6" strokeWidth="4" strokeLinecap="round" />
          </svg>
        )}

        {/* Cat Cow / Mobility */}
        {(animationType === 'cat-cow' || animationType === 'arm-circles' || animationType === 'glute-bridge' || animationType === 'mountain-climbers' || animationType === 'downward-dog') && (
          <svg viewBox="0 0 120 100" className="w-full h-full animate-pulse">
            <circle cx="35" cy="40" r="7" fill="#d4ff00" />
            <path d="M40 45 Q70 35 95 48" fill="none" stroke="#d4ff00" strokeWidth="5" strokeLinecap="round" />
            <line x1="48" y1="45" x2="48" y2="80" stroke="#f3f4f6" strokeWidth="4" strokeLinecap="round" />
            <line x1="90" y1="50" x2="90" y2="80" stroke="#f3f4f6" strokeWidth="4" strokeLinecap="round" />
            <line x1="20" y1="82" x2="110" y2="82" stroke="#262626" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-xs font-mono text-neutral-400">Target Muscle Engagement:</span>
        <span className="text-xs font-mono font-bold text-[#d4ff00] uppercase">Active</span>
      </div>
    </div>
  );
};
