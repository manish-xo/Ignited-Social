"use client";

import EverythingIncluded from "./Compo/EverythingIncluded";
import GrowthManagerSpotlight from "./Compo/Growthmanagerspotlight";
import MonthlyService from "./Compo/MonthlyService";
import NotJustNumbers from "./Compo/NotJustNumber";
import OurApproach from "./Compo/OurApproach";
import ProblemSection from "./Compo/ProblemSection";
import ServicesHero from "./Compo/ServiceHero";
import ProofNumbers from "./ProofNumbers";

const page = () => {
  return (
    <>
      <ServicesHero />
      <ProblemSection />
      <OurApproach />
      <EverythingIncluded />
      <NotJustNumbers />
      <GrowthManagerSpotlight />
      <MonthlyService />
      <ProofNumbers />
    </>
  );
};

export default page;
