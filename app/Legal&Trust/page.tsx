import React from "react";
import Privacy from "./Privacy/page";
import Terms from "./Terms/page";
import Refund from "./Refund/page";
import ProHeader from "@/components/layout/ProHeader/ProHeader";
import Footer from "@/components/layout/Footer/Footer";

const Policies = () => {
  return (
    <>
      <Privacy />
      <Terms />
      <Refund />
    </>
  );
};

export default Policies;
