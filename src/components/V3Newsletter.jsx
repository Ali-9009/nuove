"use client";

import { useState } from "react";

export default function V3Newsletter() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setErr("Please enter a valid email address.");
    if (!consent) return setErr("Please confirm you would like to receive emails from NUOVÉ.");
    setErr("");
    setSent(true);
  };

  return (
    <section id="newsletter" className="px-3 lg:px-5 pt-10 lg:pt-16">
      <div
        className="relative overflow-hidden rounded-[24px] lg:rounded-[40px] px-6 py-16 text-center text-[#092D43] lg:px-16 lg:py-32"
        style={{ background: "radial-gradient(60% 80% at 15% 20%,#D8EDF3 0%,rgba(216,237,243,0) 70%),radial-gradient(50% 70% at 85% 30%,#BFE0EC 0%,rgba(191,224,236,0) 70%),radial-gradient(60% 60% at 50% 100%,#EAF6F8 0%,rgba(234,246,248,0) 70%),#F1EEE7" }}
      >
        <span className="inline-flex min-h-9 max-w-full flex-wrap items-center justify-center gap-2 rounded-full bg-[#F8F6F1]/80 py-1.5 pl-4 pr-1.5 text-[12px] sm:text-[13px]">
          Coming soon · Discovery &amp; Travel minis
          <span className="flex h-[26px] shrink-0 items-center whitespace-nowrap rounded-full bg-[#092D43] px-2.5 text-xs text-[#F8F6F1]">Join the list</span>
        </span>
        <h2 className="mx-auto mt-7 max-w-[1000px] text-[clamp(40px,5.6vw,96px)] font-light leading-none tracking-[-0.045em]">
          <span className="text-[#7FA3B5]">Your Invitation to</span>
          <br />
          Elevated Skincare.
        </h2>
        <p className="mx-auto mt-5 max-w-[460px] text-base leading-relaxed text-[#243039]">
          Ritual notes, new formulas and first word on future releases.
        </p>

        {sent ? (
          <p role="status" className="mt-8 text-[22px] font-light">Thank you — please check your inbox to confirm.</p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mx-auto mt-8 max-w-[520px] text-left">
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <div className="flex h-16 items-center gap-1.5 rounded-full bg-white pl-6 pr-1.5 shadow-[0_12px_40px_rgba(9,45,67,0.08)]">
              <input
                id="nl-email" type="email" autoComplete="email" value={email} placeholder="Your email address"
                onChange={(e) => { setEmail(e.target.value); setErr(""); }}
                className="h-full min-w-0 flex-1 bg-transparent text-base text-[#092D43] outline-none placeholder:text-[#5E6A72]"
              />
              <button type="submit" className="flex h-[52px] cursor-pointer items-center gap-2.5 rounded-full bg-[#092D43] pl-5 pr-1.5 text-sm font-medium text-[#F8F6F1] transition hover:bg-[#061E2D]">
                Subscribe
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D8EDF3] text-[#092D43]">↗</span>
              </button>
            </div>
            <label className="mx-3 mt-4 flex cursor-pointer items-start gap-2.5 text-[13px] leading-relaxed text-[#243039]">
              <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setErr(""); }} className="mt-px h-[18px] w-[18px] shrink-0 accent-[#092D43]" />
              <span>I agree to receive marketing emails from NUOVÉ and accept the <a href="/pages/privacy-policy" className="underline">Privacy Policy</a>. Unsubscribe at any time.</span>
            </label>
            {err && <p role="alert" className="mx-3 mt-2.5 text-[13px] font-semibold">{err}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
