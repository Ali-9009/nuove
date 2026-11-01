export const products = [
  {
    id: 1,
    handle: "barrier-peptide-serum",
    name: "Barrier Peptide Serum",
    category: "Serums",

    price: 48,
    compareAtPrice: 60,

    rating: 4.8,
    reviewCount: 124,

    image: "/assets/barrier-peptide-serum.jpg",
    gallery: [
      "/assets/barrier-peptide-serum-2.jpg",
      "/assets/barrier-peptide-serum-3.jpg",
      "/assets/barrier-peptide-serum-4.jpg",
      "/assets/barrier-peptide-serum-5.jpg",
    ],

    description:
      "A lightweight peptide-focused serum designed to complement your daily hydration and skin barrier routine.",

    positioning:
      "A lightweight peptide serum designed to support hydration and a healthier-looking skin barrier.",

    size: "30 ml",

    variants: [
      {
        id: "barrier-serum-30ml",
        name: "30 ml",
        label: "30 ml",
        size: "30 ml",
        amount: 30,
        unit: "ml",
        price: 48,
        compareAtPrice: 60,
        available: true,
      },
      {
        id: "barrier-serum-50ml",
        name: "50 ml",
        label: "50 ml",
        size: "50 ml",
        amount: 50,
        unit: "ml",
        price: 68,
        compareAtPrice: 80,
        available: true,
      },
    ],

    benefits: [
      "Helps replenish hydration.",
      "Supports skin comfort.",
      "Helps improve the appearance of smoothness.",
    ],

    overview:
      "A lightweight, peptide-focused facial serum created to complement an everyday skincare ritual. Its silky texture is designed to layer comfortably beneath moisturizer while supporting a hydrated, smooth-looking complexion.",

    keyIngredients: [
      {
        name: "Peptides",
        role: "Cosmetic ingredients commonly used in formulations intended to support smoother-looking skin.",
      },
      {
        name: "Hyaluronic Acid",
        role: "A humectant that helps attract and retain moisture.",
      },
      {
        name: "Panthenol",
        role: "A conditioning ingredient commonly used in moisturizing skincare.",
      },
    ],

    // Illustrative INCI only — replace with the actual formula.
    inci: [
      "Aqua",
      "Glycerin",
      "Propanediol",
      "Sodium Hyaluronate",
      "Panthenol",
      "Phenoxyethanol",
      "Ethylhexylglycerin",
    ],

    howToUse:
      "After cleansing, apply a few drops to the face and neck. Follow with moisturizer. During the day, finish with sunscreen.",

    frequency: "Morning and evening.",

    whoItsFor:
      "Designed for routines focused on hydration, comfort, and maintaining a smooth-looking complexion.",

    texture: "Lightweight, silky serum.",

    routineStep: "After cleansing, before moisturizer.",

    faqs: [
      {
        question: "When should I apply this serum?",
        answer: "Apply after cleansing and before your moisturizer.",
      },
      {
        question: "Can I use it in the morning?",
        answer:
          "The suggested routine includes morning application, followed by moisturizer and sunscreen.",
      },
      {
        question: "Can I combine it with a moisturizer?",
        answer: "Yes. The sample routine places this serum before moisturizer.",
      },
    ],

    completeRoutine: [
      "pure-ceramide-barrier-cream",
      "soothing-peptide-cleanser",
    ],

    frequentlyPaired: ["multi-peptide-firming-cream"],

    bundleSlugs: [
      "barrier-repair-system",
      "anti-aging-peptide-duo",
      "complete-anti-aging-routine",
    ],

    available: true,
    concerns: ["hydrate-restore", "calm-balance"],

    featured: true,
    featuredOrder: 1,
  },

  {
    id: 2,
    handle: "multi-peptide-firming-cream",
    name: "Multi-Peptide Firming Cream",
    category: "Moisturizers",

    price: 65,

    rating: 4,
    reviewCount: 120,

    image: "/assets/multi-peptide-firming-cream.jpg",
    gallery: [
      "/assets/multi-peptide-firming-cream-2.jpg",
      "/assets/multi-peptide-firming-cream-3.jpg",
      "/assets/multi-peptide-firming-cream-4.jpg",
    ],

    description:
      "A luxurious peptide-focused cream created for a smoother, firmer-looking complexion.",

    positioning:
      "A luxurious moisturizing cream designed to support supple, smoother-looking skin.",

    size: "50 ml",

    variants: [
      {
        id: "firming-cream-50ml",
        name: "50 ml",
        label: "50 ml",
        size: "50 ml",
        amount: 50,
        unit: "ml",
        price: 65,
        available: true,
      },
      {
        id: "firming-cream-75ml",
        name: "75 ml",
        label: "75 ml",
        size: "75 ml",
        amount: 75,
        unit: "ml",
        price: 88,
        available: true,
      },
    ],

    benefits: [
      "Provides moisturizing care.",
      "Helps skin feel soft and supple.",
      "Supports a smoother-looking complexion.",
    ],

    overview:
      "A rich yet comfortable facial cream designed to bring a luxurious finishing touch to a daily skincare routine. Its peptide-focused concept combines moisturizing care with an elegant application experience.",

    keyIngredients: [
      {
        name: "Peptides",
        role: "Commonly included in skincare designed for the appearance of smoother skin.",
      },
      {
        name: "Glycerin",
        role: "A humectant that helps maintain skin hydration.",
      },
      {
        name: "Squalane",
        role: "An emollient that helps soften skin.",
      },
    ],

    inci: [
      "Aqua",
      "Glycerin",
      "Caprylic/Capric Triglyceride",
      "Squalane",
      "Cetearyl Alcohol",
      "Glyceryl Stearate",
      "Phenoxyethanol",
    ],

    howToUse:
      "Apply an even layer to clean skin after water-based serums. Massage gently until absorbed.",

    frequency: "Morning and evening.",

    whoItsFor:
      "For skincare routines focused on moisture, softness, and the appearance of firmness.",

    texture: "Rich, creamy moisturizer.",

    routineStep: "After serums, before daytime sunscreen.",

    faqs: [
      {
        question: "When should I use this cream?",
        answer: "Use after cleansing and applying any water-based serums.",
      },
      {
        question: "Can I pair it with Barrier Peptide Serum?",
        answer: "The suggested routine pairs the serum with this moisturizer.",
      },
      {
        question: "Can I apply sunscreen afterward?",
        answer:
          "Yes. Sunscreen should be the final step in a daytime skincare routine.",
      },
    ],

    completeRoutine: ["barrier-peptide-serum", "soothing-peptide-cleanser"],

    frequentlyPaired: ["360-peptide-eye-complex"],

    bundleSlugs: ["anti-aging-peptide-duo", "complete-anti-aging-routine"],

    available: true,
    concerns: ["firm-smooth"],

    featured: true,
    featuredOrder: 2,
  },

  {
    id: 3,
    handle: "vitamin-c-peptide-brightening-serum",
    name: "Vitamin C Peptide Brightening Serum",
    category: "Serums",

    price: 58,

    rating: 5,
    reviewCount: 24,

    image: "/assets/vitamin-c-peptide-brightening-serum.jpg",
    gallery: [
      "/assets/vitamin-c-peptide-brightening-serum-2.jpg",
      "/assets/vitamin-c-peptide-brightening-serum-3.jpg",
      "/assets/vitamin-c-peptide-brightening-serum-4.jpg",
      "/assets/vitamin-c-peptide-brightening-serum-5.jpg",
    ],

    description:
      "A brightening skincare formula designed to support a more radiant-looking complexion.",

    positioning:
      "A daily serum created for a fresh, radiant-looking complexion.",

    size: "30 ml",

    variants: [
      {
        id: "vitamin-c-serum-30ml",
        name: "30 ml",
        label: "30 ml",
        size: "30 ml",
        amount: 30,
        unit: "ml",
        price: 58,
        available: true,
      },
      {
        id: "vitamin-c-serum-50ml",
        name: "50 ml",
        label: "50 ml",
        size: "50 ml",
        amount: 50,
        unit: "ml",
        price: 78,
        available: true,
      },
    ],

    benefits: [
      "Supports a radiant-looking complexion.",
      "Complements a routine focused on uneven-looking tone.",
      "Provides lightweight hydration.",
    ],

    overview:
      "A brightening-focused facial serum intended to complement a modern skincare routine. Its lightweight feel makes it suitable for layering beneath daily moisturizer.",

    keyIngredients: [
      {
        name: "Vitamin C",
        role: "An antioxidant commonly used in skincare for the appearance of radiant skin.",
      },
      {
        name: "Peptides",
        role: "Cosmetic ingredients used in formulations targeting skin appearance.",
      },
      {
        name: "Glycerin",
        role: "Helps attract moisture to the skin.",
      },
    ],

    inci: [
      "Aqua",
      "Glycerin",
      "Propanediol",
      "Ascorbyl Glucoside",
      "Sodium Hyaluronate",
      "Phenoxyethanol",
      "Ethylhexylglycerin",
    ],

    howToUse:
      "Apply a small amount to clean, dry skin before moisturizer. During the day, follow with broad-spectrum sunscreen.",

    frequency: "Morning or as directed on the final product label.",

    whoItsFor:
      "For routines focused on dullness, uneven-looking tone, and visible radiance.",

    texture: "Lightweight facial serum.",

    routineStep: "After cleansing, before moisturizer.",

    faqs: [
      {
        question: "When should I apply this serum?",
        answer: "Apply after cleansing and before moisturizer.",
      },
      {
        question: "Can I use it during the day?",
        answer:
          "The suggested morning routine includes sunscreen after moisturizer.",
      },
      {
        question: "Can I layer it with other products?",
        answer:
          "Compatibility depends on the final formulation and the other products in your routine.",
      },
    ],

    completeRoutine: [
      "soothing-peptide-cleanser",
      "pure-ceramide-barrier-cream",
    ],

    frequentlyPaired: ["360-peptide-eye-complex"],

    bundleSlugs: [],

    available: true,
    concerns: ["brighten-revitalize"],

    bestseller: true,
    bestsellerOrder: 1,

    featured: true,
    featuredOrder: 3,
  },

  {
    id: 4,
    handle: "soothing-peptide-cleanser",
    name: "Soothing Peptide Cleanser",
    category: "Cleansers",

    price: 32,

    rating: 4.8,
    reviewCount: 124,

    image: "/assets/soothing-peptide-cleanser.jpg",
    gallery: [
      "/assets/soothing-peptide-cleanser-2.jpg",
      "/assets/soothing-peptide-cleanser-3.jpg",
      "/assets/soothing-peptide-cleanser-4.jpg",
      "/assets/soothing-peptide-cleanser-5.jpg",
      "/assets/soothing-peptide-cleanser-6.jpg",
    ],

    description:
      "A gentle daily cleanser that leaves skin feeling comfortable, fresh, and balanced.",

    positioning:
      "A comforting daily cleanser for a fresh, clean-feeling complexion.",

    size: "150 ml",

    variants: [
      {
        id: "soothing-cleanser-150ml",
        name: "150 ml",
        label: "150 ml",
        size: "150 ml",
        amount: 150,
        unit: "ml",
        price: 32,
        available: true,
      },
      {
        id: "soothing-cleanser-200ml",
        name: "200 ml",
        label: "200 ml",
        size: "200 ml",
        amount: 200,
        unit: "ml",
        price: 40,
        available: true,
      },
    ],

    benefits: [
      "Cleanses away everyday impurities.",
      "Leaves skin feeling refreshed.",
      "Creates a clean base for the next skincare steps.",
    ],

    overview:
      "A gentle facial cleanser developed around the idea of comfortable everyday cleansing. Its creamy cleansing experience prepares skin for serums and moisturizers.",

    keyIngredients: [
      {
        name: "Glycerin",
        role: "A humectant commonly used to help maintain moisture.",
      },
      {
        name: "Panthenol",
        role: "A skin-conditioning ingredient.",
      },
      {
        name: "Gentle Surfactants",
        role: "Cleansing agents used to remove dirt and excess oil.",
      },
    ],

    inci: [
      "Aqua",
      "Glycerin",
      "Cocamidopropyl Betaine",
      "Decyl Glucoside",
      "Panthenol",
      "Sodium Chloride",
      "Phenoxyethanol",
    ],

    howToUse:
      "Apply to damp skin, massage gently, and rinse thoroughly with lukewarm water. Avoid direct contact with the eyes.",

    frequency: "Morning and evening as needed.",

    whoItsFor:
      "For everyday facial cleansing routines, particularly those focused on a comfortable skin feel.",

    texture: "Soft, creamy cleanser.",

    routineStep: "First step of your skincare routine.",

    faqs: [
      {
        question: "Should I use this before serum?",
        answer:
          "Yes. Cleansing is the first step before applying leave-on skincare.",
      },
      {
        question: "Can I use it in the morning and evening?",
        answer:
          "The suggested routine allows for morning and evening cleansing.",
      },
      {
        question: "What should I use afterward?",
        answer: "Follow cleansing with your chosen serum and moisturizer.",
      },
    ],

    completeRoutine: ["barrier-peptide-serum", "pure-ceramide-barrier-cream"],

    frequentlyPaired: ["vitamin-c-peptide-brightening-serum"],

    bundleSlugs: [],

    available: true,
    concerns: ["calm-balance"],

    bestseller: true,
    bestsellerOrder: 1,

    featured: true,
    featuredOrder: 4,
  },

  {
    id: 5,
    handle: "pure-ceramide-barrier-cream",
    name: "Pure Ceramide Barrier Cream",
    category: "Moisturizers",

    price: 54,

    rating: 3,
    reviewCount: 64,

    image: "/assets/pure-ceramide-barrier-cream.jpg",
    gallery: [
      "/assets/pure-ceramide-barrier-cream-2.jpg",
      "/assets/pure-ceramide-barrier-cream-3.jpg",
      "/assets/pure-ceramide-barrier-cream-4.jpg",
    ],

    description:
      "A nourishing moisturizer created to complement your daily skin barrier care routine.",

    positioning:
      "A comforting moisturizer designed for a soft, hydrated-looking complexion.",

    size: "50 ml",

    variants: [
      {
        id: "ceramide-cream-50ml",
        name: "50 ml",
        label: "50 ml",
        size: "50 ml",
        amount: 50,
        unit: "ml",
        price: 54,
        available: true,
      },
      {
        id: "ceramide-cream-75ml",
        name: "75 ml",
        label: "75 ml",
        size: "75 ml",
        amount: 75,
        unit: "ml",
        price: 72,
        available: true,
      },
    ],

    benefits: [
      "Provides moisturizing care.",
      "Helps skin feel comfortable and supple.",
      "Supports a soft, smooth-looking complexion.",
    ],

    overview:
      "A ceramide-focused moisturizer designed to bring comfort and nourishment to a daily skincare routine. Its creamy texture makes it a natural finishing step after cleansing and serums.",

    keyIngredients: [
      {
        name: "Ceramides",
        role: "Skin-identical lipids commonly used in barrier-focused moisturizing products.",
      },
      {
        name: "Glycerin",
        role: "Helps attract and maintain moisture.",
      },
      {
        name: "Squalane",
        role: "An emollient that helps soften the skin.",
      },
    ],

    inci: [
      "Aqua",
      "Glycerin",
      "Caprylic/Capric Triglyceride",
      "Cetearyl Alcohol",
      "Squalane",
      "Ceramide NP",
      "Phenoxyethanol",
    ],

    howToUse:
      "Apply to the face and neck after cleansing and serums. Massage gently until absorbed.",

    frequency: "Morning and evening.",

    whoItsFor:
      "For moisturizing routines focused on dryness, hydration, and skin comfort.",

    texture: "Nourishing, creamy moisturizer.",

    routineStep: "After serum, before daytime sunscreen.",

    faqs: [
      {
        question: "Can I use this after a serum?",
        answer: "Yes. The suggested routine uses moisturizer after serum.",
      },
      {
        question: "Can it be part of an evening routine?",
        answer:
          "Yes. Moisturizer can be used as the final evening skincare step.",
      },
      {
        question: "Can I use it every day?",
        answer: "The sample routine includes daily use.",
      },
    ],

    completeRoutine: ["soothing-peptide-cleanser", "barrier-peptide-serum"],

    frequentlyPaired: ["overnight-peptide-mask"],

    bundleSlugs: ["barrier-repair-system"],

    available: true,
    concerns: ["hydrate-restore", "calm-balance"],
  },

  {
    id: 6,
    handle: "overnight-peptide-mask",
    name: "Overnight Peptide Mask",
    category: "Masks",

    price: 52,

    rating: 4.8,
    reviewCount: 124,

    image: "/assets/overnight-peptide-mask.jpg",
    gallery: [
      "/assets/overnight-peptide-mask-2.jpg",
      "/assets/overnight-peptide-mask-3.jpg",
    ],

    description:
      "An indulgent overnight skincare treatment for a soft, hydrated-looking complexion.",

    positioning:
      "An overnight skincare ritual for a soft, refreshed-looking complexion.",

    size: "75 ml",

    variants: [
      {
        id: "overnight-mask-75ml",
        name: "75 ml",
        label: "75 ml",
        size: "75 ml",
        amount: 75,
        unit: "ml",
        price: 52,
        available: true,
      },
      {
        id: "overnight-mask-100ml",
        name: "100 ml",
        label: "100 ml",
        size: "100 ml",
        amount: 100,
        unit: "ml",
        price: 66,
        available: true,
      },
    ],

    benefits: [
      "Provides an indulgent moisturizing experience.",
      "Leaves skin feeling soft.",
      "Complements an evening hydration routine.",
    ],

    overview:
      "An indulgent overnight mask concept created for a luxurious evening skincare ritual. Its rich texture offers a comforting finishing step before bedtime.",

    keyIngredients: [
      {
        name: "Peptides",
        role: "Cosmetic ingredients often used in smoothing-focused skincare.",
      },
      {
        name: "Glycerin",
        role: "Helps maintain moisture.",
      },
      {
        name: "Squalane",
        role: "Helps soften and condition skin.",
      },
    ],

    inci: [
      "Aqua",
      "Glycerin",
      "Squalane",
      "Caprylic/Capric Triglyceride",
      "Cetearyl Alcohol",
      "Panthenol",
      "Phenoxyethanol",
    ],

    howToUse:
      "In the evening, apply an even layer to clean skin as the final skincare step. Follow the final product label for removal instructions and recommended frequency.",

    frequency: "Evening use; frequency to be confirmed.",

    whoItsFor: "For skincare routines focused on overnight moisturizing care.",

    texture: "Rich, comforting mask.",

    routineStep: "Final step of an evening routine.",

    faqs: [
      {
        question: "When should I use the mask?",
        answer:
          "The suggested routine places it at the end of an evening skincare routine.",
      },
      {
        question: "Should I use it before serum?",
        answer: "The suggested routine places serum before the mask.",
      },
      {
        question: "How often should I apply it?",
        answer: "Use the frequency provided on the approved product packaging.",
      },
    ],

    completeRoutine: ["soothing-peptide-cleanser", "barrier-peptide-serum"],

    frequentlyPaired: ["pure-ceramide-barrier-cream"],

    bundleSlugs: [],

    available: true,
    concerns: ["hydrate-restore"],

    bestseller: true,
    bestsellerOrder: 1,
  },

  {
    id: 7,
    handle: "360-peptide-eye-complex",
    name: "360 Peptide Eye Complex",
    category: "Eye Care",

    price: 46,

    rating: 5,
    reviewCount: 194,

    image: "/assets/360-peptide-eye-complex.jpg",
    gallery: [
      "/assets/360-peptide-eye-complex-2.jpg",
      "/assets/360-peptide-eye-complex-3.jpg",
      "/assets/360-peptide-eye-complex-4.jpg",
    ],

    description:
      "A peptide-focused eye treatment designed for smoother-looking skin around the eyes.",

    positioning:
      "A lightweight eye-area treatment designed for a smoother-looking appearance.",

    size: "15 ml",

    variants: [
      {
        id: "eye-complex-15ml",
        name: "15 ml",
        label: "15 ml",
        size: "15 ml",
        amount: 15,
        unit: "ml",
        price: 46,
        available: true,
      },
      {
        id: "eye-complex-30ml",
        name: "30 ml",
        label: "30 ml",
        size: "30 ml",
        amount: 30,
        unit: "ml",
        price: 72,
        available: true,
      },
    ],

    benefits: [
      "Provides moisturizing care around the eyes.",
      "Supports a softer skin feel.",
      "Complements a routine focused on smoother-looking skin.",
    ],

    overview:
      "A peptide-focused eye care product concept designed to complement an everyday skincare routine. Its lightweight texture is intended for delicate application around the orbital area.",

    keyIngredients: [
      {
        name: "Peptides",
        role: "Commonly used in formulations for the appearance of smoother skin.",
      },
      {
        name: "Hyaluronic Acid",
        role: "A humectant used to support hydration.",
      },
      {
        name: "Glycerin",
        role: "Helps attract moisture.",
      },
    ],

    inci: [
      "Aqua",
      "Glycerin",
      "Propanediol",
      "Sodium Hyaluronate",
      "Panthenol",
      "Phenoxyethanol",
      "Ethylhexylglycerin",
    ],

    howToUse:
      "Apply a small amount around the orbital bone using gentle tapping motions. Avoid direct contact with the eyes.",

    frequency: "Morning and evening, subject to label instructions.",

    whoItsFor:
      "For skincare routines focused on moisturizing the delicate eye area.",

    texture: "Lightweight eye cream.",

    routineStep: "After serum, before or alongside moisturizer.",

    faqs: [
      {
        question: "Where should I apply the product?",
        answer:
          "Apply gently around the orbital bone, avoiding direct contact with the eyes.",
      },
      {
        question: "How much should I use?",
        answer:
          "Use a small amount according to the approved packaging instructions.",
      },
      {
        question: "Can I use it with moisturizer?",
        answer:
          "The sample routine includes both eye care and facial moisturizer.",
      },
    ],

    completeRoutine: ["barrier-peptide-serum", "multi-peptide-firming-cream"],

    frequentlyPaired: ["vitamin-c-peptide-brightening-serum"],

    bundleSlugs: [],

    available: true,
    concerns: ["firm-smooth"],

    bestseller: true,
    bestsellerOrder: 1,
  },

  {
    id: 8,
    handle: "retinol-barrier-cream",
    name: "Retinol Barrier Cream",
    category: "Moisturizers",

    price: 62,

    rating: 4.8,
    reviewCount: 124,

    image: "/assets/retinol-barrier-cream.jpg",
    gallery: [
      "/assets/retinol-barrier-cream-2.jpg",
      "/assets/retinol-barrier-cream-3.jpg",
    ],

    description:
      "A nighttime skincare cream formulated for a more refined-looking complexion.",

    positioning:
      "An evening skincare cream created for a refined, smoother-looking complexion.",

    size: "50 ml",

    variants: [
      {
        id: "retinol-cream-50ml",
        name: "50 ml",
        label: "50 ml",
        size: "50 ml",
        amount: 50,
        unit: "ml",
        price: 62,
        available: true,
      },
      {
        id: "retinol-cream-75ml",
        name: "75 ml",
        label: "75 ml",
        size: "75 ml",
        amount: 75,
        unit: "ml",
        price: 84,
        available: true,
      },
    ],

    benefits: [
      "Complements a nighttime skincare routine.",
      "Provides moisturizing care.",
      "Supports a refined-looking complexion.",
    ],

    overview:
      "A retinol-focused nighttime moisturizer concept designed for carefully introduced evening skincare routines. Retinol products require appropriate usage instructions and attention to skin tolerance.",

    keyIngredients: [
      {
        name: "Retinol",
        role: "A vitamin A derivative used in skincare for the appearance of fine lines and uneven-looking texture.",
      },
      {
        name: "Ceramides",
        role: "Lipids commonly used in barrier-focused moisturizing skincare.",
      },
      {
        name: "Glycerin",
        role: "A humectant that helps maintain moisture.",
      },
    ],

    inci: [
      "Aqua",
      "Glycerin",
      "Caprylic/Capric Triglyceride",
      "Squalane",
      "Retinol",
      "Ceramide NP",
      "Phenoxyethanol",
    ],

    howToUse:
      "Use in the evening. Start with infrequent application and increase gradually only as tolerated and according to the product label. Avoid the eye area. Wear broad-spectrum sunscreen during the day. Do not use retinoids during pregnancy unless specifically advised by a qualified healthcare professional.",

    frequency:
      "Evening only. Begin gradually; follow the final product directions.",

    whoItsFor:
      "For experienced skincare users seeking an evening routine featuring retinol, where appropriate for their skin and circumstances.",

    texture: "Comforting nighttime cream.",

    routineStep: "Evening treatment step.",

    faqs: [
      {
        question: "Should I use this in the morning?",
        answer:
          "Retinol is generally incorporated into an evening routine. Follow the approved product label.",
      },
      {
        question: "Should I introduce it gradually?",
        answer:
          "Yes. Begin slowly and monitor skin tolerance according to the product instructions.",
      },
      {
        question: "Do I need sunscreen?",
        answer:
          "Daily broad-spectrum sunscreen is important when using retinol.",
      },
      {
        question: "Can I use retinol during pregnancy?",
        answer:
          "Retinoids are generally avoided during pregnancy. Consult a qualified healthcare professional.",
      },
    ],

    completeRoutine: [
      "soothing-peptide-cleanser",
      "pure-ceramide-barrier-cream",
    ],

    frequentlyPaired: ["barrier-peptide-serum"],

    bundleSlugs: ["complete-anti-aging-routine"],

    available: true,
    concerns: ["firm-smooth"],

    bestseller: true,
    bestsellerOrder: 1,
  },
];

// ========================================
// PRODUCT HELPERS
// ========================================

export function getProductByHandle(handle) {
  return products.find((product) => product.handle === handle);
}

export function getProductsByConcern(slug) {
  return products.filter((product) => product.concerns.includes(slug));
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function getBestsellers(limit = 4) {
  return products
    .filter((product) => product.bestseller === true)
    .sort((a, b) => (a.bestsellerOrder ?? 999) - (b.bestsellerOrder ?? 999))
    .slice(0, limit);
}

// ========================================
// PRODUCT DETAILS
// ========================================

// Backward compatibility for components that
// previously called getProductDetails(handle).
export function getProductDetails(handle) {
  return getProductByHandle(handle) || {};
}
