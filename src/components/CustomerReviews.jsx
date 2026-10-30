import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";

import { reviews, getVerifiedReviews } from "@/data/reviews";
import { getProductByHandle } from "@/data/products";

function ReviewCard({ review }) {
  const product = getProductByHandle(review.productHandle);

  return (
    <article className="border-primary/10 flex h-full w-72 shrink-0 flex-col border bg-[#F8F7F4] p-6 sm:w-87 sm:p-8 lg:w-97">
      {/* STARS */}
      <div
        className="text-primary mb-6 flex items-center gap-1"
        aria-label={`${review.rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            size={15}
            strokeWidth={1.4}
            fill={index < review.rating ? "currentColor" : "none"}
            className={
              index < review.rating ? "text-primary" : "text-primary/25"
            }
            aria-hidden="true"
          />
        ))}
      </div>

      {/* REVIEW TITLE */}
      {review.title && (
        <h3 className="font-heading text-primary text-[27px] leading-[1.1] sm:text-[30px]">
          {review.title}
        </h3>
      )}

      {/* REVIEW TEXT */}
      <p className="text-text/70 mt-4 line-clamp-5 flex-1 font-sans text-[13px] leading-[1.85]">
        &ldquo;{review.comment}&rdquo;
      </p>

      {/* CUSTOMER */}
      <div className="border-primary/10 mt-7 flex items-center justify-between gap-4 border-t pt-5">
        <div className="min-w-0">
          <p className="text-primary truncate text-[12px] font-semibold">
            {review.customerName || "NUOVÉ Customer"}
          </p>

          {review.verifiedPurchase && (
            <span className="text-primary/50 mt-1 block text-[10px] tracking-[0.12em] uppercase">
              Verified Purchase
            </span>
          )}
        </div>

        {review.date && (
          <time
            dateTime={review.date}
            className="text-text/40 shrink-0 text-[10px]"
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
          className="group text-primary mt-6 flex items-center justify-between gap-3"
        >
          <span className="min-w-0 truncate text-[10px] font-semibold tracking-[0.12em] uppercase">
            Review for {product.name}
          </span>

          <ArrowUpRight
            size={17}
            strokeWidth={1.5}
            className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
            className="flex shrink-0 gap-4 pr-4 sm:gap-5 sm:pr-5"
            aria-hidden={copy === 1}
          >
            {reviews.map((review) => (
              <ReviewCard key={`${copy}-${review.id}`} review={review} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CustomerReviews() {
  const verifiedReviews =
    process.env.NODE_ENV === "development" ? reviews : getVerifiedReviews();

  if (verifiedReviews.length === 0) {
    return null;
  }

  // Alternate reviews between the two rows.
  const firstRow = verifiedReviews.filter((_, index) => index % 2 === 0);

  const secondRow = verifiedReviews.filter((_, index) => index % 2 !== 0);

  return (
    <section
      aria-labelledby="customer-reviews-heading"
      className="overflow-hidden py-16 sm:py-18 lg:py-22"
    >
      {/* HEADING */}
      <div className="mx-auto mb-14 max-w-360 px-5 text-center sm:px-8 lg:mb-20 lg:px-12">
        <span className="text-primary mb-5 block text-[11px] font-semibold tracking-[0.25em] uppercase">
          The NUOVÉ Experience
        </span>

        <h2
          id="customer-reviews-heading"
          className="font-heading text-primary text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] font-normal"
        >
          Words From <span className="italic">Our Community.</span>
        </h2>

        <p className="text-text/60 mx-auto mt-6 max-w-138 text-sm leading-[1.9]">
          Discover authentic experiences shared by people who have made NUOVÉ
          part of their skincare ritual.
        </p>
      </div>

      {/* MARQUEE ROWS */}
      <div className="space-y-5">
        <ReviewRow reviews={firstRow} />

        {secondRow.length > 0 && <ReviewRow reviews={secondRow} reverse />}
      </div>

      {/* BOTTOM */}
      <div className="mx-auto mt-14 max-w-360 px-5 text-center sm:px-8 lg:px-12">
        <p className="font-heading text-primary text-[27px] italic sm:text-[34px]">
          Real experiences. Thoughtfully shared.
        </p>
      </div>
    </section>
  );
}
