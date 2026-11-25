import type { ReactNode } from "react";
import Link from "next/link";

/**
 * The shared look of the policy pages: SF Pro only, tight tracking, hairline
 * rules, and each section's heading beside its text on wider screens.
 */
export function LegalPage({
  label,
  title,
  intro,
  children,
}: {
  label: string;
  title: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="bg-canvas font-body tracking-[-0.011em] text-ink">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-36 sm:pb-32 sm:pt-48">
        <header className="pb-16 sm:pb-24">
          <p className="text-sm text-muted">{label}</p>
          <h1 className="mt-4 max-w-[14ch] text-balance text-[2.75rem] font-medium leading-none tracking-[-0.045em] sm:text-7xl">
            {title}
          </h1>
          <div className="mt-8 max-w-[46ch] text-pretty text-lg leading-normal tracking-[-0.018em] text-secondary sm:text-xl">
            {intro}
          </div>
        </header>

        {children}
      </div>
    </article>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-x-12 gap-y-5 border-t border-border py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:py-14">
      {/* Stays in view beside a long section, clear of the fixed header. */}
      <h2 className="self-start text-balance text-xl font-medium leading-tight tracking-[-0.025em] md:sticky md:top-28">
        {title}
      </h2>
      <div className="max-w-[62ch] space-y-5 text-pretty leading-[1.65] text-secondary">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc space-y-3 pl-5 marker:text-placeholder">
      {children}
    </ul>
  );
}

/** A list marked (a), (b), (c)… */
export function LetteredList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={item} className="grid grid-cols-[2.25rem_minmax(0,1fr)]">
          <span className="text-muted">({String.fromCharCode(97 + i)})</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

/** A term inside running text, a shade darker than the text around it. */
export function Term({ children }: { children: ReactNode }) {
  return <span className="font-medium text-ink">{children}</span>;
}

export function LegalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const className =
    "rounded-sm text-ink underline decoration-border-strong underline-offset-4 transition-colors [overflow-wrap:anywhere] hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-action";

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={className}
    >
      {children}
    </a>
  );
}
