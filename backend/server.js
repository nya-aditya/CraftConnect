import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './db.js';
import { generateCatalog, extractRequirement } from './aiService.js';
import { matchArtisansToRequirement } from './matchingEngine.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-memory cache for match results by requirement ID
const matchCache = new Map();

// Helper: logging requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString().slice(11, 19)} [${req.method}] ${req.url}`);
  next();
});

/* =========================================================================
   ARTISANS & PRODUCTS
   ========================================================================= */

app.get('/api/artisans', (req, res) => {
  const artisans = db.getArtisans();
  res.json({ success: true, data: artisans });
});

app.get('/api/artisans/:id', (req, res) => {
  const artisan = db.getArtisan(req.params.id);
  if (!artisan) {
    return res.status(404).json({ success: false, error: 'Artisan not found' });
  }
  const products = db.getProducts(artisan.id);
  res.json({
    success: true,
    data: {
      ...artisan,
      products
    }
  });
});

app.get('/api/products', (req, res) => {
  const { artisan_id } = req.query;
  const products = db.getProducts(artisan_id);
  res.json({ success: true, data: products });
});

app.get('/api/products/:id', (req, res) => {
  const prod = db.getProduct(req.params.id);
  if (!prod) return res.status(404).json({ success: false, error: 'Product not found' });
  res.json({ success: true, data: prod });
});

app.post('/api/products', (req, res) => {
  try {
    const product = db.addProduct(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/products/:id', (req, res) => {
  const updated = db.updateProduct(req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, error: 'Product not found' });
  res.json({ success: true, data: updated });
});

/* =========================================================================
   AI CATALOG GENERATION
   ========================================================================= */

app.post('/api/catalog/generate', async (req, res) => {
  try {
    const result = await generateCatalog(req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    console.error("Catalog generation error:", err);
    res.status(500).json({ success: false, error: "Failed to generate catalog" });
  }
});

/* =========================================================================
   BUYERS & REQUIREMENTS
   ========================================================================= */

app.get('/api/buyers', (req, res) => {
  const buyers = db.getBuyers();
  res.json({ success: true, data: buyers });
});

app.get('/api/buyers/:id', (req, res) => {
  const buyer = db.getBuyer(req.params.id);
  if (!buyer) return res.status(404).json({ success: false, error: 'Buyer not found' });
  res.json({ success: true, data: buyer });
});

// AI Requirement Extraction from Natural Language
app.post('/api/requirements/understand', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, error: "Prompt is required" });
    }
    const extracted = await extractRequirement(prompt);
    res.json({ success: true, data: extracted });
  } catch (err) {
    console.error("Requirement extraction error:", err);
    res.status(500).json({ success: false, error: "Failed to parse requirement" });
  }
});

app.get('/api/requirements', (req, res) => {
  const { buyer_id } = req.query;
  const list = db.getRequirements(buyer_id);
  res.json({ success: true, data: list });
});

app.get('/api/requirements/:id', (req, res) => {
  const item = db.getRequirement(req.params.id);
  if (!item) return res.status(404).json({ success: false, error: 'Requirement not found' });
  res.json({ success: true, data: item });
});

app.post('/api/requirements', (req, res) => {
  try {
    const newReq = db.addRequirement(req.body);
    res.status(201).json({ success: true, data: newReq });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* =========================================================================
   SMART CAPABILITY MATCHING ENGINE
   ========================================================================= */

app.post('/api/requirements/:id/match', (req, res) => {
  try {
    const requirement = db.getRequirement(req.params.id);
    if (!requirement) {
      return res.status(404).json({ success: false, error: "Requirement not found" });
    }

    const allProducts = db.getProducts();
    const allArtisans = db.getArtisans();

    const matches = matchArtisansToRequirement(requirement, allProducts, allArtisans);
    matchCache.set(req.params.id, matches);

    // Update requirement status
    db.updateRequirement(req.params.id, {
      status: "MATCHED",
      matched_count: matches.filter(m => m.is_eligible).length
    });

    res.json({
      success: true,
      requirement,
      total_matches: matches.length,
      eligible_matches: matches.filter(m => m.is_eligible).length,
      data: matches
    });
  } catch (err) {
    console.error("Matching error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/requirements/:id/matches', (req, res) => {
  const cached = matchCache.get(req.params.id);
  if (cached) {
    return res.json({ success: true, data: cached });
  }

  // If not cached, re-compute
  const requirement = db.getRequirement(req.params.id);
  if (!requirement) {
    return res.status(404).json({ success: false, error: "Requirement not found" });
  }
  const allProducts = db.getProducts();
  const allArtisans = db.getArtisans();
  const matches = matchArtisansToRequirement(requirement, allProducts, allArtisans);
  matchCache.set(req.params.id, matches);

  res.json({ success: true, data: matches });
});

/* =========================================================================
   PROACTIVE SELLER OPPORTUNITIES
   ========================================================================= */

app.get('/api/opportunities/:artisan_id', (req, res) => {
  const artisanId = req.params.id || req.params.artisan_id;
  const allReqs = db.getRequirements();
  const allProducts = db.getProducts(artisanId);
  const artisan = db.getArtisan(artisanId);

  if (!artisan) {
    return res.status(404).json({ success: false, error: "Artisan not found" });
  }

  const opportunities = [];

  for (const reqItem of allReqs) {
    // Run match for this artisan's products
    const matches = matchArtisansToRequirement(reqItem, allProducts, [artisan]);
    const eligible = matches.filter(m => m.is_eligible);

    if (eligible.length > 0) {
      // Check if artisan already quoted
      const quotes = db.getQuotations({ requirement_id: reqItem.id, artisan_id: artisanId });
      opportunities.push({
        requirement: reqItem,
        matched_product: eligible[0],
        match_score: eligible[0].match_score,
        has_quoted: quotes.length > 0,
        quotation: quotes.length > 0 ? quotes[0] : null
      });
    }
  }

  res.json({ success: true, data: opportunities });
});

/* =========================================================================
   QUOTATIONS & NEGOTIATION
   ========================================================================= */

app.get('/api/quotations', (req, res) => {
  const { requirement_id, artisan_id, buyer_id } = req.query;
  const list = db.getQuotations({ requirement_id, artisan_id, buyer_id });
  res.json({ success: true, data: list });
});

app.post('/api/quotations', (req, res) => {
  try {
    const quotation = db.addQuotation(req.body);
    res.status(201).json({ success: true, data: quotation });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/quotations/:id/status', (req, res) => {
  const { status } = req.body; // "ACCEPTED" or "REJECTED"
  const quotation = db.getQuotation(req.params.id);
  if (!quotation) {
    return res.status(404).json({ success: false, error: 'Quotation not found' });
  }

  const updated = db.updateQuotation(req.params.id, { status });

  if (status === 'ACCEPTED') {
    // Automatically generate confirmed order
    const requirement = db.getRequirement(quotation.requirement_id);
    const order = db.addOrder({
      quotation_id: quotation.id,
      requirement_id: quotation.requirement_id,
      buyer_id: quotation.buyer_id,
      buyer_name: quotation.buyer_name,
      artisan_id: quotation.artisan_id,
      artisan_name: quotation.artisan_name,
      product_name: quotation.product_name,
      quantity: quotation.quantity,
      unit_price: quotation.unit_price,
      total_amount: quotation.total_amount,
      delivery_days: quotation.delivery_days,
      customization_agreed: quotation.customization_notes,
      milestones: [
        { name: "Order Placed & Escrow Allocated", status: "COMPLETED", date: new Date().toLocaleDateString() },
        { name: "Raw Material Preparation & Shaping", status: "IN_PROGRESS", target_days: "Day 1-4" },
        { name: "Kiln Firing & Custom Stamping", status: "SCHEDULED", target_days: "Day 5-10" },
        { name: "B2B Quality Inspection & Eco-Packaging", status: "SCHEDULED", target_days: "Day 11-14" },
        { name: "Cluster Dispatch to Jaipur Cafe Hub", status: "SCHEDULED", target_days: "Day 15" }
      ]
    });

    db.updateRequirement(quotation.requirement_id, { status: "CONFIRMED" });

    return res.json({ success: true, data: updated, order });
  }

  res.json({ success: true, data: updated });
});

/* =========================================================================
   ORDERS
   ========================================================================= */

app.get('/api/orders', (req, res) => {
  const { buyer_id, artisan_id } = req.query;
  const orders = db.getOrders(buyer_id, artisan_id);
  res.json({ success: true, data: orders });
});

/* =========================================================================
   DEMO RESET
   ========================================================================= */

app.post('/api/reset', (req, res) => {
  matchCache.clear();
  const fresh = db.reset();
  res.json({ success: true, message: "Database reset to initial demo state", data: fresh });
});

// Serve static frontend in production if dist exists
const frontendDist = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get('*', (req, res, next) => {
    if (req.url.startsWith('/api')) return next();
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`CraftConnect Backend running on port ${PORT}`);
});
