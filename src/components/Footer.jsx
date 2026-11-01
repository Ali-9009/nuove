import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    title: "Shop",
    links: [
      { name: "Shop All", href: "/collections/all" },
      { name: "Shop by Concern", href: "/collections" },
      { name: "Routines & Sets", href: "/collections/routines" },
      { name: "Discovery & Travel", href: "/collections/discovery" },
    ],
  },
  {
    title: "About",
    links: [
      { name: "Our Philosophy", href: "/pages/our-story" },
      { name: "Ingredient Library", href: "/pages/ingredients" },
      { name: "Journal", href: "/blogs/journal" },
      { name: "Affiliate Program", href: "/pages/affiliate" },
    ],
  },
  {
    title: "Care",
    links: [
      { name: "Contact Us", href: "/pages/contact" },
      { name: "Shipping & Returns", href: "/pages/shipping-returns" },
      { name: "FAQ", href: "/pages/faq" },
      { name: "Track an Order", href: "/pages/track-order" },
    ],
  },
  {
    title: "Policies",
    links: [
      { name: "Privacy Policy", href: "/pages/privacy-policy" },
      { name: "Terms of Service", href: "/pages/terms-of-service" },
      { name: "Refund Policy", href: "/pages/refund-policy" },
      { name: "Accessibility", href: "/pages/accessibility" },
    ],
  },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/",
    icon: "ri-instagram-line",
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/",
    icon: "ri-tiktok-fill",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/",
    icon: "ri-facebook-fill",
  },
];

export default function Footer() {
  return (
    <footer className="text-primary relative overflow-hidden">
      {" "}
      <div className="mx-auto max-w-360 px-4 pt-16 sm:px-8 sm:pt-20 md:px-6 lg:pt-24">
        {/* MAIN FOOTER */}
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr] lg:gap-16">
          {/* LEFT — BRAND */}
          <div className="max-w-[430px]">
            <Link
              href="/"
              aria-label="NUOVÉ homepage"
              className="inline-flex items-center"
            >
              <Image
                src="/assets/nuove-logo.png"
                alt="NUOVÉ"
                width={170}
                height={65}
                className="h-auto w-[140px] object-contain sm:w-[170px]"
                priority={false}
              />
            </Link>

            {/* DESCRIPTION */}
            <p className="text-primary/65 mt-5 max-w-[370px] font-sans text-[16px] leading-[1.8]">
              Thoughtfully considered skincare, created for beautiful everyday
              rituals.
            </p>

            {/* SOCIAL ICONS */}
            <nav
              aria-label="Social media"
              className="mt-8 flex items-center gap-3"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`NUOVÉ on ${social.name}`}
                  className="group border-primary/10 text-primary hover:border-primary hover:bg-primary flex h-12 w-12 items-center justify-center rounded-full border bg-white transition-all duration-300 hover:-translate-y-1 hover:text-white"
                >
                  <i
                    className={`${social.icon} text-[21px]`}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </nav>
          </div>

          {/* RIGHT — FOOTER NAVIGATION */}
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-8"
          >
            {footerLinks.map((column) => (
              <div key={column.title}>
                <h2 className="text-primary font-sans text-[15px] font-semibold">
                  {column.title}
                </h2>

                <ul className="mt-6 space-y-4">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-primary/65 hover:text-primary font-sans text-[14px] leading-[1.6] transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none relative mx-auto max-w-360 overflow-hidden"
      >
        <svg
          viewBox="0 0 1000 240"
          preserveAspectRatio="none"
          className="block h-auto w-full"
          role="presentation"
        >
          <defs>
            <linearGradient
              id="footer-wordmark-gradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#A8BCC3" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#B8C9CE" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#CDD6D7" stopOpacity="0.4" />
              <stop offset="75%" stopColor="#E2E8E8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          <text
            x="0"
            y="215"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize="250"
            fontWeight="400"
            fill="url(#footer-wordmark-gradient)"
          >
            NUOVÉ
          </text>
        </svg>
      </div>
    </footer>
  );
}
