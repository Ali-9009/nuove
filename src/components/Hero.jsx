// "use client";

// import { useEffect, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowUpRight, ArrowRight } from "lucide-react";

// import { getProductByHandle, formatPrice } from "@/data/products";

// export default function Hero() {
//   const videoRef = useRef(null);

//   const featuredProduct = getProductByHandle("barrier-peptide-serum");

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

//     if (reducedMotion.matches) {
//       video.pause();
//     }
//   }, []);

//   return (
//     <section aria-labelledby="hero-heading" className="mt-12 px-4 md:px-6 pb-3 sm:pb-4">
//       <div className="relative isolate mx-auto min-h-140 overflow-hidden rounded-2xl bg-[#283B40] sm:min-h-145 lg:min-h-155">
//         {/* BACKGROUND VIDEO */}
//         <div className="absolute inset-0 -z-10">
//           <video
//             ref={videoRef}
//             autoPlay
//             muted
//             loop
//             playsInline
//             preload="metadata"
//             aria-hidden="true"
//             className="h-full w-full object-cover object-center"
//           >
//             <source src="/assets/nuove-hero.mp4" type="video/mp4" />
//           </video>
//           {/* OVERLAY */}
//           <div className="absolute inset-0 bg-linear-to-r from-[#071C26]/50 via-[#071C26]/15 to-transparent" />{" "}
//         </div>

//         {/* CONTENT */}
//         <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1600px] flex-col justify-center px-6 py-14 sm:min-h-145 sm:px-10 lg:min-h-[620px] lg:px-16 xl:px-20">
//           {/* LEFT CONTENT */}
//           <div className="max-w-162.5">
//             <div className="mb-5 flex items-center gap-3">
//               <span className="h-px w-7 bg-white/60" />

//               <span className="text-[10px] font-semibold tracking-[0.2em] text-white/80 uppercase">
//                 The Art of Elevated Skincare
//               </span>
//             </div>

//             <h1
//               id="hero-heading"
//               className="font-heading text-[clamp(3.8rem,5.5vw,6rem)] leading-[0.85] tracking-[-0.04em] text-white"
//             >
//               Elevated <span className="italic">Skincare.</span>
//               <span className="mt-3 block text-[#D0E3E5]">
//                 Powered by
//                 <br />
//                 Peptides.
//               </span>
//             </h1>

//             <p className="text-md mt-6 max-w-100 leading-[1.8] text-white/85">
//               Thoughtfully developed skincare designed to hydrate, restore, and
//               support healthier-looking skin.
//             </p>

//             <div className="mt-7 flex flex-wrap gap-3">
//               <Link
//                 href="/collections/all"
//                 className="group text-primary text-md inline-flex min-h-12 items-center gap-6 rounded-full bg-white py-1 pr-1 pl-6 font-semibold transition-colors hover:bg-[#E8F0F0]"
//               >
//                 Shop NUOVÉ
//                 <span className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:rotate-45">
//                   <ArrowUpRight size={17} />
//                 </span>
//               </Link>

//               <Link
//                 href="/pages/our-story"
//                 className="group text-md inline-flex min-h-12 items-center gap-2 rounded-full border border-white/50 px-6 text-white transition-colors hover:bg-white/10"
//               >
//                 Discover Our Philosophy
//                 <ArrowRight
//                   size={15}
//                   className="transition-transform group-hover:translate-x-1"
//                 />
//               </Link>
//             </div>
//           </div>

//           {/* FEATURED PRODUCT — BOTTOM RIGHT */}
//           {featuredProduct && (
//             <Link
//               href={`/products/${featuredProduct.handle}`}
//               className="group relative mt-8 flex w-full max-w-[270px] flex-col self-center overflow-hidden rounded-2xl border border-white/30 bg-white/15 p-2.5 text-white shadow-[0_15px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300 hover:bg-white/25 sm:absolute sm:right-10 sm:bottom-8 sm:mt-0 sm:w-[280px] sm:self-auto lg:right-12 lg:bottom-10"
//             >
//               {/* IMAGE ON TOP */}
//               <div className="relative h-36 w-full overflow-hidden rounded-xl bg-white">
//                 <Image
//                   src={featuredProduct.image}
//                   alt={featuredProduct.name}
//                   fill
//                   sizes="280px"
//                   className="object-contain transition-transform duration-500 group-hover:scale-105"
//                 />

//                 {/* SOFT BOTTOM-TO-TOP OVERLAY */}
//                 <div className="from-primary/25 via-primary/5 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />
//               </div>

//               {/* DETAILS */}
//               <div className="relative px-2 pt-4 pb-2 font-sans">
//                 <span className="mb-2 block text-[13px] font-medium text-white/70">
//                   Featured Product
//                 </span>

//                 <h3 className="pr-8 font-sans text-[17px] leading-[1.4] font-semibold text-white">
//                   {featuredProduct.name}
//                 </h3>

//                 <div className="mt-2 flex items-center gap-3">
//                   {featuredProduct.size && (
//                     <span className="text-[14px] text-white/70">
//                       {featuredProduct.size}
//                     </span>
//                   )}

//                   <span className="text-[15px] font-semibold text-white">
//                     {formatPrice(featuredProduct.price)}
//                   </span>
//                 </div>

//                 {/* ARROW */}
//                 <span className="text-primary absolute right-1 bottom-1 flex h-9 w-9 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:rotate-45">
//                   <ArrowUpRight size={17} strokeWidth={1.5} />
//                 </span>
//               </div>
//             </Link>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { getProductByHandle, formatPrice } from "@/data/products";

export default function Hero() {
  const product = getProductByHandle("barrier-peptide-serum");

  return (
    <section
      aria-labelledby="skincare-editorial-heading"
      className="mt-12 px-4 py-6 md:px-6 lg:py-10"
    >
      <div className="relative mx-auto min-h-[80svh] max-w-360 overflow-hidden rounded-3xl bg-[#E7EBE8] shadow-[0_15px_45px_rgba(0,0,0,0.12)] lg:min-h-[90svh]">
        {" "}
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <Image
            src="/assets/nuove-banner.png"
            alt="Close-up editorial skincare portrait"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_35%] sm:object-center"
          />
        </div>
        {/* SOFT OVERLAY */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(9,27,32,0.35)_0%,transparent_48%)]" />
        {/* HERO CONTENT */}
        <div className="relative z-10 flex min-h-[80svh] flex-col justify-between gap-8 px-5 py-6 sm:px-8 sm:py-8 lg:min-h-[90svh] lg:px-12 lg:py-12">
          {/* BOTTOM CONTENT */}
          <div className="mt-auto flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
            {/* LEFT HEADING */}
            <div className="max-w-full rounded-[20px] border border-white/25 bg-white/20 px-5 py-4 shadow-[0_15px_40px_rgba(0,0,0,0.06)] backdrop-blur-lg lg:px-7 lg:py-5">
              <h2
                id="skincare-editorial-heading"
                className="font-heading text-[clamp(2.5rem,4vw,5rem)] leading-[0.9] tracking-[-0.035em] text-white"
              >
                Elevated Skincare. <br /> Powered by Peptides.
              </h2>
            </div>

            {/* RIGHT — LABELS + PRODUCT */}
            <div className="flex w-full max-w-66 flex-col gap-3 self-center sm:max-w-71 sm:self-auto">
              {/* LABELS ABOVE PRODUCT */}
              {/* <div className="flex items-center justify-start gap-2">
                <span className="rounded-full border border-white/60 bg-white/35 px-4 py-2 font-sans text-[14px] font-medium text-white backdrop-blur-xl">
                  Skincare
                </span>

                <span className="rounded-full border border-white/60 bg-white/35 px-4 py-2 font-sans text-[14px] font-medium text-white backdrop-blur-xl">
                  Body Care
                </span>
              </div> */}

              {/* PRODUCT CARD */}
              {product && (
                <Link
                  href={`/products/${product.handle}`}
                  className="group relative flex w-full flex-col overflow-hidden rounded-[22px] border border-white/25 bg-white/20 p-2 shadow-[0_15px_45px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* PRODUCT DETAILS */}
                  <div className="flex items-start justify-between gap-3 px-2 py-2 font-sans">
                    <div className="min-w-0">
                      <p className="text-sm text-primary">
                        Featured Skincare
                      </p>

                      <h3 className="text-primary mt-1 font-sans text-[17px] leading-[1.3] font-semibold">
                        {product.name}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-white/80">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    <span className="border-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-white transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight size={19} strokeWidth={1.5} />
                    </span>
                  </div>

                  {/* PRODUCT IMAGE */}
                  <div className="relative mt-2 h-36 w-full overflow-hidden rounded-2xl bg-white">
                    <Image
                      src="/assets/barrier-peptide-serum.jpg"
                      alt={product.name}
                      fill
                      sizes="285px"
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
