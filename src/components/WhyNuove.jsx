import Image from "next/image";
import Link from "next/link";

const pillars = [
  {
    n: "01",
    t: "Peptide-Focused Formulations",
    d: "Peptides sit at the centre of every NUOVÉ formula.",
  },
  {
    n: "02",
    t: "Thoughtfully Selected Ingredients",
    d: "Every ingredient has a clear role.",
  },
  {
    n: "03",
    t: "Designed for Everyday Rituals",
    d: "Simple steps for morning and evening.",
  },
  {
    n: "04",
    t: "Elevated Quality & Presentation",
    d: "Every detail designed to feel considered.",
  },
];

export default function WhyNuove() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="max-w-360 mx-auto text-[#092D43]"
    >
      <div className="mx-auto max-w-[1560px] px-[clamp(20px,3vw,48px)] text-center">
        <Image
          src="/assets/nuove-symbol.png"
          alt=""
          width={40}
          height={46}
          className="mx-auto block w-10"
        />
        <h2
          id="philosophy-heading"
          className="mx-auto mt-5 max-w-[900px] !font-sans text-[clamp(32px,3.6vw,60px)] leading-[1.04] font-light tracking-[-0.045em] text-balance"
        >
          The NUOVÉ Philosophy.{" "}
          <span className="text-[#7FA3B5]">
            Skincare that deserves to feel considered.
          </span>
        </h2>
      </div>

      <div className="mt-[clamp(28px,4vw,48px)] px-[clamp(12px,1.2vw,20px)]">
        <div className="relative h-[clamp(360px,70vh,760px)] overflow-hidden rounded-[clamp(24px,2.4vw,40px)] bg-[#D7D0C6]">
          <Image
            src="/assets/philosophy-freckled-glow.png"
            alt="Close-up of luminous, freckled skin"
            fill
            sizes="100vw"
            className="object-cover object-[50%_40%]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-[linear-gradient(0deg,rgba(6,30,45,0.35)_0%,rgba(6,30,45,0)_100%)]" />
        </div>
      </div>

      <div className="relative mx-auto -mt-[clamp(48px,6vw,96px)] max-w-[1400px] px-[clamp(20px,3vw,48px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-3">
          {pillars.map((p) => (
            <div
              key={p.n}
              className="rounded-[28px] border border-white/90 bg-white/[0.88] p-[22px] shadow-[0_16px_40px_rgba(9,45,67,0.1)] backdrop-blur-[18px]"
            >
              <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#092D43] text-xs font-semibold text-[#F8F6F1]">
                {p.n}
              </span>
              <div className="mt-3.5 text-[17px] leading-[1.25] font-medium">
                {p.t}
              </div>
              <p className="mt-1.5 text-sm leading-[1.55] text-[#243039]">
                {p.d}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            href="/pages/our-story"
            className="flex h-[52px] items-center gap-3 rounded-full bg-[#092D43] pr-1.5 pl-[22px] text-sm font-medium text-[#F8F6F1] transition-colors hover:bg-[#061E2D]"
          >
            Discover Our Philosophy
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D8EDF3] text-[#092D43]">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}