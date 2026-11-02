"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ArrowUpRight,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

const FREE_SHIPPING_THRESHOLD = 175; // Display-only; no shipping engine connected.
const money = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    Number(value) || 0,
  );
export function FreeShippingProgress({ subtotal }) {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  return (
    <div className="rounded-2xl bg-[#EDF6F8] px-5 py-4">
      <div className="text-primary flex items-center gap-2 font-sans text-[12px] font-medium">
        <Truck size={18} strokeWidth={1.5} />
        {remaining > 0
          ? `Add ${money(remaining)} more to reach the free-shipping threshold`
          : "You reached the advertised free-shipping threshold!"}
      </div>
      <div
        role="progressbar"
        aria-label="Free shipping threshold progress"
        aria-valuenow={Math.min(subtotal, FREE_SHIPPING_THRESHOLD)}
        aria-valuemin={0}
        aria-valuemax={FREE_SHIPPING_THRESHOLD}
        className="bg-primary/10 mt-3 h-1.5 overflow-hidden rounded-full"
      >
        <div
          className="bg-primary h-full rounded-full transition-[width] duration-500"
          style={{
            width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
          }}
        />
      </div>
      <p className="text-primary/50 mt-2 font-sans text-[11px] leading-relaxed">
        Actual shipping eligibility and rates are confirmed at checkout.
      </p>
    </div>
  );
}
export function CartLine({ item }) {
  const { updateQuantity, removeItem } = useCart();
  const product = products.find((p) => p.handle === item.handle);
  const image =
    item.cartType === "bundle" ? item.image : product?.image || item.image;
  const href =
    item.cartType === "bundle"
      ? `/bundles/${item.handle}`
      : `/products/${item.handle}`;
  return (
    <article className="border-primary/10 grid grid-cols-[88px_minmax(0,1fr)] gap-4 border-b py-5 sm:grid-cols-[110px_minmax(0,1fr)]">
      <Link
        href={href}
        className="relative aspect-4/5 overflow-hidden rounded-xl border border-gray-200"
      >
        {image ? (
          <Image
            src={image}
            alt={item.name}
            fill
            sizes="110px"
            className="object-contain"
          />
        ) : null}
      </Link>
      <div className="flex min-w-0 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={href}
            className="text-primary font-sans text-[13px] leading-snug font-semibold hover:underline sm:text-[15px]"
          >
            {item.name}
          </Link>
          <button
            aria-label={`Remove ${item.name}`}
            type="button"
            onClick={() => removeItem(item.key)}
            className="text-primary/40 hover:bg-primary/5 hover:text-primary rounded-full p-1.5"
          >
            <Trash2 size={17} />
          </button>
        </div>
        {item.cartType === "bundle" && (
          <span className="font-sans text-[10px] font-semibold tracking-[0.12em] text-[#6999AD] uppercase">
            Curated bundle
          </span>
        )}
        {item.cartType === "bundle" &&
          Array.isArray(item.includedProducts) &&
          item.includedProducts.length > 0 && (
            <div className="rounded-xl bg-[#F2F7F8] px-3 py-2">
              <p className="text-primary mb-1 font-sans text-[11px] font-semibold">
                Includes
              </p>
              <ul className="text-primary/65 space-y-0.5 font-sans text-[11px] leading-relaxed">
                {item.includedProducts.map((included) => (
                  <li key={included.handle}>• {included.name}</li>
                ))}
              </ul>
            </div>
          )}
        {item.variantLabel && (
          <span className="text-primary/55 font-sans text-[12px]">
            {item.variantLabel}
          </span>
        )}
        <span className="text-primary font-sans text-[13px] font-semibold">
          {money(item.price * item.quantity)}
        </span>
        <div className="border-primary/15 mt-auto flex w-[117px] items-center justify-between rounded-full border bg-white px-1 py-1">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => updateQuantity(item.key, item.quantity - 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-[#E8F2F5]"
          >
            <Minus size={14} />
          </button>
          <span className="text-primary font-sans text-[13px]">
            {item.quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={item.quantity >= 10}
            onClick={() => updateQuantity(item.key, item.quantity + 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-[#E8F2F5] disabled:opacity-30"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
export function ComplementaryItem() {
  const { items, addItem } = useCart();
  const candidate = products.find(
    (product) =>
      product.available !== false &&
      product.price != null &&
      product.handle &&
      !items.some((item) => item.handle === product.handle),
  );
  if (!candidate) return null;
  return (
    <aside className="border-primary/10 my-6 rounded-2xl border bg-[#F7FAFA] p-4">
      <p className="mb-3 font-sans text-[11px] font-semibold tracking-[0.14em] text-[#6999AD] uppercase">
        Complete your ritual
      </p>
      <div className="flex items-center gap-3">
        <Link
          href={`/products/${candidate.handle}`}
          className="relative h-17 w-15 shrink-0 overflow-hidden rounded-xl bg-white"
        >
          {candidate.image && (
            <Image
              src={candidate.image}
              alt=""
              fill
              sizes="60px"
              className="object-contain"
            />
          )}
        </Link>
        <div className="min-w-0 flex-1">
          <Link
            href={`/products/${candidate.handle}`}
            className="text-primary line-clamp-2 font-sans text-[12px] font-semibold"
          >
            {candidate.name}
          </Link>
          <p className="text-primary/60 mt-1 font-sans text-[12px]">
            {money(candidate.price)}
          </p>
        </div>
        <button
          type="button"
          aria-label={`Add ${candidate.name} to bag`}
          onClick={() =>
            addItem(
              candidate,
              1,
              candidate.variants?.find((v) => v.available !== false) || null,
            )
          }
          className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-[#0A4968]"
        >
          <Plus size={18} />
        </button>
      </div>
    </aside>
  );
}
export function CartSummary({ showCheckout = true }) {
  const { subtotal, count } = useCart();
  return (
    <div className="space-y-4">
      <FreeShippingProgress subtotal={subtotal} />
      <div className="text-primary flex items-center justify-between font-sans text-[15px] font-semibold">
        <span>Subtotal ({count} items)</span>
        <span>{money(subtotal)}</span>
      </div>
      {showCheckout && (
        <button
          type="button"
          disabled
          className="bg-primary/45 flex min-h-[54px] w-full cursor-not-allowed items-center justify-center gap-2 rounded-full px-5 font-sans text-[14px] font-semibold text-white"
          title="Checkout requires a payment and order backend"
        >
          Checkout unavailable in preview <ArrowUpRight size={17} />
        </button>
      )}
    </div>
  );
}
export function EmptyCart({ onClose }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
      <span className="text-primary flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF4F6]">
        <ShoppingBag size={31} strokeWidth={1.3} />
      </span>
      <h2 className="font-heading text-primary mt-6 text-[38px]">
        Your bag is waiting.
      </h2>
      <p className="text-primary/60 mt-3 max-w-[280px] font-sans text-[14px] leading-relaxed">
        Explore considered skincare and build your NUOVÉ ritual.
      </p>
      <Link
        onClick={onClose}
        href="/collections/all"
        className="bg-primary mt-7 rounded-full px-7 py-4 font-sans text-[13px] font-semibold text-white"
      >
        Explore the collection
      </Link>
    </div>
  );
}
