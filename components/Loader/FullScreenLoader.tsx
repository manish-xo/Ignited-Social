"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Spinner from "./Spinner";

const noopSubscribe = () => () => {};

interface FullScreenLoaderProps {
  /** Main line, e.g. "Confirming your payment…" */
  title?: string;
  /** Smaller line under it. */
  description?: string;
}

/**
 * Covers the whole page with the spinner and a message, and blocks clicks
 * underneath. Render it while something important is in progress:
 *   {saving && <FullScreenLoader title="Saving…" />}
 *
 * Rendered into <body> so a transformed/animated parent can't trap the
 * fixed overlay inside itself.
 */
export default function FullScreenLoader({
  title = "Loading…",
  description,
}: FullScreenLoaderProps) {
  // false during the server render, true in the browser (where <body> exists).
  const isClient = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  if (!isClient) return null;

  return createPortal(
    <div
      aria-live="polite"
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-canvas/85 px-6 text-center backdrop-blur-sm"
    >
      <Spinner label={title} />
      <p className="mt-6 font-heading text-lg font-bold tracking-tight text-ink">
        {title}
      </p>
      {description && (
        <p className="mt-1.5 max-w-xs text-sm text-secondary">{description}</p>
      )}
    </div>,
    document.body,
  );
}
