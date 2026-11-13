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
import Hero from "./sections/Hero";
import BrandManager from "./sections/BrandManager";
import Record from "./sections/Record";
import FirstWeek from "./sections/FirstWeek";
// import Niches from "./sections/Niches";
import SectionV2 from "../audience-journey-v2/_components/SectionV2";
// import Transformations from "./sections/Transformations";
import GrowthSection from "../audience-journey-v2/_components/GrowthSection";
import { NicheProvider } from "../audience-journey-v2/_components/NicheContext";
import Pricing from "./sections/Pricing";
import Faq from "./sections/Faq";
import FinalCta from "./sections/FinalCta";

const Home = () => {
  return (
    <>
      {/* <ProHeader /> */}
      {/* <ServicesHero /> */}
      <Hero />
      <BrandManager />
      <Record />
      <FirstWeek />
      {/* <Niches /> replaced by the audience journey below */}
      {/* One set of niche tabs (in the audience journey) switches both sections. */}
      <NicheProvider>
        <SectionV2 embedded />
        {/* <Transformations /> replaced by "The growth, up close" */}
        <GrowthSection />
      </NicheProvider>
      <Pricing />
      <Faq />
      <FinalCta />
      {/* <ProblemSection />
      <OurApproach />
      <EverythingIncluded />
      <NotJustNumbers />
      <GrowthManagerSpotlight />
      <MonthlyService />
      <ProofNumbers /> */}
      {/* <Footer /> */}
    </>
  );
};

export default Home;
