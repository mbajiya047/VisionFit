import React from 'react';
import { Clock, Flame, Dumbbell, Play } from 'lucide-react';
import { Workout } from '../../types';

interface WorkoutCardProps {
  workout: Workout;
  onSelect: (workout: Workout) => void;
  onStartDirect?: (workout: Workout) => void;
  featured?: boolean;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workout,
  onSelect,
  onStartDirect,
  featured = false,
}) => {
  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'beginner':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 uppercase">Beginner</span>;
      case 'advanced':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-rose-950/80 text-rose-400 border border-rose-800/60 uppercase">Advanced</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-950/80 text-amber-400 border border-amber-800/60 uppercase">Intermediate</span>;
    }
  };

  return (
    <div
      onClick={() => onSelect(workout)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onSelect(workout);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Workout: ${workout.title}, ${workout.durationMinutes} minutes, ${workout.difficulty}`}
      className={`tv-focusable tv-card-focus group relative rounded-2xl overflow-hidden bg-[#131722] border border-neutral-800 cursor-pointer transition-all flex flex-col text-left ${
        featured ? 'w-[420px] shrink-0' : 'w-full'
      }`}
    >
      {/* Thumbnail Banner with Dark Gradient Overlay */}
      <div className="relative h-44 w-full overflow-hidden bg-neutral-900">
        <img
          src={workout.heroImage}
          alt={workout.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131722] via-[#131722]/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getDifficultyBadge(workout.difficulty)}
            <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-black/60 text-neutral-300 border border-neutral-700/80 backdrop-blur-md uppercase">
              {workout.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-amber-400 text-xs font-bold border border-amber-500/30">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>~{workout.estimatedCalories} kcal</span>
          </div>
        </div>

        {/* Quick Play Icon Overlay on Hover/Focus */}
        <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-[#d4ff00] text-black flex items-center justify-center opacity-90 shadow-lg transform group-hover:scale-110 group-focus:scale-110 transition-transform">
          <Play className="w-5 h-5 fill-current ml-0.5" />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="text-lg font-bold text-white group-hover:text-[#d4ff00] transition-colors line-clamp-1">
            {workout.title}
          </div>
          <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
            {workout.tagline || workout.description}
          </p>
        </div>

        {/* Footer Meta */}
        <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-1.5 font-medium text-neutral-300">
            <Clock className="w-4 h-4 text-[#d4ff00]" />
            <span>{workout.durationMinutes} Mins</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Dumbbell className="w-3.5 h-3.5 text-neutral-500" />
            <span className="capitalize text-neutral-400">
              {workout.equipment[0] === 'none' ? 'No Equipment' : workout.equipment[0]}
            </span>
          </div>

          <span className="text-[11px] text-neutral-500 font-mono">
            {workout.exercises.length} Exercises
          </span>
        </div>
      </div>
    </div>
  );
};
