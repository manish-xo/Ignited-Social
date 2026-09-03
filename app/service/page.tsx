"use client";

import ProHeader from "@/components/layout/ProHeader/ProHeader";
import EverythingIncluded from "./Compo/EverythingIncluded";
import GrowthManagerSpotlight from "./Compo/Growthmanagerspotlight";
import MonthlyService from "./Compo/MonthlyService";
import NotJustNumbers from "./Compo/NotJustNumber";
import OurApproach from "./Compo/OurApproach";
import ProblemSection from "./Compo/ProblemSection";
import ServicesHero from "./Compo/ServiceHero";
import ProofNumbers from "./ProofNumbers";
import Footer from "@/components/layout/Footer/Footer";

const Home = () => {
  return (
    <>
      <ProHeader />
      <ServicesHero />
      <ProblemSection />
      <OurApproach />
      <EverythingIncluded />
      <NotJustNumbers />
      <GrowthManagerSpotlight />
      <MonthlyService />
      <ProofNumbers />
      <Footer />
    </>
  );
};

export default Home;
