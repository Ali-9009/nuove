"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Droplets,
  FlaskConical,
  SunMoon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import gsap from "gsap";

import { products, formatPrice } from "@/data/products";
import PrimaryButton from "@/components/PrimaryButton";

// Manually selected featured products
const featuredProducts = products
  .filter((product) => product.featured === true)
  .sort((a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999));

export default function FeaturedProductSpotlight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const imagePanelRef = useRef(null);
  const contentRef = useRef(null);
  const isAnimating = useRef(false);

  const product = featuredProducts[activeIndex];

  // Product image + gallery images, without duplicates
  const gallery = product
    ? [...new Set((product.gallery || []).slice(1).filter(Boolean))]
    : [];

  const totalProducts = featuredProducts.length;

  // Animate entire spotlight when product changes
  useEffect(() => {
    if (!product) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imagePanelRef.current,
        {
          x: 45,
          autoAlpha: 0,
        },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
        },
      );

      gsap.fromTo(
        contentRef.current,
        {
          y: 30,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          delay: 0.08,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
        },
      );
    });

    return () => ctx.revert();
  }, [activeIndex, product]);

  const changeProduct = (index) => {
    if (index === activeIndex || isAnimating.current || totalProducts < 2) {
      return;
    }

    const nextIndex = (index + totalProducts) % totalProducts;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setGalleryIndex(0);
      setActiveIndex(nextIndex);
      return;
    }

    isAnimating.current = true;

    gsap.to([imagePanelRef.current, contentRef.current], {
      opacity: 0,
      y: -15,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setGalleryIndex(0);
        setActiveIndex(nextIndex);
        isAnimating.current = false;
      },
    });
  };

  const nextProduct = () => {
    changeProduct(activeIndex + 1);
  };

  const previousProduct = () => {
    changeProduct(activeIndex - 1);
  };

  const nextImage = () => {
    setGalleryIndex((current) => (current + 1) % gallery.length);
  };

  const previousImage = () => {
    setGalleryIndex(
      (current) => (current - 1 + gallery.length) % gallery.length,
    );
  };

  if (!product) return null;

  const hasVerifiedIngredients =
    product.ingredientsVerified === true &&
    Array.isArray(product.keyIngredients) &&
    product.keyIngredients.length > 0;

  const hasDiscount =
    typeof product.compareAtPrice === "number" &&
    product.compareAtPrice > product.price;

  return (
    <section
      aria-labelledby="spotlight-heading"
      className="overflow-hidden bg-[#F8F7F4] py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
        {/* MAIN HEADING */}
        <div className="mb-12 lg:mb-16">
          <span className="text-primary/60 mb-4 block text-[10px] font-semibold tracking-[0.25em] uppercase">
            A Closer Look
          </span>

          <h2
            id="spotlight-heading"
            className="font-heading text-primary text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] font-normal"
          >
            Discover the
            <br />
            <span className="italic">Extraordinary.</span>
          </h2>
        </div>

        {/* FEATURED PRODUCT */}
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 xl:gap-20">
          {/* LEFT — INTERACTIVE GALLERY */}
          <div ref={imagePanelRef} className="min-w-0">
            {/* MAIN IMAGE SLIDER */}
            <div className="relative aspect-4/4.5 overflow-hidden sm:aspect-square">
              {/* SLIDING IMAGE TRACK */}
              <div
                className="relative z-10 flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                style={{
                  transform: `translateX(-${galleryIndex * 100}%)`,
                }}
              >
                {gallery.map((src, index) => (
                  <div
                    key={`${product.handle}-${src}`}
                    className="relative h-full w-full shrink-0"
                  >
                    <Image
                      src={src}
                      alt={`${product.name} — view ${index + 1}`}
                      fill
                      priority={index === 0 && activeIndex === 0}
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* IMAGE NAVIGATION */}
              {gallery.length > 1 && (
                <div className="absolute right-5 bottom-5 z-20 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={previousImage}
                    aria-label="Previous product image"
                    className="text-primary hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full bg-white transition-colors hover:text-white sm:h-11 sm:w-11"
                  >
                    <ChevronLeft size={19} strokeWidth={1.5} />
                  </button>

                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next product image"
                    className="text-primary hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full bg-white transition-colors hover:text-white sm:h-11 sm:w-11"
                  >
                    <ChevronRight size={19} strokeWidth={1.5} />
                  </button>
                </div>
              )}
            </div>

            {/* GALLERY THUMBNAILS */}
            {gallery.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {gallery.map((src, index) => (
                  <button
                    key={`${product.handle}-thumb-${src}`}
                    type="button"
                    onClick={() => setGalleryIndex(index)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={galleryIndex === index}
                    className={`relative h-18 w-18 shrink-0 overflow-hidden border transition-colors duration-300 sm:h-22 sm:w-22 ${
                      galleryIndex === index
                        ? "border-primary"
                        : "hover:border-primary/40 border-transparent"
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="85px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — PRODUCT STORY */}
          <div ref={contentRef} className="flex min-w-0 flex-col lg:pt-5">
            {/* PRODUCT INDEX */}
            <div className="mb-8 flex items-center justify-between">
              <span className="text-primary text-[10px] font-semibold tracking-[0.22em] uppercase">
                The Skincare Edit
              </span>
            </div>

            {/* PRODUCT NAME */}
            <h3 className="font-heading text-primary text-[clamp(3rem,4vw,5rem)] leading-[0.95] font-normal tracking-[-0.035em]">
              {product.name}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-text/65 mt-7 max-w-125 text-sm leading-[1.9] sm:text-[15px]">
              {product.spotlightDescription || product.description}
            </p>

            {/* INGREDIENTS */}
            <div className="border-primary/15 mt-10 border-t pt-6">
              <div className="flex items-start gap-4">
                <span className="border-primary/15 text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-full border">
                  <FlaskConical size={19} strokeWidth={1.3} />
                </span>

                <div className="min-w-0">
                  <h4 className="text-primary mb-3 text-[11px] font-semibold tracking-[0.16em] uppercase">
                    Key Ingredients
                  </h4>

                  {hasVerifiedIngredients ? (
                    <div className="flex flex-wrap gap-2">
                      {product.keyIngredients.map((ingredient) => (
                        <span
                          key={ingredient}
                          className="border-primary/15 text-primary/75 border px-3 py-2 text-[11px]"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-text/50 text-[13px] leading-relaxed">
                      Ingredient details will be added after formula
                      verification.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* TEXTURE */}
            <div className="border-primary/15 mt-6 border-t pt-6">
              <div className="flex items-start gap-4">
                <span className="border-primary/15 text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-full border">
                  <Droplets size={19} strokeWidth={1.3} />
                </span>

                <div>
                  <h4 className="text-primary mb-2 text-[11px] font-semibold tracking-[0.16em] uppercase">
                    The Texture
                  </h4>

                  <p className="text-text/65 text-[13px] leading-[1.8]">
                    {product.texture || "Texture details coming soon."}
                  </p>
                </div>
              </div>
            </div>

            {/* ROUTINE */}
            <div className="border-primary/15 mt-6 border-t pt-6">
              <div className="flex items-start gap-4">
                <span className="border-primary/15 text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-full border">
                  <SunMoon size={19} strokeWidth={1.3} />
                </span>

                <div>
                  <h4 className="text-primary mb-2 text-[11px] font-semibold tracking-[0.16em] uppercase">
                    Your Daily Ritual
                  </h4>

                  <p className="text-text/65 text-[13px] leading-[1.8]">
                    {product.routineStep || "Routine guidance coming soon."}
                  </p>

                  {product.routineUsage && (
                    <span className="text-primary/60 mt-2 block text-[11px]">
                      {product.routineUsage}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* PRICE + CTA */}
            <div className="border-primary/15 mt-9 border-t pt-8">
              <div className="mb-7 flex items-center gap-4">
                <span className="font-heading text-primary text-4xl">
                  {formatPrice(product.price)}
                </span>

                {hasDiscount && (
                  <span className="text-text/40 text-sm line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>

              <PrimaryButton
                href={`/products/${product.handle}`}
                arrow
                className="w-full sm:w-auto"
              >
                Discover Product
              </PrimaryButton>
            </div>
          </div>
        </div>

        {/* PRODUCT NAVIGATION */}
        {totalProducts > 1 && (
          <div className="border-primary/15 mt-16 border-t pt-8 lg:mt-20">
            <div className="flex items-center justify-between gap-5">
              {/* PREVIOUS */}
              <button
                type="button"
                onClick={previousProduct}
                aria-label="Previous featured product"
                className="group text-primary flex min-h-11 items-center gap-3"
              >
                <ArrowLeft
                  size={20}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />

                <span className="hidden text-[11px] font-semibold tracking-[0.15em] uppercase sm:block">
                  Previous
                </span>
              </button>

              {/* PROGRESS INDICATORS */}
              <div className="flex flex-1 items-center justify-center gap-2 sm:gap-3">
                {featuredProducts.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => changeProduct(index)}
                    aria-label={`Show ${item.name}`}
                    aria-current={activeIndex === index ? "true" : undefined}
                    className="group flex h-11 items-center"
                  >
                    <span
                      className={`block h-0.5 transition-all duration-500 ${
                        activeIndex === index
                          ? "bg-primary w-10 sm:w-16"
                          : "bg-primary/20 group-hover:bg-primary/50 w-5 sm:w-9"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* NEXT */}
              <button
                type="button"
                onClick={nextProduct}
                aria-label="Next featured product"
                className="group text-primary flex min-h-11 items-center gap-3"
              >
                <span className="hidden text-[11px] font-semibold tracking-[0.15em] uppercase sm:block">
                  Next Product
                </span>

                <ArrowRight
                  size={20}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
