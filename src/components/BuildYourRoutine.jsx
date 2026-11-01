"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Droplets,
  ShieldCheck,
  Sparkles,
  Sun,
  Plus,
} from "lucide-react";

import { getProductByHandle, formatPrice } from "@/data/products";
import { addToCart } from "@/lib/cart";

//  SLIDES — CHANGE YOUR LOCAL IMAGES HERE

const slides = [
  {
    id: "serum",
    handle: "barrier-peptide-serum",
    image: "/assets/barrier.png",
    title: "A Ritual",
    highlight: "of Hydration.",

    background:
      "radial-gradient(ellipse at 50% 45%, #FFFFFF 0%, #F0FAFC 45%, #D8EFF5 100%)",

    features: [
      {
        title: "Lightweight Hydration",
        description: "A refreshing daily hydration step.",
        icon: Droplets,
      },
      {
        title: "Barrier-Focused Care",
        description: "Designed to complement everyday skincare.",
        icon: ShieldCheck,
      },
      {
        title: "Peptide Care",
        description: "A thoughtful addition to your ritual.",
        icon: Sparkles,
      },
      {
        title: "How to Use",
        description: "Apply after cleansing, before moisturizer.",
        icon: Plus,
        dark: true,
      },
    ],
  },

  {
    id: "firming",
    handle: "multi-peptide-firming-cream",
    image: "/assets/peptide.png",
    title: "The Art",
    highlight: "of Firmness.",

    background:
      "radial-gradient(ellipse at 50% 45%, #FFFFFF 0%, #FAF7F2 45%, #EDE1D5 100%)",

    features: [
      {
        title: "Peptide Care",
        description: "Considered care for your daily routine.",
        icon: Sparkles,
      },
      {
        title: "Moisture Ritual",
        description: "A comforting step after serum.",
        icon: Droplets,
      },
      {
        title: "Everyday Care",
        description: "Designed to complement your ritual.",
        icon: ShieldCheck,
      },
      {
        title: "How to Use",
        description: "Apply after serum to moisturize skin.",
        icon: Plus,
        dark: true,
      },
    ],
  },

  {
    id: "ceramide",
    handle: "pure-ceramide-barrier-cream",
    image: "/assets/ceramide.png",
    title: "A Moment",
    highlight: "of Comfort.",

    background:
      "radial-gradient(ellipse at 50% 45%, #FFFFFF 0%, #F1FAFA 45%, #DDEDEA 100%)",

    features: [
      {
        title: "Ceramide Care",
        description: "Inspired by the skin's natural lipids.",
        icon: ShieldCheck,
      },
      {
        title: "Daily Moisture",
        description: "A nourishing skincare step.",
        icon: Droplets,
      },
      {
        title: "Comfort First",
        description: "Pairs beautifully with hydrating serums.",
        icon: Sparkles,
      },
      {
        title: "How to Use",
        description: "Apply after cleansing and serums.",
        icon: Plus,
        dark: true,
      },
    ],
  },
];

// FEATURE CARD

function FeatureCard({ feature, delay = 0, animate = true }) {
  const Icon = feature.icon;

  return (
    <article
      style={{
        animationDelay: `${delay}ms`,
      }}
      className={`flex items-start gap-4 rounded-[22px] border p-5 font-sans shadow-[0_14px_40px_rgba(6,48,74,0.045)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(6,48,74,0.12)] ${
        animate
          ? "animate-[featurePop_650ms_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none"
          : "opacity-0"
      } ${
        feature.dark
          ? "border-primary bg-primary text-white"
          : "text-primary border-white/90 bg-white/75"
      }`}
    >
      {/* ICON */}
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
          feature.dark
            ? "text-primary bg-[#D8EDF3]"
            : "text-primary bg-[#EAF6F8]"
        } `}
      >
        <Icon size={22} strokeWidth={1.5} />
      </span>

      {/* CONTENT */}
      <div className="min-w-0">
        <h3 className="font-sans text-[17px] leading-[1.4] font-semibold">
          {feature.title}
        </h3>

        <p
          className={`mt-2 font-sans text-[15px] leading-[1.65] ${
            feature.dark ? "text-white/85" : "text-primary/70"
          }`}
        >
          {feature.description}
        </p>
      </div>
    </article>
  );
}

//  PRODUCT IMAGE

function ShowcaseImage({ slide, product, priority = false }) {
  return (
    <div className="relative flex h-70 w-full items-center justify-center sm:h-[340px] lg:h-[390px]">
      {/* SOFT BACKGROUND GLOW */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/65 blur-[65px] sm:h-[330px] sm:w-[330px]" />

      {/* PRODUCT */}
      <Link
        href={`/products/${product.handle}`}
        aria-label={`Explore ${product.name}`}
        className="group/image relative z-10 block h-full w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[350px]"
      >
        <Image
          src={slide.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 350px"
          className="object-contain drop-shadow-[0_28px_30px_rgba(6,48,74,0.12)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/image:scale-[1.04] motion-reduce:transition-none"
        />

        {/* SUBTLE BOTTOM SHADOW */}
        <div className="bg-primary/10 pointer-events-none absolute bottom-2 left-1/2 h-5 w-[55%] -translate-x-1/2 rounded-full blur-xl" />
      </Link>
    </div>
  );
}

// PURCHASE BAR

function PurchaseBar({ product }) {
  const [added, setAdded] = useState(false);

  const variant =
    product.variants?.find((item) => item.available !== false) || null;

  const price = variant?.price ?? product.price;
  const size = variant?.size ?? product.size;

  function handleAdd() {
    if (!product.available) return;

    const success = addToCart(product, 1, variant);

    if (success) {
      setAdded(true);

      window.setTimeout(() => {
        setAdded(false);
      }, 1800);
    }
  }

  return (
    <div className="mx-auto mt-8 flex max-w-[1000px] flex-wrap items-center justify-center gap-3 lg:mt-10">
      {/* PRODUCT NAME */}
      <Link
        href={`/products/${product.handle}`}
        className="text-primary inline-flex min-h-[54px] items-center gap-3 rounded-full border border-white/90 bg-white/80 px-5 text-[13px] font-semibold backdrop-blur-lg transition-colors hover:bg-white sm:px-6 sm:text-[14px]"
      >
        {product.name}

        <ArrowUpRight size={17} strokeWidth={1.5} />
      </Link>

      {/* PRICE */}
      <div className="inline-flex min-h-[54px] items-center gap-3 rounded-full border border-white/90 bg-white/80 px-6 backdrop-blur-lg">
        <span className="text-primary text-[16px] font-semibold">
          {formatPrice(price)}
        </span>

        {size && <span className="text-primary/60 text-[13px]">{size}</span>}
      </div>

      {/* ADD TO BAG */}
      <button
        type="button"
        onClick={handleAdd}
        disabled={!product.available}
        className="group bg-primary inline-flex min-h-[54px] items-center gap-5 rounded-full py-1.5 pr-1.5 pl-6 text-[13px] font-semibold text-white transition-colors duration-300 hover:bg-[#0A4968] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {added ? "Added to Bag" : product.available ? "Add to Bag" : "Sold Out"}

        <span className="text-primary flex h-11 w-11 items-center justify-center rounded-full bg-[#D8EDF3]">
          {added ? (
            <Check size={19} />
          ) : (
            <Plus
              size={20}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
          )}
        </span>
      </button>
    </div>
  );
}

//  MAIN COMPONENT

export default function BuildYourRoutine() {
  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  // Start only when the section enters the viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        if (entry.isIntersecting) {
          setHasEntered(true);
        }
      },
      {
        threshold: 0.25,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Auto-change slide every 2 seconds while visible
  useEffect(() => {
    if (!isVisible) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isVisible]);

  const slide = slides[activeIndex];
  const product = getProductByHandle(slide.handle);

  function nextSlide() {
    setActiveIndex((current) => (current + 1) % slides.length);
  }

  function previousSlide() {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  }

  if (!product) return null;

  return (
    <section
      ref={sectionRef}
      id="signature-ritual"
      aria-labelledby="signature-heading"
      className="px-4 py-12 md:px-6 md:py-18"
    >
      <div
        className="relative mx-auto max-w-360 overflow-hidden rounded-[28px] px-5 py-12 sm:rounded-[38px] sm:px-9 sm:py-14 lg:px-12 lg:py-16"
        style={{
          background: slide.background,
        }}
      >
        <div className="relative mx-auto max-w-350">
          {/* TOP NAVIGATION */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-primary inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2.5 text-[12px] font-medium backdrop-blur-lg sm:text-[13px]">
              <Sparkles size={16} strokeWidth={1.5} />
              NUOVÉ Signature Collection
            </span>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous product"
                className="text-primary hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/80 transition-colors hover:text-white sm:h-12 sm:w-12"
              >
                <ArrowLeft size={19} strokeWidth={1.5} />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next product"
                className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-[#0A4968] sm:h-12 sm:w-12"
              >
                <ArrowRight size={19} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* SLIDE — RE-MOUNTS FOR SMOOTH TRANSITION */}
          <div
            key={slide.id}
            className={
              hasEntered
                ? "animate-[showcaseReveal_650ms_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none"
                : "opacity-0 motion-reduce:opacity-100"
            }
          >
            {/* HEADING */}
            <header className="mx-auto mt-7 max-w-250 text-center sm:mt-9">
              <h2
                id="signature-heading"
                className="font-heading text-primary text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] font-normal"
              >
                {slide.title}{" "}
                <span className="text-[#1675A7] italic">{slide.highlight}</span>
              </h2>
            </header>

            {/* =====================================
                PRODUCT + FEATURES
                DESKTOP: 3 COLUMNS
                MOBILE: IMAGE FIRST, CARDS BELOW
            ===================================== */}
            <div className="mx-auto mt-8 grid max-w-325 grid-cols-1 items-center gap-6 sm:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,360px)_minmax(0,1fr)] lg:gap-5 xl:gap-10">
              {/* CENTER IMAGE */}
              <div className="order-1 min-w-0 lg:order-2">
                <ShowcaseImage
                  slide={slide}
                  product={product}
                  priority={activeIndex === 0}
                />
              </div>

              {/* LEFT FEATURES */}
              <div className="order-2 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:order-1 lg:grid-cols-1 lg:gap-10 xl:gap-14">
                <FeatureCard
                  feature={slide.features[0]}
                  delay={300}
                  animate={hasEntered}
                />

                <FeatureCard
                  feature={slide.features[2]}
                  delay={900}
                  animate={hasEntered}
                />
              </div>

              {/* RIGHT FEATURES */}
              <div className="order-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:gap-10 xl:gap-14">
                <FeatureCard
                  feature={slide.features[1]}
                  delay={600}
                  animate={hasEntered}
                />

                <FeatureCard
                  feature={slide.features[3]}
                  delay={1200}
                  animate={hasEntered}
                />
              </div>
            </div>

            {/* PURCHASE BAR — ALWAYS SEPARATE */}
            <PurchaseBar key={product.handle} product={product} />
          </div>

          {/* SLIDE INDICATORS */}
          <div
            className="mt-9 flex items-center justify-center gap-2.5"
            role="group"
            aria-label="Select signature product"
          >
            {slides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={index === activeIndex}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === activeIndex
                    ? "bg-primary w-11"
                    : "bg-primary/20 hover:bg-primary/50 w-3"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ANIMATION */}
      <style jsx global>{`
        @keyframes showcaseReveal {
          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes featurePop {
          0% {
            opacity: 0;
            transform: translateY(35px) scale(0.85);
            filter: blur(6px);
          }

          65% {
            opacity: 1;
            transform: translateY(-6px) scale(1.025);
            filter: blur(0);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          [class*="animate-"] {
            animation-duration: 0.01ms;
            animation-delay: 0ms;
          }
        }
      `}</style>
    </section>
  );
}
