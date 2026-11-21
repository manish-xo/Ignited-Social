import type { Metadata } from "next";
import { publicPage } from "@/lib/seo";
import ProHeader from "@/components/layout/ProHeader/ProHeader";
import CaseStudiesBrowser from "./_components/CaseStudiesBrowser";

export const metadata: Metadata = publicPage({
  title: "Case studies",
  description:
    "Real accounts, real numbers. See how our Brand Managers helped 110+ creators, coaches and businesses grow on Instagram.",
  path: "/case-studies",
});

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
