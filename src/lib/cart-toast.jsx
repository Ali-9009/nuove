"use client";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowUpRight, Check, X } from "lucide-react";

const money = (amount) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    amount || 0,
  );
export function cartAddedToast({
  name,
  image,
  price,
  quantity = 1,
  variant = "",
}) {
  toast.custom(
    (t) => (
      <div
        className={`w-[min(94vw,370px)] rounded-[18px] border border-[#DCE8E9] bg-white p-3 shadow-[0_20px_65px_rgba(6,48,74,0.18)] transition-all duration-300 ${t.visible ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}
      >
        <div className="flex items-start gap-3">
          <div className="relative h-22 w-15 shrink-0 overflow-hidden rounded-xl border border-gray-200">
            {image ? (
              <Image
                src={image}
                alt=""
                fill
                sizes="60px"
                className="object-contain"
              />
            ) : null}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 font-sans text-[10px] font-semibold tracking-[0.13em] text-emerald-700 uppercase">
              <Check size={13} /> Added to bag
            </div>
            <p className="text-primary mt-1 truncate font-sans text-[13px] font-semibold">
              {name}
            </p>
            <p className="text-primary/50 mt-1 font-sans text-[11px]">
              Qty: {quantity}
              {variant ? ` · ${variant}` : ""}
            </p>
            <p className="text-primary mt-1 font-sans text-[14px] font-semibold">
              {money(price * quantity)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => toast.dismiss(t.id)}
            aria-label="Dismiss notification"
            className="text-primary/45 hover:bg-primary/5 hover:text-primary flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
          >
            <X size={15} />
          </button>
        </div>
        <div className="border-primary/10 mt-3 border-t pt-3">
          <Link
            href="/cart"
            onClick={() => toast.dismiss(t.id)}
            className="bg-primary flex min-h-11 items-center justify-center gap-2 rounded-full px-5 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-[#0A4968]"
          >
            View bag <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    ),
    { duration: 3600, position: "top-right" },
  );
}
export function cartErrorToast(
  message = "Could not add this product to your bag.",
) {
  toast.error(message);
}
