export const products = [
  {
    id: 1,
    handle: "barrier-peptide-serum",
    name: "Barrier Peptide Serum",
    category: "Serums",
    price: 48,
    compareAtPrice: 60,
    image: "/assets/barrier-peptide-serum.jpg",
    gallery: [
      "/assets/barrier-peptide-serum-2.jpg",
      "/assets/barrier-peptide-serum-3.jpg",
      "/assets/barrier-peptide-serum-4.jpg",
      "/assets/barrier-peptide-serum-5.jpg",
    ],
    description:
      "A lightweight peptide-focused serum designed to complement your daily hydration and skin barrier routine.",
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
    image: "/assets/multi-peptide-firming-cream.jpg",
    gallery: [
      "/assets/multi-peptide-firming-cream-2.jpg",
      "/assets/multi-peptide-firming-cream-3.jpg",
      "/assets/multi-peptide-firming-cream-4.jpg",
    ],
    description:
      "A luxurious peptide-focused cream created for a smoother, firmer-looking complexion.",
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
    image: "/assets/vitamin-c-peptide-brightening-serum.jpg",
    gallery: [
      "/assets/vitamin-c-peptide-brightening-serum-2.jpg",
      "/assets/vitamin-c-peptide-brightening-serum-3.jpg",
      "/assets/vitamin-c-peptide-brightening-serum-4.jpg",
      "/assets/vitamin-c-peptide-brightening-serum-5.jpg",
    ],
    description:
      "A brightening skincare formula designed to support a more radiant-looking complexion.",
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
    image: "/assets/pure-ceramide-barrier-cream.jpg",
    gallery: [
      "/assets/pure-ceramide-barrier-cream-2.jpg",
      "/assets/pure-ceramide-barrier-cream-3.jpg",
      "/assets/pure-ceramide-barrier-cream-4.jpg",
    ],
    description:
      "A nourishing moisturizer created to complement your daily skin barrier care routine.",
    available: true,
    concerns: ["hydrate-restore", "calm-balance"],
  },
  {
    id: 6,
    handle: "overnight-peptide-mask",
    name: "Overnight Peptide Mask",
    category: "Masks",
    price: 52,
    image: "/assets/overnight-peptide-mask.jpg",
    gallery: [
      "/assets/overnight-peptide-mask-2.jpg",
      "/assets/overnight-peptide-mask-3.jpg",
    ],
    description:
      "An indulgent overnight skincare treatment for a soft, hydrated-looking complexion.",
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
    image: "/assets/360-peptide-eye-complex.jpg",
    gallery: [
      "/assets/360-peptide-eye-complex-2.jpg",
      "/assets/360-peptide-eye-complex-3.jpg",
      "/assets/360-peptide-eye-complex-4.jpg",
    ],
    description:
      "A peptide-focused eye treatment designed for smoother-looking skin around the eyes.",
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
    image: "/assets/retinol-barrier-cream.jpg",
    gallery: [
      "/assets/retinol-barrier-cream-2.jpg",
      "/assets/retinol-barrier-cream-3.jpg",
    ],
    description:
      "A nighttime skincare cream formulated for a more refined-looking complexion.",
    available: true,
    concerns: ["firm-smooth"],
    bestseller: true,
    bestsellerOrder: 1,
  },
];

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
