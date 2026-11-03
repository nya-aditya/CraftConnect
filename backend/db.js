import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// Ensure directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

export const initialData = {
  artisans: [
    {
      id: "artisan_1",
      name: "Meera Handicrafts",
      owner: "Meera Devi",
      location: "Jaipur, Rajasthan",
      craft: "Terracotta & Handmade Pottery",
      experience: "14 years of generational clay craftsmanship",
      rating: 4.9,
      completed_b2b_orders: 28,
      verified: true,
      monthly_total_capacity: 500,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "artisan_2",
      name: "Rajasthan Craft Studio",
      owner: "Kailash Prajapat",
      location: "Jodhpur, Rajasthan",
      craft: "Terracotta & Traditional Glazes",
      experience: "22 years family pottery workshop",
      rating: 4.8,
      completed_b2b_orders: 45,
      verified: true,
      monthly_total_capacity: 800,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "artisan_3",
      name: "Mitti Kala Works",
      owner: "Suresh & Anita Sharma",
      location: "Jaipur, Rajasthan",
      craft: "Ceramic & Stoneware Studio",
      experience: "9 years studio pottery",
      rating: 4.7,
      completed_b2b_orders: 16,
      verified: true,
      monthly_total_capacity: 250,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    }
  ],
  buyers: [
    {
      id: "buyer_1",
      company_name: "Rajasthan Cafe Group",
      contact_person: "Rohit Singhania (Procurement Head)",
      location: "Jaipur, Rajasthan",
      type: "Commercial Hospitality / Cafe Chain",
      verified: true,
      active_locations: 8,
      avatar: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "buyer_2",
      company_name: "Heritage Hotel Jaipur",
      contact_person: "Sunita Rathore (General Manager)",
      location: "Jaipur, Rajasthan",
      type: "Boutique Heritage Hospitality",
      verified: true,
      active_locations: 3,
      avatar: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80"
    }
  ],
  products: [
    {
      id: "prod_1",
      artisan_id: "artisan_1",
      name: "Handmade Terracotta Chai & Coffee Cups",
      category: "Tableware & Beverage",
      material: "Terracotta Clay",
      description: "Artisan-thrown terracotta beverage cups with ergonomic grip, chemical-free kiln fired. Ideal for cafes, boutique bistros, and corporate gifting.",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
      specifications: {
        "Capacity": "220 ml",
        "Firing": "High-temperature wood-kiln (900°C)",
        "Food Safety": "100% Lead-Free & Organic",
        "Microwave Safe": "Yes"
      },
      tags: ["terracotta", "cups", "cafe", "sustainable", "handmade"],
      available_now: 50,
      monthly_capacity: 300,
      moq: 50,
      price: 120,
      customization_available: true,
      customization_details: "Embossed cafe logo / stamped insignia on base",
      lead_time_days: 15,
      location: "Jaipur, Rajasthan",
      created_at: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
      id: "prod_2",
      artisan_id: "artisan_1",
      name: "Natural Clay Planter Pots",
      category: "Home & Garden Decor",
      material: "Terracotta",
      description: "Porous breathable terracotta planters that promote root aeration and healthy plant growth.",
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
      specifications: {
        "Height": "6 inches",
        "Drainage": "Pre-drilled hole",
        "Finish": "Natural rustic terracotta"
      },
      tags: ["planter", "terracotta", "decor", "eco-friendly"],
      available_now: 80,
      monthly_capacity: 200,
      moq: 25,
      price: 180,
      customization_available: true,
      customization_details: "Custom geometric carvings",
      lead_time_days: 12,
      location: "Jaipur, Rajasthan",
      created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
      id: "prod_3",
      artisan_id: "artisan_2",
      name: "Artisan Terracotta B2B Bistro Cups",
      category: "Tableware & Beverage",
      material: "Terracotta Clay",
      description: "Sturdy commercial grade terracotta kulhads and tumblers designed specifically for heavy cafe and restaurant daily circulation.",
      image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=600&q=80",
      specifications: {
        "Capacity": "250 ml",
        "Firing": "Dual-fired kiln",
        "Dishwasher Friendly": "Yes (Gentle cycle)",
        "Food Safety": "Lab certified 100% lead-free"
      },
      tags: ["terracotta", "cups", "restaurant", "kulhad", "b2b"],
      available_now: 120,
      monthly_capacity: 500,
      moq: 100,
      price: 135,
      customization_available: true,
      customization_details: "Silkscreen logo glaze or relief stamping",
      lead_time_days: 14,
      location: "Jodhpur, Rajasthan",
      created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: "prod_4",
      artisan_id: "artisan_3",
      name: "Handmade Ceramic Stoneware Mugs",
      category: "Tableware & Beverage",
      material: "Ceramic / Stoneware",
      description: "Glazed stoneware mugs with earthy speckled finish, high durability for restaurant service.",
      image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
      specifications: {
        "Capacity": "300 ml",
        "Glaze": "Food-grade satin matte",
        "Microwave / Dishwasher": "100% Safe"
      },
      tags: ["ceramic", "mugs", "stoneware", "tableware"],
      available_now: 30,
      monthly_capacity: 150,
      moq: 60,
      price: 195,
      customization_available: false,
      customization_details: "Standard artisanal glazes only",
      lead_time_days: 22,
      location: "Jaipur, Rajasthan",
      created_at: new Date(Date.now() - 86400000 * 4).toISOString()
    }
  ],
  requirements: [
    {
      id: "req_demo_1",
      buyer_id: "buyer_1",
      buyer_name: "Rajasthan Cafe Group",
      raw_prompt: "I need 200 customized terracotta cups under ₹150 each within 20 days.",
      product_name: "Terracotta Cups",
      category: "Tableware & Beverage",
      material: "Terracotta Clay",
      quantity: 200,
      max_budget_per_unit: 150,
      customization_needed: true,
      customization_spec: "Laser or stamped logo of Rajasthan Cafe Group",
      deadline_days: 20,
      delivery_location: "Jaipur, Rajasthan",
      status: "OPEN", // OPEN, MATCHED, QUOTED, CONFIRMED
      created_at: new Date(Date.now() - 3600000 * 2).toISOString()
    }
  ],
  quotations: [
    // Will hold submitted quotations
  ],
  orders: [
    // Will hold confirmed orders
  ]
};

class Database {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_PATH)) {
        const fileContent = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(fileContent);
      }
    } catch (err) {
      console.error("Error reading database, using initial data:", err);
    }
    this.save(initialData);
    return JSON.parse(JSON.stringify(initialData));
  }

  save(dataToSave) {
    try {
      this.data = dataToSave || this.data;
      fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error("Error writing to database:", err);
    }
  }

  reset() {
    const clone = JSON.parse(JSON.stringify(initialData));
    this.save(clone);
    return clone;
  }

  getArtisans() {
    return this.data.artisans || [];
  }

  getArtisan(id) {
    return this.data.artisans.find(a => a.id === id);
  }

  getBuyers() {
    return this.data.buyers || [];
  }

  getBuyer(id) {
    return this.data.buyers.find(b => b.id === id);
  }

  getProducts(artisanId = null) {
    if (artisanId) {
      return this.data.products.filter(p => p.artisan_id === artisanId);
    }
    return this.data.products;
  }

  getProduct(id) {
    return this.data.products.find(p => p.id === id);
  }

  addProduct(product) {
    const newProduct = {
      id: product.id || `prod_${Date.now()}`,
      created_at: new Date().toISOString(),
      ...product
    };
    this.data.products.unshift(newProduct);
    this.save();
    return newProduct;
  }

  updateProduct(id, updates) {
    const idx = this.data.products.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.data.products[idx] = { ...this.data.products[idx], ...updates };
      this.save();
      return this.data.products[idx];
    }
    return null;
  }

  getRequirements(buyerId = null) {
    if (buyerId) {
      return this.data.requirements.filter(r => r.buyer_id === buyerId);
    }
    return this.data.requirements;
  }

  getRequirement(id) {
    return this.data.requirements.find(r => r.id === id);
  }

  addRequirement(req) {
    const newReq = {
      id: req.id || `req_${Date.now()}`,
      status: "OPEN",
      created_at: new Date().toISOString(),
      ...req
    };
    this.data.requirements.unshift(newReq);
    this.save();
    return newReq;
  }

  updateRequirement(id, updates) {
    const idx = this.data.requirements.findIndex(r => r.id === id);
    if (idx !== -1) {
      this.data.requirements[idx] = { ...this.data.requirements[idx], ...updates };
      this.save();
      return this.data.requirements[idx];
    }
    return null;
  }

  getQuotations(filter = {}) {
    let list = this.data.quotations || [];
    if (filter.requirement_id) {
      list = list.filter(q => q.requirement_id === filter.requirement_id);
    }
    if (filter.artisan_id) {
      list = list.filter(q => q.artisan_id === filter.artisan_id);
    }
    if (filter.buyer_id) {
      list = list.filter(q => q.buyer_id === filter.buyer_id);
    }
    return list;
  }

  getQuotation(id) {
    return (this.data.quotations || []).find(q => q.id === id);
  }

  addQuotation(quote) {
    if (!this.data.quotations) this.data.quotations = [];
    const newQuote = {
      id: quote.id || `quote_${Date.now()}`,
      status: "PENDING", // PENDING, ACCEPTED, REJECTED
      created_at: new Date().toISOString(),
      ...quote
    };
    this.data.quotations.unshift(newQuote);
    // Also update requirement status
    this.updateRequirement(quote.requirement_id, { status: "QUOTED" });
    this.save();
    return newQuote;
  }

  updateQuotation(id, updates) {
    const idx = this.data.quotations.findIndex(q => q.id === id);
    if (idx !== -1) {
      this.data.quotations[idx] = { ...this.data.quotations[idx], ...updates };
      this.save();
      return this.data.quotations[idx];
    }
    return null;
  }

  getOrders(buyerId = null, artisanId = null) {
    let list = this.data.orders || [];
    if (buyerId) list = list.filter(o => o.buyer_id === buyerId);
    if (artisanId) list = list.filter(o => o.artisan_id === artisanId);
    return list;
  }

  addOrder(order) {
    if (!this.data.orders) this.data.orders = [];
    const newOrder = {
      id: order.id || `ord_${Date.now()}`,
      status: "CONFIRMED",
      order_number: `CC-${Math.floor(100000 + Math.random() * 900000)}`,
      created_at: new Date().toISOString(),
      ...order
    };
    this.data.orders.unshift(newOrder);
    this.save();
    return newOrder;
  }
}

export const db = new Database();

