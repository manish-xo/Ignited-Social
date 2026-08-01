"use client";
import { useEffect, useState } from "react";
import "./style.css";
import Hamburger from "@/components/ui/Hamburger";
import { MobileIcon } from "@radix-ui/react-icons";
import MobileMenu from "@/components/custom/MobileMenu";
import { TextReveal } from "@/components/custom/TextReveal";

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

const ProHeader = () => {
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
    <header className="fixed z-[70] inset-x-0 flex justify-center px-3">
      <nav className="mx-auto z-50 grid grid-cols-2 md:grid-cols-3 w-full max-w-5xl bg-subtle-bg border-hairline rounded-2xl items-center justify-between px-6 py-2 mt-3">
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
              <div className="text-ink flex items-center gap-1 rounded-full px-4 font-light tracking-wider text-sm sm:text-base md:text-[0.95] lg:text-[1.08em] overflow-hidden">
                {/* {link.name} */}
                <TextReveal
                  as="a"
                  href={link.href}
                  hoverColor="var(--color-action)"
                  className="text-sm font-[300] tracking-wide text-ink"
                  text={link.name}
                />
              </div>
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
          <Hamburger
            isOpen={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
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

export default ProHeader;
