import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import styles from "./Spinner.module.css";

interface SpinnerProps {
  /** Width and height in px. Default 60. */
  size?: number;
  /** Colour via a text class, e.g. "text-white". Default: brand action colour. */
  className?: string;
  /** Read out by screen readers. */
  label?: string;
}

/**
 * Five dots chasing each other round a circle. Usable anywhere:
 *   <Spinner />                      // 60px, action colour
 *   <Spinner size={24} className="text-white" />
 */
export default function Spinner({
  size = 60,
  className,
  label = "Loading",
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(styles.spinner, "text-action", className)}
      style={{ "--spinner-size": `${size}px` } as CSSProperties}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className={styles.dot} />
      ))}
    </div>
  );
}
