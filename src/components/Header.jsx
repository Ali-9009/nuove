"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  UserRound,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import Image from "next/image";

const navLinks = [
  { name: "Shop All", href: "/collections/all" },
  { name: "Skincare", href: "/collections/skincare" },
  { name: "Our Story", href: "/pages/our-story" },
  { name: "Contact", href: "/pages/contact" },
];

export default function Header() {
  const pathname = usePathname();

  const headerRef = useRef(null);
  const announcementRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Smooth announcement bar collapse
  // Smooth announcement bar + compact sticky header
  useEffect(() => {
    const announcement = announcementRef.current;

    if (!announcement) return;

    let lastScrolled = null;

    const updateHeader = () => {
      const scrolled = window.scrollY > 40;

      // Only animate when scroll state actually changes
      if (lastScrolled === scrolled) return;

      lastScrolled = scrolled;
      setIsScrolled(scrolled);

      gsap.to(announcement, {
        height: scrolled ? 0 : "auto",
        opacity: scrolled ? 0 : 1,
        duration: scrolled ? 0.2 : 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateHeader);
      gsap.killTweensOf(announcement);
    };
  }, []);

  // Smooth mobile menu animation
  useEffect(() => {
    const menu = mobileMenuRef.current;

    if (!menu) return;

    gsap.to(menu, {
      height: mobileOpen ? "auto" : 0,
      opacity: mobileOpen ? 1 : 0,
      duration: 0.4,
      ease: "power3.inOut",
      overwrite: "auto",
    });
  }, [mobileOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 z-50 w-full bg-white transition-shadow duration-300 ${
        isScrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.06)]" : ""
      }`}
    >
      {/* ================= ANNOUNCEMENT BAR ================= */}
      <div
        ref={announcementRef}
        className="bg-primary overflow-hidden text-white"
      >
        <div className="flex min-h-9 items-center justify-center px-4 py-2 text-center">
          <p className="text-[10px] font-medium tracking-[0.14em] sm:text-[11px]">
            COMPLIMENTARY SHIPPING ON ORDERS OVER $100
            <span className="mx-2 opacity-50">|</span>
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-1 underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              SHOP NOW
              <ArrowRight size={11} strokeWidth={1.5} />
            </Link>
          </p>
        </div>
      </div>

      {/* ================= MAIN HEADER ================= */}
      <div className="relative border-b border-black/5">
        <div
          className={`mx-auto grid max-w-360 grid-cols-[1fr_auto_1fr] items-center px-5 transition-[height] duration-300 ease-out sm:px-8 lg:px-12 ${
            isScrolled ? "h-[60px] lg:h-[68px]" : "h-[72px] lg:h-[88px]"
          }`}
        >
          {/* LEFT DESKTOP LINKS */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-5 lg:flex xl:gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`hover:text-primary relative text-[11px] font-semibold tracking-[0.09em] whitespace-nowrap uppercase transition-colors duration-300 ${
                  pathname === link.href ? "text-primary" : "text-text"
                }`}
              >
                {link.name}

                <span className="bg-primary absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(!mobileOpen);
                setSearchOpen(false);
              }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              className="text-text flex h-10 w-10 items-center justify-start"
            >
              {mobileOpen ? (
                <X size={23} strokeWidth={1.4} />
              ) : (
                <Menu size={23} strokeWidth={1.4} />
              )}
            </button>
          </div>

          {/* CENTER LOGO */}
          <Link
            href="/"
            aria-label="NUOVÉ homepage"
            className="flex items-center justify-center"
          >
            <Image
              src="/assets/nuove-logo.png"
              alt="NUOVÉ"
              width={180}
              height={70}
              priority
              className={`h-auto w-auto object-contain transition-[height] duration-300 ease-out ${
                isScrolled
                  ? "h-[30px]! sm:h-[35px]! lg:h-[40px]!"
                  : "h-[40px]! sm:h-[45px]! lg:h-[50px]!"
              }`}
            />
          </Link>

          {/* RIGHT ICONS */}
          <div className="flex items-center justify-end gap-3 sm:gap-5 lg:gap-6">
            <button
              type="button"
              aria-label="Search"
              aria-expanded={searchOpen}
              aria-controls="header-search"
              onClick={() => {
                setSearchOpen(!searchOpen);
                setMobileOpen(false);
              }}
              className="hover:text-primary flex h-9 w-9 items-center justify-center transition-all duration-300"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            <Link
              href="/account"
              aria-label="My account"
              className="hover:text-primary hidden h-9 w-9 items-center justify-center transition-all duration-300 sm:flex"
            >
              <UserRound size={20} strokeWidth={1.5} />
            </Link>

            <Link
              href="/cart"
              aria-label="Shopping cart"
              className="hover:text-primary relative flex h-9 w-9 items-center justify-center transition-all duration-300"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />

              <span className="bg-primary absolute -top-1 -right-1 flex h-[16px] w-[16px] items-center justify-center rounded-full text-[9px] font-medium text-white">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ================= SEARCH PANEL ================= */}
      <div
        id="header-search"
        className={`overflow-hidden bg-white transition-all duration-300 ${
          searchOpen
            ? "max-h-32 border-b border-black/10 opacity-100"
            : "max-h-0 opacity-0"
        }`}
        aria-hidden={!searchOpen}
      >
        <form
          action="/search"
          method="GET"
          role="search"
          className="mx-auto flex max-w-[900px] items-center gap-4 px-6 py-6"
        >
          <Search size={21} strokeWidth={1.4} />

          <input
            type="search"
            name="q"
            placeholder="Search for products..."
            aria-label="Search products"
            tabIndex={searchOpen ? 0 : -1}
            className="text-text w-full border-none bg-transparent text-sm outline-none placeholder:text-neutral-400"
          />

          <button
            type="submit"
            tabIndex={searchOpen ? 0 : -1}
            className="text-primary text-xs font-semibold tracking-wider uppercase"
          >
            Search
          </button>

          <button
            type="button"
            tabIndex={searchOpen ? 0 : -1}
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
          >
            <X size={20} strokeWidth={1.4} />
          </button>
        </form>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        ref={mobileMenuRef}
        id="mobile-navigation"
        aria-hidden={!mobileOpen}
        className="h-0 overflow-hidden bg-white opacity-0 lg:hidden"
      >
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col px-6 pt-5 pb-8 sm:px-8"
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              tabIndex={mobileOpen ? 0 : -1}
              onClick={() => setMobileOpen(false)}
              className="font-heading text-text hover:text-primary flex items-center justify-between border-b border-black/10 py-5 text-[27px] transition-colors"
            >
              {link.name}

              <ArrowRight
                size={18}
                strokeWidth={1.3}
                className="text-primary"
              />
            </Link>
          ))}

          {/* MOBILE ACCOUNT */}
          <Link
            href="/account"
            tabIndex={mobileOpen ? 0 : -1}
            onClick={() => setMobileOpen(false)}
            className="text-primary mt-7 flex items-center gap-3 text-xs font-semibold tracking-[0.12em] uppercase"
          >
            <UserRound size={19} strokeWidth={1.5} />
            My Account
          </Link>

          <p className="mt-10 text-[10px] tracking-[0.18em] text-neutral-400 uppercase">
            NUOVE — A NEW STANDARD OF BEAUTY
          </p>
        </nav>
      </div>
    </header>
  );
}
