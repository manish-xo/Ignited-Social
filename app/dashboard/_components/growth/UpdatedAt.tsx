"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { formatDate, timeAgo } from "../../lib/format";

// How often an open dashboard re-reads the stats, so a new snapshot shows up
// in the tiles and chart without a reload.
const REFRESH_MS = 5 * 60_000;

/** "Updated 3h ago", kept current while the page stays open. */
export default function UpdatedAt({ iso }: { iso: string | null }) {
  const router = useRouter();
  // The date on the server render; relative time once in the browser, so
  // server and client HTML match.
  const [label, setLabel] = useState(iso ? formatDate(iso) : null);

  useEffect(() => {
    if (!iso) return;
    const tick = () => setLabel(timeAgo(iso));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [iso]);

  useEffect(() => {
    const id = setInterval(() => {
      if (document.visibilityState === "visible") router.refresh();
    }, REFRESH_MS);
    return () => clearInterval(id);
  }, [router]);

  if (!label) return null;
  return (
    <p className="flex items-center gap-1.5 text-xs text-muted">
      <RefreshCw size={12} />
      Updated {label}
    </p>
  );
}
