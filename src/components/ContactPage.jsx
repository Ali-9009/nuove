"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  ChevronDown,
  Mail,
  MessageCircle,
  Clock3,
  Sparkles,
  Instagram,
  MapPin,
} from "lucide-react";

const topics = [
  "Product inquiry",
  "Order support",
  "Shipping & returns",
  "Routine guidance",
  "Partnerships",
  "Other",
];

const faqs = [
  {
    question: "Where can I find product details?",
    answer:
      "Explore each product page for its description, listed ingredients, and usage guidance. Please refer to the product label for the final approved instructions.",
  },
  {
    question: "How do I ask about an order?",
    answer:
      "Select Order support and include your order number in your message. Please don't include payment card details or passwords.",
  },
  {
    question: "Can you help me choose a skincare routine?",
    answer:
      "You can browse our curated routines or send us a question about the products. We cannot diagnose skin conditions or offer medical advice.",
  },
];

function Field({ label, id, required = false, children }) {
  return (
    <div className="space-y-2.5">
      <label
        htmlFor={id}
        className="text-primary/70 block font-sans text-[12px] font-semibold tracking-[0.12em] uppercase"
      >
        {label}
        {required && (
          <span className="ml-1 text-[#789BA9]" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full min-h-13 rounded-[14px] border border-[#D9E6E8] bg-[#FCFDFD] px-4 py-3 font-sans text-[14px] text-primary placeholder:text-primary/35 outline-none transition-all duration-300 focus:border-[#7EA9B8] focus:ring-4 focus:ring-[#7EA9B8]/10";

export default function ContactPage() {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [sending, setSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setSending(true);
    setStatus({ type: "idle", message: "" });
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success)
        throw new Error(
          result.message || "We couldn't send your message. Please try again.",
        );
      setStatus({
        type: "success",
        message: "Your message has been sent. Thank you for reaching out.",
      });
      form.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="text-primary min-h-screen bg-[#FCFBF9]">
      <section className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#EFF7F8_0%,#F8F8F5_54%,#E4F0F2_100%)] px-4 pt-28 pb-18 sm:pb-24 md:px-6 lg:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-60 -right-24 size-[620px] rounded-full border border-white/60 sm:-right-4"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-12 -right-2 size-[350px] rounded-full border border-white/70 sm:size-[500px]"
        />
        <div className="relative mx-auto grid max-w-360 items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 font-sans text-[12px] font-semibold tracking-[0.18em] text-[#6999AD] uppercase">
              <Sparkles size={15} strokeWidth={1.5} /> A Conversation Begins
              Here
            </span>
            <h1 className="font-heading mt-6 max-w-[850px] text-[clamp(4.2rem,8vw,8.5rem)] leading-[0.86] font-normal tracking-[-0.055em]">
              We'd love to{" "}
              <span className="text-[#759FAD] italic">hear from you.</span>
            </h1>
            <p className="text-primary/65 mt-8 max-w-[570px] font-sans text-[15px] leading-[1.95] sm:text-[17px]">
              Questions about a product, your order, or your skincare ritual?
              Our team welcomes your message. Share a few details, and we'll
              help point you in the right direction.
            </p>
            <a
              href="#contact-form"
              className="group bg-primary mt-9 inline-flex min-h-14 items-center gap-5 rounded-full py-1.5 pr-1.5 pl-7 font-sans text-[14px] font-semibold text-white transition-all hover:bg-[#0A4968]"
            >
              Write to Us{" "}
              <span className="text-primary flex size-11 items-center justify-center rounded-full bg-[#D8EDF3] transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight size={19} strokeWidth={1.5} />
              </span>
            </a>
          </div>
          <figure className="relative mx-auto aspect-[4/4.6] w-full max-w-[435px] overflow-hidden rounded-[28px] border border-white/65 bg-[#EAF3F3] shadow-[0_24px_70px_rgba(6,48,74,0.08)] sm:aspect-[5/4.7] lg:aspect-[4/5]">
            <Image
              src="/assets/our-story.jpg"
              alt="NUOVÉ editorial skincare imagery"
              fill
              priority
              sizes="(max-width:1024px) 90vw, 34vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#062F47]/55 via-transparent to-white/10" />
            <figcaption className="absolute right-6 bottom-6 left-6 flex items-center justify-between gap-4 text-white sm:bottom-8 sm:left-8">
              <div>
                <span className="font-sans text-[10px] tracking-[0.2em] text-white/75 uppercase">
                  NUOVÉ
                </span>
                <p className="font-heading mt-2 text-[30px] leading-none italic sm:text-[37px]">
                  Every detail matters.
                </p>
              </div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/15 backdrop-blur-md">
                <ArrowUpRight size={19} />
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="px-5 py-18 sm:px-8 lg:py-28" id="contact-form">
        <div className="mx-auto grid max-w-360 items-start gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16 xl:gap-24">
          <aside className="lg:sticky lg:top-32">
            <span className="font-sans text-[12px] font-semibold tracking-[0.17em] text-[#6999AD] uppercase">
              Get in Touch
            </span>
            <h2 className="font-heading mt-4 text-[clamp(2.8rem,4.5vw,4.6rem)] leading-[0.99]">
              A little note{" "}
              <span className="text-[#759FAD] italic">goes a long way.</span>
            </h2>
            <p className="text-primary/60 mt-6 max-w-[420px] font-sans text-[15px] leading-[1.9]">
              Choose a topic and tell us what you'd like to know. We're here for
              product questions, order help, and thoughtful conversations about
              NUOVÉ.
            </p>
            <div className="mt-10 space-y-3">
              <article className="group border-primary/8 flex items-start gap-4 rounded-[22px] border bg-[linear-gradient(120deg,#EDF5F6,#F9FAF8)] p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(6,48,74,0.06)]">
                <span className="text-primary flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <MessageCircle size={20} strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-sans text-[15px] font-semibold">
                    Product & routine questions
                  </h3>
                  <p className="text-primary/60 mt-1.5 font-sans text-[13px] leading-[1.7]">
                    Get in touch about product details or building your routine.
                  </p>
                </div>
              </article>
              <article className="group border-primary/8 flex items-start gap-4 rounded-[22px] border bg-[linear-gradient(120deg,#F7F8F6,#EEF5F7)] p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(6,48,74,0.06)]">
                <span className="text-primary flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <Mail size={20} strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-sans text-[15px] font-semibold">
                    Order support
                  </h3>
                  <p className="text-primary/60 mt-1.5 font-sans text-[13px] leading-[1.7]">
                    Send us your order number and we'll help with your inquiry.
                  </p>
                </div>
              </article>
              <article className="group border-primary/8 flex items-start gap-4 rounded-[22px] border bg-[linear-gradient(120deg,#EDF5F6,#F9FAF8)] p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(6,48,74,0.06)]">
                <span className="text-primary flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <Clock3 size={20} strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-sans text-[15px] font-semibold">
                    Thoughtful replies
                  </h3>
                  <p className="text-primary/60 mt-1.5 font-sans text-[13px] leading-[1.7]">
                    We'll respond as soon as our support team can.
                  </p>
                </div>
              </article>
            </div>
            <p className="text-primary/45 mt-7 font-sans text-[12px] leading-[1.7]">
              For your security, please don't include payment information,
              passwords, or other sensitive details.
            </p>
          </aside>

          <div className="border-primary/10 rounded-[28px] border bg-white p-5 shadow-[0_24px_75px_rgba(6,48,74,0.055)] sm:rounded-[36px] sm:p-9 lg:p-11 xl:p-13">
            <div className="border-primary/10 mb-8 flex flex-wrap items-start justify-between gap-4 border-b pb-7">
              <div>
                <p className="font-sans text-[11px] font-semibold tracking-[0.17em] text-[#6999AD] uppercase">
                  Contact Form
                </p>
                <h2 className="font-heading mt-3 text-[35px] leading-none sm:text-[45px]">
                  Send us a message<span className="text-[#81A9B5]">.</span>
                </h2>
              </div>
              <span className="text-primary inline-flex size-12 items-center justify-center rounded-2xl bg-[#E8F3F5]">
                <ArrowUpRight size={23} strokeWidth={1.4} />
              </span>
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              noValidate={false}
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Full name" id="contact-name" required>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={120}
                    required
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </Field>
                <Field label="Email address" id="contact-email" required>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </Field>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Order number" id="contact-order">
                  <input
                    id="contact-order"
                    name="orderNumber"
                    type="text"
                    maxLength={80}
                    placeholder="Optional"
                    className={inputClass}
                  />
                </Field>
                <Field label="How can we help?" id="contact-topic" required>
                  <div className="relative">
                    <select
                      id="contact-topic"
                      name="topic"
                      required
                      defaultValue=""
                      className={`${inputClass} appearance-none pr-11`}
                    >
                      <option value="" disabled>
                        Select a topic
                      </option>
                      {topics.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="text-primary/50 pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
                      size={17}
                    />
                  </div>
                </Field>
              </div>
              <Field label="Your message" id="contact-message" required>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={7}
                  placeholder="Tell us a little more..."
                  className={`${inputClass} min-h-[170px] resize-y`}
                />
              </Field>
              <div className="flex items-start gap-3">
                <input
                  id="contact-privacy"
                  name="privacyAcknowledged"
                  value="yes"
                  type="checkbox"
                  required
                  className="mt-1 size-4 shrink-0 accent-[#06304A]"
                />
                <label
                  htmlFor="contact-privacy"
                  className="text-primary/60 font-sans text-[12px] leading-[1.8]"
                >
                  I understand my information will be used to respond to this
                  inquiry. See the{" "}
                  <Link
                    href="/pages/privacy-policy"
                    className="text-primary font-medium underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>
              <div role="status" aria-live="polite">
                {status.type !== "idle" && (
                  <p
                    className={`rounded-xl px-4 py-3 font-sans text-[13px] ${status.type === "success" ? "bg-emerald-50 text-emerald-900" : "bg-rose-50 text-rose-900"}`}
                  >
                    {status.message}
                  </p>
                )}
              </div>
              <button
                disabled={sending}
                type="submit"
                className="group bg-primary flex min-h-[58px] w-full items-center justify-between gap-5 rounded-full py-1.5 pr-1.5 pl-7 font-sans text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#0A4968] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[235px]"
              >
                <span>{sending ? "Sending..." : "Send Message"}</span>
                <span className="text-primary flex size-11 items-center justify-center rounded-full bg-[#D8EDF3] transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={20} strokeWidth={1.5} />
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(115deg,#EDF5F7,#F8F8F5)] px-5 py-18 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-360 items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="font-sans text-[12px] font-semibold tracking-[0.17em] text-[#6999AD] uppercase">
              A Little More Clarity
            </p>
            <h2 className="font-heading mt-4 text-[clamp(2.8rem,4.8vw,4.5rem)] leading-[1.05]">
              Frequently asked{" "}
              <span className="text-[#759FAD] italic">questions.</span>
            </h2>
            <p className="text-primary/60 mt-5 max-w-[360px] font-sans text-[14px] leading-[1.9]">
              A few answers before you write. Need something else? We'd love to
              hear from you.
            </p>
          </div>
          <div className="border-primary/10 rounded-[24px] border bg-white/70 px-6 py-2 sm:px-9">
            {faqs.map((faq, i) => (
              <details
                key={faq.question}
                className="group border-primary/10 border-b py-6 last:border-b-0"
              >
                <summary className="text-primary flex cursor-pointer list-none items-center justify-between gap-4 font-sans text-[14px] font-semibold sm:text-[16px] [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#EAF3F5] transition-transform duration-300 group-open:rotate-180">
                    <ChevronDown size={17} />
                  </span>
                </summary>
                <p className="text-primary/65 max-w-[640px] pt-4 font-sans text-[14px] leading-[1.85]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="px-5 py-16 sm:px-8 lg:py-22">
        <div className="bg-primary mx-auto flex max-w-360 flex-col items-start justify-between gap-6 rounded-[28px] px-7 py-10 text-white sm:px-12 lg:flex-row lg:items-center lg:py-14">
          <div>
            <span className="font-sans text-[11px] tracking-[0.2em] text-[#B9D9E2] uppercase">
              Continue Exploring
            </span>
            <h2 className="font-heading mt-3 text-[clamp(2.3rem,4vw,4rem)] leading-none">
              Discover your{" "}
              <span className="text-[#B9D9E2] italic">NUOVÉ ritual.</span>
            </h2>
          </div>
          <Link
            href="/collections/all"
            className="group text-primary inline-flex min-h-13 items-center gap-4 rounded-full bg-[#E4F1F5] px-6 font-sans text-[14px] font-semibold transition-colors hover:bg-white"
          >
            Explore the Collection{" "}
            <ArrowUpRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
