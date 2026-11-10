import type { Metadata } from "next";
import ProHeader from "@/components/layout/ProHeader/ProHeader";
import SectionV2 from "./_components/SectionV2";

export const metadata: Metadata = {
  title: "Ignited — Let’s find the people your work is for",
  description:
    "How a Brand Manager narrows down your audience, reaches out and gets you discovered.",
};

// Second take on the audience journey, kept on its own route for review.
export default function AudienceJourneyV2Page() {
  return (
    <>
      <ProHeader />
      <main className="bg-canvas">
        <SectionV2 />
      </main>
    </>
  );
}
