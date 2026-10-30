import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { skinConcerns } from "@/data/skinConcerns";

export default function ShopByConcern() {
  return (
    <section
      aria-labelledby="skin-concern-heading"
      className="overflow-hidden py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
        {/* SECTION HEADING */}
        <div className="mb-10 flex flex-col gap-5 sm:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-primary mb-4 block font-sans text-[10px] font-semibold tracking-[0.25em] uppercase sm:text-xs">
              Discover Your Ritual
            </span>

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
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
          {skinConcerns.map((concern) => (
            <article key={concern.slug} className="group min-w-0">
              <Link
                href={`/skin-concerns/${concern.slug}`}
                className="block"
                aria-label={`Explore ${concern.title}`}
              >
                {/* IMAGE */}
                <div className="relative aspect-4/5 overflow-hidden bg-[#F3F1ED]">
                  <Image
                    src={concern.image}
                    alt={`${concern.title} skincare`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="duration-900ms object-cover transition-transform ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
                  />

                  {/* BOTTOM HOVER ARROW */}
                  <span className="text-primary absolute right-5 bottom-5 z-10 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white opacity-0 transition-all duration-500 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 max-lg:translate-y-0 max-lg:opacity-100">
                    <ArrowUpRight size={20} strokeWidth={1.5} />
                  </span>
                </div>

                {/* CONTENT */}
                <div className="pt-6">
                  <h3 className="font-heading text-primary text-[clamp(1.5rem,1.8vw,2rem)] leading-[1.05]">
                    {concern.title}
                  </h3>

                  <p className="text-text/60 mt-3 min-h-16 max-w-75 font-sans text-[13px] leading-[1.8]">
                    {concern.description}
                  </p>

                  {/* CTA */}
                  <span className="border-primary/40 text-primary mt-5 inline-flex items-center gap-3 border-b pb-2 font-sans text-[10px] font-semibold tracking-[0.16em] uppercase transition-all duration-300 group-hover:gap-5">
                    Explore Products
                    <ArrowUpRight size={15} strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
