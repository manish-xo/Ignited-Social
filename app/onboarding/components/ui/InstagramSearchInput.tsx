"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import axios from "axios";
import { BadgeCheck, Hash, Loader2, MapPin, Search, X } from "lucide-react";
import { Popover } from "radix-ui";
import { getInstagramImageUrl } from "@/lib/utils";
import type {
  AccountResult,
  HashtagResult,
} from "@/app/api/instagram/search/route";
import type { LocationResult } from "@/app/api/location/search/route";

type SearchType = "account" | "hashtag" | "location";

interface InstagramSearchInputProps {
  type: SearchType;
  /** Stored as "@username" for accounts, "#tag" for hashtags and
   *  "City, State, Country" for locations. */
  values: string[];
  onChange: (values: string[]) => void;
  max: number;
  placeholder: string;
}

type Result =
  | { kind: "account"; value: string; account: AccountResult }
  | { kind: "hashtag"; value: string; hashtag: HashtagResult }
  | { kind: "location"; value: string; location: LocationResult };

const ENDPOINT: Record<SearchType, string> = {
  account: "/api/instagram/search",
  hashtag: "/api/instagram/search",
  location: "/api/location/search",
};

const EMPTY_MESSAGE: Record<SearchType, string> = {
  account: "No accounts found. Try a different name.",
  hashtag: "No hashtags found.",
  location: "No places found. Try a city, state or country.",
};
const DEBOUNCE_MS = 350;
const MIN_QUERY = 2;

export default function InstagramSearchInput({
  type,
  values,
  onChange,
  max,
  placeholder,
}: InstagramSearchInputProps) {
  const [text, setText] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const atMax = values.length >= max;
  const query = text.trim().replace(/^[@#]+/, "");
  const isSelected = (value: string) =>
    values.some((v) => v.toLowerCase() === value.toLowerCase());

  // Debounced search; cancels the previous request so a slow response for
  // "fi" can't overwrite the results for "fitness".
  useEffect(() => {
    if (query.length < MIN_QUERY) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const timer = setTimeout(async () => {
      try {
        const { data: res } = await axios.get(ENDPOINT[type], {
          params: type === "location" ? { q: query } : { type, q: query },
          signal: controller.signal,
        });
        const mapped: Result[] =
          type === "account"
            ? (res.data as AccountResult[]).map((account) => ({
                kind: "account",
                value: `@${account.username}`,
                account,
              }))
            : type === "hashtag"
              ? (res.data as HashtagResult[]).map((hashtag) => ({
                  kind: "hashtag",
                  value: `#${hashtag.name}`,
                  hashtag,
                }))
              : (res.data as LocationResult[]).map((location) => ({
                  kind: "location",
                  value: location.label,
                  location,
                }));
        setResults(mapped);
        setHighlighted(0);
        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setResults([]);
        setError("Search is unavailable right now. Please try again.");
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, type]);

  // Keep the highlighted row in view while arrowing through the list.
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${highlighted}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [highlighted]);

  const add = (value: string) => {
    if (!isSelected(value) && !atMax) onChange([...values, value]);
    setText("");
    setResults([]);
    setOpen(false);
    inputRef.current?.focus();
  };

  const remove = (value: string) => {
    onChange(values.filter((v) => v !== value));
  };

  // Hashtags don't have to exist on Instagram yet, so a typed tag can be
  // added directly. Accounts must come from the search results so only real
  // handles are saved.
  const typedHashtag =
    type === "hashtag" ? query.replace(/[^\p{L}\p{N}_]/gu, "") : "";

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlighted((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = results[highlighted];
      if (open && pick && !isSelected(pick.value)) add(pick.value);
      else if (typedHashtag) add(`#${typedHashtag}`);
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "Backspace" && text === "" && values.length > 0) {
      remove(values[values.length - 1]);
    }
  };

  const showDropdown = open && query.length >= MIN_QUERY;

  let dropdownBody: ReactNode;
  if (loading) {
    dropdownBody = (
      <div className="flex items-center gap-2 px-3 py-4 text-sm text-muted">
        <Loader2 size={15} className="animate-spin" />
        Searching Instagram…
      </div>
    );
  } else if (error) {
    dropdownBody = <p className="px-3 py-4 text-sm text-danger">{error}</p>;
  } else if (results.length === 0) {
    dropdownBody = (
      <p className="px-3 py-4 text-sm text-muted">
        {type === "hashtag" && typedHashtag
          ? `No matches — press Enter to add #${typedHashtag}`
          : EMPTY_MESSAGE[type]}
      </p>
    );
  } else {
    dropdownBody = results.map((r, i) => {
      const selected = isSelected(r.value);
      return (
        <button
          key={r.value}
          type="button"
          role="option"
          data-index={i}
          aria-selected={i === highlighted}
          disabled={selected || atMax}
          onMouseEnter={() => setHighlighted(i)}
          onClick={() => add(r.value)}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm disabled:cursor-not-allowed disabled:opacity-50 ${
            i === highlighted ? "bg-border/25" : ""
          }`}
        >
          {r.kind === "account" ? (
            <>
              <Avatar
                url={r.account.profilePicUrl}
                username={r.account.username}
              />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1 font-semibold text-ink">
                  <span className="truncate">{r.account.username}</span>
                  {r.account.isVerified && (
                    <BadgeCheck
                      size={14}
                      className="shrink-0 text-action"
                      aria-label="Verified"
                    />
                  )}
                </span>
                <span className="block truncate text-xs text-muted">
                  {[r.account.fullName, r.account.followersLabel]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </span>
            </>
          ) : r.kind === "location" ? (
            <>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-action-tint-bg text-action">
                <MapPin size={15} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold text-ink">
                  {r.location.name}
                </span>
                <span className="block truncate text-xs text-muted">
                  {r.location.detail}
                </span>
              </span>
            </>
          ) : (
            <>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-action-tint-bg text-action">
                <Hash size={15} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold text-ink">
                  #{r.hashtag.name}
                </span>
                <span className="block text-xs text-muted">
                  {r.hashtag.postCountLabel}
                </span>
              </span>
            </>
          )}
          {selected && <span className="text-xs text-muted">Added</span>}
        </button>
      );
    });
  }

  return (
    <div>
      <Popover.Root open={showDropdown} onOpenChange={setOpen}>
        <Popover.Anchor asChild>
          <div ref={anchorRef} className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
              {type === "location" ? <MapPin size={16} /> : <Search size={16} />}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder={atMax ? `Limit reached (${max})` : placeholder}
              disabled={atMax}
              autoComplete="off"
              spellCheck={false}
              role="combobox"
              aria-expanded={showDropdown}
              aria-autocomplete="list"
              className="w-full rounded-xl border border-action/50 bg-white py-3 pl-10 pr-10 text-sm text-ink placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-action/30 disabled:opacity-60"
            />
            {loading && (
              <Loader2
                size={16}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 animate-spin text-muted"
              />
            )}
          </div>
        </Popover.Anchor>

        <Popover.Portal>
          {/* Portalled so the stepper card's overflow-hidden can't clip it. */}
          <Popover.Content
            side="bottom"
            align="start"
            sideOffset={6}
            collisionPadding={12}
            // Keep typing focus in the input, and don't treat a click on the
            // input itself as an "outside" click that closes the list.
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (anchorRef.current?.contains(e.target as Node)) {
                e.preventDefault();
              }
            }}
            className="z-50 w-(--radix-popover-trigger-width) rounded-xl border border-border bg-white p-1.5 shadow-lg"
          >
            <div
              ref={listRef}
              // Lenis (site-wide smooth scroll) otherwise swallows the wheel.
              data-lenis-prevent
              role="listbox"
              className="max-h-[min(18rem,calc(var(--radix-popover-content-available-height)-1rem))] overflow-y-auto overscroll-contain pr-1 [scrollbar-color:#d6d0c4_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d6d0c4] [&::-webkit-scrollbar-track]:bg-transparent"
            >
              {dropdownBody}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {values.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {values.map((value) => (
            <span
              key={value}
              className="flex items-center gap-1.5 rounded-full bg-action-tint-bg px-3 py-1.5 text-sm font-medium text-action"
            >
              {value}
              <button
                type="button"
                onClick={() => remove(value)}
                aria-label={`Remove ${value}`}
                className="text-action/70 hover:text-action"
              >
                <X size={13} />
              </button>
            </span>
          ))}
        </div>
      )}

      <p className="mt-2 text-xs text-muted">
        {values.length}/{max}
        {type === "account" && " · pick accounts from the search results"}
        {type === "location" && " · pick places from the search results"}
        {type === "hashtag" && " · press Enter to add your own tag"}
      </p>
    </div>
  );
}

function Avatar({ url, username }: { url: string | null; username: string }) {
  const [failed, setFailed] = useState(false);
  if (!url || failed) {
    return (
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-border/40 text-xs font-bold uppercase text-muted">
        {username[0]}
      </span>
    );
  }
  return (
    // Instagram's CDN blocks hot-linking, so go through the image proxy.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={getInstagramImageUrl(url)}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-9 w-9 shrink-0 rounded-full object-cover"
    />
  );
}
