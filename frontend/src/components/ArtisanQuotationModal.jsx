import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, Send, Sparkles, Building2, Calendar, FileText, ArrowRight } from 'lucide-react';
import { api } from '../api';

export default function ArtisanQuotationModal({ opportunity, artisan, onClose, onQuotationSubmitted }) {
  const req = opportunity.requirement;
  const prod = opportunity.matched_product;

  const [decision, setDecision] = useState(null); // 'fulfill' or 'reject'
  const [unitPrice, setUnitPrice] = useState(prod?.price || 120);
  const [deliveryDays, setDeliveryDays] = useState(prod?.lead_time_days || 15);
  const [customizationNotes, setCustomizationNotes] = useState(
    "Will emboss Rajasthan Cafe Group emblem on the base of each cup using custom brass stamp."
  );
  const [message, setMessage] = useState(
    "We have 50 units already cured and dried in our Jaipur workshop. We will shape, glaze and kiln-fire the remaining 150 units over 12 days to guarantee premium commercial durability."
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = unitPrice * (req?.quantity || 200);

  const handleSubmitQuotation = async () => {
    setIsSubmitting(true);
    try {
      const quotePayload = {
        requirement_id: req.id,
        buyer_id: req.buyer_id,
        buyer_name: req.buyer_name || "Rajasthan Cafe Group",
        artisan_id: artisan?.id || "artisan_1",
        artisan_name: artisan?.name || "Meera Handicrafts",
        product_id: prod?.product_id || prod?.id,
        product_name: req.product_name,
        quantity: req.quantity,
        unit_price: Number(unitPrice),
        total_amount: Number(totalPrice),
        delivery_days: Number(deliveryDays),
        customization_notes: customizationNotes,
        artisan_message: message
      };

      const res = await api.submitQuotation(quotePayload);
      if (res.success && res.data) {
        onQuotationSubmitted(res.data);
        onClose();
      }
    } catch (err) {
      console.error("Failed to submit quotation:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-amber-700 text-white flex items-center justify-between border-b border-amber-800">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <div>
              <h2 className="font-bold text-base font-serif">Proactive Business Opportunity</h2>
              <p className="text-[11px] text-amber-100">Demand Has Reached Your Workshop Directly</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-amber-800 text-amber-200 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Buyer Request Card */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Buyer Organization</span>
                <h3 className="text-base font-bold text-stone-900 font-serif">{req?.buyer_name || "Rajasthan Cafe Group"}</h3>
                <p className="text-xs text-stone-500">Destination: {req?.delivery_location || "Jaipur, Rajasthan"}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">AI Capability Match</span>
                <div className="text-xl font-extrabold text-emerald-700">{opportunity?.match_score || 94}% Fit</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3 rounded-xl border border-stone-200">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Product</span>
                <span className="font-bold text-stone-900">{req?.product_name}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Quantity</span>
                <span className="font-bold text-amber-700">{req?.quantity} units</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Buyer Budget</span>
                <span className="font-bold text-stone-900">₹{req?.max_budget_per_unit} / unit</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Deadline</span>
                <span className="font-bold text-stone-900">{req?.deadline_days} days</span>
              </div>
            </div>

            <div className="text-stone-700 text-xs bg-amber-50/60 p-3 rounded-xl border border-amber-200">
              <span className="font-bold text-stone-900">Buyer Customization Note: </span>
              {req?.customization_spec || "Laser or stamped logo of Rajasthan Cafe Group"}
            </div>
          </div>

          {/* Decision Stage */}
          {decision === null && (
            <div className="text-center py-4 space-y-4">
              <h4 className="text-sm font-bold text-stone-800">
                Can your workshop fulfill this order within the requested timeline?
              </h4>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setDecision('fulfill')}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>I Can Fulfil (Submit Quotation)</span>
                </button>

                <button
                  onClick={() => setDecision('reject')}
                  className="px-6 py-3 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 font-semibold text-xs transition flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Cannot Fulfil</span>
                </button>
              </div>
            </div>
          )}

          {decision === 'reject' && (
            <div className="p-4 bg-stone-100 rounded-xl text-center text-xs text-stone-600">
              You marked this opportunity as unavailable. The platform will look for alternative opportunities matching your workshop timeline.
              <div className="mt-3">
                <button onClick={() => setDecision(null)} className="text-amber-800 font-semibold underline">
                  Go Back
                </button>
              </div>
            </div>
          )}

          {/* Quotation Form */}
          {decision === 'fulfill' && (
            <div className="space-y-4 border-2 border-emerald-400 bg-emerald-50/20 p-5 rounded-2xl animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                <span className="font-bold text-emerald-900 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Artisan Quotation Proposal
                </span>
                <span className="text-[10px] text-stone-500">Official B2B Bid</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Your Quoted Price per Unit
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-stone-400 font-semibold">₹</span>
                    <input
                      type="number"
                      value={unitPrice}
                      onChange={(e) => setUnitPrice(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 border border-stone-300 rounded-xl text-xs font-bold text-stone-900"
                    />
                  </div>
                  <span className="text-[10px] text-stone-500 mt-0.5 block">
                    Buyer max budget: ₹{req?.max_budget_per_unit}
                  </span>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Total Order Value (Calculated)
                  </label>
                  <div className="px-3 py-2 bg-stone-100 border border-stone-300 rounded-xl font-extrabold text-stone-900 text-sm">
                    ₹{totalPrice.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-stone-500 mt-0.5 block">
                    For {req?.quantity} units
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Delivery Lead Time (Days)
                  </label>
                  <input
                    type="number"
                    value={deliveryDays}
                    onChange={(e) => setDeliveryDays(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-semibold"
                  />
                  <span className="text-[10px] text-stone-500 mt-0.5 block">
                    Buyer deadline: {req?.deadline_days} days
                  </span>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Customization Commitment
                  </label>
                  <input
                    type="text"
                    value={customizationNotes}
                    onChange={(e) => setCustomizationNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  Artisan Message to Procurement Manager
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs leading-relaxed"
                />
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

          {decision === 'fulfill' && (
            <button
              onClick={handleSubmitQuotation}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>Submit Quotation to Buyer</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

