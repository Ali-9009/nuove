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
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({
    x: 50,
    y: 50,
  });

  const images = [product.image, ...(product.gallery || [])].filter(
    (src, index, array) => src && array.indexOf(src) === index,
  );

  if (!images.length) return null;

  function handleImageChange(index) {
    setSelectedImage(index);
    setIsZoomed(false);
    setZoomPosition({ x: 50, y: 50 });
  }

  function handleMouseMove(event) {
    if (!isZoomed) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  }

  return (
    <div className="flex min-w-0 flex-col gap-3 sm:grid sm:grid-cols-[85px_minmax(0,1fr)] sm:items-stretch sm:gap-4 lg:grid-cols-[95px_minmax(0,1fr)] lg:gap-5">
      {/* THUMBNAILS */}
      <div className="order-2 flex w-full min-w-0 [scrollbar-width:none] gap-2 overflow-x-auto overscroll-x-contain pb-2 sm:relative sm:order-1 sm:h-0 sm:min-h-full sm:w-auto sm:flex-col sm:overflow-x-hidden sm:overflow-y-auto sm:overscroll-y-contain sm:pr-1 sm:pb-0 [&::-webkit-scrollbar]:hidden">
        {images.map((src, index) => (
          <button
            key={`${product.handle}-${index}`}
            type="button"
            onClick={() => handleImageChange(index)}
            aria-label={`View ${product.name} image ${index + 1}`}
            aria-pressed={selectedImage === index}
            className={`relative aspect-[3/4] w-[65px] shrink-0 overflow-hidden rounded-xl bg-[#F8F8F7] transition-opacity duration-200 sm:w-full ${
              selectedImage === index
                ? "ring-primary opacity-100 ring-2 ring-inset"
                : "opacity-75 hover:opacity-100"
            }`}
          >
            <Image
              src={src}
              alt={`${product.name}, thumbnail ${index + 1}`}
              fill
              sizes="(max-width: 640px) 65px, (max-width: 1024px) 85px, 95px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* MAIN IMAGE */}
      <div className="order-1 min-w-0 sm:order-2">
        <button
          type="button"
          onClick={() => setIsZoomed((current) => !current)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setIsZoomed(false)}
          aria-label={
            isZoomed
              ? `Zoom out of ${product.name} image`
              : `Zoom into ${product.name} image`
          }
          aria-pressed={isZoomed}
          className={`group relative block aspect-4/5 w-full overflow-hidden rounded-2xl bg-[#F8F8F7] text-left sm:aspect-5/6 lg:aspect-4/5 ${
            isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          }`}
        >
          {/* MAIN PRODUCT IMAGE */}
          <Image
            key={images[selectedImage]}
            src={images[selectedImage]}
            alt={`${product.name}, product view ${selectedImage + 1}`}
            fill
            priority={selectedImage === 0}
            sizes="(max-width: 768px) 85vw, 55vw"
            style={{
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
              transform: isZoomed ? "scale(2)" : "scale(1)",
            }}
            className={`object-cover ${
              isZoomed
                ? "transition-transform duration-150"
                : "transition-transform duration-500"
            } motion-reduce:transition-none`}
          />
        </button>
      </div>
    </div>
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
      role="group"
      aria-label="Quantity"
      className="border-primary/15 flex h-[54px] w-full items-center justify-between rounded-full border bg-[#F5F8F8] px-1.5"
    >
      {/* MINUS */}
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={quantity <= 1}
        onClick={() => setQuantity((current) => Math.max(1, current - 1))}
        className="text-primary hover:bg-primary/5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Minus size={16} strokeWidth={1.7} />
      </button>

      {/* QUANTITY */}
      <output className="text-primary min-w-5 text-center font-sans text-[15px] font-semibold">
        {quantity}
      </output>

      {/* PLUS */}
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={quantity >= 10}
        onClick={() => setQuantity((current) => Math.min(10, current + 1))}
        className="text-primary hover:bg-primary/5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Plus size={16} strokeWidth={1.7} />
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
        {/* LEFT GALLERY — STICKY */}
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <ProductGallery product={product} />
        </div>

        {/* RIGHT PRODUCT INFORMATION */}
        <div className="min-w-0">
          {/* CATEGORY */}
          <div className="mb-5 flex items-center justify-between gap-4">
            <span className="text-primary/60 text-[10px] font-semibold tracking-[0.23em] uppercase">
              NUOVÉ / {product.category}
            </span>
          </div>

          {/* TITLE */}
          <h1 className="font-heading text-primary text-[clamp(2.5rem,3vw,4rem)] leading-[0.95] tracking-[-0.03em]">
            {product.name}
          </h1>

          {/* POSITIONING */}
          <p className="text-text/65 text-md mt-5 max-w-122 leading-[1.9]">
            {details.positioning || product.description}
          </p>

          {typeof product.rating === "number" && product.reviewCount > 0 && (
            <div className="mt-5 flex items-center gap-3">
              {/* STARS */}
              <span
                aria-label={`${product.rating.toFixed(1)} out of 5 stars`}
                className="text-primary text-[17px] tracking-[0.08em]"
              >
                {"★".repeat(Math.round(product.rating))}

                <span className="text-primary/20">
                  {"☆".repeat(5 - Math.round(product.rating))}
                </span>
              </span>

              {/* RATING + REVIEW COUNT */}
              <span className="text-primary/65 font-sans text-[14px]">
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
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
                      className={`min-h-8 rounded-full border px-5 py-2 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
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
            <div className="flex w-full items-stretch gap-2.5 sm:gap-3">
              {/* QUANTITY */}
              <div className="w-[105px] shrink-0 sm:w-[125px]">
                <QuantitySelector
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              </div>

              {/* ADD TO BAG */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!available}
                className="group bg-primary flex min-h-[54px] min-w-0 flex-1 items-center justify-between gap-2 rounded-full py-1.5 pr-1.5 pl-5 font-sans text-white transition-colors duration-300 hover:bg-[#0A4263] disabled:cursor-not-allowed disabled:opacity-40 sm:pl-6"
              >
                <span className="text-[12px] font-semibold sm:text-[14px]">
                  {available ? "Add to Bag" : "Sold Out"}
                </span>

                <span className="text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D8EDF3]">
                  <ShoppingBag
                    size={18}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5"
                  />
                </span>
              </button>
            </div>

            {/* FEEDBACK */}
            <div aria-live="polite" className="min-h-5">
              {message && (
                <p className="text-primary font-sans text-[13px]">
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

            {/* CHECKOUT NOTE */}
            <p className="text-primary/50 font-sans text-[12px] leading-[1.6]">
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

            {/* <ProductAccordion title="Key Ingredients">
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
            </ProductAccordion> */}

            {/* <ProductAccordion title="Full Ingredient List">
              {details.inci?.length ? (
                <p>{details.inci.join(", ")}</p>
              ) : (
                <p>
                  The complete INCI list will be published after verification
                  against the approved formulation.
                </p>
              )}
            </ProductAccordion> */}

            {/* <ProductAccordion title="How to Use">
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
            </ProductAccordion> */}

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

            {/* <ProductAccordion title="FAQs">
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
            </ProductAccordion> */}

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

      {/* PRODUCT OVERVIEW */}
      <section
        aria-labelledby="product-overview-heading"
        className="border-primary/10 mt-20 border-t pt-14 lg:mt-28 lg:pt-20"
      >
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <span className="font-sans text-[13px] font-medium text-[#6999AD]">
              GET TO KNOW YOUR SKINCARE
            </span>

            <h2
              id="product-overview-heading"
              className="font-heading text-primary mt-4 text-[clamp(2.8rem,4vw,4.5rem)] leading-[1]"
            >
              The Product
              <br />
              <span className="text-[#6999AD] italic">Overview.</span>
            </h2>
          </div>

          <div>
            <p className="text-primary/75 font-sans text-[17px] leading-[1.9]">
              {details.overview || product.description}
            </p>

            {approvedBenefits.length > 0 && (
              <div className="mt-9">
                <h3 className="text-primary font-sans text-[18px] font-semibold">
                  Key Benefits
                </h3>

                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {approvedBenefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="text-primary/70 flex items-start gap-3 font-sans text-[15px] leading-[1.7]"
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EAF5F7]">
                        <Check
                          size={16}
                          strokeWidth={1.7}
                          className="text-primary"
                        />
                      </span>

                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PRODUCT DETAILS */}
      <section
        aria-labelledby="product-details-heading"
        className="mt-20 lg:mt-28"
      >
        <div className="mb-9 text-center">
          <span className="font-sans text-[13px] font-medium text-[#6999AD]">
            THE DETAILS
          </span>

          <h2
            id="product-details-heading"
            className="font-heading text-primary mt-3 text-[clamp(2.8rem,4vw,4.5rem)] leading-[1]"
          >
            More About{" "}
            <span className="text-[#6999AD] italic">Your Ritual.</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {/* INGREDIENTS */}
          <article className="rounded-2xl bg-[#F0F7F8] p-7 sm:p-9">
            <h3 className="text-primary mt-5 font-sans text-[19px] font-semibold">
              Key Ingredients
            </h3>

            {details.keyIngredients?.length ? (
              <ul className="mt-5 space-y-4">
                {details.keyIngredients.map((ingredient) => (
                  <li key={ingredient.name}>
                    <span className="text-primary font-sans text-[15px] font-semibold">
                      {ingredient.name}
                    </span>

                    {ingredient.role && (
                      <p className="text-primary/65 mt-1 font-sans text-[14px] leading-[1.7]">
                        {ingredient.role}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-primary/65 mt-5 font-sans text-[15px] leading-[1.8]">
                Verified ingredient details coming soon.
              </p>
            )}
          </article>

          {/* HOW TO USE */}
          <article className="rounded-2xl bg-[#F6F4EF] p-7 sm:p-9">
            <h3 className="text-primary mt-5 font-sans text-[19px] font-semibold">
              How to Use
            </h3>

            <p className="text-primary/65 mt-5 font-sans text-[15px] leading-[1.8]">
              {details.howToUse ||
                "Product-specific usage instructions will be added after approval."}
            </p>

            {details.frequency && (
              <p className="text-primary/65 mt-4 font-sans text-[15px]">
                <strong className="text-primary">Frequency:</strong>{" "}
                {details.frequency}
              </p>
            )}
          </article>

          {/* WHO IT'S FOR */}
          <article className="rounded-2xl bg-[#EFF3F1] p-7 sm:p-9">
            <h3 className="text-primary mt-5 font-sans text-[19px] font-semibold">
              Who It's For
            </h3>

            <p className="text-primary/65 mt-5 font-sans text-[15px] leading-[1.8]">
              {details.whoItsFor ||
                "Suitable skin types and concerns will be added after product review."}
            </p>
          </article>
        </div>

        {/* FULL INGREDIENT LIST */}
        {details.inci?.length > 0 && (
          <details className="border-primary/10 mt-7 border-b py-5">
            <summary className="text-primary cursor-pointer font-sans text-[16px] font-semibold">
              View Full Ingredient List
            </summary>

            <p className="text-primary/65 mt-5 font-sans text-[15px] leading-[1.9]">
              {details.inci.join(", ")}
            </p>
          </details>
        )}
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section aria-labelledby="product-faq-heading" className="pt-12 md:pt-18">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* LEFT HEADING */}
          <div>
            <span className="font-sans text-[13px] font-medium text-[#6999AD]">
              NEED MORE INFORMATION?
            </span>

            <h2
              id="product-faq-heading"
              className="font-heading text-primary mt-4 text-[clamp(2.8rem,4vw,4.5rem)] leading-[1]"
            >
              Frequently Asked
              <br />
              <span className="text-[#6999AD] italic">Questions.</span>
            </h2>

            <p className="text-primary/65 mt-5 max-w-[350px] font-sans text-[16px] leading-[1.8]">
              Everything you need to know about this product.
            </p>
          </div>

          {/* RIGHT FAQ ACCORDIONS */}
          <div className="border-primary/15 border-t">
            {details.faqs?.length ? (
              details.faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  className="group border-primary/15 border-b"
                >
                  <summary className="text-primary flex cursor-pointer list-none items-center justify-between gap-5 py-6 font-sans text-[16px] font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span>

                    <span className="bg-primary/5 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[22px] font-light transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <div className="pb-6">
                    <p className="text-primary/65 max-w-[650px] font-sans text-[15px] leading-[1.85]">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))
            ) : (
              <p className="text-primary/60 py-7 font-sans text-[15px]">
                Product-specific FAQs are being prepared.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* MOBILE STICKY ADD TO BAG */}
      <div
        aria-hidden={!showStickyBar}
        className={`border-primary/10 fixed right-0 bottom-0 left-0 z-40 border-t bg-white/95 px-4 py-3 shadow-[0_-8px_35px_rgba(6,48,74,0.06)] backdrop-blur-xl transition-transform duration-300 lg:hidden ${
          showStickyBar
            ? "translate-y-0"
            : "pointer-events-none translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-xl items-center gap-3">
          {/* PRODUCT INFO */}
          <div className="min-w-0 flex-1">
            <p className="text-primary truncate font-sans text-[13px] font-medium">
              {product.name}
            </p>

            <p className="text-primary mt-1 font-sans text-[18px] font-semibold">
              {formatPrice(price)}
            </p>
          </div>

          {/* ADD TO BAG */}
          <button
            type="button"
            disabled={!available || !showStickyBar}
            onClick={handleAddToCart}
            tabIndex={showStickyBar ? 0 : -1}
            className="group bg-primary flex min-h-[54px] shrink-0 items-center gap-4 rounded-full py-1.5 pr-1.5 pl-5 font-sans text-[13px] font-semibold text-white transition-colors duration-300 hover:bg-[#0A4263] disabled:cursor-not-allowed disabled:opacity-40 sm:pl-6"
          >
            {available ? "Add to Bag" : "Sold Out"}

            <span className="text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D8EDF3]">
              <ShoppingBag
                size={18}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
