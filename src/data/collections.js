export const collections = [
  {
    slug: "all",
    name: "Shop All",
    title: "The Collection.",
    eyebrow: "Discover NUOVÉ",
    description:
      "Explore the NUOVÉ skincare collection, from everyday cleansers to serums, moisturizers, eye care, and treatments.",
    seoTitle: "Shop All Skincare | NUOVÉ",
    productCategories: [],
  },
  {
    slug: "cleansers",
    name: "Cleansers",
    title: "The Cleansing Ritual.",
    eyebrow: "The First Step",
    description:
      "Discover NUOVÉ facial cleansers designed to complement your daily skincare ritual.",
    seoTitle: "Facial Cleansers | NUOVÉ",
    productCategories: ["Cleansers"],
  },
  {
    slug: "serums",
    name: "Serums",
    title: "The Serum Edit.",
    eyebrow: "Considered Skincare",
    description:
      "Explore peptide-focused facial serums created for thoughtful everyday skincare routines.",
    seoTitle: "Facial Serums | NUOVÉ",
    productCategories: ["Serums"],
  },
  {
    slug: "eye-care",
    name: "Eye Care",
    title: "The Eye Care Edit.",
    eyebrow: "Every Detail Matters",
    description:
      "Discover NUOVÉ eye care products for a considered skincare ritual.",
    seoTitle: "Eye Care | NUOVÉ",
    productCategories: ["Eye Care"],
  },
  {
    slug: "moisturizers",
    name: "Moisturizers",
    title: "The Moisture Edit.",
    eyebrow: "Everyday Comfort",
    description:
      "Explore NUOVÉ moisturizers and creams designed to complement your daily skincare routine.",
    seoTitle: "Moisturizers & Face Creams | NUOVÉ",
    productCategories: ["Moisturizers"],
  },
  {
    slug: "treatments-masks",
    name: "Treatments & Masks",
    title: "The Treatment Edit.",
    eyebrow: "Elevate Your Ritual",
    description:
      "Discover NUOVÉ skincare treatments and masks for your curated routine.",
    seoTitle: "Skincare Treatments & Masks | NUOVÉ",
    productCategories: ["Treatments & Masks"],
  },
];

export function getCollectionBySlug(slug) {
  return collections.find((collection) => collection.slug === slug) || null;
}

export function getCollectionProducts(collection, products) {
  if (collection.slug === "all") return products;

  return products.filter((product) =>
    collection.productCategories.includes(product.category)
  );
}