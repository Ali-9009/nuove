"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { quizDefaults, routineQuestions } from "@/data/routine-recommendations";

export default function RoutineQuiz() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(quizDefaults);
  const question = routineQuestions[current];
  const selected = answers[question.id];
  const isLast = current === routineQuestions.length - 1;

  function advance() {
    if (!selected) return;
    if (!isLast) {
      setCurrent((v) => v + 1);
      return;
    }
    const query = new URLSearchParams(answers).toString();
    router.push(`/find-your-routine/results?${query}`);
  }

  return (
    <main className="px-4 pt-28 pb-20 md:px-6 lg:pt-36">
      <div className="mx-auto max-w-260">
        <div className="text-primary/65 mb-8 flex flex-wrap items-center justify-between gap-4 font-sans text-[13px]">
          <Link
            href="/"
            className="hover:text-primary inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Back to NUOVÉ
          </Link>
          <span className="inline-flex items-center gap-2 tracking-[0.15em] uppercase">
            <Sparkles size={15} /> Find Your Routine
          </span>
        </div>
        <section
          aria-labelledby="quiz-heading"
          className="relative overflow-hidden rounded-[30px] border border-white/80 bg-white/75 px-5 py-9 shadow-[0_24px_90px_rgba(6,48,74,0.07)] backdrop-blur-xl sm:px-12 sm:py-12 lg:px-20 lg:py-16"
        >
          <div className="mb-12 flex items-center justify-between gap-4">
            <span className="font-sans text-[12px] font-semibold tracking-[0.16em] text-[#6999AD] uppercase">
              Your skincare journey
            </span>
            <span className="text-primary/60 font-sans text-[13px]">
              Step {String(current + 1).padStart(2, "0")} /{" "}
              {String(routineQuestions.length).padStart(2, "0")}
            </span>
          </div>
          <div
            role="progressbar"
            aria-label="Quiz progress"
            aria-valuenow={current + 1}
            aria-valuemin={1}
            aria-valuemax={routineQuestions.length}
            className="mb-12 h-1 overflow-hidden rounded-full bg-[#E3ECEF]"
          >
            <div
              className="bg-primary h-full rounded-full transition-[width] duration-500"
              style={{
                width: `${((current + 1) / routineQuestions.length) * 100}%`,
              }}
            />
          </div>
          <div
            key={question.id}
            className="animate-[routineIn_420ms_ease-out_both] motion-reduce:animate-none"
          >
            <span className="font-sans text-[13px] font-semibold tracking-[0.14em] text-[#6999AD] uppercase">
              {question.eyebrow}
            </span>
            <h1
              id="quiz-heading"
              className="font-heading text-primary mt-4 max-w-[720px] text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.04]"
            >
              {question.title}
            </h1>
            <fieldset className="mt-10 grid gap-3 sm:grid-cols-2">
              <legend className="sr-only">{question.title}</legend>
              {question.options.map((option) => {
                const active = selected === option.value;
                return (
                  <label
                    key={option.value}
                    className={`group relative flex min-h-[95px] cursor-pointer items-center justify-between gap-3 rounded-[20px] border p-5 transition-all duration-300 ${active ? "border-primary bg-[#EAF5F7] shadow-[0_8px_30px_rgba(6,48,74,0.07)]" : "border-primary/10 hover:border-primary/35 bg-white/70 hover:bg-white"}`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option.value}
                      checked={active}
                      onChange={() =>
                        setAnswers((v) => ({
                          ...v,
                          [question.id]: option.value,
                        }))
                      }
                      className="sr-only"
                    />
                    <span>
                      <span className="text-primary block font-sans text-[16px] font-semibold">
                        {option.label}
                      </span>
                      <span className="text-primary/60 mt-1 block font-sans text-[13px]">
                        {option.detail}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${active ? "border-primary bg-primary text-white" : "border-primary/15 text-transparent"}`}
                    >
                      <Check size={16} />
                    </span>
                  </label>
                );
              })}
            </fieldset>
          </div>
          <div className="border-primary/10 mt-11 flex items-center justify-between gap-4 border-t pt-7">
            <button
              type="button"
              disabled={current === 0}
              onClick={() => setCurrent((v) => v - 1)}
              className="text-primary inline-flex min-h-12 items-center gap-2 rounded-full px-3 font-sans text-[14px] font-semibold disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft size={18} /> Previous
            </button>
            <button
              type="button"
              onClick={advance}
              disabled={!selected}
              className="bg-primary inline-flex min-h-[54px] items-center gap-4 rounded-full px-6 font-sans text-[14px] font-semibold text-white transition-colors hover:bg-[#0A4968] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLast ? "Discover My Routine" : "Continue"}{" "}
              <ArrowRight size={18} />
            </button>
          </div>
          <p className="text-primary/50 mt-8 text-center font-sans text-[12px] leading-relaxed">
            Skincare preferences only. This quiz does not diagnose skin
            conditions. Product matches are a draft pending brand review.
          </p>
        </section>
      </div>
      <style jsx>{`
        @keyframes routineIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
