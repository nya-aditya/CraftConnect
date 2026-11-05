import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, ShieldCheck, Award, Calendar, DollarSign, ArrowRight, Package } from 'lucide-react';
import { api } from '../api';

export default function QuotationReviewModal({ quotation, onClose, onOrderConfirmed }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const handleAccept = async () => {
    setIsProcessing(true);
    try {
      const res = await api.updateQuotationStatus(quotation.id, 'ACCEPTED');
      if (res.success && res.order) {
        setConfirmedOrder(res.order);
        onOrderConfirmed(res.order);
      }
    } catch (err) {
      console.error("Failed to accept quotation:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    setIsProcessing(true);
    try {
      await api.updateQuotationStatus(quotation.id, 'REJECTED');
      onClose();
    } catch (err) {
      console.error("Failed to reject quotation:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className={`px-6 py-4 text-white flex items-center justify-between border-b ${
          confirmedOrder ? 'bg-emerald-700 border-emerald-800' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center space-x-2">
            {confirmedOrder ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            ) : (
              <Award className="w-5 h-5 text-amber-400" />
            )}
            <div>
              <h2 className="font-bold text-base font-serif">
                {confirmedOrder ? "🎉 Business Opportunity Confirmed!" : "Review Artisan Quotation"}
              </h2>
              <p className="text-[11px] text-stone-300">
                {confirmedOrder ? "B2B Production Contract Executed" : "Official Bid from Verified Master Craftsman"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-stone-300 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {!confirmedOrder ? (
            <>
              {/* Artisan Profile Card */}
              <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-600 text-white font-bold flex items-center justify-center text-lg">
                    🏺
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-stone-900 font-serif flex items-center gap-1.5">
                      {quotation.artisan_name}
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </h3>
                    <p className="text-xs text-stone-500">Jaipur, Rajasthan • Master Pottery Workshop</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block font-bold uppercase">Credibility</span>
                  <span className="font-bold text-amber-700 text-xs">⭐ 4.9 (28 orders)</span>
                </div>
              </div>

              {/* Quotation Key Terms Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-amber-50/60 p-4 rounded-xl border border-amber-200">
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Quoted Unit Price</span>
                  <span className="text-xl font-extrabold text-stone-900">₹{quotation.unit_price}</span>
                  <span className="text-[10px] text-stone-400 block">/ unit</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Total Deal Amount</span>
                  <span className="text-xl font-extrabold text-emerald-700">₹{quotation.total_amount?.toLocaleString() || (quotation.unit_price * quotation.quantity)}</span>
                  <span className="text-[10px] text-emerald-600 font-medium block">Under Budget ✓</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Committed Delivery</span>
                  <span className="text-xl font-extrabold text-stone-900">{quotation.delivery_days}</span>
                  <span className="text-[10px] text-stone-500 block">Days (Ahead of deadline)</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Quantity</span>
                  <span className="text-xl font-extrabold text-stone-900">{quotation.quantity}</span>
                  <span className="text-[10px] text-stone-400 block">Units</span>
                </div>
              </div>

              {/* Customization Details */}
              <div className="space-y-3">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-800 block mb-1">Customization Commitment:</span>
                  <p className="text-stone-700 leading-relaxed">
                    {quotation.customization_notes || "Will stamp Rajasthan Cafe Group emblem on the base of each cup."}
                  </p>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-800 block mb-1">Message from Master Artisan:</span>
                  <p className="text-stone-600 italic leading-relaxed">
                    "{quotation.artisan_message || "We have 50 units in stock and can kiln-fire 150 units in our Jaipur workshop within 12 days."}"
                  </p>
                </div>
              </div>
            </>
          ) : (
            /* ORDER CONFIRMATION VIEW */
            <div className="space-y-6 animate-fadeIn">
              <div className="p-5 bg-emerald-50 rounded-2xl border-2 border-emerald-400 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-emerald-950 font-serif">
                  Business Opportunity Confirmed & Linked!
                </h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  A direct B2B contract has been formed between <strong>{quotation.buyer_name}</strong> and <strong>{quotation.artisan_name}</strong>.
                </p>
                <div className="inline-block font-mono text-xs font-bold text-stone-800 bg-white px-3 py-1 rounded-full border border-emerald-300 mt-2">
                  Work Order: #{confirmedOrder.order_number}
                </div>
              </div>

              {/* Order Summary Grid */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Product</span>
                  <span className="font-bold text-stone-900">{confirmedOrder.product_name}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Quantity</span>
                  <span className="font-bold text-stone-900">{confirmedOrder.quantity} units</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Total Contract Value</span>
                  <span className="font-extrabold text-emerald-700 text-sm">₹{confirmedOrder.total_amount?.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Target Delivery</span>
                  <span className="font-bold text-stone-900">{confirmedOrder.delivery_days} days</span>
                </div>
              </div>

              {/* Scheduled Milestones */}
              <div>
                <h4 className="font-bold text-stone-800 uppercase tracking-wider text-[11px] mb-2">
                  Contract Milestones & Quality Assurance
                </h4>
                <div className="space-y-2">
                  {(confirmedOrder.milestones || []).map((m, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-stone-200 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-600 font-bold flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        <span className="font-medium text-stone-800">{m.name}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {m.target_days || m.date || 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          {!confirmedOrder ? (
            <>
              <button
                onClick={handleReject}
                disabled={isProcessing}
                className="px-4 py-2 rounded-xl text-rose-700 hover:bg-rose-50 font-semibold text-xs transition"
              >
                Reject Quotation
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 font-medium text-xs transition"
                >
                  Close
                </button>

                <button
                  onClick={handleAccept}
                  disabled={isProcessing}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Accept Quotation & Confirm Deal</span>
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition"
            >
              Return to Buyer Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

