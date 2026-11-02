"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ProductCard from "@/components/ProductCard";
import { getBestsellers } from "@/data/products";

export default function Bestsellers() {
  const sectionRef = useRef(null);

  const bestsellers = getBestsellers(4);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".bestseller-reveal", {
          y: 35,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (bestsellers.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="bestsellers-heading"
      className="overflow-hidden py-12 sm:py-16 lg:py-24"
    >
      <div className="mx-auto w-full max-w-360 px-4 md:px-6">
        {/* SECTION HEADING */}
        <header className="bestseller-reveal mb-8 flex flex-col gap-5 sm:mb-10 md:flex-row md:items-end md:justify-between lg:mb-14">
          <div>
            <span className="mb-3 block font-sans text-[11px] font-medium tracking-[0.18em] text-[#6999AD] uppercase sm:text-[12px]">
              Customer Favorites
            </span>

            <h2
              id="bestsellers-heading"
              className="font-heading text-primary text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] font-normal"
            >
              Our <span className="italic">Bestsellers.</span>
            </h2>
          </div>

          <p className="text-text/60 max-w-[340px] font-sans text-[14px] leading-[1.85] sm:text-[15px]">
            Discover the formulas at the heart of NUOVÉ. Thoughtfully crafted
            skincare essentials for your everyday ritual.
          </p>
        </header>

        {/* RESPONSIVE PRODUCT GRID */}
        <div className="grid grid-cols-1 items-stretch gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:gap-x-6  md:grid-cols-2 lg:grid-cols-4 xl:gap-x-5 xl:gap-y-12">
          {bestsellers.map((product) => (
            <article
              key={product.id ?? product.handle}
              className="bestseller-reveal flex h-full min-w-0 flex-col"
            >
              <ProductCard product={product} />
            </article>
          ))}
        </div>

        {/* BOTTOM BUTTON */}
        <div className="bestseller-reveal mt-10 flex justify-center sm:mt-14 lg:mt-16">
          <Link
            href="/collections/all"
            className="group border-primary text-primary inline-flex items-center gap-4 border-b pb-3 font-sans text-[11px] font-semibold tracking-[0.16em] uppercase transition-all duration-300 hover:gap-6 sm:text-[12px]"
          >
            Explore All Products
            <ArrowUpRight
              size={17}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
