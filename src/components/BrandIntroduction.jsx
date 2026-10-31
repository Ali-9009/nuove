"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BrandIntroduction() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".brand-reveal", {
          y: 55,
          opacity: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });

        gsap.to(".brand-badge", {
          rotation: 360,
          duration: 22,
          repeat: -1,
          ease: "none",
        });

        gsap.fromTo(
          ".brand-image",
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".brand-image-wrapper",
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          },
        );
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="brand-heading"
      className="overflow-hidden py-8 md:py-12"
    >
      <div className="mx-auto max-w-390 px-4 md:px-6">
        {/* EDITORIAL CONTENT */}
        <div className="grid items-center gap-14 md:grid-cols-2 lg:gap-24">
          {/* LEFT IMAGE */}
          <div className="brand-reveal relative">
            <div className="brand-image-wrapper relative aspect-4/5 overflow-hidden bg-[#E8E4DE] sm:aspect-5/5 md:aspect-4/5">
              <Image
                src="/assets/our-story.jpg"
                alt="NUOVÉ luxury skincare experience"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="brand-image object-cover"
              />
            </div>

            {/* ROTATING BADGE */}
            <div className="bg-primary absolute right-3 -bottom-10 flex h-28 w-28 items-center justify-center rounded-full sm:-right-10 sm:h-36 sm:w-36 lg:h-40 lg:w-40">
              {/* Rotating Text */}
              <svg
                viewBox="0 0 160 160"
                className="brand-badge absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="brand-badge-circle"
                    d="M 80,80 m -58,0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"
                  />
                </defs>

                <text
                  fill="white"
                  fontSize="10.5"
                  letterSpacing="2.2"
                  fontWeight="500"
                >
                  <textPath href="#brand-badge-circle">
                    NUOVÉ • SCIENCE MEETS LUXURY • NUOVÉ •
                  </textPath>
                </text>
              </svg>

              {/* Center Logo Image */}
              <Image
                src="/assets/badge.png"
                alt="NUOVÉ Logo"
                width={80}
                height={80}
                className="relative z-10 h-12 w-12 object-contain sm:h-16 sm:w-16 lg:h-20 lg:w-20"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="brand-reveal max-w-160 pt-8 md:pl-6">
            <span className="text-primary mb-7 block text-[11px] font-semibold tracking-[0.3em] uppercase">
              Redefining Everyday Luxury
            </span>

            <h3 className="font-heading text-primary mb-8 text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] font-normal">
              Beautifully considered.
              <br />
              <span className="italic">Purposefully created.</span>
            </h3>

            <div className="bg-primary/40 mb-8 h-px w-16" />

            <p className="text-text/70 md:text-md mb-10 text-sm leading-loose">
              NUOVÉ brings together peptide-focused formulations and
              thoughtfully selected complementary skincare ingredients to create
              a more elevated daily ritual. Inspired by modern science and a
              belief that self-care should feel exceptional, our approach
              combines considered formulas, beautiful simplicity, and
              approachable luxury. Skincare designed to make everyday moments
              feel a little more extraordinary.
            </p>

            <Link
              href="/pages/our-story"
              className="group border-primary text-primary inline-flex items-center gap-5 border-b pb-3 text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 hover:gap-7"
            >
              Discover Our Story
              <ArrowUpRight
                size={18}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
