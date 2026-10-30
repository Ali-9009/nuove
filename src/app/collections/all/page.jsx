import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export const metadata = {
  title: "Shop All Skincare | NUOVÉ",
  description:
    "Explore the complete NUOVÉ skincare collection.",
};

export default function ShopAllPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-[#F8F7F4] px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-360">
          <span className="mb-5 block text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
            Discover NUOVÉ
          </span>

          <h1 className="font-heading text-[clamp(3.5rem,7vw,7rem)] leading-none text-primary">
            The <span className="italic">Collection.</span>
          </h1>

          <p className="mt-6 max-w-125 text-sm leading-[1.9] text-text/60">
            Discover thoughtfully developed skincare designed
            to elevate your everyday ritual.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-360 px-4 py-16">
        <div className="mb-10 flex items-center justify-between border-b border-black/10 pb-5">
          <h2 className="font-heading text-3xl text-primary">
            Shop All Products
          </h2>

          <span className="text-xs uppercase tracking-widest text-text/50">
            {products.length} Products
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}