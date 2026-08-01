"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; href: string }[];
}

const MobileMenu = ({ isOpen, onClose, links }: MobileMenuProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      tlRef.current?.kill();

      const tl = gsap.timeline();
      tlRef.current = tl;

      if (isOpen) {
        tl.set(panelRef.current, { display: "flex" })
          .fromTo(
            panelRef.current,
            {
              opacity: 0,
              scale: 0.92,
              y: -30,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: "elastic.out(1, 0.65)",
            },
          )
          .fromTo(
            linkRefs.current,
            {
              opacity: 0,
              y: 40,
              scale: 0.8,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "elastic.out(1, 0.75)",
              stagger: 0.08,
            },
            "-=0.55",
          );
      } else {
        tl.to(linkRefs.current, {
          opacity: 0,
          y: 20,
          scale: 0.9,
          duration: 0.2,
          stagger: 0.04,
          ease: "power2.in",
        }).to(
          panelRef.current,
          {
            opacity: 0,
            scale: 0.95,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
              gsap.set(panelRef.current, { display: "none" });
            },
          },
          "-=0.1",
        );
      }
    }, panelRef);

    return () => ctx.revert();
  }, [isOpen]);

  return (
    <div
      ref={panelRef}
      // z-40 — must stay BELOW the header's z-[70] so the hamburger/X
      // button is never covered while this panel is open
      className={`fixed inset-0 z-40 hidden flex flex-col items-center justify-center gap-2 bg-canvas backdrop-blur-sm md:hidden ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      {links.map((link, i) => (
        <a
          key={link.name}
          ref={(el) => {
            linkRefs.current[i] = el;
          }}
          href={link.href}
          onClick={onClose}
          className="py-3 text-xl text-ink"
        >
          {link.name}
        </a>
      ))}

      <a
        href="#contact"
        onClick={onClose}
        className="mt-6 rounded-full bg-action px-8 py-3 text-base font-semibold text-canvas"
      >
        Get Started
      </a>
    </div>
  );
};

export default MobileMenu;
