"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function EmailSignup() {
  const sectionRef = useRef(null);

  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".newsletter-reveal", {
          y: 45,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });

        gsap.to(".newsletter-orbit", {
          rotation: 360,
          duration: 50,
          repeat: -1,
          ease: "none",
        });

        gsap.to(".newsletter-float", {
          y: -18,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    setMessage("");
    setSuccess(false);

    if (!consent) {
      setMessage("Please agree to receive NUOVÉ marketing emails.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          consent: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to subscribe. Please try again.",
        );
      }

      setSuccess(true);
      setMessage(
        "Thank you! Please check your inbox for any confirmation steps.",
      );

      setEmail("");
      setConsent(false);
    } catch (error) {
      setMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="newsletter-heading"
     className="relative mx-3 my-12 max-w-390 overflow-hidden rounded-2xl bg-primary sm:mx-6 lg:mx-auto"
    >
      <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
        {/* MAIN INVITATION PANEL */}
        <div className="relative isolate overflow-hidden text-white">
          {/* DECORATIVE BACKGROUND */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            {/* LARGE ROTATING ORBIT */}
            <div className="newsletter-orbit absolute -top-48 -right-48 h-[600px] w-[600px] rounded-full border border-white/10 lg:-top-28 lg:-right-28 lg:h-[750px] lg:w-[750px]">
              <div className="absolute inset-14 rounded-full border border-white/10" />

              <div className="absolute inset-32 rounded-full border border-white/10" />

              <span className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white/50" />
            </div>

            {/* FLOATING SYMBOL */}
            <div className="newsletter-float absolute right-[10%] bottom-[12%] hidden lg:block">
              <Sparkles size={42} strokeWidth={0.8} className="text-white/30" />
            </div>

            {/* BACKGROUND WORD */}
            <span className="font-heading absolute -bottom-12 left-1/2 -translate-x-1/2 text-[clamp(9rem,20vw,20rem)] leading-none tracking-[-0.07em] whitespace-nowrap text-white/[0.035]">
              NUOVÉ
            </span>

            {/* CORNER DETAILS */}
            <span className="absolute top-7 left-7 h-8 w-8 border-t border-l border-white/25 sm:top-10 sm:left-10" />

            <span className="absolute right-7 bottom-7 h-8 w-8 border-r border-b border-white/25 sm:right-10 sm:bottom-10" />
          </div>

          {/* CONTENT */}
          <div className="relative z-10 grid gap-14 px-7 py-16 sm:px-12 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20 lg:px-16 lg:py-28 xl:px-20">
            {/* LEFT — EDITORIAL MESSAGE */}
            <div>
              <div className="newsletter-reveal mb-8 flex items-center gap-4">
                <span className="h-px w-9 bg-white/50" />

                <span className="text-[10px] font-semibold tracking-[0.25em] text-white/70 uppercase">
                  An Invitation From NUOVÉ
                </span>
              </div>

              <h2
                id="newsletter-heading"
                className="newsletter-reveal font-heading max-w-[680px] text-[clamp(3.7rem,5.8vw,6.5rem)] leading-[0.95] font-normal tracking-[-0.035em]"
              >
                Your Invitation
                <br />
                to <span className="text-[#E8DFD1] italic">Elevated</span>
                <br />
                <span className="text-[#E8DFD1] italic">Skincare.</span>
              </h2>

              <p className="newsletter-reveal mt-8 max-w-[490px] text-sm leading-[1.95] text-white/65 sm:text-[15px]">
                Discover new formulations, skincare education, exclusive
                launches, and curated NUOVÉ routines.
              </p>
            </div>

            {/* RIGHT — NEWSLETTER FORM */}
            <div className="newsletter-reveal">
              <div className="border-t border-white/25 pt-8">
                <span className="font-heading mb-4 block text-[32px] leading-none text-white/90 italic sm:text-[38px]">
                  A little luxury, delivered.
                </span>

                <p className="mb-9 max-w-[370px] text-[13px] leading-[1.85] text-white/55">
                  Join the NUOVÉ mailing list for thoughtful skincare
                  inspiration and updates.
                </p>

                <form onSubmit={handleSubmit}>
                  <label
                    htmlFor="nuove-newsletter-email"
                    className="mb-3 block text-[10px] font-semibold tracking-[0.18em] text-white/70 uppercase"
                  >
                    Email Address
                  </label>

                  {/* PREMIUM INPUT */}
                  <div className="group flex items-center border-b border-white/50 transition-colors duration-300 focus-within:border-white">
                    <input
                      id="nuove-newsletter-email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      className="min-h-[66px] min-w-0 flex-1 bg-transparent py-4 pr-4 text-base text-white outline-none placeholder:text-white/40 disabled:opacity-50"
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      aria-label={
                        loading
                          ? "Submitting subscription"
                          : "Subscribe to NUOVÉ emails"
                      }
                      className="group/button text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white transition-all duration-300 hover:scale-105 hover:bg-[#E8DFD1] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ArrowUpRight
                        size={21}
                        strokeWidth={1.5}
                        className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                      />
                    </button>
                  </div>

                  {/* MARKETING CONSENT */}
                  <label className="mt-6 flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      disabled={loading}
                      className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-white"
                    />

                    <span className="text-[11px] leading-[1.85] text-white/60">
                      I agree to receive marketing emails from NUOVÉ about
                      products, launches, skincare education, and exclusive
                      offers. I can unsubscribe at any time.
                    </span>
                  </label>

                  {/* FEEDBACK */}
                  {message && (
                    <div
                      role={success ? "status" : "alert"}
                      className={`mt-5 flex items-start gap-2 text-[12px] leading-relaxed ${
                        success ? "text-white" : "text-amber-200"
                      }`}
                    >
                      {success && (
                        <CheckCircle2 size={17} className="shrink-0" />
                      )}

                      {message}
                    </div>
                  )}
                </form>

                {/* FOOTER DETAIL */}
                <div className="mt-10 flex items-center gap-3 border-t border-white/15 pt-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E8DFD1]" />

                  <span className="text-[10px] tracking-[0.16em] text-white/45 uppercase">
                    Thoughtfully Curated by NUOVÉ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SIGNATURE */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
          <span className="text-primary/45 text-[10px] tracking-[0.18em] uppercase">
            NUOVÉ — Skincare With Intention
          </span>

          <span className="text-primary/45 flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase">
            Discover More
            <ArrowRight size={13} strokeWidth={1.3} />
          </span>
        </div>
      </div>
    </section>
  );
}
