import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  FlaskConical,
  Layers3,
  Gem,
} from "lucide-react";

const benefits = [
  {
    title: "Peptide-Focused",
    description:
      "Peptides are at the heart of our skincare collection, bringing ingredient-led thinking to everyday care.",
    icon: FlaskConical,
    background: "bg-[linear-gradient(145deg,#E9F6FA_0%,#D9EDF3_100%)]",
    iconBackground: "bg-[#C7E4EE]",
  },
  {
    title: "Considered Ingredients",
    description:
      "Peptides and complementary skincare ingredients, thoughtfully brought together in our collection.",
    icon: Sparkles,
    background: "bg-[linear-gradient(145deg,#FBF5EC_0%,#F0E2D1_100%)]",
    iconBackground: "bg-[#F0DCC2]",
  },
  {
    title: "Everyday Rituals",
    description:
      "Simple skincare steps designed to fit naturally into your morning and evening routines.",
    icon: Layers3,
    background: "bg-[linear-gradient(145deg,#EFF5F1_0%,#DCEAE1_100%)]",
    iconBackground: "bg-[#D0E3D8]",
  },
  {
    title: "Elevated Experience",
    description:
      "A considered approach to skincare presentation, discovery, and the details that make a routine feel special.",
    icon: Gem,
    background: "bg-[linear-gradient(145deg,#F2F2F8_0%,#E2E7F1_100%)]",
    iconBackground: "bg-[#D9E0EF]",
  },
];

export default function WhyNuove() {
  return (
    <section
      id="why-nuove"
      aria-labelledby="why-nuove-heading"
      className="px-4 md:px-6 py-12"
    >
      <div className="mx-auto max-w-390">
        {/* SECTION HEADING */}
        <header className="mx-auto mb-12 max-w-[800px] text-center sm:mb-16">
          <span className="border-primary/10 text-primary inline-flex items-center gap-2 rounded-full border bg-[#F1F7F8] px-5 py-3 font-sans text-[14px] font-medium">
            <Sparkles size={17} strokeWidth={1.5} />
            The NUOVÉ Difference
          </span>

          <h2
            id="why-nuove-heading"
            className="font-heading text-primary mt-6 text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] font-normal"
          >
            Why <span className="text-[#6496AB] italic">NUOVÉ?</span>
          </h2>

          <p className="text-primary/65 mx-auto mt-7 max-w-[570px] font-sans text-[17px] leading-[1.75]">
            Thoughtful skincare, considered ingredients, and everyday rituals
            designed with intention.
          </p>
        </header>

        {/* PREMIUM CARDS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.title}
                className={`group border-primary/5 relative flex min-h-[390px] flex-col overflow-hidden rounded-[28px] border p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(6,48,74,0.12)] sm:min-h-[420px] ${benefit.background}`}
              >
                {/* BACKGROUND CIRCLES */}
                <div className="pointer-events-none absolute -top-20 -right-20 h-[280px] w-[280px] rounded-full border border-white/60 transition-transform duration-700 group-hover:scale-110" />

                <div className="pointer-events-none absolute -top-12 -right-12 h-[210px] w-[210px] rounded-full border border-white/70" />

                {/* LARGE ICON AREA */}
                <div className="relative flex flex-1 items-center justify-center">
                  <div className="absolute h-[200px] w-[200px] rounded-full bg-white/25 blur-[35px]" />

                  <div
                    className={`relative flex h-[155px] w-[155px] items-center justify-center rounded-full border border-white/80 ${benefit.iconBackground} shadow-[0_20px_45px_rgba(6,48,74,0.08)] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-[-8deg]`}
                  >
                    <div className="absolute inset-3 rounded-full border border-white/55" />

                    <Icon
                      size={64}
                      strokeWidth={1.15}
                      className="text-primary relative"
                    />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="relative z-10 mt-8">
                  <div className="bg-primary/30 mb-5 h-px w-12 transition-all duration-500 group-hover:w-20" />

                  <h3 className="font-heading text-primary text-[34px] leading-[1] sm:text-[37px]">
                    {benefit.title}
                  </h3>

                  <p className="text-primary/70 mt-4 font-sans text-[16px] leading-[1.75]">
                    {benefit.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}