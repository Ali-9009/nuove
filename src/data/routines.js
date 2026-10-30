export const routines = [
  {
    id: 1,
    slug: "barrier-repair-system",
    number: "01",
    name: "Barrier Repair System",
    subtitle: "The Hydration Ritual",
    description:
      "A considered routine designed to support hydration and everyday skin barrier care.",
    image: "/assets/360-peptide-eye-complex-2.jpg",
    usage: "Morning & Evening",
    badge: "HYDRATION & BARRIER CARE",
    productHandles: [
      "soothing-peptide-cleanser",
      "barrier-peptide-serum",
      "pure-ceramide-barrier-cream",
    ],
    bundlePrice: null,
  },
  {
    id: 2,
    slug: "anti-aging-peptide-duo",
    number: "02",
    name: "Anti-Aging Peptide Duo",
    subtitle: "The Firming Ritual",
    description:
      "A peptide-focused pairing for a smoother, firmer-looking complexion.",
    image: "/assets/barrier-peptide-serum-2.jpg",
    usage: "Morning & Evening",
    badge: "FIRMNESS & SMOOTHNESS",
    productHandles: ["barrier-peptide-serum", "multi-peptide-firming-cream"],
    bundlePrice: null,
  },
  {
    id: 3,
    slug: "complete-anti-aging-routine",
    number: "03",
    name: "Complete Anti-Aging Routine",
    subtitle: "The Complete Ritual",
    description:
      "A multi-step approach to everyday skincare, bringing together complementary formulas.",
    image: "/assets/multi-peptide-firming-cream-2.jpg",
    usage: "Morning & Evening — Product Dependent",
    badge: "COMPLETE SKINCARE SYSTEM",
    featured: true,
    productHandles: [
      "soothing-peptide-cleanser",
      "barrier-peptide-serum",
      "multi-peptide-firming-cream",
      "360-peptide-eye-complex",
    ],
    bundlePrice: null,
  },
];

export function getRoutine(slug) {
  return routines.find((routine) => routine.slug === slug);
}
