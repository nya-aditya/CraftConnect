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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base font-serif">Smart Capability Match Results</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-stone-950">
                  {eligibleCount} Verified Fits
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                10-Point Deterministic Rules + Workshop Capacity Velocity Check
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subheader: Requirement snapshot */}
        <div className="px-6 py-3 bg-amber-50/70 border-b border-amber-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-950">
          <div>
            <span className="font-bold">Evaluating For: </span>
            <span>{requirement?.product_name}</span> • <span>{requirement?.quantity} units</span> • <span>Max ₹{requirement?.max_budget_per_unit}/unit</span> • <span>{requirement?.deadline_days} days deadline</span>
          </div>
          <div className="text-[11px] text-amber-800 font-medium">
            Destination: {requirement?.delivery_location || "Jaipur, Rajasthan"}
          </div>
        </div>

        {/* Body: Artisan Cards */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          <div className="space-y-5">
            {matches.map((item, idx) => {
              const isNotified = notifiedMap[item.artisan_id];
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border-2 p-5 transition ${
                    item.is_eligible
                      ? 'border-emerald-300 bg-white shadow-sm hover:shadow-md'
                      : 'border-stone-200 bg-stone-50/70 opacity-80'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    {/* Artisan and Product Info */}
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.product_image || item.artisan_avatar}
                        alt={item.product_name}
                        className="w-20 h-20 rounded-xl object-cover border border-stone-200 shadow-sm flex-shrink-0"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-base text-stone-900 font-serif">
                            {item.artisan_name}
                          </h3>
                          <span className="text-stone-400">•</span>
                          <span className="flex items-center gap-1 text-stone-600 text-xs">
                            <MapPin className="w-3.5 h-3.5 text-stone-400" /> {item.artisan_location}
                          </span>
                          {item.is_eligible ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              ✓ Eligible Candidate
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                              ✗ Constraint Violation
                            </span>
                          )}
                        </div>

                        <div className="text-xs font-semibold text-amber-800 mt-1">
                          Product: {item.product_name} ({item.material})
                        </div>

                        {/* Capability numbers strip */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-[11px] bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                          <div>
                            <span className="text-stone-500 block">Indicative Price:</span>
                            <span className="font-bold text-stone-900">₹{item.price} / unit</span>
                          </div>
                          <div>
                            <span className="text-stone-500 block">Available Now:</span>
                            <span className="font-bold text-emerald-700">{item.available_now} units</span>
                          </div>
                          <div>
                            <span className="text-stone-500 block">Monthly Capacity:</span>
                            <span className="font-bold text-amber-700">{item.monthly_capacity} units</span>
                          </div>
                          <div>
                            <span className="text-stone-500 block">MOQ:</span>
                            <span className="font-semibold text-stone-800">{item.moq} units</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Match Score & Action */}
                    <div className="flex flex-col items-end justify-between min-w-[170px] self-stretch">
                      <div className="text-right">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Match Score</div>
                        <div className={`text-2xl font-black ${item.is_eligible ? 'text-emerald-700' : 'text-stone-500'}`}>
                          {item.match_score}%
                        </div>
                      </div>

                      {item.is_eligible && (
                        <div className="w-full mt-3">
                          {isNotified ? (
                            <div className="w-full py-2 px-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-center font-bold text-xs flex items-center justify-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Artisan Alerted!</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleNotify(item.artisan_id)}
                              className="w-full py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Request Quotation</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* WHY THIS ARTISAN MATCHES (EXPLAINABILITY) */}
                  <div className="mt-4 pt-3 border-t border-stone-200">
                    <div className="text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>Why this artisan matches (Explainable Deterministic Fit):</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.explanations.map((exp, eIdx) => (
                        <div
                          key={eIdx}
                          className={`flex items-start gap-2 p-2 rounded-lg text-[11px] ${
                            exp.pass
                              ? 'bg-emerald-50/70 text-emerald-900 border border-emerald-100'
                              : 'bg-rose-50/70 text-rose-900 border border-rose-100'
                          }`}
                        >
                          {exp.pass ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
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
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <div className="text-xs text-stone-500">
            Clicking "Request Quotation" directly pushes the requirement to the artisan's dashboard.
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition"
          >
            Close & Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

