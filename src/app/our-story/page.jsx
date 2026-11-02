import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowUpRight, Leaf, Layers3, Sparkles } from "lucide-react";

export const metadata = {
  title: "Our Story | About NUOVÉ Skincare",
  description:
    "Discover the NUOVÉ approach to peptide-focused skincare, considered daily rituals, and an elevated skincare experience.",
};

// These paths match assets already used in your NUOVÉ site.
// Change them here if your files have different names inside public/assets.
const images = {
  hero: "/assets/philosophy-freckled-glow.png",
  editorial: "/assets/nuove-banner.png",
  serum: "/assets/barrier.png",
  ritual: "/assets/plan-com.png",
};

function EditorialLink({ href, children, light = false }) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-13 items-center justify-between gap-7 rounded-full py-1.5 pr-1.5 pl-7 font-sans text-[13px] font-semibold transition-colors sm:text-[14px] ${light ? "bg-white text-[#06304A] hover:bg-[#ECF5F7]" : "bg-primary text-white hover:bg-[#0A4968]"}`}
    >
      {children}
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${light ? "bg-[#D9ECF1]" : "text-primary bg-[#D8EDF3]"}`}
      >
        <ArrowUpRight size={19} strokeWidth={1.5} />
      </span>
    </Link>
  );
}

export default function OurStoryPage() {
  return (
    <main className="text-primary overflow-hidden bg-[#FCFBF8]">
      {/* 1. BRAND INTRODUCTION */}
      <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-[#E9F0EF] px-5 pt-36 pb-20 sm:px-8 lg:min-h-[90svh] lg:pt-44 lg:pb-24">
        <Image
          src={images.hero}
          alt="NUOVÉ editorial skincare imagery"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#F6F8F5]/95 via-[#F6F8F5]/75 to-[#F6F8F5]/10" />
        <div className="absolute inset-0 bg-linear-to-t from-[#EEF3F0]/55 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-360">
          <div className="max-w-180">
            <h1 className="font-heading mt-7 text-[clamp(4.2rem,5vw,6rem)] leading-[0.88] tracking-[-0.045em]">
              The Art of <br />
              <em className="font-normal text-[#709CAF]">Considered</em> <br />
              Skincare.
            </h1>
            <p className="text-primary/75 mt-8 max-w-125 font-sans text-[17px] leading-[1.9]">
              A more elevated approach to everyday skincare, where
              peptide-focused formulations meet thoughtful routines and an
              appreciation for the details.
            </p>
          </div>
        </div>
      </section>

      {/* 2. WHY NUOVÉ WAS CREATED — no invented founder details */}
      <section className="px-5 py-22 sm:px-8 lg:py-36">
        <div className="mx-auto grid max-w-360 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <h2 className="font-heading mt-6 max-w-[580px] text-[clamp(3rem,5.5vw,6rem)] leading-[0.98] tracking-[-0.03em]">
              Everyday care. <br />
              <em className="font-normal text-[#79A5B5]">Beautifully</em>{" "}
              considered.
            </h2>
          </div>
          <div className="lg:pl-8">
            <span
              className="font-heading block text-[80px] leading-none text-[#B2D1DA]/75"
              aria-hidden="true"
            >
              “
            </span>
            <p className="font-heading -mt-4 max-w-152 text-[clamp(1.55rem,2.4vw,2.55rem)] leading-[1.3]">
              Skincare can be both purposeful and a pleasure to return to,
              morning and evening.
            </p>
            <p className="text-primary/65 mt-6 max-w-152 font-sans text-[15px] leading-[1.95]">
              NUOVÉ brings together an interest in peptide-focused skincare,
              complementary ingredients, and simple, considered rituals. The
              collection is designed to make room for skincare in the moments
              that belong to you.
            </p>
            <p className="text-primary/40 mt-4 font-sans text-sm leading-relaxed italic">
              Founder history and launch details can be added here once provided
              and approved by the NUOVÉ team.
            </p>
          </div>
        </div>
      </section>

      {/* 3. OUR PEPTIDE-FOCUSED APPROACH */}
      <section
        id="our-philosophy"
        className="bg-[#EFF5F5] px-5 py-20 sm:px-8 lg:py-30"
      >
        <div className="mx-auto grid max-w-360 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <figure className="relative min-h-[460px] overflow-hidden rounded-[28px] bg-[#E2ECEE] sm:min-h-[610px] lg:min-h-[700px]">
            <Image
              src={images.editorial}
              alt="NUOVÉ skincare editorial collection imagery"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <figcaption className="text-primary absolute bottom-5 left-5 rounded-full border border-white/50 bg-white/80 px-5 py-2 font-sans text-[11px] tracking-[0.15em] uppercase backdrop-blur-md">
              Thoughtful skincare, every day
            </figcaption>
          </figure>
          <div className="lg:py-12">
            <h2 className="font-heading mt-6 text-[clamp(3.1rem,5vw,5.7rem)] leading-[1.02] tracking-[-0.035em]">
              A focus on{" "}
              <em className="font-normal text-[#77A5B5]">peptides.</em> <br />
              An appreciation for balance.
            </h2>
            <p className="text-primary/65 mt-7 max-w-[520px] font-sans text-[15px] leading-[1.95] sm:text-[16px]">
              Peptides are an important part of the NUOVÉ skincare conversation.
              Our approach pairs that focus with complementary cosmetic
              ingredients and a routine-first mindset.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="border-primary/15 border-t pt-5">
                <Layers3
                  size={23}
                  strokeWidth={1.35}
                  className="text-[#79A5B5]"
                />
                <h3 className="mt-4 font-sans text-[15px] font-semibold">
                  Complementary steps
                </h3>
                <p className="text-primary/60 mt-2 font-sans text-[13px] leading-[1.8]">
                  Products intended to fit thoughtfully into a daily ritual.
                </p>
              </div>
              <div className="border-primary/15 border-t pt-5">
                <Sparkles
                  size={23}
                  strokeWidth={1.35}
                  className="text-[#79A5B5]"
                />
                <h3 className="mt-4 font-sans text-[15px] font-semibold">
                  Considered experience
                </h3>
                <p className="text-primary/60 mt-2 font-sans text-[13px] leading-[1.8]">
                  A focus on the look, feel, and enjoyment of skincare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FORMULATION PHILOSOPHY */}
      <section className="px-5 py-22 sm:px-8 lg:py-34">
        <div className="mx-auto max-w-360">
          <div className="mx-auto max-w-240 text-center">
            <h2 className="font-heading mt-6 text-[clamp(3.1rem,5.7vw,6.4rem)] leading-[1.02] tracking-[-0.03em]">
              Every detail{" "}
              <em className="font-normal text-[#79A5B5]">has its place.</em>
            </h2>
            <p className="text-primary/65 mx-auto mt-6 max-w-[580px] font-sans text-[15px] leading-[1.9]">
              Our formulation philosophy centers on thoughtful ingredient
              selection, compatible steps, and product experiences that feel at
              home in everyday routines.
            </p>
          </div>
          <div className="mt-13 grid gap-4 md:grid-cols-3 lg:mt-17 lg:gap-6">
            {[
              {
                num: "01",
                title: "Ingredient intention",
                description:
                  "Consider ingredients in the context of the finished product and its intended use.",
                icon: <Leaf size={25} strokeWidth={1.3} />,
              },
              {
                num: "02",
                title: "Routine compatibility",
                description:
                  "Make the order and timing of skincare steps easy to understand.",
                icon: <Layers3 size={25} strokeWidth={1.3} />,
              },
              {
                num: "03",
                title: "A refined ritual",
                description:
                  "Treat texture, presentation, and everyday usability as part of the experience.",
                icon: <Sparkles size={25} strokeWidth={1.3} />,
              },
            ].map((item) => (
              <article
                key={item.num}
                className="group border-primary/10 relative isolate flex min-h-90 flex-col overflow-hidden rounded-[28px] border bg-linear-to-br from-[#F6FAFA] via-[#EDF5F6] to-[#DDEBF0] p-7 transition-all duration-700 hover:-translate-y-2 hover:border-[#A8CBD6] hover:shadow-[0_30px_70px_-25px_rgba(6,48,74,0.18)] sm:min-h-100 sm:p-10"
              >
                {/* DECORATIVE CIRCLES */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -bottom-32 h-[350px] w-[350px] rounded-full border border-white/70 transition-transform duration-1000 group-hover:scale-125"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -bottom-20 h-[260px] w-[260px] rounded-full border border-white/50 transition-transform duration-1000 group-hover:scale-110"
                />

                {/* SOFT LIGHT */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-20 left-1/2 h-[250px] w-[300px] -translate-x-1/2 rounded-full bg-white/70 blur-[80px] transition-opacity duration-700 group-hover:opacity-100"
                />

                {/* TOP CONTENT */}
                <div className="relative z-10 flex items-start justify-between">
                  {/* ICON */}
                  <span className="text-primary flex h-16 w-16 items-center justify-center rounded-[20px] border border-white/80 bg-white/65 shadow-[0_10px_30px_rgba(6,48,74,0.05)] backdrop-blur-md transition-all duration-700 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-white">
                    {item.icon}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="relative z-10 pt-12">
                  {/* SMALL ACCENT LINE */}
                  <div className="mb-6 h-px w-12 bg-[#7EA9B8] transition-all duration-700 group-hover:w-24" />

                  <h3 className="font-heading text-primary max-w-[330px] text-[clamp(2.1rem,2.7vw,2.8rem)] leading-[1.05] tracking-[-0.025em] transition-transform duration-700 group-hover:-translate-y-1">
                    {item.title}
                  </h3>

                  <p className="text-primary/65 mt-5 max-w-[330px] font-sans text-[14px] leading-[1.85] sm:text-[15px]">
                    {item.description}
                  </p>
                </div>

                {/* BOTTOM ACCENT */}
                <div
                  aria-hidden="true"
                  className="absolute right-0 bottom-0 left-0 h-[3px] origin-left scale-x-0 bg-linear-to-r from-[#6999AD] via-[#B8D4DD] to-transparent transition-transform duration-700 group-hover:scale-x-100"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR COMMITMENT TO CUSTOMERS */}
      <section className="overflow-hidden bg-[#E7F0F2] px-5 py-18 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-360 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div>
            <h2 className="font-heading mt-6 text-[clamp(3rem,5.5vw,6rem)] leading-[0.98] tracking-[-0.035em]">
              Care in the <br />
              <em className="font-normal text-[#719BAE]">small things.</em>
            </h2>
            <p className="text-primary/65 mt-7 max-w-[590px] font-sans text-[15px] leading-[1.95] sm:text-[16px]">
              We believe a considered skincare experience should help customers
              understand what belongs in their routine, how to use each product,
              and where to find the information that matters.
            </p>
            <div className="mt-9 space-y-4">
              {[
                "Clear product information and routine guidance",
                "Straightforward instructions for use",
                "An elevated, approachable shopping experience",
              ].map((line) => (
                <p
                  key={line}
                  className="border-primary/10 text-primary/75 flex items-start gap-3 border-b pb-4 font-sans text-[14px]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#73A7B9]" />
                  {line}
                </p>
              ))}
            </div>
          </div>
          <figure className="relative mx-auto min-h-[440px] w-full max-w-[500px] overflow-hidden rounded-[30px] bg-linear-to-br from-[#F9FBFB] to-[#D9E9EE] sm:min-h-[560px]">
            {/* BACKGROUND LIGHT */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,white_0%,transparent_62%)]" />

            {/* DECORATIVE CIRCLES */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 h-[85%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 h-[110%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40"
            />

            {/* PRODUCT IMAGE */}
            <Image
              src={images.serum}
              alt="NUOVÉ Barrier Peptide Serum product"
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-contain p-12 drop-shadow-[16px_24px_20px_rgba(6,48,74,0.16)] transition-transform duration-700 hover:scale-[1.04] sm:p-14"
            />

            {/* TOP-RIGHT FLOATING CARD */}
            <div className="absolute top-6 right-3 z-10 flex items-center gap-3 rounded-[18px] border border-white/80 bg-white/80 px-3 py-3 shadow-[0_15px_40px_rgba(6,48,74,0.06)] backdrop-blur-xl sm:top-10 sm:right-5 sm:gap-4 sm:px-5 sm:py-4">
              <span className="text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E5F2F5] sm:h-11 sm:w-11">
                <Sparkles size={18} strokeWidth={1.5} />
              </span>

              <div>
                <p className="text-primary/45 font-sans text-[9px] tracking-[0.1em] uppercase sm:text-[11px]">
                  The NUOVÉ Edit
                </p>

                <p className="font-heading text-primary text-[17px] leading-tight sm:text-[22px]">
                  Find Your Ritual
                </p>
              </div>
            </div>

            {/* BOTTOM-LEFT FLOATING CARD */}
            <Link
              href="/products/barrier-peptide-serum"
              className="group absolute bottom-12 left-3 z-10 flex items-center gap-3 rounded-[18px] border border-white/85 bg-white/85 px-3 py-3 shadow-[0_15px_40px_rgba(6,48,74,0.07)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white sm:bottom-16 sm:left-5 sm:gap-4 sm:px-5 sm:py-4"
            >
              <span className="text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E5F2F5] sm:h-11 sm:w-11">
                <ShoppingBag size={18} strokeWidth={1.5} />
              </span>

              <div>
                <p className="text-primary/45 font-sans text-[9px] tracking-[0.1em] uppercase sm:text-[11px]">
                  Discover NUOVÉ
                </p>

                <p className="text-primary font-sans text-[12px] font-semibold sm:text-[14px]">
                  Barrier Peptide Serum
                </p>
              </div>

              <ArrowUpRight
                size={18}
                strokeWidth={1.5}
                className="text-primary ml-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:ml-3"
              />
            </Link>

            {/* IMAGE CAPTION */}
            <figcaption className="sr-only">
              NUOVÉ Barrier Peptide Serum with editorial skincare details.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 6. EXPLORE THE COLLECTION */}
      {/* <section className="bg-primary relative isolate min-h-[540px] overflow-hidden px-5 py-24 text-white sm:px-8 lg:min-h-[620px] lg:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(110deg,#06304A_12%,#0B425D_60%,#275E73_100%)]" />
        <div className="absolute -right-16 bottom-[-150px] h-[600px] w-[600px] rounded-full bg-[#8DBDCD]/15 blur-[100px]" />
        <div className="relative z-10 mx-auto grid max-w-360 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow light>05 / Continue The Ritual</Eyebrow>
            <h2 className="font-heading mt-7 text-[clamp(3.5rem,6.4vw,7.5rem)] leading-[0.96] tracking-[-0.035em]">
              Discover your <br />
              <em className="font-normal text-[#B3D6DF]">NUOVÉ ritual.</em>
            </h2>
            <p className="mt-7 max-w-[480px] font-sans text-[15px] leading-[1.85] text-white/70">
              Explore the collection and find the products that feel right for
              your everyday skincare routine.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <EditorialLink href="/collections/all" light>
                Explore the Collection
              </EditorialLink>
              <Link
                href="/collections/serums"
                className="inline-flex min-h-13 items-center rounded-full border border-white/35 px-7 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                Shop Serums
              </Link>
            </div>
          </div>
          <figure className="relative mx-auto aspect-square w-full max-w-[540px]">
            <Image
              src={images.ritual}
              alt="NUOVÉ skincare ritual product set"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-contain drop-shadow-[20px_32px_30px_rgba(0,0,0,0.17)]"
            />
          </figure>
        </div>
      </section> */}
    </main>
  );
}
