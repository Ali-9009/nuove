import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight, Check, Sparkles, ArrowRight } from "lucide-react";

const bundles = [
  {
    id: "essential",
    name: "The Essential Ritual",
    subtitle: "Your Everyday Essentials",
    description:
      "A thoughtfully paired skincare routine for your daily moments of care.",

    image: "/assets/plan-2.png",

    products: ["Soothing Peptide Cleanser", "Barrier Peptide Serum"],

    price: null,
    size: "2-Piece Set",

    href: "/collections/routines",

    background:
      "bg-[linear-gradient(145deg,#E8F5F8_0%,#F7FAFA_55%,#D8EBF0_100%)]",

    featured: false,
  },

  {
    id: "complete",
    name: "The Complete Ritual",
    subtitle: "The Full Experience",
    description:
      "A complete skincare ritual, bringing together complementary steps.",

    image: "/assets/plan-1.png",

    products: [
      "Soothing Peptide Cleanser",
      "Barrier Peptide Serum",
      "Pure Ceramide Barrier Cream",
    ],

    price: null,
    size: "3-Piece Set",

    href: "/collections/routines",

    background:
      "bg-[linear-gradient(145deg,#E4EEF3_0%,#F8FAFA_50%,#D5E5ED_100%)]",

    featured: true,
  },

  {
    id: "evening",
    name: "The Evening Ritual",
    subtitle: "Your Nighttime Essentials",
    description:
      "A considered collection for slowing down and enjoying your evening routine.",

    image: "/assets/plan-3.png",

    products: [
      "Barrier Peptide Serum",
      "Pure Ceramide Barrier Cream",
      "Overnight Peptide Mask",
    ],

    price: null,
    size: "2-Piece Set",

    href: "/collections/routines",

    background:
      "bg-[linear-gradient(145deg,#F6EDE4_0%,#FCF9F5_55%,#EADBCD_100%)]",

    featured: false,
  },
];

/* ==========================================
   SINGLE BUNDLE CARD
========================================== */

function BundleCard({ bundle }) {
  return (
    <article
      className={`group border-primary/10 relative flex h-full min-w-0 flex-col overflow-hidden rounded-[28px] border bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_65px_rgba(6,48,74,0.1)] ${
        bundle.featured
          ? "shadow-[0_15px_45px_rgba(6,48,74,0.08)]"
          : "shadow-[0_10px_30px_rgba(6,48,74,0.035)]"
      } `}
    >
      {/* IMAGE AREA */}
      <Link
        href={bundle.href}
        aria-label={`Explore ${bundle.name}`}
        className={`relative block aspect-[5/4] overflow-hidden sm:aspect-[4/3] lg:aspect-[5/4] ${bundle.background} `}
      >
        {/* SOFT BACKGROUND DECORATION */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[80%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/45 blur-[50px]" />

        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50" />

        {/* PRODUCT IMAGE */}
        <Image
          src={bundle.image}
          alt={`${bundle.name} skincare bundle`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="relative z-10 object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />

        {/* SOFT BOTTOM OVERLAY */}
        <div className="from-primary/10 pointer-events-none absolute inset-0 z-10 bg-gradient-to-t via-transparent to-transparent" />

        {/* FEATURED BADGE */}
        {bundle.featured && (
          <span className="bg-primary absolute top-5 left-5 z-20 inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-sans text-[13px] font-medium text-white shadow-[0_8px_20px_rgba(6,48,74,0.12)]">
            <Sparkles size={15} strokeWidth={1.5} />
            Complete Routine
          </span>
        )}

        {/* IMAGE ARROW */}
        <span className="text-primary group-hover:bg-primary absolute right-5 bottom-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_8px_25px_rgba(6,48,74,0.08)] transition-all duration-300 group-hover:rotate-45 group-hover:text-white">
          <ArrowUpRight size={20} strokeWidth={1.5} />
        </span>
      </Link>

      {/* CARD CONTENT */}
      <div className="flex flex-1 flex-col p-6 sm:p-7 xl:p-8">
        {/* TOP LABEL */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-sans text-[14px] font-medium text-[#6996AA]">
            {bundle.subtitle}
          </span>

          <span className="text-primary rounded-full bg-[#EAF4F6] px-3 py-1.5 font-sans text-[13px] font-medium">
            {bundle.size}
          </span>
        </div>

        {/* TITLE */}
        <h3 className="font-heading text-primary mt-5 text-[clamp(2.2rem,3vw,3rem)] leading-[0.98]">
          {bundle.name}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-primary/65 mt-4 font-sans text-[16px] leading-[1.7]">
          {bundle.description}
        </p>

        {/* INCLUDED PRODUCTS */}
        <div className="border-primary/10 mt-7 border-t pt-6">
          <h4 className="text-primary font-sans text-[15px] font-semibold">
            What's Inside
          </h4>

          <ul className="mt-4 space-y-3">
            {bundle.products.map((product) => (
              <li
                key={product}
                className="text-primary/70 flex items-start gap-3 font-sans text-[15px] leading-[1.5]"
              >
                <Check
                  size={18}
                  strokeWidth={1.7}
                  className="mt-0.5 shrink-0 text-[#6296AA]"
                />

                <span>{product}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* BOTTOM ACTION */}
        <div className="mt-auto pt-8">
          {bundle.price != null && (
            <p className="text-primary mb-4 font-sans text-[22px] font-semibold">
              ${Number(bundle.price).toFixed(2)}
            </p>
          )}

          <Link
            href={bundle.href}
            className={`group/button flex min-h-[56px] w-full items-center justify-between gap-4 rounded-full py-1.5 pr-1.5 pl-6 font-sans text-[15px] font-semibold transition-colors duration-300 ${
              bundle.featured
                ? "bg-primary text-white hover:bg-[#0A4968]"
                : "border-primary/15 text-primary border bg-[#F0F6F7] hover:bg-[#E2EFF2]"
            } `}
          >
            Explore Set
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover/button:rotate-45 ${
                bundle.featured
                  ? "text-primary bg-[#D8EDF3]"
                  : "text-primary bg-white"
              } `}
            >
              <ArrowUpRight size={20} strokeWidth={1.5} />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function RitualBundles() {
  return (
    <section
      id="ritual-bundles"
      aria-labelledby="ritual-bundles-heading"
      className="px-4 py-14 md:px-6 lg:py-20"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* SECTION HEADER */}
        <header className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 lg:flex-row lg:items-end">
          <div>
            <h2
              id="ritual-bundles-heading"
              className="font-heading text-primary text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] font-normal"
            >
              The Ritual
              <br />
              <span className="text-[#6999AD] italic">Collection.</span>
            </h2>
          </div>

          <div className="max-w-[400px]">
            <p className="text-primary/65 font-sans text-[17px] leading-[1.7]">
              Discover thoughtfully paired skincare sets for your everyday
              routine.
            </p>

            <Link
              href="/collections/routines"
              className="group text-primary mt-5 inline-flex items-center gap-3 font-sans text-[15px] font-semibold"
            >
              Explore All Sets
              <ArrowRight
                size={19}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </header>

        {/* 3 BUNDLE CARDS */}
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {bundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      </div>
    </section>
  );
}
