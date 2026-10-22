import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Dumbbell, 
  Zap, 
  Heart, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { Workout, WorkoutCategory } from '../../types';
import { WorkoutCard } from '../workout/WorkoutCard';

interface DiscoverScreenProps {
  workouts: Workout[];
  onSelectWorkout: (workout: Workout) => void;
}

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({
  workouts,
  onSelectWorkout,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { id: string; label: string; icon?: React.ReactNode }[] = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'hiit', label: 'HIIT & Cardio', icon: <Zap className="w-4 h-4 text-amber-400" /> },
    { id: 'strength', label: 'Strength', icon: <Dumbbell className="w-4 h-4 text-[#d4ff00]" /> },
    { id: 'mobility', label: 'Mobility & Posture', icon: <Heart className="w-4 h-4 text-emerald-400" /> },
    { id: 'core', label: 'Core Armor', icon: <ShieldCheck className="w-4 h-4 text-sky-400" /> },
    { id: 'recovery', label: 'Recovery & Stretch', icon: <Clock className="w-4 h-4 text-purple-400" /> },
  ];

  const quickTags = [
    { label: 'No Equipment', filter: () => { setSelectedEquipment('none'); } },
    { label: 'Beginner Friendly', filter: () => { setSelectedDifficulty('beginner'); } },
    { label: 'Under 15 Mins', filter: () => { setSearchQuery('15'); } },
    { label: 'Full Body', filter: () => { setSearchQuery('full body'); } },
  ];

  const filteredWorkouts = workouts.filter((w) => {
    // Category match
    if (selectedCategory !== 'all' && w.category !== selectedCategory) {
      return false;
    }
    // Difficulty match
    if (selectedDifficulty !== 'all' && w.difficulty !== selectedDifficulty) {
      return false;
    }
    // Equipment match
    if (selectedEquipment !== 'all') {
      if (selectedEquipment === 'none' && !w.equipment.includes('none')) {
        return false;
      }
      if (selectedEquipment === 'dumbbells' && !w.equipment.includes('dumbbells')) {
        return false;
      }
    }
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = w.title.toLowerCase().includes(q);
      const matchDesc = w.description.toLowerCase().includes(q);
      const matchMuscles = w.targetMuscles.some(m => m.toLowerCase().includes(q));
      const matchDuration = w.durationMinutes.toString().includes(q);
      if (!matchTitle && !matchDesc && !matchMuscles && !matchDuration) {
        return false;
      }
    }
    return true;
  });

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSelectedEquipment('all');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedEquipment !== 'all' || searchQuery !== '';

  return (
    <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full select-none pb-16 text-left">
      {/* Header */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-[#d4ff00]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#d4ff00] font-bold">
              Living Room Fitness Library
            </span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Workout Discovery
          </h1>
          <p className="text-sm text-neutral-400 mt-0.5">
            Explore curated regimens, filter by available living room equipment, or target specific muscle groups.
          </p>
        </div>

        {/* Quick Tag Pills */}
        <div className="flex items-center gap-2">
          {quickTags.map((tag) => (
            <button
              key={tag.label}
              onClick={tag.filter}
              className="tv-focusable text-xs px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-700/80 text-neutral-300 hover:text-white hover:border-[#d4ff00] transition-colors cursor-pointer"
              data-tv-focus="true"
            >
              + {tag.label}
            </button>
          ))}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="tv-focusable text-xs px-2.5 py-1.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 flex items-center gap-1 cursor-pointer"
              data-tv-focus="true"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs (10-Foot TV Focusable) */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`tv-focusable flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all cursor-pointer shrink-0 ${
                isSelected
                  ? 'bg-neutral-800 border-2 border-[#d4ff00] text-white shadow-lg'
                  : 'bg-[#131722] border border-neutral-800 text-neutral-400 hover:text-white'
              }`}
              data-tv-focus="true"
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filters & Search Bar */}
      <div className="grid grid-cols-12 gap-4 mb-6">
        {/* Search Input */}
        <div className="col-span-6 relative">
          <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exercises, muscles (e.g. core, knees, posture, glutes)..."
            className="tv-focusable w-full pl-11 pr-4 py-3 rounded-2xl bg-[#131722] border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4ff00]"
            data-tv-focus="true"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Difficulty Filter */}
        <div className="col-span-3">
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="tv-focusable w-full px-4 py-3 rounded-2xl bg-[#131722] border border-neutral-800 text-sm text-neutral-200 focus:outline-none focus:border-[#d4ff00] cursor-pointer"
            data-tv-focus="true"
          >
            <option value="all">All Difficulty Levels</option>
            <option value="beginner">Beginner (Gentle)</option>
            <option value="intermediate">Intermediate (Standard)</option>
            <option value="advanced">Advanced (High Output)</option>
          </select>
        </div>

        {/* Equipment Filter */}
        <div className="col-span-3">
          <select
            value={selectedEquipment}
            onChange={(e) => setSelectedEquipment(e.target.value)}
            className="tv-focusable w-full px-4 py-3 rounded-2xl bg-[#131722] border border-neutral-800 text-sm text-neutral-200 focus:outline-none focus:border-[#d4ff00] cursor-pointer"
            data-tv-focus="true"
          >
            <option value="all">All Equipment Types</option>
            <option value="none">Bodyweight / No Equipment</option>
            <option value="dumbbells">Dumbbells</option>
          </select>
        </div>
      </div>

      {/* Workouts Grid */}
      {filteredWorkouts.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onSelect={onSelectWorkout}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#131722] border border-neutral-800 rounded-3xl p-12 text-center my-8">
          <Dumbbell className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white">No Workouts Match Your Filters</h3>
          <p className="text-sm text-neutral-400 mt-1 max-w-md mx-auto">
            Try resetting your difficulty or equipment filters, or compile a custom session tailored to your exact criteria.
          </p>
          <button
            onClick={clearFilters}
            className="tv-focusable mt-4 px-6 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs cursor-pointer"
            data-tv-focus="true"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
