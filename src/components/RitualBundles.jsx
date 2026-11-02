"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Droplets,
  Layers3,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";
import { bundles } from "@/data/bundles";
import { getProductByHandle } from "@/data/products";

const icons = {
  droplets: Droplets,
  layers: Layers3,
  moon: Moon,
  sparkles: Sparkles,
  sun: Sun,
};

function FeatureInfo({ feature, align = "left", delay = 0 }) {
  const Icon = icons[feature.icon] || Sparkles;
  return (
    <article
      style={{ animationDelay: `${delay}ms` }}
      className={`border-primary/10 animate-[bundleFeatureIn_650ms_cubic-bezier(0.22,1,0.36,1)_both] rounded-[20px] border bg-white/75 p-4 backdrop-blur-sm motion-reduce:animate-none lg:border-0 lg:bg-transparent lg:p-1 lg:shadow-none ${align === "left" ? "lg:text-right" : "lg:text-left"}`}
    >
      <div
        className={`mb-3 flex ${align === "left" ? "lg:justify-end" : "lg:justify-start"}`}
      >
        <span className="text-primary flex h-10 w-10 items-center justify-center rounded-full bg-white">
          <Icon size={19} strokeWidth={1.5} />
        </span>
      </div>
      <h4 className="text-primary font-sans text-[16px] font-semibold sm:text-[17px]">
        {feature.title}
      </h4>
      <p className="text-primary/65 mt-2 font-sans text-[14px] leading-[1.65]">
        {feature.description}
      </p>
    </article>
  );
}

function BundleVisual({ bundle }) {
  const products = bundle.productHandles
    .map(getProductByHandle)
    .filter(Boolean);
  if (bundle.heroImage) {
    return (
      <Image
        src={bundle.heroImage}
        alt={`${bundle.name} with all included products`}
        fill
        sizes="(max-width: 1024px) 100vw, 45vw"
        className="object-contain p-4"
      />
    );
  }
  // Composed from existing product imagery; does not require unapproved bundle art.
  return (
    <div className="absolute inset-0 flex items-end justify-center gap-0 px-3 pt-8 pb-6">
      {products.map((product, index) => (
        <div
          key={product.handle}
          className={`relative min-w-0 flex-1 ${index % 2 ? "z-10 -mx-3 -translate-y-3" : "z-0"}`}
          style={{ height: index % 2 ? "83%" : "73%" }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 30vw, 180px"
            className="object-contain drop-shadow-[0_15px_17px_rgba(6,48,74,0.10)]"
          />
        </div>
      ))}
    </div>
  );
}

export default function RitualBundles() {
  const published = bundles.filter((bundle) => bundle.published);
  const [activeIndex, setActiveIndex] = useState(2);
  const bundle = published[activeIndex];
  if (!bundle) return null;
  return (
    <section
      id="ritual-bundles"
      aria-labelledby="ritual-bundles-heading"
      className="px-4 py-12 md:px-6 lg:py-16"
    >
      <div className="mx-auto max-w-360">
        <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="font-sans text-[13px] tracking-[0.12em] text-[#6999AD] uppercase">
              NUOVÉ Curated Systems
            </span>
            <h2
              id="ritual-bundles-heading"
              className="font-heading text-primary mt-2 text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05]"
            >
              The Ritual{" "}
              <em className="font-normal text-[#6999AD]">Collection.</em>
            </h2>
          </div>
          <p className="text-primary/65 max-w-[380px] font-sans text-[16px] leading-[1.7]">
            Considered skincare systems with their own step-by-step routine.
          </p>
        </header>
        <div
          className="border-primary/10 relative overflow-hidden rounded-[28px] border p-4 sm:p-8 lg:rounded-[36px] lg:px-12 lg:py-8"
          style={{ background: bundle.background }}
        >
          <div
            className="relative z-10 mx-auto flex w-full max-w-[610px] gap-1 rounded-full border border-white bg-white/75 p-1.5 backdrop-blur-md"
            role="group"
            aria-label="Choose a skincare bundle"
          >
            {published.map((item, index) => (
              <button
                type="button"
                key={item.handle}
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className={`min-h-11 min-w-0 flex-1 rounded-full px-2 font-sans text-[12px] font-semibold transition-colors sm:text-[14px] ${index === activeIndex ? "bg-primary text-white" : "text-primary/70 hover:bg-white"}`}
              >
                {item.shortName}
              </button>
            ))}
          </div>
          <div
            key={bundle.handle}
            className="animate-[bundleReveal_500ms_ease-out_both] motion-reduce:animate-none"
          >
            <div className="mx-auto mt-7 max-w-[720px] text-center">
              <p className="font-sans text-[13px] font-medium text-[#6999AD]">
                {bundle.subtitle}
              </p>
              <h3 className="font-heading text-primary mt-2 text-[clamp(2.4rem,3.5vw,3.8rem)] leading-tight">
                {bundle.name}
              </h3>
              <p className="text-primary/65 mx-auto mt-2 max-w-[540px] font-sans text-[15px] leading-[1.65]">
                {bundle.description}
              </p>
            </div>
            <div className="mx-auto mt-6 grid max-w-[1230px] items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-8">
              <div className="order-2 grid gap-3 sm:grid-cols-2 lg:order-1 lg:grid-cols-1 lg:gap-8">
                <FeatureInfo
                  feature={bundle.features[0]}
                  align="left"
                  delay={120}
                />
                <FeatureInfo
                  feature={bundle.features[2]}
                  align="left"
                  delay={360}
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative mx-auto aspect-[5/4] w-full max-w-[550px] overflow-hidden rounded-[24px] border border-white/70 bg-white/30 shadow-[0_15px_45px_rgba(6,48,74,0.06)] sm:aspect-[6/4] lg:aspect-[5/4]">
                  <BundleVisual bundle={bundle} />
                  <span className="text-primary absolute bottom-3 left-3 rounded-full bg-white/85 px-4 py-2 text-[13px] font-medium">
                    {bundle.productHandles.length}-Piece Set
                  </span>
                </div>
              </div>
              <div className="order-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:gap-8">
                <FeatureInfo
                  feature={bundle.features[1]}
                  align="right"
                  delay={240}
                />
                <FeatureInfo
                  feature={bundle.features[3]}
                  align="right"
                  delay={480}
                />
              </div>
            </div>
            <div className="border-primary/10 mx-auto mt-6 max-w-[900px] border-t pt-5 text-center">
              <p className="text-primary font-sans text-[14px] font-semibold">
                Included in this set
              </p>
              <p className="text-primary/65 mt-2 font-sans text-[14px] leading-[1.7]">
                {bundle.productHandles
                  .map((handle) => getProductByHandle(handle)?.name || handle)
                  .join("  ·  ")}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex(
                      (activeIndex - 1 + published.length) % published.length,
                    )
                  }
                  aria-label="Previous bundle"
                  className="border-primary/15 text-primary flex h-11 w-11 items-center justify-center rounded-full border bg-white/80"
                >
                  <ArrowRight size={18} className="rotate-180" />
                </button>
                <Link
                  href={`/bundles/${bundle.handle}`}
                  className="group bg-primary flex min-h-[52px] items-center gap-5 rounded-full py-1 pr-1 pl-6 font-sans text-[15px] font-semibold text-white"
                >
                  View Bundle & Shop{" "}
                  <span className="text-primary flex h-10 w-10 items-center justify-center rounded-full bg-[#D8EDF3]">
                    <ArrowUpRight
                      size={19}
                      className="transition-transform group-hover:rotate-45"
                    />
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((activeIndex + 1) % published.length)
                  }
                  aria-label="Next bundle"
                  className="border-primary/15 text-primary flex h-11 w-11 items-center justify-center rounded-full border bg-white/80"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes bundleReveal {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bundleFeatureIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}