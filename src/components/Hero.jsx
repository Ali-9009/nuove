import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { getProductByHandle, formatPrice } from "@/data/products";
import { reviews } from "@/data/reviews";
import s from "./Hero.module.css";

export default function Hero() {
  const product = getProductByHandle("barrier-peptide-serum");
  const productReviews = reviews.filter(
    (review) =>
      review.productHandle === product?.handle &&
      review.verified === true &&
      review.permissionToDisplay === true &&
      Number.isInteger(review.rating) &&
      review.rating >= 1 &&
      review.rating <= 5,
  );
  const count = productReviews.length || 384;
  return (
    <section aria-labelledby="hero-heading" className={s.hero}>
      <div className={s.stage}>
        <Image
          src="/assets/nuove-banner.png"
          alt="Close-up of luminous skin with natural texture"
          fill
          priority
          sizes="(max-width: 700px) 1200px, 100vw"
          className={s.portrait}
        />
        <div className={s.headline}>
          <h1 id="hero-heading">Care for your skin.</h1>
        </div>
        <div className={s.showcase}>
          <div className={s.categories} aria-label="Explore NUOVÉ">
            <Link href="/collections/all" className={s.selected}>
              Skincare
            </Link>
            <Link href="/#ritual-bundles">Ritual sets</Link>
          </div>
          {product && (
            <Link href={`/products/${product.handle}`} className={s.product}>
              <div className={s.productInfo}>
                <div className={s.reviews}>
                  <Star size={19} fill="currentColor" strokeWidth={1.3} />
                  <span>
                    {count.toLocaleString("en-US")}{" "}
                    {productReviews.length ? "verified" : "sample"} reviews
                  </span>
                </div>
                <h2>{product.name}</h2>
                <p>
                  {formatPrice(product.price)} <span>· {product.size}</span>
                </p>
                <span className={s.arrow}>
                  <ArrowUpRight size={29} strokeWidth={1.5} />
                </span>
              </div>
              <div className={s.productImage}>
                <Image
                  src="/products/admin-originals/barrier-peptide-serum.jpg"
                  alt={product.name}
                  fill
                  sizes="(max-width: 700px) 84vw, 29vw"
                />
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
