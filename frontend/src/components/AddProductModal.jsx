import React, { useState } from 'react';
import { X, Sparkles, Mic, MicOff, Check, Image as ImageIcon, HelpCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { api } from '../api';

const SAMPLE_PRESETS = [
  {
    label: "☕ Handmade Terracotta Cup",
    name: "Handmade terracotta cup",
    description: "Handmade terracotta cup. I can make 300 per month. Food safe natural clay.",
    material: "Terracotta",
    available_now: 50,
    monthly_capacity: 300,
    moq: 50,
    price: 120,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "🏺 Traditional Clay Pitcher",
    name: "Natural Clay Water Matka / Jug",
    description: "Handcrafted unglazed terracotta water jug with natural cooling properties.",
    material: "Terracotta Clay",
    available_now: 25,
    monthly_capacity: 150,
    moq: 20,
    price: 260,
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80"
  }
];

export default function AddProductModal({ artisan, onClose, onProductCreated }) {
  // Input stage
  const [productName, setProductName] = useState("Handmade terracotta cup");
  const [description, setDescription] = useState("Handmade terracotta cup. I can make 300 per month. Traditional Jaipur clay firing.");
  const [material, setMaterial] = useState("Terracotta");
  const [availableNow, setAvailableNow] = useState(50);
  const [monthlyCapacity, setMonthlyCapacity] = useState(300);
  const [moq, setMoq] = useState(50);
  const [price, setPrice] = useState(120);
  const [leadTime, setLeadTime] = useState(15);
  const [image, setImage] = useState("https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80");

  // Speech simulation state
  const [isRecording, setIsRecording] = useState(false);
  const [speechLang, setSpeechLang] = useState('hi-IN'); // 'hi-IN' or 'en-IN'

  // AI Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiCatalog, setAiCatalog] = useState(null);
  const [isEditingAi, setIsEditingAi] = useState(false);
  const [missingAnswered, setMissingAnswered] = useState(false);

  // Editable AI Fields
  const [editedName, setEditedName] = useState("");
  const [editedDesc, setEditedDesc] = useState("");
  const [editedMaterial, setEditedMaterial] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [editedCustomization, setEditedCustomization] = useState("");
  const [editedTags, setEditedTags] = useState("");
  const [customizationAvailable, setCustomizationAvailable] = useState(true);

  // Toggle Voice Input
  const handleToggleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      // Fallback: simulate voice capture
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        const spoken = speechLang === 'hi-IN' 
          ? "हाथ से बना टेराकोटा कप, जयपुर की मिट्टी से तैयार। हम हर महीने 300 पीस बना सकते हैं।" 
          : "Handmade terracotta cup for cafes and restaurants. Can produce 300 units per month.";
        setDescription(prev => prev ? `${prev} ${spoken}` : spoken);
      }, 1500);
      return;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = speechLang;
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onerror = () => setIsRecording(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setDescription(prev => prev ? `${prev} ${transcript}` : transcript);
      };
      recognition.start();
    } catch (e) {
      setIsRecording(false);
    }
  };

  // Preset loader
  const applyPreset = (preset) => {
    setProductName(preset.name);
    setDescription(preset.description);
    setMaterial(preset.material);
    setAvailableNow(preset.available_now);
    setMonthlyCapacity(preset.monthly_capacity);
    setMoq(preset.moq);
    setPrice(preset.price);
    setImage(preset.image);
    setAiCatalog(null);
  };

  // Call AI Catalog Generation API
  const handleGenerateAiCatalog = async () => {
    setIsGenerating(true);
    try {
      const res = await api.generateCatalog({
        product_name: productName,
        description: description,
        material: material,
        price: Number(price),
        monthly_capacity: Number(monthlyCapacity),
        available_now: Number(availableNow),
        moq: Number(moq),
        lead_time_days: Number(leadTime),
        image: image
      });

      if (res.success && res.data) {
        setAiCatalog(res.data);
        setEditedName(res.data.product_name);
        setEditedDesc(res.data.description);
        setEditedMaterial(res.data.material);
        setEditedCategory(res.data.category || "Tableware & Beverage");
        setEditedCustomization(res.data.customization_info || "Logo embossing & custom glaze available");
        setEditedTags((res.data.tags || []).join(", "));
        setCustomizationAvailable(true);
      }
    } catch (err) {
      console.error("AI Catalog Generation failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Missing Info Answer
  const handleAnswerMissingPrompt = (answer) => {
    setEditedCustomization(answer);
    setCustomizationAvailable(!answer.toLowerCase().includes('केवल मानक') && !answer.toLowerCase().includes('standard only'));
    setMissingAnswered(true);
  };

  // Confirm and Publish
  const handleConfirmAndPublish = async () => {
    const finalProduct = {
      artisan_id: artisan?.id || "artisan_1",
      name: editedName || productName,
      category: editedCategory || "Tableware & Beverage",
      material: editedMaterial || material,
      description: editedDesc || description,
      image: image,
      specifications: aiCatalog?.specifications || {
        "Capacity": "220 ml",
        "Firing": "High-temperature wood-kiln (900°C)",
        "Food Safety": "100% Lead-Free & Organic",
        "Microwave Safe": "Yes"
      },
      tags: editedTags ? editedTags.split(",").map(t => t.trim()) : ["terracotta", "handmade", "pottery", "b2b"],
      available_now: Number(availableNow),
      monthly_capacity: Number(monthlyCapacity),
      moq: Number(moq),
      price: Number(price),
      customization_available: customizationAvailable,
      customization_details: editedCustomization,
      lead_time_days: Number(leadTime),
      location: artisan?.location || "Jaipur, Rajasthan"
    };

    try {
      const res = await api.addProduct(finalProduct);
      if (res.success) {
        onProductCreated(res.data);
        onClose();
      }
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-bold text-base font-serif">Add Product & Generate AI B2B Catalog</h2>
              <p className="text-[11px] text-stone-400">Speech-to-Catalog with Multilingual AI Assistance</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Preset Buttons */}
          <div className="bg-amber-50/70 border border-amber-200 p-3 rounded-xl flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-semibold text-amber-900">
              ⚡ Quick 1-Click Demo Fill:
            </span>
            <div className="flex gap-2">
              {SAMPLE_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => applyPreset(p)}
                  className="px-2.5 py-1 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg font-medium transition text-[11px]"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 1: Artisan Simple Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Product Draft Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Handmade terracotta cup"
                className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Primary Craft Material</label>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="e.g. Terracotta / Red Clay"
                className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Voice & Description */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-stone-700">Artisan Product Description or Voice Note</label>
              <div className="flex items-center gap-2">
                <select
                  value={speechLang}
                  onChange={(e) => setSpeechLang(e.target.value)}
                  className="text-[11px] border border-stone-200 rounded px-1.5 py-0.5 bg-stone-50 text-stone-600"
                >
                  <option value="hi-IN">Hindi (हिंदी)</option>
                  <option value="en-IN">English</option>
                </select>
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className={`px-2 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition ${
                    isRecording
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {isRecording ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3 text-amber-600" />}
                  <span>{isRecording ? 'Listening...' : 'Speak (Voice Input)'}</span>
                </button>
              </div>
            </div>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Speak or type what you make, e.g. Handmade terracotta cup. I can make 300 per month."
              className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Image & Key Capability Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-xl border border-stone-200">
            <div>
              <label className="text-[11px] font-semibold text-stone-600 block mb-1">Available Now</label>
              <input
                type="number"
                value={availableNow}
                onChange={(e) => setAvailableNow(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-stone-300 rounded-lg text-xs"
              />
              <span className="text-[10px] text-stone-500">Ready in stock</span>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 block mb-1">Monthly Capacity</label>
              <input
                type="number"
                value={monthlyCapacity}
                onChange={(e) => setMonthlyCapacity(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-stone-300 rounded-lg text-xs font-bold text-amber-800"
              />
              <span className="text-[10px] text-stone-500">Units / month</span>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 block mb-1">Min Order (MOQ)</label>
              <input
                type="number"
                value={moq}
                onChange={(e) => setMoq(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-stone-300 rounded-lg text-xs"
              />
              <span className="text-[10px] text-stone-500">Minimum units</span>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 block mb-1">Indicative Price</label>
              <div className="relative">
                <span className="absolute left-2 top-1.5 text-stone-400">₹</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-5 pr-2 py-1.5 border border-stone-300 rounded-lg text-xs font-bold text-stone-900"
                />
              </div>
              <span className="text-[10px] text-stone-500">Per unit (INR)</span>
            </div>
          </div>

          {/* AI Trigger Button */}
          <div className="text-center pt-2">
            <button
              onClick={handleGenerateAiCatalog}
              disabled={isGenerating}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-terracotta-600 hover:from-amber-700 hover:to-terracotta-700 text-white font-bold shadow-md flex items-center justify-center gap-2 mx-auto transition"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI Generating B2B Catalog...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Generate AI Catalog & B2B Specs</span>
                </>
              )}
            </button>
          </div>

          {/* SECTION 2: AI CATALOG RESULT & EDITABLE SPECIFICATIONS */}
          {aiCatalog && (
            <div className="border-2 border-amber-400 bg-amber-50/30 rounded-2xl p-5 space-y-4 animate-fadeIn">
              {/* Badge & Mode Switcher */}
              <div className="flex items-center justify-between pb-3 border-b border-amber-200">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-500 text-stone-950 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> AI Generated Catalog
                  </span>
                  <span className="text-[10px] text-stone-500">
                    Engine: {aiCatalog.ai_provider || "Gemini Flash"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingAi(!isEditingAi)}
                  className="text-amber-800 font-semibold text-xs hover:underline flex items-center gap-1"
                >
                  {isEditingAi ? "Done Editing" : "✎ Edit AI Output"}
                </button>
              </div>

              {/* Multilingual Missing Info Question Concept (SIH) */}
              {!missingAnswered && aiCatalog.missing_info_prompt && (
                <div className="bg-white border-2 border-blue-400 rounded-xl p-4 shadow-sm">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 font-bold">
                      ?
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] uppercase font-bold text-blue-800 tracking-wider">
                        AI Follow-up Question (Missing Information)
                      </div>
                      <p className="text-xs font-bold text-stone-900 mt-1">
                        "{aiCatalog.missing_info_prompt.question_hi}"
                      </p>
                      <p className="text-[11px] text-stone-500 italic mt-0.5">
                        "{aiCatalog.missing_info_prompt.question_en}"
                      </p>

                      {/* Quick Answer Options */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {aiCatalog.missing_info_prompt.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleAnswerMissingPrompt(opt)}
                            className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-medium transition text-left"
                          >
                            + {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Editable Fields Grid */}
              <div className="space-y-3 bg-white p-4 rounded-xl border border-amber-200">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Commercial B2B Product Title</label>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-lg text-xs font-bold text-stone-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Professional B2B Pitch</label>
                  <textarea
                    rows={3}
                    value={editedDesc}
                    onChange={(e) => setEditedDesc(e.target.value)}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-lg text-xs leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Material Standard</label>
                    <input
                      type="text"
                      value={editedMaterial}
                      onChange={(e) => setEditedMaterial(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">B2B Category</label>
                    <input
                      type="text"
                      value={editedCategory}
                      onChange={(e) => setEditedCategory(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                {/* Customization Details */}
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Customization Capabilities for Bulk Buyers</label>
                  <input
                    type="text"
                    value={editedCustomization}
                    onChange={(e) => setEditedCustomization(e.target.value)}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-lg text-xs font-medium text-emerald-900 bg-emerald-50/50"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">B2B Search Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={editedTags}
                    onChange={(e) => setEditedTags(e.target.value)}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-lg text-xs"
                  />
                </div>

                {/* Generated Technical Specs Display */}
                {aiCatalog.specifications && (
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Generated Technical Specs</label>
                    <div className="grid grid-cols-2 gap-2 bg-stone-50 p-3 rounded-lg border border-stone-200">
                      {Object.entries(aiCatalog.specifications).map(([k, v], idx) => (
                        <div key={idx} className="text-[11px]">
                          <span className="text-stone-500 font-medium">{k}: </span>
                          <span className="text-stone-800 font-semibold">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 font-medium text-xs transition"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmAndPublish}
            disabled={!productName}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            <span>Confirm & Publish to Capability Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

