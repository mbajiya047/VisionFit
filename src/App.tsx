import React, { useState, useEffect, useCallback } from 'react';
import { 
  TVScreen, 
  Workout, 
  WorkoutSession, 
  UserStats, 
  AppSettings 
} from './types';
import { WORKOUT_CATALOGUE } from './data/workouts';
import { tvStorage } from './services/storage';
import { tvAudio } from './services/audioService';
import { useTVNavigation } from './hooks/useTVNavigation';
import { TVSafeArea } from './components/tv/TVSafeArea';
import { TVHeader } from './components/layout/TVHeader';
import { TVRemoteOverlay } from './components/tv/TVRemoteOverlay';
import { HomeScreen } from './components/home/HomeScreen';
import { DiscoverScreen } from './components/discover/DiscoverScreen';
import { WorkoutSetupScreen } from './components/setup/WorkoutSetupScreen';
import { ActiveWorkoutScreen } from './components/player/ActiveWorkoutScreen';
import { AICoachScreen } from './components/coach/AICoachScreen';
import { ProgressScreen } from './components/progress/ProgressScreen';
import { SettingsScreen } from './components/settings/SettingsScreen';
import { WorkoutPreviewModal } from './components/workout/WorkoutPreviewModal';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<TVScreen>('home');
  const [allWorkouts, setAllWorkouts] = useState<Workout[]>([]);
  const [userStats, setUserStats] = useState<UserStats>(tvStorage.getStats());
  const [userSessions, setUserSessions] = useState<WorkoutSession[]>(tvStorage.getSessions());
  const [settings, setSettings] = useState<AppSettings>(tvStorage.getSettings());
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [previewWorkout, setPreviewWorkout] = useState<Workout | null>(null);
  const [activeSessionBackup, setActiveSessionBackup] = useState<{ workout: Workout; exerciseIndex: number; elapsedSeconds: number } | null>(null);

  // Initialize data on mount
  useEffect(() => {
    const workouts = tvStorage.getAllWorkouts();
    setAllWorkouts(workouts);
    setUserStats(tvStorage.getStats());
    setUserSessions(tvStorage.getSessions());
    const storedSettings = tvStorage.getSettings();
    setSettings(storedSettings);
    tvAudio.setVoiceEnabled(storedSettings.enableVoiceCoach);
    tvAudio.setSoundEnabled(storedSettings.enableAudioBeeps);

    const backup = tvStorage.getActiveSessionBackup();
    setActiveSessionBackup(backup);
  }, []);

  // Handle TV Remote Back Navigation
  const handleTVBack = useCallback(() => {
    if (previewWorkout) {
      setPreviewWorkout(null);
      return;
    }
    if (currentScreen === 'player') {
      // Prompt or return to home
      if (window.confirm('Do you wish to exit the current workout? Your progress will be saved.')) {
        setCurrentScreen('home');
        setActiveWorkout(null);
      }
      return;
    }
    if (currentScreen !== 'home') {
      setCurrentScreen('home');
    }
  }, [previewWorkout, currentScreen]);

  // TV remote navigation hook
  useTVNavigation({
    onBack: handleTVBack,
    enabled: true,
  });

  const handleSelectScreen = (screen: TVScreen) => {
    tvAudio.playNavTick();
    setPreviewWorkout(null);
    setCurrentScreen(screen);
  };

  const handleStartWorkout = (workout: Workout) => {
    tvAudio.playNavTick();
    setPreviewWorkout(null);
    setActiveWorkout(workout);
    setCurrentScreen('player');
  };

  const handleCustomizeWorkout = (workout: Workout) => {
    tvAudio.playNavTick();
    setPreviewWorkout(null);
    setCurrentScreen('setup');
  };

  const handleFinishWorkout = (session: WorkoutSession) => {
    const updatedStats = tvStorage.getStats();
    const updatedSessions = tvStorage.getSessions();
    setUserStats(updatedStats);
    setUserSessions(updatedSessions);
    setActiveSessionBackup(null);
  };

  const handleResumeSession = () => {
    if (activeSessionBackup) {
      setActiveWorkout(activeSessionBackup.workout);
      setCurrentScreen('player');
    }
  };

  const handleResetDemoData = () => {
    tvStorage.resetToDemo();
    setUserStats(tvStorage.getStats());
    setUserSessions(tvStorage.getSessions());
    setAllWorkouts(tvStorage.getAllWorkouts());
    setSettings(tvStorage.getSettings());
    setActiveSessionBackup(null);
    setActiveWorkout(null);
    setCurrentScreen('home');
  };

  const featured = allWorkouts.find(w => w.featured) || allWorkouts[0] || WORKOUT_CATALOGUE[0];

  return (
    <div className="relative min-h-screen bg-[#0b0d12] text-[#f3f4f6] selection:bg-[#d4ff00] selection:text-black">
      <TVSafeArea marginPercent={settings.tvSafeMarginPercent}>
        {/* Do not show standard header in active workout player to maximize visual immersion */}
        {currentScreen !== 'player' && (
          <TVHeader
            currentScreen={currentScreen}
            onSelectScreen={handleSelectScreen}
            stats={userStats}
          />
        )}

        {/* Screen Switcher */}
        <main className="flex-1 flex flex-col">
          {currentScreen === 'home' && (
            <HomeScreen
              featuredWorkout={featured}
              allWorkouts={allWorkouts}
              stats={userStats}
              activeSessionBackup={activeSessionBackup}
              onSelectWorkout={(w) => setPreviewWorkout(w)}
              onStartDirect={handleStartWorkout}
              onResumeSession={handleResumeSession}
              onNavigateToDiscover={() => setCurrentScreen('discover')}
              onNavigateToCoach={() => setCurrentScreen('coach')}
            />
          )}

          {currentScreen === 'discover' && (
            <DiscoverScreen
              workouts={allWorkouts}
              onSelectWorkout={(w) => setPreviewWorkout(w)}
            />
          )}

          {currentScreen === 'setup' && (
            <WorkoutSetupScreen
              onStartGeneratedWorkout={handleStartWorkout}
              initialWorkout={previewWorkout}
            />
          )}

          {currentScreen === 'player' && activeWorkout && (
            <ActiveWorkoutScreen
              workout={activeWorkout}
              onFinishWorkout={handleFinishWorkout}
              onExit={() => {
                setActiveWorkout(null);
                setCurrentScreen('home');
              }}
            />
          )}

          {currentScreen === 'coach' && (
            <AICoachScreen
              onStartWorkout={handleStartWorkout}
            />
          )}

          {currentScreen === 'progress' && (
            <ProgressScreen
              stats={userStats}
              sessions={userSessions}
            />
          )}

          {currentScreen === 'settings' && (
            <SettingsScreen
              settings={settings}
              onUpdateSettings={(s) => setSettings(s)}
              onResetDemoData={handleResetDemoData}
            />
          )}
        </main>
      </TVSafeArea>

      {/* Workout Detail Preview Modal */}
      {previewWorkout && (
        <WorkoutPreviewModal
          workout={previewWorkout}
          onClose={() => setPreviewWorkout(null)}
          onStart={handleStartWorkout}
          onCustomize={handleCustomizeWorkout}
        />
      )}

      {/* On-Screen Fire TV Remote Simulator Overlay (Toggleable with 'R' or click) */}
      <TVRemoteOverlay
        onNavigateHome={() => setCurrentScreen('home')}
        onBack={handleTVBack}
        isPlaying={currentScreen === 'player'}
      />
    </div>
  );
};

export default App;
