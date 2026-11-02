"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartLine, CartSummary, ComplementaryItem, EmptyCart } from "./CartUI";
export default function CartDrawer() {
  const { isOpen, closeDrawer, items, count } = useCart();
  const closeRef = useRef(null);
  const lastFocus = useRef(null);
  useEffect(() => {
    if (!isOpen) return;
    lastFocus.current = document.activeElement;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKey(e) {
      if (e.key === "Escape") closeDrawer();
      if (e.key !== "Tab") return;
      const root = document.getElementById("nuove-cart-dialog");
      const els = [
        ...(root?.querySelectorAll(
          "a[href],button:not([disabled]),input:not([disabled])",
        ) || []),
      ];
      if (!els.length) return;
      if (e.shiftKey && document.activeElement === els[0]) {
        e.preventDefault();
        els.at(-1).focus();
      } else if (!e.shiftKey && document.activeElement === els.at(-1)) {
        e.preventDefault();
        els[0].focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      lastFocus.current?.focus?.();
    };
  }, [isOpen, closeDrawer]);
  return (
    <div
      className={`fixed inset-0 z-[200] transition-[visibility] duration-500 ${isOpen ? "visible" : "pointer-events-none invisible delay-500"}`}
    >
      <button
        type="button"
        aria-label="Close shopping bag"
        onClick={closeDrawer}
        tabIndex={isOpen ? 0 : -1}
        className={`absolute inset-0 w-full bg-[#061F30]/40 backdrop-blur-[3px] transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        id="nuove-cart-dialog"
        role="dialog"
        aria-modal={isOpen ? "true" : undefined}
        aria-label="Shopping bag"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`absolute inset-y-0 right-0 flex w-full max-w-[480px] flex-col bg-[#FCFDFC] shadow-[-20px_0_70px_rgba(6,48,74,0.15)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="border-primary/10 flex shrink-0 items-center justify-between border-b px-5 py-5 sm:px-7">
          <div>
            <h2 className="text-primary mt-1 font-sans text-[32px] leading-none">
              Your Bag
            </h2>
          </div>
          <button
            ref={closeRef}
            onClick={closeDrawer}
            type="button"
            aria-label="Close cart"
            className="text-primary flex h-11 w-11 items-center justify-center rounded-full bg-[#E9F3F5] hover:bg-[#DCEEF2]"
          >
            <X size={20} />
          </button>
        </header>
        {items.length ? (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 sm:px-7">
              {items.map((item) => (
                <CartLine key={item.key} item={item} />
              ))}
              <ComplementaryItem />
            </div>
            <footer className="border-primary/10 shrink-0 border-t bg-white px-5 py-5 sm:px-7">
              <CartSummary />
            </footer>
          </>
        ) : (
          <EmptyCart onClose={closeDrawer} />
        )}
      </aside>
    </div>
  );
}
