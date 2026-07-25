"use client";
import React from "react";
import Pricing from "./Compo/Pricing";
import RiskFree from "./Compo/RiskFree";
import Proof from "./Compo/Proof";
import PricingFAQ from "./Compo/PricingFAQ";
import CTA from "./Compo/CTA";

const Price = () => {
  return (
    <>
      <Pricing />
      <RiskFree />
      <Proof />
      <PricingFAQ />
      <CTA />
    </>
  );
};

export default Price;
