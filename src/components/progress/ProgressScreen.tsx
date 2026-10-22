import React from 'react';
import { 
  Flame, 
  Clock, 
  Dumbbell, 
  Target, 
  Calendar, 
  TrendingUp, 
  CheckCircle,
  Award
} from 'lucide-react';
import { UserStats, WorkoutSession } from '../../types';

interface ProgressScreenProps {
  stats: UserStats;
  sessions: WorkoutSession[];
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({ stats, sessions }) => {
  const goalProgressPercent = Math.min(100, Math.round((stats.totalMinutes / stats.weeklyMinutesGoal) * 100));

  // Weekly day activity mockup (last 7 days)
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayMinutes = [20, 25, 0, 15, 30, 20, 32]; // sample week distribution

  const maxMin = Math.max(...dayMinutes, 30);

  const getDifficultyBadge = (diff?: string) => {
    switch (diff) {
      case 'easy':
        return <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-950 text-emerald-400 border border-emerald-800">Easy</span>;
      case 'too_hard':
        return <span className="px-2 py-0.5 rounded text-[11px] bg-rose-950 text-rose-400 border border-rose-800">Very Tough</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] bg-amber-950 text-amber-400 border border-amber-800">Just Right</span>;
    }
  };

  return (
    <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full select-none pb-16 text-left">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-5 h-5 text-[#d4ff00]" />
          <span className="text-xs font-mono uppercase tracking-wider text-[#d4ff00] font-bold">
            Long-Term Vitality & Consistency
          </span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Your Fitness Journey
        </h1>
        <p className="text-sm text-neutral-400 mt-0.5">
          Real persistent workout logs, consistency streak data, and physical volume trends on Fire TV.
        </p>
      </div>

      {/* Top 4 Metric KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-3xl bg-[#131722] border border-neutral-800 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-neutral-400">Current Streak</span>
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{stats.currentStreakDays}</span>
            <span className="text-xs font-bold text-amber-400">Days Active</span>
          </div>
          <span className="text-[11px] text-neutral-500 block mt-1">Keep it rolling today!</span>
        </div>

        <div className="p-4 rounded-3xl bg-[#131722] border border-neutral-800 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-neutral-400">Total Minutes</span>
            <Clock className="w-5 h-5 text-[#d4ff00]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{stats.totalMinutes}</span>
            <span className="text-xs font-bold text-[#d4ff00]">Mins</span>
          </div>
          <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#d4ff00] h-full" style={{ width: `${goalProgressPercent}%` }} />
          </div>
          <span className="text-[11px] text-neutral-500 block mt-1">{goalProgressPercent}% of 150m weekly target</span>
        </div>

        <div className="p-4 rounded-3xl bg-[#131722] border border-neutral-800 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-neutral-400">Workouts Completed</span>
            <Award className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{stats.totalWorkouts}</span>
            <span className="text-xs font-bold text-emerald-400">Sessions</span>
          </div>
          <span className="text-[11px] text-neutral-500 block mt-1">Across all categories</span>
        </div>

        <div className="p-4 rounded-3xl bg-[#131722] border border-neutral-800 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-neutral-400">Total Est. Calories</span>
            <Flame className="w-5 h-5 text-rose-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{stats.totalCalories}</span>
            <span className="text-xs font-bold text-rose-400">kcal</span>
          </div>
          <span className="text-[11px] text-neutral-500 block mt-1">Metabolic expenditure</span>
        </div>
      </div>

      {/* Mid Section: Weekly Volume Chart & Category Breakdown */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        {/* Weekly Minutes Bar Chart (10-Foot TV Legible SVG Chart) */}
        <div className="col-span-7 bg-[#131722] border border-neutral-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#d4ff00]" />
              <h3 className="text-base font-bold text-white">Weekly Activity Distribution</h3>
            </div>
            <span className="text-xs text-neutral-400 font-mono">Past 7 Days (Minutes)</span>
          </div>

          <div className="flex items-end justify-between gap-3 h-44 pt-6 pb-2 px-2">
            {daysOfWeek.map((day, idx) => {
              const minutes = dayMinutes[idx];
              const heightPercent = Math.max(12, Math.round((minutes / maxMin) * 100));
              const isToday = idx === 6;

              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[11px] font-mono text-neutral-400 font-bold">
                    {minutes > 0 ? `${minutes}m` : '-'}
                  </span>
                  <div className="w-full max-w-[42px] bg-neutral-800/80 rounded-xl overflow-hidden flex flex-col justify-end h-28 p-0.5">
                    <div 
                      className={`w-full rounded-lg transition-all duration-500 ${
                        isToday 
                          ? 'bg-[#d4ff00] shadow-lg shadow-[#d4ff00]/30' 
                          : minutes > 0 ? 'bg-neutral-600 hover:bg-neutral-500' : 'bg-transparent'
                      }`}
                      style={{ height: `${minutes > 0 ? heightPercent : 0}%` }}
                    />
                  </div>
                  <span className={`text-xs font-semibold ${isToday ? 'text-[#d4ff00] font-black' : 'text-neutral-400'}`}>
                    {day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Breakdown Rings & Distribution */}
        <div className="col-span-5 bg-[#131722] border border-neutral-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-sky-400" />
              <h3 className="text-base font-bold text-white">Training Discipline Split</h3>
            </div>
            <span className="text-xs text-neutral-400 font-mono">By Minutes</span>
          </div>

          <div className="space-y-3.5 my-auto">
            {[
              { label: 'HIIT & Cardio', mins: stats.categoryDistribution.hiit || 45, color: 'bg-amber-400' },
              { label: 'Strength & Conditioning', mins: stats.categoryDistribution.strength || 35, color: 'bg-[#d4ff00]' },
              { label: 'Mobility & Posture', mins: stats.categoryDistribution.mobility || 25, color: 'bg-emerald-400' },
              { label: 'Core & Abdominals', mins: stats.categoryDistribution.core || 15, color: 'bg-sky-400' },
            ].map((cat) => {
              const pct = Math.round((cat.mins / (stats.totalMinutes || 1)) * 100);
              return (
                <div key={cat.label} className="text-xs">
                  <div className="flex items-center justify-between mb-1 text-neutral-300">
                    <span className="font-semibold">{cat.label}</span>
                    <span className="font-mono font-bold text-neutral-200">{cat.mins}m ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                    <div className={`h-full ${cat.color}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <span className="text-[11px] text-neutral-500 block pt-3 border-t border-neutral-800">
            Balanced split supports muscle recovery and prevents plateaus.
          </span>
        </div>
      </div>

      {/* Bottom Section: Recent Completed Sessions Log */}
      <div className="bg-[#131722] border border-neutral-800 rounded-3xl p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[#d4ff00]" />
          <span>Completed Workout History</span>
          <span className="text-xs font-normal text-neutral-400">({sessions.length} sessions logged)</span>
        </h3>

        <div className="space-y-3">
          {sessions.map((sess) => (
            <div
              key={sess.id}
              tabIndex={0}
              className="tv-focusable p-4 rounded-2xl bg-[#171c29] border border-neutral-800/90 flex items-center justify-between text-xs"
              data-tv-focus="true"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-neutral-300">
                  <Dumbbell className="w-5 h-5 text-[#d4ff00]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{sess.workoutTitle}</h4>
                  <div className="flex items-center gap-2 text-neutral-400 mt-0.5">
                    <span>{new Date(sess.completedAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>•</span>
                    <span className="capitalize">{sess.category}</span>
                    <span>•</span>
                    <span>{sess.exercisesCompleted} / {sess.totalExercises} exercises</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="text-sm font-bold text-white block">
                    {Math.round(sess.durationSeconds / 60)} Mins
                  </span>
                  <span className="text-[11px] text-amber-400 font-bold">
                    ~{sess.caloriesBurned} kcal
                  </span>
                </div>

                {getDifficultyBadge(sess.difficultyRating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
