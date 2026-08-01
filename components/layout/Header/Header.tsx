"use client";
import MobileMenu from "@/components/custom/MobileMenu";
import { TextReveal } from "@/components/custom/TextReveal";
import Hamburger from "@/components/ui/Hamburger";
import React, { useEffect, useState } from "react";

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

const mobileLinks = navLinks.map(({ name, href }) => ({ name, href }));

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="fixed z-[70] inset-x-0 flex justify-center bg-white border-b border-hairline">
      <nav className="mx-auto grid w-full max-w-6xl grid-cols-3 items-center justify-center px-6 py-4">
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
                <div className="text-ink font-light tracking-wider text-sm sm:text-base md:text-[0.95] lg:text-[1.08em] overflow-hidden">
                  {/* {link.name} */}
                  <TextReveal
                    as="a"
                    href={link.href}
                    hoverColor="var(--color-action)"
                    className="text-sm font-[300] tracking-wide text-ink"
                    text={link.name}
                  />
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* right side actions */}
        <div className="flex items-center justify-end gap-2">
          <a
            href="#contact"
            className="hidden md:inline-flex whitespace-nowrap rounded-xl bg-action px-5 py-3 font-[500] uppercase text-[0.8em] tracking-wide text-white transition-colors hover:bg-action-hover"
          >
            Get Started
          </a>
          <Hamburger
            isOpen={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="md:hidden bg-sky-900"
          />
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={mobileLinks}
      />
    </header>
  );
};

export default Header;
