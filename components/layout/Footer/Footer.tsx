"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TextReveal } from "@/components/custom/TextReveal";
import Logo from "@/components/Logo/Logo";
import React from "react";

interface FooterLink {
  name: string;
  href: string;
}

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Quick Links",
    links: [
      { name: "Services", href: "/service" },
      { name: "Pricing", href: "/price" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal & Trust",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Refund Policy", href: "/refund" },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "Get started", href: "/signup?plan=grow" },
      { name: "Client login", href: "/dashboard/login" },
    ],
  },
];

const socialLinks = [
  { icon: "ri-instagram-line", href: "#", label: "Follow us on Instagram" },
  { icon: "ri-twitter-x-fill", href: "#", label: "Follow us on X" },
  { icon: "ri-linkedin-box-line", href: "#", label: "Follow us on LinkedIn" },
];

const Footer = () => {
  return (
    <footer className="relative w-full bg-canvas">
      {/* Ripped-paper top edge: sits over the bottom of the section above.
          The back layer is a shade darker so the tear shows a paper fibre. */}
      <svg
        aria-hidden
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-full z-10 h-6 w-full translate-y-px sm:h-9 md:h-11"
      >
        <defs>
          {/* the torn rim catches light; the paper darkens a touch toward it */}
          <linearGradient id="footer-paper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.3" stopColor="#efece6" />
            <stop offset="1" stopColor="var(--canvas)" />
          </linearGradient>
          {/* Shadows on the ripped part itself, where they're visible:
              1. the front sheet casts a shadow up onto the pale fibre strip,
              2. an inner shadow runs along the torn rim of the front sheet. */}
          <filter
            id="footer-tear"
            // Region stops at the sheet's sides and bottom so the inner
            // shadow only forms along the torn top edge.
            x="0"
            y="-60%"
            width="100%"
            height="160%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.4" />
            <feOffset dy="-1.8" result="castBlur" />
            <feFlood floodColor="#1b1830" floodOpacity="0.5" />
            <feComposite in2="castBlur" operator="in" result="cast" />

            <feComponentTransfer in="SourceAlpha" result="inverse">
              <feFuncA type="table" tableValues="1 0" />
            </feComponentTransfer>
            <feGaussianBlur in="inverse" stdDeviation="2.2" />
            <feOffset dy="2.4" result="innerBlur" />
            <feFlood floodColor="#3b3429" floodOpacity="0.3" />
            <feComposite in2="innerBlur" operator="in" />
            <feComposite in2="SourceAlpha" operator="in" result="inner" />

            <feMerge>
              <feMergeNode in="cast" />
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="inner" />
            </feMerge>
          </filter>
        </defs>
        <path
          fill="#f7f5f0"
          d="M0 40 L0 16 L8 16 L36 10.7 L69 21.6 L98 13 L128 8.4 L157 11 L173 15.1 L200 15.6 L220 21.7 L236 15.7 L269 22.8 L278 14.2 L312 18.7 L341 13.4 L359 9 L373 13.1 L383 16.2 L414 11.3 L423 12.8 L437 17.2 L446 19.4 L456 16.9 L478 13.2 L496 9.9 L529 22.3 L555 19.2 L571 10.1 L606 22.8 L642 21.4 L673 18.4 L687 10 L723 10.6 L737 21.5 L756 21.9 L771 17.8 L792 11.1 L815 21.9 L851 11.3 L872 19.2 L882 21.2 L903 20.5 L924 9.5 L943 21 L960 14.1 L990 4.7 L1003 16.9 L1030 19.7 L1058 20.1 L1089 12.7 L1119 9.9 L1139 14.2 L1154 16.6 L1186 7.7 L1214 9 L1235 20.6 L1246 13.9 L1276 16.9 L1303 18 L1321 18.8 L1331 21.8 L1361 14 L1386 14.7 L1404 9.3 L1422 14.8 L1440 10.9 L1440 40 Z"
        />
        <path
          filter="url(#footer-tear)"
          fill="url(#footer-paper)"
          d="M0 40 L0 22 L8 27.9 L22 25.2 L39 25.5 L62 24.6 L93 18.4 L121 28.9 L142 27.9 L154 22.2 L181 24 L214 27.7 L232 26.7 L244 19.2 L260 28.1 L289 22.2 L312 22.1 L326 24.7 L343 24.3 L366 17.3 L382 20.1 L399 22.4 L414 27.7 L446 23.9 L468 22.1 L503 20.6 L518 23.2 L535 20.5 L567 16.6 L578 20.7 L588 28.9 L613 17 L638 16.9 L671 27.5 L704 25.7 L713 7.3 L738 18.2 L760 24.6 L792 18.3 L825 16.7 L833 27.8 L867 15.3 L880 28.6 L907 18.7 L921 28.9 L949 25 L958 16.5 L970 24.6 L979 27.4 L1014 28.4 L1034 18.5 L1067 20.6 L1086 27.4 L1104 23.7 L1121 25.2 L1135 19.4 L1171 23.9 L1204 17.8 L1216 22 L1246 28.2 L1259 21.3 L1286 22.3 L1308 25.6 L1337 15.4 L1360 17.8 L1376 18.3 L1396 16.1 L1427 27.8 L1440 34.3 L1440 40 Z"
        />
      </svg>

      <div className="mx-auto max-w-6xl px-6 pb-8 pt-16 sm:px-10 sm:pt-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-12">
          {/* BRAND */}
          <div className="col-span-2 md:col-span-5">
            <Link href="/" aria-label="Ignited Social home" className="inline-block">
              <Logo
                mainLogoTxt="#faf9f6"
                outerTxt="#221f1b"
                circleStroke="#faf9f6"
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-secondary">
              Real growth, real people, real results. A dedicated manager for
              your Instagram, no bots, ever.
            </p>
            <a
              href="mailto:support@ignitedsocial.com"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink"
            >
              support@ignitedsocial.com
              <ArrowUpRight
                size={15}
                className="text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
              />
            </a>
          </div>

          {/* LINK COLUMNS */}
          {COLUMNS.map((col, i) => (
            <nav
              key={col.title}
              aria-label={col.title}
              className={`md:col-span-2 ${i === 0 ? "md:col-start-7" : ""}`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <TextReveal
                      as={Link}
                      href={link.href}
                      hoverColor="var(--color-ink)"
                      className="text-sm font-[400] tracking-wide text-secondary"
                      text={link.name}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 flex flex-col gap-6 border-t border-hairline pt-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1 text-xs text-muted">
            <p>
              © {new Date().getFullYear()} Ignited Social. All rights reserved.
            </p>
            <p>
              No bots. No fake followers. 30-day money-back guarantee on every
              plan.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-secondary transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-canvas"
              >
                <i className={icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
