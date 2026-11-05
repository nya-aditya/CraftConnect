import React, { useState } from 'react';
import { Plus, Building2, Search, CheckCircle2, ChevronRight, FileText, Sparkles, MapPin, Layers, Award, Clock } from 'lucide-react';

export default function BuyerDashboard({
  buyer,
  requirements,
  quotations,
  orders,
  onOpenCreateRequirement,
  onViewMatches,
  onReviewQuotation
}) {
  const [activeTab, setActiveTab] = useState('requirements'); // 'requirements', 'quotations', 'orders'

  const activeReqsCount = requirements.length;
  const pendingQuotesCount = quotations.filter(q => q.status === 'PENDING').length;
  const confirmedOrdersCount = orders.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Buyer Profile Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img
              src={buyer?.avatar || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80"}
              alt={buyer?.company_name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-400/30 shadow"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-stone-900 font-serif">{buyer?.company_name || "Rajasthan Cafe Group"}</h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-300">
                  <Building2 className="w-3.5 h-3.5" /> B2B Institutional Buyer
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600 mt-1.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" /> {buyer?.location || "Jaipur, Rajasthan"}
                </span>
                <span className="text-stone-400">•</span>
                <span>Contact: {buyer?.contact_person || "Rohit Singhania (Procurement Head)"}</span>
                <span className="text-stone-400">•</span>
                <span className="text-slate-700 font-medium">8 Cafe Outlets in Jaipur Cluster</span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenCreateRequirement}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold shadow-md flex items-center justify-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>+ Post Enterprise Requirement</span>
          </button>
        </div>

        {/* 4 Core Buyer Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-stone-100">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">Active Requirements</div>
            <div className="text-2xl font-bold text-stone-900 mt-1">{activeReqsCount}</div>
            <div className="text-[11px] text-stone-500 mt-0.5">Procurement RFQs posted</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">Matched Artisans</div>
            <div className="text-2xl font-bold text-amber-700 mt-1">3</div>
            <div className="text-[11px] text-stone-500 mt-0.5">Verified workshop clusters</div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
            <div className="text-xs font-semibold text-amber-900 uppercase tracking-wider">Quotations Received</div>
            <div className="text-2xl font-bold text-amber-900 mt-1">{quotations?.length || 0}</div>
            <div className="text-[11px] text-amber-700 mt-0.5 font-medium">{pendingQuotesCount} ready for review</div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
            <div className="text-xs font-semibold text-emerald-900 uppercase tracking-wider">Confirmed Contracts</div>
            <div className="text-2xl font-bold text-emerald-900 mt-1">{confirmedOrdersCount}</div>
            <div className="text-[11px] text-emerald-700 mt-0.5 font-medium">B2B work orders active</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 space-x-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('requirements')}
          className={`pb-3 relative transition flex items-center gap-2 ${
            activeTab === 'requirements'
              ? 'text-slate-900 font-bold border-b-2 border-slate-900'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Procurement Requirements ({requirements?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('quotations')}
          className={`pb-3 relative transition flex items-center gap-2 ${
            activeTab === 'quotations'
              ? 'text-slate-900 font-bold border-b-2 border-slate-900'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Artisan Quotations ({quotations?.length || 0})</span>
          {pendingQuotesCount > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-amber-500 text-stone-950 font-bold">
              {pendingQuotesCount} Action
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 relative transition flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'text-slate-900 font-bold border-b-2 border-slate-900'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Confirmed B2B Orders ({orders?.length || 0})</span>
        </button>
      </div>

      {/* TAB 1: REQUIREMENTS LIST */}
      {activeTab === 'requirements' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900 font-serif">Your Active Procurement RFQs</h2>
            <button
              onClick={onOpenCreateRequirement}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Post New Requirement</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {requirements.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                        {req.category || "Tableware & Beverage"}
                      </span>
                      <span className="text-xs text-stone-400">
                        RFQ #{req.id?.slice(0, 10)}
                      </span>
                      {req.status === 'CONFIRMED' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          ✓ Deal Confirmed
                        </span>
                      ) : req.status === 'QUOTED' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
                          Quotation Received
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700 border border-stone-300">
                          Matching Open
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-stone-900 font-serif">
                      {req.product_name} ({req.quantity} units)
                    </h3>

                    {/* Natural prompt */}
                    <div className="text-xs text-stone-600 bg-stone-50 p-2.5 rounded-lg border border-stone-200/80 italic">
                      "{req.raw_prompt}"
                    </div>

                    {/* Breakdown */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-600 pt-1">
                      <div>
                        <span className="text-stone-400">Target Budget: </span>
                        <span className="font-bold text-stone-900">₹{req.max_budget_per_unit} / unit</span>
                      </div>
                      <div>
                        <span className="text-stone-400">Total Budget: </span>
                        <span className="font-semibold text-stone-800">₹{(req.max_budget_per_unit * req.quantity).toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-stone-400">Deadline: </span>
                        <span className="font-semibold text-stone-800">{req.deadline_days} days</span>
                      </div>
                      <div>
                        <span className="text-stone-400">Customization: </span>
                        <span className="font-medium text-amber-800">
                          {req.customization_spec || "Logo branding"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row md:flex-col gap-2 min-w-[190px]">
                    <button
                      onClick={() => onViewMatches(req)}
                      className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                      <span>Find Matching Artisans</span>
                    </button>

                    {quotations.filter(q => q.requirement_id === req.id).length > 0 && (
                      <button
                        onClick={() => setActiveTab('quotations')}
                        className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs flex items-center justify-center gap-1.5 transition"
                      >
                        <span>View Quotation ({quotations.filter(q => q.requirement_id === req.id).length})</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: QUOTATIONS RECEIVED */}
      {activeTab === 'quotations' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-stone-900 font-serif">Artisan Quotations & Bids</h2>
          {quotations && quotations.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {quotations.map((quote) => (
                <div
                  key={quote.id}
                  className="bg-white rounded-2xl border-2 border-amber-300 p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                          ⭐ Master Artisan Bid
                        </span>
                        <span className="text-xs text-stone-400">Quote #{quote.id?.slice(0, 10)}</span>
                        {quote.status === 'ACCEPTED' ? (
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                            ✓ ACCEPTED
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                            AWAITING ACCEPTANCE
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-stone-900 font-serif">
                        {quote.artisan_name}
                      </h3>
                      <p className="text-xs text-stone-500">
                        For Requirement: <strong>{quote.product_name}</strong> ({quote.quantity} units)
                      </p>

                      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs">
                        <div>
                          <span className="text-stone-500 block">Quoted Price:</span>
                          <span className="font-bold text-stone-900 text-sm">₹{quote.unit_price} / unit</span>
                        </div>
                        <div>
                          <span className="text-stone-500 block">Total Deal Amount:</span>
                          <span className="font-bold text-emerald-700 text-sm">₹{quote.total_amount?.toLocaleString() || (quote.unit_price * quote.quantity)}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 block">Delivery Lead Time:</span>
                          <span className="font-semibold text-stone-800">{quote.delivery_days} days</span>
                        </div>
                        <div>
                          <span className="text-stone-500 block">Budget Variance:</span>
                          <span className="font-semibold text-emerald-600">Within Budget ✓</span>
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-stone-700 bg-amber-50/50 p-2.5 rounded-lg border border-amber-200/60">
                        <span className="font-bold text-stone-900">Customization Note: </span>
                        {quote.customization_notes || "Will stamp Rajasthan Cafe Group brand logo on cup base"}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 min-w-[170px]">
                      {quote.status === 'ACCEPTED' ? (
                        <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-center text-xs font-bold">
                          ✓ Contract Confirmed
                        </div>
                      ) : (
                        <button
                          onClick={() => onReviewQuotation(quote)}
                          className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Review & Accept Quotation</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-xs text-stone-500">
              No quotations received yet. Click "Find Matching Artisans" on your requirement to notify master craftsmen.
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CONFIRMED B2B ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-stone-900 font-serif">Confirmed B2B Work Orders</h2>
          {orders && orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-2xl border-2 border-emerald-400 p-6 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-stone-200 gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          ✓ ACTIVE B2B CONTRACT
                        </span>
                        <span className="font-mono text-xs font-bold text-stone-900">
                          Order #{ord.order_number || ord.id?.slice(0, 10)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-stone-900 font-serif mt-1">
                        {ord.product_name} • {ord.quantity} units
                      </h3>
                      <p className="text-xs text-stone-500">
                        Contracted with: <strong>{ord.artisan_name}</strong> (Jaipur Cluster)
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-stone-500">Total Contract Value</div>
                      <div className="text-2xl font-bold text-emerald-700">₹{ord.total_amount?.toLocaleString()}</div>
                      <div className="text-[11px] text-stone-500">Timeline: {ord.delivery_days} days</div>
                    </div>
                  </div>

                  {/* Production Milestones */}
                  <div className="mt-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                      Production & Delivery Milestones
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                      {(ord.milestones || []).map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className={`p-3 rounded-xl border text-xs ${
                            m.status === 'COMPLETED'
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                              : m.status === 'IN_PROGRESS'
                              ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                              : 'bg-stone-50 border-stone-200 text-stone-500'
                          }`}
                        >
                          <div className="font-semibold">{m.name}</div>
                          <div className="text-[10px] mt-1 opacity-75">{m.target_days || m.date || 'Scheduled'}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-xs text-stone-500">
              No orders confirmed yet. When you accept an artisan's quotation, the production contract will be tracked here.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

