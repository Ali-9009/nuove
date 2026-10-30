const messages = [
  "THE ART OF SKINCARE",
  "DISCOVER NUOVÉ",
  "EXCLUSIVE OFFERS",
  "ELEVATE YOUR RITUAL",
];

function MarqueeTrack({ reverse = false }) {
  return (
    <div
      className={`flex w-max items-center ${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      }`}
      aria-hidden="true"
    >
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center">
          {messages.map((message) => (
            <div
              key={`${copy}-${message}`}
              className="flex shrink-0 items-center gap-8 px-8 md:gap-12 md:px-12"
            >
              <span className="whitespace-nowrap font-sans text-[12px] font-semibold uppercase tracking-[0.2em] md:text-[15px]">
                {message}
              </span>

              <span className="font-heading text-2xl leading-none md:text-3xl">
                ✦
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function SaleMarquee() {
  return (
    <section
      aria-label="NUOVÉ promotional highlights"
      className="relative flex h-[190px] w-full items-center justify-center overflow-hidden bg-white sm:h-[230px] lg:h-[290px]"
    >
      {/* Accessible text for screen readers */}
      <p className="sr-only">{messages.join(". ")}</p>

      {/* NAVY RIBBON */}
      <div className="absolute left-1/2 top-1/2 z-10 w-[125%] -translate-x-1/2 -translate-y-1/2 -rotate-[6deg] overflow-hidden bg-primary py-4 text-white sm:py-5 lg:-rotate-[5deg]">
        <MarqueeTrack />
      </div>

      {/* CHAMPAGNE RIBBON */}
      <div className="absolute left-1/2 top-1/2 z-20 w-[125%] -translate-x-1/2 -translate-y-1/2 rotate-[6deg] overflow-hidden bg-[#E8DFD1] py-4 text-primary sm:py-5 lg:rotate-[5deg]">
        <MarqueeTrack reverse />
      </div>
    </section>
  );
}