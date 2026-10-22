import { Workout, WorkoutSession, UserStats, AICoachMessage } from '../types';
import { tvStorage } from './storage';
import { WORKOUT_CATALOGUE } from '../data/workouts';
import { getBaseApiUrl } from './apiConfig';

export interface CoachQueryOptions {
  history?: WorkoutSession[];
  stats?: UserStats;
  userPrompt?: string;
}

export class AICoachService {
  private backendUrl = getBaseApiUrl();

  // Get personalized workout recommendation based on recent history
  public getPersonalizedRecommendation(): {
    workout: Workout;
    reasoning: string;
    source: 'local_sports_science' | 'cloud_ai';
  } {
    const history = tvStorage.getSessions();
    const stats = tvStorage.getStats();
    const allWorkouts = tvStorage.getAllWorkouts();

    if (history.length === 0) {
      // First-timer recommendation
      const beginnerWorkout = allWorkouts.find(w => w.id === 'morning-mobility-flow') || allWorkouts[0];
      return {
        workout: beginnerWorkout,
        reasoning: "Welcome to VisionFit TV! We recommend starting with this gentle Morning Mobility flow to prime your movement patterns and establish an effortless streak.",
        source: 'local_sports_science'
      };
    }

    const lastSession = history[0];

    // Case 1: Last workout was rated "too_hard" or was a heavy HIIT/strength session yesterday
    if (lastSession.difficultyRating === 'too_hard') {
      const recoveryWorkout = allWorkouts.find(w => w.category === 'mobility' || w.category === 'recovery') 
        || allWorkouts.find(w => w.id === 'evening-wind-down-stretch') 
        || allWorkouts[1];
      return {
        workout: recoveryWorkout,
        reasoning: `Based on your feedback that "${lastSession.workoutTitle}" was very demanding, your central nervous system needs active recovery today. We recommend this restorative flow to clear residual muscle soreness without breaking your streak.`,
        source: 'local_sports_science'
      };
    }

    // Case 2: Last workout was rated "easy" -> Recommend progressive overload
    if (lastSession.difficultyRating === 'easy') {
      const advancedWorkout = allWorkouts.find(w => w.difficulty === 'intermediate' && w.id !== lastSession.workoutId)
        || allWorkouts.find(w => w.id === 'ignite-360')
        || allWorkouts[0];
      return {
        workout: advancedWorkout,
        reasoning: `You breezed through your previous session with an "Easy" rating! To stimulate continued adaptation, we've elevated the intensity with "${advancedWorkout.title}".`,
        source: 'local_sports_science'
      };
    }

    // Case 3: Alternate muscle categories to prevent overuse
    if (lastSession.category === 'strength') {
      const cardioOrMobility = allWorkouts.find(w => w.category === 'mobility' || w.category === 'cardio' || w.category === 'core') || allWorkouts[0];
      return {
        workout: cardioOrMobility,
        reasoning: `After yesterday's strength loading, your muscle fibers undergo protein synthesis. Switching to ${cardioOrMobility.title} keeps metabolic rate elevated while allowing target muscles to supercompensate.`,
        source: 'local_sports_science'
      };
    }

    // Default intelligent rotation: pick next uncompleted or highest rated workout
    const nextWorkout = allWorkouts.find(w => w.id !== lastSession.workoutId) || allWorkouts[0];
    return {
      workout: nextWorkout,
      reasoning: `You are on a ${stats.currentStreakDays}-day streak! This balanced session complements your ${stats.totalMinutes} total minutes logged this week.`,
      source: 'local_sports_science'
    };
  }

  // Answer user coach questions or TV prompt chips
  public async askCoach(prompt: string): Promise<AICoachMessage> {
    const history = tvStorage.getSessions();
    const stats = tvStorage.getStats();

    // Check if backend API is reachable with live model
    try {
      const response = await fetch(`${this.backendUrl}/api/coach/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, history, stats }),
        signal: AbortSignal.timeout(2000) // Fast 2s timeout for seamless local fallback
      });

      if (response.ok) {
        const data = await response.json();
        return {
          id: `msg-${Date.now()}`,
          sender: 'coach',
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedWorkout: data.suggestedWorkout,
          source: 'cloud_ai'
        };
      }
    } catch {
      // Gracefully fall back to Local Sports Science Engine
    }

    // Local Sports Science & Knowledge Engine (Deterministic Fallback)
    const lower = prompt.toLowerCase();
    let replyText = "";
    let suggestedWorkout: Workout | undefined = undefined;

    if (lower.includes('streak') || lower.includes('recommend') || lower.includes('today') || lower.includes('what should i do')) {
      const rec = this.getPersonalizedRecommendation();
      suggestedWorkout = rec.workout;
      replyText = `**Coach Assessment:**\n${rec.reasoning}\n\n**Recommended Session:** **${rec.workout.title}** (${rec.workout.durationMinutes} mins, ${rec.workout.estimatedCalories} kcal).\n\nSelect "Launch Recommended Session" below to begin immediately.`;
    } 
    else if (lower.includes('squat') || lower.includes('knee') || lower.includes('pain') || lower.includes('form')) {
      replyText = `**Exercise Biomechanics & Technique Cue: Air Squats**\n\n• **Foot Stance:** Place feet shoulder-width apart, toes flared outward 10–15° to make room for your pelvis.\n• **Hip Hinge First:** Initiate the movement by pushing your hips backwards, as if sitting into an armchair behind you, before bending knees.\n• **Knee Tracking:** Prevent knees from collapsing inward (valgus). Actively push knees out in line with your middle toes.\n• **Depth:** Parallel depth is optimal. If you experience knee discomfort, try our accessible alternative: the **Chair Box Squat**, stopping at 90° seated height.\n\n*Safety Notice: VisionFit TV provides general fitness education. If pain is acute or persistent, consult a sports physician.*`;
    }
    else if (lower.includes('rest day') || lower.includes('recovery') || lower.includes('sore') || lower.includes('fatigue')) {
      const recovery = WORKOUT_CATALOGUE.find(w => w.id === 'evening-wind-down-stretch');
      suggestedWorkout = recovery;
      replyText = `**Active Recovery Strategy:**\n\nRest days are where actual muscle repair and cardiovascular adaptation occur. Total immobility often increases stiffness due to reduced lymphatic drainage.\n\n• **Active Recovery:** A gentle 10–15 minute mobility flow promotes circulation without triggering cortisol or micro-tears.\n• **Hydration & Protein:** Ensure at least 2.5L water and balanced amino acid intake.\n• **Sleep Quality:** Aim for 7–8 hours; growth hormone peaks during stage 3 non-REM sleep.`;
    }
    else if (lower.includes('quick') || lower.includes('10 min') || lower.includes('short') || lower.includes('no time')) {
      const quick = WORKOUT_CATALOGUE.find(w => w.id === 'core-armor-10') || WORKOUT_CATALOGUE[2];
      suggestedWorkout = quick;
      replyText = `**High-Yield Time Optimization:**\n\nYou don't need an hour to maintain cardiovascular health and metabolic priming. Even 10 minutes of uninterrupted compound effort triggers epinephrine release, elevates glucose sensitivity for 24 hours, and protects your weekly streak!\n\nI have loaded **${quick.title}** (${quick.durationMinutes} minutes) for you.`;
    }
    else if (lower.includes('plan') || lower.includes('generate') || lower.includes('routine')) {
      const generated = this.generateCustomPlan({
        durationMinutes: 15,
        goal: 'fat_burn',
        difficulty: 'intermediate',
        equipment: 'none'
      });
      suggestedWorkout = generated;
      replyText = `**Generated Custom Fire TV Routine:**\n\nI have compiled a 15-minute high-yield routine (**${generated.title}**) specifically structured for your living room screen, featuring ${generated.exercises.length} calibrated movements with built-in rest periods.`;
    }
    else {
      const generalRec = this.getPersonalizedRecommendation();
      suggestedWorkout = generalRec.workout;
      replyText = `**VisionFit AI Coach:**\n\nConsistency is the single biggest predictor of long-term health span. Based on your current profile (${stats.currentStreakDays}-day streak, ${stats.totalMinutes} total minutes), maintaining rhythm with manageable progressive sessions produces the best compounding results.\n\nWould you like to jump into today's recommended session: **${generalRec.workout.title}**?`;
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'coach',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedWorkout,
      source: 'local_sports_science'
    };
  }

  // Generate structured workout plan dynamically from setup choices
  public generateCustomPlan(params: {
    durationMinutes: number;
    goal: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    equipment: string;
    focusArea?: string;
  }): Workout {
    const allWorkouts = tvStorage.getAllWorkouts();
    const candidateExercises = allWorkouts.flatMap(w => w.exercises);

    // Pick 4 to 6 balanced exercises matching criteria
    const targetCount = params.durationMinutes <= 10 ? 3 : params.durationMinutes <= 20 ? 4 : 6;
    
    // Select exercises matching equipment
    let filtered = candidateExercises.filter(ex => {
      if (params.equipment === 'none' && ex.equipment !== 'none' && ex.equipment !== 'mat') {
        return false;
      }
      return true;
    });

    if (filtered.length < targetCount) {
      filtered = candidateExercises;
    }

    // Shuffle and pick unique exercises
    const unique = Array.from(new Map(filtered.map(ex => [ex.name, ex])).values());
    const selectedExercises = unique.slice(0, targetCount).map((ex, i) => ({
      ...ex,
      id: `custom-ex-${Date.now()}-${i}`,
      durationSeconds: params.difficulty === 'beginner' ? 35 : params.difficulty === 'intermediate' ? 45 : 50,
      defaultRestSeconds: params.difficulty === 'beginner' ? 25 : params.difficulty === 'intermediate' ? 20 : 15
    }));

    const workoutId = `custom-plan-${Date.now()}`;
    const customWorkout: Workout = {
      id: workoutId,
      title: `Custom ${params.durationMinutes}m ${params.goal.toUpperCase().replace('_', ' ')}`,
      tagline: `Tailored ${params.difficulty} routine optimized for ${params.equipment === 'none' ? 'zero equipment' : params.equipment}`,
      description: `Scientifically calibrated session combining progressive intervals, cardiovascular output, and posture stabilizers for maximum efficiency on your Fire TV.`,
      category: params.goal.includes('fat') ? 'hiit' : params.goal.includes('strength') ? 'strength' : 'mobility',
      difficulty: params.difficulty,
      durationMinutes: params.durationMinutes,
      estimatedCalories: Math.round(params.durationMinutes * (params.difficulty === 'advanced' ? 12 : 9.5)),
      equipment: params.equipment === 'none' ? ['none'] : [params.equipment as any],
      targetMuscles: ['Core', 'Full Body', 'Cardio'],
      exercises: selectedExercises,
      heroImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
      tags: ['Custom Plan', 'AI Generated', `${params.durationMinutes} Min`, params.difficulty],
      rating: 5.0
    };

    // Save custom workout to storage
    tvStorage.saveCustomWorkout(customWorkout);
    return customWorkout;
  }
}

export const coachService = new AICoachService();
