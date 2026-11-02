"use client";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
export default function CartButton({ onMouseEnter, className = "" }) {
  const { count, openDrawer } = useCart();
  return (
    <button
      type="button"
      onMouseEnter={onMouseEnter}
      onClick={openDrawer}
      aria-label={`Open shopping bag with ${count} items`}
      className={`text-primary relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/70 ${className}`}
    >
      <ShoppingBag size={20} strokeWidth={1.5} />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="bg-primary absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-0.5 font-sans text-[9px] font-bold text-white"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
