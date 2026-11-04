const API_BASE = '/api';

export const api = {
  // Artisans
  getArtisans: async () => {
    const res = await fetch(`${API_BASE}/artisans`);
    return res.json();
  },
  getArtisan: async (id) => {
    const res = await fetch(`${API_BASE}/artisans/${id}`);
    return res.json();
  },

  // Products
  getProducts: async (artisanId) => {
    const url = artisanId ? `${API_BASE}/products?artisan_id=${artisanId}` : `${API_BASE}/products`;
    const res = await fetch(url);
    return res.json();
  },
  addProduct: async (product) => {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    return res.json();
  },

  // AI Catalog Generation
  generateCatalog: async (input) => {
    const res = await fetch(`${API_BASE}/catalog/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });
    return res.json();
  },

  // Buyers
  getBuyers: async () => {
    const res = await fetch(`${API_BASE}/buyers`);
    return res.json();
  },
  getBuyer: async (id) => {
    const res = await fetch(`${API_BASE}/buyers/${id}`);
    return res.json();
  },

  // Requirements
  getRequirements: async (buyerId) => {
    const url = buyerId ? `${API_BASE}/requirements?buyer_id=${buyerId}` : `${API_BASE}/requirements`;
    const res = await fetch(url);
    return res.json();
  },
  getRequirement: async (id) => {
    const res = await fetch(`${API_BASE}/requirements/${id}`);
    return res.json();
  },
  createRequirement: async (req) => {
    const res = await fetch(`${API_BASE}/requirements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    });
    return res.json();
  },
  understandRequirement: async (prompt) => {
    const res = await fetch(`${API_BASE}/requirements/understand`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    return res.json();
  },

  // Smart Matching Engine
  runMatching: async (requirementId) => {
    const res = await fetch(`${API_BASE}/requirements/${requirementId}/match`, {
      method: 'POST'
    });
    return res.json();
  },
  getMatches: async (requirementId) => {
    const res = await fetch(`${API_BASE}/requirements/${requirementId}/matches`);
    return res.json();
  },

  // Proactive Opportunities for Artisan
  getOpportunities: async (artisanId) => {
    const res = await fetch(`${API_BASE}/opportunities/${artisanId}`);
    return res.json();
  },

  // Quotations
  getQuotations: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/quotations?${query}`);
    return res.json();
  },
  submitQuotation: async (quote) => {
    const res = await fetch(`${API_BASE}/quotations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quote)
    });
    return res.json();
  },
  updateQuotationStatus: async (quoteId, status) => {
    const res = await fetch(`${API_BASE}/quotations/${quoteId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  // Orders
  getOrders: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/orders?${query}`);
    return res.json();
  },

  // Reset Demo
  resetDemoData: async () => {
    const res = await fetch(`${API_BASE}/reset`, {
      method: 'POST'
    });
    return res.json();
  }
};

