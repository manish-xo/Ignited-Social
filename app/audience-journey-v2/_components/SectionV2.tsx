"use client";

import FindPeopleSection from "./FindPeopleSection";

/** The v2 section, used by /audience-journey-v2 and the service page. */
export default function SectionV2({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  return <FindPeopleSection embedded={embedded} />;
}
