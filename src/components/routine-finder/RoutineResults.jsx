"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Mail,
  Moon,
  Sun,
  ShieldAlert,
  Check,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import {
  buildRecommendation,
  validAnswers,
} from "@/data/routine-recommendations";

function RoutineTimeline({ title, icon: Icon, entries, sunlight }) {
  if (!entries.length) return null;
  return (
    <section className="border-primary/10 rounded-[26px] border bg-white/90 p-6 sm:p-8">
      <h2 className="font-heading text-primary flex items-center gap-3 text-[32px]">
        <Icon className="text-[#6999AD]" size={23} /> {title}
      </h2>
      <ol className="mt-7 space-y-6">
        {entries.map((item, i) => (
          <li
            key={`${title}-${item.handle}`}
            className="border-primary/10 flex gap-4 border-b pb-5 last:border-0 last:pb-0"
          >
            <span className="font-heading text-[28px] text-[#6999AD]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <p className="font-sans text-[11px] font-semibold tracking-[0.12em] text-[#6999AD] uppercase">
                {item.step}
              </p>
              <Link
                href={`/products/${item.handle}`}
                className="text-primary mt-1 inline-block font-sans text-[16px] font-semibold hover:underline"
              >
                {item.product.name}
              </Link>
              <p className="text-primary/65 mt-2 font-sans text-[13px] leading-[1.75]">
                {item.instruction}
              </p>
            </div>
          </li>
        ))}
        {sunlight && (
          <li className="border-primary/10 flex gap-4 border-t pt-5">
            <span className="font-heading text-[28px] text-[#6999AD]">+</span>
            <p className="text-primary/70 font-sans text-[13px] leading-[1.8]">
              <strong className="text-primary">Daily sun protection:</strong>{" "}
              Finish with a suitable broad-spectrum sunscreen, SPF 30 or higher
              (not included in this recommendation).
            </p>
          </li>
        )}
      </ol>
    </section>
  );
}

export default function RoutineResults() {
  const params = useSearchParams();
  const answers = useMemo(
    () => validAnswers(Object.fromEntries(params.entries())),
    [params],
  );
  const result = useMemo(
    () => buildRecommendation(answers, products),
    [answers],
  );
  const [consent, setConsent] = useState(false);

  if (!result)
    return (
      <main className="min-h-screen bg-[#F8F7F4] px-5 pt-40 pb-20 text-center">
        <h1 className="font-heading text-primary text-5xl">
          Find your routine
        </h1>
        <p className="text-primary/65 mx-auto mt-5 max-w-[460px] font-sans">
          Please complete all five questions to see your recommendations.
        </p>
        <Link
          href="/find-your-routine"
          className="bg-primary mt-8 inline-flex rounded-full px-7 py-4 font-sans font-semibold text-white"
        >
          Start the quiz
        </Link>
      </main>
    );

  const body = [
    result.title,
    result.subtitle,
    "",
    "Morning:",
    ...(result.am.length
      ? result.am.map(
          (x, i) => `${i + 1}. ${x.product.name} — ${x.instruction}`,
        )
      : ["Not selected"]),
    "",
    "Evening:",
    ...(result.pm.length
      ? result.pm.map(
          (x, i) => `${i + 1}. ${x.product.name} — ${x.instruction}`,
        )
      : ["Not selected"]),
    "",
    "Suggested items:",
    ...result.products.map(
      (x) =>
        `- ${x.name}: ${typeof x.price === "number" ? `$${x.price.toFixed(2)}` : "Price unavailable"}`,
    ),
    "",
    result.estimatedPrice === null
      ? "Total unavailable"
      : `Estimated routine total: $${result.estimatedPrice.toFixed(2)} (before shipping/taxes)`,
    "",
    result.note,
    "These are draft, non-medical recommendations pending brand review.",
  ].join("\n");
  const emailHref = `mailto:?subject=${encodeURIComponent(`My NUOVÉ Routine — ${result.title}`)}&body=${encodeURIComponent(body)}`;

  return (
    <main className="px-4 pt-28 pb-20 font-sans md:px-6 lg:pt-36">
      <div className="mx-auto max-w-360">
        <Link
          href="/find-your-routine"
          className="text-primary/70 hover:text-primary inline-flex items-center gap-2 font-sans text-[13px]"
        >
          <ArrowLeft size={16} /> Retake the quiz
        </Link>
        <header className="mt-9 rounded-[30px] bg-[linear-gradient(125deg,#E7F3F6_0%,#F6F9F8_60%,#F5EDE7_100%)] p-7 sm:p-12 lg:p-16">
          <p className="font-sans text-[12px] font-semibold tracking-[0.16em] text-[#6999AD] uppercase">
            Your personalised edit · Preview
          </p>
          <h1 className="font-heading text-primary mt-4 text-[clamp(3rem,6vw,6rem)] leading-none">
            {result.title}
          </h1>
          <p className="text-primary/65 mt-5 max-w-[620px] font-sans text-[16px] leading-[1.9]">
            {result.subtitle} Explore your proposed AM/PM steps and the products
            behind them.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href="#recommended-products"
              className="bg-primary inline-flex min-h-[53px] items-center gap-3 rounded-full px-7 font-sans text-[14px] font-semibold text-white hover:bg-[#0A4968]"
            >
              Shop My Routine <ArrowUpRight size={18} />
            </a>
            <span className="text-primary/70 font-sans text-[14px]">
              {result.products.length} products ·{" "}
              {result.estimatedPrice !== null
                ? `Est. $${result.estimatedPrice.toFixed(2)}`
                : "Price to be confirmed"}
            </span>
          </div>
        </header>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <RoutineTimeline
            title="Morning Ritual"
            icon={Sun}
            entries={result.am}
            sunlight={result.needsSunscreen}
          />
          <RoutineTimeline
            title="Evening Ritual"
            icon={Moon}
            entries={result.pm}
            sunlight={false}
          />
        </div>
        <aside className="border-primary/10 text-primary/75 mt-6 flex gap-3 rounded-[22px] border bg-[#EDF5F6] p-5 font-sans text-[13px] leading-[1.8]">
          <ShieldAlert className="mt-1 shrink-0" size={19} />
          <div>
            <strong className="text-primary">A thoughtful reminder:</strong>{" "}
            {result.note} Retinol products are not included in automatically
            generated routines; any retinol use requires appropriate suitability
            screening, gradual introduction, evening guidance and sun
            protection. This tool does not diagnose or treat skin conditions.
          </div>
        </aside>

        <section
          id="recommended-products"
          aria-labelledby="recommended-products-heading"
          className="scroll-mt-28 pt-16"
        >
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-sans text-[12px] font-semibold tracking-[0.14em] text-[#6999AD] uppercase">
                Selected for your answers
              </p>
              <h2
                id="recommended-products-heading"
                className="font-heading text-primary mt-2 text-[clamp(2.3rem,4vw,3.8rem)]"
              >
                Your Product Edit.
              </h2>
            </div>
            <p className="text-primary/65 font-sans text-[15px]">
              {result.estimatedPrice !== null
                ? `Estimated total: $${result.estimatedPrice.toFixed(2)}`
                : "Prices unavailable"}
            </p>
          </div>
          {result.products.length ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-6 lg:grid-cols-3">
              {result.products.map((p) => (
                <ProductCard key={p.handle} product={p} />
              ))}
            </div>
          ) : (
            <p className="text-primary/65 font-sans">
              Products for this combination are not available in the current
              catalog.
            </p>
          )}
          <p className="text-primary/55 mt-5 font-sans text-[12px] leading-[1.8]">
            Estimated total sums listed base prices for distinct recommended
            products; taxes, shipping, size selections, and discounts are
            excluded. Use the individual product cards to add items to your
            existing cart.
          </p>
        </section>

        <section
          className="border-primary/10 mt-16 rounded-[28px] border bg-white p-7 sm:p-10"
          aria-labelledby="email-results-title"
        >
          <span className="text-primary inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF5F7]">
            <Mail size={21} />
          </span>
          <h2
            id="email-results-title"
            className="font-heading text-primary mt-5 text-[32px]"
          >
            Keep Your Routine Close.
          </h2>
          <p className="text-primary/65 mt-2 max-w-[650px] font-sans text-[14px] leading-[1.8]">
            Email yourself a copy of this result using your device's email app.
            We do not collect your email address or store your answers in this
            preview.
          </p>
          <label className="mt-6 flex max-w-[690px] cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-[#06304A]"
            />
            <span className="text-primary/70 font-sans text-[13px] leading-[1.7]">
              I choose to open my email application with these routine
              preferences and recommendations in a message I can review and
              send.
            </span>
          </label>
          <a
            href={consent ? emailHref : undefined}
            aria-disabled={!consent}
            onClick={(e) => {
              if (!consent) e.preventDefault();
            }}
            className={`mt-6 inline-flex min-h-[50px] items-center gap-3 rounded-full px-7 font-sans text-[14px] font-semibold ${consent ? "bg-primary text-white hover:bg-[#0A4968]" : "bg-primary/20 text-primary/50 cursor-not-allowed"}`}
          >
            <Mail size={17} /> Email My Results
          </a>
        </section>
        <p className="text-primary/50 mt-10 text-center font-sans text-[12px]">
          Draft recommendation matrix — review and approval required before
          publishing.
        </p>
      </div>
    </main>
  );
}
