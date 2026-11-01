import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FlaskConical, Gem, Sparkles } from "lucide-react";

const pillars = [
  { n: "01", t: "Peptide-Focused", d: "Peptides sit at the heart of every formula.", Icon: FlaskConical },
  { n: "02", t: "Thoughtful Formulas", d: "Each ingredient chosen for a clear role.", Icon: Sparkles },
  { n: "03", t: "Everyday Luxury", d: "Simple rituals that feel considered.", Icon: Gem },
];

const ring = "NUOVÉ · PEPTIDE SKINCARE · CONSIDERED CARE · ";

export default function BrandIntroduction() {
  return (
    <section aria-labelledby="brand-heading" className="flex min-h-svh items-center px-4 py-4 md:px-6 md:py-6">
      <div className="mx-auto w-full max-w-360">
        <div className="relative flex min-h-[calc(100svh-2rem)] items-center overflow-hidden rounded-3xl bg-[radial-gradient(60%_80%_at_95%_15%,#CFE7F0_0%,rgba(207,231,240,0)_65%),radial-gradient(55%_75%_at_0%_100%,#EFE2D1_0%,rgba(239,226,209,0)_65%),#F7F4EE] px-6 py-12 sm:px-10 md:min-h-[calc(100svh-3rem)] lg:rounded-[36px] lg:px-16 lg:pt-28 lg:pb-14">

          <div className="relative grid w-full items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
            {/* ---------- COPY ---------- */}
            <div>
              <span className="text-primary inline-flex items-center gap-2.5 rounded-full border border-[#092D43]/10 bg-white/70 py-1.5 pr-4 pl-1.5 text-[13px] font-medium backdrop-blur">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#092D43]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#65C8D6]" />
                </span>
                Our philosophy
              </span>

              <h2
                id="brand-heading"
                className="font-heading text-primary mt-6 text-[clamp(2.6rem,4vw,4.4rem)] leading-[1.02] font-normal"
              >
                Beautifully considered.
                <br />
                <span className="text-[#1675A7] italic">Purposefully created.</span>
              </h2>

              <p className="text-primary/75 mt-6 max-w-[480px] text-[16px] leading-[1.8] sm:text-[17px]">
                NUOVÉ brings together peptide-focused formulations and thoughtfully selected complementary
                ingredients to create an elevated daily skincare ritual. Inspired by modern science, beautiful
                simplicity, and approachable luxury.
              </p>

              {/* Three pillars */}
              <ul className="mt-8 flex max-w-[520px] flex-col gap-2.5">
                {pillars.map(({ n, t, d, Icon }) => (
                  <li
                    key={n}
                    className="group flex items-center gap-4 rounded-[20px] border border-white/80 bg-white/65 p-2.5 pr-5 shadow-[0_8px_30px_rgba(9,45,67,0.05)] backdrop-blur-md transition-all duration-500 hover:translate-x-1.5 hover:bg-white hover:shadow-[0_14px_40px_rgba(9,45,67,0.10)]"
                  >
                    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[linear-gradient(145deg,#EAF6F8,#D8EDF3)] text-[#092D43] transition-colors duration-500 group-hover:bg-[linear-gradient(145deg,#0A4968,#092D43)] group-hover:text-[#F8F6F1]">
                      <Icon size={22} strokeWidth={1.4} />
                      <span className="absolute -top-1.5 -right-1.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#092D43] px-1 text-[10px] font-semibold text-[#F8F6F1] ring-2 ring-white">
                        {n}
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="font-heading text-primary block text-[22px] leading-tight">{t}</span>
                      <span className="text-primary/65 mt-0.5 block text-[13.5px] leading-[1.55]">{d}</span>
                    </span>
                    <ArrowUpRight size={18} strokeWidth={1.4} className="shrink-0 text-[#7FA3B5] opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100" />
                  </li>
                ))}
              </ul>

              <Link
                href="/pages/our-story"
                className="group bg-primary mt-8 inline-flex min-h-[52px] items-center gap-5 rounded-full py-1.5 pr-1.5 pl-6 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#0A4968]"
              >
                Discover Our Story
                <span className="text-primary flex h-10 w-10 items-center justify-center rounded-full bg-[#D8EDF3]">
                  <ArrowUpRight size={19} strokeWidth={1.5} className="transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </Link>

            </div>

            {/* ---------- COMPOSITION ---------- */}
            <div className="relative mx-auto w-full max-w-[520px] pb-10 lg:pb-0">
              {/* Arched portrait */}
              <div className="group relative ml-auto aspect-[4/5] w-[86%] overflow-hidden rounded-t-[999px] rounded-b-[32px] shadow-[0_30px_70px_rgba(9,45,67,0.14)]">
                <Image
                  src="/assets/philosophy-freckled-glow.png"
                  alt="Close-up of luminous, freckled skin"
                  fill
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  className="object-cover object-[60%_center] transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#092D43]/25 via-transparent to-transparent" />
                <span className="absolute right-5 bottom-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-[12px] font-medium text-[#092D43] backdrop-blur-md">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#65C8D6]" />
                  Barrier-first care
                </span>
              </div>

              {/* Floating product card */}
              <div className="absolute bottom-0 left-0 w-[56%] sm:w-[44%] rounded-[26px] bg-white p-3 shadow-[0_24px_60px_rgba(9,45,67,0.16)] transition-transform duration-500 hover:-translate-y-1.5 lg:bottom-[-24px]">
                <div className="relative aspect-square overflow-hidden rounded-[18px] bg-[#EAF6F8]">
                  <Image
                    src="/assets/barrier-peptide-serum.jpg"
                    alt="Barrier Peptide Serum"
                    fill
                    sizes="220px"
                    className="object-cover mix-blend-multiply"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 px-1.5 pt-3 pb-1">
                  <div className="min-w-0">
                    <p className="text-[11px] text-[#5E6A72]">The signature</p>
                    <p className="text-primary text-[13px] leading-tight font-semibold sm:truncate sm:text-[14px]">Barrier Peptide Serum</p>
                  </div>
                  <Link
                    href="/products/barrier-peptide-serum"
                    aria-label="View Barrier Peptide Serum"
                    className="bg-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-transform hover:rotate-45"
                  >
                    <ArrowUpRight size={16} strokeWidth={1.5} />
                  </Link>
                </div>
              </div>

              {/* Rotating seal */}
              <div
                aria-hidden="true"
                className="absolute top-[4%] left-[2%] flex h-28 w-28 items-center justify-center rounded-full bg-[#092D43] text-[#F8F6F1] shadow-[0_16px_40px_rgba(9,45,67,0.25)] sm:h-32 sm:w-32"
              >
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite] motion-reduce:animate-none">
                  <defs>
                    <path id="brand-ring" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
                  </defs>
                  <text fill="currentColor" fontSize="7.6" letterSpacing="1.55">
                    <textPath href="#brand-ring">{ring}</textPath>
                  </text>
                </svg>
                <span className="font-heading relative text-[30px] leading-none italic">N</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
