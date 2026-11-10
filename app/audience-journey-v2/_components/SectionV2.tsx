"use client";

import FindPeopleSection from "../../audience-journey/_components/FindPeopleSection";
import FilterStage from "./FilterStage";

/** Same heading, tabs and copy as /audience-journey, with the filter-style animation. */
export default function SectionV2() {
  return <FindPeopleSection Stage={FilterStage} />;
}
