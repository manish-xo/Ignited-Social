"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Tornado } from "lucide-react";

interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  barClassName?: string;
}

const Hamburger = ({
  isOpen,
  onClick,
  className = "",
  barClassName = "bg-ink",
}: HamburgerProps) => {
  const topRef = useRef<HTMLSpanElement>(null);
  const midRef = useRef<HTMLSpanElement>(null);
  const botRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    gsap.set(topRef.current, { top: "10%", yPercent: 0, rotate: 0 });
    gsap.set(midRef.current, { top: "50%", yPercent: -50, rotate: 0 });
    gsap.set(botRef.current, { top: "90%", x: 0, opacity: 1 });
  }, []);

  useEffect(() => {
    tlRef.current?.kill();

    const tl = gsap.timeline({
      defaults: { duration: 0.25, ease: "power3.inOut" },
    });
    tlRef.current = tl;

    if (isOpen) {
      tl.to(topRef.current, { top: "50%", yPercent: -50, rotate: 45 }, 0)
        .to(midRef.current, { rotate: -45 }, 0)
        .to(botRef.current, { x: -50, opacity: 0 }, 0);
    } else {
      tl.to(topRef.current, { top: "10%", yPercent: 0, rotate: 0 }, 0)
        .to(midRef.current, { rotate: 0 }, 0)
        .to(botRef.current, { x: 0, opacity: 1 }, 0);
    }
    return () => {
      tl.kill();
    };
  }, [isOpen]);

  return (
    <button
      type="button"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
      onClick={onClick}
      className={`relative h-10 w-10 shrink-0  flex items-center justify-center cursor-pointer select-none ${className}`}
    >
      <span className="relative block h-[1.2rem] w-[1.2rem]">
        <span
          ref={topRef}
          className={`absolute left-0 h-[2px] w-full ${barClassName}`}
        />
        <span
          ref={midRef}
          className={`absolute left-0 h-[2px] w-full ${barClassName}`}
        />
        <span
          ref={botRef}
          className={`absolute left-0 h-[2px] w-full ${barClassName}`}
        />
      </span>
    </button>
  );
};

export default Hamburger;
