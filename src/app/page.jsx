import Bestsellers from "@/components/Bestsellers";
import BrandIntroduction from "@/components/BrandIntroduction";
import BuildYourRoutine from "@/components/BuildYourRoutine";
import CustomerReviews from "@/components/CustomerReviews";
import V3Newsletter from "@/components/V3Newsletter";
import FeaturedProductSpotlight from "@/components/FeaturedProductSpotlight";
import Hero from "@/components/Hero";
import ShopByConcern from "@/components/ShopByConcern";
import WhyNuove from "@/components/WhyNuove";
import ScienceBehindRitual from "@/components/ScienceBehindRitual";
import RitualBundles from "@/components/RitualBundles";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />

      <ShopByConcern />

      <BrandIntroduction />

      <Bestsellers />

      <ScienceBehindRitual />

      <BuildYourRoutine />

      <WhyNuove />

      <RitualBundles />

      <FeaturedProductSpotlight />

      <CustomerReviews />

      <V3Newsletter />
    </main>
  );
}
