import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import DemoTourBar from './components/DemoTourBar';
import LandingPage from './components/LandingPage';
import ArtisanDashboard from './components/ArtisanDashboard';
import BuyerDashboard from './components/BuyerDashboard';
import AddProductModal from './components/AddProductModal';
import CreateRequirementModal from './components/CreateRequirementModal';
import MatchResultsModal from './components/MatchResultsModal';
import ArtisanQuotationModal from './components/ArtisanQuotationModal';
import QuotationReviewModal from './components/QuotationReviewModal';
import { api } from './api';

export default function App() {
  const [activeView, setActiveView] = useState('landing'); // 'landing', 'artisan', 'buyer'
  const [demoStep, setDemoStep] = useState(1);
  const [isResetting, setIsResetting] = useState(false);

  // Core Data
  const [artisans, setArtisans] = useState([]);
  const [activeArtisan, setActiveArtisan] = useState(null);
  const [products, setProducts] = useState([]);

  const [buyers, setBuyers] = useState([]);
  const [activeBuyer, setActiveBuyer] = useState(null);
  const [requirements, setRequirements] = useState([]);

  const [opportunities, setOpportunities] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [orders, setOrders] = useState([]);

  // Modals & Selected items
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isCreateReqOpen, setIsCreateReqOpen] = useState(false);

  const [selectedReqForMatch, setSelectedReqForMatch] = useState(null);
  const [activeMatches, setActiveMatches] = useState([]);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);

  const [selectedOppForQuote, setSelectedOppForQuote] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const [selectedQuoteForReview, setSelectedQuoteForReview] = useState(null);
  const [isReviewQuoteOpen, setIsReviewQuoteOpen] = useState(false);

  // Load Initial Data
  const refreshAllData = useCallback(async () => {
    try {
      const [artRes, buyRes, reqRes, quoteRes, orderRes] = await Promise.all([
        api.getArtisans(),
        api.getBuyers(),
        api.getRequirements(),
        api.getQuotations(),
        api.getOrders()
      ]);

      if (artRes.success && artRes.data.length > 0) {
        setArtisans(artRes.data);
        const currentArt = activeArtisan || artRes.data[0];
        setActiveArtisan(currentArt);

        const [prodRes, oppRes] = await Promise.all([
          api.getProducts(currentArt.id),
          api.getOpportunities(currentArt.id)
        ]);

        if (prodRes.success) setProducts(prodRes.data);
        if (oppRes.success) setOpportunities(oppRes.data);
      }

      if (buyRes.success && buyRes.data.length > 0) {
        setBuyers(buyRes.data);
        const currentBuy = activeBuyer || buyRes.data[0];
        setActiveBuyer(currentBuy);
      }

      if (reqRes.success) setRequirements(reqRes.data);
      if (quoteRes.success) setQuotations(quoteRes.data);
      if (orderRes.success) setOrders(orderRes.data);
    } catch (err) {
      console.error("Error refreshing platform data:", err);
    }
  }, [activeArtisan, activeBuyer]);

  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  // Handle Demo Reset
  const handleResetDemo = async () => {
    setIsResetting(true);
    try {
      await api.resetDemoData();
      setIsAddProductOpen(false);
      setIsCreateReqOpen(false);
      setIsMatchModalOpen(false);
      setIsQuoteModalOpen(false);
      setIsReviewQuoteOpen(false);
      setDemoStep(1);
      setActiveView('artisan');
      await refreshAllData();
    } catch (err) {
      console.error("Reset failed:", err);
    } finally {
      setIsResetting(false);
    }
  };

  // Run matching on a requirement
  const handleRunMatch = async (reqItem) => {
    try {
      setSelectedReqForMatch(reqItem);
      const res = await api.runMatching(reqItem.id);
      if (res.success && res.data) {
        setActiveMatches(res.data);
        setIsMatchModalOpen(true);
      }
    } catch (err) {
      console.error("Match error:", err);
    }
  };

  // Step Navigator for 2-3 minute Judge Tour
  const handleSelectDemoStep = async (stepId) => {
    setDemoStep(stepId);

    // Close any floating modal first
    setIsAddProductOpen(false);
    setIsCreateReqOpen(false);
    setIsMatchModalOpen(false);
    setIsQuoteModalOpen(false);
    setIsReviewQuoteOpen(false);

    if (stepId === 1) {
      // Step 1: Artisan View
      setActiveView('artisan');
    } else if (stepId === 2) {
      // Step 2: Add Product & AI Catalog
      setActiveView('artisan');
      setIsAddProductOpen(true);
    } else if (stepId === 3) {
      // Step 3: Capability Profile
      setActiveView('artisan');
    } else if (stepId === 4) {
      // Step 4: Buyer Requirement
      setActiveView('buyer');
      setIsCreateReqOpen(true);
    } else if (stepId === 5) {
      // Step 5: Smart Matching
      setActiveView('buyer');
      if (requirements.length > 0) {
        await handleRunMatch(requirements[0]);
      }
    } else if (stepId === 6) {
      // Step 6: Opportunity & Quotation
      setActiveView('artisan');
      if (opportunities.length > 0) {
        setSelectedOppForQuote(opportunities[0]);
        setIsQuoteModalOpen(true);
      }
    } else if (stepId === 7) {
      // Step 7: Order Confirmed & Review
      setActiveView('buyer');
      if (quotations.length > 0) {
        setSelectedQuoteForReview(quotations[0]);
        setIsReviewQuoteOpen(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col font-sans text-stone-900">
      {/* 2-Minute Demo Navigator Toolbar */}
      <DemoTourBar
        currentStep={demoStep}
        onSelectStep={handleSelectDemoStep}
        onReset={handleResetDemo}
        isResetting={isResetting}
      />

      {/* Main Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        opportunityCount={opportunities.length}
        activeArtisan={activeArtisan}
        activeBuyer={activeBuyer}
      />

      {/* View Switcher */}
      <main className="flex-1">
        {activeView === 'landing' && (
          <LandingPage
            onSelectRole={(role) => {
              setActiveView(role);
              setDemoStep(role === 'artisan' ? 1 : 4);
            }}
            onStartDemo={() => handleSelectDemoStep(1)}
          />
        )}

        {activeView === 'artisan' && (
          <ArtisanDashboard
            artisan={activeArtisan}
            products={products}
            opportunities={opportunities}
            quotations={quotations}
            onOpenAddProduct={() => setIsAddProductOpen(true)}
            onOpenOpportunity={(opp) => {
              setSelectedOppForQuote(opp);
              setIsQuoteModalOpen(true);
            }}
            onViewCapabilityDetails={() => {}}
          />
        )}

        {activeView === 'buyer' && (
          <BuyerDashboard
            buyer={activeBuyer}
            requirements={requirements}
            quotations={quotations}
            orders={orders}
            onOpenCreateRequirement={() => setIsCreateReqOpen(true)}
            onViewMatches={handleRunMatch}
            onReviewQuotation={(quote) => {
              setSelectedQuoteForReview(quote);
              setIsReviewQuoteOpen(true);
            }}
          />
        )}
      </main>

      {/* MODAL 1: ADD PRODUCT & AI CATALOG */}
      {isAddProductOpen && (
        <AddProductModal
          artisan={activeArtisan}
          onClose={() => setIsAddProductOpen(false)}
          onProductCreated={() => {
            refreshAllData();
          }}
        />
      )}

      {/* MODAL 2: CREATE REQUIREMENT */}
      {isCreateReqOpen && (
        <CreateRequirementModal
          buyer={activeBuyer}
          onClose={() => setIsCreateReqOpen(false)}
          onRequirementCreated={() => {
            refreshAllData();
          }}
          onRunMatchImmediately={(createdReq) => {
            handleRunMatch(createdReq);
          }}
        />
      )}

      {/* MODAL 3: SMART MATCH RESULTS */}
      {isMatchModalOpen && (
        <MatchResultsModal
          requirement={selectedReqForMatch}
          matches={activeMatches}
          onClose={() => setIsMatchModalOpen(false)}
          onNotifyArtisan={async (artisanId, req) => {
            // Re-fetch opportunities to simulate push notification
            await refreshAllData();
          }}
        />
      )}

      {/* MODAL 4: ARTISAN QUOTATION & OPPORTUNITY RESPONSE */}
      {isQuoteModalOpen && selectedOppForQuote && (
        <ArtisanQuotationModal
          opportunity={selectedOppForQuote}
          artisan={activeArtisan}
          onClose={() => setIsQuoteModalOpen(false)}
          onQuotationSubmitted={async () => {
            await refreshAllData();
            // Move to Step 7 on quotation submission
            setDemoStep(7);
          }}
        />
      )}

      {/* MODAL 5: BUYER QUOTATION REVIEW & ORDER CONFIRMATION */}
      {isReviewQuoteOpen && selectedQuoteForReview && (
        <QuotationReviewModal
          quotation={selectedQuoteForReview}
          onClose={() => setIsReviewQuoteOpen(false)}
          onOrderConfirmed={async () => {
            await refreshAllData();
          }}
        />
      )}

      {/* Footer */}
      <footer className="bg-white/70 border-t border-stone-200/80 py-5 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2 font-serif font-bold text-stone-900">
            <span>🏺 CraftConnect</span>
            <span className="font-normal font-sans text-stone-400">| AI B2B Capability Linkage</span>
          </div>
          <div className="text-stone-500">
            Connecting what artisans can produce with what businesses actually need.
          </div>
          <div className="text-stone-400 text-[11px]">
            Hackathon MVP • Demo-Ready Prototype
          </div>
        </div>
      </footer>
    </div>
  );
}

