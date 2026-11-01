"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  ArrowRight,
  Check,
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

  function handleAddToCart() {
    if (!product.available) return;

    const success = addToCart(product, 1, variant);

    if (success) {
      setAdded(true);
      window.setTimeout(() => setAdded(false), 1800);
    }
  }

  return (
    <section
      id="signature-product"
      aria-labelledby="signature-product-heading"
      className="px-4 py-12 md:px-6 lg:py-16"
    >
      <div className="mx-auto max-w-360">
        {/* SECTION HEADER */}
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2
            id="signature-product-heading"
            className="font-heading text-primary text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05]"
          >
            The Signature <span className="text-[#6999AD] italic">Edit.</span>
          </h2>

          <Link
            href={`/products/${product.handle}`}
            className="group text-primary inline-flex items-center gap-2 font-sans text-[15px] font-medium"
          >
            Discover the Product
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </header>

        {/* MAIN CAMPAIGN BANNER */}
        <div className="border-primary/5 relative isolate min-h-[670px] overflow-hidden rounded-[26px] border bg-[radial-gradient(ellipse_at_63%_48%,#FFFFFF_0%,#F7FAFA_45%,#E8F3F6_100%)] sm:min-h-[700px] lg:min-h-[570px] xl:min-h-[630px]">
          {/* SOFT BACKGROUND GLOWS */}
          <div className="pointer-events-none absolute -top-32 -right-20 h-[500px] w-[500px] rounded-full bg-[#D7EDF3]/50 blur-[100px]" />

          <div className="pointer-events-none absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-[#F2E8DF]/40 blur-[100px]" />

          {/* SUBTLE DECORATIVE CIRCLE */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[47%] left-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 sm:h-[490px] sm:w-[490px] lg:top-1/2 lg:left-[61%] lg:h-[540px] lg:w-[540px]"
          />

          {/* ==================================
              LEFT PRODUCT INFORMATION
          ================================== */}
          <div className="absolute top-7 right-6 left-6 z-20 sm:top-10 sm:right-auto sm:left-10 lg:top-14 lg:left-14 xl:top-18 xl:left-18">
            {/* CATEGORY */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="border-primary/10 text-primary rounded-full border bg-white/70 px-4 py-2 font-sans text-[14px] font-medium backdrop-blur-md">
                Signature Skincare
              </span>

              <span className="border-primary/10 text-primary rounded-full border bg-white/70 px-4 py-2 font-sans text-[14px] font-medium backdrop-blur-md">
                Peptide Care
              </span>
            </div>

            {/* PRODUCT NAME */}
            <h3 className="font-heading text-primary mt-7 max-w-[510px] text-[clamp(3.2rem,5.2vw,6.2rem)] leading-[0.9] tracking-[-0.04em]">
              Barrier
              <br />
              <span className="text-[#689AAF] italic">Peptide Serum.</span>
            </h3>

            {/* BADGE */}
            <span className="bg-primary mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-[14px] font-medium text-white">
              <Sparkles size={16} strokeWidth={1.5} />
              The NUOVÉ Signature
            </span>
          </div>

          {/* ==================================
              LARGE CENTER PRODUCT IMAGE
          ================================== */}
          {/* LARGE CENTER PRODUCT IMAGE */}
          <div className="pointer-events-none absolute inset-x-0 top-[225px] z-10 flex h-[330px] items-center justify-center sm:top-[225px] sm:h-[410px] lg:inset-y-0 lg:right-[14%] lg:left-[34%] lg:h-full">
            {/* SOFT BACKGROUND GLOW */}
            <div className="absolute h-[260px] w-[260px] rounded-full bg-white/60 blur-[75px] sm:h-[380px] sm:w-[380px]" />

            {/* FLOATING PRODUCT */}
            <div className="relative h-full w-full max-w-[340px] rotate-[9deg] transition-transform duration-700 hover:rotate-[-5deg] sm:max-w-[430px] lg:max-w-[540px]">
              <Image
                src="/assets/barrier.png"
                alt={product.name}
                fill
                sizes="(max-width: 640px) 340px, (max-width: 1024px) 430px, 540px"
                className="object-contain drop-shadow-[18px_30px_24px_rgba(6,48,74,0.17)]"
              />
            </div>

            {/* SOFT SHADOW UNDERNEATH */}
            <div className="absolute bottom-[5%] left-1/2 h-[28px] w-[170px] -translate-x-1/2 rounded-full bg-[#06304A]/10 blur-[20px] sm:w-[220px] lg:bottom-[8%]" />
          </div>

          {/* ==================================
              BOTTOM LEFT PRICE
          ================================== */}
          <div className="absolute bottom-[165px] left-6 z-20 sm:bottom-12 sm:left-10 lg:bottom-12 lg:left-14 xl:left-18">
            <span className="text-primary/55 block font-sans text-[14px]">
              Featured Product
            </span>

            <div className="mt-2 flex items-center gap-3">
              <span className="text-primary font-sans text-[22px] font-semibold">
                {formatPrice(price)}
              </span>

              {product.size && (
                <span className="border-primary/15 text-primary/65 rounded-full border bg-white/60 px-3 py-1.5 font-sans text-[14px]">
                  {product.size}
                </span>
              )}
            </div>
          </div>

          {/* ==================================
              BOTTOM RIGHT DESCRIPTION + CTA
          ================================== */}
          <div className="absolute right-6 bottom-6 left-6 z-20 sm:right-10 sm:bottom-9 sm:left-auto sm:w-[300px] lg:right-12 lg:bottom-12 xl:right-16 xl:w-[330px]">
            <p className="text-primary/70 max-w-[330px] font-sans text-[15px] leading-[1.7]">
              A lightweight serum designed to complement your everyday hydration
              ritual.
            </p>

            {/* CTA BUTTONS */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.available}
                className="group bg-primary flex min-h-[52px] items-center gap-5 rounded-full py-1.5 pr-1.5 pl-6 font-sans text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[#0A4968] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {added
                  ? "Added to Bag"
                  : product.available
                    ? "Add to Bag"
                    : "Sold Out"}

                <span className="text-primary flex h-10 w-10 items-center justify-center rounded-full bg-[#D8EDF3]">
                  {added ? (
                    <Check size={18} />
                  ) : (
                    <ShoppingBag size={18} strokeWidth={1.5} />
                  )}
                </span>
              </button>

              <Link
                href={`/products/${product.handle}`}
                aria-label={`Explore ${product.name}`}
                className="border-primary/20 text-primary hover:border-primary flex h-[52px] w-[52px] items-center justify-center rounded-full border bg-white/70 backdrop-blur-md transition-all duration-300 hover:bg-white"
              >
                <ArrowUpRight size={21} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
