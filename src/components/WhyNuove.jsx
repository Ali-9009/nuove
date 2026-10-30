"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Atom,
  FlaskConical,
  Sun,
  Gem,
  Plus,
  Minus,
} from "lucide-react";
import gsap from "gsap";

const features = [
  {
    title: "Peptide-Focused",
    subtitle: "Formulations With Intention",
    description:
      "Peptides are central to NUOVÉ's formulation philosophy. Different peptides are explored for different cosmetic skin benefits, with their potential depending on the specific ingredient, concentration, formulation, and supporting evidence.",
    icon: Atom,
    word: "SCIENCE",
  },
  {
    title: "Thoughtful Ingredients",
    subtitle: "The Beauty of Balance",
    description:
      "Our approach brings peptide-focused ingredients together with complementary skincare components. We believe the complete formulation deserves consideration, not just one celebrated ingredient.",
    icon: FlaskConical,
    word: "BALANCE",
  },
  {
    title: "Everyday Rituals",
    subtitle: "Skincare Made Personal",
    description:
      "Skincare should fit naturally into everyday life. NUOVÉ brings together products and routines designed to make daily self-care feel considered, approachable, and enjoyable.",
    icon: Sun,
    word: "RITUAL",
  },
  {
    title: "Elevated Simplicity",
    subtitle: "Luxury in Every Detail",
    description:
      "NUOVÉ embraces a refined approach to skincare, where thoughtful presentation and a modern aesthetic meet the simplicity of everyday care. An approachable expression of luxury.",
    icon: Gem,
    word: "LUXURY",
  },
];

export default function WhyNuove() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef(null);
  const detailsRef = useRef(null);
  const decorationRef = useRef(null);
  const initialized = useRef(false);

  const activeFeature = features[activeIndex];
  const ActiveIcon = activeFeature.icon;

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        detailsRef.current?.children || [],
        {
          y: 22,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
          overwrite: "auto",
        }
      );

      gsap.fromTo(
        decorationRef.current,
        {
          scale: 0.88,
          rotation: -15,
          opacity: 0.4,
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          overwrite: "auto",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="why-nuove-heading"
     className="relative mx-auto max-w-390 overflow-hidden rounded-2xl bg-primary py-20 text-white sm:py-24 lg:py-32"
    >
      {/* BACKGROUND DECORATION */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-white/5" />

        <div className="absolute -right-20 -top-20 h-[350px] w-[350px] rounded-full border border-white/5" />

        <div className="absolute -bottom-60 -left-40 h-[500px] w-[500px] rounded-full border border-white/5" />
      </div>

      <div className="relative mx-auto max-w-360 px-5 sm:px-8 lg:px-12 ">
        {/* SECTION HEADER */}
        <header className="mb-14 flex flex-col gap-7 border-b border-white/15 pb-10 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="mb-5 block text-[11px] font-medium uppercase tracking-[0.25em] text-white/60">
              The NUOVÉ Difference
            </span>

            <h2
              id="why-nuove-heading"
             className="font-heading text-white text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] font-normal"
            >
              Why <span className="italic">NUOVÉ?</span>
            </h2>
          </div>

          <p className="max-w-88 text-sm leading-[1.9] text-white/60 md:text-md">
            A considered approach to modern skincare.
            Discover the philosophy behind our formulas,
            ingredients, and everyday rituals.
          </p>
        </header>

        {/* INTERACTIVE LAYOUT */}
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* LEFT — INTERACTIVE ACCORDION */}
          <div className="border-t border-white/20">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const active = activeIndex === index;

              return (
                <article
                  key={feature.title}
                  className="border-b border-white/20"
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-expanded={active}
                    aria-controls={`nuove-feature-${index}`}
                    className="group flex w-full items-center gap-5 py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-inset sm:py-8"
                  >
                    {/* ICON */}
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 sm:h-14 sm:w-14 ${
                        active
                          ? "border-white bg-white text-primary"
                          : "border-white/25 text-white/60 group-hover:border-white/70 group-hover:text-white"
                      }`}
                    >
                      <Icon size={22} strokeWidth={1.3} />
                    </span>

                    {/* TITLE */}
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block font-heading text-[clamp(1.8rem,2.7vw,2.8rem)] leading-[1.05] transition-colors duration-300 ${
                          active
                            ? "text-white"
                            : "text-white/60 group-hover:text-white"
                        }`}
                      >
                        {feature.title}
                      </span>

                      <span
                        className={`mt-2 block text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 ${
                          active ? "text-white/65" : "text-white/35"
                        }`}
                      >
                        {feature.subtitle}
                      </span>
                    </span>

                    {/* PLUS / MINUS */}
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        active
                          ? "rotate-180 border-white bg-white text-primary"
                          : "border-white/20 text-white/50 group-hover:border-white/70 group-hover:text-white"
                      }`}
                    >
                      {active ? (
                        <Minus size={17} strokeWidth={1.5} />
                      ) : (
                        <Plus size={17} strokeWidth={1.5} />
                      )}
                    </span>
                  </button>

                  {/* MOBILE EXPANDED CONTENT */}
                  <div
                    id={`nuove-feature-${index}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out lg:hidden ${
                      active
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="max-w-[480px] pb-8 pl-[68px] text-[13px] leading-[1.9] text-white/70 sm:pl-[76px]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* RIGHT — ACTIVE FEATURE SHOWCASE */}
          <div
            className="relative hidden min-h-120 overflow-hidden border border-white/15 bg-white/4 p-10 lg:flex lg:flex-col lg:justify-between xl:p-14"
            aria-live="polite"
            aria-atomic="true"
          >
            {/* TOP */}
            <div className="relative z-10 flex items-start justify-between gap-5">
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/50">
                The NUOVÉ Philosophy
              </span>

              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20">
                <ActiveIcon
                  size={23}
                  strokeWidth={1.2}
                  aria-hidden="true"
                />
              </span>
            </div>

            {/* LARGE DECORATIVE WORD */}
            <div
              ref={decorationRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
            >
              <span className="select-none whitespace-nowrap font-heading text-[clamp(7rem,12vw,12rem)] font-normal italic tracking-[-0.07em] text-white/6">
                {activeFeature.word}
              </span>
            </div>

            {/* ACTIVE CONTENT */}
            <div
              key={activeIndex}
              ref={detailsRef}
              className="relative z-10 mt-auto max-w-132"
            >
              <span className="mb-5 block text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
                {activeFeature.subtitle}
              </span>

              <h3 className="font-heading text-[clamp(2.8rem,4vw,4.5rem)] leading-[1.05] tracking-tight text-white">
                {activeFeature.title}
              </h3>

              <p className="mt-5 max-w-115 text-[13px] leading-[1.9] text-white/70 xl:text-sm">
                {activeFeature.description}
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <footer className="mt-14 flex flex-col gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-20">
          <p className="font-heading text-[26px] italic text-white/80 sm:text-[32px]">
            Beautifully considered. Purposefully created.
          </p>

          <Link
            href="/pages/our-story"
            className="group inline-flex min-h-11 items-center gap-4 self-start border-b border-white/60 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:gap-6"
          >
            Discover Our Story

            <ArrowUpRight
              size={18}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </footer>
      </div>
    </section>
  );
}