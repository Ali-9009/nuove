"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Search,
  ShoppingBag,
  UserRound,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

import { getProductByHandle, formatPrice } from "@/data/products";
import h from "./Header.module.css";

/* ==========================================
   NAVIGATION DATA
========================================== */

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/collections/all",
    megaMenu: true,
  },
  {
    name: "Skincare",
    href: "/collections/skincare",
    megaMenu: true,
  },
  {
    name: "Our Story",
    href: "/pages/our-story",
  },
  {
    name: "Contact",
    href: "/pages/contact",
  },
];

/* ==========================================
   MEGA MENU DATA
========================================== */

const megaMenus = {
  Shop: {
    heading: "Discover NUOVÉ",
    description: "Thoughtful skincare for every ritual.",

    columns: [
      {
        heading: "Shop",
        links: [
          { name: "Shop All", href: "/collections/all" },
          { name: "Bestsellers", href: "/collections/bestsellers" },
          { name: "New Arrivals", href: "/collections/new" },
          { name: "Routines & Sets", href: "/collections/routines" },
        ],
      },
      {
        heading: "Skin Concerns",
        links: [
          { name: "Hydrate & Restore", href: "/collections/hydration" },
          { name: "Firm & Smooth", href: "/collections/firmness" },
          { name: "Brighten & Revitalize", href: "/collections/radiance" },
          { name: "Calm & Balance", href: "/collections/barrier" },
        ],
      },
      {
        heading: "Explore",
        links: [
          { name: "Our Philosophy", href: "/pages/our-story" },
          { name: "Ingredient Library", href: "/pages/ingredients" },
          { name: "Discovery & Travel", href: "/collections/discovery" },
        ],
      },
    ],

    products: ["barrier-peptide-serum", "multi-peptide-firming-cream"],
  },

  Skincare: {
    heading: "The Skincare Edit",
    description: "Discover your daily essentials.",

    columns: [
      {
        heading: "Categories",
        links: [
          { name: "Cleansers", href: "/collections/cleansers" },
          { name: "Serums", href: "/collections/serums" },
          { name: "Moisturizers", href: "/collections/moisturizers" },
          { name: "Eye Care", href: "/collections/eye-care" },
        ],
      },
      {
        heading: "Ingredients",
        links: [
          { name: "Peptides", href: "/collections/peptides" },
          { name: "Ceramides", href: "/collections/ceramides" },
          { name: "Vitamin C", href: "/collections/vitamin-c" },
          { name: "Retinol", href: "/collections/retinol" },
        ],
      },
      {
        heading: "Routines",
        links: [
          { name: "Morning Routine", href: "/collections/morning" },
          { name: "Evening Routine", href: "/collections/evening" },
          { name: "Shop All Skincare", href: "/collections/skincare" },
        ],
      },
    ],

    products: [
      "pure-ceramide-barrier-cream",
      "vitamin-c-peptide-brightening-serum",
    ],
  },
};

/* ==========================================
   MEGA MENU PRODUCT
========================================== */

function MegaProduct({ handle, onNavigate }) {
  const product = getProductByHandle(handle);

  if (!product) return null;

  // SECOND IMAGE FROM YOUR PRODUCT GALLERY
  const secondImage = product.gallery?.[1];

  const image =
    typeof secondImage === "string"
      ? secondImage
      : secondImage?.src || secondImage?.url || null;

  return (
    <Link
      href={`/products/${product.handle}`}
      onClick={onNavigate}
      className="group/product block min-w-0"
    >
      <div className="relative aspect-4/3 overflow-hidden rounded-[18px] bg-[linear-gradient(145deg,#E9F4F7_0%,#F8FAF9_50%,#EEE7DF_100%)]">
        {image && (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 160px, 260px"
            className="object-cover transition-transform duration-700 group-hover/product:scale-105"
          />
        )}

        <span className="text-primary group-hover/product:bg-primary absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition-all duration-300 group-hover/product:rotate-45 group-hover/product:text-white">
          <ArrowUpRight size={18} strokeWidth={1.5} />
        </span>
      </div>

      <h3 className="text-primary mt-3 font-sans text-[15px] leading-[1.4] font-semibold">
        {product.name}
      </h3>

      {product.price != null && (
        <p className="text-primary/60 mt-1 font-sans text-[14px]">
          {formatPrice(product.price)}
        </p>
      )}
    </Link>
  );
}

/* ==========================================
   FLOATING MEGA MENU
========================================== */

function MegaMenu({ menu, onClose }) {
  if (!menu) return null;

  return (
    <div className="w-full overflow-hidden rounded-[26px] border border-white/80 bg-[#FAFAF8]/95 shadow-[0_25px_80px_rgba(6,48,74,0.14)] backdrop-blur-2xl">
      <div className="grid grid-cols-[1.2fr_0.8fr] gap-8 p-8 xl:gap-12 xl:p-10">
        {/* LEFT */}
        <div>
          <div className="mb-8">
            <h2 className="font-heading text-primary text-[38px] leading-none">
              {menu.heading}
            </h2>

            <p className="text-primary/60 mt-3 font-sans text-[15px]">
              {menu.description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {menu.columns.map((column) => (
              <div key={column.heading}>
                <h3 className="text-primary font-sans text-[15px] font-semibold">
                  {column.heading}
                </h3>

                <ul className="mt-5 space-y-3.5">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="text-primary/65 hover:text-primary font-sans text-[14px] leading-normal transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="border-primary/10 border-l pl-8">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-primary font-sans text-[15px] font-semibold">
              Featured Products
            </span>

            <Link
              href="/collections/all"
              onClick={onClose}
              className="text-primary/60 hover:text-primary flex items-center gap-1 font-sans text-[14px]"
            >
              View All
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {menu.products.map((handle) => (
              <MegaProduct key={handle} handle={handle} onNavigate={onClose} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   MAIN HEADER
========================================== */

export default function Header() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const closeMega = () => setActiveMega(null);

  /* SCROLL */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 70);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* CLOSE ON ROUTE CHANGE */
  useEffect(() => {
    setActiveMega(null);
    setMobileOpen(false);
    setMobileSubmenu(null);
    setSearchOpen(false);
  }, [pathname]);

  /* MOBILE SCROLL LOCK */
  useEffect(() => {
    if (!mobileOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  /* ESCAPE */
  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setActiveMega(null);
        setSearchOpen(false);
      }
    };

    document.addEventListener("keydown", onEscape);

    return () => document.removeEventListener("keydown", onEscape);
  }, []);

  return (
    <>
      {/* FIXED HEADER / FLOATING TUBE */}
      <header
        onMouseLeave={closeMega}
        className={`${h.header} pointer-events-none fixed inset-x-0 top-0 z-50 font-sans`}
        data-scrolled={scrolled}
      >
        {/* HEADER CONTAINER */}
        <div
          className={`${h.container} pointer-events-auto relative mx-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled
              ? "mt-3 w-[calc(100%-24px)] max-w-7xl rounded-full border border-white/70 bg-white/75 shadow-[0_12px_45px_rgba(6,48,74,0.12)] backdrop-blur-2xl sm:mt-4"
              : "mx-auto mt-0 max-w-360 rounded-none border border-transparent"
          }`}
        >
          <div
            className={`${h.row} mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-2 transition-all duration-500 sm:gap-4 lg:grid-cols-[1fr_2fr_1fr] ${
              scrolled
                ? "h-15 px-4 md:px-6 lg:h-16"
                : "h-17 px-4 md:px-6 lg:h-20"
            }`}
          >
            {/* LOGO — DESKTOP */}
            <Link
              href="/"
              aria-label="NUOVÉ homepage"
              onMouseEnter={closeMega}
              className="hidden w-fit items-center lg:flex"
            >
              <Image
                src="/assets/nuove-logo.png"
                alt="NUOVÉ"
                width={165}
                height={60}
                priority
                className={`w-auto object-contain transition-[height] duration-500 ${
                  scrolled ? "h-8" : "h-10"
                }`}
              />
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
              aria-controls="mobile-sidebar"
              onClick={() => {
                setMobileOpen(true);
                setSearchOpen(false);
                setActiveMega(null);
              }}
              className="text-primary flex h-10 w-10 items-center justify-center lg:hidden"
            >
              <Menu size={23} strokeWidth={1.5} />
            </button>

            {/* MOBILE LOGO */}
            <Link
              href="/"
              aria-label="NUOVÉ homepage"
              className="flex items-center justify-center lg:hidden"
            >
              <Image
                src="/assets/nuove-logo.png"
                alt="NUOVÉ"
                width={145}
                height={50}
                priority
                className={`w-auto object-contain transition-[height] duration-500 ${
                  scrolled ? "h-7.5" : "h-9"
                }`}
              />
            </Link>

            {/* CENTER NAV PILL */}
            <nav
              aria-label="Main navigation"
              className="hidden h-full items-center justify-center lg:flex"
            >
              <div className={h.navRail}>
                {navLinks.map((link) => {
                  const isOpen = activeMega === link.name;
                  const isActive = pathname === link.href;

                  return (
                    <div
                      key={link.name}
                      onMouseEnter={() => {
                        setActiveMega(link.megaMenu ? link.name : null);
                        setSearchOpen(false);
                      }}
                    >
                      {link.megaMenu ? (
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls="header-mega-menu"
                          onClick={(event) =>
                            setActiveMega(event.detail === 0 && isOpen ? null : link.name)
                          }
                          className={`flex min-h-9 items-center gap-1.5 rounded-full px-4 font-sans text-[14px] font-medium transition-all duration-300 ${
                            isOpen
                              ? "bg-primary text-white"
                              : "text-primary/75 hover:text-primary hover:bg-white"
                          }`}
                        >
                          {link.name}

                          <ChevronDown
                            size={14}
                            strokeWidth={1.5}
                            className={`transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          className={`flex min-h-9 items-center rounded-full px-4 font-sans text-[14px] font-medium transition-all duration-300 ${
                            isActive
                              ? "bg-primary text-white"
                              : "text-primary/75 hover:text-primary hover:bg-white"
                          }`}
                        >
                          {link.name}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </nav>

            {/* RIGHT ICONS */}
            <div className={`${h.tools} flex items-center justify-end gap-0.5 sm:gap-1.5`}>
              <button
                type="button"
                aria-label="Search products"
                aria-expanded={searchOpen}
                aria-controls="header-search"
                onMouseEnter={closeMega}
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  closeMega();
                }}
                className="text-primary flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/70"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>

              <Link
                href="/cart"
                aria-label="Shopping cart"
                onMouseEnter={closeMega}
                className="text-primary flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/70"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
              </Link>

              <Link
                href="/account"
                aria-label="My account"
                onMouseEnter={closeMega}
                className="text-primary hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/70 sm:flex"
              >
                <UserRound size={20} strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          {/* FLOATING MEGA MENU */}
          <div
            id="header-mega-menu"
            className="absolute top-full left-1/2 hidden w-[min(1240px,calc(100vw-48px))] -translate-x-1/2 pt-3 lg:block"
          >
            {activeMega && (
              <MegaMenu menu={megaMenus[activeMega]} onClose={closeMega} />
            )}
          </div>

          {/* SEARCH PANEL */}
          {searchOpen && (
            <div
              id="header-search"
              className="absolute top-full left-1/2 mt-3 w-[min(650px,calc(100vw-24px))] -translate-x-1/2 overflow-hidden rounded-[22px] border border-white/80 bg-white/95 shadow-[0_20px_60px_rgba(6,48,74,0.13)] backdrop-blur-xl"
            >
              <form
                action="/search"
                method="GET"
                role="search"
                className="flex items-center gap-3 p-4"
              >
                <Search size={21} className="text-primary shrink-0" />

                <input
                  type="search"
                  name="q"
                  placeholder="Search products..."
                  aria-label="Search products"
                  autoFocus
                  className="text-primary placeholder:text-primary/40 min-w-0 flex-1 bg-transparent font-sans text-[16px] outline-none"
                />

                <button
                  type="submit"
                  className="text-primary font-sans text-[14px] font-semibold"
                >
                  Search
                </button>

                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="text-primary flex h-9 w-9 items-center justify-center"
                >
                  <X size={20} />
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      <div
        id="mobile-sidebar"
        className={`fixed inset-0 z-100 lg:hidden ${
          mobileOpen ? "visible" : "invisible"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* BACKDROP */}
        <button
          type="button"
          aria-label="Close navigation"
          tabIndex={mobileOpen ? 0 : -1}
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-[#061F2E]/50 backdrop-blur-[3px] transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* PANEL */}
        <aside
          aria-label="Mobile navigation"
          {...(!mobileOpen ? { inert: true } : {})}
          className={`absolute top-0 left-0 flex h-full w-[min(390px,88vw)] flex-col overflow-hidden rounded-r-[28px] bg-[#FAFAF8] shadow-[20px_0_70px_rgba(0,0,0,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* TOP */}
          <div className="border-primary/10 flex min-h-20 items-center justify-between border-b px-6">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              aria-label="NUOVÉ homepage"
            >
              <Image
                src="/assets/nuove-logo.png"
                alt="NUOVÉ"
                width={145}
                height={50}
                className="h-9 w-auto object-contain"
              />
            </Link>

            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setMobileOpen(false)}
              className="text-primary flex h-11 w-11 items-center justify-center rounded-full bg-white"
            >
              <X size={23} />
            </button>
          </div>

          {/* LINKS */}
          <nav
            aria-label="Mobile menu"
            className="min-h-0 flex-1 overflow-y-auto px-6 py-6"
          >
            {navLinks.map((link) => {
              const expanded = mobileSubmenu === link.name;
              const menu = megaMenus[link.name];

              return (
                <div key={link.name} className="border-primary/10 border-b">
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-heading text-primary flex min-h-17 flex-1 items-center text-[31px]"
                    >
                      {link.name}
                    </Link>

                    {link.megaMenu ? (
                      <button
                        type="button"
                        aria-label={`Toggle ${link.name} submenu`}
                        aria-expanded={expanded}
                        onClick={() =>
                          setMobileSubmenu(expanded ? null : link.name)
                        }
                        className="text-primary flex h-11 w-11 items-center justify-center rounded-full bg-white"
                      >
                        <ChevronDown
                          size={20}
                          className={`transition-transform duration-300 ${
                            expanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <ArrowUpRight size={19} className="text-primary/50" />
                    )}
                  </div>

                  {/* MOBILE SUBMENU */}
                  {menu && (
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ${
                        expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div
                          className="pb-6"
                          {...(!expanded ? { inert: true } : {})}
                        >
                          {menu.columns.map((column) => (
                            <div key={column.heading} className="mb-6">
                              <h3 className="text-primary mb-3 font-sans text-[16px] font-semibold">
                                {column.heading}
                              </h3>

                              <ul className="space-y-3">
                                {column.links.map((item) => (
                                  <li key={item.name}>
                                    <Link
                                      href={item.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="text-primary/65 flex items-center justify-between gap-3 font-sans text-[15px]"
                                    >
                                      {item.name}
                                      <ChevronRight size={17} />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}

                          {/* MOBILE FEATURED PRODUCTS */}
                          <div className="border-primary/10 border-t pt-5">
                            <h3 className="text-primary mb-4 font-sans text-[16px] font-semibold">
                              Featured Products
                            </h3>

                            <div className="grid grid-cols-2 gap-3">
                              {menu.products.map((handle) => (
                                <MegaProduct
                                  key={handle}
                                  handle={handle}
                                  onNavigate={() => setMobileOpen(false)}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/account"
              onClick={() => setMobileOpen(false)}
              className="text-primary mt-7 flex items-center gap-3 font-sans text-[16px] font-medium"
            >
              <UserRound size={20} />
              My Account
            </Link>
          </nav>

          {/* BOTTOM */}
          <div className="border-primary/10 border-t bg-[#EFF5F6] p-6">
            <p className="font-heading text-primary text-[27px] italic">
              A beautiful ritual begins here.
            </p>

            <Link
              href="/collections/all"
              onClick={() => setMobileOpen(false)}
              className="bg-primary mt-5 flex min-h-13 items-center justify-between rounded-full py-1.5 pr-1.5 pl-6 font-sans text-[15px] font-medium text-white"
            >
              Explore NUOVÉ
              <span className="text-primary flex h-10 w-10 items-center justify-center rounded-full bg-[#D8EDF3]">
                <ArrowRight size={19} />
              </span>
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
