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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Artisan Profile Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img
              src={artisan?.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"}
              alt={artisan?.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/30 shadow"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-stone-900 font-serif">{artisan?.name || "Meera Handicrafts"}</h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Master Artisan
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600 mt-1.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" /> {artisan?.location || "Jaipur, Rajasthan"}
                </span>
                <span className="text-amber-800 font-medium">
                  🏺 {artisan?.craft || "Terracotta & Handmade Pottery"}
                </span>
                <span className="text-stone-400">•</span>
                <span>{artisan?.experience || "14 years craftsmanship"}</span>
                <span className="text-stone-400">•</span>
                <span className="font-semibold text-amber-700">⭐ {artisan?.rating || 4.9} ({artisan?.completed_b2b_orders || 28} B2B orders)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onOpenAddProduct}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold shadow-sm flex items-center justify-center gap-2 transition"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Product (AI Catalog)</span>
            </button>
          </div>
        </div>

        {/* 4 Core Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-stone-100">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">Catalog Products</div>
            <div className="text-2xl font-bold text-stone-900 mt-1">{products?.length || 3}</div>
            <div className="text-[11px] text-stone-500 mt-0.5">Digitized B2B items</div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 relative overflow-hidden">
            <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider flex items-center justify-between">
              <span>Current Opportunities</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            </div>
            <div className="text-2xl font-bold text-amber-900 mt-1">{opportunities?.length || 2}</div>
            <div className="text-[11px] text-amber-700 mt-0.5 font-medium">Qualified institutional leads</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">Active Quotations</div>
            <div className="text-2xl font-bold text-stone-900 mt-1">{activeQuotesCount}</div>
            <div className="text-[11px] text-stone-500 mt-0.5">{acceptedQuotesCount} confirmed orders</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">Monthly Capacity</div>
            <div className="text-2xl font-bold text-stone-900 mt-1">{artisan?.monthly_total_capacity || 500} <span className="text-sm font-normal text-stone-600">units</span></div>
            <div className="text-[11px] text-stone-500 mt-0.5">Kiln & workshop scale</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 space-x-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`pb-3 relative transition flex items-center gap-2 ${
            activeTab === 'opportunities'
              ? 'text-amber-700 font-bold border-b-2 border-amber-600'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>New Business Opportunities</span>
          {opportunities?.length > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-amber-600 text-white font-bold">
              {opportunities.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('capability')}
          className={`pb-3 relative transition flex items-center gap-2 ${
            activeTab === 'capability'
              ? 'text-amber-700 font-bold border-b-2 border-amber-600'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Gauge className="w-4 h-4" />
          <span>Artisan Capability Profile</span>
          <span className="px-2 py-0.5 text-xs rounded-full bg-stone-100 text-stone-600 font-semibold">
            B2B Ready
          </span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 relative transition flex items-center gap-2 ${
            activeTab === 'products'
              ? 'text-amber-700 font-bold border-b-2 border-amber-600'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Digitized Products ({products?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('quotations')}
          className={`pb-3 relative transition flex items-center gap-2 ${
            activeTab === 'quotations'
              ? 'text-amber-700 font-bold border-b-2 border-amber-600'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Submitted Quotations ({quotations?.length || 0})</span>
        </button>
      </div>

      {/* TAB 1: PROACTIVE BUSINESS OPPORTUNITIES */}
      {activeTab === 'opportunities' && (
        <div className="space-y-4">
          <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Demand Reaches the Artisan:</span> When institutional buyers post procurement needs, our AI engine automatically tests your workshop capacity, inventory, and lead time. Eligible opportunities appear below for direct quotation.
            </div>
          </div>

          {opportunities && opportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {opportunities.map((opp, idx) => {
                const req = opp.requirement;
                const isQuoted = opp.has_quoted;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border-2 border-amber-400/80 shadow-md p-6 relative overflow-hidden hover:shadow-lg transition"
                  >
                    {/* Top pill */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-wide">
                          ⚡ New Business Opportunity
                        </span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {opp.match_score}% Match Score
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-400">Jaipur Hub</span>
                    </div>

                    {/* Buyer Details */}
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-stone-900 font-serif">
                        {req.buyer_name || "Rajasthan Cafe Group"}
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Enterprise Procurement Request #{req.id?.slice(0, 10)}
                      </p>
                    </div>

                    {/* Requirement Specs Grid */}
                    <div className="bg-stone-50 rounded-xl p-4 grid grid-cols-2 gap-3 text-xs border border-stone-200/80 mb-5">
                      <div>
                        <span className="text-stone-500 block">Needs Product:</span>
                        <span className="font-semibold text-stone-900">{req.product_name}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Quantity Needed:</span>
                        <span className="font-bold text-amber-700">{req.quantity} units</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Target Budget:</span>
                        <span className="font-semibold text-stone-900">₹{req.max_budget_per_unit} / unit</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Required Deadline:</span>
                        <span className="font-semibold text-stone-900">{req.deadline_days} days</span>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-stone-200">
                        <span className="text-stone-500 block">Customization:</span>
                        <span className="text-stone-800 font-medium">
                          {req.customization_spec || "Logo branding / stamped insignia required"}
                        </span>
                      </div>
                    </div>

                    {/* Capacity Feasibility Note */}
                    <div className="text-[11px] text-stone-600 bg-emerald-50/80 border border-emerald-200 p-2.5 rounded-lg mb-5 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>
                        Your workshop can fulfill this: <strong>{opp.matched_product?.available_now || 50} units ready now</strong> + remainder produced in ~13 days.
                      </span>
                    </div>

                    {/* Action button */}
                    <div className="flex items-center justify-between pt-2">
                      {isQuoted ? (
                        <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200 w-full justify-center">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Quotation Submitted (₹{opp.quotation?.unit_price}/unit) — Awaiting Buyer</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => onOpenOpportunity(opp)}
                          className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 shadow-sm"
                        >
                          <span>View Opportunity & Submit Quotation</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
              <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="font-bold text-stone-800">No Open Opportunities Right Now</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                As soon as a buyer posts a requirement matching your craft capabilities, you will receive an instant notification here.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ARTISAN CAPABILITY PROFILE */}
      {activeTab === 'capability' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-stone-900 font-serif">Artisan Capability Matrix</h2>
                <p className="text-xs text-stone-500 mt-1">
                  Unlike traditional consumer marketplaces, CraftConnect represents what you can <strong>produce over time</strong>, not just shelf inventory.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> B2B Verified Capacity
                </span>
              </div>
            </div>

            {/* Capability Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50 text-stone-600 uppercase font-semibold text-[11px]">
                    <th className="py-3 px-4">Product & Craft</th>
                    <th className="py-3 px-4 bg-emerald-50/60 text-emerald-900 border-x border-emerald-100">
                      Available Now (Ready)
                    </th>
                    <th className="py-3 px-4 bg-amber-50/60 text-amber-900 border-r border-amber-100">
                      Monthly Capacity (Runway)
                    </th>
                    <th className="py-3 px-4">MOQ</th>
                    <th className="py-3 px-4">Indicative Price</th>
                    <th className="py-3 px-4">Lead Time</th>
                    <th className="py-3 px-4">Custom Branding</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-stone-50/50 transition">
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
                      <td className="py-3.5 px-4 bg-emerald-50/30 border-x border-emerald-100">
                        <span className="font-bold text-emerald-800 text-sm">{prod.available_now || 50} units</span>
                        <div className="text-[10px] text-emerald-600">Immediate dispatch</div>
                      </td>
                      <td className="py-3.5 px-4 bg-amber-50/30 border-r border-amber-100">
                        <span className="font-bold text-amber-800 text-sm">{prod.monthly_capacity || 300} units</span>
                        <div className="text-[10px] text-amber-700">Workshop scale rate</div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-stone-700">
                        {prod.moq || 50} units
                      </td>
                      <td className="py-3.5 px-4 font-bold text-stone-900">
                        ₹{prod.price} <span className="text-[10px] font-normal text-stone-500">/unit</span>
                      </td>
                      <td className="py-3.5 px-4 text-stone-600">
                        {prod.lead_time_days || 15} days
                      </td>
                      <td className="py-3.5 px-4">
                        {prod.customization_available ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            ✓ {prod.customization_details?.slice(0, 26) || "Logo stamping"}...
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
            <div className="mt-6 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Why this capability profile matters:</strong> If a buyer needs 200 cups, a standard marketplace displays "Out of Stock" because you have only 50 cups today. CraftConnect calculates that your workshop produces 300 cups/month (~12 cups/day), so you can comfortably fulfill 200 units within 15 days!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DIGITIZED PRODUCTS LIST */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900 font-serif">Artisan Digitized Product Line</h2>
            <button
              onClick={onOpenAddProduct}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add New Product</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 w-full relative overflow-hidden bg-stone-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-stone-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {product.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                      {product.material}
                    </div>
                    <h3 className="font-bold text-stone-900 text-base mt-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Stock & Capacity pill */}
                    <div className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-stone-50 p-2 rounded-lg">
                        <span className="text-[10px] text-stone-500 block">Available Now:</span>
                        <span className="font-bold text-stone-900">{product.available_now || 50} units</span>
                      </div>
                      <div className="bg-amber-50/70 p-2 rounded-lg">
                        <span className="text-[10px] text-amber-800 block">Monthly Capacity:</span>
                        <span className="font-bold text-amber-900">{product.monthly_capacity || 300} units</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {(product.tags || []).slice(0, 4).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-stone-500">Indicative: </span>
                    <span className="font-bold text-stone-900 text-sm">₹{product.price}</span>
                    <span className="text-stone-400"> / MOQ {product.moq}</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Lead: {product.lead_time_days || 15}d
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SUBMITTED QUOTATIONS */}
      {activeTab === 'quotations' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-stone-900 font-serif">Submitted B2B Quotations</h2>
          {quotations && quotations.length > 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase font-semibold text-[11px]">
                    <th className="py-3.5 px-4">Quote ID</th>
                    <th className="py-3.5 px-4">Buyer & Requirement</th>
                    <th className="py-3.5 px-4">Offered Price</th>
                    <th className="py-3.5 px-4">Total Amount</th>
                    <th className="py-3.5 px-4">Delivery Timeline</th>
                    <th className="py-3.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {quotations.map((q) => (
                    <tr key={q.id} className="hover:bg-stone-50/50">
                      <td className="py-3 px-4 font-mono font-bold text-stone-800">#{q.id?.slice(0, 10)}</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-stone-900">{q.buyer_name || "Rajasthan Cafe Group"}</div>
                        <div className="text-[11px] text-stone-500">{q.product_name} • {q.quantity} units</div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-stone-800">₹{q.unit_price} / unit</td>
                      <td className="py-3 px-4 font-bold text-stone-900 text-sm">₹{q.total_amount?.toLocaleString() || (q.unit_price * q.quantity)}</td>
                      <td className="py-3 px-4 text-stone-600">{q.delivery_days || 15} days</td>
                      <td className="py-3 px-4">
                        {q.status === 'ACCEPTED' ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            ✓ CONFIRMED ORDER
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            PENDING BUYER REVIEW
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-10 text-center text-xs text-stone-500">
              No quotations submitted yet. When you receive an opportunity, submit your bid to see it here!
            </div>
          )}
        </div>
      )}
    </div>
  );
}

