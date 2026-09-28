import React, { useState } from 'react';
import HomeOverview from './components/HomeOverview';
import ScenarioDetail from './components/ScenarioDetail';
import { SCENARIOS } from './data/scenarios';

export default function App() {
  const getInitialScenario = () => {
    if (typeof window !== 'undefined') {
      const param = new URLSearchParams(window.location.search).get('scenario');
      if (param) return param;
    }
    return null;
  };

  const [selectedScenarioId, setSelectedScenarioId] = useState(getInitialScenario);

  const activeScenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || null;

  return (
    <main className="min-h-screen bg-[#040812] text-slate-100 flex flex-col justify-between">
      {activeScenario ? (
        <ScenarioDetail
          scenario={activeScenario}
          onBack={() => setSelectedScenarioId(null)}
        />
      ) : (
        <HomeOverview
          scenarios={SCENARIOS}
          onSelectScenario={(id) => setSelectedScenarioId(id)}
        />
      )}

      {/* Persistent Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 py-6 md:px-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-400">BrainFlow</span>
          <span>•</span>
          <span>Interactive 3D Neuroscience Simulator</span>
        </div>
        <div>Designed for Educational Clarity</div>
      </footer>
    </main>
  );
}
