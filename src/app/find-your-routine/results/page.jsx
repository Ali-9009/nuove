import { Suspense } from "react";
import RoutineResults from "@/components/routine-finder/RoutineResults";

export const metadata = {
  title: "Your Skincare Routine | NUOVÉ",
  description:
    "Review your NUOVÉ skincare routine suggestions and shopping edit.",
  robots: { index: false, follow: false },
};
export default function RoutineResultsPage() {
  return (
    <Suspense
      fallback={
        <main className="text-primary min-h-screen bg-[#F8F7F4] px-6 pt-40 font-sans">
          Preparing your routine…
        </main>
      }
    >
      <RoutineResults />
    </Suspense>
  );
}
