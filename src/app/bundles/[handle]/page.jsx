import { notFound } from "next/navigation";
import BundleDetail from "@/components/BundleDetail";
import { bundles, getBundleByHandle } from "@/data/bundles";

export function generateStaticParams() {
  return bundles
    .filter((bundle) => bundle.published)
    .map((bundle) => ({ handle: bundle.handle }));
}

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const bundle = getBundleByHandle(handle);
  return {
    title: bundle ? `${bundle.name} | NUOVÉ` : "Bundle Not Found | NUOVÉ",
    description: bundle?.description,
  };
}

export default async function BundlePage({ params }) {
  const { handle } = await params;
  const bundle = getBundleByHandle(handle);
  if (!bundle) notFound();
  return <BundleDetail bundle={bundle} />;
}
