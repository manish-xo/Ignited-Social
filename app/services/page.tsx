"use client";
import FollowerGrowthChart from "@/components/dashboard/FollowerGrowthChart";
import React from "react";
import Hero from "./Compo/Hero";

const page = () => {
  return (
    <>
      <Hero />
      <FollowerGrowthChart />
    </>
  );
};

export default page;
