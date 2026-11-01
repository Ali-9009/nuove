"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!agreed) {
      setStatus("error");
      setMessage("Please agree to receive NUOVÉ emails.");
      return;
    }

    setStatus("loading");
    setMessage("");

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

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      setStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail("");
      setAgreed(false);
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className="px-4 md:px-6"
    >
      <div className="relative mx-auto max-w-360 overflow-hidden rounded-3xl bg-[linear-gradient(110deg,#DDF1F5_0%,#F7F9F7_50%,#F2EDE5_100%)] px-5 py-12 sm:px-8 md:py-18">
        {/* SOFT BACKGROUND GLOW */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full bg-[#B9E1E9]/30 blur-[100px]" />

        <div className="pointer-events-none absolute -right-20 -bottom-40 h-[450px] w-[450px] rounded-full bg-[#F3DCC6]/30 blur-[110px]" />

        {/* CONTENT */}
        <div className="relative z-10 mx-auto flex w-full max-w-[800px] flex-col items-center gap-10 text-center">
          {/* CENTER CONTENT */}
          <div className="flex flex-col items-center text-center">
            <h2
              id="newsletter-heading"
              className="font-heading text-primary mt-5 text-[clamp(3rem,5.5vw,6rem)] leading-[0.95] tracking-[-0.035em]"
            >
              Your Invitation to
              <br />
              <span className="text-[#6F9FB4] italic">Elevated Skincare.</span>
            </h2>

            <p className="text-primary/65 mt-6 max-w-[520px] font-sans text-[17px] leading-[1.75]">
              Discover new formulas, skincare rituals, and exclusive updates.
            </p>
          </div>

          {/* CENTER FORM */}
          <div className="w-full max-w-[580px] min-w-0">
            <form onSubmit={handleSubmit} className="w-full">
              {/* EMAIL INPUT */}
              <div className="focus-within:border-primary/30 focus-within:ring-primary/5 flex w-full min-w-0 items-center gap-2 rounded-full border border-white/80 bg-white/90 p-1.5 pl-4 shadow-[0_12px_40px_rgba(6,48,74,0.06)] transition-all duration-300 focus-within:ring-4 sm:pl-5">
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);

                    if (status !== "loading") {
                      setStatus("idle");
                      setMessage("");
                    }
                  }}
                  required
                  className="text-primary placeholder:text-primary/40 w-0 min-w-0 flex-1 bg-transparent font-sans text-[16px] outline-none"
                />

                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-label={
                    status === "loading" ? "Subscribing" : "Subscribe"
                  }
                  className="group bg-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-sans text-[15px] font-medium text-white transition-colors duration-300 hover:bg-[#0A4968] disabled:cursor-wait disabled:opacity-60 sm:h-[52px] sm:w-auto sm:gap-3 sm:py-1 sm:pr-1 sm:pl-5"
                >
                  <span className="hidden sm:inline">
                    {status === "loading" ? "Joining..." : "Subscribe"}
                  </span>

                  <span className="text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D9EDF3]">
                    {status === "loading" ? (
                      <span className="border-primary/20 border-t-primary h-4 w-4 animate-spin rounded-full border-2" />
                    ) : status === "success" ? (
                      <Check size={19} />
                    ) : (
                      <ArrowUpRight
                        size={19}
                        strokeWidth={1.5}
                        className="transition-transform duration-300 group-hover:rotate-45"
                      />
                    )}
                  </span>
                </button>
              </div>

              {/* CONSENT */}
              <label className="mt-5 flex cursor-pointer items-start justify-center gap-3 text-left">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                  className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-[#06304A]"
                />

                <span className="text-primary/65 font-sans text-[14px] leading-[1.7]">
                  I agree to receive NUOVÉ emails.{" "}
                  <Link
                    href="/pages/privacy-policy"
                    className="text-primary font-medium underline underline-offset-4"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {/* FEEDBACK */}
              {message && (
                <p
                  role="status"
                  className={`mt-4 font-sans text-[15px] ${
                    status === "success" ? "text-green-700" : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
