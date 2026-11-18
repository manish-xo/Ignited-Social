import type { Metadata } from "next";
import ProHeader from "@/components/layout/ProHeader/ProHeader";
import CaseStudiesBrowser from "./_components/CaseStudiesBrowser";

export const metadata: Metadata = {
  title: "Ignited — Case studies",
  description:
    "How Ignited Brand Managers helped creators, coaches and businesses reach the right people on Instagram.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <ProHeader />
      <main className="min-h-screen bg-canvas font-body tracking-tight text-ink">
        <CaseStudiesBrowser />
      </main>
    </>
  );
}
