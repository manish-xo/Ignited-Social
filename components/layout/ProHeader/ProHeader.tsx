"use client";
import React from "react";
import "./style.css";

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

const ProHeader = () => {
  return (
    <header className="fixed z-[70] inset-x-0 flex justify-center px-3">
      <nav className="mx-auto grid w-full max-w-5xl bg-subtle-bg border-hairline  rounded-2xl grid-cols-3 items-center justify-center px-6 py-2 mt-3">
        {/* LOGO */}
        <a
          href="#"
          className="font-heading font-semibold text-ink text-xl justify-self-start"
        >
          STS
        </a>
        {/* CENTER LINKS */}
        <div className="hidden gap-1 md:flex items-center justify-center">
          {navLinks.map((link) => (
            <div key={link.name} className="relative">
              <a
                href={link.href}
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm transition-all"
              >
                <div className="text-ink font-light tracking-wider text-sm sm:text-base md:text-[0.95] lg:text-[1.08em] hover:scale-105 transition-all duration-100 ease overflow-hidden">
                  {link.name}
                </div>
              </a>
            </div>
          ))}
        </div>
        {/* right side actions */}
        <div className="flex items-center justify-end gap-2">
          <a
            href="#contact"
            className="hidden md:inline-flex whitespace-nowrap rounded-xl bg-action px-4 py-2.5 font-[500] uppercase text-[0.7em] tracking-wide text-white transition-colors hover:bg-action-hover"
          >
            Get Started
          </a>
        </div>
      </nav>
    </header>
  );
};

export default ProHeader;
