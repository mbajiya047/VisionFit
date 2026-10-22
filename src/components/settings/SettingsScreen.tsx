import React, { useState } from 'react';
import { 
  Tv, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Download, 
  ShieldCheck, 
  HelpCircle, 
  Sliders, 
  Eye, 
  Camera, 
  Check, 
  Info,
  Layers
} from 'lucide-react';
import { AppSettings } from '../../types';
import { tvStorage } from '../../services/storage';
import { tvAudio } from '../../services/audioService';

interface SettingsScreenProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onResetDemoData: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  onUpdateSettings,
  onResetDemoData,
}) => {
  const [resetConfirm, setResetConfirm] = useState(false);
  const [exportNotice, setExportNotice] = useState(false);

  const handleToggleVoice = () => {
    tvAudio.playNavTick();
    const updated = tvStorage.saveSettings({ enableVoiceCoach: !settings.enableVoiceCoach });
    tvAudio.setVoiceEnabled(updated.enableVoiceCoach);
    onUpdateSettings(updated);
  };

  const handleToggleSound = () => {
    tvAudio.playNavTick();
    const updated = tvStorage.saveSettings({ enableAudioBeeps: !settings.enableAudioBeeps });
    tvAudio.setSoundEnabled(updated.enableAudioBeeps);
    onUpdateSettings(updated);
  };

  const handleSelectMargin = (margin: 0 | 3 | 5) => {
    tvAudio.playNavTick();
    const updated = tvStorage.saveSettings({ tvSafeMarginPercent: margin });
    onUpdateSettings(updated);
  };

  const handleSelectUnits = (units: 'metric' | 'imperial') => {
    tvAudio.playNavTick();
    const updated = tvStorage.saveSettings({ unitSystem: units });
    onUpdateSettings(updated);
  };

  const handleExport = () => {
    tvAudio.playNavTick();
    const dataStr = tvStorage.exportData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visionfit-tv-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full select-none pb-20 text-left">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Sliders className="w-5 h-5 text-[#d4ff00]" />
          <span className="text-xs font-mono uppercase tracking-wider text-[#d4ff00] font-bold">
            Fire TV Configuration & Environment
          </span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Application Settings
        </h1>
        <p className="text-sm text-neutral-400 mt-0.5">
          Calibrate TV display margins, remote control bindings, voice guidance, and persistent storage.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Settings Categories */}
        <div className="col-span-8 flex flex-col gap-6">
          {/* Display & Overscan Margin */}
          <div className="p-5 rounded-3xl bg-[#131722] border border-neutral-800 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Tv className="w-5 h-5 text-[#d4ff00]" />
              <h3 className="text-base font-bold text-white">TV Safe Area & Overscan Insets</h3>
            </div>
            <p className="text-xs text-neutral-400 mb-4">
              Ensures living room screens and Fire TV hardware do not clip application edges.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {[
                { val: 5, label: '5% Standard TV', desc: 'Amazon Fire TV Recommended' },
                { val: 3, label: '3% Tight TV', desc: 'Modern 4K Ultra HD screens' },
                { val: 0, label: '0% Zero Overscan', desc: 'Computer monitors / OLEDs' },
              ].map((m) => (
                <button
                  key={m.val}
                  onClick={() => handleSelectMargin(m.val as any)}
                  className={`tv-focusable p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                    settings.tvSafeMarginPercent === m.val
                      ? 'bg-neutral-800 border-[#d4ff00] text-white'
                      : 'bg-[#181d2a] border-neutral-800 text-neutral-400 hover:bg-neutral-800/60'
                  }`}
                  data-tv-focus="true"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{m.label}</span>
                    {settings.tvSafeMarginPercent === m.val && <Check className="w-4 h-4 text-[#d4ff00]" />}
                  </div>
                  <span className="text-[11px] text-neutral-400 mt-0.5 block">{m.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Audio & Spoken Coaching */}
          <div className="p-5 rounded-3xl bg-[#131722] border border-neutral-800 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Volume2 className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">Audio Guidance & Sounds</h3>
            </div>
            <p className="text-xs text-neutral-400 mb-4">
              Speech announcements and timer countdown beeps generated via Web Audio API.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#181d2a] border border-neutral-800">
                <div>
                  <span className="text-sm font-bold text-white block">Spoken Voice Coach</span>
                  <span className="text-[11px] text-neutral-400">Announces exercises and rest periods</span>
                </div>
                <button
                  onClick={handleToggleVoice}
                  className={`tv-focusable px-4 py-2 rounded-xl font-bold text-xs cursor-pointer ${
                    settings.enableVoiceCoach
                      ? 'bg-[#d4ff00] text-black'
                      : 'bg-neutral-800 text-neutral-400'
                  }`}
                  data-tv-focus="true"
                >
                  {settings.enableVoiceCoach ? 'ENABLED' : 'MUTED'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#181d2a] border border-neutral-800">
                <div>
                  <span className="text-sm font-bold text-white block">Countdown Audio Beeps</span>
                  <span className="text-[11px] text-neutral-400">3-2-1 acoustic interval signals</span>
                </div>
                <button
                  onClick={handleToggleSound}
                  className={`tv-focusable px-4 py-2 rounded-xl font-bold text-xs cursor-pointer ${
                    settings.enableAudioBeeps
                      ? 'bg-[#d4ff00] text-black'
                      : 'bg-neutral-800 text-neutral-400'
                  }`}
                  data-tv-focus="true"
                >
                  {settings.enableAudioBeeps ? 'ENABLED' : 'MUTED'}
                </button>
              </div>
            </div>
          </div>

          {/* Units of Measure */}
          <div className="p-5 rounded-3xl bg-[#131722] border border-neutral-800 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Measurement Standard</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSelectUnits('metric')}
                className={`tv-focusable p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                  settings.unitSystem === 'metric'
                    ? 'bg-neutral-800 border-[#d4ff00] text-white'
                    : 'bg-[#181d2a] border-neutral-800 text-neutral-400 hover:bg-neutral-800/60'
                }`}
                data-tv-focus="true"
              >
                <span className="text-sm font-bold text-white block">Metric System (kg, km, cm)</span>
                <span className="text-[11px] text-neutral-400">International standard</span>
              </button>

              <button
                onClick={() => handleSelectUnits('imperial')}
                className={`tv-focusable p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                  settings.unitSystem === 'imperial'
                    ? 'bg-neutral-800 border-[#d4ff00] text-white'
                    : 'bg-[#181d2a] border-neutral-800 text-neutral-400 hover:bg-neutral-800/60'
                }`}
                data-tv-focus="true"
              >
                <span className="text-sm font-bold text-white block">Imperial System (lbs, miles)</span>
                <span className="text-[11px] text-neutral-400">US standard</span>
              </button>
            </div>
          </div>

          {/* Data & Privacy */}
          <div className="p-5 rounded-3xl bg-[#131722] border border-neutral-800 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
              <h3 className="text-base font-bold text-white">Data Privacy & Local Storage</h3>
            </div>
            <p className="text-xs text-neutral-400 mb-4">
              VisionFit TV operates completely locally with zero unauthorized tracking or ad beacons.
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={handleExport}
                className="tv-focusable flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold border border-neutral-700 cursor-pointer"
                data-tv-focus="true"
              >
                <Download className="w-4 h-4 text-[#d4ff00]" />
                <span>Export Workout Data (JSON)</span>
              </button>

              {resetConfirm ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-rose-400">Confirm Reset?</span>
                  <button
                    onClick={() => {
                      tvAudio.playNavTick();
                      onResetDemoData();
                      setResetConfirm(false);
                    }}
                    className="tv-focusable px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer"
                    data-tv-focus="true"
                  >
                    Yes, Reset
                  </button>
                  <button
                    onClick={() => setResetConfirm(false)}
                    className="tv-focusable px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-300 text-xs cursor-pointer"
                    data-tv-focus="true"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setResetConfirm(true)}
                  className="tv-focusable flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-rose-950/60 border border-neutral-800 text-neutral-400 hover:text-rose-300 text-xs font-bold cursor-pointer"
                  data-tv-focus="true"
                >
                  <RotateCcw className="w-4 h-4 text-rose-400" />
                  <span>Reset Demo Data</span>
                </button>
              )}
            </div>

            {exportNotice && (
              <span className="text-xs text-emerald-400 block mt-2 animate-in fade-in">
                Workout data exported successfully!
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Fire TV Remote Reference & Hackathon Info */}
        <div className="col-span-4 flex flex-col gap-6">
          {/* Fire TV Remote Key Mapping Guide */}
          <div className="p-5 rounded-3xl bg-[#131722] border border-neutral-800 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Tv className="w-5 h-5 text-[#d4ff00]" />
              <h3 className="text-base font-bold text-white">Fire TV Remote Navigation</h3>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-neutral-800">
                <span className="text-neutral-400">D-Pad Arrows</span>
                <span className="font-mono text-[#d4ff00] font-bold">Spatial Movement</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-neutral-800">
                <span className="text-neutral-400">Center Select / Enter</span>
                <span className="font-mono text-white font-bold">Activate / Select</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-neutral-800">
                <span className="text-neutral-400">Back / Escape</span>
                <span className="font-mono text-neutral-300 font-bold">Return to Previous</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-neutral-800">
                <span className="text-neutral-400">Play / Pause (Space)</span>
                <span className="font-mono text-neutral-300 font-bold">Toggle Interval</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-neutral-800">
                <span className="text-neutral-400">Key 'R'</span>
                <span className="font-mono text-amber-400 font-bold">Toggle Remote Overlay</span>
              </div>
            </div>
          </div>

          {/* Hackathon Project Statement */}
          <div className="p-5 rounded-3xl bg-[#11151e] border border-neutral-800 shadow-md">
            <div className="flex items-center gap-2 mb-2 text-[#d4ff00]">
              <Info className="w-5 h-5" />
              <h4 className="text-sm font-bold text-white">Hackathon Project Statement</h4>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              <strong>VisionFit TV</strong> is an independent project developed for the <strong>Amazon Developer “Build, Ship, Shape” 2026 Hackathon</strong> (Fire TV Track).
            </p>
            <p className="text-[11px] text-neutral-500 mt-2 leading-relaxed">
              This is an independent hackathon entry. Do not imply that Amazon has endorsed, sponsored, approved, or officially adopted VisionFit TV.
            </p>
          </div>

          {/* Target Fire OS Runtime Info */}
          <div className="p-5 rounded-3xl bg-[#11151e] border border-neutral-800 shadow-md">
            <div className="flex items-center gap-2 mb-2 text-sky-400">
              <Layers className="w-5 h-5" />
              <h4 className="text-sm font-bold text-white">Fire OS Runtime Specifications</h4>
            </div>
            <div className="text-[11px] text-neutral-400 space-y-1 font-mono">
              <div>Target: <strong>Amazon Fire TV Stick 4K / Max</strong></div>
              <div>Runtime: <strong>Chromium Amazon Web App / Cordova</strong></div>
              <div>Resolution: <strong>1920x1080 (16:9 10-foot UI)</strong></div>
              <div>Framerate Target: <strong>60 FPS Hardware Accelerated</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
