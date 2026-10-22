import React, { useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Clock, 
  Flame, 
  Dumbbell, 
  Target, 
  CheckCircle2, 
  Sliders,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Workout } from '../../types';

interface WorkoutPreviewModalProps {
  workout: Workout;
  onClose: () => void;
  onStart: (workout: Workout) => void;
  onCustomize: (workout: Workout) => void;
}

export const WorkoutPreviewModal: React.FC<WorkoutPreviewModalProps> = ({
  workout,
  onClose,
  onStart,
  onCustomize,
}) => {
  const startButtonRef = useRef<HTMLButtonElement>(null);

  // Auto-focus the start button on modal open
  useEffect(() => {
    setTimeout(() => {
      startButtonRef.current?.focus();
    }, 50);
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-6 select-none animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
    >
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#10141d] border border-neutral-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left">
        {/* Modal Header Banner */}
        <div className="relative h-64 w-full shrink-0 overflow-hidden bg-neutral-900">
          <img
            src={workout.heroImage}
            alt={workout.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10141d] via-[#10141d]/60 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="tv-focusable absolute top-4 right-4 w-11 h-11 rounded-full bg-black/60 hover:bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition-all cursor-pointer"
            aria-label="Close Preview"
            data-tv-focus="true"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Banner Text */}
          <div className="absolute bottom-5 left-8 right-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-md bg-[#d4ff00] text-black font-extrabold text-xs tracking-wider uppercase">
                {workout.category}
              </span>
              <span className="px-3 py-1 rounded-md bg-neutral-800 text-neutral-300 font-bold text-xs uppercase border border-neutral-700">
                {workout.difficulty}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/60 text-amber-400 font-bold text-xs border border-amber-500/30">
                <Flame className="w-3.5 h-3.5 fill-current" />
                ~{workout.estimatedCalories} Calories
              </span>
            </div>

            <h2 id="preview-modal-title" className="text-3xl font-black text-white tracking-tight">
              {workout.title}
            </h2>
            <p className="text-sm text-neutral-300 mt-1 max-w-3xl line-clamp-2">
              {workout.description}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-8 overflow-y-auto flex-1 flex flex-col gap-6">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-3.5 rounded-2xl bg-[#171c28] border border-neutral-800 flex items-center gap-3">
              <Clock className="w-6 h-6 text-[#d4ff00]" />
              <div>
                <span className="text-[11px] uppercase font-mono text-neutral-400 block">Total Duration</span>
                <span className="text-lg font-bold text-white">{workout.durationMinutes} Minutes</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#171c28] border border-neutral-800 flex items-center gap-3">
              <Dumbbell className="w-6 h-6 text-amber-400" />
              <div>
                <span className="text-[11px] uppercase font-mono text-neutral-400 block">Equipment</span>
                <span className="text-lg font-bold text-white capitalize">
                  {workout.equipment[0] === 'none' ? 'Bodyweight' : workout.equipment[0]}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#171c28] border border-neutral-800 flex items-center gap-3">
              <Target className="w-6 h-6 text-emerald-400" />
              <div>
                <span className="text-[11px] uppercase font-mono text-neutral-400 block">Exercises</span>
                <span className="text-lg font-bold text-white">{workout.exercises.length} Movements</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#171c28] border border-neutral-800 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-sky-400" />
              <div>
                <span className="text-[11px] uppercase font-mono text-neutral-400 block">Low-Impact Option</span>
                <span className="text-lg font-bold text-white">Included</span>
              </div>
            </div>
          </div>

          {/* Exercise Progression Breakdown */}
          <div>
            <h3 className="text-lg font-bold text-neutral-200 mb-3 flex items-center gap-2">
              <span>Exercise Breakdown</span>
              <span className="text-xs font-normal text-neutral-400">({workout.exercises.length} exercises with rest intervals)</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {workout.exercises.map((ex, idx) => (
                <div
                  key={ex.id || idx}
                  className="p-3.5 rounded-xl bg-[#151924] border border-neutral-800/80 flex items-start justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center font-mono font-bold text-xs text-[#d4ff00] shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{ex.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-neutral-400 font-mono">
                          {ex.durationSeconds}s work • {ex.defaultRestSeconds}s rest
                        </span>
                        <span className="text-[10px] text-neutral-500">•</span>
                        <span className="text-[11px] text-neutral-400">
                          {ex.targetMuscles.slice(0, 2).join(', ')}
                        </span>
                      </div>
                      {ex.accessibleAlternative && (
                        <div className="text-[11px] text-sky-400/90 mt-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 shrink-0" />
                          <span>Alt: {ex.accessibleAlternative.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TV Health Notice */}
          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-600/30 flex items-center gap-3 text-xs text-amber-200/80">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              Always ensure you have clear living room space around your TV screen. Stay hydrated and feel free to use the accessible exercise alternatives whenever needed.
            </span>
          </div>
        </div>

        {/* Modal Action Bar (10-foot TV Focusable Controls) */}
        <div className="p-6 bg-[#0c0f16] border-t border-neutral-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="tv-focusable px-6 py-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-base transition-all cursor-pointer"
            data-tv-focus="true"
          >
            Cancel / Back
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onCustomize(workout)}
              className="tv-focusable flex items-center gap-2 px-6 py-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 font-bold text-base transition-all cursor-pointer"
              data-tv-focus="true"
            >
              <Sliders className="w-5 h-5 text-[#d4ff00]" />
              <span>Customize in Setup</span>
            </button>

            <button
              ref={startButtonRef}
              onClick={() => onStart(workout)}
              className="tv-focusable flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-[#d4ff00] hover:bg-[#bce400] text-black font-extrabold text-lg transition-all shadow-xl shadow-[#d4ff00]/25 cursor-pointer"
              data-tv-focus="true"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>START WORKOUT</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
