import React, { useState } from 'react';
import { Plus, Bell, Package, Sparkles, Clock, CheckCircle2, ChevronRight, ShieldCheck, MapPin, Gauge, Layers, Info, Send } from 'lucide-react';

export default function ArtisanDashboard({
  artisan,
  products,
  opportunities,
  quotations,
  onOpenAddProduct,
  onOpenOpportunity,
  onViewCapabilityDetails
}) {
  const [activeTab, setActiveTab] = useState('opportunities'); // 'opportunities', 'products', 'capability', 'quotations'

  const activeQuotesCount = quotations.filter(q => q.status === 'PENDING').length;
  const acceptedQuotesCount = quotations.filter(q => q.status === 'ACCEPTED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7">
      {/* Artisan Profile Header */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-subtle">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img
              src={artisan?.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"}
              alt={artisan?.name}
              className="w-16 h-16 rounded-2xl object-cover border border-stone-200 shadow-sm"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">{artisan?.name || "Meera Handicrafts"}</h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-700 border border-stone-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Artisan
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-600 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" /> {artisan?.location || "Jaipur, Rajasthan"}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-amber-800 font-medium">
                  {artisan?.craft || "Terracotta & Handmade Pottery"}
                </span>
                <span className="text-stone-300">•</span>
                <span>{artisan?.experience || "14 years craftsmanship"}</span>
                <span className="text-stone-300">•</span>
                <span className="font-semibold text-stone-700">⭐ {artisan?.rating || 4.9} ({artisan?.completed_b2b_orders || 28} orders)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onOpenAddProduct}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs sm:text-sm font-semibold shadow-sm flex items-center justify-center gap-2 transition"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Product (AI Catalog)</span>
            </button>
          </div>
        </div>

        {/* 4 Core Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-stone-100">
          <div className="p-4 rounded-xl bg-[#faf9f6] border border-stone-200/80">
            <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">Catalog Products</div>
            <div className="text-2xl font-bold text-stone-900 mt-1">{products?.length || 3}</div>
            <div className="text-[11px] text-stone-500 mt-0.5">Digitized B2B items</div>
          </div>

          <div className="p-4 rounded-xl bg-[#faf9f6] border border-stone-200/80">
            <div className="text-[11px] font-medium text-stone-700 uppercase tracking-wider flex items-center justify-between">
              <span>Opportunities</span>
              {opportunities?.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-600" />
              )}
            </div>
            <div className="text-2xl font-bold text-stone-900 mt-1">{opportunities?.length || 2}</div>
            <div className="text-[11px] text-stone-500 mt-0.5 font-medium">Qualified institutional leads</div>
          </div>

          <div className="p-4 rounded-xl bg-[#faf9f6] border border-stone-200/80">
            <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">Active Quotations</div>
            <div className="text-2xl font-bold text-stone-900 mt-1">{activeQuotesCount}</div>
            <div className="text-[11px] text-stone-500 mt-0.5">{acceptedQuotesCount} confirmed orders</div>
          </div>

          <div className="p-4 rounded-xl bg-[#faf9f6] border border-stone-200/80">
            <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">Monthly Capacity</div>
            <div className="text-2xl font-bold text-stone-900 mt-1">
              {artisan?.monthly_total_capacity || 500} <span className="text-xs font-normal text-stone-500">units</span>
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5">Kiln & workshop scale</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200/80 space-x-6 text-xs sm:text-sm font-medium">
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`pb-3 relative transition flex items-center gap-1.5 ${
            activeTab === 'opportunities'
              ? 'text-stone-900 font-bold border-b-2 border-stone-900'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Bell className="w-4 h-4 text-stone-400" />
          <span>Business Opportunities</span>
          {opportunities?.length > 0 && (
            <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-stone-100 text-stone-700 font-bold border border-stone-200">
              {opportunities.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('capability')}
          className={`pb-3 relative transition flex items-center gap-1.5 ${
            activeTab === 'capability'
              ? 'text-stone-900 font-bold border-b-2 border-stone-900'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Gauge className="w-4 h-4 text-stone-400" />
          <span>Capability Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 relative transition flex items-center gap-1.5 ${
            activeTab === 'products'
              ? 'text-stone-900 font-bold border-b-2 border-stone-900'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Package className="w-4 h-4 text-stone-400" />
          <span>Products ({products?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('quotations')}
          className={`pb-3 relative transition flex items-center gap-1.5 ${
            activeTab === 'quotations'
              ? 'text-stone-900 font-bold border-b-2 border-stone-900'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Send className="w-4 h-4 text-stone-400" />
          <span>Quotations ({quotations?.length || 0})</span>
        </button>
      </div>

      {/* TAB 1: PROACTIVE BUSINESS OPPORTUNITIES */}
      {activeTab === 'opportunities' && (
        <div className="space-y-4">
          <div className="bg-white border border-stone-200/80 rounded-xl p-4 text-xs text-stone-600 flex items-start gap-3 shadow-subtle">
            <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-800">Demand Reaches the Artisan:</span> When institutional buyers submit procurement needs, our system matches your workshop capacity, current inventory, and lead times. Relevant opportunities appear below for your quotation.
            </div>
          </div>

          {opportunities && opportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {opportunities.map((opp, idx) => {
                const req = opp.requirement;
                const isQuoted = opp.has_quoted;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-stone-200/90 shadow-subtle p-5 hover:border-stone-300 transition flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Pill */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-800 border border-stone-200">
                            New Opportunity
                          </span>
                          <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                            {opp.match_score}% Fit
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-400">Jaipur Hub</span>
                      </div>

                      {/* Buyer Details */}
                      <div className="mb-4">
                        <h3 className="text-base font-bold text-stone-900 font-serif">
                          {req.buyer_name || "Rajasthan Cafe Group"}
                        </h3>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Procurement Request #{req.id?.slice(0, 8)}
                        </p>
                      </div>

                      {/* Specs Grid */}
                      <div className="bg-[#faf9f6] rounded-xl p-3.5 grid grid-cols-2 gap-3 text-xs border border-stone-200/70 mb-4">
                        <div>
                          <span className="text-stone-400 text-[10px] block font-medium">Product:</span>
                          <span className="font-semibold text-stone-900">{req.product_name}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 text-[10px] block font-medium">Quantity Needed:</span>
                          <span className="font-bold text-stone-900">{req.quantity} units</span>
                        </div>
                        <div>
                          <span className="text-stone-400 text-[10px] block font-medium">Target Budget:</span>
                          <span className="font-semibold text-stone-900">₹{req.max_budget_per_unit} / unit</span>
                        </div>
                        <div>
                          <span className="text-stone-400 text-[10px] block font-medium">Deadline:</span>
                          <span className="font-semibold text-stone-900">{req.deadline_days} days</span>
                        </div>
                        <div className="col-span-2 pt-2 border-t border-stone-200/60">
                          <span className="text-stone-400 text-[10px] block font-medium">Customization:</span>
                          <span className="text-stone-700">
                            {req.customization_spec || "Logo branding / stamped insignia"}
                          </span>
                        </div>
                      </div>

                      {/* Feasibility note */}
                      <div className="text-[11px] text-stone-600 bg-stone-50 border border-stone-200/60 p-2.5 rounded-lg mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>
                          Fulfillment path: <strong>{opp.matched_product?.available_now || 50} in stock</strong> + remainder crafted in ~13 days.
                        </span>
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="pt-2">
                      {isQuoted ? (
                        <div className="flex items-center gap-2 text-xs font-medium text-stone-700 bg-stone-50 px-3 py-2 rounded-lg border border-stone-200 w-full justify-center">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Quoted (₹{opp.quotation?.unit_price}/unit) — Awaiting Review</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => onOpenOpportunity(opp)}
                          className="w-full py-2.5 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <span>Review Opportunity & Quote</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200/80 p-12 text-center shadow-subtle">
              <Package className="w-10 h-10 text-stone-300 mx-auto mb-3" />
              <h3 className="font-bold text-stone-800 text-sm">No Open Opportunities</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                As soon as a buyer posts a requirement matching your craft capabilities, you will receive an instant notification here.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ARTISAN CAPABILITY PROFILE */}
      {activeTab === 'capability' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-subtle">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-stone-900 font-serif">Artisan Capability Matrix</h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Distinguishing immediate dispatch stock from ongoing workshop production velocity.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-100 text-stone-700 border border-stone-200 text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> B2B Verified Capacity
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 bg-[#faf9f6] text-stone-600 uppercase font-semibold text-[10px] tracking-wider">
                    <th className="py-3 px-4">Product & Craft</th>
                    <th className="py-3 px-4 text-emerald-900 bg-emerald-50/40">
                      Available Now
                    </th>
                    <th className="py-3 px-4 text-amber-900 bg-amber-50/40">
                      Monthly Capacity
                    </th>
                    <th className="py-3 px-4">MOQ</th>
                    <th className="py-3 px-4">Indicative Price</th>
                    <th className="py-3 px-4">Lead Time</th>
                    <th className="py-3 px-4">Custom Branding</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-stone-50/60 transition">
                      <td className="py-3.5 px-4 font-medium text-stone-900">
                        <div className="flex items-center space-x-3">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-10 h-10 rounded-lg object-cover border border-stone-200"
                          />
                          <div>
                            <div className="font-bold text-stone-900">{prod.name}</div>
                            <div className="text-[11px] text-stone-500">{prod.material}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 bg-emerald-50/20">
                        <span className="font-bold text-emerald-800 text-sm">{prod.available_now || 50}</span>
                        <span className="text-[10px] text-stone-500 block">units in stock</span>
                      </td>
                      <td className="py-3.5 px-4 bg-amber-50/20">
                        <span className="font-bold text-amber-800 text-sm">{prod.monthly_capacity || 300}</span>
                        <span className="text-[10px] text-stone-500 block">units / month</span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-stone-700">
                        {prod.moq || 50} units
                      </td>
                      <td className="py-3.5 px-4 font-bold text-stone-900">
                        ₹{prod.price} <span className="text-[10px] font-normal text-stone-400">/unit</span>
                      </td>
                      <td className="py-3.5 px-4 text-stone-600">
                        {prod.lead_time_days || 15} days
                      </td>
                      <td className="py-3.5 px-4">
                        {prod.customization_available ? (
                          <span className="text-[11px] text-emerald-800 font-medium">
                            ✓ {prod.customization_details?.slice(0, 24) || "Logo stamping"}...
                          </span>
                        ) : (
                          <span className="text-[11px] text-stone-400">Standard finish</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Explanation box */}
            <div className="mt-5 p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-stone-600 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong>How Capability Matching Works:</strong> If a buyer orders 200 cups, typical marketplaces fail because you only have 50 finished on hand. CraftConnect factors in your 300 cups/month production velocity (~12 cups/day), verifying that the remaining 150 units will be completed well within standard timelines.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRODUCTS */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900 font-serif">Artisan Digitized Products</h2>
            <button
              onClick={onOpenAddProduct}
              className="px-3.5 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Product</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-subtle hover:shadow-card transition flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 w-full relative overflow-hidden bg-stone-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-stone-900/80 backdrop-blur-sm text-stone-100 text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {product.category}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-800">
                      {product.material}
                    </div>
                    <h3 className="font-bold text-stone-900 text-sm mt-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Stock & Capacity */}
                    <div className="mt-3 pt-3 border-t border-stone-100 grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-[#faf9f6] p-2 rounded-lg border border-stone-200/60">
                        <span className="text-[10px] text-stone-400 block">Available Now</span>
                        <span className="font-semibold text-stone-900">{product.available_now || 50} units</span>
                      </div>
                      <div className="bg-[#faf9f6] p-2 rounded-lg border border-stone-200/60">
                        <span className="text-[10px] text-stone-400 block">Monthly Rate</span>
                        <span className="font-semibold text-stone-900">{product.monthly_capacity || 300} units</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-stone-400">Price: </span>
                    <span className="font-bold text-stone-900">₹{product.price}</span>
                    <span className="text-stone-400 text-[11px]"> (MOQ {product.moq})</span>
                  </div>
                  <span className="text-[11px] text-stone-600 font-medium">
                    Lead: {product.lead_time_days || 15}d
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: QUOTATIONS */}
      {activeTab === 'quotations' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-stone-900 font-serif">Submitted B2B Quotations</h2>
          {quotations && quotations.length > 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-subtle">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#faf9f6] border-b border-stone-200 text-stone-600 uppercase font-semibold text-[10px] tracking-wider">
                    <th className="py-3 px-4">Quote ID</th>
                    <th className="py-3 px-4">Buyer & Item</th>
                    <th className="py-3 px-4">Unit Price</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">Timeline</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {quotations.map((q) => (
                    <tr key={q.id} className="hover:bg-stone-50/50">
                      <td className="py-3 px-4 font-mono font-medium text-stone-600">#{q.id?.slice(0, 8)}</td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-stone-900">{q.buyer_name || "Rajasthan Cafe Group"}</div>
                        <div className="text-[11px] text-stone-500">{q.product_name} • {q.quantity} units</div>
                      </td>
                      <td className="py-3 px-4 font-medium text-stone-800">₹{q.unit_price}</td>
                      <td className="py-3 px-4 font-bold text-stone-900">₹{q.total_amount?.toLocaleString() || (q.unit_price * q.quantity)}</td>
                      <td className="py-3 px-4 text-stone-600">{q.delivery_days || 15} days</td>
                      <td className="py-3 px-4">
                        {q.status === 'ACCEPTED' ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                            ✓ Confirmed
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-stone-100 text-stone-700 border border-stone-200">
                            Under Review
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200/80 p-10 text-center text-xs text-stone-500 shadow-subtle">
              No quotations submitted yet. When an opportunity is received, your bid will appear here.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
