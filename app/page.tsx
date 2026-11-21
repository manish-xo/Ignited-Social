import React from "react";
import type { Metadata } from "next";
import Price from "./price/page";
import Home from "./service/page";
import Footer from "@/components/layout/Footer/Footer";
import ProHeader from "@/components/layout/ProHeader/ProHeader";

// Title and description come from the defaults in app/layout.tsx.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const page = () => {
  return (
    <>
      <ProHeader />
      <Home />
      <Footer />
    </>
  );
};

export default page;
