import React from 'react';
import { Network } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-slate-950 text-white shadow-sm border-b border-slate-900/80 sticky top-0 z-50 backdrop-blur-md bg-opacity-90" id="app-main-header">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between py-3 gap-3">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2.5">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white shadow-sm shadow-blue-600/30">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-sans font-bold text-base tracking-tight leading-none text-white">
              Graph Playground
            </h1>
            <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase tracking-wider">
              Thesis Framework Analyzer
            </p>
          </div>
        </div>

        {/* Info badges */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-900/60 px-3 py-1.5 rounded-md border border-slate-800/50">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono text-[11px] text-slate-400">Lab Server Active</span>
          </div>
        </div>
      </div>
    </header>
  );
}
