import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function BrandIntroduction() {
  return (
    <section
      aria-labelledby="brand-heading"
      className="px-4 py-10 md:px-6 lg:py-14"
    >
      <div className="mx-auto max-w-360">
        {/* MAIN EDITORIAL BANNER */}
        <div className="relative isolate flex min-h-[650px] overflow-hidden rounded-3xl bg-[#E8E4DE] sm:min-h-[690px] lg:min-h-[580px] lg:rounded-[36px] xl:min-h-[640px]">
          {/* FULL BACKGROUND IMAGE */}
          <Image
            src="/assets/brand-intro.png"
            alt="NUOVÉ skincare lifestyle"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover object-[65%_center] sm:object-[62%_center] lg:object-center"
          />

          {/* SOFT LEFT-TO-RIGHT OVERLAY */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-r from-[#F2ECE2]/95 via-[#F2ECE2]/75 to-transparent lg:from-[#F2ECE2]/90 lg:via-[#F2ECE2]/35 lg:to-transparent" />

          {/* EXTRA SOFT MOBILE OVERLAY */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-[#F2ECE2]/45 via-transparent to-[#F2ECE2]/40 lg:hidden" />

          {/* CONTENT */}
          <div className="relative z-20 flex w-full flex-col justify-between px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-14 xl:px-18 xl:py-18">
            {/* LEFT CONTENT */}
            <div className="max-w-150">
              {/* HEADING */}
              <h2
                id="brand-heading"
                className="font-heading text-primary text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] font-normal"
              >
                Beautifully considered.
                <br />
                <span className="text-[#1675A7] italic">
                  Purposefully created.
                </span>
              </h2>

              {/* DESCRIPTION */}
              <p className="text-primary/80 mt-7 max-w-[460px] font-sans text-[16px] leading-[1.8] sm:text-[17px]">
                NUOVÉ brings together peptide-focused formulations and
                thoughtfully selected complementary ingredients to create an
                elevated daily skincare ritual. Inspired by modern science,
                beautiful simplicity, and approachable luxury.
              </p>

              {/* CTA */}
              <Link
                href="/pages/our-story"
                className="group bg-primary mt-8 inline-flex min-h-[52px] items-center gap-5 rounded-full py-1.5 pr-1.5 pl-6 font-sans text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#0A4968]"
              >
                Discover Our Story
                <span className="text-primary flex h-10 w-10 items-center justify-center rounded-full bg-[#D8EDF3]">
                  <ArrowUpRight
                    size={19}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:rotate-45"
                  />
                </span>
              </Link>
            </div>

            {/* BOTTOM LEFT TAGS */}
            <div className="mt-12 flex flex-wrap items-center gap-2.5">
              {[
                "Peptide-Focused",
                "Thoughtful Formulas",
                "Everyday Luxury",
              ].map((item) => (
                <span
                  key={item}
                  className="text-primary inline-flex items-center gap-2 rounded-full border border-white/75 bg-white/80 px-4 py-2.5 font-sans text-[13px] font-medium backdrop-blur-md"
                >
                  <span className="h-2 w-2 rounded-full bg-[#65C8D6]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
