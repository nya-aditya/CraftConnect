import React from 'react';
import { Store, Building2, Bell, Sparkles, Layers, ShieldCheck, Home } from 'lucide-react';

export default function Navbar({ activeView, setActiveView, opportunityCount, activeArtisan, activeBuyer }) {
  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveView('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-700 via-terracotta-600 to-amber-500 flex items-center justify-center text-white text-xl shadow-md shadow-amber-900/10">
              🏺
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl text-stone-900 tracking-tight font-serif">CraftConnect</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                  B2B AI Linkage
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden sm:block">
                Connecting Artisan Production Capacity to Real Business Demand
              </p>
            </div>
          </div>

          {/* Role Navigation */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveView('landing')}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition flex items-center space-x-1.5 ${
                activeView === 'landing'
                  ? 'bg-stone-100 text-stone-900 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Home className="w-4 h-4 text-stone-500" />
              <span className="hidden md:inline">Home</span>
            </button>

            {/* Artisan View Button */}
            <button
              onClick={() => setActiveView('artisan')}
              className={`relative px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition flex items-center space-x-2 ${
                activeView === 'artisan'
                  ? 'bg-amber-600 text-white shadow-sm font-semibold'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Artisan Portal</span>
              {opportunityCount > 0 && (
                <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ml-1 ${
                  activeView === 'artisan' ? 'bg-white text-amber-700' : 'bg-amber-600 text-white animate-pulse'
                }`}>
                  {opportunityCount} new
                </span>
              )}
            </button>

            {/* Buyer View Button */}
            <button
              onClick={() => setActiveView('buyer')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition flex items-center space-x-2 ${
                activeView === 'buyer'
                  ? 'bg-slate-900 text-white shadow-sm font-semibold'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Buyer Portal</span>
            </button>
          </div>

          {/* Active Profile context */}
          <div className="hidden lg:flex items-center space-x-3 border-l pl-4 border-stone-200">
            {activeView === 'artisan' ? (
              <div className="flex items-center space-x-2.5">
                <img
                  src={activeArtisan?.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"}
                  alt="Artisan"
                  className="w-8 h-8 rounded-full object-cover border border-amber-300"
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
                  className="w-8 h-8 rounded-full object-cover border border-slate-300"
                />
                <div className="text-left">
                  <div className="text-xs font-bold text-stone-900">
                    {activeBuyer?.company_name || "Rajasthan Cafe Group"}
                  </div>
                  <div className="text-[11px] text-stone-500">Hospitality Buyer • Jaipur</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

