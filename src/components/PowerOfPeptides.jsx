"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Atom,
  FlaskConical,
  Sparkles,
  MoveUpRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    number: "01",
    label: "The Science",
    title: "Every Peptide Has a Purpose.",
    description:
      "Peptides are short chains of amino acids. Different types are studied for different cosmetic benefits, including the appearance of firmness, smoothness, and hydration. Their potential effects depend on the specific peptide and supporting evidence.",
    icon: Atom,
    detail: "UNDERSTAND THE INGREDIENT",
  },
  {
    number: "02",
    label: "The Formulation",
    title: "It's All in the Details.",
    description:
      "A peptide's concentration, stability, delivery, and compatibility with complementary ingredients can influence how a skincare formula performs. The complete formulation matters just as much as the individual ingredient.",
    icon: FlaskConical,
    detail: "THOUGHTFULLY FORMULATED",
  },
  {
    number: "03",
    label: "The Ritual",
    title: "A More Thoughtful Approach.",
    description:
      "Skincare choices should consider individual skin needs, consistent use, and the quality of available research. At NUOVÉ, our approach brings peptide-focused formulations and approachable everyday luxury together.",
    icon: Sparkles,
    detail: "ELEVATE THE EVERYDAY",
  },
];

function TimelineContent({ step, align = "left" }) {
  const Icon = step.icon;

  return (
    <div
      className={`max-w-[440px] ${
        align === "right" ? "md:ml-auto md:text-right" : ""
      }`}
    >
      {/* ICON + LABEL */}
      <div
        className={`mb-5 flex items-center gap-3 ${
          align === "right" ? "md:justify-end" : ""
        }`}
      >
        <span className="border-primary/15 text-primary flex h-11 w-11 items-center justify-center rounded-full border bg-white">
          <Icon size={20} strokeWidth={1.3} />
        </span>

        <span className="text-primary/60 text-[10px] font-semibold tracking-[0.23em] uppercase">
          {step.label}
        </span>
      </div>

      {/* TITLE */}
      <h3 className="font-heading text-primary text-[clamp(2.2rem,3.5vw,3.8rem)] leading-[1.05] tracking-[-0.025em]">
        {step.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-text/65 mt-5 text-[13px] leading-[1.9] sm:text-sm">
        {step.description}
      </p>

      {/* SMALL DETAIL */}
      <div
        className={`mt-7 flex items-center gap-3 ${
          align === "right" ? "md:justify-end" : ""
        }`}
      >
        <span className="bg-primary/40 h-px w-7" />

        <span className="text-primary/50 text-[9px] font-medium tracking-[0.2em] uppercase">
          {step.detail}
        </span>
      </div>
    </div>
  );
}

export default function PowerOfPeptides() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Scroll progress line
        gsap.fromTo(
          timelineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: ".peptide-timeline",
              start: "top 75%",
              end: "bottom 55%",
              scrub: 0.5,
            },
          },
        );

        // Reveal each timeline item
        gsap.utils.toArray(".peptide-step").forEach((step) => {
          gsap.from(step, {
            y: 40,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              once: true,
            },
          });
        });

        // Floating decorative elements
        gsap.to(".peptide-decoration", {
          y: -18,
          duration: 3.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.6,
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="peptides-heading"
      className="relative overflow-hidden py-20 sm:py-28 lg:py-36"
    >
      {/* DECORATIVE BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span className="peptide-decoration font-heading text-primary/15 absolute top-[17%] right-[8%] hidden text-5xl lg:block">
          ✳
        </span>

        <span className="peptide-decoration font-heading text-primary/15 absolute bottom-[25%] left-[8%] hidden text-4xl lg:block">
          ✦
        </span>

        <div className="border-primary/5 absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full border" />

        <div className="border-primary/5 absolute bottom-1/4 -left-40 h-[500px] w-[500px] rounded-full border" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        {/* SECTION HEADING */}
        <header className="mx-auto mb-16 max-w-350 text-center lg:mb-24">
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="bg-primary/30 h-px w-9" />

            <span className="text-primary text-[10px] font-semibold tracking-[0.25em] uppercase">
              The Power of Peptides
            </span>

            <span className="bg-primary/30 h-px w-9" />
          </div>

          <h2
            id="peptides-heading"
            className="font-heading text-primary mb-8 text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] font-normal"
          >
            The Science Behind
            <br />
            <span className="italic">the Ritual.</span>
          </h2>

          <p className="text-text/65 md:text-md mx-auto mt-7 max-w-[600px] text-sm leading-[1.9]">
            Not all peptides work in the same way. Their potential cosmetic
            benefits depend on their type, concentration, formulation, and the
            evidence supporting their use.
          </p>
        </header>

        {/* TIMELINE */}
        <div className="peptide-timeline relative">
          {/* Background line */}
          <div className="bg-primary/15 absolute top-0 bottom-0 left-[23px] w-px md:left-1/2 md:-translate-x-1/2" />

          {/* Animated line */}
          <div
            ref={timelineRef}
            className="bg-primary absolute top-0 bottom-0 left-[23px] w-[2px] origin-top md:left-1/2 md:-translate-x-1/2"
          />

          <div className="relative space-y-16 md:space-y-28">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="peptide-step relative grid grid-cols-[48px_minmax(0,1fr)] gap-5 md:grid-cols-[1fr_70px_1fr] md:gap-8"
                >
                  {/* DESKTOP LEFT */}
                  <div className="hidden md:block">
                    {index % 2 === 0 && (
                      <TimelineContent step={step} align="right" />
                    )}
                  </div>

                  {/* CENTER TIMELINE MARKER */}
                  <div className="relative z-10 flex justify-center">
                    <div className="group border-primary/30 hover:border-primary hover:bg-primary relative flex h-12 w-12 items-center justify-center rounded-full border bg-[#F8F7F4] transition-all duration-500 md:h-[70px] md:w-[70px]">
                      <span className="font-heading text-primary text-xl italic transition-colors duration-500 group-hover:text-white md:text-2xl">
                        {step.number}
                      </span>

                      {/* Small outer decorative ring */}
                      <span className="border-primary/10 pointer-events-none absolute -inset-[6px] rounded-full border transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="min-w-0 pt-1 md:pt-2">
                    <div className="md:hidden">
                      <TimelineContent step={step} />
                    </div>

                    {index % 2 !== 0 && (
                      <div className="hidden md:block">
                        <TimelineContent step={step} />
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-20 flex flex-col items-center text-center lg:mt-28">
          <p className="font-heading text-primary mb-8 text-[30px] italic sm:text-[38px]">
            Where thoughtful science meets everyday beauty.
          </p>
        </div>
      </div>
    </section>
  );
}
