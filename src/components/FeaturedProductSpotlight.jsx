"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  Check,
  Droplets,
  FlaskConical,
  Layers3,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import { getProductByHandle, formatPrice } from "@/data/products";
import { addToCart } from "@/lib/cart";

export default function FeaturedProductSpotlight() {
  const [added, setAdded] = useState(false);

  const product = getProductByHandle("barrier-peptide-serum");

  if (!product) return null;

  const variant =
    product.variants?.find((item) => item.available !== false) || null;

  const price = variant?.price ?? product.price;

  // Only display ingredients once their information is verified.
  const verifiedIngredients =
    product.ingredientsVerified === true
      ? (product.keyIngredients || []).slice(0, 3)
      : [];

  function handleAddToCart() {
    if (!product.available) return;

    const success = addToCart(product, 1, variant);

    if (success) {
      setAdded(true);

      window.setTimeout(() => {
        setAdded(false);
      }, 1800);
    }
  }

  return (
    <section
      id="signature-product"
      aria-labelledby="signature-product-heading"
      className="px-4 md:px-6 py-12 lg:py-20"
    >
      <div className="mx-auto max-w-390">
        {/* SECTION HEADING */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5 px-2 sm:mb-12 sm:px-4">
          <div>
            <span className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.14em] text-[#6595AA] uppercase">
              <Sparkles size={17} strokeWidth={1.5} />
              The NUOVÉ Signature
            </span>

            <h2
              id="signature-product-heading"
              className="font-heading text-primary text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] font-normal"
            >
              Meet Your Skin's
              <br />
              <span className="text-[#6797AD] italic">New Essential.</span>
            </h2>
          </div>

          <p className="text-primary/65 max-w-[330px] text-[15px] leading-[1.8]">
            A closer look at one thoughtful addition to your daily skincare
            ritual.
          </p>
        </div>

        {/* MAIN EDITORIAL LAYOUT */}
        <div className="grid overflow-hidden rounded-[28px] bg-[#F8F7F4] lg:grid-cols-2 lg:rounded-[36px]">
          {/* =====================================
              LEFT — LARGE PRODUCT IMAGE
          ===================================== */}
          <div className="relative flex min-h-[410px] items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_45%,#FFFFFF_0%,#E8F5F8_48%,#D6EAF0_100%)] px-6 py-12 sm:min-h-[560px] lg:min-h-[720px]">
            {/* DECORATIVE RINGS */}
            <div className="pointer-events-none absolute h-[310px] w-[310px] rounded-full border border-white/70 sm:h-[440px] sm:w-[440px]" />

            <div className="pointer-events-none absolute h-[260px] w-[260px] rounded-full border border-white/60 sm:h-[380px] sm:w-[380px]" />

            {/* TOP LABEL */}
            <div className="absolute top-6 left-6 z-10 sm:top-9 sm:left-9">
              <span className="text-primary inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2.5 text-[13px] font-medium backdrop-blur-lg">
                <span className="h-2 w-2 rounded-full bg-[#62B5C8]" />
                The Signature Serum
              </span>
            </div>

            {/* PRODUCT IMAGE */}
            <div className="relative z-10 h-[340px] w-full max-w-[400px] sm:h-[480px] sm:max-w-[500px]">
              <Image
                src="/assets/barrier.png"
                alt={product.name}
                fill
                sizes="(max-width: 640px) 400px, (max-width: 1024px) 500px, 50vw"
                className="object-contain drop-shadow-[0_35px_35px_rgba(6,48,74,0.12)]"
              />
            </div>

            {/* BOTTOM FLOATING LABEL */}
            <div className="absolute right-6 bottom-6 left-6 z-10 flex items-center justify-between gap-3 rounded-[20px] border border-white/70 bg-white/65 px-5 py-4 backdrop-blur-xl sm:right-9 sm:bottom-9 sm:left-9">
              <div className="flex items-center gap-3">
                <span className="bg-primary flex h-11 w-11 items-center justify-center rounded-full text-white">
                  <Droplets size={20} strokeWidth={1.5} />
                </span>

                <div>
                  <span className="text-primary block text-[15px] font-semibold">
                    Barrier Peptide Serum
                  </span>

                  <span className="text-primary/60 mt-1 block text-[13px]">
                    A considered hydration ritual
                  </span>
                </div>
              </div>

              <Link
                href={`/products/${product.handle}`}
                aria-label={`View ${product.name}`}
                className="text-primary hover:bg-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white transition-all duration-300 hover:rotate-45 hover:text-white"
              >
                <ArrowUpRight size={19} strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          {/* =====================================
              RIGHT — PRODUCT INFORMATION
          ===================================== */}
          <div className="flex flex-col justify-center px-6 py-12 sm:px-12 sm:py-16 lg:px-14 xl:px-20">
            {/* EYEBROW */}
            <span className="text-[13px] font-semibold tracking-[0.15em] text-[#6595AA] uppercase">
              A Closer Look
            </span>

            {/* PRODUCT NAME */}
            <h3 className="font-heading text-primary mt-4 text-[clamp(2.8rem,4vw,4.8rem)] leading-[0.96] tracking-[-0.035em]">
              {product.name}
            </h3>

            {/* BENEFIT STATEMENT */}
            <p className="text-primary/80 mt-6 max-w-[510px] text-[18px] leading-[1.7]">
              A lightweight serum designed to complement your daily hydration
              routine and support comfortable, healthier-looking skin.
            </p>

            {/* PRICE */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <span className="text-primary text-[22px] font-semibold">
                {formatPrice(price)}
              </span>

              {product.size && (
                <span className="border-primary/15 text-primary/65 rounded-full border px-4 py-2 text-[14px]">
                  {product.size}
                </span>
              )}
            </div>

            {/* PRODUCT DETAILS */}
            <div className="divide-primary/10 border-primary/10 mt-9 divide-y border-y">
              {/* INGREDIENTS */}
              <div className="py-6">
                <div className="flex items-start gap-4">
                  <span className="text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F3F6]">
                    <FlaskConical size={21} strokeWidth={1.5} />
                  </span>

                  <div>
                    <h4 className="text-primary font-sans text-[16px] font-semibold">
                      Key Ingredients
                    </h4>

                    {verifiedIngredients.length > 0 ? (
                      <p className="text-primary/65 mt-2 text-[15px] leading-[1.7]">
                        {verifiedIngredients
                          .map((ingredient) =>
                            typeof ingredient === "string"
                              ? ingredient
                              : ingredient.name,
                          )
                          .join(" · ")}
                      </p>
                    ) : (
                      <p className="text-primary/65 mt-2 text-[15px] leading-[1.7]">
                        Full ingredient details will be shared after formulation
                        verification.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* TEXTURE */}
              <div className="py-6">
                <div className="flex items-start gap-4">
                  <span className="text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F3F6]">
                    <Droplets size={21} strokeWidth={1.5} />
                  </span>

                  <div>
                    <h4 className="text-primary font-sans text-[16px] font-semibold">
                      The Texture
                    </h4>

                    <p className="text-primary/65 mt-2 text-[15px] leading-[1.7]">
                      {product.texture ||
                        "A lightweight serum texture designed for comfortable layering."}
                    </p>
                  </div>
                </div>
              </div>

              {/* ROUTINE */}
              <div className="py-6">
                <div className="flex items-start gap-4">
                  <span className="text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F3F6]">
                    <Layers3 size={21} strokeWidth={1.5} />
                  </span>

                  <div>
                    <h4 className="text-primary font-sans text-[16px] font-semibold">
                      Your Daily Ritual
                    </h4>

                    <p className="text-primary/65 mt-2 text-[15px] leading-[1.7]">
                      Apply after cleansing and before your moisturizer,
                      following the directions on the product packaging.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={!product.available}
                onClick={handleAddToCart}
                className="group bg-primary inline-flex min-h-[56px] items-center gap-7 rounded-full py-1.5 pr-1.5 pl-7 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#0A4968] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {added
                  ? "Added to Bag"
                  : product.available
                    ? "Add to Bag"
                    : "Sold Out"}

                <span className="text-primary flex h-11 w-11 items-center justify-center rounded-full bg-[#D8EDF3]">
                  {added ? (
                    <Check size={19} />
                  ) : (
                    <ShoppingBag size={19} strokeWidth={1.5} />
                  )}
                </span>
              </button>

              <Link
                href={`/products/${product.handle}`}
                className="border-primary/25 text-primary hover:border-primary inline-flex min-h-[56px] items-center gap-3 rounded-full border px-6 text-[14px] font-semibold transition-all duration-300 hover:bg-white"
              >
                Explore Product
                <ArrowUpRight size={18} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
