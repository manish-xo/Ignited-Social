"use client";
import React, { useState } from "react";
import CornerFrame from "@/components/ui/CornerFrame";
import Heading from "@/components/ui/Heading";
import { accordionData } from "@/data/pricing";
import Accordion from "@/components/ui/accordion";

const PricingFAQ = () => {
  return (
    <section className="bg-subtle-bg w-full mx-auto pt-16 pb-10">
      <div className="eyebrow flex items-center justify-center mb-3">
        <CornerFrame className="bg-action-tint-bg">
          <p className="font-mono font-[600] uppercase text-xs">FAQs</p>
        </CornerFrame>
      </div>

      <div className="heading">
        <Heading className="text-center">Everything you need</Heading>
        <Heading className="text-center">to know</Heading>
      </div>

      <div className="mx-auto mt-12 max-w-4xl">
        <Accordion items={accordionData} />
      </div>

      <div className="mx-auto max-w-4xl mt-16">
        <p className="text-center space-x-1">
          <span>Still have questions?</span>
          <span className="font-[700] cursor-pointer text-action underline underline-offset-4">
            Use live chat
          </span>
        </p>
      </div>
    </section>
  );
};

export default PricingFAQ;
