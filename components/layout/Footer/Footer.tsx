"use client";
import { TextReveal } from "@/components/custom/TextReveal";
import React from "react";

interface NavLink {
  name: string;
  href: string;
  //   dropdown?: { name: string; href: string };
}

const navLinks: NavLink[] = [
  {
    name: "Services",
    href: "#services",
  },
  {
    name: "Pricing",
    href: "#pricing",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

const Footer = () => {
  return (
    <section className="w-full mx-auto px-10 pt-8 pb-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 grid-rows-3 sm:grid-cols-3 sm:grid-rows-1">
        <div className="brand-col space-y-2">
          {/* LOGO */}
          <a
            href="#"
            className="block font-heading text-ink text-xl justify-self-start"
          >
            <span className="font-[800] text-action tracking-tighter text-5xl">
              Ignited
            </span>
            <span className="font-[500] text-md">Social</span>
          </a>
          <div className="tagline font-[300] text-sm tracking-wide">
            Real Growth, Real People, Real Results
          </div>
        </div>
        <div className="quick-links">
          <div className="head">Quick Links</div>

          {navLinks.map((link, i) => (
            <div key={i} className="relative">
              <div className="text-ink font-light tracking-wider text-sm sm:text-base md:text-[0.95] lg:text-[1.08em] hover:scale-105 transition-all duration-100 ease overflow-hidden">
                <TextReveal text={link.name} />
              </div>
            </div>
          ))}
        </div>
        <div className="legal"></div>
        <div className="contact"></div>
      </div>
    </section>
  );
};

export default Footer;
