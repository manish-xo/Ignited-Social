"use client";
import React from "react";
import Pricing from "./Compo/Pricing";
import RiskFree from "./Compo/RiskFree";
import Proof from "./Compo/Proof";
import PricingFAQ from "./Compo/PricingFAQ";
import CTA from "./Compo/CTA";
import ProHeader from "@/components/layout/ProHeader/ProHeader";
import Footer from "@/components/layout/Footer/Footer";

const Price = () => {
  return (
    <>
      <ProHeader />
      <Pricing />
      <RiskFree />
      <Proof />
      <PricingFAQ />
      <CTA />
      <Footer />
    </>
  );
};

export default Price;
