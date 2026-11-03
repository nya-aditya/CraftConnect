import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || '';
let genAI = null;

if (apiKey && apiKey.trim() !== '') {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
  } catch (err) {
    console.warn("Could not initialize GoogleGenerativeAI:", err.message);
  }
}

/**
 * Intelligent Fallback Catalog Generator
 * Generates rich, realistic B2B catalog items if Gemini API is missing or fails.
 */
function fallbackGenerateCatalog(input) {
  const text = `${input.product_name || ''} ${input.description || ''} ${input.material || ''}`.toLowerCase();

  let isTerracotta = text.includes('terracotta') || text.includes('clay') || text.includes('kulhad') || text.includes('mitti');
  let isCup = text.includes('cup') || text.includes('chai') || text.includes('mug') || text.includes('tea') || text.includes('kulhad');
  let isPlanter = text.includes('planter') || text.includes('pot') || text.includes('garden');
  let isPlate = text.includes('plate') || text.includes('dish') || text.includes('bowl') || text.includes('thali');

  let name = "Handmade Terracotta B2B Beverage Cups";
  let category = "Tableware & Beverage";
  let material = isTerracotta ? "Organic Terracotta Clay" : "Stoneware Ceramic";
  let description = "Artisanal handcrafted terracotta cups designed for cafes, boutique bistros, hotels, and corporate gifting. 100% natural kiln-fired clay with high thermal retention and natural earthy aroma.";
  let specs = {
    "Capacity": "220 ml",
    "Firing": "Traditional Wood Kiln (900°C)",
    "Food Safety": "100% Certified Lead-Free & Chemical-Free",
    "Commercial Use": "B2B Cafe & Restaurant Grade"
  };
  let tags = ["terracotta", "handmade", "pottery", "cafe", "sustainable", "b2b", "culinary"];
  let customization = "Embossed brand logo or stamped initials on base available (Min order 100 pcs)";

  if (isPlanter) {
    name = "Artisan Clay Garden Planter Pots";
    category = "Home & Hospitality Decor";
    description = "Porous natural terracotta planters engineered for moisture retention and healthy plant root transpiration. Ideal for hotel lobbies, restaurants, and landscape architects.";
    specs = {
      "Diameter": "7 inches",
      "Height": "6.5 inches",
      "Drainage": "Standard base drainage hole",
      "Durability": "Weather resistant outdoor treated"
    };
    tags = ["planter", "terracotta", "gardening", "hospitality-decor", "sustainable"];
    customization = "Custom geometric relief pattern or hotel logo plaque available";
  } else if (isPlate) {
    name = "Artisan Terracotta Dining Platters";
    category = "Tableware & Beverage";
    description = "Hand-formed rustic dining plates with food-grade natural burnished finish. Created for authentic heritage dining experiences.";
    specs = {
      "Diameter": "10 inches",
      "Finish": "Hand-burnished smooth clay",
      "Washability": "Hand-wash recommended"
    };
    tags = ["dining", "tableware", "terracotta", "plates", "b2b"];
  }

  // Parse capacity hint from draft text
  const capMatch = text.match(/(\d+)\s*(?:per\s*month|monthly|\/month)/);
  const detectedCapacity = capMatch ? parseInt(capMatch[1], 10) : (input.monthly_capacity || 300);

  return {
    is_ai_generated: true,
    ai_provider: "fallback_heuristic_engine",
    product_name: input.product_name && input.product_name.length > 5 && !input.product_name.toLowerCase().includes('handmade terracotta cup. i can make') ? input.product_name : name,
    category: input.category || category,
    material: input.material || material,
    description: description,
    specifications: specs,
    tags: tags,
    monthly_capacity: detectedCapacity,
    available_now: input.available_now || 50,
    moq: input.moq || 50,
    suggested_price: input.price || 120,
    customization_info: customization,
    missing_info_prompt: {
      question_hi: "क्या आप इस उत्पाद में कस्टम लोगो प्रिंटिंग या ब्रांडिंग प्रदान कर सकते हैं?",
      question_en: "Can you provide custom logo branding or special packaging for bulk orders?",
      field: "customization_details",
      options: [
        "हाँ, बेस या साइड पर लोगो एम्बॉसिंग उपलब्ध है (Yes, logo embossing available)",
        "हाँ, कस्टम ग्लेज़ व रंग विकल्प उपलब्ध हैं (Yes, custom glaze & colors)",
        "केवल मानक हस्तनिर्मित फ़िनिश (Standard handcrafted finish only)"
      ]
    }
  };
}

/**
 * Intelligent Fallback Requirement Extractor
 */
function fallbackExtractRequirement(rawText) {
  const text = (rawText || "").trim();

  // Extract Quantity (e.g. "200 customized terracotta cups", "need 500 pcs", "500 units")
  let quantity = 200;
  const qtyMatch = text.match(/(?:need|want|order|procure|require)?\s*(\d+)\s*(?:customized|handmade|artisan|units|pcs|pieces|cups|plates|items|mugs|pots|kulhads)?/i);
  if (qtyMatch) {
    quantity = parseInt(qtyMatch[1], 10);
  }

  // Extract Budget (e.g. "under ₹150 each", "₹150/unit", "max 150 rs")
  let budget = 150;
  const budgetPattern = /(?:under|below|max|upto|within|budget of)\s*(?:₹|rs\.?|inr)?\s*(\d+)|(?:₹|rs\.?|inr)\s*(\d+)|(\d+)\s*(?:\/unit|per unit|per piece|each)/i;
  const budgetMatch = text.match(budgetPattern);
  if (budgetMatch) {
    const val = budgetMatch[1] || budgetMatch[2] || budgetMatch[3];
    if (val) budget = parseInt(val, 10);
  }

  // Extract Deadline (e.g. "within 20 days", "in 15 days", "within 3 weeks")
  const daysMatch = text.match(/(\d+)\s*(?:days|day)/i);
  const weeksMatch = text.match(/(\d+)\s*(?:weeks|week)/i);
  let deadline = 20;
  if (daysMatch) {
    deadline = parseInt(daysMatch[1], 10);
  } else if (weeksMatch) {
    deadline = parseInt(weeksMatch[1], 10) * 7;
  }

  // Detect Material & Product
  const isTerracotta = /terracotta|clay|mitti|kulhad/i.test(text);
  const isCeramic = /ceramic|stoneware|porcelain/i.test(text);
  const isCup = /cup|chai|mug|tumbler|kulhad/i.test(text);
  const isPlate = /plate|dish|bowl|thali/i.test(text);
  const isPlanter = /planter|pot/i.test(text);

  let productName = "Terracotta Cups";
  let material = "Terracotta Clay";
  let category = "Tableware & Beverage";

  if (isTerracotta && isCup) {
    productName = "Terracotta Cups";
    material = "Terracotta Clay";
  } else if (isCeramic && isCup) {
    productName = "Ceramic Tableware Mugs";
    material = "Ceramic";
  } else if (isPlanter) {
    productName = "Artisan Clay Planter Pots";
    category = "Home & Garden Decor";
    material = "Terracotta Clay";
  } else if (isPlate) {
    productName = "Terracotta Serving Plates";
    material = "Terracotta Clay";
  }

  // Customization needed check
  const customizationNeeded = /custom|logo|brand|emboss|engrav|print/i.test(text);

  return {
    raw_prompt: text,
    product_name: productName,
    category: category,
    material: material,
    quantity: quantity,
    max_budget_per_unit: budget,
    customization_needed: customizationNeeded,
    customization_spec: customizationNeeded ? "Laser or stamped buyer brand logo on items" : "Standard finish accepted",
    deadline_days: deadline,
    delivery_location: "Jaipur, Rajasthan",
    ai_provider: "fallback_heuristic_engine"
  };
}

/**
 * Public AI Catalog Generator
 */
export async function generateCatalog(input) {
  if (!genAI) {
    return fallbackGenerateCatalog(input);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
You are an expert B2B Artisan Catalog Assistant for Indian artisans connecting with commercial buyers (cafes, hotels, corporate gifting).
Turn the artisan's input into a professional, commercial-ready catalog entry.

Artisan input:
- Product name / draft: ${input.product_name || "Handmade terracotta cup"}
- Description: ${input.description || "Handmade terracotta cup. I can make 300 per month."}
- Material: ${input.material || "Terracotta"}
- Price indication: ${input.price || 120}
- Production capacity: ${input.monthly_capacity || 300}

Respond ONLY with valid JSON in this exact structure:
{
  "product_name": "Commercial B2B title e.g. Handmade Terracotta Beverage Cups",
  "category": "e.g. Tableware & Beverage",
  "material": "e.g. Terracotta Clay",
  "description": "Professional 2-3 sentence B2B product pitch highlighting artisan skill, utility for hospitality/cafes, durability and eco-friendliness.",
  "specifications": {
    "Capacity": "220 ml",
    "Firing": "Wood Kiln 900°C",
    "Food Safety": "100% Lead-Free & Chemical-Free",
    "Commercial Use": "Cafe & Hospitality Grade"
  },
  "tags": ["terracotta", "cups", "cafe", "sustainable", "handmade"],
  "monthly_capacity": 300,
  "available_now": 50,
  "moq": 50,
  "suggested_price": 120,
  "customization_info": "Logo embossing or brand screen printing available",
  "missing_info_prompt": {
    "question_hi": "क्या आप इस उत्पाद में कस्टम लोगो प्रिंटिंग या ब्रांडिंग प्रदान कर सकते हैं?",
    "question_en": "Can you provide custom logo branding or special packaging for bulk orders?",
    "field": "customization_details",
    "options": [
      "हाँ, लोगो एम्बॉसिंग उपलब्ध है (Logo embossing available)",
      "हाँ, कस्टम ग्लेज़ रंग (Custom glaze colors)",
      "केवल मानक फ़िनिश (Standard finish only)"
    ]
  }
}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);
    parsed.is_ai_generated = true;
    parsed.ai_provider = "gemini-1.5-flash";
    return parsed;
  } catch (err) {
    console.warn("Gemini API call failed, safely using fallback catalog generator:", err.message);
    return fallbackGenerateCatalog(input);
  }
}

/**
 * Public AI Requirement Extractor
 */
export async function extractRequirement(rawText) {
  if (!genAI) {
    return fallbackExtractRequirement(rawText);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
You are a B2B Procurement AI assistant for an artisan-buyer linkage platform.
Extract structured procurement specifications from this buyer's natural language request:
"${rawText}"

Respond ONLY with valid JSON in this exact structure:
{
  "raw_prompt": "${rawText}",
  "product_name": "Product e.g. Terracotta Cups",
  "category": "e.g. Tableware & Beverage",
  "material": "e.g. Terracotta Clay",
  "quantity": 200,
  "max_budget_per_unit": 150,
  "customization_needed": true,
  "customization_spec": "Logo branding or specific requirement mentioned",
  "deadline_days": 20,
  "delivery_location": "Jaipur, Rajasthan"
}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);
    parsed.ai_provider = "gemini-1.5-flash";
    return parsed;
  } catch (err) {
    console.warn("Gemini requirement extraction failed, safely using fallback:", err.message);
    return fallbackExtractRequirement(rawText);
  }
}
