export const reviews = [
  {
    id: "review-001",
    productHandle: "barrier-peptide-serum",
    customerName: "Sarah M.",
    rating: 5,
    title: "Love This Serum",
    comment: "Lightweight, smooth, and perfect for my daily routine.",
    date: "2026-09-12",
    verified: false,
    permissionToDisplay: false,
  },
  {
    id: "review-002",
    productHandle: "multi-peptide-firming-cream",
    customerName: "Emily R.",
    rating: 5,
    title: "Luxurious Texture",
    comment: "Rich yet comfortable. A lovely evening moisturizer.",
    date: "2026-09-18",
    verified: false,
    permissionToDisplay: false,
  },
  {
    id: "review-003",
    productHandle: "vitamin-c-peptide-brightening-serum",
    customerName: "Jessica L.",
    rating: 4,
    title: "Lovely Serum",
    comment: "Feels great on my skin and fits easily into my routine.",
    date: "2026-09-24",
    verified: false,
    permissionToDisplay: false,
  },
  {
    id: "review-004",
    productHandle: "soothing-peptide-cleanser",
    customerName: "Olivia T.",
    rating: 5,
    title: "Gentle & Refreshing",
    comment: "Gentle cleansing that leaves my skin feeling comfortable.",
    date: "2026-10-02",
    verified: false,
    permissionToDisplay: false,
  },
  {
    id: "review-005",
    productHandle: "pure-ceramide-barrier-cream",
    customerName: "Sophia K.",
    rating: 5,
    title: "So Nourishing",
    comment: "A comforting cream with a beautiful, non-greasy feel.",
    date: "2026-10-07",
    verified: false,
    permissionToDisplay: false,
  },
  {
    id: "review-006",
    productHandle: "overnight-peptide-mask",
    customerName: "Rachel D.",
    rating: 4,
    title: "Evening Favorite",
    comment: "Makes my nighttime skincare feel relaxing and special.",
    date: "2026-10-11",
    verified: false,
    permissionToDisplay: false,
  },
  {
    id: "review-007",
    productHandle: "360-peptide-eye-complex",
    customerName: "Amanda W.",
    rating: 5,
    title: "Simply Beautiful",
    comment: "Smooth application and easy to use every morning.",
    date: "2026-10-16",
    verified: false,
    permissionToDisplay: false,
  },
  {
    id: "review-008",
    productHandle: "retinol-barrier-cream",
    customerName: "Natalie B.",
    rating: 4,
    title: "Great Night Cream",
    comment: "Lovely texture and a nice addition to my evening routine.",
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