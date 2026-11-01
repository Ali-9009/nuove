"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, X } from "lucide-react";

export default function AnnouncementPill() {
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const wasDismissed =
      sessionStorage.getItem("nuove-announcement-dismissed") === "true";

    setDismissed(wasDismissed);

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 80) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY + 3) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY - 3) {
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleDismiss() {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem("nuove-announcement-dismissed", "true");
  }

  if (dismissed) return null;

  return (
    <aside
      aria-label="NUOVÉ announcement"
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-x-0 top-[95px] z-50 flex justify-center px-4 transition-all duration-500 ease-out sm:top-[110px] ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
    >
      <div
        className={`flex max-w-full items-center gap-2 rounded-full border border-white/80 bg-white/90 p-1.5 pl-4 shadow-[0_12px_45px_rgba(6,48,74,0.12)] backdrop-blur-xl sm:gap-3 sm:pl-5 ${
          visible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <Sparkles
          size={16}
          strokeWidth={1.5}
          className="shrink-0 text-[#6999AD]"
        />

        <Link
          href="/collections/all"
          tabIndex={visible ? 0 : -1}
          className="group flex min-w-0 items-center gap-3"
        >
          <span className="text-primary truncate font-sans text-[12px] font-medium sm:text-[14px]">
            Discover Your NUOVÉ Routine
          </span>

          <span className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </span>
        </Link>

        <span className="bg-primary/10 h-5 w-px shrink-0" />

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          tabIndex={visible ? 0 : -1}
          className="text-primary/50 hover:bg-primary/5 hover:text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors"
        >
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>
    </aside>
  );
}
