import type { Metadata } from "next";
import ProHeader from "@/components/layout/ProHeader/ProHeader";
import FindPeopleSection from "./_components/FindPeopleSection";

export const metadata: Metadata = {
  title: "Ignited — Let’s find the people your work is for",
  description:
    "How a Brand Manager finds your audience, reaches out and gets you discovered.",
};

// Own route while the motion version of this section is being reviewed.
export default function AudienceJourneyPage() {
  return (
    <>
      <ProHeader />
      <main className="bg-canvas">
        <FindPeopleSection />
      </main>
    </>
  );
}
