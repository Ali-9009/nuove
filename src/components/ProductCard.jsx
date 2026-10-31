"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight, Heart, ShoppingBag, Check, Star } from "lucide-react";

import { formatPrice } from "@/data/products";
import { reviews } from "@/data/reviews";
import { addToCart } from "@/lib/cart";

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [added, setAdded] = useState(false);

  const hasDiscount =
    typeof product.compareAtPrice === "number" &&
    product.compareAtPrice > product.price;

  const hoverImage = product.gallery?.[0];
  const hasHoverImage = hoverImage && hoverImage !== product.image;

  const productReviews = reviews.filter(
    (review) =>
      review.productHandle === product.handle &&
      review.verified === true &&
      review.permissionToDisplay === true &&
      Number.isInteger(review.rating) &&
      review.rating >= 1 &&
      review.rating <= 5,
  );

  const rating =
    productReviews.length > 0
      ? productReviews.reduce((total, review) => total + review.rating, 0) /
        productReviews.length
      : null;

  useEffect(() => {
    try {
      const favorites = JSON.parse(
        localStorage.getItem("nuove-favorites") || "[]",
      );

      setIsFavorite(
        Array.isArray(favorites) && favorites.includes(product.handle),
      );
    } catch {
      setIsFavorite(false);
    }
  }, [product.handle]);

  function toggleFavorite() {
    try {
      const stored = JSON.parse(
        localStorage.getItem("nuove-favorites") || "[]",
      );

      const favorites = Array.isArray(stored) ? stored : [];

      const updated = favorites.includes(product.handle)
        ? favorites.filter((handle) => handle !== product.handle)
        : [...favorites, product.handle];

      localStorage.setItem("nuove-favorites", JSON.stringify(updated));
      setIsFavorite(updated.includes(product.handle));
    } catch {
      setIsFavorite(false);
    }
  }

  function handleAddToCart() {
    if (!product.available) return;

    const defaultVariant =
      product.variants?.find((variant) => variant.available !== false) || null;

    const success = addToCart(product, 1, defaultVariant);

    if (success) {
      setAdded(true);

      window.setTimeout(() => {
        setAdded(false);
      }, 1800);
    }
  }

  return (
    <article className="group min-w-0">
      {/* ========================================
          PRODUCT IMAGE
      ======================================== */}
      <div className="relative aspect-4/5 overflow-hidden rounded-[20px] bg-[#F8F7F4] sm:rounded-[25px]">
        {/* IMAGE LINK */}
        <Link
          href={`/products/${product.handle}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 block overflow-hidden"
        >
          {/* MAIN IMAGE */}
          <div
            className={`absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              hasHoverImage
                ? "group-hover:-translate-x-full"
                : "group-hover:scale-[1.04]"
            }`}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />

            {/* SOFT TOP-TO-BOTTOM OVERLAY */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(210,231,240,0.45)_0%,rgba(255,231,213,0.25)_55%,rgba(255,255,255,0)_100%)]" />
          </div>

          {/* SECOND IMAGE */}
          {hasHoverImage && (
            <div className="absolute inset-0 translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 motion-reduce:transition-none">
              <Image
                src={hoverImage}
                alt={`${product.name} alternate view`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain"
              />
            </div>
          )}
        </Link>

        {/* CATEGORY BADGE */}
        <span className="text-primary pointer-events-none absolute top-3 left-3 z-10 rounded-full border border-white/70 bg-white/80 px-3 py-2 text-xs font-semibold tracking-[0.08em] backdrop-blur-md sm:top-4 sm:left-4">
          {product.category}
        </span>

        {/* FAVORITE BUTTON */}
        <button
          type="button"
          onClick={toggleFavorite}
          aria-label={
            isFavorite
              ? `Remove ${product.name} from favorites`
              : `Add ${product.name} to favorites`
          }
          aria-pressed={isFavorite}
          className="text-primary absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/75 backdrop-blur-md transition-all duration-300 hover:bg-white sm:top-4 sm:right-4 sm:h-10 sm:w-10"
        >
          <Heart
            size={18}
            strokeWidth={1.5}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>

        {/* DISCOUNT BADGE */}
        {!product.available ? (
          <span className="text-primary pointer-events-none absolute right-4 bottom-4 z-10 rounded-full bg-white px-3 py-2 text-[9px] font-semibold tracking-wider uppercase">
            Sold Out
          </span>
        ) : (
          hasDiscount && (
            <span className="bg-primary pointer-events-none absolute right-4 bottom-4 z-10 rounded-full px-3 py-2 text-[9px] font-semibold tracking-wider text-white uppercase">
              Sale
            </span>
          )
        )}
      </div>

      {/* ========================================
          PRODUCT INFORMATION
      ======================================== */}
      <div className="px-1 pt-5">
        {/* VERIFIED RATINGS */}
        {rating !== null && (
          <div className="mb-3 flex items-center gap-2">
            <div
              className="text-primary flex items-center gap-0.5"
              aria-label={`${rating.toFixed(1)} out of 5 stars`}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  size={12}
                  strokeWidth={1.5}
                  fill={index < Math.round(rating) ? "currentColor" : "none"}
                />
              ))}
            </div>

            <span className="text-primary text-[11px] font-semibold">
              {rating.toFixed(1)}
            </span>

            <span className="text-text/45 text-[10px]">
              ({productReviews.length} reviews)
            </span>
          </div>
        )}

        {/* PRODUCT NAME */}
        <Link href={`/products/${product.handle}`} className="block">
          <h3 className="font-heading text-primary hover:text-primary/70 text-[24px] leading-[1.05] transition-colors duration-300 sm:text-[24px]">
            {product.name}
          </h3>
        </Link>

        {/* PRICE AND SIZE */}
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <span className="text-primary text-md font-semibold">
            {formatPrice(product.price)}
          </span>

          {hasDiscount && (
            <span className="text-text/35 text-md line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}

          {product.size && (
            <span className="border-primary/15 text-primary/70 rounded-full border px-3 py-1 text-xs">
              {product.size}
            </span>
          )}
        </div>

        {/* ADD TO BAG */}
        <button
          type="button"
          disabled={!product.available}
          onClick={handleAddToCart}
          className="text-primary hover:bg-primary focus-visible:outline-primary mt-5 flex min-h-[49px] w-full items-center justify-center gap-3 rounded-full border border-gray-400 bg-transparent px-5 text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-[52px]"
        >
          {added ? (
            <>
              <Check size={17} strokeWidth={1.8} />
              Added to Bag
            </>
          ) : (
            <>
              <ShoppingBag size={16} strokeWidth={1.5} />
              {product.available ? "Add to Bag" : "Sold Out"}
            </>
          )}
        </button>
      </div>
    </article>
  );
}