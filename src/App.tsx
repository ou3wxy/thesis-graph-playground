import React, { useState } from 'react';
import { Network, FileText } from 'lucide-react';
import Header from './components/Header';
import LayoutStabilityLab from './components/LayoutStabilityLab';
import ThesisPdfStructuralLab from './components/ThesisPdfStructuralLab';

export default function App() {
  const [activeTab, setActiveTab] = useState<'graph-playground' | 'pdf-blueprint'>('graph-playground');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" id="thesis-workspace-root">
      {/* Universal Sticky Header */}
      <Header />

      {/* Sub-navigation Tabs Row */}
      <div className="bg-slate-900/60 border-b border-slate-900 py-2.5 px-4 sticky top-[57px] z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shadow-inner">
            <button
              onClick={() => setActiveTab('graph-playground')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                activeTab === 'graph-playground'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>1. Graph Playground</span>
            </button>
            <button
              onClick={() => setActiveTab('pdf-blueprint')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                activeTab === 'pdf-blueprint'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>2. Thesis Blueprint Lab</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-slate-500 bg-slate-950/60 border border-slate-850 px-2.5 py-1 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Workspace Sync Ready</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Frame */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6" id="app-main-content-area">
        {activeTab === 'graph-playground' ? (
          <div className="animate-fade-in" id="layout-lab-tab-view">
            <LayoutStabilityLab />
          </div>
        ) : (
          <div className="animate-fade-in" id="pdf-blueprint-lab-view">
            <ThesisPdfStructuralLab />
          </div>
        )}
      </main>

      {/* Humble Footer */}
      <footer className="bg-slate-955 border-t border-slate-900/60 py-4 text-center text-[11px] font-mono text-slate-500 mt-auto select-none bg-slate-950">
        <span>Thesis Framework Analyzer v1.5.0 • Crafted for Graph Stability Audits</span>
      </footer>
    </div>
  );
}

