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
  const [activeTab, setActiveTab] = useState('requirements');

  const activeReqsCount = requirements.length;
  const pendingQuotesCount = quotations.filter(q => q.status === 'PENDING').length;
  const confirmedOrdersCount = orders.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7">
      {/* Buyer Header */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-subtle">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img
              src={buyer?.avatar || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80"}
              alt={buyer?.company_name}
              className="w-16 h-16 rounded-2xl object-cover border border-stone-200 shadow-sm"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">{buyer?.company_name || "Rajasthan Cafe Group"}</h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-700 border border-stone-200">
                  <Building2 className="w-3.5 h-3.5 text-stone-600" /> B2B Institutional Buyer
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-600 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" /> {buyer?.location || "Jaipur, Rajasthan"}
                </span>
                <span className="text-stone-300">•</span>
                <span>Contact: {buyer?.contact_person || "Rohit Singhania"}</span>
                <span className="text-stone-300">•</span>
                <span className="text-stone-700 font-medium">8 Cafe Locations</span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenCreateRequirement}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold shadow-sm flex items-center justify-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>+ Post Enterprise Requirement</span>
          </button>
        </div>

        {/* 4 Core Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-stone-100">
          <div className="p-4 rounded-xl bg-[#faf9f6] border border-stone-200/80">
            <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">Active RFQs</div>
            <div className="text-2xl font-bold text-stone-900 mt-1">{activeReqsCount}</div>
            <div className="text-[11px] text-stone-500 mt-0.5">Procurement postings</div>
          </div>

          <div className="p-4 rounded-xl bg-[#faf9f6] border border-stone-200/80">
            <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">Matched Artisans</div>
            <div className="text-2xl font-bold text-stone-900 mt-1">3</div>
            <div className="text-[11px] text-stone-500 mt-0.5">Verified workshop clusters</div>
          </div>

          <div className="p-4 rounded-xl bg-[#faf9f6] border border-stone-200/80">
            <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">Quotations</div>
            <div className="text-2xl font-bold text-stone-900 mt-1">{quotations?.length || 0}</div>
            <div className="text-[11px] text-stone-500 mt-0.5 font-medium">{pendingQuotesCount} ready for review</div>
          </div>

          <div className="p-4 rounded-xl bg-[#faf9f6] border border-stone-200/80">
            <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">Confirmed Contracts</div>
            <div className="text-2xl font-bold text-emerald-800 mt-1">{confirmedOrdersCount}</div>
            <div className="text-[11px] text-stone-500 mt-0.5 font-medium">B2B work orders</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200/80 space-x-6 text-xs sm:text-sm font-medium">
        <button
          onClick={() => setActiveTab('requirements')}
          className={`pb-3 relative transition flex items-center gap-1.5 ${
            activeTab === 'requirements'
              ? 'text-stone-900 font-bold border-b-2 border-stone-900'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <FileText className="w-4 h-4 text-stone-400" />
          <span>Procurement Requirements ({requirements?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('quotations')}
          className={`pb-3 relative transition flex items-center gap-1.5 ${
            activeTab === 'quotations'
              ? 'text-stone-900 font-bold border-b-2 border-stone-900'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Award className="w-4 h-4 text-stone-400" />
          <span>Artisan Quotations ({quotations?.length || 0})</span>
          {pendingQuotesCount > 0 && (
            <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-stone-100 text-stone-700 font-bold border border-stone-200">
              {pendingQuotesCount} Review
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 relative transition flex items-center gap-1.5 ${
            activeTab === 'orders'
              ? 'text-stone-900 font-bold border-b-2 border-stone-900'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-stone-400" />
          <span>Confirmed Orders ({orders?.length || 0})</span>
        </button>
      </div>

      {/* TAB 1: REQUIREMENTS */}
      {activeTab === 'requirements' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900 font-serif">Active Procurement RFQs</h2>
            <button
              onClick={onOpenCreateRequirement}
              className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Post New RFQ</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {requirements.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-subtle hover:border-stone-300 transition"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                        {req.category || "Tableware & Beverage"}
                      </span>
                      <span className="text-xs text-stone-400 font-mono">
                        RFQ #{req.id?.slice(0, 8)}
                      </span>
                      {req.status === 'CONFIRMED' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          ✓ Deal Confirmed
                        </span>
                      ) : req.status === 'QUOTED' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-800 border border-stone-200">
                          Quotation Received
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-50 text-stone-600 border border-stone-200">
                          Matching Open
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-stone-900 font-serif">
                      {req.product_name} ({req.quantity} units)
                    </h3>

                    {/* Natural prompt quote */}
                    <div className="text-xs text-stone-600 bg-[#faf9f6] p-2.5 rounded-lg border border-stone-200/60 italic">
                      "{req.raw_prompt}"
                    </div>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-stone-600 pt-0.5">
                      <div>
                        <span className="text-stone-400">Budget: </span>
                        <span className="font-semibold text-stone-900">₹{req.max_budget_per_unit} / unit</span>
                      </div>
                      <div>
                        <span className="text-stone-400">Total: </span>
                        <span className="font-semibold text-stone-900">₹{(req.max_budget_per_unit * req.quantity).toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-stone-400">Deadline: </span>
                        <span className="font-semibold text-stone-900">{req.deadline_days} days</span>
                      </div>
                      <div>
                        <span className="text-stone-400">Customization: </span>
                        <span className="text-stone-700">
                          {req.customization_spec || "Logo branding"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row md:flex-col gap-2 min-w-[170px]">
                    <button
                      onClick={() => onViewMatches(req)}
                      className="px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-1.5 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                      <span>Find Matching Artisans</span>
                    </button>

                    {quotations.filter(q => q.requirement_id === req.id).length > 0 && (
                      <button
                        onClick={() => setActiveTab('quotations')}
                        className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs flex items-center justify-center transition"
                      >
                        <span>View Quotation</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: QUOTATIONS */}
      {activeTab === 'quotations' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-stone-900 font-serif">Artisan Quotations & Bids</h2>
          {quotations && quotations.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {quotations.map((quote) => (
                <div
                  key={quote.id}
                  className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-subtle hover:border-stone-300 transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                          Master Artisan Bid
                        </span>
                        <span className="text-xs text-stone-400 font-mono">#{quote.id?.slice(0, 8)}</span>
                        {quote.status === 'ACCEPTED' ? (
                          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            ✓ Accepted
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            Awaiting Decision
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-stone-900 font-serif">
                        {quote.artisan_name}
                      </h3>
                      <p className="text-xs text-stone-500">
                        For Requirement: <strong>{quote.product_name}</strong> ({quote.quantity} units)
                      </p>

                      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#faf9f6] p-3 rounded-xl border border-stone-200/70 text-xs">
                        <div>
                          <span className="text-stone-400 text-[10px] block">Quoted Price</span>
                          <span className="font-bold text-stone-900">₹{quote.unit_price} / unit</span>
                        </div>
                        <div>
                          <span className="text-stone-400 text-[10px] block">Total Amount</span>
                          <span className="font-bold text-emerald-800">₹{quote.total_amount?.toLocaleString() || (quote.unit_price * quote.quantity)}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 text-[10px] block">Lead Time</span>
                          <span className="font-semibold text-stone-800">{quote.delivery_days} days</span>
                        </div>
                        <div>
                          <span className="text-stone-400 text-[10px] block">Budget Check</span>
                          <span className="font-medium text-emerald-700">Within Budget ✓</span>
                        </div>
                      </div>

                      <div className="mt-2.5 text-xs text-stone-700 bg-stone-50 p-2.5 rounded-lg border border-stone-200/60">
                        <span className="font-semibold text-stone-800">Customization: </span>
                        {quote.customization_notes || "Will stamp emblem on base"}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 min-w-[160px]">
                      {quote.status === 'ACCEPTED' ? (
                        <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-center text-xs font-semibold">
                          ✓ Contract Active
                        </div>
                      ) : (
                        <button
                          onClick={() => onReviewQuotation(quote)}
                          className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-100 font-semibold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Review & Accept</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200/80 p-12 text-center text-xs text-stone-500 shadow-subtle">
              No quotations received yet. Click "Find Matching Artisans" to notify local workshops.
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CONFIRMED ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-stone-900 font-serif">Confirmed B2B Work Orders</h2>
          {orders && orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-subtle">
                  <div className="flex flex-col md:flex-row md:items-center justify-between pb-3.5 border-b border-stone-200 gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Active Work Order
                        </span>
                        <span className="font-mono text-xs text-stone-500">
                          #{ord.order_number || ord.id?.slice(0, 8)}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-stone-900 font-serif mt-1">
                        {ord.product_name} • {ord.quantity} units
                      </h3>
                      <p className="text-xs text-stone-500">
                        Crafted by: <strong>{ord.artisan_name}</strong> (Jaipur Cluster)
                      </p>
                    </div>

                    <div className="text-left md:text-right">
                      <div className="text-[11px] text-stone-400">Total Contract Value</div>
                      <div className="text-xl font-bold text-stone-900">₹{ord.total_amount?.toLocaleString()}</div>
                      <div className="text-[11px] text-stone-500">Delivery: {ord.delivery_days} days</div>
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="mt-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                      Fulfillment Milestones
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                      {(ord.milestones || []).map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className={`p-2.5 rounded-xl border text-xs ${
                            m.status === 'COMPLETED'
                              ? 'bg-emerald-50 border-emerald-200/80 text-emerald-900'
                              : m.status === 'IN_PROGRESS'
                              ? 'bg-amber-50/60 border-amber-200 text-amber-900 font-semibold'
                              : 'bg-stone-50 border-stone-200/60 text-stone-500'
                          }`}
                        >
                          <div className="font-medium text-[11px]">{m.name}</div>
                          <div className="text-[10px] mt-0.5 opacity-70">{m.target_days || m.date || 'Scheduled'}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200/80 p-12 text-center text-xs text-stone-500 shadow-subtle">
              No orders confirmed yet. Accepting an artisan quotation executes the production contract here.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
