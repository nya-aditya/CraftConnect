import React, { useState } from 'react';
import { X, Sparkles, RefreshCw, ArrowRight, CheckCircle2, Building2 } from 'lucide-react';
import { api } from '../api';

const SAMPLE_BUYER_PROMPTS = [
  {
    label: "☕ Terracotta Cafe Cups (Standard Demo)",
    text: "I need 200 customized terracotta cups under ₹150 each within 20 days."
  },
  {
    label: "🌿 Hospitality Planter Pots",
    text: "Looking for 100 porous terracotta garden planter pots under ₹200 within 15 days."
  }
];

export default function CreateRequirementModal({ buyer, onClose, onRequirementCreated, onRunMatchImmediately }) {
  const [prompt, setPrompt] = useState("I need 200 customized terracotta cups under ₹150 each within 20 days.");
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState(null);

  // Editable extracted fields
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Tableware & Beverage");
  const [material, setMaterial] = useState("Terracotta Clay");
  const [quantity, setQuantity] = useState(200);
  const [budget, setBudget] = useState(150);
  const [deadline, setDeadline] = useState(20);
  const [customizationNeeded, setCustomizationNeeded] = useState(true);
  const [customizationSpec, setCustomizationSpec] = useState("Laser or stamped logo of Rajasthan Cafe Group");
  const [location, setLocation] = useState("Jaipur, Rajasthan");

  const [isPosting, setIsPosting] = useState(false);

  // Trigger AI understanding
  const handleUnderstandRequirement = async () => {
    if (!prompt.trim()) return;
    setIsExtracting(true);
    try {
      const res = await api.understandRequirement(prompt);
      if (res.success && res.data) {
        const d = res.data;
        setExtractedData(d);
        setProductName(d.product_name || "Terracotta Cups");
        setCategory(d.category || "Tableware & Beverage");
        setMaterial(d.material || "Terracotta Clay");
        setQuantity(d.quantity || 200);
        setBudget(d.max_budget_per_unit || 150);
        setDeadline(d.deadline_days || 20);
        setCustomizationNeeded(Boolean(d.customization_needed));
        setCustomizationSpec(d.customization_spec || "Embossed logo on base");
        setLocation(d.delivery_location || "Jaipur, Rajasthan");
      }
    } catch (err) {
      console.error("AI understanding failed:", err);
    } finally {
      setIsExtracting(false);
    }
  };

  // Submit and match
  const handleSaveAndMatch = async () => {
    setIsPosting(true);
    try {
      const payload = {
        buyer_id: buyer?.id || "buyer_1",
        buyer_name: buyer?.company_name || "Rajasthan Cafe Group",
        raw_prompt: prompt,
        product_name: productName || "Terracotta Cups",
        category: category,
        material: material,
        quantity: Number(quantity),
        max_budget_per_unit: Number(budget),
        customization_needed: customizationNeeded,
        customization_spec: customizationSpec,
        deadline_days: Number(deadline),
        delivery_location: location
      };

      const res = await api.createRequirement(payload);
      if (res.success && res.data) {
        onRequirementCreated(res.data);
        onRunMatchImmediately(res.data);
        onClose();
      }
    } catch (err) {
      console.error("Failed to post requirement:", err);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-bold text-base font-serif">Post Enterprise Requirement (AI Assisted)</h2>
              <p className="text-[11px] text-stone-400">Natural Language B2B Procurement Request</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-stone-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Preset Prompts */}
          <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-semibold text-stone-700">
              ⚡ Demo Natural Language Prompts:
            </span>
            <div className="flex gap-2">
              {SAMPLE_BUYER_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(p.text);
                    setExtractedData(null);
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-lg font-medium transition text-[11px]"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Natural prompt input */}
          <div>
            <label className="font-semibold text-stone-800 block mb-1">
              Enter requirement in your own words:
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. I need 200 customized terracotta cups under ₹150 each within 20 days."
              className="w-full px-3 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-slate-800 focus:outline-none text-xs leading-relaxed"
            />
          </div>

          {/* AI Understand Trigger */}
          <div className="text-center">
            <button
              onClick={handleUnderstandRequirement}
              disabled={isExtracting || !prompt.trim()}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 mx-auto transition disabled:opacity-50"
            >
              {isExtracting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                  <span>AI Parsing Procurement Constraints...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Understand Requirement (AI)</span>
                </>
              )}
            </button>
          </div>

          {/* Structured Extracted Cards */}
          {extractedData && (
            <div className="border-2 border-slate-300 bg-slate-50/50 rounded-2xl p-5 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-900 text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Structured Procurement Specifications (Editable)
                </span>
                <span className="text-[10px] text-stone-500">
                  Ready for Capability Matching
                </span>
              </div>

              {/* 2x2 Grid of structured cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Product</span>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full mt-1 font-bold text-stone-900 border-b border-stone-300 pb-0.5 text-xs focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Quantity</span>
                  <div className="flex items-center gap-1 mt-1">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full font-bold text-amber-700 border-b border-stone-300 pb-0.5 text-xs focus:outline-none focus:border-amber-600"
                    />
                    <span className="text-stone-400 text-[10px]">units</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Max Budget</span>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-stone-500">₹</span>
                    <input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full font-bold text-stone-900 border-b border-stone-300 pb-0.5 text-xs focus:outline-none focus:border-amber-600"
                    />
                    <span className="text-stone-400 text-[10px]">/unit</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Deadline</span>
                  <div className="flex items-center gap-1 mt-1">
                    <input
                      type="number"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full font-bold text-stone-900 border-b border-stone-300 pb-0.5 text-xs focus:outline-none focus:border-amber-600"
                    />
                    <span className="text-stone-400 text-[10px]">days</span>
                  </div>
                </div>
              </div>

              {/* Extra details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4 rounded-xl border border-stone-200">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Customization Requirement</label>
                  <input
                    type="text"
                    value={customizationSpec}
                    onChange={(e) => setCustomizationSpec(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-stone-300 rounded-lg text-xs"
                    placeholder="e.g. Logo printing or stamping"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Delivery Destination</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 font-medium text-xs transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSaveAndMatch}
            disabled={isPosting}
            className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition disabled:opacity-50"
          >
            <span>Post Requirement & Find Matching Artisans</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

