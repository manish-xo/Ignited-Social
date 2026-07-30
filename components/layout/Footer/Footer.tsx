"use client";
import { TextReveal } from "@/components/custom/TextReveal";
// import { Instagram, Twitter, Linkedin } from "lucide-react";
import React from "react";

interface NavLink {
  name: string;
  href: string;
}

interface LegalTrustLink {
  link: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Services", href: "#services" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];

const legalTrustLinks: LegalTrustLink[] = [
  { link: "Privacy Policy", href: "/privacy" },
  { link: "Terms of Service", href: "/terms" },
  { link: "Refund Policy", href: "/refund" },
];

const socialLinks = [
  { icon: "ri-instagram-line", href: "#", label: "Follow us on Instagram" },
  { icon: "ri-twitter-x-fill", href: "#", label: "Follow us on X" },
  { icon: "ri-linkedin-box-line", href: "#", label: "Follow us on LinkedIn" },
];

const Footer = () => {
  return (
    <footer className="w-full border-t border-hairline bg-canvas">
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 sm:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-4 sm:gap-8">
          {/* BRAND */}
          <div className="brand-col space-y-3 sm:col-span-1">
            <a href="#" className="block font-heading text-ink">
              <span className="text-5xl font-extrabold tracking-tighter text-action">
                Ignited
              </span>
              <span className="text-base font-medium">Social</span>
            </a>
            <p className="max-w-[220px] text-sm font-light tracking-wide text-secondary">
              Real growth, real people, real results.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-action hover:text-action"
                >
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="quick-links">
            <div className="mb-5 text-sm font-semibold uppercase text-ink">
              Quick Links
            </div>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <TextReveal
                    as="a"
                    href={link.href}
                    hoverColor="var(--color-action)"
                    className="text-sm font-[300] tracking-wide text-ink"
                    text={link.name}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* LEGAL */}
          <div className="legal flex flex-col">
            <div className="mb-5 text-sm font-semibold uppercase text-ink">
              Legal &amp; Trust
            </div>
            <ul className="space-y-3">
              {legalTrustLinks.map((link) => (
                <li key={link.link}>
                  <TextReveal
                    as="a"
                    href={link.href}
                    hoverColor="var(--color-action)"
                    className="text-sm font-[300] tracking-wide text-ink"
                    text={link.link}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="contact">
            <div className="mb-5 text-sm font-semibold text-ink">
              Get in touch
            </div>
            <a
              href="mailto:support@ignitedsocial.com"
              className="text-sm text-secondary transition-colors hover:text-action"
            >
              support@ignitedsocial.com
            </a>
            <a
              href="#pricing"
              className="mt-4 inline-flex w-fit items-center justify-center rounded-full bg-action px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-action-hover"
            >
              Start growing today
            </a>
          </div>
        </div>

        {/* trust line */}
        <p className="mt-12 border-t border-hairline pt-6 text-center text-xs text-muted">
          No bots. No fake followers. 30-day money-back guarantee on every plan.
        </p>

        {/* bottom bar */}
        <div className="mt-4 flex flex-col items-center justify-between gap-3 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} Ignited Social. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {legalTrustLinks.map((link) => (
              <a
                key={link.link}
                href={link.href}
                className="transition-colors hover:text-action"
              >
                {link.link}
              </a>
            ))}
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
