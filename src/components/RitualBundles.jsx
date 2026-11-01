"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Sparkles,
  PackageCheck,
  Droplets,
  Layers3,
  Moon,
  Sun,
} from "lucide-react";

const bundles = [
  {
    id: "essential",
    name: "The Essential Ritual",
    shortName: "Essential",
    subtitle: "Your Everyday Essentials",

    description:
      "A thoughtfully paired skincare routine for your daily moments of care.",

    image: "/assets/plan-duo-1.png",

    products: ["Soothing Peptide Cleanser", "Barrier Peptide Serum"],

    size: "2-Piece Set",
    price: null,
    href: "/collections/routines",

    background: "linear-gradient(135deg,#F7FAFA 0%,#EEF7F9 55%,#E5F0F3 100%)",

    featured: false,

    features: [
      {
        title: "The Daily Essential",
        description: "A simple pairing for your everyday skincare ritual.",
        icon: Sun,
      },
      {
        title: "Thoughtfully Paired",
        description: "Two complementary steps, brought together in one set.",
        icon: Sparkles,
      },
      {
        title: "Cleanse & Follow",
        description: "Start with your cleanser, then apply your serum.",
        icon: Droplets,
      },
      {
        title: "Two Considered Steps",
        description: "A straightforward routine with two selected products.",
        icon: Layers3,
      },
    ],
  },

  {
    id: "complete",
    name: "The Complete Ritual",
    shortName: "Complete",
    subtitle: "The Full Experience",

    description:
      "A complete skincare ritual, bringing together complementary steps.",

    image: "/assets/plan-com.png",

    products: [
      "Soothing Peptide Cleanser",
      "Barrier Peptide Serum",
      "Pure Ceramide Barrier Cream",
    ],

    size: "3-Piece Set",
    price: null,
    href: "/collections/routines",

    background: "linear-gradient(135deg,#FAFBFB 0%,#EFF6F8 55%,#E5F0F4 100%)",

    featured: true,

    features: [
      {
        title: "Complete Your Ritual",
        description: "Three thoughtfully selected steps for everyday skincare.",
        icon: Sparkles,
      },
      {
        title: "A Considered Collection",
        description: "Cleanser, serum, and cream in one curated set.",
        icon: PackageCheck,
      },
      {
        title: "Beautifully Simple",
        description: "A routine designed around complementary products.",
        icon: Droplets,
      },
      {
        title: "Three Essential Steps",
        description: "Cleanse, apply serum, and finish with your cream.",
        icon: Layers3,
      },
    ],
  },

  {
    id: "evening",
    name: "The Evening Ritual",
    shortName: "Evening",
    subtitle: "Your Nighttime Essentials",

    description:
      "A considered collection for slowing down and enjoying your evening routine.",

    image: "/assets/plan-duo-2.png",

    products: [
      "Barrier Peptide Serum",
      "Pure Ceramide Barrier Cream",
      "Overnight Peptide Mask",
    ],

    size: "2-Piece Set",
    price: null,
    href: "/collections/routines",

    background: "linear-gradient(135deg,#FCFAF7 0%,#F7F0E9 55%,#F2E9DF 100%)",

    featured: false,

    features: [
      {
        title: "The Evening Edit",
        description: "A curated collection for your nighttime skincare ritual.",
        icon: Moon,
      },
      {
        title: "Take Your Time",
        description: "Make your evening routine a moment of personal care.",
        icon: Sparkles,
      },
      {
        title: "Layer Your Routine",
        description: "A serum and cream paired with an overnight mask.",
        icon: Droplets,
      },
      {
        title: "A Thoughtful Finish",
        description:
          "Three complementary products for your evening collection.",
        icon: Layers3,
      },
    ],
  },
];

function FeatureInfo({ feature, align = "left", delay = 0 }) {
  const Icon = feature.icon;

  return (
    <article
      style={{ animationDelay: `${delay}ms` }}
      className={`border-primary/6 flex min-w-0 animate-[bundleFeatureIn_650ms_cubic-bezier(0.22,1,0.36,1)_both] flex-col rounded-[20px] border bg-white/65 px-4 py-5 font-sans shadow-[0_10px_35px_rgba(6,48,74,0.035)] backdrop-blur-sm sm:px-5 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:py-1 lg:shadow-none lg:backdrop-blur-none ${
        align === "right"
          ? "lg:items-start lg:text-left"
          : "lg:items-end lg:text-right"
      } motion-reduce:animate-none`}
    >
      {/* ICON */}
      <span className="text-primary flex h-10 w-10 items-center justify-center rounded-full bg-[#E6F3F6]">
        <Icon size={20} strokeWidth={1.5} />
      </span>

      {/* TITLE */}
      <h4 className="text-primary mt-4 lg:mt-2 font-sans text-[16px] leading-[1.4] font-semibold sm:text-[17px]">
        {feature.title}
      </h4>

      {/* DIVIDER */}
      <div className="mt-3 lg:mt-2 h-px w-14 bg-[#B9D4DD]" />

      {/* DESCRIPTION */}
      <p className="text-primary/60 mt-3 lg:mt-2 max-w-[260px] font-sans text-[14px] leading-[1.7] sm:text-[15px]">
        {feature.description}
      </p>
    </article>
  );
}

export default function RitualBundles() {
  const [activeIndex, setActiveIndex] = useState(1);

  const activeBundle = bundles[activeIndex];

  function nextBundle() {
    setActiveIndex((current) => (current + 1) % bundles.length);
  }

  function previousBundle() {
    setActiveIndex(
      (current) => (current - 1 + bundles.length) % bundles.length,
    );
  }

  return (
    <section
      id="ritual-bundles"
      aria-labelledby="ritual-bundles-heading"
      className="px-4 py-12 md:px-6 lg:flex lg:h-svh lg:min-h-[800px] lg:flex-col lg:justify-center lg:pt-28 lg:pb-10"
    >
      <div className="mx-auto w-full max-w-360">
        {/* SECTION HEADER */}
        <header className="mb-9 flex flex-col justify-between gap-5 lg:mb-5 lg:flex-row lg:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 font-sans text-[13px] font-medium tracking-[0.08em] text-[#6999AD] uppercase">
              <Sparkles size={16} strokeWidth={1.5} />
              Curated Skincare Sets
            </span>

            <h2
              id="ritual-bundles-heading"
              className="font-heading text-primary text-[clamp(2.5rem,3.4vw,3.6rem)] leading-[1.05] font-normal"
            >
              The Ritual{" "}
              <span className="text-[#6999AD] italic">Collection.</span>
            </h2>
          </div>

          <p className="text-primary/65 max-w-[370px] font-sans text-[16px] leading-[1.7]">
            Discover thoughtfully paired skincare sets for your everyday
            routine.
          </p>
        </header>

        {/* MAIN SHOWCASE */}
        <div
          className="border-primary/8 relative isolate overflow-hidden rounded-[28px] border px-4 py-7 sm:px-8 sm:py-9 lg:rounded-[36px] lg:px-12 lg:py-5"
          style={{
            background: activeBundle.background,
          }}
        >
          {/* SOFT BACKGROUND LIGHT */}
          <div className="pointer-events-none absolute top-[42%] left-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/65 blur-[95px]" />

          {/* TOP NAVIGATION */}
          <div className="relative z-20 flex flex-col items-center gap-5">
            {/* BUNDLE SWITCH TABS */}
            <div
              role="group"
              aria-label="Choose a skincare bundle"
              className="flex w-full max-w-[530px] items-center justify-center gap-1.5 rounded-full border border-white/90 bg-white/75 p-1.5 shadow-[0_8px_30px_rgba(6,48,74,0.045)] backdrop-blur-xl"
            >
              {bundles.map((bundle, index) => {
                const active = activeIndex === index;

                return (
                  <button
                    key={bundle.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={active}
                    className={`flex min-h-[43px] min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2 font-sans text-[13px] font-semibold transition-all duration-300 sm:px-5 sm:text-[15px] ${
                      active
                        ? "bg-primary text-white shadow-[0_6px_18px_rgba(6,48,74,0.12)]"
                        : "text-primary/65 hover:text-primary hover:bg-white"
                    } `}
                  >
                    {bundle.shortName}

                    {bundle.featured && (
                      <Sparkles
                        size={14}
                        strokeWidth={1.6}
                        className="hidden sm:block"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE BUNDLE */}
          <div
            key={activeBundle.id}
            className="relative z-10 animate-[bundleReveal_600ms_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none"
          >
            {/* NAME ABOVE PRODUCT */}
            <div className="mx-auto mt-8 max-w-[700px] text-center lg:mt-3">
              <span className="font-sans text-[13px] font-medium tracking-[0.1em] text-[#6999AD] uppercase">
                {activeBundle.subtitle}
              </span>

              <h3 className="font-heading text-primary mt-1 text-[clamp(2.4rem,3.2vw,3.4rem)] leading-[1]">
                {activeBundle.name}
              </h3>

              <p className="text-primary/65 mx-auto mt-3 max-w-[460px] font-sans text-[15px] leading-[1.7] lg:mt-1 lg:text-[14px]">
                {activeBundle.description}
              </p>
            </div>

            {/* =====================================
                DESKTOP:
                LEFT INFO | IMAGE | RIGHT INFO

                MOBILE/TABLET:
                IMAGE FIRST | INFO GRID BELOW
            ===================================== */}
            <div className="mx-auto mt-6 grid max-w-[1260px] grid-cols-1 items-center gap-6 lg:mt-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-7 xl:gap-10">
              {/* LEFT FEATURES — DESKTOP */}
              <div className="hidden flex-col justify-center gap-4 lg:flex xl:gap-6">
                <FeatureInfo
                  feature={activeBundle.features[0]}
                  align="left"
                  delay={180}
                />

                <FeatureInfo
                  feature={activeBundle.features[2]}
                  align="left"
                  delay={480}
                />
              </div>

              {/* CENTER PRODUCT IMAGE */}
              <div className="relative order-1 min-w-0 lg:order-2">
                <div className="relative mx-auto w-full max-w-[580px]">
                  {/* SOFT IMAGE FRAME */}
                  <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[22px] border border-white/65 shadow-[0_22px_55px_rgba(6,48,74,0.055)] sm:aspect-[6/4] lg:aspect-auto lg:h-[max(220px,calc(100svh-610px))] xl:aspect-auto">
                    <Image
                      src={activeBundle.image}
                      alt={`${activeBundle.name} skincare bundle`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-contain transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </div>

                  {/* FEATURED LABEL */}
                  {activeBundle.featured && (
                    <span className="bg-primary absolute top-4 left-4 inline-flex items-center gap-2 rounded-full px-4 py-2 font-sans text-[13px] font-medium text-white">
                      <Sparkles size={15} strokeWidth={1.5} />
                      Featured Set
                    </span>
                  )}

                  {/* SET SIZE */}
                  <span className="text-primary absolute bottom-4 left-4 rounded-full border border-white/80 bg-white/85 px-4 py-2 font-sans text-[13px] font-medium backdrop-blur-md">
                    {activeBundle.size}
                  </span>
                </div>
              </div>

              {/* RIGHT FEATURES — DESKTOP */}
              <div className="hidden flex-col justify-center gap-4 lg:order-3 lg:flex xl:gap-6">
                <FeatureInfo
                  feature={activeBundle.features[1]}
                  align="right"
                  delay={330}
                />

                <FeatureInfo
                  feature={activeBundle.features[3]}
                  align="right"
                  delay={630}
                />
              </div>

              {/* MOBILE + TABLET FEATURES */}
              <div className="order-2 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
                {activeBundle.features.map((feature, index) => (
                  <FeatureInfo
                    key={feature.title}
                    feature={feature}
                    align="right"
                    delay={150 + index * 120}
                  />
                ))}
              </div>
            </div>

            {/* INCLUDED PRODUCTS */}
            <div className="border-primary/10 mx-auto mt-8 max-w-[900px] border-t pt-7 text-center lg:mt-3 lg:pt-3">
              <div className="flex items-center justify-center gap-2">
                <PackageCheck
                  size={19}
                  strokeWidth={1.5}
                  className="text-[#6999AD]"
                />

                <span className="text-primary font-sans text-[15px] font-semibold">
                  What's Inside
                </span>
              </div>

              <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                {activeBundle.products.map((product) => (
                  <li
                    key={product}
                    className="text-primary/70 inline-flex items-center gap-2 font-sans text-[14px] sm:text-[15px]"
                  >
                    <Check
                      size={17}
                      strokeWidth={1.7}
                      className="text-[#6999AD]"
                    />

                    {product}
                  </li>
                ))}
              </ul>
            </div>

            {/* BOTTOM ACTIONS */}
            <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/* PREVIOUS */}
              <button
                type="button"
                onClick={previousBundle}
                aria-label="Previous bundle"
                className="border-primary/15 text-primary hidden h-12 w-12 items-center justify-center rounded-full border bg-white/75 transition-colors hover:bg-white sm:flex"
              >
                <ArrowRight
                  size={19}
                  strokeWidth={1.5}
                  className="rotate-180"
                />
              </button>

              {/* EXPLORE */}
              <Link
                href={activeBundle.href}
                className="group/button bg-primary flex min-h-[56px] w-full max-w-[290px] items-center justify-between gap-5 rounded-full py-1.5 pr-1.5 pl-7 font-sans text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[#0A4968]"
              >
                Explore This Set
                <span className="text-primary flex h-11 w-11 items-center justify-center rounded-full bg-[#D8EDF3] transition-transform duration-300 group-hover/button:rotate-45">
                  <ArrowUpRight size={20} strokeWidth={1.5} />
                </span>
              </Link>

              {/* NEXT */}
              <button
                type="button"
                onClick={nextBundle}
                aria-label="Next bundle"
                className="border-primary/15 text-primary hidden h-12 w-12 items-center justify-center rounded-full border bg-white/75 transition-colors hover:bg-white sm:flex"
              >
                <ArrowRight size={19} strokeWidth={1.5} />
              </button>
            </div>

            {/* PRICE, IF AVAILABLE */}
            {activeBundle.price != null && (
              <p className="text-primary mt-4 text-center font-sans text-[20px] font-semibold">
                ${Number(activeBundle.price).toFixed(2)}
              </p>
            )}
          </div>

          {/* BOTTOM DECORATIVE NUMBER */}
          <div className="font-heading text-primary/5 pointer-events-none absolute right-7 bottom-6 hidden text-[60px] leading-none lg:block">
            0{activeIndex + 1}
          </div>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style jsx global>{`
        @keyframes bundleReveal {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bundleFeatureIn {
          from {
            opacity: 0;
            transform: translateY(22px) scale(0.96);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          [class*="animate-"] {
            animation-duration: 0.01ms;
            animation-delay: 0ms;
          }
        }
      `}</style>
    </section>
  );
}
