import React, { useState } from 'react';
import BrainCanvas from './BrainCanvas';
import { ArrowLeft, Lock, Leaf, Clock, CheckCircle2 } from 'lucide-react';

export default function ScenarioDetail({ scenario, onBack }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedTimelineStage, setSelectedTimelineStage] = useState(0);

  if (!scenario) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:px-8 space-y-6">
      {/* Header with Back button and scenario meta */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-900/30 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl glass-panel-subtle hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-all flex items-center gap-1.5 text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Overview</span>
          </button>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
              {scenario.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-0.5">
              {scenario.subtitle}
            </p>
          </div>
        </div>

        {/* Badge Pill */}
        <div className="flex items-center gap-2">
          <div className="glow-pill-purple px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-lg">
            <Lock className="w-3.5 h-3.5" />
            <span>{scenario.badge}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: 3D Pathway Viewport (Left) + Educational Steps (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 3D Stage & Timeline Comparison (lg: 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 3D Brain Pathway Specimen */}
          <div className="glass-panel rounded-2xl p-4 md:p-6 border border-cyan-500/20 relative shadow-2xl overflow-hidden min-h-[460px]">
            <div className="w-full h-[400px] md:h-[460px]">
              <BrainCanvas
                isDetailView={true}
                activeScenario={scenario}
                activeStep={scenario.steps[activeStepIndex]}
                activeStepIndex={activeStepIndex}
                selectedTimelineStage={selectedTimelineStage}
                onSelectStep={(idx) => setActiveStepIndex(idx)}
                onSelectTimelineStage={(idx) => setSelectedTimelineStage(idx)}
              />
            </div>
          </div>

          {/* "What changes over time?" Timeline Card */}
          <div className="glass-panel-subtle rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>What changes over time?</span>
              </div>
              <span className="text-[11px] text-cyan-400 font-mono tracking-tight">Tap stage to inspect</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {scenario.timeline.map((item, idx) => {
                const isSelected = selectedTimelineStage === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedTimelineStage(idx)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex flex-col items-center justify-between gap-3 relative overflow-hidden ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.35)] ring-2 ring-cyan-400/80 scale-[1.02]'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40 opacity-80 hover:opacity-100'
                    }`}
                  >
                    {/* Active Ribbon Badge */}
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-cyan-500 text-black text-[9px] font-black uppercase tracking-wider">
                        Active
                      </div>
                    )}

                    {/* Visual Mini Brain Graphic Matching Concept Art */}
                    <div className="w-16 h-12 flex items-center justify-center relative mt-1">
                      <svg viewBox="0 0 48 36" className="w-full h-full drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
                        <defs>
                          <linearGradient id={`grad-brain-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            {idx === 0 && (
                              <>
                                <stop offset="0%" stopColor="#38bdf8" />
                                <stop offset="100%" stopColor="#1e3a8a" />
                              </>
                            )}
                            {idx === 1 && (
                              <>
                                <stop offset="0%" stopColor="#fbbf24" />
                                <stop offset="50%" stopColor="#f43f5e" />
                                <stop offset="100%" stopColor="#312e81" />
                              </>
                            )}
                            {idx === 2 && (
                              <>
                                <stop offset="0%" stopColor="#c084fc" />
                                <stop offset="100%" stopColor="#4c1d95" />
                              </>
                            )}
                          </linearGradient>
                        </defs>
                        <path
                          d="M12 24 C8 24 6 20 8 16 C6 13 8 9 12 8 C15 5 21 5 25 7 C28 4 35 5 38 9 C42 11 44 16 41 21 C43 25 39 30 33 29 C30 32 25 31 23 28 C19 30 14 30 12 24 Z"
                          fill={`url(#grad-brain-${idx})`}
                          opacity={idx === 1 ? '1' : '0.85'}
                        />
                        {idx === 1 && (
                          <circle cx="24" cy="18" r="6" fill="#f59e0b" className="animate-ping" filter="blur(1px)" />
                        )}
                        {idx === 1 && (
                          <circle cx="24" cy="18" r="4.5" fill="#f59e0b" />
                        )}
                      </svg>
                    </div>

                    <div className="w-full">
                      <div className="flex items-center justify-between text-xs font-bold mb-1">
                        <span className={isSelected ? 'text-cyan-300 font-extrabold' : 'text-slate-300'}>
                          {item.stage}
                        </span>
                        {idx === 0 && <span className="text-[10px] text-emerald-400 font-mono">Normal</span>}
                        {idx === 1 && <span className="text-[10px] text-amber-400 font-mono">Repeated</span>}
                        {idx === 2 && <span className="text-[10px] text-purple-400 font-mono">Long-term</span>}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Step-by-Step Educational Narrative & Cards (lg: 5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Pathway Steps List */}
          <div className="space-y-2.5">
            {scenario.steps.map((st, index) => {
              const isActive = activeStepIndex === index;
              const stepColors = [
                { bg: 'bg-cyan-500', text: 'text-black', border: 'border-cyan-500/40' },
                { bg: 'bg-pink-500', text: 'text-white', border: 'border-pink-500/40' },
                { bg: 'bg-emerald-500', text: 'text-black', border: 'border-emerald-500/40' },
                { bg: 'bg-purple-500', text: 'text-white', border: 'border-purple-500/40' }
              ];
              const theme = stepColors[index % stepColors.length];

              return (
                <div
                  key={st.number}
                  onClick={() => setActiveStepIndex(index)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? `glass-panel border-cyan-400/40 shadow-lg scale-[1.01]`
                      : `glass-panel-subtle border-slate-800/80 hover:border-slate-700`
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-7 h-7 rounded-full font-bold flex items-center justify-center text-xs shrink-0 ${
                        theme.bg
                      } ${theme.text} ${isActive ? 'ring-2 ring-white/60' : 'opacity-90'}`}
                    >
                      {st.number}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-white flex items-center justify-between">
                        <span>{st.title}</span>
                        {isActive && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {st.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* The Result Card */}
          <div className="p-4 rounded-xl glass-panel border border-purple-500/30 shadow-lg space-y-1.5 relative overflow-hidden">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>{scenario.result.title}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {scenario.result.description}
            </p>
          </div>

          {/* The Good News & Neuroplasticity Card */}
          <div className="p-4 rounded-xl glass-panel border border-emerald-500/30 shadow-lg space-y-3 relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>{scenario.goodNews.title}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {scenario.goodNews.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
