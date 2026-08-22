"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { getInstagramImageUrl } from "@/lib/utils";

interface Suggestion {
  username: string;
  fullName?: string;
  profilePicUrl?: string;
  isVerified?: boolean;
}

type Status = "idle" | "invalid" | "checking" | "results" | "empty";

interface InstagramUsernameInputProps {
  onSelect?: (username: string, suggestion: Suggestion | null) => void;
  invalid?: boolean;
}

const cache = new Map<string, Suggestion[]>();

function isValidFormat(value: string) {
  return /^[a-zA-Z0-9._]{1,30}$/.test(value) && !value.includes("..");
}

function normalizeSuggestions(raw: any): Suggestion[] {
  if (raw?.success === false) return [];

  const list = raw?.data?.data;
  if (!Array.isArray(list)) return [];
  const mapped = list.map((u: any) => ({
    username: u.username,
    fullName: u.full_name || undefined,
    profilePicUrl: u.profile_pic_url ?? undefined,
    isVerified: u.is_verified ?? false,
  }));

  const seen = new Set<string>();
  return mapped.filter((s) => {
    if (seen.has(s.username)) return false;
    seen.add(s.username);
    return true;
  });
}

export default function InstagramUsernameInput({
  onSelect,
  invalid = false,
}: InstagramUsernameInputProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<Suggestion | null>(null);
  const [open, setOpen] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (abortRef.current) abortRef.current.abort();

    if (query.length === 0) {
      setStatus("idle");
      setSuggestions([]);
      setOpen(false);
      onSelect?.("", null);
      return;
    }

    if (!isValidFormat(query)) {
      setStatus("invalid");
      setSuggestions([]);
      setOpen(false);
      onSelect?.("", null);
      return;
    }

    //! ----->>>>>>>>>>>>>>>>
    onSelect?.(
      query,
      selectedSuggestion?.username === query ? selectedSuggestion : null,
    );
    //! ----->>>>>>>>>>>>>>>>

    if (cache.has(query)) {
      const cached = cache.get(query)!;
      setSuggestions(cached);
      setStatus(cached.length ? "results" : "empty");
      setOpen(true);
      return;
    }

    setStatus("checking");
    setOpen(true);

    debounceRef.current = setTimeout(async () => {
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch(
          `/api/instagram/lookup?username=${encodeURIComponent(query)}`,
          { signal: controller.signal },
        );
        const data = await res.json();
        const results = normalizeSuggestions(data);

        cache.set(query, results);
        setSuggestions(results);
        setStatus(results.length ? "results" : "empty");
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setSuggestions([]);
        setStatus("empty");
      }
    }, 450);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleChange = (raw: string) => {
    const cleaned = raw.replace(/\s/g, "").replace(/^@+/, "");
    setSelectedSuggestion(null);
    setQuery(cleaned);
  };

  const handleSelect = (s: Suggestion) => {
    setQuery(s.username);
    setOpen(false);
    setSelectedSuggestion(s);
    onSelect?.(s.username, s);
  };

  const showDanger = status === "invalid" || invalid;

  return (
    <div ref={containerRef} className="relative">
      <label className="text-xs font-semibold text-ink">
        Instagram username
      </label>

      <div
        className={`mt-1.5 flex items-center rounded-xl border bg-white px-3.5 transition-colors ${
          showDanger
            ? "border-danger focus-within:ring-2 focus-within:ring-danger/30"
            : "border-border focus-within:border-action/50"
        }`}
      >
        {selectedSuggestion?.profilePicUrl ? (
          <img
            src={getInstagramImageUrl(selectedSuggestion.profilePicUrl)}
            alt={selectedSuggestion.username}
            className="h-7 w-7 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="text-sm text-muted">@</span>
        )}

        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => query.length >= 2 && setOpen(true)}
          placeholder="yourhandle"
          className="w-full bg-transparent px-2 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none"
        />
        {status === "checking" && (
          <Loader2 size={16} className="animate-spin text-muted" />
        )}
        {showDanger && <AlertCircle size={16} className="text-danger/70" />}
      </div>

      {status === "invalid" && (
        <p className="mt-1.5 text-[11px] text-danger">
          Usernames can only contain letters, numbers, periods, and underscores.
        </p>
      )}

      {open && status === "results" && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border bg-white p-2 shadow-lg">
          {suggestions.map((s) => (
            <button
              key={s.username}
              type="button"
              onClick={() => handleSelect(s)}
              className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-gray-100"
            >
              {s.profilePicUrl ? (
                <img
                  src={getInstagramImageUrl(s.profilePicUrl)}
                  alt=""
                  className="h-9 w-9 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="h-9 w-9 shrink-0 rounded-full bg-gray-200" />
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  @{s.username} {s.isVerified && "✓"}
                </p>
                {s.fullName && (
                  <p className="truncate text-xs text-gray-500">{s.fullName}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {open && status === "empty" && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border bg-white p-3 text-xs text-muted shadow-lg">
          No matches found — you can still type your exact handle.
        </div>
      )}
    </div>
  );
}
