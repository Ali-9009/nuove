"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  RotateCcw,
  X,
} from "lucide-react";

import { addToCart } from "@/lib/cart";
import { formatPrice } from "@/data/products";

function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [product.image, ...(product.gallery || [])].filter(
    (src, index, array) => src && array.indexOf(src) === index,
  );

  useEffect(() => {
    if (selectedImage === null) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedImage(null);

      if (event.key === "ArrowRight") {
        setSelectedImage((current) => (current + 1) % images.length);
      }

      if (event.key === "ArrowLeft") {
        setSelectedImage(
          (current) => (current - 1 + images.length) % images.length,
        );
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedImage, images.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {images.map((src, index) => (
          <figure
            key={`${product.handle}-${src}`}
            className="group relative aspect-3/4 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setSelectedImage(index)}
              aria-label={`Enlarge ${product.name} image ${index + 1}`}
              className="absolute inset-0 block h-full w-full cursor-zoom-in"
            >
              <Image
                src={src}
                alt={`${product.name}, product view ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.035] motion-reduce:transition-none"
              />
            </button>

            <figcaption className="sr-only">
              {product.name}, image {index + 1}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* FULL-SCREEN IMAGE VIEWER */}
      {selectedImage !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} image viewer`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image viewer"
            className="bg-primary absolute top-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full text-white"
          >
            <X size={20} />
          </button>

          <div className="relative h-[75dvh] w-full max-w-[1000px]">
            <Image
              src={images[selectedImage]}
              alt={`${product.name}, enlarged view`}
              fill
              sizes="100vw"
              className="object-contain p-6"
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  setSelectedImage(
                    (current) => (current - 1 + images.length) % images.length,
                  )
                }
                aria-label="Previous image"
                className="border-primary/20 text-primary absolute bottom-8 left-6 z-20 flex h-11 w-11 items-center justify-center border bg-white md:top-1/2 md:bottom-auto"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                onClick={() =>
                  setSelectedImage((current) => (current + 1) % images.length)
                }
                aria-label="Next image"
                className="border-primary/20 text-primary absolute right-6 bottom-8 z-20 flex h-11 w-11 items-center justify-center border bg-white md:top-1/2 md:bottom-auto"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

function ProductAccordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-primary/15 border-b">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-5 py-6 text-left"
      >
        <span className="text-primary text-xs font-semibold tracking-[0.13em] uppercase">
          {title}
        </span>

        <ChevronDown
          size={19}
          strokeWidth={1.4}
          className={`text-primary shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="text-text/70 pb-7 text-sm leading-[1.9]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuantitySelector({ quantity, setQuantity }) {
  return (
    <div
      className="border-primary/20 flex h-13.5 items-center border"
      aria-label="Quantity"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={quantity <= 1}
        onClick={() => setQuantity((current) => Math.max(1, current - 1))}
        className="text-primary flex h-full w-12 items-center justify-center disabled:opacity-30"
      >
        <Minus size={15} />
      </button>

      <output className="text-primary min-w-8 text-center text-sm font-semibold">
        {quantity}
      </output>

      <button
        type="button"
        aria-label="Increase quantity"
        disabled={quantity >= 10}
        onClick={() => setQuantity((current) => Math.min(10, current + 1))}
        className="text-primary flex h-full w-12 items-center justify-center disabled:opacity-30"
      >
        <Plus size={15} />
      </button>
    </div>
  );
}

export default function ProductDetails({
  product,
  details,
  reviews = [],
  pairings = [],
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [message, setMessage] = useState("");

  const purchaseRef = useRef(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const variants = Array.isArray(product.variants) ? product.variants : [];

  const variant = variants[selectedVariant] || null;

  const price = variant?.price ?? product.price;
  const compareAtPrice = variant?.compareAtPrice ?? product.compareAtPrice;

  const available =
    product.available && (variant ? variant.available !== false : true);

  const size = variant?.size ?? product.size;

  const approvedBenefits = (details.benefits || []).slice(0, 3);

  const verifiedReviews = reviews.filter(
    (review) =>
      review.verified === true &&
      review.permissionToDisplay === true &&
      review.productHandle === product.handle &&
      Number.isInteger(review.rating) &&
      review.rating >= 1 &&
      review.rating <= 5,
  );

  const rating =
    verifiedReviews.length > 0
      ? verifiedReviews.reduce((sum, review) => sum + review.rating, 0) /
        verifiedReviews.length
      : null;

  useEffect(() => {
    const node = purchaseRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(
          !entry.isIntersecting && entry.boundingClientRect.bottom < 0,
        );
      },
      { threshold: 0 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMessage("");
  }, [selectedVariant]);

  function handleAddToCart() {
    const success = addToCart(product, quantity, variant);

    setMessage(
      success
        ? `${quantity} item${quantity > 1 ? "s" : ""} added to your bag.`
        : "This product is currently unavailable.",
    );
  }

  return (
    <>
      {/* PRODUCT MAIN LAYOUT */}
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        {/* LEFT GALLERY */}
        <ProductGallery product={product} />

        {/* RIGHT PRODUCT INFORMATION */}
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          {/* CATEGORY */}
          <div className="mb-5 flex items-center justify-between gap-4">
            <span className="text-primary/60 text-[10px] font-semibold tracking-[0.23em] uppercase">
              NUOVÉ / {product.category}
            </span>

            {size && <span className="text-primary/60 text-xs">{size}</span>}
          </div>

          {/* TITLE */}
          <h1 className="font-heading text-primary text-[clamp(2.5rem,3vw,4rem)] leading-[0.95] tracking-[-0.03em]">
            {product.name}
          </h1>

          {/* POSITIONING */}
          <p className="text-text/65 text-md mt-5 max-w-122 leading-[1.9]">
            {details.positioning || product.description}
          </p>

          {/* VERIFIED REVIEW RATING */}
          {rating !== null && (
            <div className="mt-5 flex items-center gap-3">
              <span
                aria-label={`${rating.toFixed(1)} out of 5 stars`}
                className="text-primary text-sm tracking-[0.12em]"
              >
                {"★".repeat(Math.round(rating))}
                <span className="text-primary/20">
                  {"☆".repeat(5 - Math.round(rating))}
                </span>
              </span>

              <span className="text-text/60 text-xs">
                {rating.toFixed(1)} ({verifiedReviews.length} reviews)
              </span>
            </div>
          )}

          {/* PRICE */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <span className="font-heading text-primary text-4xl">
              {formatPrice(price)}
            </span>

            {typeof compareAtPrice === "number" && compareAtPrice > price && (
              <span className="text-text/40 text-sm line-through">
                {formatPrice(compareAtPrice)}
              </span>
            )}
          </div>

          {/* APPROVED BENEFITS */}
          {approvedBenefits.length > 0 && (
            <div className="border-primary/15 mt-8 border-t pt-7">
              <span className="text-primary mb-4 block text-[10px] font-semibold tracking-[0.18em] uppercase">
                Key Benefits
              </span>

              <ul className="space-y-3">
                {approvedBenefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="text-text/70 flex items-start gap-3 text-[13px] leading-[1.8]"
                  >
                    <Check
                      size={16}
                      strokeWidth={1.5}
                      className="text-primary mt-1 shrink-0"
                    />

                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* VARIANT SELECTOR */}
          {variants.length > 0 && (
            <fieldset className="border-primary/15 mt-8 border-t pt-7">
              <legend className="text-primary mb-4 text-[11px] font-semibold tracking-[0.15em] uppercase">
                Select Size / Variant
              </legend>

              <div className="flex flex-wrap gap-3">
                {variants.map((item, index) => {
                  const active = selectedVariant === index;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={active}
                      disabled={item.available === false}
                      onClick={() => {
                        setSelectedVariant(index);
                        setQuantity(1);
                      }}
                      className={`min-h-11 border px-5 py-3 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
                        active
                          ? "border-primary bg-primary text-white"
                          : "border-primary/20 text-primary hover:border-primary"
                      }`}
                    >
                      {item.label || item.size || item.name}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* AVAILABILITY */}
          <div className="mt-7 flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                available ? "bg-emerald-700" : "bg-neutral-400"
              }`}
            />

            <span className="text-text/70 text-xs">
              {available ? "In Stock" : "Currently Unavailable"}
            </span>
          </div>

          {/* PURCHASE CONTROLS */}
          <div ref={purchaseRef} className="mt-7 space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row">
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!available}
                className="group bg-primary flex min-h-[54px] flex-1 items-center justify-between gap-4 px-6 text-white transition-colors hover:bg-[#0A4263] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase">
                  {available ? "Add to Bag" : "Sold Out"}
                </span>

                <ShoppingBag
                  size={19}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                />
              </button>
            </div>

            <div aria-live="polite" className="min-h-5">
              {message && (
                <p className="text-primary text-xs">
                  {message}
                  {message.includes("added") && (
                    <>
                      {" "}
                      <Link
                        href="/cart"
                        className="font-semibold underline underline-offset-4"
                      >
                        View Bag
                      </Link>
                    </>
                  )}
                </p>
              )}
            </div>

            {/* SHOPIFY EXPRESS CHECKOUT PLACEHOLDER */}
            <p className="text-text/50 text-[11px] leading-relaxed">
              Secure checkout options will be available when Shopify purchasing
              is connected.
            </p>
          </div>

          {/* SHIPPING & RETURNS */}
          <div className="border-primary/15 mt-8 grid gap-4 border-y py-6 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Truck
                size={21}
                strokeWidth={1.3}
                className="text-primary shrink-0"
              />

              <div>
                <p className="text-primary text-xs font-semibold">
                  Shipping Information
                </p>

                {product.shippingPolicyHref ? (
                  <Link
                    href={product.shippingPolicyHref}
                    className="text-text/60 mt-1 inline-block text-xs underline underline-offset-4"
                  >
                    View shipping policy
                  </Link>
                ) : (
                  <p className="text-text/50 mt-1 text-xs">
                    Shipping details coming soon
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <RotateCcw
                size={21}
                strokeWidth={1.3}
                className="text-primary shrink-0"
              />

              <div>
                <p className="text-primary text-xs font-semibold">
                  Returns & Refunds
                </p>

                {product.returnPolicyHref ? (
                  <Link
                    href={product.returnPolicyHref}
                    className="text-text/60 mt-1 inline-block text-xs underline underline-offset-4"
                  >
                    View returns policy
                  </Link>
                ) : (
                  <p className="text-text/50 mt-1 text-xs">
                    Returns policy coming soon
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* PRODUCT INFORMATION ACCORDIONS */}
          <div className="border-primary/15 mt-8 border-t">
            <ProductAccordion title="Overview" defaultOpen>
              <p>{details.overview || product.description}</p>
            </ProductAccordion>

            <ProductAccordion title="Benefits">
              {approvedBenefits.length ? (
                <ul className="list-disc space-y-2 pl-5">
                  {approvedBenefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              ) : (
                <p>Approved benefit information will be added soon.</p>
              )}
            </ProductAccordion>

            <ProductAccordion title="Key Ingredients">
              {details.keyIngredients?.length ? (
                <ul className="space-y-4">
                  {details.keyIngredients.map((ingredient) => (
                    <li key={ingredient.name}>
                      <strong className="text-primary font-semibold">
                        {ingredient.name}
                      </strong>

                      {ingredient.role && (
                        <p className="mt-1">{ingredient.role}</p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Verified ingredient details coming soon.</p>
              )}
            </ProductAccordion>

            <ProductAccordion title="Full Ingredient List">
              {details.inci?.length ? (
                <p>{details.inci.join(", ")}</p>
              ) : (
                <p>
                  The complete INCI list will be published after verification
                  against the approved formulation.
                </p>
              )}
            </ProductAccordion>

            <ProductAccordion title="How to Use">
              <p>
                {details.howToUse ||
                  "Product-specific usage instructions will be added after approval."}
              </p>

              {details.frequency && (
                <p className="mt-3">
                  <strong className="text-primary">Frequency:</strong>{" "}
                  {details.frequency}
                </p>
              )}
            </ProductAccordion>

            <ProductAccordion title="Who It's For">
              <p>
                {details.whoItsFor ||
                  "Suitable skin types and concerns will be added after product review."}
              </p>
            </ProductAccordion>

            <ProductAccordion title="Routine Pairings">
              {pairings.length ? (
                <ul className="space-y-3">
                  {pairings.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/products/${item.handle}`}
                        className="text-primary inline-flex items-center gap-2 hover:underline"
                      >
                        <ArrowUpRight size={15} />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  Routine pairings will be added after compatibility review.
                </p>
              )}
            </ProductAccordion>

            <ProductAccordion title="FAQs">
              {details.faqs?.length ? (
                <div className="space-y-5">
                  {details.faqs.map((faq) => (
                    <div key={faq.question}>
                      <h4 className="text-primary font-sans text-sm font-semibold">
                        {faq.question}
                      </h4>

                      <p className="mt-2">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Product-specific FAQs are being prepared.</p>
              )}
            </ProductAccordion>

            <ProductAccordion title="Shipping & Returns">
              <div className="flex flex-wrap gap-5">
                {product.shippingPolicyHref && (
                  <Link
                    href={product.shippingPolicyHref}
                    className="underline underline-offset-4"
                  >
                    Shipping Policy
                  </Link>
                )}

                {product.returnPolicyHref && (
                  <Link
                    href={product.returnPolicyHref}
                    className="underline underline-offset-4"
                  >
                    Returns & Refunds
                  </Link>
                )}

                {!product.shippingPolicyHref && !product.returnPolicyHref && (
                  <p>
                    Published shipping and returns policies will be linked here.
                  </p>
                )}
              </div>
            </ProductAccordion>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY ADD TO BAG */}
      <div
        aria-hidden={!showStickyBar}
        className={`border-primary/10 fixed right-0 bottom-0 left-0 z-40 border-t bg-white/95 px-4 py-3 shadow-[0_-5px_25px_rgba(0,0,0,0.05)] backdrop-blur-lg transition-transform duration-300 lg:hidden ${
          showStickyBar
            ? "translate-y-0"
            : "pointer-events-none translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-primary truncate text-[11px] font-semibold">
              {product.name}
            </p>

            <p className="font-heading text-primary mt-1 text-xl">
              {formatPrice(price)}
            </p>
          </div>

          <button
            type="button"
            disabled={!available || !showStickyBar}
            onClick={handleAddToCart}
            tabIndex={showStickyBar ? 0 : -1}
            className="bg-primary flex min-h-12 items-center gap-2 px-5 text-[11px] font-semibold tracking-wider text-white uppercase disabled:opacity-40"
          >
            <ShoppingBag size={17} />
            {available ? "Add to Bag" : "Sold Out"}
          </button>
        </div>
      </div>
    </>
  );
}
