import Bestsellers from "@/components/Bestsellers";
import BrandIntroduction from "@/components/BrandIntroduction";
import BuildYourRoutine from "@/components/BuildYourRoutine";
import CustomerReviews from "@/components/CustomerReviews";
import EmailSignup from "@/components/EmailSignup";
import FeaturedProductSpotlight from "@/components/FeaturedProductSpotlight";
import Hero from "@/components/Hero";
import PowerOfPeptides from "@/components/PowerOfPeptides";
import PrimaryButton from "@/components/PrimaryButton";
import SaleMarquee from "@/components/SaleMarquee";
import ShopByConcern from "@/components/ShopByConcern";
import WhyNuove from "@/components/WhyNuove";
import Exe from "@/components/Exe";
import ScienceBehindRitual from "@/components/ScienceBehindRitual";
import RitualBundles from "@/components/RitualBundles";

const hero = [
  "/assets/peptide-serum-1.png",
  "/assets/peptide-serum-2.png",
  "/assets/peptide-serum-3.png",
  "/assets/peptide-serum-4.png",
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />

      <ShopByConcern />

      <BrandIntroduction />

      <ScienceBehindRitual />

      <Bestsellers />

      {/* to be rm  */}
      {/* <PowerOfPeptides /> */}

      <BuildYourRoutine />

      <WhyNuove />

      <RitualBundles />

      <FeaturedProductSpotlight />

      <CustomerReviews />

      <EmailSignup />
    </main>
  );
}

//  <h1 className="font-heading">Luxury Skincare</h1>
//       <p className="font-sans">Experience the art of beautiful skin.</p>
