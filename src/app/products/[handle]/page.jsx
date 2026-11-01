import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, ArrowUpRight } from "lucide-react";

import {
  products,
  getProductByHandle,
  getProductDetails,
} from "@/data/products";
import { reviews } from "@/data/reviews";
import { routines } from "@/data/routines";

import ProductDetails from "@/components/product/ProductDetails";
import ProductRec from "@/components/product/ProductRec";
import RecentlyViewed from "@/components/product/RecentlyViewed";

export function generateStaticParams() {
  return products.map((product) => ({
    handle: product.handle,
  }));
}

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const product = getProductByHandle(handle);

  if (!product) {
    return {
      title: "Product Not Found | NUOVÉ",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

function getCuratedProducts(handles = [], currentHandle) {
  return handles
    .filter((handle) => handle !== currentHandle)
    .map((handle) => getProductByHandle(handle))
    .filter(Boolean);
}

export default async function ProductPage({ params }) {
  const { handle } = await params;

  const product = getProductByHandle(handle);

  if (!product) notFound();

  const details = getProductDetails(product.handle);

  const completeRoutine = getCuratedProducts(
    details.completeRoutine,
    product.handle,
  );

  const frequentlyPaired = getCuratedProducts(
    details.frequentlyPaired,
    product.handle,
  );

  const pairings = getCuratedProducts(
    [...(details.completeRoutine || []), ...(details.frequentlyPaired || [])],
    product.handle,
  );

  const matchingBundles = routines.filter(
    (routine) =>
      (details.bundleSlugs || []).includes(routine.slug) &&
      routine.productHandles.includes(product.handle),
  );

  return (
    <main className="min-h-screen">
      <div className="mx-auto mt-12 max-w-360 px-4 py-8 md:mt-16 md:px-6 lg:py-12">
        {/* BREADCRUMB */}
        <nav
          aria-label="Breadcrumb"
          className="text-text/50 mb-10 flex flex-wrap items-center gap-2 text-xs"
        >
          <Link href="/" className="hover:text-primary">
            Home
          </Link>

          <span>/</span>

          <Link href="/collections/all" className="hover:text-primary">
            Shop
          </Link>

          <span>/</span>

          <span className="text-primary">{product.name}</span>
        </nav>

        {/* MAIN PRODUCT EXPERIENCE */}
        <ProductDetails
          product={product}
          details={details}
          reviews={reviews}
          pairings={pairings}
        />

        {/* COMPLETE YOUR ROUTINE */}
        <div className="mt-20 lg:mt-32">
          <ProductRec
            title="Complete Your Routine."
            subtitle="The Perfect Pairing"
            products={completeRoutine}
          />
        </div>

        {/* FREQUENTLY PAIRED */}
        <ProductRec
          title="Frequently Paired With."
          subtitle="Discover Complementary Care"
          products={frequentlyPaired}
        />

        {/* SHOP THE SET */}
        {matchingBundles.length > 0 && (
          <section className="border-primary/15 border-t py-16 lg:py-24">
            <div className="grid items-center gap-10 bg-[#F8F7F4] p-7 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-16">
              <div>
                <span className="text-primary mb-5 block text-[10px] font-semibold tracking-[0.2em] uppercase">
                  The NUOVÉ Ritual
                </span>

                <h2 className="font-heading text-primary text-[clamp(2.8rem,4vw,4.7rem)] leading-none">
                  Better <span className="italic">Together.</span>
                </h2>

                <p className="text-text/60 mt-6 max-w-md text-sm leading-[1.9]">
                  Explore curated skincare systems featuring this formulation.
                </p>
              </div>

              <div className="space-y-4">
                {matchingBundles.map((routine) => (
                  <Link
                    key={routine.slug}
                    href={`/routines/${routine.slug}`}
                    className="group border-primary/15 flex min-h-20 items-center justify-between gap-4 border-b py-5"
                  >
                    <div>
                      <span className="text-primary/50 mb-2 block text-[10px] tracking-wider uppercase">
                        {routine.subtitle}
                      </span>

                      <h3 className="font-heading text-primary text-2xl sm:text-3xl">
                        {routine.name}
                      </h3>
                    </div>

                    <ArrowUpRight
                      size={22}
                      strokeWidth={1.4}
                      className="text-primary shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* RECENTLY VIEWED */}
        <RecentlyViewed currentHandle={product.handle} />
      </div>
    </main>
  );
}
