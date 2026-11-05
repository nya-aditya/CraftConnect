import React from 'react';
import { Sparkles, RotateCcw, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function DemoTourBar({ currentStep, onSelectStep, onReset, isResetting }) {
  const steps = [
    { id: 1, label: "1. Artisan Dashboard", description: "Meera Handicrafts" },
    { id: 2, label: "2. AI Catalog Gen", description: "Speech & Multilingual AI" },
    { id: 3, label: "3. Capability Profile", description: "Stock vs Monthly Capacity" },
    { id: 4, label: "4. Buyer Requirement", description: "Rajasthan Cafe Group" },
    { id: 5, label: "5. Smart Matching", description: "Explainable 10-Point Fit" },
    { id: 6, label: "6. Artisan Quotation", description: "Demand Push & Bid" },
    { id: 7, label: "7. Order Confirmed", description: "Milestone B2B Contract" },
  ];

  return (
    <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white border-b border-amber-900/40 text-xs py-2 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Title */}
        <div className="flex items-center space-x-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="font-bold tracking-wide uppercase text-amber-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Hackathon Demo Tour:
          </span>
          <span className="text-stone-300 hidden md:inline">2-Minute Capability Linkage Flow</span>
        </div>

        {/* Step buttons */}
        <div className="flex items-center space-x-1 overflow-x-auto py-1 scrollbar-none">
          {steps.map((s) => {
            const isActive = currentStep === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectStep(s.id)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all whitespace-nowrap flex items-center space-x-1 ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-sm font-semibold'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
                }`}
                title={s.description}
              >
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {currentStep < 7 ? (
            <button
              onClick={() => onSelectStep(currentStep + 1)}
              className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-2.5 py-1 rounded flex items-center gap-1 transition"
            >
              <span>Next</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          ) : (
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Flow Complete
            </span>
          )}

          <button
            onClick={onReset}
            disabled={isResetting}
            className="text-stone-400 hover:text-stone-200 hover:bg-stone-800 px-2 py-1 rounded transition flex items-center gap-1"
            title="Reset to fresh demo data"
          >
            <RotateCcw className={`w-3 h-3 ${isResetting ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}

