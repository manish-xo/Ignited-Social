"use client";

import Link from "next/link";
import Image from "next/image";

interface PageErrorProps {
  code?: string;
  title?: string;
  description?: string;
}

const PageError = ({
  code = "404",
  title = "Page not found",
  description = "Sorry, the page you're looking for doesn't exist or is currently unavailable.",
}: PageErrorProps) => {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24 bg-background">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Illustration */}
        <div className="flex justify-center md:order-2">
          <div className="relative w-full max-w-[420px] aspect-square">
            <Image
              src="/page-error.svg"
              alt="Page error illustration"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Content */}
        <div className="text-center md:text-left md:order-1">
          <span className="block text-7xl sm:text-8xl md:text-9xl font-heading font-bold tracking-tight text-ink">
            {code}
          </span>

          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-heading font-semibold -tracking-[3px] text-ink">
            {title}
          </h1>

          <p className="mt-5 max-w-lg mx-auto md:mx-0 text-base sm:text-lg leading-relaxed -tracking-[0.04rem] text-ink/60">
            {description}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center md:justify-start justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-action px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-action-hover"
            >
              Back to Home
            </Link>

            <Link
              href="/service"
              className="inline-flex items-center justify-center rounded-xl border border-ink/15 px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PageError;
