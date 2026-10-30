import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

import { products, getProductByHandle, formatPrice } from "@/data/products";

import PrimaryButton from "@/components/PrimaryButton";
import ProductCard from "@/components/ProductCard";

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
    title: `${product.name} | NUOVÉ`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { handle } = await params;

  const product = getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(
      (item) =>
        item.id !== product.id &&
        item.concerns.some((concern) => product.concerns.includes(concern)),
    )
    .slice(0, 4);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-360 px-6 py-12 lg:px-12">
        {/* BACK LINK */}
        <Link
          href="/"
          className="text-primary mb-10 inline-flex items-center gap-2 text-xs hover:opacity-60"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* PRODUCT DETAILS */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="grid grid-cols-2 gap-3">
            {[product.image, ...(product.gallery || [])]
              .filter((src, index, arr) => src && arr.indexOf(src) === index)
              .map((src, index) => (
                <figure
                  key={`${product.handle}-${index}`}
                  className="relative aspect-[3/4] overflow-hidden bg-[#F7F6F3]"
                >
                  <Image
                    src={src}
                    alt={`${product.name} - View ${index + 1}`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 25vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />

                  <figcaption className="sr-only">
                    {product.name} - Product image {index + 1}
                  </figcaption>
                </figure>
              ))}
          </div>

          {/* PRODUCT INFORMATION */}
          <div className="flex flex-col lg:sticky lg:top-28 lg:self-start">
            <span className="text-primary mb-5 text-[11px] font-semibold tracking-[0.25em] uppercase">
              NUOVÉ / {product.category}
            </span>

            <h1 className="font-heading text-primary text-[clamp(3.5rem,5vw,6rem)] leading-[0.95]">
              {product.name}
            </h1>

            {/* PRICE */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-primary text-xl font-medium">
                {formatPrice(product.price)}
              </span>

              {product.compareAtPrice > product.price && (
                <span className="text-text/40 text-base line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            {/* DIVIDER */}
            <div className="my-8 h-px bg-black/10" />

            {/* DESCRIPTION */}
            <p className="text-text/70 max-w-[500px] text-sm leading-[2] sm:text-base">
              {product.description}
            </p>

            {/* STOCK */}
            <div className="mt-8 flex items-center gap-2 text-sm">
              {product.available ? (
                <>
                  <Check size={17} className="text-primary" />
                  <span className="text-primary">In Stock</span>
                </>
              ) : (
                <span className="text-text/50">Sold Out</span>
              )}
            </div>

            {/* CART PLACEHOLDER */}
            <div className="mt-8 max-w-[440px]">
              <PrimaryButton disabled className="w-full">
                Add to Bag — Coming Soon
              </PrimaryButton>
            </div>

            <p className="text-text/50 mt-4 text-xs">
              Shopping cart functionality will be connected in the next
              development stage.
            </p>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 border-t border-black/10 pt-16 lg:mt-32">
            <div className="mb-12">
              <span className="text-primary mb-4 block text-[11px] font-semibold tracking-[0.2em] uppercase">
                Discover More
              </span>

              <h2 className="font-heading text-primary text-[clamp(2.8rem,4vw,4.5rem)] leading-none">
                You May Also <span className="italic">Love.</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
