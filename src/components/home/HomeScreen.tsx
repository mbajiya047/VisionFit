import React from 'react';
import { 
  Play, 
  Clock, 
  Flame, 
  Sparkles, 
  RotateCcw, 
  ChevronRight, 
  Award,
  Zap,
  Target
} from 'lucide-react';
import { Workout, UserStats } from '../../types';
import { WorkoutCard } from '../workout/WorkoutCard';
import { coachService } from '../../services/coachService';

interface HomeScreenProps {
  featuredWorkout: Workout;
  allWorkouts: Workout[];
  stats: UserStats;
  activeSessionBackup: { workout: Workout; exerciseIndex: number; elapsedSeconds: number } | null;
  onSelectWorkout: (workout: Workout) => void;
  onStartDirect: (workout: Workout) => void;
  onResumeSession: () => void;
  onNavigateToDiscover: () => void;
  onNavigateToCoach: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  featuredWorkout,
  allWorkouts,
  stats,
  activeSessionBackup,
  onSelectWorkout,
  onStartDirect,
  onResumeSession,
  onNavigateToDiscover,
  onNavigateToCoach,
}) => {
  const personalized = coachService.getPersonalizedRecommendation();

  // Swimlane sections
  const quickWorkouts = allWorkouts.filter(w => w.durationMinutes <= 15);
  const strengthWorkouts = allWorkouts.filter(w => w.category === 'strength' || w.category === 'hiit');
  const mobilityWorkouts = allWorkouts.filter(w => w.category === 'mobility' || w.category === 'recovery' || w.category === 'yoga');

  return (
    <div className="flex-1 flex flex-col w-full select-none pb-16 text-left">
      {/* Resume Session Banner if active */}
      {activeSessionBackup && (
        <div className="mb-6 p-4 rounded-3xl bg-gradient-to-r from-amber-950/60 via-[#181d2a] to-[#121620] border-2 border-amber-500/60 shadow-xl flex items-center justify-between animate-in slide-in-from-top-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <RotateCcw className="w-6 h-6 animate-spin duration-3000" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                Session In Progress
              </span>
              <h3 className="text-base font-bold text-white">
                Resume "{activeSessionBackup.workout.title}"
              </h3>
              <span className="text-xs text-neutral-400">
                Exercise {activeSessionBackup.exerciseIndex + 1} of {activeSessionBackup.workout.exercises.length} • {Math.floor(activeSessionBackup.elapsedSeconds / 60)}m logged
              </span>
            </div>
          </div>

          <button
            onClick={onResumeSession}
            className="tv-focusable flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm shadow-lg shadow-amber-400/20 cursor-pointer"
            data-tv-focus="true"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>RESUME NOW</span>
          </button>
        </div>
      )}

      {/* Cinematic Hero Section (10-Foot TV Focal Point) */}
      <div className="relative w-full h-[430px] rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl mb-10 flex flex-col justify-end p-10">
        {/* Hero Background Image */}
        <img
          src={featuredWorkout.heroImage}
          alt={featuredWorkout.title}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-65 scale-102"
        />
        {/* Multi-layer Gradient for 10-foot legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12] via-[#0b0d12]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d12] via-[#0b0d12]/70 to-transparent w-2/3" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl">
          {/* Track and Category Badges */}
          <div className="flex items-center gap-2.5 mb-3">
            <span className="px-3 py-1 rounded-md bg-[#d4ff00] text-black font-extrabold text-xs uppercase tracking-wider shadow-md">
              FEATURED WORKOUT
            </span>
            <span className="px-2.5 py-1 rounded-md bg-black/60 text-neutral-200 font-bold text-xs uppercase border border-neutral-700/80 backdrop-blur-md">
              {featuredWorkout.category}
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 text-amber-400 font-bold text-xs border border-amber-500/30">
              <Flame className="w-3.5 h-3.5 fill-current" />
              ~{featuredWorkout.estimatedCalories} kcal
            </span>
          </div>

          <h2 className="text-4xl font-black text-white tracking-tight leading-none mb-2">
            {featuredWorkout.title}
          </h2>

          <p className="text-base text-neutral-300 mb-6 leading-relaxed line-clamp-2">
            {featuredWorkout.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onStartDirect(featuredWorkout)}
              className="tv-focusable flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#d4ff00] hover:bg-[#bce400] text-black font-extrabold text-lg shadow-2xl shadow-[#d4ff00]/30 transition-all cursor-pointer"
              data-tv-focus="true"
              aria-label={`Start featured workout: ${featuredWorkout.title}`}
            >
              <Play className="w-5 h-5 fill-current" />
              <span>START WORKOUT</span>
            </button>

            <button
              onClick={() => onSelectWorkout(featuredWorkout)}
              className="tv-focusable flex items-center gap-2 px-6 py-4 rounded-2xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/90 text-white font-bold text-base transition-all cursor-pointer backdrop-blur-md"
              data-tv-focus="true"
            >
              <span>View Breakdown</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Coach Recommendation Swimlane Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#d4ff00]" />
          <h2 className="text-xl font-bold text-white tracking-tight">
            Personalized For You
          </h2>
          <span className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 font-mono">
            {stats.currentStreakDays}-Day Streak Adaptation
          </span>
        </div>

        <button
          onClick={onNavigateToCoach}
          className="tv-focusable text-xs text-[#d4ff00] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          data-tv-focus="true"
        >
          <span>Ask AI Coach</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Recommendation Spotlight Banner */}
      <div 
        onClick={() => onSelectWorkout(personalized.workout)}
        tabIndex={0}
        role="button"
        className="tv-focusable mb-10 p-5 rounded-3xl bg-[#131722] border border-[#d4ff00]/30 flex items-center justify-between shadow-xl cursor-pointer"
        data-tv-focus="true"
      >
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-neutral-800 overflow-hidden shrink-0 border border-neutral-700">
            <img src={personalized.workout.heroImage} alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono text-[#d4ff00] uppercase font-bold">
                Daily Coach Selection
              </span>
              <span className="text-[11px] text-neutral-400">•</span>
              <span className="text-[11px] text-neutral-300">{personalized.workout.durationMinutes} Mins</span>
            </div>
            <h3 className="text-lg font-bold text-white">{personalized.workout.title}</h3>
            <p className="text-xs text-neutral-400 mt-0.5 max-w-3xl leading-relaxed">
              {personalized.reasoning}
            </p>
          </div>
        </div>

        <div className="px-5 py-2.5 rounded-xl bg-[#d4ff00] text-black font-extrabold text-sm flex items-center gap-2 shrink-0 ml-4 shadow-md">
          <Play className="w-4 h-4 fill-current" />
          <span>Launch</span>
        </div>
      </div>

      {/* Swimlane 1: Quick TV Workouts (Under 15 Mins) */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-sky-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Quick & Punchy (Under 15 Mins)
            </h2>
          </div>
          <button
            onClick={onNavigateToDiscover}
            className="tv-focusable text-xs text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
            data-tv-focus="true"
          >
            <span>See All ({allWorkouts.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="tv-swimlane flex gap-5">
          {quickWorkouts.map((w) => (
            <WorkoutCard
              key={w.id}
              workout={w}
              onSelect={onSelectWorkout}
              featured={true}
            />
          ))}
        </div>
      </div>

      {/* Swimlane 2: Mobility & Spinal Posture Reset */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Mobility & Posture Reset
            </h2>
          </div>
        </div>

        <div className="tv-swimlane flex gap-5">
          {mobilityWorkouts.map((w) => (
            <WorkoutCard
              key={w.id}
              workout={w}
              onSelect={onSelectWorkout}
              featured={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
