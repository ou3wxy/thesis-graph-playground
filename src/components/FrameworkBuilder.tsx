import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowRight, Share2, HelpCircle, Save, Info, GitFork, Book } from 'lucide-react';

interface CustomNode {
  id: string;
  label: string;
  chapter: string;
  weight: number;
  parents: string[];
  description: string;
}

export default function FrameworkBuilder() {
  const [nodes, setNodes] = useState<CustomNode[]>(() => {
    const saved = localStorage.getItem('thesis_custom_nodes');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 'lit-review', label: 'L1: Socioeconomic Saturation Lit', chapter: 'Chapter 2', weight: 4, parents: [], description: 'Foundational theory on educational socioeconomic impact parameters.' },
      { id: 'h1', label: 'H1: Direct Income Impact', chapter: 'Chapter 3', weight: 8, parents: ['lit-review'], description: 'Hypothesis stating family income directly affects early literacy scores.' },
      { id: 'h2', label: 'H2: Parental Involvement Mediation', chapter: 'Chapter 3', weight: 7, parents: ['lit-review'], description: 'Hypothesis stating parental reading hours mediates income effects.' },
      { id: 'sample-recruit', label: 'M1: Cohort Sampling', chapter: 'Chapter 3', weight: 5, parents: [], description: 'Recruiting N=150 parents via regional community centers.' },
      { id: 'regression', label: 'A1: Mediation Path Analysis', chapter: 'Chapter 4', weight: 9, parents: ['h1', 'h2', 'sample-recruit'], description: 'Structural equation modeling to isolate direct/indirect mediation beta-weights.' }
    ];
  });

  const [label, setLabel] = useState('');
  const [chapter, setChapter] = useState('Chapter 3');
  const [weight, setWeight] = useState(5);
  const [description, setDescription] = useState('');
  const [selectedParents, setSelectedParents] = useState<string[]>([]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Persistence handler
  useEffect(() => {
    localStorage.setItem('thesis_custom_nodes', JSON.stringify(nodes));
  }, [nodes]);

  const handleAddNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;

    const id = 'n-' + Math.random().toString(36).substr(2, 9);
    const newNode: CustomNode = {
      id,
      label: label.trim(),
      chapter,
      weight,
      parents: selectedParents,
      description: description.trim() || 'No description provided.'
    };

    setNodes(prev => [...prev, newNode]);
    setLabel('');
    setDescription('');
    setSelectedParents([]);
    setWeight(5);
  };

  const handleDeleteNode = (id: string) => {
    setNodes(prev => {
      // Filter out the node
      const filtered = prev.filter(n => n.id !== id);
      // Clean up parent dependencies on deleted node
      return filtered.map(n => ({
        ...n,
        parents: n.parents.filter(pId => pId !== id)
      }));
    });
  };

  const toggleParentSelection = (pId: string) => {
    setSelectedParents(prev => 
      prev.includes(pId) ? prev.filter(id => id !== pId) : [...prev, pId]
    );
  };

  // Compute stats
  const totalWeight = nodes.reduce((sum, n) => sum + n.weight, 0);
  const integrityScore = Math.min(100, Math.round((nodes.length * 15) + (totalWeight * 0.8)));

  const handleResetDefault = () => {
    localStorage.removeItem('thesis_custom_nodes');
    window.location.reload();
  };

  return (
    <div className="bg-slate-900/40 border border-slate-808/80 rounded-xl shadow-md p-6 flex flex-col md:flex-row h-wrap gap-6" id="framework-builder-workspace">
      
      {/* Col 1: Creator Form */}
      <div className="w-full md:w-5/12 space-y-4">
        <div>
          <h3 className="font-sans font-bold text-slate-100 text-sm flex items-center gap-1 container-sub-hd">
            <Plus className="w-4 h-4 text-indigo-400" />
            Append Thesis Construct
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Add hypotheses, control metrics, or analysis nodes to your thesis DAG map.
          </p>
        </div>

        <form onSubmit={handleAddNode} className="space-y-3 bg-slate-950/40 border border-slate-808/80 p-4 rounded-lg shadow-inner">
          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase font-semibold mb-1">NODE TITLE</label>
            <input
              type="text"
              required
              placeholder="e.g. H3: Parental Reading Mediation"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full text-xs font-sans text-slate-200 bg-slate-900 border border-slate-800 rounded p-2 focus:outline-none focus:ring-1 focus:ring-indigo-550 focus:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono text-slate-500 uppercase font-semibold mb-1">CHAPTER LOCATION</label>
              <select
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                className="w-full text-xs font-sans text-slate-200 bg-slate-900 border border-slate-800 rounded p-2 focus:ring-1 focus:ring-indigo-550 focus:text-white"
              >
                <option value="Chapter 1" className="bg-slate-950 text-slate-250">Chapter 1: Intro</option>
                <option value="Chapter 2" className="bg-slate-950 text-slate-250">Chapter 2: Lit Review</option>
                <option value="Chapter 3" className="bg-slate-950 text-slate-250">Chapter 3: Methodology</option>
                <option value="Chapter 4" className="bg-slate-950 text-slate-250">Chapter 4: Results</option>
                <option value="Chapter 5" className="bg-slate-950 text-slate-250">Chapter 5: Discussion</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-mono text-slate-500 uppercase font-semibold mb-1">THEORETICAL IMPACT权重 ({weight})</label>
              <input
                type="range"
                min="1"
                max="10"
                value={weight}
                onChange={(e) => setWeight(parseInt(e.target.value))}
                className="w-full accent-indigo-605 accent-indigo-600 mt-2 cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase font-semibold mb-1">UPSTREAM DEPENDENCIES (PARENTS)</label>
            <div className="max-h-24 overflow-y-auto border border-slate-808/80 rounded bg-slate-900 p-2 text-xs space-y-1">
              {nodes.length === 0 ? (
                <span className="text-slate-500 italic text-[11px]">No existing nodes to list.</span>
              ) : (
                nodes.map((n) => (
                  <label key={n.id} className="flex items-center space-x-2 cursor-pointer p-0.5 hover:bg-slate-800/40 rounded transition-colors select-none">
                    <input
                      type="checkbox"
                      checked={selectedParents.includes(n.id)}
                      onChange={() => toggleParentSelection(n.id)}
                      className="rounded text-indigo-600 focus:ring-indigo-500 border-slate-700 bg-slate-950 cursor-pointer w-3 h-3"
                    />
                    <span className="text-[11px] font-medium text-slate-300 truncate">{n.label}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase font-semibold mb-1">CONCEPT BRIEF / DESCRIPTION</label>
            <textarea
              placeholder="Hypothesize relationship parameters here..."
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs font-sans text-slate-200 bg-slate-900 border border-slate-800 rounded p-2 focus:outline-none focus:ring-1 focus:ring-indigo-550 focus:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 rounded shadow-md shadow-indigo-650/15 flex items-center justify-center space-x-1 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Integrate Node</span>
          </button>
        </form>

        {/* Informative help card */}
        <div className="bg-slate-950/20 border border-slate-808/80 p-3 rounded-lg text-xs leading-normal space-y-1 text-slate-400 font-sans">
          <div className="flex items-center gap-1 font-semibold text-slate-300 text-[11px]">
            <Info className="w-3.5 h-3.5 text-indigo-400" />
            <span>Theoretical Framework Integrity</span>
          </div>
          <p className="text-[11.5px] leading-relaxed text-slate-400">
            An academic framework DAG must connect literature constructs to results to maintain conceptual soundness. Multiple orphaned nodes degrade model consistency.
          </p>
        </div>
      </div>

      {/* Col 2: Interactive List + Evaluator */}
      <div className="flex-1 flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-sans font-bold text-slate-100 text-sm flex items-center gap-1 container-sub-hd">
              <GitFork className="w-4 h-4 text-indigo-400" />
              Active Construct Map ({nodes.length} Nodes)
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Review relations and academic weight multipliers. Saved locally.
            </p>
          </div>
          <button
            onClick={handleResetDefault}
            className="border border-rose-950 text-rose-400 bg-rose-950/10 hover:bg-rose-950/25 px-2.5 py-1 rounded font-semibold text-[10.5px] cursor-pointer transition-all"
          >
            Reset Defaults
          </button>
        </div>

        {/* Metric panels */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-950 border border-slate-808/80 p-3 rounded-lg shadow-inner">
            <span className="block text-[9px] font-mono text-slate-500 font-bold uppercase">STRUCTURAL INTEGRITY</span>
            <span className="text-base font-mono font-black text-emerald-450 text-emerald-400">{integrityScore}%</span>
          </div>
          <div className="bg-slate-950 border border-slate-808/80 p-3 rounded-lg shadow-inner">
            <span className="block text-[9px] font-mono text-slate-500 font-bold uppercase">CUMULATIVE WEIGHT</span>
            <span className="text-base font-mono font-black text-indigo-400">{totalWeight} pts</span>
          </div>
          <div className="bg-slate-950 border border-slate-808/80 p-3 rounded-lg shadow-inner">
            <span className="block text-[9px] font-mono text-slate-500 font-bold uppercase">CONSTRUCT COHESION</span>
            <span className="text-base font-mono font-black text-purple-405 text-purple-400">
              {nodes.length > 0 ? (nodes.filter(n => n.parents.length > 0).length / nodes.length * 100).toFixed(0) : 0}%
            </span>
          </div>
        </div>

        {/* Draggable/Scalable Nodes listing */}
        <div className="flex-1 border border-slate-808/80 rounded-lg overflow-y-auto max-h-[380px] bg-slate-950/40 p-4 space-y-3">
          {nodes.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Book className="w-10 h-10 mx-auto opacity-30 stroke-1 mb-2" />
              <p className="font-sans text-xs">No research constructs added yet.</p>
              <p className="text-[10px] mt-1">Use the form on the left to begin modeling.</p>
            </div>
          ) : (
            nodes.map((node) => (
              <div
                key={node.id}
                className="bg-slate-900/60 border border-slate-808/80 rounded-lg p-3 hover:border-slate-700 hover:shadow-md transition duration-150 flex flex-col justify-between relative group"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1 pr-6">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-200 font-sans tracking-tight">
                        {node.label}
                      </span>
                      <span className="text-[10px] font-mono bg-indigo-950/50 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-900/50">
                        {node.chapter}
                      </span>
                      <span className="text-[10px] font-mono bg-amber-950/50 text-amber-300 px-1.5 py-0.5 rounded border border-amber-900/50">
                        Weight: {node.weight}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans leading-normal">
                      {node.description}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleDeleteNode(node.id)}
                    className="text-slate-400 hover:text-red-400 hover:bg-red-950/30 rounded p-1.5 transition-all shrink-0 select-none absolute right-2 top-2 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Draw dependencies footer */}
                {node.parents.length > 0 && (
                  <div className="border-t border-slate-808/80 flex items-center space-x-1.5 flex-wrap gap-y-1 mt-2.5 pt-2">
                    <span className="text-[9px] font-mono font-semibold text-slate-500 uppercase">Depends on:</span>
                    {node.parents.map(pId => {
                      const parent = nodes.find(n => n.id === pId);
                      return (
                        <span key={pId} className="bg-slate-900 text-slate-300 border border-slate-800 rounded px-1.5 py-0.5 text-[9px] font-mono truncate max-w-[140px]">
                          {parent ? parent.label.split(':')[0] : 'Undefined'}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
