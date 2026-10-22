import React, { useState } from 'react';
import { 
  Clock, 
  Target, 
  Flame, 
  Dumbbell, 
  Sparkles, 
  Play, 
  Zap,
  Check
} from 'lucide-react';
import { Workout, DifficultyLevel } from '../../types';
import { coachService } from '../../services/coachService';

interface WorkoutSetupScreenProps {
  onStartGeneratedWorkout: (workout: Workout) => void;
  initialWorkout?: Workout | null;
}

export const WorkoutSetupScreen: React.FC<WorkoutSetupScreenProps> = ({
  onStartGeneratedWorkout,
  initialWorkout,
}) => {
  const [duration, setDuration] = useState<number>(initialWorkout?.durationMinutes || 15);
  const [goal, setGoal] = useState<string>('fat_burn');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(initialWorkout?.difficulty || 'intermediate');
  const [equipment, setEquipment] = useState<string>('none');
  const [focusArea, setFocusArea] = useState<string>('full_body');

  const durationOptions = [
    { value: 10, label: '10 Mins', desc: 'Quick Living Room Hit' },
    { value: 15, label: '15 Mins', desc: 'Optimal Daily Calorie Burn' },
    { value: 20, label: '20 Mins', desc: 'Full Conditioning Circuit' },
    { value: 30, label: '30 Mins', desc: 'Endurance & Hypertrophy' },
  ];

  const goalOptions = [
    { id: 'fat_burn', label: 'Fat Burn & HIIT', icon: <Flame className="w-5 h-5 text-amber-400" /> },
    { id: 'strength', label: 'Muscle Strength', icon: <Dumbbell className="w-5 h-5 text-[#d4ff00]" /> },
    { id: 'mobility', label: 'Mobility & Posture', icon: <Zap className="w-5 h-5 text-emerald-400" /> },
    { id: 'core', label: 'Core & Ab Armor', icon: <Target className="w-5 h-5 text-sky-400" /> },
  ];

  const difficultyOptions: { id: DifficultyLevel; label: string; desc: string }[] = [
    { id: 'beginner', label: 'Beginner', desc: 'Low impact, longer recovery intervals' },
    { id: 'intermediate', label: 'Intermediate', desc: 'Balanced tempo & steady intensity' },
    { id: 'advanced', label: 'Advanced', desc: 'High metabolic load, short rest' },
  ];

  const equipmentOptions = [
    { id: 'none', label: 'No Equipment', desc: 'Bodyweight only' },
    { id: 'dumbbells', label: 'Dumbbells', desc: 'Pair of medium weights' },
    { id: 'mat', label: 'Yoga Mat', desc: 'Floor & joint cushioning' },
    { id: 'resistance-band', label: 'Resistance Band', desc: 'Elastic resistance loops' },
  ];

  const focusOptions = [
    { id: 'full_body', label: 'Full Body' },
    { id: 'upper_body', label: 'Upper Body' },
    { id: 'lower_body', label: 'Lower Body' },
    { id: 'core', label: 'Core & Abs' },
  ];

  const handleGenerateAndStart = () => {
    const customWorkout = coachService.generateCustomPlan({
      durationMinutes: duration,
      goal,
      difficulty,
      equipment,
      focusArea,
    });
    onStartGeneratedWorkout(customWorkout);
  };

  const estimatedCalories = Math.round(duration * (difficulty === 'advanced' ? 12 : difficulty === 'intermediate' ? 10 : 7.5));

  return (
    <div className="flex-1 flex flex-col text-left max-w-6xl mx-auto w-full pb-16">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-[#d4ff00]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#d4ff00]">
            AI Custom Workout Architecture
          </span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Configure Your Session
        </h1>
        <p className="text-sm text-neutral-400 mt-0.5">
          Choose duration, focus, and equipment. VisionFit dynamically compiles a balanced living-room workout routine.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Form: Selectors */}
        <div className="col-span-8 flex flex-col gap-6">
          {/* Section 1: Duration */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2.5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#d4ff00]" />
              <span>1. Target Duration</span>
            </label>
            <div className="grid grid-cols-4 gap-3">
              {durationOptions.map((opt) => {
                const isSelected = duration === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setDuration(opt.value)}
                    className={`tv-focusable p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-neutral-800 border-[#d4ff00] text-white shadow-lg'
                        : 'bg-[#131722] border-neutral-800 text-neutral-300 hover:bg-neutral-800/60'
                    }`}
                    data-tv-focus="true"
                    aria-label={`Select duration ${opt.label}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-lg font-black text-white">{opt.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#d4ff00]" />}
                    </div>
                    <span className="text-[11px] text-neutral-400 block line-clamp-1">{opt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Fitness Goal */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2.5 flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" />
              <span>2. Primary Fitness Goal</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {goalOptions.map((opt) => {
                const isSelected = goal === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setGoal(opt.id)}
                    className={`tv-focusable p-3.5 rounded-2xl border flex items-center gap-3.5 text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-neutral-800 border-[#d4ff00] text-white shadow-lg'
                        : 'bg-[#131722] border-neutral-800 text-neutral-300 hover:bg-neutral-800/60'
                    }`}
                    data-tv-focus="true"
                    aria-label={`Select goal ${opt.label}`}
                  >
                    <div className="p-2 rounded-xl bg-black/40 border border-neutral-700/60">
                      {opt.icon}
                    </div>
                    <div className="flex-1">
                      <span className="text-base font-bold text-white block">{opt.label}</span>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-[#d4ff00]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Difficulty */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2.5 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>3. Intensity Level</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {difficultyOptions.map((opt) => {
                const isSelected = difficulty === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setDifficulty(opt.id)}
                    className={`tv-focusable p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-neutral-800 border-[#d4ff00] text-white shadow-lg'
                        : 'bg-[#131722] border-neutral-800 text-neutral-300 hover:bg-neutral-800/60'
                    }`}
                    data-tv-focus="true"
                    aria-label={`Select difficulty ${opt.label}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-base font-bold text-white">{opt.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#d4ff00]" />}
                    </div>
                    <span className="text-[11px] text-neutral-400 block line-clamp-1">{opt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Available Equipment */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2.5 flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-sky-400" />
              <span>4. Available Equipment</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {equipmentOptions.map((opt) => {
                const isSelected = equipment === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setEquipment(opt.id)}
                    className={`tv-focusable p-3 rounded-2xl border flex items-center justify-between text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-neutral-800 border-[#d4ff00] text-white shadow-lg'
                        : 'bg-[#131722] border-neutral-800 text-neutral-300 hover:bg-neutral-800/60'
                    }`}
                    data-tv-focus="true"
                    aria-label={`Select equipment ${opt.label}`}
                  >
                    <div>
                      <span className="text-sm font-bold text-white block">{opt.label}</span>
                      <span className="text-[11px] text-neutral-400">{opt.desc}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#d4ff00]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Summary Card & Start Button */}
        <div className="col-span-4 flex flex-col justify-between">
          <div className="bg-[#131722] border border-neutral-800 rounded-3xl p-6 flex flex-col gap-5 shadow-xl">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
              <Sparkles className="w-5 h-5 text-[#d4ff00]" />
              <h3 className="text-base font-bold text-white">Custom Plan Blueprint</h3>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Total Duration:</span>
                <span className="font-bold text-white">{duration} Minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Estimated Burn:</span>
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <Flame className="w-4 h-4 fill-current" />
                  ~{estimatedCalories} kcal
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Pace / Rest:</span>
                <span className="font-bold text-neutral-200 capitalize">
                  {difficulty === 'beginner' ? '25s Rest (Relaxed)' : difficulty === 'intermediate' ? '20s Rest (Balanced)' : '15s Rest (High)'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Equipment:</span>
                <span className="font-bold text-neutral-200 capitalize">
                  {equipment === 'none' ? 'Bodyweight' : equipment}
                </span>
              </div>
            </div>

            {/* Target Muscle Focus Pills */}
            <div className="pt-3 border-t border-neutral-800">
              <span className="text-xs font-mono text-neutral-400 block mb-2">Focus Group</span>
              <div className="flex flex-wrap gap-1.5">
                {focusOptions.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFocusArea(f.id)}
                    className={`tv-focusable text-xs px-2.5 py-1 rounded-lg border cursor-pointer ${
                      focusArea === f.id
                        ? 'bg-[#d4ff00] text-black font-bold border-[#d4ff00]'
                        : 'bg-neutral-800/80 text-neutral-300 border-neutral-700'
                    }`}
                    data-tv-focus="true"
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-[11px] text-neutral-400 leading-relaxed">
              Plan includes dynamic exercise pacing, audio guidance, and accessible form alternatives for knee & joint safety.
            </div>
          </div>

          {/* Launch Button */}
          <div className="mt-6">
            <button
              onClick={handleGenerateAndStart}
              className="tv-focusable w-full py-4 rounded-2xl bg-[#d4ff00] hover:bg-[#bce400] text-black font-extrabold text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-[#d4ff00]/25 cursor-pointer"
              data-tv-focus="true"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>LAUNCH WORKOUT</span>
            </button>
            <span className="text-[11px] text-neutral-500 text-center block mt-2">
              Press Enter or click to compile session
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
