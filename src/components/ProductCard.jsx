import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { formatPrice } from "@/data/products";

export default function ProductCard({ product }) {
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;

  // First gallery image for hover
  const hoverImage = product.gallery?.[0];

  const hasHoverImage = hoverImage && hoverImage !== product.image;

  return (
    <article className="group min-w-0">
      {/* PRODUCT IMAGE */}
      <div className="relative aspect-4/5 overflow-hidden">
        <Link
          href={`/products/${product.handle}`}
          className="absolute inset-0 block overflow-hidden"
          aria-label={`View ${product.name}`}
        >
          {/* MAIN IMAGE */}
          <div
            className={`absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              hasHoverImage
                ? "group-hover:-translate-x-full"
                : "group-hover:scale-[1.03]"
            }`}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain"
            />
          </div>

          {/* HOVER IMAGE - SLIDES FROM RIGHT */}
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

        {/* SALE / STOCK BADGE */}
        {!product.available ? (
          <span className="pointer-events-none absolute left-3 top-3 z-10 bg-white px-3 py-2 text-[10px] uppercase tracking-wider text-primary">
            Sold Out
          </span>
        ) : (
          hasDiscount && (
            <span className="pointer-events-none absolute left-3 top-3 z-10 bg-primary px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-white">
              Sale
            </span>
          )
        )}

        {/* CART BUTTON */}
        <button
          type="button"
          disabled={!product.available}
          aria-label={`Add ${product.name} to bag`}
          title="Cart functionality coming soon"
          className="
            absolute bottom-4 right-4 z-20
            flex h-10 w-10 items-center justify-center
            rounded-full bg-white text-primary shadow-sm
            transition-all duration-300
            group-hover:-translate-y-1
            hover:bg-primary hover:text-white
            focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-primary
            disabled:cursor-not-allowed disabled:opacity-50
            sm:h-11 sm:w-11
          "
        >
          <ShoppingBag size={19} strokeWidth={1.5} />
        </button>
      </div>

      {/* PRODUCT INFORMATION */}
      <div className="pt-4">
        {/* CATEGORY */}
        <span className="mb-2 block font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-text/50">
          {product.category}
        </span>

        {/* PRODUCT TITLE */}
        <Link href={`/products/${product.handle}`}>
          <h3 className="font-heading text-[21px] leading-[1.15] text-primary transition-colors duration-300 hover:text-primary/70 sm:text-[23px]">
            {product.name}
          </h3>
        </Link>

        {/* PRICE */}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="font-sans text-[13px] font-semibold text-primary">
            {formatPrice(product.price)}
          </span>

          {hasDiscount && (
            <span className="font-sans text-xs text-text/40 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}