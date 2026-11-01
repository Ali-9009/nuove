import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { skinConcerns } from "@/data/skinConcerns";

// Bento layout (matches the port-3000 concern section):
// tall card on the left, two cards top-right, one wide card bottom-right.
const layout = [
  "lg:col-start-1 lg:row-span-2",
  "lg:col-start-2 lg:row-start-1",
  "lg:col-start-3 lg:row-start-1",
  "lg:col-start-2 lg:col-span-2 lg:row-start-2",
];

export default function ShopByConcern() {
  return (
    <section aria-labelledby="skin-concern-heading" className="overflow-hidden py-12 md:py-18">
      <div className="mx-auto max-w-360 px-4 md:px-6">
        <div className="mb-10 flex flex-col gap-5 sm:mb-14 md:flex-row md:items-end md:justify-between">
          <h2 id="skin-concern-heading" className="font-heading text-primary text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] font-normal">
            Shop by <span className="italic">Skin Concern.</span>
          </h2>
          <p className="text-text/60 md:text-md max-w-[320px] font-sans text-sm leading-[1.8]">
            Thoughtfully selected skincare for your skin&apos;s individual needs.
          </p>
        </div>

        <div className="grid grid-cols-2 auto-rows-[260px] gap-3 sm:auto-rows-[320px] lg:grid-cols-[1.15fr_1fr_0.85fr] lg:grid-rows-[300px_260px] lg:auto-rows-auto lg:gap-4 2xl:grid-rows-[340px_290px]">
          {skinConcerns.slice(0, 4).map((concern, i) => (
            <article key={concern.slug} className={`group relative min-w-0 overflow-hidden rounded-[22px] bg-[#dfebee] ${layout[i]}`}>
              <Link href={`/skin-concerns/${concern.slug}`} aria-label={`Explore ${concern.title}`} className="absolute inset-0 block">
                <Image
                  src={concern.image}
                  alt={`${concern.title} skincare`}
                  fill
                  sizes={i === 3 ? "(max-width: 1024px) 50vw, 45vw" : "(max-width: 1024px) 50vw, 30vw"}
                  className="object-cover object-[center_35%] transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
                />
                {/* Light bottom shade, like the hero */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(9,27,32,0.45)_0%,rgba(9,27,32,0.1)_40%,transparent_60%)] transition-opacity duration-500 group-hover:opacity-80" />

                {/* Frosted glass panel (hero style) */}
                <div className="absolute inset-x-3 bottom-3 z-10 rounded-[16px] border border-white/25 bg-white/20 p-3 shadow-[0_15px_40px_rgba(0,0,0,0.08)] backdrop-blur-lg transition-all duration-500 ease-out group-hover:bg-white/25 sm:inset-x-4 sm:bottom-4 sm:p-5 lg:max-w-[min(100%-2rem,420px)] lg:p-6">
                  <div className="flex items-end justify-between gap-2 sm:gap-4">
                    <div className="min-w-0">
                      <h3 className="font-heading text-[clamp(1.15rem,2.1vw,2.3rem)] leading-[1.05] tracking-[-0.02em] text-white">
                        {concern.title}
                      </h3>
                      <p className={`mt-2 hidden max-w-[300px] text-[13px] leading-[1.6] text-white/85 ${i === 0 || i === 3 ? "sm:block" : "sm:block lg:hidden"}`}>
                        {concern.description}
                      </p>
                    </div>
                    <span className="text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:rotate-45 sm:h-11 sm:w-11">
                      <ArrowUpRight size={18} strokeWidth={1.6} />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
