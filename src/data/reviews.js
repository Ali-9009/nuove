export const reviews = [
  {
    id: "review-001",
    productHandle: "barrier-peptide-serum",
    customerName: "Sarah M.",
    rating: 5,
    title: "A Beautiful Addition to My Routine",
    comment:
      "I love how lightweight this serum feels. It layers beautifully under my moisturizer and makes my morning skincare routine feel extra special.",
    date: "2026-09-12",
    verified: false,
    permissionToDisplay: false,
  },
  {
    id: "review-002",
    productHandle: "multi-peptide-firming-cream",
    customerName: "Emily R.",
    rating: 5,
    title: "Such a Luxurious Texture",
    comment:
      "The texture feels rich without being overly heavy. I especially enjoy using it as the final step in my evening routine.",
    date: "2026-09-18",
    verified: false,
    permissionToDisplay: false,
  },
  {
    id: "review-003",
    productHandle: "vitamin-c-peptide-brightening-serum",
    customerName: "Jessica L.",
    rating: 4,
    title: "Lovely Everyday Serum",
    comment:
      "I really enjoy the way this serum feels on my skin. The packaging is elegant, and it fits nicely into my existing skincare routine.",
    date: "2026-09-24",
    verified: false,
    permissionToDisplay: false,
  },
  {
    id: "review-004",
    productHandle: "soothing-peptide-cleanser",
    customerName: "Olivia T.",
    rating: 5,
    title: "My Favorite Part of Cleansing",
    comment:
      "This cleanser feels gentle and pleasant to use. My skin feels comfortable afterward, and I genuinely look forward to cleansing every evening.",
    date: "2026-10-02",
    verified: false,
    permissionToDisplay: false,
  },
  {
    id: "review-005",
    productHandle: "pure-ceramide-barrier-cream",
    customerName: "Sophia K.",
    rating: 5,
    title: "Comforting and Nourishing",
    comment:
      "I appreciate a moisturizer that feels substantial without leaving my skin feeling greasy. This has a lovely texture for my nighttime routine.",
    date: "2026-10-07",
    verified: false,
    permissionToDisplay: false,
  },
  {
    id: "review-006",
    productHandle: "overnight-peptide-mask",
    customerName: "Rachel D.",
    rating: 4,
    title: "A Relaxing Evening Ritual",
    comment:
      "I enjoy taking a little extra time for skincare before bed. This mask makes my evening routine feel relaxing and indulgent.",
    date: "2026-10-11",
    verified: false,
    permissionToDisplay: false,
  },
  {
    id: "review-007",
    productHandle: "360-peptide-eye-complex",
    customerName: "Amanda W.",
    rating: 5,
    title: "Elegant and Easy to Use",
    comment:
      "The application feels smooth, and I like how easily it fits into my morning routine. A little product goes a long way for me.",
    date: "2026-10-16",
    verified: false,
    permissionToDisplay: false,
  },
  {
    id: "review-008",
    productHandle: "retinol-barrier-cream",
    customerName: "Natalie B.",
    rating: 4,
    title: "A Nice Nighttime Addition",
    comment:
      "I like the thoughtful presentation and the feel of this cream. I've been incorporating it gradually into my evening skincare routine.",
    date: "2026-10-21",
    verified: false,
    permissionToDisplay: false,
  },
];

export function getVerifiedReviews() {
  return reviews.filter(
    (review) =>
      review.verified === true &&
      review.permissionToDisplay === true &&
      review.productHandle &&
      review.comment?.trim() &&
      Number.isInteger(review.rating) &&
      review.rating >= 1 &&
      review.rating <= 5
  );
}