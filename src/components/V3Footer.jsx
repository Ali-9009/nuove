import Link from "next/link";

const cols = [
  { title: "Shop", links: [["Shop All", "/collections/all"], ["Shop by Concern", "/collections"], ["Routines & Sets", "/collections/routines"], ["Discovery & Travel", "/collections/discovery"]] },
  { title: "About", links: [["Our Philosophy", "/our-story"], ["Ingredient Library", "/pages/ingredients"], ["Journal", "/blogs/journal"], ["Affiliate Program", "/pages/affiliate"]] },
  { title: "Care", links: [["Contact Us", "/pages/contact"], ["Shipping & Returns", "/pages/shipping-returns"], ["FAQ", "/pages/faq"], ["Track an Order", "/pages/track-order"]] },
  { title: "Policies", links: [["Privacy Policy", "/pages/privacy-policy"], ["Terms of Service", "/pages/terms"], ["Refund Policy", "/pages/refund-policy"], ["Accessibility", "/pages/accessibility"]] },
];
const socials = [["Instagram", "ri-instagram-line"], ["TikTok", "ri-tiktok-line"], ["Facebook", "ri-facebook-fill"]];

export default function V3Footer() {
  return (
    <footer className="overflow-hidden bg-[#F8F6F1] pt-14 text-[#092D43] lg:pt-24">
      <div className="mx-auto max-w-[1560px] px-5 lg:px-12">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex-[1_1_300px]">
            <div className="text-[clamp(24px,2vw,32px)] font-light leading-[1.15] tracking-[-0.03em]">
              Healthy-looking skin <span className="text-[#7FA3B5]">starts with a ritual.</span>
            </div>
            <div className="mt-6 flex gap-2">
              {socials.map(([label, icon]) => (
                <a key={label} href="#" aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg transition hover:bg-[#092D43] hover:text-[#F8F6F1]">
                  <i className={icon} />
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-[2_1_560px] flex-wrap gap-8">
            {cols.map((col) => (
              <div key={col.title} className="flex-[1_1_140px]">
                <div className="text-[13px] text-[#5E6A72]">{col.title}</div>
                <ul className="mt-3.5 flex flex-col gap-2.5">
                  {col.links.map(([name, href]) => (
                    <li key={name}><Link href={href} className="text-sm text-[#092D43] transition hover:text-[#5E6A72]">{name}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-4 text-xs text-[#5E6A72]">
          <span>© {new Date().getFullYear()} NUOVÉ Cosmetics</span>
          <span>Privacy · Terms · Refunds · Accessibility</span>
        </div>
        <div aria-hidden="true" className="mt-6 select-none text-center font-heading leading-[0.8] tracking-[-0.02em] text-[#092D43] opacity-[0.12] text-[clamp(90px,24vw,420px)] [mask-image:linear-gradient(180deg,#000_35%,transparent_100%)]">
          NUOVÉ
        </div>
      </div>
    </footer>
  );
}
