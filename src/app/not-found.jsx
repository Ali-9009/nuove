import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-[#F8F7F4] px-5 py-32">
      {/* SOFT BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#F9FAF8] via-[#F0F6F7] to-[#DFEDF1]"
      />

      {/* SOFT LIGHT EFFECTS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-white/70 blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -bottom-40 h-[600px] w-[600px] rounded-full bg-[#BBD9E3]/30 blur-[110px]"
      />

      {/* DECORATIVE RINGS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 size-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 sm:size-[550px] lg:size-[750px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 size-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 sm:size-[400px] lg:size-[580px]"
      />

      {/* MAIN CONTENT */}
      <section className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center text-center">

        {/* BIG 404 */}
        <div className="relative">
          <span
            aria-hidden="true"
            className="font-heading text-primary/[0.035] pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(12rem,35vw,30rem)] leading-none tracking-[-0.09em]"
          >
            404
          </span>

          <h1 className="font-heading  text-primary relative text-[clamp(7rem,21vw,16rem)] leading-[0.9] font-light tracking-[-0.08em]">
            4<span className="text-[#85AEBB] italic">0</span>4
          </h1>
        </div>

        {/* DIVIDER */}
        <div className="mt-10 flex items-center gap-4">
          <span className="bg-primary/20 h-px w-12" />
          <span className="size-1.5 rotate-45 bg-[#8BB2BF]" />
          <span className="bg-primary/20 h-px w-12" />
        </div>

        {/* HEADING */}
        <h2 className="font-heading text-primary mt-9 text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em]">
          A Beautiful <span className="text-[#6999AD] italic">Detour.</span>
        </h2>

        {/* DESCRIPTION */}
        <p className="text-primary/60 mt-6 max-w-[480px] font-sans text-[15px] leading-[1.9] sm:text-[17px]">
          The page you&apos;re looking for seems to have wandered away.
          Let&apos;s get you back to where you belong.
        </p>

        {/* ACTIONS */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="group bg-primary flex min-h-[56px] items-center gap-6 rounded-full py-1.5 pr-1.5 pl-7 font-sans text-[14px] font-semibold text-white transition-all duration-500 hover:bg-[#0A4968] hover:shadow-[0_15px_35px_rgba(6,48,74,0.14)]"
          >
            Back to Home
            <span className="text-primary flex h-11 w-11 items-center justify-center rounded-full bg-[#D8EDF3] transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={19} strokeWidth={1.5} />
            </span>
          </Link>

          <Link
            href="/collections/all"
            className="group border-primary/15 text-primary hover:border-primary/30 inline-flex min-h-[56px] items-center gap-3 rounded-full border bg-white/60 px-7 font-sans text-[14px] font-semibold backdrop-blur-md transition-colors duration-300 hover:bg-white"
          >
            <ArrowLeft
              size={18}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Explore NUOVÉ
          </Link>
        </div>

        {/* BOTTOM BRAND DETAIL */}
        <div className="mt-16 flex items-center gap-3">
          <span className="bg-primary/20 h-px w-8" />

          <span className="text-primary/40 font-sans text-[10px] font-medium tracking-[0.25em] uppercase">
            NUOVÉ — Science Meets Luxury
          </span>

          <span className="bg-primary/20 h-px w-8" />
        </div>
      </section>
    </main>
  );
}
