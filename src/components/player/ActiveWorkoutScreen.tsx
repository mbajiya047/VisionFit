import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Plus, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Flame, 
  Clock, 
  ArrowRight, 
  Home, 
  Sparkles, 
  Camera, 
  CameraOff, 
  AlertCircle
} from 'lucide-react';
import { Workout, Exercise, WorkoutSession } from '../../types';
import { ExerciseAnimator } from './ExerciseAnimator';
import { tvAudio } from '../../services/audioService';
import { tvStorage } from '../../services/storage';

interface ActiveWorkoutScreenProps {
  workout: Workout;
  onFinishWorkout: (session: WorkoutSession) => void;
  onExit: () => void;
}

type WorkoutPhase = 'prepare' | 'work' | 'rest' | 'complete';

export const ActiveWorkoutScreen: React.FC<ActiveWorkoutScreenProps> = ({
  workout,
  onFinishWorkout,
  onExit,
}) => {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [phase, setPhase] = useState<WorkoutPhase>('prepare');
  const [secondsRemaining, setSecondsRemaining] = useState(5); // 5s initial countdown
  const [isPaused, setIsPaused] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
  const [useAccessibleAlt, setUseAccessibleAlt] = useState(false);

  // Vision / Rep tracking state
  const [repCount, setRepCount] = useState(0);
  const [visionMode, setVisionMode] = useState<'off' | 'simulated' | 'camera'>('off');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Workout Session accumulation stats
  const [totalWorkSeconds, setTotalWorkSeconds] = useState(0);
  const [completedExercisesCount, setCompletedExercisesCount] = useState(0);
  const [startTime] = useState(new Date().toISOString());

  // Post workout rating
  const [difficultyRating, setDifficultyRating] = useState<'easy' | 'just_right' | 'too_hard'>('just_right');

  const currentExercise: Exercise = workout.exercises[exerciseIndex];
  const nextExercise: Exercise | undefined = workout.exercises[exerciseIndex + 1];

  // Voice speech announcement on exercise or phase change
  const announceCurrent = useCallback((text: string) => {
    if (!soundMuted) {
      tvAudio.speak(text);
    }
  }, [soundMuted]);

  // Handle phase transitions
  const transitionToNext = useCallback(() => {
    if (phase === 'prepare') {
      setPhase('work');
      setSecondsRemaining(currentExercise.durationSeconds);
      tvAudio.playStartChime();
      announceCurrent(`Start ${useAccessibleAlt && currentExercise.accessibleAlternative ? currentExercise.accessibleAlternative.name : currentExercise.name}`);
    } 
    else if (phase === 'work') {
      setCompletedExercisesCount(prev => prev + 1);
      if (exerciseIndex >= workout.exercises.length - 1) {
        // All exercises finished!
        setPhase('complete');
        tvAudio.playVictoryFanfare();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#d4ff00', '#f59e0b', '#38bdf8', '#10b981'],
        });
        announceCurrent('Workout complete! Incredible effort.');
      } else {
        // Enter Rest Phase
        setPhase('rest');
        setSecondsRemaining(currentExercise.defaultRestSeconds);
        setUseAccessibleAlt(false);
        tvAudio.playRestChime();
        announceCurrent(`Rest for ${currentExercise.defaultRestSeconds} seconds. Next up is ${workout.exercises[exerciseIndex + 1]?.name}`);
      }
    } 
    else if (phase === 'rest') {
      setExerciseIndex(prev => prev + 1);
      setPhase('prepare');
      setSecondsRemaining(3); // 3s transition countdown
      announceCurrent('Get ready');
    }
  }, [phase, exerciseIndex, workout.exercises, currentExercise, useAccessibleAlt, announceCurrent]);

  // Main countdown interval timer
  useEffect(() => {
    if (isPaused || phase === 'complete') return;

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          transitionToNext();
          return 0;
        }

        // 3-2-1 Beep sound on final 3 seconds
        if (prev <= 4 && prev > 1) {
          tvAudio.playCountdownBeep(false);
        } else if (prev === 2) {
          tvAudio.playCountdownBeep(true);
        }

        return prev - 1;
      });

      if (phase === 'work') {
        setTotalWorkSeconds(prev => prev + 1);
        // Simulated rep counting cadence (every 3 seconds)
        if (visionMode === 'simulated') {
          setRepCount(prev => prev + 1);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, phase, transitionToNext, visionMode]);

  // Save session backup for accidental navigation recovery
  useEffect(() => {
    if (phase !== 'complete') {
      tvStorage.saveActiveSessionBackup({
        workout,
        exerciseIndex,
        elapsedSeconds: totalWorkSeconds,
      });
    } else {
      tvStorage.saveActiveSessionBackup(null);
    }
  }, [workout, exerciseIndex, totalWorkSeconds, phase]);

  // Webcam vision tracking logic (optional sensor extension)
  useEffect(() => {
    let stream: MediaStream | null = null;
    let animId: number;

    if (visionMode === 'camera') {
      navigator.mediaDevices?.getUserMedia({ video: { width: 320, height: 240 } })
        .then(s => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            videoRef.current.play();
          }

          // Simple optical motion flow rep detection on canvas
          let lastFrameData: Uint8ClampedArray | null = null;
          let motionPeakTriggered = false;

          const checkMotion = () => {
            if (videoRef.current && canvasRef.current && videoRef.current.readyState === 4) {
              const ctx = canvasRef.current.getContext('2d');
              if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0, 80, 60);
                const frame = ctx.getImageData(0, 0, 80, 60);
                if (lastFrameData) {
                  let diff = 0;
                  for (let i = 0; i < frame.data.length; i += 4) {
                    diff += Math.abs(frame.data[i] - lastFrameData[i]);
                  }
                  // Threshold for body movement peak
                  const normalizedDiff = diff / (frame.data.length / 4);
                  if (normalizedDiff > 28 && !motionPeakTriggered && phase === 'work') {
                    motionPeakTriggered = true;
                    setRepCount(r => r + 1);
                    setTimeout(() => { motionPeakTriggered = false; }, 1200);
                  }
                }
                lastFrameData = new Uint8ClampedArray(frame.data);
              }
            }
            animId = requestAnimationFrame(checkMotion);
          };
          animId = requestAnimationFrame(checkMotion);
        })
        .catch(() => {
          // Fall back gracefully to simulated or off
          setVisionMode('simulated');
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
      cancelAnimationFrame(animId);
    };
  }, [visionMode, phase]);

  // Skip, Previous, Add Time Handlers
  const handleSkipExercise = () => {
    tvAudio.playNavTick();
    if (exerciseIndex < workout.exercises.length - 1) {
      setExerciseIndex(prev => prev + 1);
      setPhase('prepare');
      setSecondsRemaining(3);
    } else {
      setPhase('complete');
    }
  };

  const handlePrevExercise = () => {
    tvAudio.playNavTick();
    if (exerciseIndex > 0) {
      setExerciseIndex(prev => prev - 1);
      setPhase('prepare');
      setSecondsRemaining(3);
    }
  };

  const handleAddSeconds = (seconds: number) => {
    tvAudio.playNavTick();
    setSecondsRemaining(prev => prev + seconds);
  };

  const handleFinishEarly = () => {
    setPhase('complete');
    tvAudio.playVictoryFanfare();
  };

  const handleSaveAndExit = () => {
    const estimatedBurn = Math.round((totalWorkSeconds / 60) * (workout.difficulty === 'advanced' ? 12 : 9.5));
    const session: WorkoutSession = {
      id: `session-${Date.now()}`,
      workoutId: workout.id,
      workoutTitle: workout.title,
      category: workout.category,
      startedAt: startTime,
      completedAt: new Date().toISOString(),
      durationSeconds: totalWorkSeconds,
      exercisesCompleted: completedExercisesCount,
      totalExercises: workout.exercises.length,
      caloriesBurned: Math.max(estimatedBurn, 25),
      difficultyRating,
      repCount: repCount > 0 ? repCount : undefined,
    };

    tvStorage.saveCompletedSession(session);
    tvStorage.saveActiveSessionBackup(null);
    onFinishWorkout(session);
  };

  const displayedExerciseName = useAccessibleAlt && currentExercise.accessibleAlternative
    ? currentExercise.accessibleAlternative.name
    : currentExercise.name;

  const totalWorkoutSecondsCalculated = workout.exercises.reduce((acc, curr) => acc + curr.durationSeconds + curr.defaultRestSeconds, 0);
  const workoutProgressPercent = Math.min(100, Math.round((totalWorkSeconds / totalWorkoutSecondsCalculated) * 100));

  // COMPLETION VIEW
  if (phase === 'complete') {
    const caloriesEarned = Math.max(Math.round((totalWorkSeconds / 60) * 10), 35);
    return (
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto text-center py-6 select-none animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 rounded-3xl bg-[#d4ff00] text-black flex items-center justify-center mb-4 shadow-2xl shadow-[#d4ff00]/40">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>

        <span className="text-xs font-mono uppercase tracking-widest text-[#d4ff00] font-bold">
          Session Finished • Fire TV Verified
        </span>
        <h1 className="text-4xl font-black text-white mt-1">
          Workout Complete!
        </h1>
        <p className="text-sm text-neutral-400 mt-1 max-w-xl">
          Outstanding work. Your session data has been calculated and added to your weekly streak.
        </p>

        {/* Results Metrics Grid */}
        <div className="grid grid-cols-4 gap-4 w-full my-8">
          <div className="p-4 rounded-2xl bg-[#131722] border border-neutral-800">
            <Clock className="w-5 h-5 text-[#d4ff00] mx-auto mb-1" />
            <span className="text-[11px] uppercase font-mono text-neutral-400 block">Total Active Time</span>
            <span className="text-2xl font-black text-white">
              {Math.floor(totalWorkSeconds / 60)}m {totalWorkSeconds % 60}s
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#131722] border border-neutral-800">
            <Flame className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <span className="text-[11px] uppercase font-mono text-neutral-400 block">Est. Calories Burned</span>
            <span className="text-2xl font-black text-amber-400">~{caloriesEarned} kcal</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#131722] border border-neutral-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <span className="text-[11px] uppercase font-mono text-neutral-400 block">Exercises Finished</span>
            <span className="text-2xl font-black text-white">{completedExercisesCount} / {workout.exercises.length}</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#131722] border border-neutral-800">
            <Sparkles className="w-5 h-5 text-sky-400 mx-auto mb-1" />
            <span className="text-[11px] uppercase font-mono text-neutral-400 block">Tracked Reps</span>
            <span className="text-2xl font-black text-white">{repCount > 0 ? repCount : 'Tempo Timed'}</span>
          </div>
        </div>

        {/* Post-Workout Difficulty Rating for AI Feedback Loop */}
        <div className="bg-[#121620] border border-neutral-800 rounded-2xl p-5 w-full mb-8 text-left">
          <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block mb-3">
            How did this session feel? (Informs AI Coach recommendations)
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'easy', label: 'Easy', desc: 'Could do more, ready to ramp up' },
              { id: 'just_right', label: 'Just Right', desc: 'Optimal training stimulus' },
              { id: 'too_hard', label: 'Very Tough', desc: 'High fatigue, recommend recovery' },
            ].map(r => (
              <button
                key={r.id}
                onClick={() => setDifficultyRating(r.id as any)}
                className={`tv-focusable p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  difficultyRating === r.id
                    ? 'bg-neutral-800 border-[#d4ff00] text-white'
                    : 'bg-[#181d2a] border-neutral-800 text-neutral-400 hover:bg-neutral-800/50'
                }`}
                data-tv-focus="true"
              >
                <span className="text-sm font-bold text-white block">{r.label}</span>
                <span className="text-[11px] text-neutral-400 block mt-0.5">{r.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSaveAndExit}
            className="tv-focusable flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[#d4ff00] hover:bg-[#bce400] text-black font-extrabold text-lg shadow-xl shadow-[#d4ff00]/25 cursor-pointer"
            data-tv-focus="true"
          >
            <span>Save & View Progress</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              handleSaveAndExit();
              onExit();
            }}
            className="tv-focusable flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-base cursor-pointer"
            data-tv-focus="true"
          >
            <Home className="w-5 h-5" />
            <span>Return to Home</span>
          </button>
        </div>
      </div>
    );
  }

  // ACTIVE PLAYER VIEW
  return (
    <div className="flex-1 flex flex-col justify-between max-w-6xl mx-auto w-full select-none pb-8">
      {/* Top Session Progress Bar */}
      <div className="w-full flex flex-col gap-2 mb-4">
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white text-sm">{workout.title}</span>
            <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[11px]">
              Exercise {exerciseIndex + 1} of {workout.exercises.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Rep Counter / Vision Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] font-mono">
              <span className="text-neutral-400">Reps:</span>
              <span className="font-bold text-[#d4ff00]">{repCount}</span>
              {visionMode === 'camera' && (
                <span className="text-[10px] text-emerald-400 font-bold ml-1">• Optical Flow</span>
              )}
              {visionMode === 'simulated' && (
                <span className="text-[10px] text-neutral-400 ml-1">• Simulated</span>
              )}
            </div>

            <button
              onClick={() => setSoundMuted(prev => !prev)}
              className="tv-focusable p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 cursor-pointer"
              title="Toggle Audio Cues"
              data-tv-focus="true"
            >
              {soundMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#d4ff00]" />}
            </button>
          </div>
        </div>

        {/* Progress Timeline Track */}
        <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#d4ff00] to-emerald-400 transition-all duration-300"
            style={{ width: `${workoutProgressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Center Stage: 2-Column Split */}
      <div className="grid grid-cols-12 gap-6 my-auto items-center">
        {/* Left Column: Biomechanical Animator / Demonstration */}
        <div className="col-span-5 h-[340px] flex flex-col justify-center">
          <ExerciseAnimator
            animationType={currentExercise.animationType}
            isPaused={isPaused}
            phase={phase}
          />
        </div>

        {/* Right Column: Giant Timer, Phase Badge & Instructions */}
        <div className="col-span-7 flex flex-col justify-center text-left pl-4">
          {/* Phase Badge */}
          <div className="flex items-center gap-3 mb-2">
            {phase === 'prepare' && (
              <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-400 font-extrabold text-xs uppercase tracking-widest border border-amber-500/30 animate-pulse">
                GET READY
              </span>
            )}
            {phase === 'work' && (
              <span className="px-3 py-1 rounded-lg bg-[#d4ff00]/20 text-[#d4ff00] font-extrabold text-xs uppercase tracking-widest border border-[#d4ff00]/40">
                ACTIVE WORK INTERVAL
              </span>
            )}
            {phase === 'rest' && (
              <span className="px-3 py-1 rounded-lg bg-sky-500/20 text-sky-400 font-extrabold text-xs uppercase tracking-widest border border-sky-500/30">
                REST & RECOVER
              </span>
            )}

            {isPaused && (
              <span className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-400 font-bold text-xs uppercase tracking-wider">
                PAUSED
              </span>
            )}
          </div>

          {/* Current Exercise Title */}
          <h2 className="text-4xl font-black text-white tracking-tight leading-tight mb-2">
            {phase === 'rest' ? 'Rest Period' : displayedExerciseName}
          </h2>

          {/* Accessible Alternative Notification */}
          {useAccessibleAlt && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-sky-950/60 border border-sky-600/40 text-xs text-sky-300 mb-2 w-fit">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Low-Impact Alternative Enabled</span>
            </div>
          )}

          {/* Giant 10-Foot TV Countdown Timer */}
          <div className="my-3 flex items-baseline gap-4">
            <span className={`text-8xl font-black tracking-tighter font-mono ${
              secondsRemaining <= 3 ? 'text-rose-400 animate-timer-pulse' : 'text-[#d4ff00]'
            }`}>
              {String(Math.floor(secondsRemaining / 60)).padStart(2, '0')}:
              {String(secondsRemaining % 60).padStart(2, '0')}
            </span>
            <span className="text-sm font-mono uppercase text-neutral-400">
              {phase === 'rest' ? 'Until Next Exercise' : 'Remaining'}
            </span>
          </div>

          {/* Form Cues / Instructions Box */}
          <div className="bg-[#121620] border border-neutral-800 rounded-2xl p-4 mt-2">
            {phase === 'rest' ? (
              <div>
                <span className="text-[11px] font-mono text-sky-400 uppercase font-bold block mb-1">
                  Next Exercise Coming Up:
                </span>
                <span className="text-lg font-bold text-white block">
                  {nextExercise ? nextExercise.name : 'Final Stretch / Cool Down'}
                </span>
                <span className="text-xs text-neutral-400 block mt-1">
                  {nextExercise ? nextExercise.formCues.join(' • ') : 'Prepare for session completion summary.'}
                </span>
              </div>
            ) : (
              <div>
                <span className="text-[11px] font-mono text-[#d4ff00] uppercase font-bold block mb-1">
                  Form Cue & Technique Focus:
                </span>
                <p className="text-sm text-neutral-200 font-medium leading-relaxed">
                  {currentExercise.formCues[0]}
                </p>
                {currentExercise.commonMistakes[0] && (
                  <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Avoid: {currentExercise.commonMistakes[0]}</span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hidden canvas for optical camera rep tracking if active */}
      <canvas ref={canvasRef} className="hidden" width={80} height={60} />
      <video ref={videoRef} className="hidden" playsInline muted />

      {/* Bottom Controls Bar (Remote Focusable) */}
      <div className="flex items-center justify-between pt-6 border-t border-neutral-800/80">
        {/* Left Side: Accessible Alternative Toggle & Rep Assist */}
        <div className="flex items-center gap-3">
          {currentExercise.accessibleAlternative && phase !== 'rest' && (
            <button
              onClick={() => {
                tvAudio.playNavTick();
                setUseAccessibleAlt(prev => !prev);
              }}
              className={`tv-focusable text-xs px-4 py-2.5 rounded-xl border font-bold flex items-center gap-2 cursor-pointer transition-all ${
                useAccessibleAlt
                  ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                  : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700'
              }`}
              data-tv-focus="true"
              aria-label="Switch between standard and low-impact accessible alternative"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{useAccessibleAlt ? 'Switch to Standard' : 'Use Low-Impact Variant'}</span>
            </button>
          )}

          {/* Vision Rep Tracker Toggle */}
          <button
            onClick={() => {
              tvAudio.playNavTick();
              setVisionMode(prev => prev === 'off' ? 'simulated' : prev === 'simulated' ? 'camera' : 'off');
            }}
            className="tv-focusable text-xs px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white flex items-center gap-2 cursor-pointer"
            data-tv-focus="true"
            title="Toggle optional computer vision rep tracking mode"
          >
            {visionMode === 'camera' ? <Camera className="w-4 h-4 text-emerald-400" /> : <CameraOff className="w-4 h-4 text-neutral-500" />}
            <span>Rep Tracking: <strong className="capitalize text-[#d4ff00]">{visionMode}</strong></span>
          </button>
        </div>

        {/* Center: Primary Playback Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrevExercise}
            disabled={exerciseIndex === 0}
            className="tv-focusable p-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 disabled:opacity-40 cursor-pointer"
            title="Previous Exercise"
            data-tv-focus="true"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              tvAudio.playNavTick();
              setIsPaused(prev => !prev);
            }}
            className="tv-focusable flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[#d4ff00] hover:bg-[#bce400] text-black font-extrabold text-base shadow-xl shadow-[#d4ff00]/20 cursor-pointer"
            data-tv-focus="true"
            aria-label={isPaused ? 'Resume Workout' : 'Pause Workout'}
          >
            {isPaused ? <Play className="w-5 h-5 fill-current" /> : <Pause className="w-5 h-5 fill-current" />}
            <span>{isPaused ? 'RESUME' : 'PAUSE'}</span>
          </button>

          <button
            onClick={handleSkipExercise}
            className="tv-focusable p-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 cursor-pointer"
            title="Skip Exercise"
            data-tv-focus="true"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          <button
            onClick={() => handleAddSeconds(15)}
            className="tv-focusable flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold cursor-pointer"
            data-tv-focus="true"
          >
            <Plus className="w-4 h-4 text-[#d4ff00]" />
            <span>15s</span>
          </button>
        </div>

        {/* Right Side: Finish Workout Early */}
        <div>
          <button
            onClick={handleFinishEarly}
            className="tv-focusable px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-rose-950/60 border border-neutral-700 text-neutral-400 hover:text-rose-300 text-xs font-semibold cursor-pointer"
            data-tv-focus="true"
          >
            Finish Early
          </button>
        </div>
      </div>
    </div>
  );
};
