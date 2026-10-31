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
      className="overflow-hidden"
    >
      <div className="mx-auto max-w-390 px-4 md:px-6">
        {/* SECTION HEADING */}
        <div className="bestseller-reveal mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="bestsellers-heading"
              className="font-heading text-primary text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] font-normal"
            >
              Our <span className="italic">Bestsellers.</span>
            </h2>
          </div>

          <div className="max-w-85">
            <p className="text-text/60 md:text-md font-sans text-sm leading-[1.85]">
              Discover the formulas at the heart of NUOVÉ. Thoughtfully crafted
              skincare essentials for your everyday ritual.
            </p>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {bestsellers.map((product) => (
            <div key={product.id} className="bestseller-reveal min-w-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* BOTTOM BUTTON */}
        <div className="bestseller-reveal mt-12 flex justify-center sm:mt-16">
          <Link
            href="/collections/all"
            className="group border-primary text-primary inline-flex items-center gap-4 border-b pb-3 font-sans text-[11px] font-semibold tracking-[0.16em] uppercase transition-all duration-300 hover:gap-6"
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
