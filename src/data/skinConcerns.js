export const skinConcerns = [
  {
    slug: "hydrate-restore",
    number: "01",
    title: "Hydrate & Restore",
    description:
      "Replenish moisture and discover skincare designed for a softer, beautifully hydrated complexion.",

    image: "/assets/hydrate.jpg",
  },
  {
    slug: "firm-smooth",
    number: "02",
    title: "Firm & Smooth",
    description:
      "Explore peptide-focused skincare created for smoother texture and firmer-looking skin.",
    image: "/assets/firm.jpg",
  },
  {
    slug: "brighten-revitalize",
    number: "03",
    title: "Brighten & Revitalize",
    description:
      "Discover formulas designed to support a refreshed, radiant-looking complexion.",
    image: "/assets/brighten.jpg",
  },
  {
    slug: "calm-balance",
    number: "04",
    title: "Calm & Balance",
    description:
      "Gentle skincare essentials for a comfortable, nourished, and balanced daily routine.",
    image: "/assets/calm.jpg",
  },
];

export function getSkinConcern(slug) {
  return skinConcerns.find((concern) => concern.slug === slug);
}
