export const productDetails = {
  "barrier-peptide-serum": {
    positioning:
      "A lightweight peptide serum designed to support hydration and a healthier-looking skin barrier.",

    // Add only approved cosmetic claims.
    benefits: [],

    // Add actual ingredients after formula verification.
    keyIngredients: [],

    // Complete INCI list from the product packaging/formula.
    inci: [],

    overview:
      "A peptide-focused serum created to complement a thoughtful skincare routine.",

    // Confirm product instructions before publishing.
    howToUse: "",
    frequency: "",
    whoItsFor: "",

    texture: "",

    // Only true when the relevant copy has been approved.
    claimsApproved: false,

    faqs: [],

    // Curated product relationships.
    completeRoutine: [
      "pure-ceramide-barrier-cream",
      "soothing-peptide-cleanser",
    ],

    frequentlyPaired: [
      "multi-peptide-firming-cream",
    ],

    bundleSlugs: [
      "barrier-repair-system",
      "anti-aging-peptide-duo",
    ],
  },
};

export function getProductDetails(handle) {
  return productDetails[handle] || {};
}