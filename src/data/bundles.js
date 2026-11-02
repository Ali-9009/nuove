// The three bundle names, product inclusions, and positioning are supplied by NUOVE.
// Images, bundle pricing, savings, inventory integration and approvals must be verified before launch.
export const bundles = [
  {
    id: "barrier-repair-system",
    handle: "barrier-repair-system",
    name: "Barrier Repair System",
    shortName: "Barrier Repair",
    subtitle: "Hydration & Barrier Support",
    description:
      "A two-product routine focused on hydration and barrier-support care.",
    productHandles: ["barrier-peptide-serum", "pure-ceramide-barrier-cream"],
    heroImage: "/assets/plan-duo-1.png", // Replace with an APPROVED image showing both included products.
    background: "linear-gradient(140deg,#F5FAFB 0%,#E9F4F6 55%,#DDEEF1 100%)",
    featured: false,
    published: true, // Website display flag; not evidence of Shopify launch approval.
    price: null,
    priceVerified: false,
    savingsVerified: false,
    features: [
      {
        title: "A Hydration-Led Ritual",
        description:
          "A serum and cream thoughtfully paired for everyday skincare.",
        icon: "droplets",
      },
      {
        title: "Two Complementary Steps",
        description: "Apply serum, then follow with barrier cream.",
        icon: "layers",
      },
      {
        title: "AM / PM Guidance",
        description:
          "Both products fit into a simple routine, subject to approved directions.",
        icon: "sun",
      },
      {
        title: "Considered Pairing",
        description: "A focused set without unnecessary routine complexity.",
        icon: "sparkles",
      },
    ],
    routine: {
      morning: [
        {
          handle: "barrier-peptide-serum",
          instruction: "Apply after cleansing, following the product label.",
        },
        {
          handle: "pure-ceramide-barrier-cream",
          instruction:
            "Apply after serum; finish your daytime routine with sunscreen.",
        },
      ],
      evening: [
        {
          handle: "barrier-peptide-serum",
          instruction: "Apply after cleansing, following the product label.",
        },
        {
          handle: "pure-ceramide-barrier-cream",
          instruction: "Follow with your moisturizer.",
        },
      ],
    },
    faqs: [
      {
        question: "What's included?",
        answer: "Barrier Peptide Serum and Pure Ceramide Barrier Cream.",
      },
      {
        question: "What order should I use them in?",
        answer:
          "Use the serum after cleansing, then apply the cream. Follow approved product directions.",
      },
    ],
  },
  {
    id: "anti-aging-peptide-duo",
    handle: "anti-aging-peptide-duo",
    name: "Anti-Aging Peptide Duo",
    shortName: "Peptide Duo",
    subtitle: "Hydration, Firmness & Smoothness",
    description:
      "A two-step routine focused on hydration and the appearance of firmness and smoothness.",
    productHandles: ["barrier-peptide-serum", "multi-peptide-firming-cream"],
    heroImage: "/assets/plan-duo-2.png",
    background: "linear-gradient(140deg,#FAF9F7 0%,#F4EEE9 55%,#EDE4DB 100%)",
    featured: false,
    published: true,
    price: null,
    priceVerified: false,
    savingsVerified: false,
    features: [
      {
        title: "Peptide-Focused Pairing",
        description:
          "A serum and cream selected for a simple two-step routine.",
        icon: "sparkles",
      },
      {
        title: "Everyday Hydration",
        description: "A complementary layering ritual.",
        icon: "droplets",
      },
      {
        title: "Smoother-Looking Skin",
        description:
          "A routine positioned around the appearance of smoothness and firmness.",
        icon: "layers",
      },
      {
        title: "Morning & Evening",
        description:
          "Use in the order shown, subject to final label directions.",
        icon: "sun",
      },
    ],
    routine: {
      morning: [
        {
          handle: "barrier-peptide-serum",
          instruction: "Apply to cleansed skin, following the product label.",
        },
        {
          handle: "multi-peptide-firming-cream",
          instruction: "Apply after serum, then use sunscreen.",
        },
      ],
      evening: [
        {
          handle: "barrier-peptide-serum",
          instruction: "Apply after cleansing, following the product label.",
        },
        {
          handle: "multi-peptide-firming-cream",
          instruction: "Apply after serum.",
        },
      ],
    },
    faqs: [
      {
        question: "What's included?",
        answer: "Barrier Peptide Serum and Multi-Peptide Firming Cream.",
      },
      {
        question: "Which product comes first?",
        answer:
          "Apply the serum before the cream, following each approved label.",
      },
    ],
  },
  {
    id: "complete-anti-aging-routine",
    handle: "complete-anti-aging-routine",
    name: "Complete Anti-Aging Routine",
    shortName: "Complete Routine",
    subtitle: "A Complementary AM / PM System",
    description:
      "A three-product skincare system with distinct morning and evening steps, including careful retinol guidance.",
    productHandles: [
      "barrier-peptide-serum",
      "multi-peptide-firming-cream",
      "retinol-barrier-cream",
    ],
    heroImage: "/assets/plan-com.png",
    background: "linear-gradient(140deg,#F6F9FA 0%,#EAF3F6 55%,#E0EAF0 100%)",
    featured: true,
    published: true,
    price: null,
    priceVerified: false,
    savingsVerified: false,
    features: [
      {
        title: "Morning & Evening",
        description:
          "Separate AM and PM routines, rather than layering everything every time.",
        icon: "sun",
      },
      {
        title: "Three Selected Products",
        description: "A serum, firming cream and retinol cream in one set.",
        icon: "layers",
      },
      {
        title: "Considered Retinol Use",
        description:
          "Introduce the retinol cream gradually in the evening as tolerated.",
        icon: "moon",
      },
      {
        title: "Daytime Protection",
        description:
          "Wear broad-spectrum sunscreen during the day when using retinol.",
        icon: "sparkles",
      },
    ],
    routine: {
      morning: [
        {
          handle: "barrier-peptide-serum",
          instruction: "Apply after cleansing, following the product label.",
        },
        {
          handle: "multi-peptide-firming-cream",
          instruction: "Follow with cream, then broad-spectrum sunscreen.",
        },
      ],
      evening: [
        {
          handle: "retinol-barrier-cream",
          instruction:
            "Use on selected evenings only to start; gradually introduce as tolerated and follow the approved product label.",
          caution: true,
        },
      ],
    },
    safetyNote:
      "Retinol: evening use only. Introduce gradually and avoid the eye area. Wear broad-spectrum sunscreen during the day. Retinoids are generally avoided during pregnancy; consult a qualified healthcare professional. Do not apply all three products indiscriminately at every step. Follow the final approved label.",
    faqs: [
      {
        question: "Should I apply all three products morning and night?",
        answer:
          "No. The retinol cream is intended for careful evening use. Follow the distinct AM/PM steps and final product directions.",
      },
      {
        question: "How do I start using the retinol cream?",
        answer:
          "Introduce it gradually in the evening as tolerated. Follow the approved product directions and adjust for skin sensitivity.",
      },
      {
        question: "Is daily sunscreen important?",
        answer:
          "Yes. Use broad-spectrum sunscreen during the day, particularly when using retinol.",
      },
      {
        question: "Can I use retinol during pregnancy?",
        answer:
          "Retinoids are generally avoided during pregnancy. Consult a qualified healthcare professional.",
      },
    ],
  },
];

export function getBundleByHandle(handle) {
  return bundles.find((bundle) => bundle.handle === handle && bundle.published);
}

// Future gift/travel sets can use this same schema, but leave published:false
// until products, pricing, imagery, inventory and launch approval are confirmed.
