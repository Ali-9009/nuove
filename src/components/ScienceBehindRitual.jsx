"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Droplets, Moon, Sun, X } from "lucide-react";

const ingredients = [
  {
    name: "Peptides",
    label: "Firm & Smooth",
    description: "Support smoother, firmer-looking skin.",
    benefit: "Helps improve the appearance of skin firmness.",
    usage: "Use after cleansing, before moisturizer.",
    icon: Sparkles,
    link: "/products/barrier-peptide-serum",
    background: "from-[#E4F3F8] via-[#F0F8FA] to-[#D4EAF2]",
  },
  {
    name: "Ceramides",
    label: "Hydrate & Restore",
    description: "Essential lipids for the skin barrier.",
    benefit: "Help retain moisture and reduce dryness.",
    usage: "Apply after serum to seal in hydration.",
    icon: Droplets,
    link: "/products/pure-ceramide-barrier-cream",
    background: "from-[#E9F5F7] via-[#F7FAF9] to-[#DBECEB]",
  },
  {
    name: "Retinol",
    label: "Renew & Refine",
    description: "Vitamin A for smoother-looking skin.",
    benefit: "Helps improve the look of texture and fine lines.",
    usage:
      "Introduce gradually at night. Wear SPF daily; avoid during pregnancy.",
    icon: Moon,
    link: "/products/retinol-barrier-cream",
    background: "from-[#F7EDE3] via-[#FAF7F2] to-[#EADCCE]",
  },
  {
    name: "Vitamin C",
    label: "Brighten & Revitalize",
    description: "Antioxidant care for visible radiance.",
    benefit: "Helps brighten the look of uneven skin tone.",
    usage: "Apply in the morning before moisturizer and SPF.",
    icon: Sun,
    link: "/products/vitamin-c-peptide-brightening-serum",
    background: "from-[#FFF1DE] via-[#FFF9EF] to-[#F3E6CE]",
  },
];

function IngredientCard({ ingredient }) {
  const [open, setOpen] = useState(false);
  const Icon = ingredient.icon;

  return (
    <article
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") {
          setOpen(true);
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") {
          setOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
      className={`group relative h-[400px] overflow-hidden rounded-[26px] bg-gradient-to-b ${ingredient.background} sm:h-[440px] lg:h-[460px]`}
    >
      {/* DECORATIVE CIRCLES */}
      <div className="pointer-events-none absolute top-[24%] left-1/2 h-[220px] w-[220px] -translate-x-1/2 rounded-full border border-white/70 bg-white/20 shadow-[0_0_0_18px_rgba(255,255,255,0.18),0_0_0_38px_rgba(255,255,255,0.1)]" />

      {/* DEFAULT VIEW */}
      <div
        aria-hidden={open}
        className={`absolute inset-0 flex flex-col items-center justify-center px-5 py-6 text-center transition-all duration-500 sm:px-6 sm:py-9 lg:justify-between lg:pt-12 lg:pb-9 ${
          open ? "-translate-y-8 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        {/* LABEL */}
        <span className="text-primary shrink-0 rounded-full border border-white/80 bg-white/60 px-4 py-2 font-sans text-[13px] font-medium backdrop-blur-md">
          {ingredient.label}
        </span>

        {/* ICON */}
        <div className="relative my-5 flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/65 shadow-[0_18px_45px_rgba(6,48,74,0.09)] backdrop-blur-md sm:my-7 sm:h-28 sm:w-28 lg:my-auto lg:h-36 lg:w-36">
          <Icon
            size={42}
            strokeWidth={1.2}
            className="text-primary sm:h-12 sm:w-12 lg:h-[58px] lg:w-[58px]"
          />
        </div>

        {/* CONTENT */}
        <div className="shrink-0">
          <h3 className="font-heading text-primary text-[38px] leading-none sm:text-[44px] lg:text-[46px]">
            {ingredient.name}
          </h3>

          <p className="text-primary/70 mx-auto mt-3 max-w-[260px] font-sans text-[15px] leading-[1.6] lg:mt-4">
            {ingredient.description}
          </p>

          <span className="text-primary mt-4 inline-flex items-center gap-2 font-sans text-[14px] font-semibold lg:hidden">
            Tap to explore
            <ArrowUpRight size={17} />
          </span>
        </div>
      </div>

      {/* HOVER VIEW */}
      <div
        inert={!open}
        aria-hidden={!open}
        className={`absolute inset-2 flex flex-col rounded-[21px] border border-white/80 bg-white/90 p-6 shadow-[0_18px_55px_rgba(6,48,74,0.09)] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-7 ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0"
        }`}
      >
        {/* TOP */}
        <div className="flex items-start justify-between">
          <span className="text-primary flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF6F8]">
            <Icon size={29} strokeWidth={1.4} />
          </span>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={`Close ${ingredient.name} details`}
            className="text-primary flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F3F0] lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <h3 className="font-heading text-primary mt-6 text-[42px] leading-none">
          {ingredient.name}
        </h3>

        <p className="text-primary/75 mt-4 text-[15px] leading-[1.65]">
          {ingredient.benefit}
        </p>

        <div className="border-primary/15 mt-6 border-t pt-5">
          <span className="text-primary text-[13px] font-semibold tracking-[0.06em] uppercase">
            How to Use
          </span>

          <p className="text-primary/70 mt-2 text-[15px] leading-[1.6]">
            {ingredient.usage}
          </p>
        </div>

        <Link
          href={ingredient.link}
          className="group/link bg-primary mt-auto flex min-h-13 items-center justify-between gap-3 rounded-full py-1.5 pr-1.5 pl-5 text-[14px] font-semibold text-white transition-colors hover:bg-[#0A4968]"
        >
          Explore Product
          <span className="text-primary flex h-10 w-10 items-center justify-center rounded-full bg-[#D8EDF3] transition-transform group-hover/link:rotate-45">
            <ArrowUpRight size={19} />
          </span>
        </Link>
      </div>

      {/* MOBILE TAP TARGET */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Explore ${ingredient.name}`}
          aria-expanded={open}
          className="absolute inset-0 z-10 cursor-pointer md:hidden"
        />
      )}
    </article>
  );
}

export default function ScienceBehindRitual() {
  return (
    <section
      id="science"
      aria-labelledby="science-heading"
      className="px-4 py-12 md:px-6 lg:py-20"
    >
      <div className="mx-auto max-w-360 rounded-3xl bg-linear-to-b from-[#EAF6F8] to-[#F8F7F4] py-16 sm:px-8 lg:px-12 lg:py-20">
        <header className="mx-auto max-w-200 text-center">
          <h2
            id="science-heading"
            className="font-heading text-primary text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] font-normal"
          >
            The Science Behind
            <br />
            <span className="text-[#558AA5] italic">the Ritual.</span>
          </h2>

          <p className="text-primary/65 mx-auto mt-6 max-w-[550px] text-[16px] leading-[1.7]">
            Discover the ingredients behind thoughtful skincare.
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ingredients.map((ingredient) => (
            <IngredientCard key={ingredient.name} ingredient={ingredient} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/collections/all"
            className="group bg-primary inline-flex min-h-14 items-center gap-6 rounded-full py-1.5 pr-1.5 pl-7 text-[14px] font-semibold text-white transition-colors hover:bg-[#0A4968]"
          >
            Explore Our Formulations
            <span className="text-primary flex h-11 w-11 items-center justify-center rounded-full bg-[#D8EDF3] transition-transform group-hover:rotate-45">
              <ArrowUpRight size={19} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
