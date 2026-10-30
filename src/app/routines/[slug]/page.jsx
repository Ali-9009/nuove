import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Sun, Moon } from "lucide-react";

import { routines, getRoutine } from "@/data/routines";
import { products, formatPrice } from "@/data/products";

export function generateStaticParams() {
  return routines.map((routine) => ({
    slug: routine.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const routine = getRoutine(slug);

  if (!routine) return { title: "Routine Not Found | NUOVÉ" };

  return {
    title: `${routine.name} | NUOVÉ`,
    description: routine.description,
  };
}

export default async function RoutinePage({ params }) {
  const { slug } = await params;
  const routine = getRoutine(slug);

  if (!routine) notFound();

  const includedProducts = routine.productHandles
    .map((handle) =>
      products.find((product) => product.handle === handle)
    )
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-12 lg:py-20">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-xs text-primary"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">

          {/* BUNDLE IMAGE */}
          <div className="relative aspect-[4/5] overflow-hidden bg-[#F8F7F4]">
            <Image
              src={routine.image}
              alt={routine.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-6"
            />
          </div>

          {/* BUNDLE DETAILS */}
          <div className="lg:py-8">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
              {routine.subtitle}
            </span>

            <h1 className="mt-5 font-heading text-[clamp(3.5rem,5vw,6rem)] leading-[0.95] text-primary">
              {routine.name}
            </h1>

            <p className="mt-7 max-w-[500px] text-sm leading-[1.9] text-text/70">
              {routine.description}
            </p>

            <div className="mt-8 border-t border-primary/15 pt-7">
              <h2 className="font-heading text-3xl text-primary">
                Your Complete Ritual
              </h2>

              <ul className="mt-6 space-y-4">
                {includedProducts.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.handle}`}
                      className="flex items-center gap-3 text-sm text-text/75 transition-colors hover:text-primary"
                    >
                      <Check size={16} className="shrink-0 text-primary" />
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex items-center gap-3 border-t border-primary/15 pt-7">
              <Sun size={18} className="text-primary" />
              <Moon size={18} className="text-primary" />

              <p className="text-sm text-text/70">
                {routine.usage}
              </p>
            </div>

            <div className="mt-10 border-t border-primary/15 pt-7">
              <span className="text-xs uppercase tracking-wider text-text/50">
                Bundle Price
              </span>

              <p className="mt-2 font-heading text-4xl text-primary">
                {typeof routine.bundlePrice === "number"
                  ? formatPrice(routine.bundlePrice)
                  : "Price to be confirmed"}
              </p>

              <p className="mt-5 text-xs leading-relaxed text-text/50">
                Bundle purchasing will be enabled when the cart
                and verified pricing are configured.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}