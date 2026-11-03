/**
 * Deterministic B2B Capability-Aware Matching Engine
 * Implements hard business rules + explainable matching scores
 */

export function matchArtisansToRequirement(requirement, products, artisans) {
  const buyerQty = parseInt(requirement.quantity, 10) || 100;
  const maxBudget = parseFloat(requirement.max_budget_per_unit) || 200;
  const deadlineDays = parseInt(requirement.deadline_days, 10) || 30;
  const reqCustNeeded = Boolean(requirement.customization_needed);
  const reqText = `${requirement.product_name || ''} ${requirement.category || ''} ${requirement.material || ''} ${requirement.raw_prompt || ''}`.toLowerCase();

  const results = [];

  for (const product of products) {
    const artisan = artisans.find(a => a.id === product.artisan_id);
    if (!artisan) continue;

    const explanations = [];
    let isEligible = true;
    let ineligibilityReason = null;
    let score = 0;

    // 1. PRODUCT / MATERIAL RELEVANCE
    const prodText = `${product.name} ${product.category} ${product.material} ${(product.tags || []).join(' ')}`.toLowerCase();
    
    // Category checks to avoid matching planter with cup
    const isCupReq = /cup|chai|mug|tumbler|kulhad|beverage/i.test(reqText);
    const isPlanterReq = /planter|pot|garden/i.test(reqText);
    const isPlateReq = /plate|dish|bowl|thali/i.test(reqText);

    const isCupProd = /cup|chai|mug|tumbler|kulhad|beverage/i.test(prodText);
    const isPlanterProd = /planter|pot|garden/i.test(prodText);
    const isPlateProd = /plate|dish|bowl|thali/i.test(prodText);

    if (isCupReq && !isCupProd) continue;
    if (isPlanterReq && !isPlanterProd) continue;
    if (isPlateReq && !isPlateProd) continue;

    // Check keywords
    const reqTokens = reqText.split(/\s+/).filter(w => w.length > 3 && !['need', 'under', 'each', 'within', 'days', 'with', 'customized'].includes(w));
    let matchHits = 0;
    for (const token of reqTokens) {
      if (prodText.includes(token)) matchHits++;
    }
    const relevanceFraction = reqTokens.length > 0 ? Math.min(1, matchHits / Math.min(2, reqTokens.length)) : 0.9;
    
    explanations.push({
      pass: true,
      text: `Produces ${product.name} (${product.material})`
    });
    score += relevanceFraction * 25;

    // 2. MOQ (HARD ELIGIBILITY CHECK)
    const moq = product.moq || 1;
    if (buyerQty < moq) {
      isEligible = false;
      ineligibilityReason = `Order quantity (${buyerQty} units) is below artisan MOQ of ${moq} units`;
      explanations.push({
        pass: false,
        text: `Ineligible: Buyer quantity (${buyerQty}) is below artisan MOQ (${moq} units)`
      });
    } else {
      explanations.push({
        pass: true,
        text: `MOQ satisfied (Artisan MOQ is ${moq} units vs ${buyerQty} needed)`
      });
      score += 15;
    }

    // 3. FULFILMENT & PRODUCTION CAPACITY CHECK
    const inStock = product.available_now || 0;
    const monthlyCap = product.monthly_capacity || 300;
    const remainingToProduce = Math.max(0, buyerQty - inStock);
    const dailyRate = monthlyCap / 25; // 25 working days
    const productionDaysNeeded = Math.ceil(remainingToProduce / dailyRate);
    const totalLeadTimeNeeded = Math.max(productionDaysNeeded, product.lead_time_days || 10);

    if (inStock >= buyerQty) {
      explanations.push({
        pass: true,
        text: `Can fulfill immediately from existing stock (${inStock} units available now)`
      });
      score += 25;
    } else if (totalLeadTimeNeeded <= deadlineDays) {
      explanations.push({
        pass: true,
        text: `Can fulfill ${buyerQty} units (${inStock} in stock + ${remainingToProduce} produced in ~${productionDaysNeeded} days)`
      });
      score += 25;
    } else {
      isEligible = false;
      ineligibilityReason = `Production capacity shortfall: Needs ~${totalLeadTimeNeeded} days to produce remaining ${remainingToProduce} units (Deadline is ${deadlineDays} days)`;
      explanations.push({
        pass: false,
        text: `Timeline constraint: Artisan requires ${totalLeadTimeNeeded} days vs ${deadlineDays} day deadline`
      });
    }

    // 4. BUDGET CHECK
    const artisanPrice = parseFloat(product.price) || 100;
    if (artisanPrice <= maxBudget) {
      const savings = Math.round(maxBudget - artisanPrice);
      explanations.push({
        pass: true,
        text: `Within buyer budget (₹${artisanPrice}/unit vs ₹${maxBudget} limit — Saves ₹${savings}/unit)`
      });
      score += 20;
    } else if (artisanPrice <= maxBudget * 1.1) {
      // 10% over budget, acceptable with negotiation
      explanations.push({
        pass: false,
        text: `Slightly above budget (₹${artisanPrice}/unit vs ₹${maxBudget} budget)`
      });
      score += 8;
    } else {
      isEligible = false;
      ineligibilityReason = `Price ₹${artisanPrice}/unit exceeds maximum budget ₹${maxBudget}`;
      explanations.push({
        pass: false,
        text: `Above budget: Quoted indicative ₹${artisanPrice}/unit exceeds max ₹${maxBudget}`
      });
    }

    // 5. CUSTOMIZATION CHECK
    if (reqCustNeeded) {
      if (product.customization_available) {
        explanations.push({
          pass: true,
          text: `Supports custom branding: "${product.customization_details || 'Custom logo embossing & stamping'}"`
        });
        score += 15;
      } else {
        explanations.push({
          pass: false,
          text: `Does not offer custom branding/glazes requested by buyer`
        });
        score += 0;
      }
    } else {
      explanations.push({
        pass: true,
        text: `Standard finish ready for dispatch`
      });
      score += 15;
    }

    // 6. LOCATION & CLUSTER
    const buyerLoc = (requirement.delivery_location || '').toLowerCase();
    const artisanLoc = (artisan.location || product.location || '').toLowerCase();
    const isSameCity = buyerLoc.includes('jaipur') && artisanLoc.includes('jaipur');
    const isSameState = (buyerLoc.includes('rajasthan') && artisanLoc.includes('rajasthan')) || isSameCity;

    if (isSameCity) {
      explanations.push({
        pass: true,
        text: `Local cluster advantage: Same city (${artisan.location}) for zero breakages & same-day delivery`
      });
    } else if (isSameState) {
      explanations.push({
        pass: true,
        text: `Regional cluster (${artisan.location}): Fast road transit within Rajasthan`
      });
    }

    const finalScore = Math.min(99, Math.max(35, Math.round(score)));

    results.push({
      artisan_id: artisan.id,
      artisan_name: artisan.name,
      artisan_location: artisan.location,
      artisan_craft: artisan.craft,
      artisan_rating: artisan.rating,
      artisan_orders: artisan.completed_b2b_orders,
      artisan_avatar: artisan.avatar,
      product_id: product.id,
      product_name: product.name,
      product_image: product.image,
      material: product.material,
      price: product.price,
      moq: product.moq,
      available_now: product.available_now,
      monthly_capacity: product.monthly_capacity,
      customization_available: product.customization_available,
      customization_details: product.customization_details,
      lead_time_days: product.lead_time_days,
      is_eligible: isEligible,
      ineligibility_reason: ineligibilityReason,
      match_score: isEligible ? finalScore : Math.min(finalScore, 50),
      explanations: explanations
    });
  }

  // Sort: Eligible first, then descending by match_score
  results.sort((a, b) => {
    if (a.is_eligible !== b.is_eligible) {
      return a.is_eligible ? -1 : 1;
    }
    return b.match_score - a.match_score;
  });

  return results;
}
