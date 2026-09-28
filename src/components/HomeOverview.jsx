import React, { useState, useMemo } from 'react';
import BrainCanvas from './BrainCanvas';
import { CATEGORIES } from '../data/scenarios';
import {
  Pill,
  Syringe,
  Wine,
  Zap,
  Cigarette,
  Leaf,
  Flame,
  Coffee,
  Utensils,
  Brain,
  Activity,
  ShieldAlert,
  Sparkles,
  Eye,
  HeartPulse,
  Sun,
  Focus,
  Waves,
  Moon,
  AlertTriangle,
  Feather,
  Clock,
  BookOpen,
  Compass,
  Smartphone,
  Gamepad2,
  Target,
  ShoppingBag,
  Dumbbell,
  ZapOff,
  Package,
  Hand,
  Search,
  X,
  Cog,
  Star,
  RotateCw,
  Layers,
  UserCheck,
  ArrowRight
} from 'lucide-react';

const iconMap = {
  Pill,
  Syringe,
  Wine,
  Zap,
  Cigarette,
  Leaf,
  Flame,
  Coffee,
  Utensils,
  Brain,
  Activity,
  ShieldAlert,
  Sparkles,
  Eye,
  HeartPulse,
  Sun,
  Focus,
  Waves,
  Moon,
  AlertTriangle,
  Feather,
  Clock,
  BookOpen,
  Compass,
  Smartphone,
  Gamepad2,
  Target,
  ShoppingBag,
  Dumbbell,
  ZapOff,
  Package,
  Hand
};

const categoryBadges = {
  substances: { label: 'Substance', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  'mental-health': { label: 'Mental Health', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' },
  cognitive: { label: 'Cognition', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
  compulsions: { label: 'Compulsion', color: 'text-pink-400 bg-pink-500/10 border-pink-500/30' },
  neuroplasticity: { label: 'Neuroplasticity', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' }
};

export default function HomeOverview({ scenarios, onSelectScenario }) {
  const [focusedOrgan, setFocusedOrgan] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter 50 scenarios by category and search query
  const filteredScenarios = useMemo(() => {
    return scenarios.filter((sc) => {
      const matchesCategory = selectedCategory === 'all' || sc.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        sc.title.toLowerCase().includes(q) ||
        sc.subtitle.toLowerCase().includes(q) ||
        (sc.badge && sc.badge.toLowerCase().includes(q)) ||
        sc.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [scenarios, selectedCategory, searchQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:px-8 space-y-6">
      {/* Top Header with title and active stats */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-900/30 pb-5">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white flex items-center gap-2">
            The <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(0,229,255,0.7)]">Brain</span> Simulator
          </h1>
          <p className="mt-2 text-slate-400 text-sm md:text-base max-w-2xl">
            See how different inputs, experiences and behaviors change the way your brain works in full interactive 3D.
          </p>
        </div>

        {/* Global Catalog Pill */}
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/70 border border-slate-800 px-3.5 py-1.5 rounded-full shrink-0">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-semibold text-slate-300">50 Comprehensive Scenarios</span>
          <span>•</span>
          <span className="text-cyan-400 font-mono">5 Categories</span>
        </div>
      </header>

      {/* Category Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count =
            cat.id === 'all'
              ? scenarios.length
              : scenarios.filter((s) => s.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                isSelected
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,229,255,0.5)] font-bold'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-black/20 text-black' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage: 3D Brain Viewport (Left) + Explore 50 Scenarios (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* 3D Brain Viewport (lg: 7 cols) with Lighter Neon Blue High-Contrast Shader */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-2 md:p-4 border border-cyan-500/20 relative flex flex-col justify-between shadow-2xl overflow-hidden min-h-[540px]">
          {/* 3D WebGL Canvas Component */}
          <div className="w-full h-[500px] md:h-[560px]">
            <BrainCanvas
              isDetailView={false}
              focusedOrgan={focusedOrgan}
              onSelectOrgan={(organId) => setFocusedOrgan(organId)}
            />
          </div>
        </div>

        {/* Explore Scenarios Catalog Sidebar (lg: 5 cols) */}
        <div className="lg:col-span-5 glass-panel-subtle rounded-2xl p-4 border border-slate-800 flex flex-col justify-between space-y-3 min-h-[540px]">
          {/* Sidebar Header & Search Filter */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <div className="text-xs font-bold tracking-wider uppercase text-slate-300 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Explore Scenarios</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {filteredScenarios.length} of {scenarios.length}
              </span>
            </div>

            {/* Fast Real-Time Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 50 brain scenarios..."
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-900/90 border border-slate-700/60 focus:border-cyan-400 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Scenario Cards List */}
          <div className="flex-1 max-h-[440px] md:max-h-[470px] overflow-y-auto pr-1 space-y-2.5 scrollbar-thin scrollbar-thumb-slate-700">
            {filteredScenarios.length > 0 ? (
              filteredScenarios.map((sc) => {
                const IconComponent = iconMap[sc.icon] || Brain;
                const catMeta = categoryBadges[sc.category] || {
                  label: sc.category,
                  color: 'text-slate-400 bg-slate-800 border-slate-700'
                };

                return (
                  <button
                    key={sc.id}
                    onClick={() => onSelectScenario(sc.id)}
                    className="w-full text-left p-3.5 rounded-xl glass-panel-subtle hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/50 transition-all duration-200 group flex items-start gap-3.5 relative overflow-hidden shadow-md"
                  >
                    <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                          {sc.title}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 leading-snug line-clamp-1">
                        {sc.subtitle}
                      </div>

                      {/* Scenario Meta Tags */}
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`text-[9px] font-semibold px-2 py-0.5 rounded-md border ${catMeta.color}`}
                        >
                          {catMeta.label}
                        </span>
                        {sc.badge && (
                          <span className="text-[9px] text-slate-400 font-mono truncate max-w-[170px]">
                            • {sc.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="py-12 text-center space-y-2">
                <Brain className="w-8 h-8 text-slate-600 mx-auto" />
                <div className="text-xs font-semibold text-slate-400">No scenarios found</div>
                <div className="text-[11px] text-slate-500">
                  Try adjusting your search query or switching categories.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Process Flow Chain: Stimulus -> Processing -> Behavior -> Result */}
      <div className="glass-panel-subtle rounded-2xl p-4 md:p-5 border border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          <div className="flex items-center gap-3.5 pt-2 md:pt-0 px-2">
            <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">Stimulus</div>
              <div className="text-[11px] text-slate-400 leading-tight">Something happens (internal or external)</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 pt-2 md:pt-0 px-2">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">Processing</div>
              <div className="text-[11px] text-slate-400 leading-tight">The brain interprets and responds</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 pt-2 md:pt-0 px-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Cog className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">Behavior</div>
              <div className="text-[11px] text-slate-400 leading-tight">You act (or feel) in a certain way</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 pt-2 md:pt-0 px-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Star className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">Result</div>
              <div className="text-[11px] text-slate-400 leading-tight">Short-term relief or long-term impact</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-slate-800/80 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400">
            <RotateCw className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Rotate & explore</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            See how different areas light up and work together in full 3D perspective.
          </p>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800/80 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400">
            <BookOpen className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Learn</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Short, clear explanations of what's happening at each stage of neurotransmission.
          </p>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800/80 space-y-2">
          <div className="flex items-center gap-2 text-amber-400">
            <Layers className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Compare</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            See how different inputs change the physical structure and cognitive outcome.
          </p>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800/80 space-y-2">
          <div className="flex items-center gap-2 text-purple-400">
            <UserCheck className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Takeaway</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Understand your brain physiology to make healthier, conscious lifestyle choices.
          </p>
        </div>
      </div>
    </div>
  );
}
