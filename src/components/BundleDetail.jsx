"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Moon,
  ShieldCheck,
  ShoppingBag,
  Sun,
} from "lucide-react";
import { getProductByHandle, formatPrice } from "@/data/products";
import { addToCart } from "@/lib/cart";

function RoutineBlock({ title, icon: Icon, steps }) {
  return (
    <article className="border-primary/10 rounded-[25px] border bg-white p-6 sm:p-8">
      <h3 className="font-heading text-primary flex items-center gap-3 text-[32px]">
        <Icon size={23} strokeWidth={1.5} /> {title}
      </h3>
      <ol className="mt-6 space-y-5">
        {steps.map((step, index) => (
          <li key={`${step.handle}-${index}`} className="flex gap-4">
            <span className="text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F3F6] font-sans text-[13px] font-semibold">
              {index + 1}
            </span>
            <div>
              <Link
                href={`/products/${step.handle}`}
                className="text-primary font-sans text-[16px] font-semibold hover:underline"
              >
                {getProductByHandle(step.handle)?.name || step.handle}
              </Link>
              <p className="text-primary/65 mt-1 font-sans text-[15px] leading-[1.7]">
                {step.instruction}
              </p>
              {step.caution && (
                <span className="text-primary mt-2 inline-block rounded-full bg-[#F5ECE1] px-3 py-1 font-sans text-[12px]">
                  Introduce gradually
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}

export default function BundleDetail({ bundle }) {
  const [message, setMessage] = useState("");
  const products = bundle.productHandles.map(getProductByHandle);
  const missing = products.some((product) => !product);
  const available =
    !missing &&
    products.every(
      (product) =>
        product.available !== false &&
        (product.variants?.some((variant) => variant.available !== false) ??
          true),
    );

  const priceOf = (product) => {
    const variant = product?.variants?.find((item) => item.available !== false);
    return variant?.price ?? product?.price ?? null;
  };
  const allPricesAvailable = products.every(
    (product) => typeof priceOf(product) === "number",
  );
  const individualTotal = allPricesAvailable
    ? products.reduce((sum, product) => sum + priceOf(product), 0)
    : null;
  const showBundlePrice =
    bundle.priceVerified && typeof bundle.price === "number";
  const showSavings =
    showBundlePrice &&
    bundle.savingsVerified &&
    individualTotal !== null &&
    bundle.price < individualTotal;

  function handleAddBundle() {
    setMessage("");
    if (!available) {
      setMessage("One or more included products are currently unavailable.");
      return;
    }

    // Prototype cart only: adds components individually. Shopify must implement
    // an actual bundle SKU/discount and atomic inventory checks before launch.
    let addedCount = 0;
    for (const product of products) {
      const variant =
        product.variants?.find((item) => item.available !== false) || null;
      try {
        if (addToCart(product, 1, variant)) addedCount += 1;
      } catch {
        // Report partial cart changes rather than claiming the bundle was fully added.
      }
    }
    setMessage(
      addedCount === products.length
        ? "All included products were added separately to your bag. Bundle discounts are not yet applied."
        : `${addedCount} of ${products.length} products were added. Please review your bag before checkout.`,
    );
  }

  return (
    <main className="px-4 pt-28 pb-20 font-sans md:px-6 lg:pt-36">
      <div className="mx-auto max-w-360">
        <Link
          href="/#ritual-bundles"
          className="text-primary/70 hover:text-primary mb-7 inline-flex items-center gap-2 text-[14px]"
        >
          <ArrowLeft size={17} /> Back to Ritual Collection
        </Link>
        <div className="border-primary/10 grid overflow-hidden rounded-[30px] border bg-linear-to-br from-[#E8F5F8] via-[#F7FAFA] to-[#D8EBF0] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[370px] overflow-hidden sm:min-h-[470px] lg:min-h-[650px]">
            {bundle.heroImage ? (
              <Image
                src={bundle.heroImage}
                alt={`All products in ${bundle.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain p-5"
              />
            ) : (
              <div className="absolute inset-0 flex items-end justify-center gap-0 px-4 pt-10 pb-9">
                {products.filter(Boolean).map((product, index) => (
                  <div
                    key={product.handle}
                    className={`relative min-w-0 flex-1 ${index % 2 ? "z-10 -mx-4 -translate-y-5" : "z-0"}`}
                    style={{ height: index % 2 ? "86%" : "75%" }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 1024px) 30vw, 200px"
                      className="object-contain drop-shadow-[0_20px_25px_rgba(6,48,74,0.12)]"
                    />
                  </div>
                ))}
              </div>
            )}
            <span className="text-primary absolute bottom-6 left-6 rounded-full bg-white/90 px-5 py-2 font-sans text-[13px] font-medium">
              {bundle.productHandles.length}-Piece System
            </span>
          </div>
          <div className="flex flex-col justify-center bg-white/75 p-7 sm:p-10 lg:p-12">
            <span className="text-[14px] font-medium text-[#6999AD]">
              {bundle.subtitle}
            </span>
            <h1 className="font-heading text-primary mt-4 text-[clamp(2.7rem,4vw,4.8rem)] leading-[0.97]">
              {bundle.name}
            </h1>
            <p className="text-primary/70 mt-6 text-[16px] leading-[1.75]">
              {bundle.description}
            </p>
            <div className="border-primary/10 mt-7 border-t pt-6">
              <h2 className="text-primary text-[16px] font-semibold">
                Included products
              </h2>
              <ul className="mt-4 space-y-3">
                {products.map((product, index) => (
                  <li
                    key={bundle.productHandles[index]}
                    className="text-primary/70 flex items-start gap-3 text-[15px]"
                  >
                    <Check
                      size={18}
                      className="mt-0.5 shrink-0 text-[#6999AD]"
                    />{" "}
                    {product?.name || "Product information not available"}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-primary/10 mt-7 border-t pt-6">
              {individualTotal !== null && (
                <div className="text-primary/70 flex items-center justify-between gap-3 text-[14px]">
                  <span>Current individual product value</span>
                  <strong className="text-primary text-[18px]">
                    {formatPrice(individualTotal)}
                  </strong>
                </div>
              )}
              {showBundlePrice ? (
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-primary text-[15px] font-semibold">
                    Approved bundle price
                  </span>
                  <strong className="text-primary text-[24px]">
                    {formatPrice(bundle.price)}
                  </strong>
                </div>
              ) : (
                <p className="text-primary/60 mt-3 text-[14px]">
                  Bundle price awaiting approval. The cart currently uses
                  individual product prices.
                </p>
              )}
              {showSavings && (
                <p className="text-primary mt-2 text-[14px] font-semibold">
                  Verified savings:{" "}
                  {formatPrice(individualTotal - bundle.price)}
                </p>
              )}
              <button
                type="button"
                disabled={!available}
                onClick={handleAddBundle}
                className="group bg-primary mt-6 flex min-h-[56px] w-full items-center justify-between rounded-full py-1.5 pr-1.5 pl-6 text-[15px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Add Entire Bundle to Bag{" "}
                <span className="text-primary flex h-11 w-11 items-center justify-center rounded-full bg-[#D8EDF3]">
                  <ShoppingBag size={19} />
                </span>
              </button>
              <p className="text-primary/55 mt-3 text-[12px] leading-[1.6]">
                Development cart: products are added separately. Shopify bundle
                inventory, discount and fulfillment setup must be completed
                before launch.
              </p>
              {message && (
                <p
                  role="status"
                  aria-live="polite"
                  className="text-primary mt-3 text-[14px] leading-[1.6]"
                >
                  {message}{" "}
                  <Link
                    href="/cart"
                    className="font-semibold underline underline-offset-4"
                  >
                    View Bag
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>

        <section aria-labelledby="bundle-products-heading" className="mt-20">
          <header className="mb-8">
            <span className="text-[13px] text-[#6999AD]">THE CURATED SET</span>
            <h2
              id="bundle-products-heading"
              className="font-heading text-primary mt-3 text-[clamp(2.5rem,4vw,4rem)]"
            >
              What's <em>Inside.</em>
            </h2>
          </header>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.filter(Boolean).map((product) => (
              <article
                key={product.handle}
                className="border-primary/10 overflow-hidden rounded-[25px] border"
              >
                <Link
                  href={`/products/${product.handle}`}
                  className="relative block aspect-5/4"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-5"
                  />
                </Link>
                <div className="p-6">
                  <h3 className="font-heading text-primary text-[27px]">
                    {product.name}
                  </h3>
                  <p className="text-primary/65 mt-3 min-h-[70px] text-[15px] leading-[1.7]">
                    {product.description}
                  </p>
                  <div className="border-primary/10 mt-5 flex items-center justify-between border-t pt-4">
                    <span className="text-primary/65 text-[14px]">
                      Individual value
                    </span>
                    <span className="text-primary text-[16px] font-semibold">
                      {typeof priceOf(product) === "number"
                        ? formatPrice(priceOf(product))
                        : "Confirm price"}
                    </span>
                  </div>
                  <Link
                    href={`/products/${product.handle}`}
                    className="text-primary mt-4 inline-flex items-center gap-2 text-[14px] font-semibold"
                  >
                    View product <ArrowUpRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="bundle-routine-heading" className="mt-20">
          <header className="mb-8">
            <span className="text-[13px] text-[#6999AD]">STEP BY STEP</span>
            <h2
              id="bundle-routine-heading"
              className="font-heading text-primary mt-3 text-[clamp(2.5rem,4vw,4rem)]"
            >
              How to Use <em>Your Ritual.</em>
            </h2>
          </header>
          <div className="grid gap-5 md:grid-cols-2">
            <RoutineBlock
              title="Morning / AM"
              icon={Sun}
              steps={bundle.routine.morning}
            />
            <RoutineBlock
              title="Evening / PM"
              icon={Moon}
              steps={bundle.routine.evening}
            />
          </div>
          {bundle.safetyNote && (
            <div className="text-primary mt-5 flex items-start gap-3 rounded-[20px] border border-[#DDD4C8] bg-[#F7F1E9] p-5">
              <ShieldCheck size={22} className="mt-0.5 shrink-0" />
              <p className="text-[14px] leading-[1.75]">
                <strong>Retinol guidance:</strong> {bundle.safetyNote}
              </p>
            </div>
          )}
        </section>

        <section
          aria-labelledby="bundle-faq-heading"
          className="border-primary/10 mt-20 grid gap-8 border-t pt-14 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div>
            <span className="text-[13px] text-[#6999AD]">HELPFUL ANSWERS</span>
            <h2
              id="bundle-faq-heading"
              className="font-heading text-primary mt-3 text-[clamp(2.5rem,4vw,4rem)]"
            >
              Frequently Asked <em>Questions.</em>
            </h2>
          </div>
          <div className="border-primary/10 border-t">
            {bundle.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-primary/10 border-b"
              >
                <summary className="text-primary flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-[16px] font-semibold [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="text-[24px] font-normal group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="text-primary/65 pb-6 text-[15px] leading-[1.8]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
        <p className="text-primary/55 mt-10 text-[13px]">
          Customer reviews will appear here when approved, attributable reviews
          for this bundle are available.
        </p>
      </div>
    </main>
  );
}
