"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";

import {
  getCart,
  updateCartQuantity,
  removeFromCart,
} from "@/lib/cart";

import {
  getProductByHandle,
  formatPrice,
} from "@/data/products";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const refresh = () => setItems(getCart());

    refresh();
    setLoaded(true);

    window.addEventListener("nuove-cart-updated", refresh);

    return () =>
      window.removeEventListener("nuove-cart-updated", refresh);
  }, []);

  const cartItems = items
    .map((item) => {
      const product = getProductByHandle(item.handle);

      if (!product) return null;

      const variant = product.variants?.find(
        (variant) => String(variant.id) === String(item.variantId)
      );

      return {
        ...item,
        product,
        variant,
        price: variant?.price ?? product.price,
      };
    })
    .filter(Boolean);

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <Link
          href="/collections/all"
          className="mb-10 inline-flex items-center gap-2 text-xs text-primary"
        >
          <ArrowLeft size={17} />
          Continue Shopping
        </Link>

        <h1 className="font-heading text-[clamp(3.5rem,6vw,6rem)] leading-none text-primary">
          Your <span className="italic">Bag.</span>
        </h1>

        {!loaded ? (
          <p className="mt-10 text-sm text-text/60">
            Loading your bag...
          </p>
        ) : cartItems.length === 0 ? (
          <div className="mt-14 border-t border-primary/15 pt-14">
            <p className="font-heading text-3xl text-primary">
              Your bag is waiting.
            </p>

            <Link
              href="/collections/all"
              className="mt-7 inline-flex min-h-12 items-center bg-primary px-8 text-xs font-semibold uppercase tracking-wider text-white"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
            {/* ITEMS */}
            <div className="border-t border-primary/15">
              {cartItems.map((item) => (
                <article
                  key={item.key}
                  className="flex gap-5 border-b border-primary/15 py-7"
                >
                  <Link
                    href={`/products/${item.product.handle}`}
                    className="relative aspect-[3/4] w-24 shrink-0 bg-[#F7F6F3] sm:w-32"
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link
                      href={`/products/${item.product.handle}`}
                      className="font-heading text-2xl leading-tight text-primary sm:text-3xl"
                    >
                      {item.product.name}
                    </Link>

                    {item.variant && (
                      <p className="mt-2 text-xs text-text/50">
                        {item.variant.label || item.variant.size}
                      </p>
                    )}

                    <p className="mt-3 text-sm text-primary">
                      {formatPrice(item.price)}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-4 pt-5">
                      <div className="flex h-10 items-center border border-primary/15">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.product.name}`}
                          onClick={() =>
                            updateCartQuantity(
                              item.key,
                              item.quantity - 1
                            )
                          }
                          className="flex h-10 w-10 items-center justify-center"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="min-w-7 text-center text-xs">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.product.name}`}
                          disabled={item.quantity >= 10}
                          onClick={() =>
                            updateCartQuantity(
                              item.key,
                              Math.min(10, item.quantity + 1)
                            )
                          }
                          className="flex h-10 w-10 items-center justify-center disabled:opacity-30"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.key)}
                        aria-label={`Remove ${item.product.name}`}
                        className="flex h-10 w-10 items-center justify-center text-primary/60 hover:text-primary"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* SUMMARY */}
            <aside className="bg-[#F8F7F4] p-7 sm:p-9">
              <h2 className="font-heading text-3xl text-primary">
                Order Summary
              </h2>

              <div className="mt-8 flex items-center justify-between border-b border-primary/15 pb-6 text-sm">
                <span>Subtotal</span>

                <span className="font-semibold text-primary">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <p className="mt-5 text-xs leading-[1.8] text-text/60">
                Shipping and taxes will be calculated during
                checkout once Shopify is connected.
              </p>

              <button
                type="button"
                disabled
                className="mt-8 flex min-h-13 w-full cursor-not-allowed items-center justify-center bg-primary px-5 text-[11px] font-semibold uppercase tracking-wider text-white opacity-50"
              >
                Checkout Coming Soon
              </button>

              <p className="mt-4 text-xs leading-relaxed text-text/50">
                Your bag is saved locally in this browser.
                Orders cannot be placed yet.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}