// "use client";

// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   Search,
//   ShoppingBag,
//   UserRound,
//   Menu,
//   X,
//   ArrowRight,
// } from "lucide-react";
// import gsap from "gsap";
// import Image from "next/image";

// const navLinks = [
//   { name: "Shop All", href: "/collections/all" },
//   { name: "Skincare", href: "/collections/skincare" },
//   { name: "Our Story", href: "/pages/our-story" },
//   { name: "Contact", href: "/pages/contact" },
// ];

// const announcement = {
//   text: "Discover Your NUOVÉ Routine",
//   href: "/routines/barrier-repair-system",
// };

// export default function Header() {
//   const pathname = usePathname();

//   const headerRef = useRef(null);
//   const announcementRef = useRef(null);
//   const mobileMenuRef = useRef(null);

//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);

//   // Smooth announcement bar collapse
//   // Smooth announcement bar + compact sticky header
//   useEffect(() => {
//     const announcement = announcementRef.current;

//     if (!announcement) return;

//     let lastScrolled = null;

//     const updateHeader = () => {
//       const scrolled = window.scrollY > 40;

//       // Only animate when scroll state actually changes
//       if (lastScrolled === scrolled) return;

//       lastScrolled = scrolled;
//       setIsScrolled(scrolled);

//       gsap.to(announcement, {
//         height: scrolled ? 0 : "auto",
//         opacity: scrolled ? 0 : 1,
//         duration: scrolled ? 0.2 : 0.4,
//         ease: "power2.out",
//         overwrite: "auto",
//       });
//     };

//     updateHeader();

//     window.addEventListener("scroll", updateHeader, {
//       passive: true,
//     });

//     return () => {
//       window.removeEventListener("scroll", updateHeader);
//       gsap.killTweensOf(announcement);
//     };
//   }, []);

//   // Smooth mobile menu animation
//   useEffect(() => {
//     const menu = mobileMenuRef.current;

//     if (!menu) return;

//     gsap.to(menu, {
//       height: mobileOpen ? "auto" : 0,
//       opacity: mobileOpen ? 1 : 0,
//       duration: 0.4,
//       ease: "power3.inOut",
//       overwrite: "auto",
//     });
//   }, [mobileOpen]);

//   // Close menus on route change
//   useEffect(() => {
//     setMobileOpen(false);
//     setSearchOpen(false);
//   }, [pathname]);

//   return (
//     <header
//       ref={headerRef}
//       className={`fixed top-0 left-0 z-50 w-full bg-white transition-shadow duration-300 ${
//         isScrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.06)]" : ""
//       }`}
//     >
//       {/* ================= ANNOUNCEMENT BAR ================= */}
//       <div
//         ref={announcementRef}
//         className="bg-primary overflow-hidden text-white"
//       >
//         <div className="flex min-h-9 items-center justify-center px-4 py-2 text-center">
//           <Link
//             href={announcement.href}
//             className="group inline-flex items-center justify-center gap-2 text-[10px] font-medium tracking-[0.14em] uppercase transition-opacity hover:opacity-80 sm:text-[11px]"
//           >
//             <span>{announcement.text}</span>

//             <ArrowRight
//               size={13}
//               strokeWidth={1.5}
//               className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
//             />
//           </Link>
//         </div>
//       </div>

//       {/* ================= MAIN HEADER ================= */}
//       <div className="relative border-b border-black/5">
//         <div
//           className={`mx-auto grid max-w-360 grid-cols-[1fr_auto_1fr] items-center px-5 transition-[height] duration-300 ease-out sm:px-8 lg:px-12 ${
//             isScrolled ? "h-[60px] lg:h-[68px]" : "h-[72px] lg:h-[88px]"
//           }`}
//         >
//           {/* LEFT DESKTOP LINKS */}
//           <nav
//             aria-label="Main navigation"
//             className="hidden items-center gap-5 lg:flex xl:gap-8"
//           >
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className={`hover:text-primary relative text-[11px] font-semibold tracking-[0.09em] whitespace-nowrap uppercase transition-colors duration-300 ${
//                   pathname === link.href ? "text-primary" : "text-text"
//                 }`}
//               >
//                 {link.name}

//                 <span className="bg-primary absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 hover:w-full" />
//               </Link>
//             ))}
//           </nav>

//           {/* MOBILE MENU BUTTON */}
//           <div className="flex items-center lg:hidden">
//             <button
//               type="button"
//               onClick={() => {
//                 setMobileOpen(!mobileOpen);
//                 setSearchOpen(false);
//               }}
//               aria-label={mobileOpen ? "Close menu" : "Open menu"}
//               aria-expanded={mobileOpen}
//               aria-controls="mobile-navigation"
//               className="text-text flex h-10 w-10 items-center justify-start"
//             >
//               {mobileOpen ? (
//                 <X size={23} strokeWidth={1.4} />
//               ) : (
//                 <Menu size={23} strokeWidth={1.4} />
//               )}
//             </button>
//           </div>

//           {/* CENTER LOGO */}
//           <Link
//             href="/"
//             aria-label="NUOVÉ homepage"
//             className="flex items-center justify-center"
//           >
//             <Image
//               src="/assets/nuove-logo.png"
//               alt="NUOVÉ"
//               width={180}
//               height={70}
//               priority
//               className={`h-auto w-auto object-contain transition-[height] duration-300 ease-out ${
//                 isScrolled
//                   ? "h-[30px]! sm:h-[35px]! lg:h-[40px]!"
//                   : "h-[40px]! sm:h-[45px]! lg:h-[50px]!"
//               }`}
//             />
//           </Link>

//           {/* RIGHT ICONS */}
//           <div className="flex items-center justify-end gap-3 sm:gap-5 lg:gap-6">
//             <button
//               type="button"
//               aria-label="Search"
//               aria-expanded={searchOpen}
//               aria-controls="header-search"
//               onClick={() => {
//                 setSearchOpen(!searchOpen);
//                 setMobileOpen(false);
//               }}
//               className="hover:text-primary flex h-9 w-9 items-center justify-center transition-all duration-300"
//             >
//               <Search size={20} strokeWidth={1.5} />
//             </button>

//             <Link
//               href="/account"
//               aria-label="My account"
//               className="hover:text-primary hidden h-9 w-9 items-center justify-center transition-all duration-300 sm:flex"
//             >
//               <UserRound size={20} strokeWidth={1.5} />
//             </Link>

//             <Link
//               href="/cart"
//               aria-label="Shopping cart"
//               className="hover:text-primary relative flex h-9 w-9 items-center justify-center transition-all duration-300"
//             >
//               <ShoppingBag size={20} strokeWidth={1.5} />

//               <span className="bg-primary absolute -top-1 -right-1 flex h-[16px] w-[16px] items-center justify-center rounded-full text-[9px] font-medium text-white">
//                 0
//               </span>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* ================= SEARCH PANEL ================= */}
//       <div
//         id="header-search"
//         className={`overflow-hidden bg-white transition-all duration-300 ${
//           searchOpen
//             ? "max-h-32 border-b border-black/10 opacity-100"
//             : "max-h-0 opacity-0"
//         }`}
//         aria-hidden={!searchOpen}
//       >
//         <form
//           action="/search"
//           method="GET"
//           role="search"
//           className="mx-auto flex max-w-[900px] items-center gap-4 px-6 py-6"
//         >
//           <Search size={21} strokeWidth={1.4} />

//           <input
//             type="search"
//             name="q"
//             placeholder="Search for products..."
//             aria-label="Search products"
//             tabIndex={searchOpen ? 0 : -1}
//             className="text-text w-full border-none bg-transparent text-sm outline-none placeholder:text-neutral-400"
//           />

//           <button
//             type="submit"
//             tabIndex={searchOpen ? 0 : -1}
//             className="text-primary text-xs font-semibold tracking-wider uppercase"
//           >
//             Search
//           </button>

//           <button
//             type="button"
//             tabIndex={searchOpen ? 0 : -1}
//             aria-label="Close search"
//             onClick={() => setSearchOpen(false)}
//           >
//             <X size={20} strokeWidth={1.4} />
//           </button>
//         </form>
//       </div>

//       {/* ================= MOBILE MENU ================= */}
//       <div
//         ref={mobileMenuRef}
//         id="mobile-navigation"
//         aria-hidden={!mobileOpen}
//         className="h-0 overflow-hidden bg-white opacity-0 lg:hidden"
//       >
//         <nav
//           aria-label="Mobile navigation"
//           className="flex flex-col px-6 pt-5 pb-8 sm:px-8"
//         >
//           {navLinks.map((link, index) => (
//             <Link
//               key={link.name}
//               href={link.href}
//               tabIndex={mobileOpen ? 0 : -1}
//               onClick={() => setMobileOpen(false)}
//               className="font-heading text-text hover:text-primary flex items-center justify-between border-b border-black/10 py-5 text-[27px] transition-colors"
//             >
//               {link.name}

//               <ArrowRight
//                 size={18}
//                 strokeWidth={1.3}
//                 className="text-primary"
//               />
//             </Link>
//           ))}

//           {/* MOBILE ACCOUNT */}
//           <Link
//             href="/account"
//             tabIndex={mobileOpen ? 0 : -1}
//             onClick={() => setMobileOpen(false)}
//             className="text-primary mt-7 flex items-center gap-3 text-xs font-semibold tracking-[0.12em] uppercase"
//           >
//             <UserRound size={19} strokeWidth={1.5} />
//             My Account
//           </Link>

//           <p className="mt-10 text-[10px] tracking-[0.18em] text-neutral-400 uppercase">
//             NUOVE — A NEW STANDARD OF BEAUTY
//           </p>
//         </nav>
//       </div>
//     </header>
//   );
// }

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

/* =========================================
   ANNOUNCEMENT
========================================= */

const announcement = {
  text: "Discover Your NUOVÉ Routine",
  href: "/routines/barrier-repair-system",
};

/* =========================================
   NAVIGATION DATA
========================================= */

const navLinks = [
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

/* =========================================
   MEGA MENU DATA
========================================= */

const megaMenus = {
  Shop: {
    heading: "Discover NUOVÉ",
    description: "Explore skincare for every ritual.",

    columns: [
      {
        heading: "Shop",
        links: [
          { name: "Shop All", href: "/collections/all" },
          { name: "Bestsellers", href: "/collections/bestsellers" },
          { name: "New Arrivals", href: "/collections/new" },
          { name: "Discovery & Travel", href: "/collections/discovery" },
        ],
      },
      {
        heading: "Shop by Concern",
        links: [
          { name: "Hydration", href: "/collections/hydration" },
          { name: "Skin Barrier", href: "/collections/barrier" },
          { name: "Firmness", href: "/collections/firmness" },
          { name: "Radiance", href: "/collections/radiance" },
        ],
      },
      {
        heading: "Explore",
        links: [
          { name: "Routines & Sets", href: "/collections/routines" },
          { name: "Ingredient Library", href: "/pages/ingredients" },
          { name: "Our Philosophy", href: "/pages/our-story" },
        ],
      },
    ],

    products: ["barrier-peptide-serum", "multi-peptide-firming-cream"],
  },

  Skincare: {
    heading: "The Skincare Edit",
    description: "Thoughtful care for your daily routine.",

    columns: [
      {
        heading: "Products",
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
        heading: "Your Ritual",
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

/* =========================================
   PRODUCT IMAGE HELPER

   Prioritizes second product image.
========================================= */

function getSecondProductImage(product) {
  if (!product) return null;

  const image =
    product.images?.[1] ||
    product.hoverImage ||
    product.secondaryImage ||
    product.image;

  if (typeof image === "string") {
    return image;
  }

  return image?.src || image?.url || null;
}

/* =========================================
   MEGA MENU PRODUCT
========================================= */

function MegaProduct({ handle, onNavigate }) {
  const product = getProductByHandle(handle);

  if (!product) return null;

  const image = product.gallery?.[1];

  return (
    <Link
      href={`/products/${product.handle}`}
      onClick={onNavigate}
      className="group/product block min-w-0"
    >
      <div className="relative aspect-4/3 overflow-hidden rounded-[18px] bg-[linear-gradient(145deg,#EAF5F8_0%,#F5F8F7_48%,#EAE4DC_100%)]">
        {image && (
          <Image
            src={typeof image === "string" ? image : image.src}
            alt={product.name}
            fill
            sizes="(max-width: 1280px) 180px, 240px"
            className="object-cover transition-transform duration-700 group-hover/product:scale-110"
          />
        )}

        <span className="text-primary group-hover/product:bg-primary absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition-all duration-300 group-hover/product:rotate-45 group-hover/product:text-white">
          <ArrowUpRight size={17} strokeWidth={1.5} />
        </span>
      </div>

      <div className="mt-3">
        <h4 className="text-primary font-sans text-[15px] leading-[1.45] font-medium">
          {product.name}
        </h4>

        {product.price != null && (
          <p className="text-primary/60 mt-1 font-sans text-[14px]">
            {formatPrice(product.price)}
          </p>
        )}
      </div>
    </Link>
  );
}

/* =========================================
   DESKTOP MEGA MENU
========================================= */

function MegaMenu({ menu, onClose }) {
  if (!menu) return null;

  return (
    <div className="border-primary/10 absolute top-full right-0 left-0 z-50 border-t bg-[#FAFAF8] shadow-[0_25px_50px_rgba(6,48,74,0.09)]">
      <div className="mx-auto max-w-390 px-8 py-9 xl:px-12">
        <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 xl:gap-16">
          {/* LEFT — NAVIGATION */}
          <div>
            <div className="mb-8">
              <h2 className="font-heading text-primary text-[35px] leading-none">
                {menu.heading}
              </h2>

              <p className="text-primary/60 mt-3 font-sans text-[15px]">
                {menu.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {menu.columns.map((column) => (
                <div key={column.heading}>
                  <h3 className="text-primary font-sans text-[15px] font-semibold">
                    {column.heading}
                  </h3>

                  <ul className="mt-5 space-y-4">
                    {column.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="text-primary/65 hover:text-primary inline-flex items-center font-sans text-[15px] transition-colors duration-300"
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

          {/* RIGHT — FEATURED PRODUCTS */}
          <div className="border-primary/10 border-l pl-8 xl:pl-12">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-primary font-sans text-[15px] font-semibold">
                Featured Products
              </h3>

              <Link
                href="/collections/all"
                onClick={onClose}
                className="text-primary/65 hover:text-primary inline-flex items-center gap-2 font-sans text-[14px] transition-colors"
              >
                View All
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {menu.products.map((handle) => (
                <MegaProduct
                  key={handle}
                  handle={handle}
                  onNavigate={onClose}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   MAIN HEADER
========================================= */

export default function Header() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  /* =========================================
     SCROLL — NO GSAP
  ========================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 35);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================
     CLOSE ON ROUTE CHANGE
  ========================================= */

  useEffect(() => {
    setActiveMega(null);
    setMobileOpen(false);
    setMobileSubmenu(null);
    setSearchOpen(false);
  }, [pathname]);

  /* =========================================
     MOBILE SCROLL LOCK
  ========================================= */

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  /* =========================================
     ESCAPE TO CLOSE
  ========================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setActiveMega(null);
        setSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeMega = () => setActiveMega(null);

  return (
    <>
      <header
        onMouseLeave={closeMega}
        className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-[0_8px_30px_rgba(6,48,74,0.06)]" : ""
        }`}
      >
        {/* =====================================
            ANNOUNCEMENT BAR
        ===================================== */}
        {/* <div
          className={`bg-primary grid overflow-hidden text-white transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
            scrolled
              ? "grid-rows-[0fr] opacity-0"
              : "grid-rows-[1fr] opacity-100"
          }`}
          aria-hidden={scrolled}
        >
          <div className="min-h-0 overflow-hidden">
            <Link
              href={announcement.href}
              tabIndex={scrolled ? -1 : 0}
              className="group flex min-h-[35px] items-center justify-center gap-2 px-4 py-1.5 text-center font-sans text-[13px] font-medium transition-opacity hover:opacity-80"
            >
              {announcement.text}

              <ArrowRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div> */}

        {/* =====================================
            MAIN HEADER
        ===================================== */}
        <div className="border-primary/10 relative border-b bg-white">
          <div
            className={`mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 transition-[height] duration-300 sm:px-8 lg:px-12 ${
              scrolled ? "h-[64px] lg:h-[68px]" : "h-[70px] lg:h-[76px]"
            } lg:grid-cols-[1fr_2fr_1fr]`}
          >
            {/* =====================================
                LEFT — LOGO DESKTOP
            ===================================== */}
            <Link
              href="/"
              aria-label="NUOVÉ homepage"
              className="hidden w-fit items-center lg:flex"
              onMouseEnter={closeMega}
            >
              <Image
                src="/assets/nuove-logo.png"
                alt="NUOVÉ"
                width={165}
                height={60}
                priority
                className={`w-auto object-contain transition-[height] duration-300 ${
                  scrolled ? "h-[37px]" : "h-[43px]"
                }`}
              />
            </Link>

            {/* =====================================
                MOBILE MENU BUTTON
            ===================================== */}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(true);
                setActiveMega(null);
                setSearchOpen(false);
              }}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-sidebar"
              className="text-primary flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <Menu size={25} strokeWidth={1.5} />
            </button>

            {/* =====================================
                MOBILE CENTER LOGO
            ===================================== */}
            <Link
              href="/"
              aria-label="NUOVÉ homepage"
              className="flex items-center justify-center lg:hidden"
            >
              <Image
                src="/assets/nuove-logo.png"
                alt="NUOVÉ"
                width={150}
                height={50}
                priority
                className="h-[38px] w-auto object-contain sm:h-[42px]"
              />
            </Link>

            {/* =====================================
                CENTER — DESKTOP NAVIGATION
            ===================================== */}
            <nav
              aria-label="Main navigation"
              className="hidden h-full items-center justify-center gap-7 lg:flex xl:gap-10"
            >
              {navLinks.map((link) => {
                const hasMega = link.megaMenu;
                const isOpen = activeMega === link.name;

                return (
                  <div
                    key={link.name}
                    className="flex h-full items-center"
                    onMouseEnter={() => {
                      setActiveMega(hasMega ? link.name : null);
                      setSearchOpen(false);
                    }}
                  >
                    {hasMega ? (
                      <button
                        type="button"
                        onClick={() => setActiveMega(isOpen ? null : link.name)}
                        onFocus={() => setActiveMega(link.name)}
                        aria-expanded={isOpen}
                        aria-controls="desktop-mega-menu"
                        className={`group relative flex h-full items-center gap-1.5 font-sans text-[15px] font-medium whitespace-nowrap transition-colors duration-300 ${
                          isOpen
                            ? "text-primary"
                            : "text-primary/75 hover:text-primary"
                        }`}
                      >
                        {link.name}

                        <ChevronDown
                          size={15}
                          strokeWidth={1.5}
                          className={`transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />

                        <span
                          className={`bg-primary absolute bottom-5 left-0 h-[1.5px] transition-all duration-300 ${
                            isOpen ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className={`group relative flex h-full items-center font-sans text-[15px] font-medium whitespace-nowrap transition-colors duration-300 ${
                          pathname === link.href
                            ? "text-primary"
                            : "text-primary/75 hover:text-primary"
                        }`}
                      >
                        {link.name}

                        <span className="bg-primary absolute bottom-5 left-0 h-[1.5px] w-0 transition-all duration-300 group-hover:w-full" />
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* =====================================
                RIGHT — ICONS
            ===================================== */}
            <div className="flex items-center justify-end gap-1 sm:gap-2 lg:gap-3">
              <button
                type="button"
                aria-label="Search products"
                aria-expanded={searchOpen}
                aria-controls="header-search"
                onMouseEnter={closeMega}
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  setActiveMega(null);
                }}
                className="text-primary hover:bg-primary/5 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300"
              >
                <Search size={21} strokeWidth={1.5} />
              </button>

              <Link
                href="/account"
                aria-label="My account"
                onMouseEnter={closeMega}
                className="text-primary hover:bg-primary/5 hidden h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 sm:flex"
              >
                <UserRound size={21} strokeWidth={1.5} />
              </Link>

              <Link
                href="/cart"
                aria-label="Shopping cart"
                onMouseEnter={closeMega}
                className="text-primary hover:bg-primary/5 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300"
              >
                <ShoppingBag size={21} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* =====================================
            DESKTOP MEGA MENU
        ===================================== */}
        <div
          id="desktop-mega-menu"
          className="hidden lg:block"
          onMouseEnter={() => setSearchOpen(false)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              closeMega();
            }
          }}
        >
          {activeMega && (
            <MegaMenu menu={megaMenus[activeMega]} onClose={closeMega} />
          )}
        </div>

        {/* =====================================
            SEARCH PANEL
        ===================================== */}
        <div
          id="header-search"
          className={`absolute top-full right-0 left-0 z-40 overflow-hidden bg-white shadow-[0_20px_40px_rgba(6,48,74,0.08)] transition-all duration-300 ${
            searchOpen
              ? "visible max-h-[120px] opacity-100"
              : "invisible max-h-0 opacity-0"
          }`}
        >
          {searchOpen && (
            <form
              action="/search"
              method="GET"
              role="search"
              className="mx-auto flex max-w-[900px] items-center gap-4 px-6 py-6"
            >
              <Search
                size={21}
                strokeWidth={1.5}
                className="text-primary shrink-0"
              />

              <input
                type="search"
                name="q"
                autoFocus
                placeholder="Search products..."
                aria-label="Search products"
                className="text-primary placeholder:text-primary/40 min-w-0 flex-1 bg-transparent font-sans text-[16px] outline-none"
              />

              <button
                type="submit"
                className="text-primary font-sans text-[15px] font-semibold"
              >
                Search
              </button>

              <button
                type="button"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
                className="text-primary flex h-9 w-9 items-center justify-center"
              >
                <X size={21} />
              </button>
            </form>
          )}
        </div>
      </header>

      {/* =====================================
          MOBILE SIDEBAR
      ===================================== */}
      <div
        id="mobile-sidebar"
        className={`fixed inset-0 z-[100] lg:hidden ${
          mobileOpen ? "visible" : "invisible"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* BACKDROP */}
        <button
          type="button"
          aria-label="Close navigation menu"
          tabIndex={mobileOpen ? 0 : -1}
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 w-full bg-[#041F30]/45 backdrop-blur-[3px] transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* SIDEBAR */}
        <aside
          className={`absolute top-0 left-0 flex h-full w-[min(390px,88vw)] flex-col overflow-hidden bg-[#FAFAF8] shadow-[20px_0_70px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Mobile navigation"
          {...(!mobileOpen ? { inert: true } : {})}
        >
          {/* SIDEBAR HEADER */}
          <div className="border-primary/10 flex min-h-[80px] items-center justify-between border-b px-6">
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
                className="h-[40px] w-auto object-contain"
              />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="text-primary flex h-11 w-11 items-center justify-center rounded-full bg-white"
            >
              <X size={23} strokeWidth={1.5} />
            </button>
          </div>

          {/* MOBILE NAV */}
          <nav
            aria-label="Mobile menu"
            className="min-h-0 flex-1 overflow-y-auto px-6 py-6"
          >
            {navLinks.map((link) => {
              const hasMega = link.megaMenu;
              const expanded = mobileSubmenu === link.name;
              const menu = megaMenus[link.name];

              return (
                <div key={link.name} className="border-primary/10 border-b">
                  {/* MAIN LINK */}
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-heading text-primary flex min-h-[70px] flex-1 items-center text-[32px] leading-none"
                    >
                      {link.name}
                    </Link>

                    {hasMega ? (
                      <button
                        type="button"
                        onClick={() =>
                          setMobileSubmenu(expanded ? null : link.name)
                        }
                        aria-label={`${expanded ? "Collapse" : "Expand"} ${link.name} submenu`}
                        aria-expanded={expanded}
                        className="text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white"
                      >
                        <ChevronDown
                          size={20}
                          strokeWidth={1.5}
                          className={`transition-transform duration-300 ${
                            expanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <ArrowUpRight
                        size={20}
                        strokeWidth={1.5}
                        className="text-primary/50"
                      />
                    )}
                  </div>

                  {/* MOBILE SUBMENU */}
                  {hasMega && (
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ${
                        expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="pb-6">
                          {menu.columns.map((column) => (
                            <div key={column.heading} className="mb-6">
                              <h3 className="text-primary mb-4 font-sans text-[15px] font-semibold">
                                {column.heading}
                              </h3>

                              <ul className="space-y-3">
                                {column.links.map((item) => (
                                  <li key={item.name}>
                                    <Link
                                      href={item.href}
                                      tabIndex={expanded ? 0 : -1}
                                      onClick={() => setMobileOpen(false)}
                                      className="text-primary/65 flex items-center justify-between gap-3 font-sans text-[15px]"
                                    >
                                      {item.name}
                                      <ChevronRight
                                        size={16}
                                        strokeWidth={1.5}
                                      />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}

                          {/* FEATURED PRODUCT IMAGE */}
                          <div className="border-primary/10 mt-5 border-t pt-6">
                            <p className="text-primary mb-4 font-sans text-[15px] font-semibold">
                              Featured Products
                            </p>

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

            {/* ACCOUNT */}
            <Link
              href="/account"
              onClick={() => setMobileOpen(false)}
              className="text-primary mt-7 flex items-center gap-3 font-sans text-[16px] font-medium"
            >
              <UserRound size={21} strokeWidth={1.5} />
              My Account
            </Link>
          </nav>

          {/* SIDEBAR FOOTER */}
          <div className="border-primary/10 border-t bg-[#F1F6F7] px-6 py-6">
            <p className="font-heading text-primary text-[25px] italic">
              A beautiful ritual begins here.
            </p>

            <Link
              href="/collections/all"
              onClick={() => setMobileOpen(false)}
              className="bg-primary mt-5 flex min-h-[52px] items-center justify-between rounded-full py-1.5 pr-1.5 pl-6 font-sans text-[15px] font-medium text-white"
            >
              Explore NUOVÉ
              <span className="text-primary flex h-10 w-10 items-center justify-center rounded-full bg-[#D8EDF3]">
                <ArrowUpRight size={19} />
              </span>
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
