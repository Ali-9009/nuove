import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { skinConcerns } from "@/data/skinConcerns";

export default function ShopByConcern() {
  return (
    <section
      aria-labelledby="skin-concern-heading"
      className="overflow-hidden py-12 md:py-18"
    >
      <div className="mx-auto max-w-360 px-4 md:px-6">
        {/* SECTION HEADING */}
        <div className="mb-10 flex flex-col gap-5 sm:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="skin-concern-heading"
              className="font-heading text-primary text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] font-normal"
            >
              Shop by <span className="italic">Skin Concern.</span>
            </h2>
          </div>

          <p className="text-text/60 md:text-md max-w-[320px] font-sans text-sm leading-[1.8]">
            Thoughtfully selected skincare for your skin's individual needs.
          </p>
        </div>

        {/* CONCERN CARDS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {skinConcerns.map((concern) => (
            <article key={concern.slug} className="group min-w-0">
              <Link
                href={`/skin-concerns/${concern.slug}`}
                aria-label={`Explore ${concern.title}`}
                className="relative block aspect-4/5 overflow-hidden rounded-2xl"
              >
                {/* BACKGROUND IMAGE */}
                <Image
                  src={concern.image}
                  alt={`${concern.title} skincare`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08] motion-reduce:transition-none"
                />

                {/* DEFAULT BOTTOM linear */}
                <div className="absolute inset-0 bg-linear-to-t from-[#061F30]/90 via-[#061F30]/25 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

                {/* HOVER linear */}
                <div className="absolute inset-0 bg-linear-to-t from-[#061F30]/95 via-[#061F30]/75 to-[#061F30]/20 opacity-0 transition-opacity duration-700 group-focus-within:opacity-100 group-hover:opacity-100 max-lg:opacity-100" />

                {/* DEFAULT CONTENT */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-6 transition-all duration-500 group-focus-within:translate-y-5 group-focus-within:opacity-0 group-hover:translate-y-5 group-hover:opacity-0 max-lg:hidden">
                  <h3 className="font-heading text-[clamp(2rem,2.5vw,3rem)] leading-[0.95] text-white">
                    {concern.title}
                  </h3>

                  <p className="mt-3 max-w-65 text-sm leading-[1.7] text-white/75">
                    {concern.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.15em] text-white uppercase">
                    Discover More
                    <ArrowUpRight size={15} strokeWidth={1.5} />
                  </span>
                </div>

                {/* HOVER REVEAL CONTENT */}
                <div className="absolute inset-x-0 bottom-0 z-20 translate-y-10 p-6 opacity-0 transition-all duration-700 ease-out group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 max-lg:translate-y-0 max-lg:opacity-100">
                  <h3
                    aria-hidden="true"
                    className="font-heading text-[clamp(2rem,2.5vw,3rem)] leading-[0.95] text-white"
                  >
                    {concern.title}
                  </h3>

                  <p className="mt-4 max-w-65 text-sm leading-[1.8] text-white/85">
                    {concern.description}
                  </p>

                  {/* EXTRA HOVER DETAILS */}
                  <div>
                    {/* CTA */}
                    <span className="group-hover:text-primary mt-6 flex items-center justify-between gap-3 rounded-full border border-white/50 bg-white/15 py-2 pr-2 pl-5 text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-white">
                      <span className="text-[10px] font-semibold tracking-[0.13em] uppercase">
                        Explore Products
                      </span>

                      <span className="text-primary group-hover:bg-primary flex h-9 w-9 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:rotate-45 group-hover:text-white">
                        <ArrowUpRight size={17} strokeWidth={1.5} />
                      </span>
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
