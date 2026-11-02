import { notFound } from "next/navigation";
import CollectionCatalog from "@/components/CollectionCatalog";
import { products } from "@/data/products";
import {
  collections,
  getCollectionBySlug,
  getCollectionProducts,
} from "@/data/collections";

export function generateStaticParams() {
  return collections.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Collection Not Found | NUOVÉ" };
  return { title: collection.seoTitle, description: collection.description };
}

export default async function CollectionPage({ params }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();
  return (
    <CollectionCatalog
      collection={collection}
      products={getCollectionProducts(collection, products)}
    />
  );
}
