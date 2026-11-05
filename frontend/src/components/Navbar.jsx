import React from 'react';
import { Store, Building2, Bell, Sparkles, Layers, ShieldCheck, Home } from 'lucide-react';

export default function Navbar({ activeView, setActiveView, opportunityCount, activeArtisan, activeBuyer }) {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveView('landing')}
          >
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-stone-100 flex items-center justify-center text-lg shadow-sm group-hover:bg-amber-700 transition">
              🏺
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif font-bold text-lg text-stone-900 tracking-tight">CraftConnect</span>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200/70">
                  B2B AI Linkage
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block">
                Artisan Production Capacity to Enterprise Demand
              </p>
            </div>
          </div>

          {/* Role Navigation (Segmented Switcher) */}
          <div className="bg-stone-100/90 p-1 rounded-xl flex items-center space-x-1 border border-stone-200/60 shadow-inner">
            <button
              onClick={() => setActiveView('landing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                activeView === 'landing'
                  ? 'bg-white text-stone-900 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Home className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">Overview</span>
            </button>

            <button
              onClick={() => setActiveView('artisan')}
              className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                activeView === 'artisan'
                  ? 'bg-white text-stone-900 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-amber-700" />
              <span>Artisan Portal</span>
              {opportunityCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-600 ring-2 ring-white ml-0.5 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setActiveView('buyer')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                activeView === 'buyer'
                  ? 'bg-white text-stone-900 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-stone-700" />
              <span>Buyer Portal</span>
            </button>
          </div>

          {/* Active Profile context */}
          <div className="hidden lg:flex items-center space-x-3 pl-3 border-l border-stone-200">
            {activeView === 'artisan' ? (
              <div className="flex items-center space-x-2.5">
                <img
                  src={activeArtisan?.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"}
                  alt="Artisan"
                  className="w-8 h-8 rounded-full object-cover border border-stone-200 shadow-sm"
                />
                <div className="text-left">
                  <div className="text-xs font-bold text-stone-900 flex items-center gap-1">
                    {activeArtisan?.name || "Meera Handicrafts"}
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-[11px] text-stone-500">Jaipur • Terracotta</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2.5">
                <img
                  src={activeBuyer?.avatar || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=100&q=80"}
                  alt="Buyer"
                  className="w-8 h-8 rounded-full object-cover border border-stone-200 shadow-sm"
                />
                <div className="text-left">
                  <div className="text-xs font-bold text-stone-900">
                    {activeBuyer?.company_name || "Rajasthan Cafe Group"}
                  </div>
                  <div className="text-[11px] text-stone-500">Commercial Buyer • Jaipur</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
