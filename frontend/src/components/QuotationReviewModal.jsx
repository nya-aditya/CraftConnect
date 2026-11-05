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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-stone-200/90 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-stone-200/80 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-base font-serif text-stone-900">
              {confirmedOrder ? "Opportunity Confirmed" : "Review Artisan Quotation"}
            </h2>
            <p className="text-[11px] text-stone-500">
              {confirmedOrder ? "Direct B2B manufacturing contract executed" : "Official proposal from verified artisan"}
            </p>
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
          {!confirmedOrder ? (
            <>
              {/* Artisan Profile Card */}
              <div className="flex items-center justify-between p-4 bg-[#faf9f6] rounded-2xl border border-stone-200/70">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-xl bg-stone-900 text-stone-100 font-bold flex items-center justify-center text-lg shadow-sm">
                    🏺
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 font-serif flex items-center gap-1.5">
                      {quotation.artisan_name}
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </h3>
                    <p className="text-xs text-stone-500">Jaipur, Rajasthan • Master Pottery Workshop</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block uppercase font-medium">Rating</span>
                  <span className="font-semibold text-stone-700 text-xs">⭐ 4.9 (28 orders)</span>
                </div>
              </div>

              {/* Quotation Terms */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#faf9f6] p-3.5 rounded-xl border border-stone-200/70">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-medium">Offered Price</span>
                  <span className="text-lg font-bold text-stone-900">₹{quotation.unit_price}</span>
                  <span className="text-[10px] text-stone-400 block">/ unit</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-medium">Total Deal</span>
                  <span className="text-lg font-bold text-stone-900">₹{quotation.total_amount?.toLocaleString() || (quotation.unit_price * quotation.quantity)}</span>
                  <span className="text-[10px] text-emerald-700 font-medium block">Under Budget ✓</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-medium">Lead Time</span>
                  <span className="text-lg font-bold text-stone-900">{quotation.delivery_days}</span>
                  <span className="text-[10px] text-stone-400 block">Days</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-medium">Quantity</span>
                  <span className="text-lg font-bold text-stone-900">{quotation.quantity}</span>
                  <span className="text-[10px] text-stone-400 block">Units</span>
                </div>
              </div>

              {/* Customization Details */}
              <div className="space-y-2.5">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70">
                  <span className="font-medium text-stone-800 block mb-0.5">Customization Commitment:</span>
                  <p className="text-stone-600 leading-relaxed">
                    {quotation.customization_notes || "Will stamp emblem on base."}
                  </p>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70">
                  <span className="font-medium text-stone-800 block mb-0.5">Artisan Message:</span>
                  <p className="text-stone-600 italic leading-relaxed">
                    "{quotation.artisan_message || "We have 50 units in stock and will kiln-fire 150 units in our Jaipur workshop within 12 days."}"
                  </p>
                </div>
              </div>
            </>
          ) : (
            /* ORDER CONFIRMATION VIEW */
            <div className="space-y-5 animate-fadeIn">
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center mx-auto text-base font-bold">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-stone-900 font-serif">
                  Business Opportunity Confirmed
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  A direct B2B contract is now linked between <strong>{quotation.buyer_name}</strong> and <strong>{quotation.artisan_name}</strong>.
                </p>
                <div className="inline-block font-mono text-xs font-medium text-stone-700 bg-white px-3 py-1 rounded-full border border-stone-200 mt-1">
                  Order #{confirmedOrder.order_number}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-[#faf9f6] p-3.5 rounded-xl border border-stone-200/70 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-medium">Product</span>
                  <span className="font-semibold text-stone-900">{confirmedOrder.product_name}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-medium">Quantity</span>
                  <span className="font-semibold text-stone-900">{confirmedOrder.quantity} units</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-medium">Total Contract</span>
                  <span className="font-bold text-stone-900 text-sm">₹{confirmedOrder.total_amount?.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-medium">Timeline</span>
                  <span className="font-semibold text-stone-900">{confirmedOrder.delivery_days} days</span>
                </div>
              </div>

              {/* Milestones */}
              <div>
                <h4 className="font-semibold text-stone-700 text-xs mb-2">
                  Production Milestones
                </h4>
                <div className="space-y-1.5">
                  {(confirmedOrder.milestones || []).map((m, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-200/60 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-white border border-stone-200 text-stone-600 font-medium flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        <span className="text-stone-800">{m.name}</span>
                      </div>
                      <span className="text-[11px] text-stone-500 font-medium">
                        {m.target_days || m.date || 'Scheduled'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50/80 border-t border-stone-200/80 flex items-center justify-between">
          {!confirmedOrder ? (
            <>
              <button
                onClick={handleReject}
                disabled={isProcessing}
                className="px-4 py-2 rounded-xl text-stone-500 hover:text-stone-800 font-medium text-xs transition"
              >
                Decline
              </button>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 font-medium text-xs transition"
                >
                  Close
                </button>

                <button
                  onClick={handleAccept}
                  disabled={isProcessing}
                  className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Accept Quotation & Confirm</span>
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-100 font-medium text-xs shadow-sm transition"
            >
              Return to Buyer Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
