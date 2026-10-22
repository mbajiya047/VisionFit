import { WorkoutSession, UserStats, AppSettings, Workout } from '../types';
import { WORKOUT_CATALOGUE } from '../data/workouts';
import { INITIAL_HISTORY, INITIAL_USER_STATS, INITIAL_SETTINGS } from '../data/sampleHistory';

const STORAGE_KEYS = {
  SESSIONS: 'visionfit_sessions_v1',
  STATS: 'visionfit_stats_v1',
  SETTINGS: 'visionfit_settings_v1',
  CUSTOM_WORKOUTS: 'visionfit_custom_workouts_v1',
  ACTIVE_SESSION: 'visionfit_active_session_v1',
};

class StorageService {
  // Get all completed sessions
  public getSessions(): WorkoutSession[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(INITIAL_HISTORY));
        return INITIAL_HISTORY;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_HISTORY;
    }
  }

  // Save a completed session and recalculate user stats
  public saveCompletedSession(session: WorkoutSession): UserStats {
    const sessions = this.getSessions();
    const updatedSessions = [session, ...sessions];
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updatedSessions));

    // Update stats
    const stats = this.getStats();
    const minutesAdded = Math.round(session.durationSeconds / 60);
    const caloriesAdded = session.caloriesBurned;

    // Check streak
    let currentStreak = stats.currentStreakDays;
    const today = new Date().toDateString();
    const lastDate = stats.lastWorkoutDate ? new Date(stats.lastWorkoutDate).toDateString() : null;

    if (lastDate !== today) {
      currentStreak += 1;
    }

    const updatedDistribution = { ...stats.categoryDistribution };
    updatedDistribution[session.category] = (updatedDistribution[session.category] || 0) + minutesAdded;

    const newStats: UserStats = {
      ...stats,
      totalWorkouts: stats.totalWorkouts + 1,
      totalMinutes: stats.totalMinutes + minutesAdded,
      totalCalories: stats.totalCalories + caloriesAdded,
      currentStreakDays: currentStreak,
      lastWorkoutDate: new Date().toISOString(),
      categoryDistribution: updatedDistribution
    };

    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(newStats));
    return newStats;
  }

  // Get user statistics
  public getStats(): UserStats {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STATS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(INITIAL_USER_STATS));
        return INITIAL_USER_STATS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_USER_STATS;
    }
  }

  // Get user settings
  public getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
        return INITIAL_SETTINGS;
      }
      return { ...INITIAL_SETTINGS, ...JSON.parse(data) };
    } catch {
      return INITIAL_SETTINGS;
    }
  }

  // Update settings
  public saveSettings(settings: Partial<AppSettings>): AppSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    return updated;
  }

  // Custom workouts created by user or AI coach
  public getCustomWorkouts(): Workout[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_WORKOUTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public saveCustomWorkout(workout: Workout): void {
    const list = this.getCustomWorkouts();
    const filtered = list.filter(w => w.id !== workout.id);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_WORKOUTS, JSON.stringify([workout, ...filtered]));
  }

  // Get combined catalogue (default catalogue + user/AI generated custom workouts)
  public getAllWorkouts(): Workout[] {
    const custom = this.getCustomWorkouts();
    return [...custom, ...WORKOUT_CATALOGUE];
  }

  // Active workout state persistence (prevents session loss if user toggles screens)
  public getActiveSessionBackup(): { workout: Workout; exerciseIndex: number; elapsedSeconds: number } | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  public saveActiveSessionBackup(state: { workout: Workout; exerciseIndex: number; elapsedSeconds: number } | null): void {
    if (state === null) {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
    } else {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(state));
    }
  }

  // Reset to initial demo data
  public resetToDemo(): void {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(INITIAL_HISTORY));
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(INITIAL_USER_STATS));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_WORKOUTS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
  }

  // Export data as JSON string
  public exportData(): string {
    return JSON.stringify({
      version: '1.0',
      exportedAt: new Date().toISOString(),
      stats: this.getStats(),
      sessions: this.getSessions(),
      customWorkouts: this.getCustomWorkouts(),
      settings: this.getSettings()
    }, null, 2);
  }
}

export const tvStorage = new StorageService();
