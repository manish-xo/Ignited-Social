import React from "react";
import { cn } from "@/lib/utils";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
  /** Which HTML tag to render. Also picks the default size below. */
  as?: HeadingTag;
  /**
   * Size preset to start from — defaults to the one matching `as`. Use it to
   * keep an h1 look on an h2 (for SEO) or vice versa. Anything in
   * `className` still overrides it.
   */
  size?: "h1" | "h2" | "h3";
  /**
   * The fading ink gradient on the text (on by default, and text colours in
   * className don't override it). Set to false to use a solid text colour.
   */
  gradient?: boolean;
  className?: string;
};

// Responsive font sizes per preset — dropped entirely if you pass your own
// text size in `className`, so yours applies at every screen size.
const sizeMap: Record<"h1" | "h2" | "h3", string> = {
  h1: "text-4xl sm:text-[6vw] md:text-[7vw] lg:text-6xl",
  h2: "text-4xl sm:text-3xl md:text-4xl",
  h3: "text-4xl sm:text-2xl md:text-3xl",
};

// Weight / line-height / letter-spacing per preset (overridable as usual).
const styleMap: Record<"h1" | "h2" | "h3", string> = {
  h1: "font-[700] leading-[0.98] -tracking-[0.05em]",
  h2: "font-bold leading-tight tracking-tight",
  h3: "font-semibold leading-snug",
};

// Does className set a font size? (text-5xl, md:text-lg, text-[9vw], …)
// Colour utilities like text-ink / text-[#fff] don't count.
const FONT_SIZE =
  /(^|\s)([\w-]+:)*text-(xs|sm|base|lg|xl|\d+xl|\[(\d|\.|clamp|calc|min|max|var\(--text)[^\]]*\])(?=\s|$)/;

const GRADIENT =
  "bg-gradient-to-t from-canvas from-0% to-ink to-45% bg-clip-text text-transparent";

/**
 * Section heading. Defaults keep the original look; everything is
 * overridable from `className` — font (`font-heading-condensed`), weight,
 * tracking, colour — because classes are merged with tailwind-merge, so
 * yours win over the defaults instead of fighting them. Passing any text
 * size (`text-5xl`, `md:text-6xl`, `text-[9vw]`) replaces the built-in
 * responsive sizes completely.
 *
 *   <Heading>Default h1 look</Heading>
 *   <Heading as="h2" className="font-heading-condensed text-5xl">…</Heading>
 *   <Heading gradient={false} className="text-action">Solid colour</Heading>
 */
const Heading = ({
  children,
  as = "h1",
  size,
  gradient = true,
  className,
  ...rest
}: HeadingProps) => {
  const Tag = as;
  const preset =
    size ?? (as === "h1" || as === "h2" || as === "h3" ? as : "h1");
  const hasOwnSize = FONT_SIZE.test(className ?? "");

  return (
    <Tag
      className={cn(
        "font-heading",
        !hasOwnSize && sizeMap[preset],
        styleMap[preset],
        !gradient && "text-ink",
        className,
        // Last, so a text colour in className (e.g. text-ink) can't silently
        // switch the gradient off — use gradient={false} for a solid colour.
        gradient && GRADIENT,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Heading;
