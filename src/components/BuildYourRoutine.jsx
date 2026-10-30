"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sun, Moon, Check, ArrowRight } from "lucide-react";
import gsap from "gsap";

import { routines } from "@/data/routines";
import { products, formatPrice } from "@/data/products";
import PrimaryButton from "@/components/PrimaryButton";

function getRoutineDetails(routine) {
  const includedProducts = routine.productHandles
    .map((handle) => products.find((product) => product.handle === handle))
    .filter(Boolean);

  const hasAllProducts =
    includedProducts.length === routine.productHandles.length;

  const hasVerifiedPrices =
    hasAllProducts &&
    includedProducts.every((product) => product.priceVerified === true);

  const totalPrice = hasVerifiedPrices
    ? includedProducts.reduce((total, product) => total + product.price, 0)
    : null;

  const savings =
    totalPrice !== null && typeof routine.bundlePrice === "number"
      ? Math.max(0, totalPrice - routine.bundlePrice)
      : null;

  return { includedProducts, savings };
}

export default function BuildYourRoutine() {
  const [activeIndex, setActiveIndex] = useState(0);

  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const isAnimating = useRef(false);

  const activeRoutine = routines[activeIndex];
  const { includedProducts, savings } = getRoutineDetails(activeRoutine);

  const changeRoutine = (index) => {
    if (index === activeIndex || isAnimating.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setActiveIndex(index);
      return;
    }

    isAnimating.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(index);

        requestAnimationFrame(() => {
          gsap.set([contentRef.current, imageRef.current], {
            clearProps: "all",
          });

          gsap.fromTo(
            imageRef.current,
            { x: 45, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.65,
              ease: "power3.out",
            },
          );

          gsap.fromTo(
            contentRef.current,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              ease: "power3.out",
              onComplete: () => {
                isAnimating.current = false;
              },
            },
          );
        });
      },
    });

    tl.to(
      imageRef.current,
      {
        x: -35,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      },
      0,
    ).to(
      contentRef.current,
      {
        y: -15,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      },
      0,
    );
  };

  return (
    <section
      aria-labelledby="routine-heading"
      className="overflow-hidden bg-white py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
        {/* SECTION HEADING */}
        <div className="border-primary/15 mb-12 flex flex-col gap-6 border-b pb-9 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="text-primary mb-5 block text-[11px] font-semibold tracking-[0.25em] uppercase">
              The NUOVÉ Ritual
            </span>

            <h2
              id="routine-heading"
              className="font-heading text-primary text-[clamp(2.8rem,5vw,5.5rem)] leading-[1.05] font-normal"
            >
              Build Your <span className="italic">Routine.</span>
            </h2>
          </div>

          <p className="text-text/60 max-w-[370px] text-sm leading-[1.9]">
            Skincare, thoughtfully brought together. Discover complete routines
            designed to make your everyday ritual beautifully simple.
          </p>
        </div>

        {/* MAIN INTERACTIVE LAYOUT */}
        <div className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:gap-12">
          {/* LEFT — ROUTINE SELECTOR */}
          <div
            role="tablist"
            aria-label="Choose a skincare routine"
            className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:gap-4 lg:overflow-visible lg:pb-0"
          >
            {routines.map((routine, index) => {
              const active = activeIndex === index;

              return (
                <button
                  key={routine.id}
                  type="button"
                  role="tab"
                  id={`routine-tab-${index}`}
                  aria-selected={active}
                  aria-controls="routine-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => changeRoutine(index)}
                  className={`group relative flex min-w-[220px] shrink-0 items-center justify-between overflow-hidden border p-5 text-left transition-colors duration-500 sm:min-w-[260px] lg:min-w-0 lg:p-7 ${
                    active
                      ? "border-primary bg-primary text-white"
                      : "border-primary/15 text-primary hover:border-primary/40 bg-[#F8F7F4]"
                  }`}
                >
                  <div className="relative z-10">
                    <h3 className="font-heading text-[25px] leading-[1.05] sm:text-[29px] lg:text-[clamp(1.6rem,2.4vw,2.4rem)]">
                      {routine.name}
                    </h3>

                    <span
                      className={`mt-3 block text-[10px] tracking-[0.12em] uppercase ${
                        active ? "text-white/60" : "text-primary/50"
                      }`}
                    >
                      {routine.subtitle}
                    </span>
                  </div>

                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.3}
                    className={`relative z-10 ml-3 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                      active ? "text-white" : "text-primary/50"
                    }`}
                  />

                  {/* ACTIVE INDICATOR */}
                  {active && (
                    <span className="absolute bottom-0 left-0 h-[3px] w-full bg-white/40" />
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT — ACTIVE ROUTINE */}
          <div
            id="routine-panel"
            role="tabpanel"
            aria-labelledby={`routine-tab-${activeIndex}`}
            className="min-w-0 bg-[#F8F7F4]"
          >
            <div className="grid h-full md:grid-cols-2">
              {/* IMAGE */}
              <div
                ref={imageRef}
                className="relative aspect-4/4 overflow-hidden md:aspect-auto md:min-h-130"
              >
                <Image
                  key={activeRoutine.slug}
                  src={activeRoutine.image}
                  alt={`${activeRoutine.name} skincare bundle`}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />

                <span className="text-primary absolute top-5 left-5 bg-white px-4 py-2 text-[10px] font-semibold tracking-[0.13em] uppercase">
                  {activeRoutine.badge}
                </span>
              </div>

              {/* DETAILS */}
              <div
                ref={contentRef}
                className="flex min-w-0 flex-col p-6 sm:p-8 lg:p-9"
              >
                <span className="text-primary/60 mb-3 text-[10px] font-semibold tracking-[0.2em] uppercase">
                  {activeRoutine.subtitle}
                </span>

                <h3 className="font-heading text-primary text-[clamp(2rem,3vw,3.2rem)] leading-[1.05]">
                  {activeRoutine.name}
                </h3>

                <p className="text-text/65 mt-4 text-[13px] leading-[1.85]">
                  {activeRoutine.description}
                </p>

                {/* INCLUDED PRODUCTS */}
                <div className="border-primary/15 mt-7 border-t pt-6">
                  <span className="text-primary mb-4 block text-[10px] font-semibold tracking-[0.18em] uppercase">
                    What's Included
                  </span>

                  <ul className="space-y-3">
                    {includedProducts.map((product) => (
                      <li
                        key={product.id}
                        className="text-text/70 flex items-start gap-3 text-[13px] leading-relaxed"
                      >
                        <Check
                          size={15}
                          strokeWidth={1.5}
                          className="text-primary mt-0.5 shrink-0"
                        />
                        {product.name}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* USAGE */}
                <div className="border-primary/15 mt-7 flex items-center gap-3 border-t pt-6">
                  <Sun size={17} strokeWidth={1.4} className="text-primary" />
                  <Moon size={17} strokeWidth={1.4} className="text-primary" />

                  <span className="text-text/65 text-[11px]">
                    {activeRoutine.usage}
                  </span>
                </div>

                {/* PRICE + CTA */}
                <div className="mt-auto pt-8">
                  <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <span className="text-text/50 mb-1 block text-[10px] tracking-wider uppercase">
                        Bundle Price
                      </span>

                      <span className="font-heading text-primary text-3xl">
                        {typeof activeRoutine.bundlePrice === "number"
                          ? formatPrice(activeRoutine.bundlePrice)
                          : "Price to be confirmed"}
                      </span>
                    </div>

                    {savings > 0 && (
                      <span className="bg-primary/10 text-primary px-3 py-2 text-[11px] font-semibold">
                        Save {formatPrice(savings)}
                      </span>
                    )}
                  </div>

                  <PrimaryButton
                    href={`/routines/${activeRoutine.slug}`}
                    arrow
                    className="w-full"
                  >
                    Shop Routine
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
