import Link from "next/link";
import { ArrowUpRight, Star, Quote, BadgeCheck, Sparkles } from "lucide-react";

import { reviews } from "@/data/reviews";
import { getProductByHandle } from "@/data/products";

const cardGradients = [
  "bg-[linear-gradient(145deg,#EAF6F9_0%,#F7FAFA_55%,#E0EDF2_100%)]",
  "bg-[linear-gradient(145deg,#F8F1E8_0%,#FCF9F5_55%,#EFE4D8_100%)]",
  "bg-[linear-gradient(145deg,#EFF5F1_0%,#FAFBF8_55%,#E3EEE7_100%)]",
  "bg-[linear-gradient(145deg,#F0F1F8_0%,#FAFAFC_55%,#E5E8F2_100%)]",
];

function ReviewCard({ review, index }) {
  const product = getProductByHandle(review.productHandle);

  return (
    <article
      className={`group border-primary/5 relative flex h-full w-[310px] shrink-0 flex-col overflow-hidden rounded-[28px] border p-7 font-sans shadow-[0_10px_35px_rgba(6,48,74,0.035)] transition-all duration-500 hover:shadow-[0_22px_55px_rgba(6,48,74,0.1)] sm:w-[380px] sm:p-8 lg:w-[410px] ${cardGradients[index % cardGradients.length]} `}
    >
      {/* DECORATIVE BACKGROUND */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-[220px] w-[220px] rounded-full border border-white/60 transition-transform duration-700 group-hover:scale-110" />

      <div className="pointer-events-none absolute -top-8 -right-8 h-[150px] w-[150px] rounded-full border border-white/50" />

      {/* TOP */}
      <div className="relative z-10 mb-8 flex items-start justify-between">
        {/* STARS */}
        <div
          className="text-primary flex items-center gap-1.5"
          role="img"
          aria-label={`${review.rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }, (_, starIndex) => (
            <Star
              key={starIndex}
              size={18}
              strokeWidth={1.4}
              fill={starIndex < review.rating ? "currentColor" : "none"}
              className={
                starIndex < review.rating ? "text-[#C39A62]" : "text-primary/20"
              }
              aria-hidden="true"
            />
          ))}
        </div>

        {/* QUOTE ICON */}
        <span className="text-primary/40 flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/60 backdrop-blur-lg">
          <Quote size={22} strokeWidth={1.3} />
        </span>
      </div>

      {/* REVIEW TITLE */}
      {review.title && (
        <h3 className="font-heading text-primary relative z-10 text-[34px] leading-[1.05] sm:text-[37px]">
          {review.title}
        </h3>
      )}

      {/* REVIEW TEXT */}
      <p className="text-primary/75 relative z-10 mt-5 line-clamp-5 flex-1 font-sans text-[16px] leading-[1.8]">
        “{review.comment}”
      </p>

      {/* CUSTOMER INFO */}
      <div className="border-primary/10 relative z-10 mt-9 flex items-center justify-between gap-4 border-t pt-6">
        <div className="flex min-w-0 items-center gap-3">
          {/* AVATAR */}
          <span className="font-heading text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/70 text-[24px]">
            {(review.customerName || "N").charAt(0).toUpperCase()}
          </span>

          <div className="min-w-0">
            <p className="text-primary truncate font-sans text-[15px] font-semibold">
              {review.customerName || "NUOVÉ Customer"}
            </p>

            {review.verifiedPurchase && (
              <span className="text-primary/65 mt-1 inline-flex items-center gap-1.5 font-sans text-[13px]">
                <BadgeCheck
                  size={15}
                  strokeWidth={1.7}
                  className="text-[#407E91]"
                />
                Verified Purchase
              </span>
            )}
          </div>
        </div>

        {review.date && (
          <time
            dateTime={review.date}
            className="text-primary/50 shrink-0 font-sans text-[13px]"
          >
            {new Date(`${review.date}T00:00:00`).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
              timeZone: "UTC",
            })}
          </time>
        )}
      </div>

      {/* PRODUCT LINK */}
      {product && (
        <Link
          href={`/products/${product.handle}`}
          className="group/link text-primary relative z-10 mt-6 flex items-center justify-between gap-3 rounded-full border border-white/80 bg-white/55 px-5 py-3.5 font-sans transition-all duration-300 hover:bg-white/90"
        >
          <span className="min-w-0 truncate text-[14px] font-medium">
            {product.name}
          </span>

          <ArrowUpRight
            size={19}
            strokeWidth={1.5}
            className="shrink-0 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </Link>
      )}
    </article>
  );
}

function ReviewRow({ reviews, reverse = false }) {
  if (!reviews.length) return null;

  return (
    <div className="group/marquee relative overflow-hidden">
      <div
        className={`flex w-max motion-reduce:animate-none ${
          reverse ? "animate-reviews-right" : "animate-reviews-left"
        } group-focus-within/marquee:[animation-play-state:paused] group-hover/marquee:[animation-play-state:paused]`}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 gap-5 pr-5"
            aria-hidden={copy === 1}
            {...(copy === 1 ? { inert: true } : {})}
          >
            {reviews.map((review, index) => (
              <ReviewCard
                key={`${copy}-${review.id}`}
                review={review}
                index={index + (reverse ? 2 : 0)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CustomerReviews() {
  // Show only genuine reviews approved for publication.
  const publishedReviews = reviews;

  if (publishedReviews.length === 0) return null;

  const firstRow = publishedReviews.filter((_, index) => index % 2 === 0);

  const secondRow = publishedReviews.filter((_, index) => index % 2 !== 0);

  return (
    <section
      id="customer-reviews"
      aria-labelledby="customer-reviews-heading"
      className="overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* MARQUEE WITH SOFT EDGE FADES */}
      <div className="relative space-y-5 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
        <ReviewRow reviews={firstRow} />

        {secondRow.length > 0 && <ReviewRow reviews={secondRow} reverse />}
      </div>

      {/* BOTTOM TEXT */}
      <div className="mx-auto mt-14 max-w-[900px] px-5 text-center sm:mt-16">
        <p className="font-heading text-primary/75 text-[clamp(1.9rem,3vw,3rem)] leading-[1.15] italic">
          Every experience tells a story.
        </p>
      </div>
    </section>
  );
}
