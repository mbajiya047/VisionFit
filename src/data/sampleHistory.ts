import { WorkoutSession, UserStats, AppSettings } from '../types';

export const INITIAL_USER_STATS: UserStats = {
  weeklyMinutesGoal: 150,
  currentStreakDays: 4,
  totalWorkouts: 6,
  totalMinutes: 142,
  totalCalories: 1380,
  categoryDistribution: {
    hiit: 55,
    strength: 45,
    mobility: 27,
    core: 15
  },
  lastWorkoutDate: new Date(Date.now() - 86400000).toISOString() // yesterday
};

export const INITIAL_SETTINGS: AppSettings = {
  tvSafeMarginPercent: 5, // Default 5% Fire TV overscan safe margin
  enableVoiceCoach: true,
  enableAudioBeeps: true,
  repTrackingMode: 'rhythm',
  highContrastMode: false,
  reduceMotion: false,
  unitSystem: 'metric'
};

export const INITIAL_HISTORY: WorkoutSession[] = [
  {
    id: 'sess-01',
    workoutId: 'ignite-360',
    workoutTitle: 'Ignite 360: Full Body MetCon',
    category: 'hiit',
    startedAt: new Date(Date.now() - 86400000).toISOString(),
    completedAt: new Date(Date.now() - 86400000 + 1200000).toISOString(),
    durationSeconds: 1200,
    exercisesCompleted: 6,
    totalExercises: 6,
    caloriesBurned: 215,
    difficultyRating: 'just_right',
    userNotes: 'Felt great during the squats, pushups were challenging towards the final 10 seconds.'
  },
  {
    id: 'sess-02',
    workoutId: 'morning-mobility-flow',
    workoutTitle: 'Fire TV Morning Mobility & Spinal Flow',
    category: 'mobility',
    startedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    completedAt: new Date(Date.now() - 2 * 86400000 + 840000).toISOString(),
    durationSeconds: 840,
    exercisesCompleted: 4,
    totalExercises: 4,
    caloriesBurned: 88,
    difficultyRating: 'easy',
    userNotes: 'Lower back felt noticeably decompressed afterwards.'
  },
  {
    id: 'sess-03',
    workoutId: 'core-armor-10',
    workoutTitle: 'Core Armor: 10-Min Fire TV Abs',
    category: 'core',
    startedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    completedAt: new Date(Date.now() - 3 * 86400000 + 600000).toISOString(),
    durationSeconds: 600,
    exercisesCompleted: 4,
    totalExercises: 4,
    caloriesBurned: 78,
    difficultyRating: 'just_right',
    userNotes: 'Deadbugs were tough to keep lumbar spine completely pinned.'
  },
  {
    id: 'sess-04',
    workoutId: 'dumbbell-power-hypertrophy',
    workoutTitle: 'Dumbbell Power & Hypertrophy',
    category: 'strength',
    startedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    completedAt: new Date(Date.now() - 4 * 86400000 + 1500000).toISOString(),
    durationSeconds: 1500,
    exercisesCompleted: 4,
    totalExercises: 4,
    caloriesBurned: 245,
    difficultyRating: 'too_hard',
    userNotes: 'Used 25lb dumbbells, last Romanian deadlift set was intense.'
  }
];
