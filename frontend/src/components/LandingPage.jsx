import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap, Factory, ShoppingBag, Users, Layers, MessageSquareText } from 'lucide-react';

export default function LandingPage({ onSelectRole, onStartDemo }) {
  return (
    <div className="min-h-screen bg-[#faf9f6] pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Subtle Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            <span>AI-Powered B2B Capability Linkage for Artisans</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight max-w-4xl mx-auto font-serif leading-[1.15]">
            From Artisan Craft to <span className="text-amber-800 italic font-normal">Business Opportunity.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            AI-powered market linkage that helps artisans digitize their products and connects their real production capabilities with business demand.
          </p>

          {/* Key Differentiator Quote Banner */}
          <div className="mt-7 max-w-xl mx-auto p-4 rounded-xl bg-white border border-stone-200/80 shadow-subtle text-stone-800 text-sm font-medium">
            <span className="text-stone-400 font-serif text-lg mr-1">“</span>
            We don’t just digitize the artisan — we connect what they can produce with what businesses actually need.
            <span className="text-stone-400 font-serif text-lg ml-1">”</span>
          </div>

          {/* Primary Action Buttons */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onSelectRole('artisan')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-sm shadow-sm transition flex items-center justify-center gap-2 group"
            >
              <span>Continue as Artisan</span>
              <ArrowRight className="w-4 h-4 text-amber-200 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onSelectRole('buyer')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-100 font-medium text-sm shadow-sm transition flex items-center justify-center gap-2 group"
            >
              <span>Continue as Buyer</span>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Fast 2-Minute Demo Trigger */}
          <div className="mt-5">
            <button
              onClick={onStartDemo}
              className="text-xs text-stone-500 hover:text-stone-800 font-medium underline underline-offset-4 decoration-stone-300 transition"
            >
              Or click here to launch the 2-Minute Interactive Demo Tour
            </button>
          </div>
        </div>
      </section>

      {/* Visual Workflow Section */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500">
            End-to-End Workflow
          </span>
          <h2 className="text-2xl font-bold text-stone-900 mt-1 font-serif">
            How Demand Proactively Reaches Artisans
          </h2>
        </div>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Step 1 */}
          <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-subtle flex flex-col justify-between hover:border-stone-300 transition">
            <div>
              <span className="text-[11px] font-mono font-bold text-stone-400 block mb-2">01</span>
              <h3 className="font-bold text-stone-900 text-sm">Create Product</h3>
              <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                Artisan provides photo, speaks or types simple details in Hindi or English.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-subtle flex flex-col justify-between hover:border-stone-300 transition">
            <div>
              <span className="text-[11px] font-mono font-bold text-stone-400 block mb-2">02</span>
              <h3 className="font-bold text-stone-900 text-sm">AI Catalog</h3>
              <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                AI generates B2B specs, tags, capacity, and asks multilingual missing questions.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-subtle flex flex-col justify-between hover:border-stone-300 transition">
            <div>
              <span className="text-[11px] font-mono font-bold text-stone-400 block mb-2">03</span>
              <h3 className="font-bold text-stone-900 text-sm">Buyer Prompt</h3>
              <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                Cafes/hotels enter prompt: "Need 200 cups under ₹150 in 20 days."
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-subtle flex flex-col justify-between hover:border-stone-300 transition">
            <div>
              <span className="text-[11px] font-mono font-bold text-stone-400 block mb-2">04</span>
              <h3 className="font-bold text-stone-900 text-sm">Smart Match</h3>
              <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                Evaluates MOQ, stock, monthly capacity, timeline, and price ceiling.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-subtle flex flex-col justify-between hover:border-stone-300 transition">
            <div>
              <span className="text-[11px] font-mono font-bold text-stone-400 block mb-2">05</span>
              <h3 className="font-bold text-stone-900 text-sm">Opportunity</h3>
              <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                Proactive alert to artisan → Quotation submitted → B2B deal confirmed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Innovation Highlights */}
      <section className="py-12 bg-white border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#faf9f6] border border-stone-200/80 shadow-subtle">
              <div className="w-8 h-8 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 flex items-center justify-center mb-4">
                <Factory className="w-4 h-4 text-amber-800" />
              </div>
              <h3 className="text-sm font-bold text-stone-900 mb-2">Capability vs Catalog Listing</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Traditional marketplaces only sell sitting inventory. CraftConnect separates <strong>Available Now</strong> from <strong>Monthly Production Capacity</strong> so institutional buyers can order at scale without artificial stockouts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#faf9f6] border border-stone-200/80 shadow-subtle">
              <div className="w-8 h-8 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 flex items-center justify-center mb-4">
                <Zap className="w-4 h-4 text-amber-800" />
              </div>
              <h3 className="text-sm font-bold text-stone-900 mb-2">Explainable Deterministic Fit</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Smart matching doesn't rely on hallucinating AI for hard constraints. We enforce strict business rules: MOQ feasibility, production velocity vs deadline, price ceiling, and custom branding support with clear reasons.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#faf9f6] border border-stone-200/80 shadow-subtle">
              <div className="w-8 h-8 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 flex items-center justify-center mb-4">
                <MessageSquareText className="w-4 h-4 text-amber-800" />
              </div>
              <h3 className="text-sm font-bold text-stone-900 mb-2">Demand Reaches the Artisan</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Instead of marginalized artisans waiting passively for someone to discover their web page, business requirements proactively ring their dashboard as vetted commercial leads with pre-calculated fulfillment paths.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Alignment */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-stone-100 rounded-2xl p-7 border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-card">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-800 border border-stone-700 text-amber-400 text-[11px] font-medium mb-2">
              B2B Market Linkage Concept
            </div>
            <h3 className="text-xl font-bold font-serif text-white">
              Empowering Marginalized Artisans with Scalable Production Visibility
            </h3>
            <p className="text-xs text-stone-400 mt-1.5 max-w-2xl leading-relaxed">
              Eliminates the three biggest barriers for rural artisans: lack of technical English cataloging, inability to parse commercial tenders, and zero platform visibility for workshop production capacity.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
            <button
              onClick={() => onSelectRole('artisan')}
              className="px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold transition"
            >
              Open Artisan Portal
            </button>
            <button
              onClick={() => onSelectRole('buyer')}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-semibold transition"
            >
              Open Buyer Portal
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
