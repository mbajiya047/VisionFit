export type WorkoutCategory = 
  | 'all'
  | 'strength' 
  | 'cardio' 
  | 'mobility' 
  | 'yoga' 
  | 'core' 
  | 'hiit' 
  | 'beginner' 
  | 'recovery';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type EquipmentType = 
  | 'none' 
  | 'dumbbells' 
  | 'mat' 
  | 'resistance-band' 
  | 'kettlebell' 
  | 'chair';

export interface ExerciseAlternative {
  name: string;
  description: string;
  intensity: 'low-impact' | 'seated' | 'modified';
}

export interface Exercise {
  id: string;
  name: string;
  category: WorkoutCategory;
  durationSeconds: number;
  defaultRestSeconds: number;
  targetMuscles: string[];
  equipment: EquipmentType;
  difficulty: DifficultyLevel;
  instructions: string[];
  formCues: string[];
  commonMistakes: string[];
  accessibleAlternative: ExerciseAlternative;
  animationType: string;
  repsTarget?: number;
}

export interface Workout {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: WorkoutCategory;
  difficulty: DifficultyLevel;
  durationMinutes: number;
  estimatedCalories: number;
  equipment: EquipmentType[];
  targetMuscles: string[];
  exercises: Exercise[];
  featured?: boolean;
  heroImage: string;
  tags: string[];
  rating?: number;
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  workoutTitle: string;
  category: WorkoutCategory;
  startedAt: string;
  completedAt: string;
  durationSeconds: number;
  exercisesCompleted: number;
  totalExercises: number;
  caloriesBurned: number;
  difficultyRating?: 'easy' | 'just_right' | 'too_hard';
  userNotes?: string;
  repCount?: number;
}

export interface UserStats {
  weeklyMinutesGoal: number;
  currentStreakDays: number;
  totalWorkouts: number;
  totalMinutes: number;
  totalCalories: number;
  categoryDistribution: Record<string, number>;
  lastWorkoutDate?: string;
}

export interface AppSettings {
  tvSafeMarginPercent: 0 | 3 | 5;
  enableVoiceCoach: boolean;
  enableAudioBeeps: boolean;
  repTrackingMode: 'rhythm' | 'vision_simulated' | 'vision_webcam';
  highContrastMode: boolean;
  reduceMotion: boolean;
  unitSystem: 'metric' | 'imperial';
}

export type TVScreen = 
  | 'home' 
  | 'discover' 
  | 'setup' 
  | 'player' 
  | 'coach' 
  | 'progress' 
  | 'settings';

export interface AICoachMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
  suggestedWorkout?: Workout;
  recommendedActions?: string[];
  source?: 'local_sports_science' | 'cloud_ai';
}
