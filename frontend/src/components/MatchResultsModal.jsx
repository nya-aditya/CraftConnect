import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, XCircle, ShieldCheck, MapPin, Send, AlertTriangle, ArrowRight } from 'lucide-react';

export default function MatchResultsModal({ requirement, matches, onClose, onNotifyArtisan }) {
  const [notifiedMap, setNotifiedMap] = useState({});

  const eligibleCount = matches.filter(m => m.is_eligible).length;

  const handleNotify = (artisanId) => {
    setNotifiedMap(prev => ({ ...prev, [artisanId]: true }));
    onNotifyArtisan(artisanId, requirement);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-stone-200/90 shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-stone-200/80 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base font-serif text-stone-900">Capability Match Results</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                {eligibleCount} Matching Artisans
              </span>
            </div>
            <p className="text-[11px] text-stone-500">
              Evaluated against MOQ, capacity velocity, budget, and customization
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subheader: Requirement snapshot */}
        <div className="px-6 py-2.5 bg-[#faf9f6] border-b border-stone-200/70 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-700">
          <div>
            <span className="font-semibold text-stone-900">{requirement?.product_name}</span> • <span>{requirement?.quantity} units</span> • <span>Max ₹{requirement?.max_budget_per_unit}/unit</span> • <span>{requirement?.deadline_days} days</span>
          </div>
          <div className="text-[11px] text-stone-500">
            Delivery: {requirement?.delivery_location || "Jaipur, Rajasthan"}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          {matches.map((item, idx) => {
            const isNotified = notifiedMap[item.artisan_id];
            return (
              <div
                key={idx}
                className={`rounded-2xl border p-4.5 transition ${
                  item.is_eligible
                    ? 'border-stone-200 bg-white shadow-subtle hover:border-stone-300'
                    : 'border-stone-200/70 bg-stone-50/50 opacity-75'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Artisan and Product Info */}
                  <div className="flex items-start space-x-3.5">
                    <img
                      src={item.product_image || item.artisan_avatar}
                      alt={item.product_name}
                      className="w-16 h-16 rounded-xl object-cover border border-stone-200 shadow-sm flex-shrink-0"
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-sm text-stone-900 font-serif">
                          {item.artisan_name}
                        </h3>
                        <span className="text-stone-300">•</span>
                        <span className="text-stone-500 text-xs">
                          {item.artisan_location}
                        </span>
                        {item.is_eligible ? (
                          <span className="px-2 py-0.2 rounded text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Eligible
                          </span>
                        ) : (
                          <span className="px-2 py-0.2 rounded text-[10px] font-medium bg-stone-100 text-stone-600 border border-stone-200">
                            Constraint Mismatch
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-stone-700 mt-1 font-medium">
                        {item.product_name} ({item.material})
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2.5 text-[11px] bg-[#faf9f6] p-2 rounded-lg border border-stone-200/60">
                        <div>
                          <span className="text-stone-400 block text-[10px]">Indicative Price</span>
                          <span className="font-bold text-stone-900">₹{item.price} / unit</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[10px]">Available Now</span>
                          <span className="font-semibold text-stone-900">{item.available_now} units</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[10px]">Monthly Capacity</span>
                          <span className="font-semibold text-stone-900">{item.monthly_capacity} units</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[10px]">MOQ</span>
                          <span className="font-medium text-stone-700">{item.moq} units</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Match Score & Action */}
                  <div className="flex flex-col items-end justify-between min-w-[150px] self-stretch">
                    <div className="text-right">
                      <div className="text-[10px] font-medium uppercase tracking-wider text-stone-400">Match Fit</div>
                      <div className={`text-xl font-bold ${item.is_eligible ? 'text-stone-900' : 'text-stone-400'}`}>
                        {item.match_score}%
                      </div>
                    </div>

                    {item.is_eligible && (
                      <div className="w-full mt-3">
                        {isNotified ? (
                          <div className="w-full py-2 px-3 rounded-xl bg-stone-50 text-stone-700 border border-stone-200 text-center font-medium text-xs flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Quotation Requested</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleNotify(item.artisan_id)}
                            className="w-full py-2 px-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
                          >
                            <Send className="w-3 h-3" />
                            <span>Request Quotation</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Explainability checklist */}
                <div className="mt-3.5 pt-3 border-t border-stone-100">
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2">
                    Deterministic Fit Breakdown:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {item.explanations.map((exp, eIdx) => (
                      <div
                        key={eIdx}
                        className={`flex items-start gap-1.5 p-2 rounded-lg text-[11px] ${
                          exp.pass
                            ? 'bg-stone-50 text-stone-700'
                            : 'bg-stone-100/60 text-stone-500'
                        }`}
                      >
                        {exp.pass ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-stone-400 flex-shrink-0 mt-0.5" />
                        )}
                        <span>{exp.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50/80 border-t border-stone-200/80 flex items-center justify-between">
          <div className="text-xs text-stone-500">
            Requesting a quotation sends an instant notification to the artisan's portal.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 text-white font-medium text-xs hover:bg-stone-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
