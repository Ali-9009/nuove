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
} from "lucide-react";

const bundles = [
  {
    id: "essential",
    name: "The Essential Ritual",
    shortName: "Essential",
    subtitle: "Your Everyday Essentials",
    description:
      "A thoughtfully paired skincare routine for your daily moments of care.",

    image: "/assets/plan-2.png",

    products: ["Soothing Peptide Cleanser", "Barrier Peptide Serum"],

    size: "2-Piece Set",
    price: null,
    href: "/collections/routines",

    background: "linear-gradient(145deg,#E8F5F8 0%,#F7FAFA 55%,#D8EBF0 100%)",

    featured: false,
  },
  {
    id: "complete",
    name: "The Complete Ritual",
    shortName: "Complete",
    subtitle: "The Full Experience",
    description:
      "A complete skincare ritual, bringing together complementary steps.",

    image: "/assets/plan-1.png",

    products: [
      "Soothing Peptide Cleanser",
      "Barrier Peptide Serum",
      "Pure Ceramide Barrier Cream",
    ],

    size: "3-Piece Set",
    price: null,
    href: "/collections/routines",

    background: "linear-gradient(145deg,#E4EEF3 0%,#F8FAFA 50%,#D5E5ED 100%)",

    featured: true,
  },
  {
    id: "evening",
    name: "The Evening Ritual",
    shortName: "Evening",
    subtitle: "Your Nighttime Essentials",
    description:
      "A considered collection for slowing down and enjoying your evening routine.",

    image: "/assets/plan-3.png",

    products: [
      "Barrier Peptide Serum",
      "Pure Ceramide Barrier Cream",
      "Overnight Peptide Mask",
    ],

    // Corrected to match the three listed products.
    size: "3-Piece Set",
    price: null,
    href: "/collections/routines",

    background: "linear-gradient(145deg,#F6EDE4 0%,#FCF9F5 55%,#EADBCD 100%)",

    featured: false,
  },
];

export default function RitualBundles() {
  const [activeIndex, setActiveIndex] = useState(1);

  const activeBundle = bundles[activeIndex];

  return (
    <section
      id="ritual-bundles"
      aria-labelledby="ritual-bundles-heading"
      className="overflow-hidden px-4 py-10 md:px-6 lg:py-12"
    >
      <div className="mx-auto max-w-360">
        {/* SECTION HEADER */}
        <header className="mb-10 flex flex-col justify-between gap-5 lg:mb-12 lg:flex-row lg:items-end">
          <div>
            <h2
              id="ritual-bundles-heading"
              className="font-heading text-primary text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] font-normal"
            >
              The Ritual{" "}
              <span className="text-[#6999AD] italic">Collection.</span>
            </h2>
          </div>

          <p className="text-primary/65 max-w-[390px] font-sans text-[16px] leading-[1.7]">
            Discover thoughtfully paired skincare sets for your everyday
            routine.
          </p>
        </header>

        {/* MAIN INTERACTIVE SHOWCASE */}
        <div className="border-primary/10 overflow-hidden rounded-[28px] border bg-[#F8F9F7] lg:rounded-[36px]">
          <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
            {/* =====================================
                LEFT — BUNDLE TABS
            ===================================== */}
            <div className="border-primary/10 border-b bg-[#F2F6F6] p-4 sm:p-5 lg:border-r lg:border-b-0 lg:px-6 lg:py-5">
              <div className="mb-6 hidden lg:block">
                <p className="font-heading text-primary text-[30px] leading-none">
                  Find Your Ritual.
                </p>

                <p className="text-primary/60 mt-3 font-sans text-[15px] leading-[1.6]">
                  Explore our curated sets.
                </p>
              </div>

              <div
                role="tablist"
                aria-label="Choose a skincare bundle"
                aria-orientation="vertical"
                className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
              >
                {bundles.map((bundle, index) => {
                  const active = activeIndex === index;

                  return (
                    <button
                      key={bundle.id}
                      id={`bundle-tab-${bundle.id}`}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      aria-controls="bundle-panel"
                      onClick={() => setActiveIndex(index)}
                      className={`group/tab relative flex min-h-[52px] shrink-0 items-center justify-between gap-3 rounded-[16px] px-5 py-3 text-left font-sans transition-all duration-300 lg:min-h-[74px] lg:w-full lg:rounded-[20px] ${
                        active
                          ? "bg-primary text-white shadow-[0_12px_30px_rgba(6,48,74,0.12)]"
                          : "text-primary bg-white/65 hover:bg-white"
                      }`}
                    >
                      <div>
                        <span className="block text-[15px] font-semibold sm:text-[16px]">
                          <span className="lg:hidden">{bundle.shortName}</span>

                          <span className="hidden lg:inline">
                            {bundle.name}
                          </span>
                        </span>

                        <span
                          className={`mt-2 hidden text-[14px] lg:block ${
                            active ? "text-white/70" : "text-primary/55"
                          }`}
                        >
                          {bundle.size}
                        </span>
                      </div>

                      <ArrowUpRight
                        size={19}
                        strokeWidth={1.5}
                        className={`hidden shrink-0 transition-transform duration-300 lg:block ${
                          active
                            ? "text-white"
                            : "text-primary/40 group-hover/tab:rotate-45"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* BOTTOM LINK */}
              <Link
                href="/collections/routines"
                className="text-primary mt-8 hidden items-center gap-2 font-sans text-[15px] font-medium transition-colors hover:text-[#6999AD] lg:inline-flex"
              >
                Explore All Sets
                <ArrowRight size={17} />
              </Link>
            </div>

            {/* =====================================
                RIGHT — ACTIVE BUNDLE
            ===================================== */}
            <div
              id="bundle-panel"
              role="tabpanel"
              aria-labelledby={`bundle-tab-${activeBundle.id}`}
              key={activeBundle.id}
              className="animate-[bundleReveal_550ms_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none"
            >
              <div className="grid min-h-full grid-cols-1 lg:grid-cols-2">
                {/* PRODUCT IMAGE */}
                <div
                  className="relative flex min-h-[330px] items-center justify-center overflow-hidden sm:min-h-[420px] lg:min-h-[480px]"
                  style={{
                    background: activeBundle.background,
                  }}
                >
                  {/* IMAGE */}
                  {/* FULL BUNDLE IMAGE */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={activeBundle.image}
                      alt={`${activeBundle.name} skincare set`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-fill transition-transform duration-700 ease-out hover:scale-[1.03]"
                    />
                  </div>

                  {/* FEATURED LABEL */}
                  {activeBundle.featured && (
                    <span className="bg-primary absolute top-5 left-5 inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-sans text-[13px] font-medium text-white sm:top-7 sm:left-7">
                      <Sparkles size={15} />
                      Featured Set
                    </span>
                  )}

                  {/* SIZE LABEL */}
                  <span className="text-primary absolute bottom-5 left-5 rounded-full border border-white/80 bg-white/75 px-4 py-2 font-sans text-[14px] font-medium backdrop-blur-md sm:bottom-7 sm:left-7">
                    {activeBundle.size}
                  </span>
                </div>

                {/* BUNDLE INFORMATION */}
                <div className="flex flex-col justify-center bg-white/70 px-6 py-7 sm:px-9 sm:py-8 lg:px-9 lg:py-6 xl:px-12">
                  <span className="font-sans text-[14px] font-medium text-[#6999AD]">
                    {activeBundle.subtitle}
                  </span>

                  <h3 className="font-heading text-primary mt-4 text-[clamp(2.5rem,3.5vw,4.2rem)] leading-[0.98]">
                    {activeBundle.name}
                  </h3>

                  <p className="text-primary/65 mt-5 max-w-[420px] font-sans text-[16px] leading-[1.75]">
                    {activeBundle.description}
                  </p>

                  {/* INCLUDED PRODUCTS */}
                  <div className="border-primary/10 mt-8 border-t pt-7">
                    <div className="flex items-center gap-2">
                      <PackageCheck
                        size={20}
                        strokeWidth={1.5}
                        className="text-[#6999AD]"
                      />

                      <h4 className="text-primary font-sans text-[16px] font-semibold">
                        What's Inside
                      </h4>
                    </div>

                    <ul className="mt-5 space-y-4">
                      {activeBundle.products.map((product) => (
                        <li
                          key={product}
                          className="text-primary/70 flex items-start gap-3 font-sans text-[15px] leading-[1.5]"
                        >
                          <span className="text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EAF5F7]">
                            <Check size={14} strokeWidth={2} />
                          </span>

                          {product}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* PRICE — ONLY IF PROVIDED */}
                  {activeBundle.price != null && (
                    <p className="text-primary mt-8 font-sans text-[25px] font-semibold">
                      ${Number(activeBundle.price).toFixed(2)}
                    </p>
                  )}

                  {/* CTA */}
                  <Link
                    href={activeBundle.href}
                    className="group/button bg-primary mt-9 flex min-h-[58px] w-full max-w-[340px] items-center justify-between gap-4 rounded-full py-1.5 pr-1.5 pl-7 font-sans text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[#0A4968]"
                  >
                    Explore This Set
                    <span className="text-primary flex h-11 w-11 items-center justify-center rounded-full bg-[#D8EDF3] transition-transform duration-300 group-hover/button:rotate-45">
                      <ArrowUpRight size={19} strokeWidth={1.5} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE ALL SETS LINK */}
        <div className="mt-6 flex justify-center lg:hidden">
          <Link
            href="/collections/routines"
            className="text-primary inline-flex items-center gap-2 font-sans text-[15px] font-semibold"
          >
            Explore All Sets
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes bundleReveal {
          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
