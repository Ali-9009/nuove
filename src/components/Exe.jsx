'use client';

import Image from 'next/image';
import Link from 'next/link';

const POINTS = [
  {
    number: '01',
    title: 'Signal peptides',
    description:
      "may help support the skin's natural renewal processes, but results vary by formulation and delivery system.",
  },
  {
    number: '02',
    title: 'Carrier peptides',
    description:
      'can assist in transporting trace elements, yet clinical evidence depends on concentration and stability.',
  },
  {
    number: '03',
    title: 'Neurotransmitter peptides',
    description:
      'are often used for expression lines, though efficacy varies and is not equivalent across all products.',
  },
];

export default function Exe() {
  return (
    <section
      aria-label="The power of peptides in skincare"
      className="mx-auto my-8 w-full max-w-7xl rounded-[32px] bg-white px-6 py-10 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.04),0_8px_24px_-6px_rgba(0,0,0,0.02)] sm:px-10 md:my-12 md:px-12 md:py-14 lg:my-16 lg:px-14"
    >
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-x-14 md:gap-y-12 lg:gap-x-16">
        {/* ── LEFT: premium editorial imagery ── */}
        <div className="group relative aspect-square overflow-hidden rounded-3xl bg-[#f4f0eb] shadow-[0_12px_30px_-12px_rgba(0,0,0,0.1)] md:aspect-[4/5]">
          {/* <Image
            src="https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1200&auto=format&fit=crop"
            alt="Premium skincare editorial – serum bottle with soft light and shadows"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          /> */}
          {/* subtle premium overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent"
          />
        </div>

        {/* ── RIGHT: educational content ── */}
        <div className="flex flex-col pt-1">
          {/* eyebrow */}
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#b89b7b]">
            The power of peptides
          </p>

          {/* headline */}
          <h2 className="mb-6 font-serif text-4xl font-normal leading-[1.15] tracking-tight text-[#1a1a1a] sm:text-5xl lg:text-[3rem]">
            The Science
            <br />
            Behind the <em className="italic text-[#a8886a]">Ritual.</em>
          </h2>

          {/* supporting copy */}
          <p className="mb-8 max-w-[90%] text-base font-light leading-relaxed text-[#4a4a4a] max-md:max-w-full">
            Peptides are short chains of amino acids that can support specific cosmetic
            skin benefits. Their effect depends on type, concentration, formulation,
            and available evidence — not every peptide behaves the same.
          </p>

          {/* three educational points */}
          <ul className="mb-10 flex flex-col gap-6">
            {POINTS.map((point) => (
              <li key={point.number} className="flex items-start gap-4">
                <span className="min-w-7 font-serif text-xl font-normal leading-snug text-[#b89b7b]">
                  {point.number}
                </span>
                <p className="text-[0.95rem] font-[350] leading-relaxed text-[#2e2e2e]">
                  <strong className="font-medium text-[#1a1a1a]">
                    {point.title}
                  </strong>{' '}
                  {point.description}
                </p>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href="/ingredients"
            className="group/cta inline-flex w-fit items-center justify-center rounded-full border-[1.5px] border-[#d9cfc4] bg-transparent px-10 py-[1.1rem] text-[0.85rem] font-medium uppercase tracking-[0.12em] text-[#2a2a2a] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b89b7b] hover:bg-[#f5efe8] hover:shadow-[0_8px_20px_-10px_rgba(0,0,0,0.1)] max-md:w-full"
            aria-label="Explore our ingredients"
          >
            Explore Our Ingredients
            <svg
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-3 h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1"
            >
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {/* transparency note */}
          <p className="mt-7 max-w-[90%] text-[0.7rem] font-light leading-relaxed tracking-wide text-[#a8a8a8] max-md:max-w-full">
            * Not all peptides produce identical benefits. Our formulations vary;
            clinical results are not guaranteed for every product. Always refer
            to individual product information.
          </p>
        </div>
      </div>
    </section>
  );
}