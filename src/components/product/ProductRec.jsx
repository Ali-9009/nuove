import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import ProductCard from "@/components/ProductCard";

export default function ProductRec({
  title,
  subtitle,
  products = [],
}) {
  if (!products.length) return null;

  return (
    <section className="border-t border-primary/15 py-16 lg:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/60">
            {subtitle}
          </span>

          <h2 className="font-heading text-[clamp(2.5rem,4vw,4.5rem)] leading-none text-primary">
            {title}
          </h2>
        </div>

        <Link
          href="/collections/all"
          className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary"
        >
          Shop All
          <ArrowUpRight size={17} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}