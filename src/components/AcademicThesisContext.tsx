import React, { useState } from 'react';
import { FileText, BookOpen, ExternalLink, RefreshCw, ZoomIn, Info, CheckCircle } from 'lucide-react';
import { MOCK_THESIS_PAPER } from '../data/graphs';

export default function AcademicThesisContext() {
  const [activeSection, setActiveSection] = useState<string>('venn-analysis');
  const [selectedVennFigure, setSelectedVennFigure] = useState<'venn-1000' | 'venn-100'>('venn-1000');
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Terminology listings based on overlap segment clicked or hovered
  const overlapDescriptions: Record<string, { title: string; words: string[]; count: number }> = {
    'easy-only': {
      title: "Easy Readability Segment",
      words: ["input", "output", "calculate", "sum", "total", "rate", "year", "simple", "factor"],
      count: 337
    },
    'moderate-only': {
      title: "Moderate Readability Segment",
      words: ["projection", "regression", "discount", "leverage", "variance", "compound", "annualized"],
      count: 147
    },
    'difficult-only': {
      title: "Difficult Readability Segment",
      words: ["stochastic", "autoregressive", "eigenvalue", "homoscedasticity", "multicollinerity", "asymptotic"],
      count: 442
    },
    'center-overlap': {
      title: "Core Coregulation Overlap (All Bands)",
      words: ["model", "variable", "coefficient", "parameter", "iteration", "estimation", "stability", "dependency"],
      count: 326
    },
    'easy-mod': {
      title: "Easy - Moderate Interface",
      words: ["forecast", "growth", "interest", "debt", "equity", "cash", "margin", "asset", "liability"],
      count: 294
    },
    'mod-diff': {
      title: "Moderate - Difficult Interface",
      words: ["covariance", "probability", "valuation", "sensitivity", "monte-carlo", "simulation", "pricing"],
      count: 233
    },
    'easy-diff': {
      title: "Easy - Difficult Direct Connection",
      words: ["system", "equation", "vector", "matrix", "derivative", "delta"],
      count: 5
    }
  };

  const getActiveDesc = () => {
    return hoveredRegion ? overlapDescriptions[hoveredRegion] : overlapDescriptions['center-overlap'];
  };

  const currentDesc = getActiveDesc();

  return (
    <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl shadow-md flex flex-col h-[calc(100vh-120px)] overflow-hidden" id="academic-context-panel">
      {/* PDF Header bar */}
      <div className="bg-slate-950/40 border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-red-500" />
          <span className="font-sans font-semibold text-xs text-slate-200 truncate max-w-xs md:max-w-md">
            {MOCK_THESIS_PAPER.title}
          </span>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-[10px] font-mono bg-slate-850/80 border border-slate-800/60 text-slate-400 px-2 py-0.5 rounded">
            PDF Reader
          </span>
          <ZoomIn className="w-4 h-4 text-slate-400 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Abstract and Citation Details */}
      <div className="bg-slate-950/20 px-4 py-2 border-b border-slate-800/80 text-[11px] text-slate-400 font-mono flex flex-wrap justify-between gap-y-1">
        <span>{MOCK_THESIS_PAPER.journal}</span>
        <span className="text-slate-550">DOI: {MOCK_THESIS_PAPER.doi}</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Miniature Section Nav */}
        <div className="w-24 bg-slate-950/30 border-r border-slate-800/80 flex flex-col pt-3 font-sans text-[11px] shrink-0">
          <p className="text-[9px] font-mono text-slate-500 px-2 uppercase tracking-tight mb-2 font-semibold font-bold">
            SECTIONS
          </p>
          {MOCK_THESIS_PAPER.sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`p-2.5 text-left border-l-2 text-[10.5px] transition-all cursor-pointer ${
                activeSection === sec.id
                  ? 'bg-slate-900/60 border-indigo-500 text-indigo-400 font-semibold'
                  : 'border-transparent text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
              }`}
            >
              {sec.id === 'abstract' && 'Abstract'}
              {sec.id === 'venn-analysis' && '6. Venn Band'}
              {sec.id === 'methodology' && '7. Stability'}
            </button>
          ))}
        </div>

        {/* Right Side: Section reader */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-slate-350">
          {MOCK_THESIS_PAPER.sections.map((sec) => {
            if (sec.id !== activeSection) return null;
            return (
              <div key={sec.id} className="space-y-4 animate-fade-in">
                <h3 className="font-sans font-bold text-sm text-slate-100 border-b border-slate-800 pb-2 flex items-center gap-1.5 container-sub-hd">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  {sec.title}
                </h3>
                
                {sec.content.map((p, idx) => (
                  <p key={idx} className="font-sans text-xs text-slate-300 leading-relaxed text-justify">
                    {p}
                  </p>
                ))}

                {/* Draw dynamic interactive diagrams inside Section 6 */}
                {sec.id === 'venn-analysis' && (
                  <div className="mt-6 border border-slate-800/80 p-3 bg-slate-950/20 rounded-lg space-y-4">
                    <div className="flex items-center justify-between bg-slate-900/60 p-1.5 rounded-md border border-slate-808/80">
                      <span className="text-[10px] font-mono text-slate-400 font-medium px-2">Click elements to inspect</span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => setSelectedVennFigure('venn-1000')}
                          className={`px-2 py-1 text-[10px] font-semibold rounded cursor-pointer transition-all ${
                            selectedVennFigure === 'venn-1000'
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                          }`}
                        >
                          Top 1,000 SUWs
                        </button>
                        <button
                          onClick={() => setSelectedVennFigure('venn-100')}
                          className={`px-2 py-1 text-[10px] font-semibold rounded cursor-pointer transition-all ${
                            selectedVennFigure === 'venn-100'
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                          }`}
                        >
                          Top 100 SUWs
                        </button>
                      </div>
                    </div>

                    {/* Highly polished academic SVG Venn Diagram */}
                    <div className="flex flex-col items-center justify-center py-2 bg-slate-950/40 rounded-lg border border-slate-808/80 relative shadow-inner">
                      <p className="text-[10px] font-mono text-slate-500 absolute top-2 right-2 flex items-center gap-1">
                        <Info className="w-3 h-3 text-indigo-400" />
                        <span>Interactive Venn Chart</span>
                      </p>

                      <svg width="220" height="200" viewBox="0 0 220 200" className="mx-auto" id="venn-svg-chart">
                        {/* Define gradients / styles */}
                        <defs>
                          <radialGradient id="easy-grad" cx="40%" cy="40%" r="60%">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.08" />
                            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.22" />
                          </radialGradient>
                          <radialGradient id="mod-grad" cx="50%" cy="30%" r="65%">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
                            <stop offset="100%" stopColor="#059669" stopOpacity="0.22" />
                          </radialGradient>
                          <radialGradient id="diff-grad" cx="60%" cy="40%" r="60%">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.08" />
                            <stop offset="100%" stopColor="#d97706" stopOpacity="0.22" />
                          </radialGradient>
                        </defs>

                        {/* Interactive Circle Regions */}
                        {/* Moderate Cluster (Top) */}
                        <circle
                          cx="110" cy="80" r="50"
                          fill="url(#mod-grad)"
                          stroke={hoveredRegion === 'moderate-only' ? '#10b981' : '#059669'}
                          strokeWidth={hoveredRegion === 'moderate-only' ? '2.5' : '1.2'}
                          className="transition-all cursor-pointer"
                          onMouseEnter={() => setHoveredRegion('moderate-only')}
                          onClick={() => setHoveredRegion('moderate-only')}
                        />

                        {/* Easy Cluster (Left-bottom) */}
                        <circle
                          cx="85" cy="120" r="50"
                          fill="url(#easy-grad)"
                          stroke={hoveredRegion === 'easy-only' ? '#6366f1' : '#4f46e5'}
                          strokeWidth={hoveredRegion === 'easy-only' ? '2.5' : '1.2'}
                          className="transition-all cursor-pointer"
                          onMouseEnter={() => setHoveredRegion('easy-only')}
                          onClick={() => setHoveredRegion('easy-only')}
                        />

                        {/* Difficult Cluster (Right-bottom) */}
                        <circle
                          cx="135" cy="120" r="50"
                          fill="url(#diff-grad)"
                          stroke={hoveredRegion === 'difficult-only' ? '#f59e0b' : '#d97706'}
                          strokeWidth={hoveredRegion === 'difficult-only' ? '2.5' : '1.2'}
                          className="transition-all cursor-pointer"
                          onMouseEnter={() => setHoveredRegion('difficult-only')}
                          onClick={() => setHoveredRegion('difficult-only')}
                        />

                        {/* Overlap Highlights (Small circles at midpoints or polygon intercepts for feedback) */}
                        {/* Center core */}
                        <ellipse
                          cx="110" cy="107" rx="15" ry="12"
                          fill={hoveredRegion === 'center-overlap' ? 'rgba(99, 102, 241, 0.25)' : 'transparent'}
                          stroke={hoveredRegion === 'center-overlap' ? '#818cf8' : 'transparent'}
                          strokeWidth="1.2"
                          className="cursor-pointer transition-all"
                          onMouseEnter={() => setHoveredRegion('center-overlap')}
                          onClick={() => setHoveredRegion('center-overlap')}
                        />

                        {/* Text labels matching values precisely */}
                        {/* Easy exclusive */}
                        <text x="58" y="142" textAnchor="middle" className="font-mono text-[10px] font-semibold fill-slate-300 pointer-events-none">
                          {selectedVennFigure === 'venn-1000' ? '337' : '30'}
                        </text>
                        <text x="44" y="125" textAnchor="middle" className="font-sans text-[10px] font-bold fill-slate-100 pointer-events-none">
                          Easy
                        </text>

                        {/* Moderate exclusive */}
                        <text x="110" y="52" textAnchor="middle" className="font-mono text-[10px] font-semibold fill-slate-300 pointer-events-none">
                          {selectedVennFigure === 'venn-1000' ? '147' : '6'}
                        </text>
                        <text x="110" y="38" textAnchor="middle" className="font-sans text-[10px] font-bold fill-slate-100 pointer-events-none">
                          Moderate
                        </text>

                        {/* Difficult exclusive */}
                        <text x="162" y="142" textAnchor="middle" className="font-mono text-[10px] font-semibold fill-slate-300 pointer-events-none">
                          {selectedVennFigure === 'venn-1000' ? '442' : '24'}
                        </text>
                        <text x="176" y="125" textAnchor="middle" className="font-sans text-[10px] font-bold fill-slate-100 pointer-events-none">
                          Difficult
                        </text>

                        {/* Overlaps counts */}
                        {/* Easy-Mod (Left upper intersect) */}
                        <text
                          x="75" fill={hoveredRegion === 'easy-mod' ? '#6366f1' : '#64748b'}
                          y="92" textAnchor="middle" className="font-mono text-[9px] font-bold cursor-pointer"
                          onMouseEnter={() => setHoveredRegion('easy-mod')}
                          onClick={() => setHoveredRegion('easy-mod')}
                        >
                          {selectedVennFigure === 'venn-1000' ? '294' : '18'}
                        </text>

                        {/* Mod-Diff (Right upper intersect) */}
                        <text
                          x="145" fill={hoveredRegion === 'mod-diff' ? '#f59e0b' : '#64748b'}
                          y="92" textAnchor="middle" className="font-mono text-[9px] font-bold cursor-pointer"
                          onMouseEnter={() => setHoveredRegion('mod-diff')}
                          onClick={() => setHoveredRegion('mod-diff')}
                        >
                          {selectedVennFigure === 'venn-1000' ? '233' : '24'}
                        </text>

                        {/* Easy-Diff (Bottom direct intersect) */}
                        <text
                          x="110" fill={hoveredRegion === 'easy-diff' ? '#f43f5e' : '#64748b'}
                          y="156" textAnchor="middle" className="font-mono text-[9px] font-bold cursor-pointer"
                          onMouseEnter={() => setHoveredRegion('easy-diff')}
                          onClick={() => setHoveredRegion('easy-diff')}
                        >
                          {selectedVennFigure === 'venn-1000' ? '5' : '0'}
                        </text>

                        {/* Center core */}
                        <text
                          x="110" fill={hoveredRegion === 'center-overlap' ? '#e2e8f0' : '#94a3b8'}
                          y="111" textAnchor="middle" className="font-mono text-[10px] font-extrabold cursor-pointer decoration-dotted underline"
                          onMouseEnter={() => setHoveredRegion('center-overlap')}
                          onClick={() => setHoveredRegion('center-overlap')}
                        >
                          {selectedVennFigure === 'venn-1000' ? '326' : '52'}
                        </text>
                      </svg>

                      {/* Display detail list */}
                      <div className="w-full bg-slate-900/60 border-t border-slate-808/80 p-3 mt-1 text-[11px] font-sans">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-semibold text-slate-200 uppercase text-[9px] tracking-wide">
                            {currentDesc.title}
                          </span>
                          <span className="font-mono bg-indigo-950/65 border border-indigo-900/50 text-indigo-300 px-1.5 py-0.5 rounded text-[10px] font-bold">
                            Total: {currentDesc.count} words
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 leading-normal">
                          {currentDesc.words.map((w, idx) => (
                            <span key={idx} className="bg-slate-950 border border-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px] font-mono hover:border-slate-700 transition-all">
                              {w}
                            </span>
                          ))}
                          <span className="text-slate-500 font-mono text-[10px] self-center pl-1">...and {currentDesc.count - currentDesc.words.length} others</span>
                        </div>
                      </div>
                    </div>

                    <p className="font-sans text-[10px] text-slate-500 leading-tight">
                      * Hover over or click circles to inspect overlap details. The core overlap holds the high-frequency academic vocabulary used throughout the layout stability modeling pipeline.
                    </p>
                  </div>
                )}

                {/* Draw dynamic parameters and notes in section 7 */}
                {sec.id === 'methodology' && (
                  <div className="mt-4 p-4 bg-indigo-950/20 border border-indigo-500/20 shadow-sm rounded-lg space-y-2">
                    <h4 className="text-xs font-semibold text-indigo-200 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-indigo-405 text-indigo-400 animate-pulse" />
                      Academic Hypothesis H1
                    </h4>
                    <p className="font-sans text-xs text-slate-300 leading-normal">
                      &quot;The custom stable-lanes layout strategy reduces visual node drift to exactly 0px during expansion events, reducing task failure rates by over 45% compared to the global Dagre baseline.&quot;
                    </p>
                    <div className="bg-slate-950/50 p-2.5 rounded border border-slate-808/80 mt-2">
                      <p className="font-mono text-[10px] text-slate-450 font-semibold mb-1">STABILIZATION FORMULA:</p>
                      <p className="font-mono text-[11px] text-slate-200 font-semibold">
                        Drift = Max_i || Pos_Expanded(N_i) - Pos_Collapsed(N_i) ||_2
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
