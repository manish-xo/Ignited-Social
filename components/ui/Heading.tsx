import React from "react";

type HeadingProps = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

const sizeMap: Record<string, string> = {
  h1: "text-4xl sm:text-[6vw] md:text-[7vw] lg:text-6xl font-[700] leading-[0.98] -tracking-[0.04em]",
  h2: "text-4xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight",
  h3: "text-4xl sm:text-2xl md:text-3xl font-semibold leading-snug",
};

const Heading = ({ children, as = "h1", className = "" }: HeadingProps) => {
  const Tag = as;

  return (
    <Tag
      className={`font-heading bg-gradient-to-t from-canvas from-0% to-ink to-45% bg-clip-text text-transparent ${sizeMap[as]} ${className}`}
    >
      {children}
    </Tag>
  );
};

export default Heading;
