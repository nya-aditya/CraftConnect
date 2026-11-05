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
    "We have 50 units already cured in our Jaipur workshop. We will shape, glaze and kiln-fire the remaining 150 units over 12 days."
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-stone-200/90 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-stone-200/80 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-base font-serif text-stone-900">Review Opportunity & Submit Bid</h2>
            <p className="text-[11px] text-stone-500">Verified buyer procurement request</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          {/* Buyer Request Card */}
          <div className="bg-[#faf9f6] rounded-2xl p-4 border border-stone-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-medium text-stone-400">Buyer</span>
                <h3 className="text-base font-bold text-stone-900 font-serif">{req?.buyer_name || "Rajasthan Cafe Group"}</h3>
                <p className="text-xs text-stone-500">Destination: {req?.delivery_location || "Jaipur, Rajasthan"}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-medium text-stone-400">Fit Score</span>
                <div className="text-lg font-bold text-stone-900">{opportunity?.match_score || 94}%</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-3 rounded-xl border border-stone-200/80">
              <div>
                <span className="text-stone-400 block text-[10px]">Product</span>
                <span className="font-semibold text-stone-900">{req?.product_name}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Quantity</span>
                <span className="font-semibold text-stone-900">{req?.quantity} units</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Target Budget</span>
                <span className="font-semibold text-stone-900">₹{req?.max_budget_per_unit} / unit</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Deadline</span>
                <span className="font-semibold text-stone-900">{req?.deadline_days} days</span>
              </div>
            </div>

            <div className="text-stone-700 text-xs bg-white p-2.5 rounded-lg border border-stone-200/60">
              <span className="font-semibold text-stone-900">Customization: </span>
              {req?.customization_spec || "Laser or stamped logo"}
            </div>
          </div>

          {/* Decision Buttons */}
          {decision === null && (
            <div className="text-center py-4 space-y-3">
              <p className="text-xs font-medium text-stone-700">
                Can your workshop fulfill this requirement within the deadline?
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setDecision('fulfill')}
                  className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs shadow-sm transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>I Can Fulfil (Submit Quotation)</span>
                </button>

                <button
                  onClick={() => setDecision('reject')}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-xs transition"
                >
                  <span>Cannot Fulfil</span>
                </button>
              </div>
            </div>
          )}

          {decision === 'reject' && (
            <div className="p-4 bg-stone-50 rounded-xl text-center text-xs text-stone-600 border border-stone-200">
              Opportunity dismissed. You will receive alternative requests when buyers submit matching needs.
              <div className="mt-2">
                <button onClick={() => setDecision(null)} className="text-stone-900 font-medium underline">
                  Back
                </button>
              </div>
            </div>
          )}

          {/* Quotation Form */}
          {decision === 'fulfill' && (
            <div className="space-y-4 border border-stone-200 bg-[#faf9f6] p-4.5 rounded-2xl animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="font-semibold text-stone-900 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Your Quotation Proposal
                </span>
                <span className="text-[10px] text-stone-400">Formal B2B Offer</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-stone-700 block mb-1">
                    Offered Price per Unit
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-stone-400 font-semibold">₹</span>
                    <input
                      type="number"
                      value={unitPrice}
                      onChange={(e) => setUnitPrice(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 border border-stone-200 rounded-lg text-xs font-semibold text-stone-900 bg-white"
                    />
                  </div>
                  <span className="text-[10px] text-stone-400 mt-0.5 block">
                    Buyer budget: ₹{req?.max_budget_per_unit}
                  </span>
                </div>

                <div>
                  <label className="font-medium text-stone-700 block mb-1">
                    Total Order Value
                  </label>
                  <div className="px-3 py-1.5 bg-white border border-stone-200 rounded-lg font-bold text-stone-900 text-xs">
                    ₹{totalPrice.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-0.5 block">
                    For {req?.quantity} units
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-stone-700 block mb-1">
                    Delivery Timeline (Days)
                  </label>
                  <input
                    type="number"
                    value={deliveryDays}
                    onChange={(e) => setDeliveryDays(e.target.value)}
                    className="w-full px-3 py-1.5 border border-stone-200 rounded-lg text-xs bg-white"
                  />
                  <span className="text-[10px] text-stone-400 mt-0.5 block">
                    Buyer deadline: {req?.deadline_days} days
                  </span>
                </div>

                <div>
                  <label className="font-medium text-stone-700 block mb-1">
                    Customization Notes
                  </label>
                  <input
                    type="text"
                    value={customizationNotes}
                    onChange={(e) => setCustomizationNotes(e.target.value)}
                    className="w-full px-3 py-1.5 border border-stone-200 rounded-lg text-xs bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-stone-700 block mb-1">
                  Message to Buyer
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-1.5 border border-stone-200 rounded-lg text-xs leading-relaxed bg-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50/80 border-t border-stone-200/80 flex items-center justify-between">
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
              className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Quotation</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
