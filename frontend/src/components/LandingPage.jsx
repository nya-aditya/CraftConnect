import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap, Factory, ShoppingBag, Users, Layers, MessageSquareText } from 'lucide-react';

export default function LandingPage({ onSelectRole, onStartDemo }) {
  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-stone-200 bg-gradient-to-b from-amber-50/70 via-stone-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>AI-Powered B2B Capability Linkage for Marginalized Artisans</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight max-w-4xl mx-auto font-serif leading-tight">
            From Artisan Craft to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-terracotta-600 to-amber-600">Business Opportunity.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-sans">
            AI-powered market linkage that helps artisans digitize their products and connects their real production capabilities with business demand.
          </p>

          {/* Key Differentiator Quote Banner */}
          <div className="mt-8 max-w-2xl mx-auto p-4 rounded-xl bg-amber-50 border border-amber-200/80 shadow-sm text-stone-800 text-sm sm:text-base font-medium italic">
            "We don’t just digitize the artisan — we connect what they can produce with what businesses actually need."
          </div>

          {/* Primary Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onSelectRole('artisan')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <span>Continue as Artisan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onSelectRole('buyer')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <span>Continue as Buyer</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Fast 2-Minute Demo Trigger */}
          <div className="mt-6">
            <button
              onClick={onStartDemo}
              className="text-xs sm:text-sm text-stone-500 hover:text-amber-700 font-medium underline underline-offset-4 decoration-amber-300 flex items-center gap-1.5 mx-auto transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Or click here to launch the 2-Minute Interactive Demo Tour</span>
            </button>
          </div>
        </div>
      </section>

      {/* Visual Workflow Section */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-xs uppercase tracking-widest font-bold text-amber-700">The End-to-End Workflow</h2>
          <p className="text-2xl font-bold text-stone-900 mt-1 font-serif">How Demand Proactively Reaches Artisans</p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {/* Step 1 */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex flex-col items-center text-center hover:border-amber-400 transition">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 font-bold text-lg">
              1
            </div>
            <h3 className="font-bold text-stone-900 text-sm">Create Product</h3>
            <p className="text-xs text-stone-500 mt-1.5">Artisan snaps photo, speaks or types simple details</p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex flex-col items-center text-center hover:border-amber-400 transition">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center mb-3 font-bold text-lg">
              2
            </div>
            <h3 className="font-bold text-stone-900 text-sm">AI Catalog</h3>
            <p className="text-xs text-stone-500 mt-1.5">Generates B2B specs, tags, capacity, and asks missing questions</p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex flex-col items-center text-center hover:border-amber-400 transition">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 font-bold text-lg">
              3
            </div>
            <h3 className="font-bold text-stone-900 text-sm">Buyer Requirement</h3>
            <p className="text-xs text-stone-500 mt-1.5">Cafes/hotels enter natural prompt: "Need 200 cups in 20 days"</p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex flex-col items-center text-center hover:border-amber-400 transition">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3 font-bold text-lg">
              4
            </div>
            <h3 className="font-bold text-stone-900 text-sm">Smart Match</h3>
            <p className="text-xs text-stone-500 mt-1.5">Evaluates MOQ, stock, monthly capacity, timeline, and budget</p>
          </div>

          {/* Step 5 */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex flex-col items-center text-center hover:border-amber-400 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 font-bold text-lg">
              5
            </div>
            <h3 className="font-bold text-stone-900 text-sm">Business Opportunity</h3>
            <p className="text-xs text-stone-500 mt-1.5">Proactive alert to artisan → Quotation submitted → B2B deal confirmed</p>
          </div>
        </div>
      </section>

      {/* Core Innovation Highlights */}
      <section className="py-12 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-4">
                <Factory className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2">Capability vs Catalog Listing</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Traditional marketplaces only sell what is sitting on a shelf. CraftConnect models <strong>Available Now</strong> vs <strong>Monthly Production Capacity</strong> so bulk buyers can order 200 units even if the artisan only has 50 finished today.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2">Explainable Deterministic Fit</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Smart matching doesn't rely on hallucinating AI for hard constraints. We enforce strict business rules: MOQ feasibility, production velocity vs deadline, price ceiling, and custom branding support with clear reasons.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4">
                <MessageSquareText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2">Demand Reaches the Artisan</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Instead of marginalized artisans waiting passively for someone to discover their web page, business requirements proactively ring their dashboard as vetted commercial leads with pre-calculated fulfillment paths.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SIH Alignment Card */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-stone-100 rounded-2xl p-8 border border-stone-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
                Problem Statement Alignment
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                Empowering Marginalized Artisans with Digital Market Linkage
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mt-2 max-w-2xl">
                Alleviates traditional artisan roadblocks: lack of English technical cataloging, difficulty understanding institutional RFQs, and inability to signal scalable workshop capacity.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onSelectRole('artisan')}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-semibold transition"
              >
                Launch Artisan View
              </button>
              <button
                onClick={() => onSelectRole('buyer')}
                className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs sm:text-sm font-semibold transition"
              >
                Launch Buyer View
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

