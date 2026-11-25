import React from "react";
import ProHeader from "@/components/layout/ProHeader/ProHeader";
import Footer from "@/components/layout/Footer/Footer";

interface LegalLayoutProps {
  children: React.ReactNode;
}

const LegalLayout = ({ children }: LegalLayoutProps) => {
  return (
    <>
      <ProHeader />

      <main className="min-h-screen">{children}</main>

      <Footer />
    </>
  );
};

export default LegalLayout;
