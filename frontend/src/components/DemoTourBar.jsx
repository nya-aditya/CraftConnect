import React from 'react';
import { Sparkles, RotateCcw, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function DemoTourBar({ currentStep, onSelectStep, onReset, isResetting }) {
  const steps = [
    { id: 1, label: "1. Artisan", title: "Meera Handicrafts Dashboard" },
    { id: 2, label: "2. AI Catalog", title: "Speech & Multilingual AI Cataloging" },
    { id: 3, label: "3. Capabilities", title: "Stock vs Monthly Production Capacity" },
    { id: 4, label: "4. Buyer RFQ", title: "Rajasthan Cafe Group Procurement Prompt" },
    { id: 5, label: "5. Smart Match", title: "10-Point Deterministic Capability Fit" },
    { id: 6, label: "6. Quotation", title: "Direct Seller Notification & Bid Submission" },
    { id: 7, label: "7. Confirmed", title: "Accepted Contract & Milestone Plan" },
  ];

  return (
    <div className="bg-stone-900 text-stone-300 border-b border-stone-800 text-xs py-2 px-4 shadow-sm select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Title */}
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-stone-800 border border-stone-700 text-amber-400">
            <Sparkles className="w-3 h-3" />
          </span>
          <span className="font-semibold text-stone-100 tracking-tight">Interactive Walkthrough:</span>
          <span className="text-stone-400 hidden sm:inline">2-Minute Core Flow</span>
        </div>

        {/* Step buttons */}
        <div className="flex items-center space-x-1 overflow-x-auto py-0.5 scrollbar-none">
          {steps.map((s) => {
            const isActive = currentStep === s.id;
            const isCompleted = currentStep > s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectStep(s.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-amber-600 text-white font-semibold shadow-sm'
                    : isCompleted
                    ? 'text-stone-300 hover:text-white hover:bg-stone-800'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                }`}
                title={s.title}
              >
                <span>{s.label}</span>
                {isCompleted && <span className="text-emerald-400 text-[10px]">✓</span>}
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {currentStep < 7 ? (
            <button
              onClick={() => onSelectStep(currentStep + 1)}
              className="bg-stone-800 hover:bg-stone-700 text-stone-100 border border-stone-700 text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1 transition shadow-sm"
            >
              <span>Next</span>
              <ChevronRight className="w-3 h-3 text-stone-400" />
            </button>
          ) : (
            <span className="text-emerald-400 font-medium text-[11px] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Complete
            </span>
          )}

          <div className="h-4 w-px bg-stone-800 mx-1" />

          <button
            onClick={onReset}
            disabled={isResetting}
            className="text-stone-400 hover:text-stone-200 hover:bg-stone-800 px-2 py-1 rounded-md transition flex items-center gap-1 text-[11px]"
            title="Reset to fresh demo data"
          >
            <RotateCcw className={`w-3 h-3 ${isResetting ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Reset Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}
