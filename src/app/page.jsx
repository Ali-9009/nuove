import Bestsellers from "@/components/Bestsellers";
import BrandIntroduction from "@/components/BrandIntroduction";
import BuildYourRoutine from "@/components/BuildYourRoutine";
import CustomerReviews from "@/components/CustomerReviews";
import EmailSignup from "@/components/EmailSignup";
import FeaturedProductSpotlight from "@/components/FeaturedProductSpotlight";
import PowerOfPeptides from "@/components/PowerOfPeptides";
import PrimaryButton from "@/components/PrimaryButton";
import SaleMarquee from "@/components/SaleMarquee";
import ShopByConcern from "@/components/ShopByConcern";
import WhyNuove from "@/components/WhyNuove";

const hero = [
  "/assets/peptide-serum-1.png",
  "/assets/peptide-serum-2.png",
  "/assets/peptide-serum-3.png",
  "/assets/peptide-serum-4.png",
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-360 overflow-hidden py-12 md:pt-0 md:pb-12">
        <div className="grid items-center gap-4 px-6 md:grid-cols-2">
          <div>
            <h1 className="text-primary text-[clamp(2.5rem,5vw,5rem)] leading-[0.95] lg:ml-38 lg:whitespace-nowrap">
              Elevated Skincare.
            </h1>

            <h1 className="text-primary text-[clamp(2.5rem,5vw,5rem)] leading-[0.95]">
              Powered by Peptides.
            </h1>
          </div>
          <div className="mt-2 md:mt-10 lg:mt-42">
            <p className="mb-4 max-w-md text-sm leading-relaxed text-gray-500 md:text-base">
              Thoughtfully developed skincare designed to hydrate, restore, and
              support healthier-looking skin.
            </p>
            <PrimaryButton href="/collections/all" arrow>
              Shop NUOVÉ​
            </PrimaryButton>
          </div>
        </div>

        <div className="mt-10 flex w-full items-center justify-center px-6 md:mt-14">
          <div className="flex w-full max-w-360 items-center justify-center">
            {hero.map((Logo, index) => (
              <img
                key={index}
                src={Logo}
                alt={`NUOVÉ Skincare ${index + 1}`}
                className={`relative h-auto w-[28%] object-contain ${index !== 0 ? "ml-[-5%]" : ""} `}
                style={{
                  zIndex: index + 1,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <SaleMarquee />

      {/* <BrandIntroduction /> */}

      <ShopByConcern />

      <Bestsellers />

      <PowerOfPeptides />

      <BuildYourRoutine />

      <FeaturedProductSpotlight />

      <WhyNuove />

      <CustomerReviews />

      <EmailSignup />
    </main>
  );
}

//  <h1 className="font-heading">Luxury Skincare</h1>
//       <p className="font-sans">Experience the art of beautiful skin.</p>
