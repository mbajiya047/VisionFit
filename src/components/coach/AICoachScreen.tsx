import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Play, 
  HelpCircle, 
  Activity, 
  Zap, 
  ShieldAlert, 
  CheckCircle,
  Clock,
  Dumbbell
} from 'lucide-react';
import { AICoachMessage, Workout } from '../../types';
import { coachService } from '../../services/coachService';
import { tvAudio } from '../../services/audioService';

interface AICoachScreenProps {
  onStartWorkout: (workout: Workout) => void;
}

export const AICoachScreen: React.FC<AICoachScreenProps> = ({ onStartWorkout }) => {
  const [messages, setMessages] = useState<AICoachMessage[]>([
    {
      id: 'welcome-01',
      sender: 'coach',
      text: "Hello! I am your **VisionFit AI Fitness Coach** on Fire TV.\n\nI analyze your workout history, recent difficulty ratings, and streaks to recommend optimal sessions, diagnose exercise biomechanics, and build custom programs.\n\nSelect any quick-consult topic below or ask me a question.",
      timestamp: 'Just now',
      source: 'local_sports_science',
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const sampleQueries = [
    { label: 'Recommend workout based on my streak', icon: <Activity className="w-4 h-4 text-[#d4ff00]" /> },
    { label: 'How to do squats without knee pain?', icon: <HelpCircle className="w-4 h-4 text-sky-400" /> },
    { label: 'I feel sore today. Should I take a rest day?', icon: <Zap className="w-4 h-4 text-amber-400" /> },
    { label: 'I only have 10 minutes with no equipment', icon: <Clock className="w-4 h-4 text-emerald-400" /> },
    { label: 'Generate a custom full-body living room plan', icon: <Sparkles className="w-4 h-4 text-[#d4ff00]" /> },
  ];

  const handleAsk = async (textToAsk: string) => {
    if (!textToAsk.trim() || loading) return;

    tvAudio.playNavTick();
    const userMsg: AICoachMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToAsk,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const coachReply = await coachService.askCoach(textToAsk);
      setMessages(prev => [...prev, coachReply]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'coach',
          text: "I encountered an issue processing that query, but your local workout library is fully intact. Feel free to explore our curated sessions or try another question.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: 'local_sports_science',
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full select-none pb-12 text-left">
      {/* Header Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-[#d4ff00]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#d4ff00] font-bold">
              Sports Science & Movement Intelligence
            </span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            VisionFit AI Coach
          </h1>
          <p className="text-sm text-neutral-400 mt-0.5">
            Personalized guidance, form correction cues, and dynamic routine compilation for your Fire TV.
          </p>
        </div>

        {/* Engine Transparency Indicator */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-[#d4ff00] animate-pulse" />
          <span className="text-neutral-300 font-mono">
            Local Science Engine: <strong className="text-[#d4ff00]">Active</strong>
          </span>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-12 gap-8 flex-1">
        {/* Left Column: Quick TV Remote Queries */}
        <div className="col-span-4 flex flex-col gap-4">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            TV Remote Quick Topics
          </span>

          <div className="flex flex-col gap-2.5">
            {sampleQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleAsk(q.label)}
                disabled={loading}
                className="tv-focusable p-3.5 rounded-2xl bg-[#131722] hover:bg-neutral-800 border border-neutral-800 text-left text-xs font-semibold text-neutral-200 flex items-center gap-3 transition-all cursor-pointer shadow-sm disabled:opacity-50"
                data-tv-focus="true"
              >
                <div className="p-2 rounded-xl bg-black/40 border border-neutral-700/60 shrink-0">
                  {q.icon}
                </div>
                <span className="leading-snug">{q.label}</span>
              </button>
            ))}
          </div>

          {/* Safety Notice */}
          <div className="p-4 rounded-2xl bg-[#121620] border border-neutral-800/80 mt-auto">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span>Wellness Guidance Disclaimer</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              VisionFit TV provides general fitness education and suggestions. It is not medical advice. Consult a physician before beginning any new exercise routine.
            </p>
          </div>
        </div>

        {/* Right Column: Chat Stream & Interactive Workout Recommendations */}
        <div className="col-span-8 flex flex-col justify-between bg-[#11141d] border border-neutral-800 rounded-3xl p-6 shadow-xl h-[560px]">
          {/* Messages Stream */}
          <div className="overflow-y-auto space-y-4 pr-2 flex-1 mb-4">
            {messages.map((msg) => {
              const isCoach = msg.sender === 'coach';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isCoach ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                      isCoach
                        ? 'bg-[#181d2a] text-neutral-200 border border-neutral-800'
                        : 'bg-neutral-800 text-white border border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4ff00]">
                        {isCoach ? 'VisionFit AI Coach' : 'You'}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono">{msg.timestamp}</span>
                    </div>

                    <div className="whitespace-pre-line font-sans text-neutral-200 text-sm">
                      {msg.text}
                    </div>

                    {/* Source Tag */}
                    {isCoach && msg.source && (
                      <div className="mt-3 pt-2 border-t border-neutral-700/50 flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono">
                        <CheckCircle className="w-3 h-3 text-[#d4ff00]" />
                        <span>
                          {msg.source === 'local_sports_science' ? 'Generated by Local Sports Science Engine' : 'Cloud Model Analysis'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* If message includes an actionable structured Workout */}
                  {msg.suggestedWorkout && (
                    <div className="mt-3 max-w-[85%] w-full bg-[#1c2232] border border-[#d4ff00]/40 rounded-2xl p-4 shadow-xl flex items-center justify-between animate-in slide-in-from-bottom-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#d4ff00] text-black flex items-center justify-center font-bold">
                          <Dumbbell className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase text-[#d4ff00] font-bold block">
                            Recommended Session
                          </span>
                          <h4 className="text-base font-bold text-white">
                            {msg.suggestedWorkout.title}
                          </h4>
                          <span className="text-xs text-neutral-400">
                            {msg.suggestedWorkout.durationMinutes} mins • {msg.suggestedWorkout.exercises.length} exercises • ~{msg.suggestedWorkout.estimatedCalories} kcal
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onStartWorkout(msg.suggestedWorkout!)}
                        className="tv-focusable flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#d4ff00] hover:bg-[#bce400] text-black font-extrabold text-sm transition-all shadow-lg shadow-[#d4ff00]/25 cursor-pointer"
                        data-tv-focus="true"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Start Now</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                <div className="w-2 h-2 rounded-full bg-[#d4ff00] animate-bounce" />
                <span>Coach analyzing training history & sports science guidelines...</span>
              </div>
            )}
          </div>

          {/* Text Input Row for Keyboard / Remote Keyboard */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(inputText);
            }}
            className="flex items-center gap-3 pt-3 border-t border-neutral-800"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask coach about form, recovery, or custom workout..."
              className="tv-focusable flex-1 px-4 py-3 rounded-2xl bg-[#161a25] border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#d4ff00]"
              data-tv-focus="true"
            />
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="tv-focusable px-5 py-3 rounded-2xl bg-[#d4ff00] hover:bg-[#bce400] text-black font-bold text-sm flex items-center gap-2 transition-all cursor-pointer disabled:opacity-40"
              data-tv-focus="true"
            >
              <Send className="w-4 h-4" />
              <span>Ask</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
