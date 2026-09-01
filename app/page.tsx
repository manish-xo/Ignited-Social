import React from "react";
import Price from "./price/page";
import Home from "./service/page";
import Footer from "@/components/layout/Footer/Footer";
import ProHeader from "@/components/layout/ProHeader/ProHeader";

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
