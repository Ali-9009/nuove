import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import {
  getSkinConcern,
  skinConcerns,
} from "@/data/skinConcerns";

import { getProductsByConcern } from "@/data/products";

import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return skinConcerns.map((concern) => ({
    slug: concern.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const concern = getSkinConcern(slug);

  if (!concern) {
    return {
      title: "Collection Not Found | NUOVÉ",
    };
  }

  return {
    title: `${concern.title} | NUOVÉ`,
    description: concern.description,
  };
}

export default async function SkinConcernPage({ params }) {
  const { slug } = await params;

  const concern = getSkinConcern(slug);

  if (!concern) {
    notFound();
  }

  const products = getProductsByConcern(slug);

  return (
    <main className="min-h-screen">
      {/* COLLECTION HEADER */}
      <section className="bg-[#F8F7F4] py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-360 px-6 lg:px-12">
          {/* BACK LINK */}
          <Link
            href="/"
            className="mb-12 inline-flex items-center gap-2 text-xs font-medium text-primary transition-opacity hover:opacity-60"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          {/* EYEBROW */}
          <span className="mb-5 block text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
            NUOVÉ / Skin Concerns
          </span>

          {/* HEADING */}
          <h1 className="max-w-[900px] font-heading text-[clamp(3.5rem,7vw,7rem)] leading-[0.95] tracking-[-0.035em] text-primary">
            {concern.title}
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-7 max-w-[540px] text-sm leading-[1.9] text-text/70 sm:text-base">
            {concern.description}
          </p>
        </div>
      </section>

      {/* PRODUCT COLLECTION */}
      <section className="mx-auto max-w-360 px-6 py-16 lg:px-12 lg:py-24">
        {/* TOP BAR */}
        <div className="mb-10 flex items-center justify-between border-b border-black/10 pb-5">
          <h2 className="font-heading text-3xl text-primary sm:text-4xl">
            The Collection
          </h2>

          <span className="text-xs uppercase tracking-widest text-text/50">
            {products.length} Products
          </span>
        </div>

        {/* PRODUCT GRID */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="font-heading text-3xl text-primary">
              No products available.
            </p>

            <p className="mt-3 text-sm text-text/60">
              Explore our other skincare collections.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}