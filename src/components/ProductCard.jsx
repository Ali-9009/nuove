"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check, Star } from "lucide-react";
import { formatPrice } from "@/data/products";
import { reviews } from "@/data/reviews";
import { useCart } from "@/context/CartContext";
import { cartErrorToast } from "@/lib/cart-toast";
import s from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const hasDiscount =
    typeof product.compareAtPrice === "number" &&
    product.compareAtPrice > product.price;
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
    const success = addItem(product, 1, defaultVariant);
    if (success) {
      setAdded(true);
      window.setTimeout(() => setAdded(false), 1800);
    } else cartErrorToast();
  }
  const localHandles = [
    "360-peptide-eye-complex",
    "anti-aging-peptide-duo",
    "barrier-peptide-serum",
    "barrier-repair-system",
    "complete-anti-aging-routine",
    "multi-peptide-firming-cream",
    "overnight-peptide-mask",
    "pure-ceramide-barrier-cream",
    "purifying-cleanser",
    "retinol-barrier-cream",
    "soothing-peptide-cleanser",
    "vitamin-c-peptide-brightening-serum",
  ];
  const image = localHandles.includes(product.handle)
    ? "/products/admin-originals/" + product.handle + ".jpg"
    : product.image;
  const gallery = [
    ...new Set([
      image,
      ...(product.gallery || []).filter((src) => src.startsWith("/")),
    ]),
  ].slice(0, 4);
  const displayRating =
    rating ?? (typeof product.rating === "number" ? product.rating : null);

  const reviewCount =
    productReviews.length > 0
      ? productReviews.length
      : (product.reviewCount ?? 0);
  return (
    <article className={s.card}>
      <div className={s.visual}>
        <Link
          href={`/products/${product.handle}`}
          aria-label={`View ${product.name}`}
          className={s.imageLink}
        >
          <Image
            src={gallery[activeImage] || image}
            alt={
              product.name +
              (activeImage ? " — alternate view " + activeImage : "")
            }
            fill
            sizes="(max-width: 700px) 92vw, 32vw"
            className={s.image}
          />
        </Link>
        <button
          type="button"
          onClick={toggleFavorite}
          aria-label={
            isFavorite
              ? `Remove ${product.name} from favorites`
              : `Add ${product.name} to favorites`
          }
          aria-pressed={isFavorite}
          className={s.favorite}
        >
          <Heart
            size={16}
            strokeWidth={1.4}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>
        {!product.available && <span className={s.soldOut}>Sold out</span>}
      </div>
      <div className={s.info}>
        {displayRating !== null && reviewCount > 0 && (
          <div
            className={s.rating}
            aria-label={`Rated ${displayRating.toFixed(1)} out of 5`}
          >
            <span className={s.stars} aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  size={20}
                  strokeWidth={0}
                  fill="currentColor"
                  style={{
                    opacity: i < Math.round(displayRating) ? 1 : 0.25,
                  }}
                />
              ))}
            </span>

            <strong>{displayRating.toFixed(1)}</strong>

            <span className={s.count}>
              ({reviewCount.toLocaleString("en-US")} reviews)
            </span>
          </div>
        )}
        <Link href={`/products/${product.handle}`} className={s.nameLink}>
          <h3>{product.name}</h3>
        </Link>
        <div className={s.priceWrap}>
          <span className={s.price}>{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className={s.compare}>
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        <button
          type="button"
          disabled={!product.available}
          onClick={handleAddToCart}
          className={s.cartBtn}
        >
          <span>
            {added ? "Added" : product.available ? "Add to cart" : "Sold out"}
          </span>
          <span className={s.cartIcon} aria-hidden="true">
            {added ? (
              <Check size={18} strokeWidth={1.8} />
            ) : (
              <ShoppingBag size={18} strokeWidth={1.6} />
            )}
          </span>
        </button>
        <span className={s.status} role="status">
          {added ? "Added to bag" : ""}
        </span>
      </div>
    </article>
  );
}
