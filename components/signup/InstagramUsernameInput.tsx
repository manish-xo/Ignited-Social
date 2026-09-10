// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { Loader2, AlertCircle } from "lucide-react";
// import { getInstagramImageUrl } from "@/lib/utils";
// import { useInstagramSuggestions } from "@/hook/useInstagramSuggestions";

// interface Suggestion {
//   username: string;
//   fullName?: string;
//   profilePicUrl?: string;
//   isVerified?: boolean;
//   id?: string;
// }

// type Status = "idle" | "invalid" | "checking" | "results" | "empty";

// interface InstagramUsernameInputProps {
//   onSelect?: (username: string, suggestion: Suggestion | null) => void;
//   invalid?: boolean;
// }

// /*
//  * Cache suggestions so if the user comes back
//  * to a previously searched username, we don't
//  * need to call SocialBoost again.
//  */
// const cache = new Map<string, Suggestion[]>();

// /*
//  * Instagram username format validation.
//  */
// function isValidFormat(value: string) {
//   return /^[a-zA-Z0-9._]{1,30}$/.test(value) && !value.includes("..");
// }

// /*
//  * Remove duplicate usernames returned by SocialBoost.
//  *
//  * We compare usernames case-insensitively so:
//  *
//  * akhil.outdoors
//  * Akhil.Outdoors
//  * AKHIL.OUTDOORS
//  *
//  * are treated as the same Instagram account.
//  */
// function removeDuplicateSuggestions(suggestions: Suggestion[]): Suggestion[] {
//   const seen = new Set<string>();

//   return suggestions.filter((suggestion) => {
//     const username = suggestion.username?.trim();

//     if (!username) {
//       return false;
//     }

//     const normalizedUsername = username.toLowerCase();

//     if (seen.has(normalizedUsername)) {
//       return false;
//     }

//     seen.add(normalizedUsername);

//     return true;
//   });
// }

// export default function InstagramUsernameInput({
//   onSelect,
//   invalid = false,
// }: InstagramUsernameInputProps) {
//   const { getSuggestions } = useInstagramSuggestions();

//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState<Status>("idle");
//   const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
//   const [selectedSuggestion, setSelectedSuggestion] =
//     useState<Suggestion | null>(null);
//   const [open, setOpen] = useState(false);

//   /*
//    * Debounce timer.
//    */
//   const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   /*
//    * Used to make sure an older request cannot
//    * overwrite the results of a newer request.
//    *
//    * Example:
//    *
//    * "shy"    request starts
//    * "shyam"  request starts
//    *
//    * If "shy" returns AFTER "shyam", we ignore "shy".
//    */
//   const requestIdRef = useRef(0);

//   const containerRef = useRef<HTMLDivElement | null>(null);

//   /*
//    * Search suggestions whenever query changes.
//    */
//   useEffect(() => {
//     /*
//      * Cancel pending debounce.
//      */
//     if (debounceRef.current) {
//       clearTimeout(debounceRef.current);
//     }

//     /*
//      * Empty input.
//      */
//     if (query.length === 0) {
//       requestIdRef.current++;

//       setStatus("idle");
//       setSuggestions([]);
//       setOpen(false);

//       onSelect?.("", null);

//       return;
//     }

//     /*
//      * Invalid Instagram username format.
//      */
//     if (!isValidFormat(query)) {
//       requestIdRef.current++;

//       setStatus("invalid");
//       setSuggestions([]);
//       setOpen(false);

//       onSelect?.("", null);

//       return;
//     }

//     /*
//      * Keep react-hook-form updated with the
//      * username currently being typed.
//      */
//     onSelect?.(
//       query,
//       selectedSuggestion?.username === query ? selectedSuggestion : null,
//     );

//     /*
//      * Check cache first.
//      */
//     const cached = cache.get(query);

//     if (cached) {
//       setSuggestions(cached);
//       setStatus(cached.length ? "results" : "empty");
//       setOpen(true);

//       return;
//     }

//     /*
//      * Show loading state immediately.
//      */
//     setStatus("checking");
//     setOpen(true);

//     /*
//      * Wait 250ms before calling SocialBoost.
//      */
//     debounceRef.current = setTimeout(async () => {
//       /*
//        * Create a unique ID for this request.
//        */
//       const requestId = ++requestIdRef.current;

//       try {
//         /*
//          * Call our SocialBoost hook.
//          */
//         const results = await getSuggestions(query);

//         /*
//          * If another request started after this one,
//          * ignore this response.
//          */
//         if (requestId !== requestIdRef.current) {
//           return;
//         }

//         /*
//          * Remove duplicate usernames.
//          */
//         const uniqueResults = removeDuplicateSuggestions(results);

//         /*
//          * Cache the cleaned results.
//          */
//         cache.set(query, uniqueResults);

//         /*
//          * Update UI.
//          */
//         setSuggestions(uniqueResults);
//         setStatus(uniqueResults.length > 0 ? "results" : "empty");
//         setOpen(true);
//       } catch (error) {
//         /*
//          * Ignore errors from stale requests.
//          */
//         if (requestId !== requestIdRef.current) {
//           return;
//         }

//         console.error("Instagram suggestion error:", error);

//         setSuggestions([]);
//         setStatus("empty");
//         setOpen(true);
//       }
//     }, 150);

//     /*
//      * Cleanup debounce when query changes.
//      */
//     return () => {
//       if (debounceRef.current) {
//         clearTimeout(debounceRef.current);
//       }
//     };

//     // We intentionally react only to query changes.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [query]);

//   /*
//    * Close dropdown when clicking outside.
//    */
//   useEffect(() => {
//     function handleClick(e: MouseEvent) {
//       if (
//         containerRef.current &&
//         !containerRef.current.contains(e.target as Node)
//       ) {
//         setOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClick);

//     return () => {
//       document.removeEventListener("mousedown", handleClick);
//     };
//   }, []);

//   /*
//    * Handle user typing.
//    */
//   const handleChange = (raw: string) => {
//     /*
//      * Remove spaces and leading @ symbols.
//      *
//      * @shyam -> shyam
//      * @@@shyam -> shyam
//      */
//     const cleaned = raw.replace(/\s/g, "").replace(/^@+/, "");

//     /*
//      * Once the user changes the text,
//      * the previously selected account is no longer
//      * considered selected.
//      */
//     setSelectedSuggestion(null);

//     setQuery(cleaned);
//   };

//   /*
//    * Handle clicking a suggestion.
//    */
//   const handleSelect = (suggestion: Suggestion) => {
//     /*
//      * Put the actual Instagram username in the input.
//      */
//     setQuery(suggestion.username);

//     /*
//      * Remember the selected account.
//      */
//     setSelectedSuggestion(suggestion);

//     /*
//      * Clear suggestions and close dropdown.
//      */
//     setSuggestions([]);
//     setOpen(false);

//     /*
//      * Send selected account back to Signupform.
//      *
//      * Signupform will receive:
//      *
//      * username
//      * profilePicUrl
//      */
//     onSelect?.(suggestion.username, suggestion);
//   };

//   const showDanger = status === "invalid" || invalid;

//   return (
//     <div ref={containerRef} className="relative">
//       {/* Label */}
//       <label className="text-sm font-semibold text-ink">
//         Instagram username
//       </label>

//       {/* Input */}
//       <div
//         className={`mt-1.5 flex items-center rounded-xl border bg-white px-3.5 transition-colors ${
//           showDanger
//             ? "border-danger focus-within:ring-2 focus-within:ring-danger/30"
//             : "border-border focus-within:border-action/50"
//         }`}
//       >
//         {/* Selected profile picture */}
//         {selectedSuggestion?.profilePicUrl ? (
//           <img
//             src={getInstagramImageUrl(selectedSuggestion.profilePicUrl)}
//             alt={selectedSuggestion.username}
//             className="h-7 w-7 shrink-0 rounded-full object-cover"
//           />
//         ) : (
//           <span className="text-sm text-muted">@</span>
//         )}

//         <input
//           type="text"
//           value={query}
//           onChange={(e) => handleChange(e.target.value)}
//           onFocus={() => {
//             if (query.length >= 2) {
//               setOpen(true);
//             }
//           }}
//           placeholder="yourhandle"
//           className="w-full bg-transparent px-2 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none"
//         />

//         {/* Loading */}
//         {status === "checking" && (
//           <Loader2 size={16} className="animate-spin text-muted" />
//         )}

//         {/* Error */}
//         {showDanger && <AlertCircle size={16} className="text-danger/70" />}
//       </div>

//       {/* Invalid username message */}
//       {status === "invalid" && (
//         <p className="mt-1.5 text-[11px] text-danger">
//           Usernames can only contain letters, numbers, periods, and underscores.
//         </p>
//       )}

//       {/* Suggestions */}
//       {open && status === "results" && suggestions.length > 0 && (
//         <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border bg-white p-2 shadow-lg">
//           {suggestions.map((suggestion) => (
//             <button
//               key={suggestion.username}
//               type="button"
//               onClick={() => handleSelect(suggestion)}
//               className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-gray-100"
//             >
//               {/* Profile picture */}
//               {suggestion.profilePicUrl ? (
//                 <img
//                   src={getInstagramImageUrl(suggestion.profilePicUrl)}
//                   alt=""
//                   className="h-9 w-9 shrink-0 rounded-full object-cover"
//                 />
//               ) : (
//                 <div className="h-9 w-9 shrink-0 rounded-full bg-gray-200" />
//               )}

//               {/* Username + full name */}
//               <div className="min-w-0">
//                 <p className="truncate text-sm font-medium">
//                   @{suggestion.username}
//                   {suggestion.isVerified && <span className="ml-1">✓</span>}
//                 </p>

//                 {suggestion.fullName && (
//                   <p className="truncate text-xs text-gray-500">
//                     {suggestion.fullName}
//                   </p>
//                 )}
//               </div>
//             </button>
//           ))}
//         </div>
//       )}

//       {/* No results */}
//       {open && status === "empty" && (
//         <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border bg-white p-3 text-xs text-muted shadow-lg">
//           No matches found — you can still type your exact handle.
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader2, AlertCircle, X } from "lucide-react";
import { getInstagramImageUrl } from "@/lib/utils";
import { useInstagramSuggestions } from "@/hook/useInstagramSuggestions";

interface Suggestion {
  username: string;
  fullName?: string;
  profilePicUrl?: string;
  isVerified?: boolean;
  id?: string;
}

type Status = "idle" | "invalid" | "checking" | "results" | "empty";

interface InstagramUsernameInputProps {
  /** Field label — defaults to "Instagram username" */
  label?: string;
  placeholder?: string;
  invalid?: boolean;

  /** "single" (default) = Signup's one-account picker.
   *  "multiple" = tag-list picker, e.g. Similar Accounts. */
  mode?: "single" | "multiple";

  // ---- single mode ----
  onSelect?: (username: string, suggestion: Suggestion | null) => void;

  // ---- multiple mode ----
  values?: string[];
  onValuesChange?: (values: string[]) => void;
  max?: number;
}

// Cache is shared across every instance of this component on the page —
// unrelated to which mode it's rendered in.
const cache = new Map<string, Suggestion[]>();

function isValidFormat(value: string) {
  return /^[a-zA-Z0-9._]{1,30}$/.test(value) && !value.includes("..");
}

function removeDuplicateSuggestions(suggestions: Suggestion[]): Suggestion[] {
  const seen = new Set<string>();
  return suggestions.filter((s) => {
    const username = s.username?.trim();
    if (!username) return false;
    const normalized = username.toLowerCase();
    if (seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

export default function InstagramUsernameInput({
  label = "Instagram username",
  placeholder = "yourhandle",
  invalid = false,
  mode = "single",
  onSelect,
  values = [],
  onValuesChange,
  max,
}: InstagramUsernameInputProps) {
  const { getSuggestions } = useInstagramSuggestions();

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<Suggestion | null>(null);
  const [open, setOpen] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const atMax =
    mode === "multiple" && typeof max === "number" && values.length >= max;

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.length === 0) {
      requestIdRef.current++;
      setStatus("idle");
      setSuggestions([]);
      setOpen(false);
      if (mode === "single") onSelect?.("", null);
      return;
    }

    if (!isValidFormat(query)) {
      requestIdRef.current++;
      setStatus("invalid");
      setSuggestions([]);
      setOpen(false);
      if (mode === "single") onSelect?.("", null);
      return;
    }

    if (mode === "single") {
      onSelect?.(
        query,
        selectedSuggestion?.username === query ? selectedSuggestion : null,
      );
    }

    const cached = cache.get(query);
    if (cached) {
      setSuggestions(cached);
      setStatus(cached.length ? "results" : "empty");
      setOpen(true);
      return;
    }

    setStatus("checking");
    setOpen(true);

    debounceRef.current = setTimeout(async () => {
      const requestId = ++requestIdRef.current;
      try {
        const results = await getSuggestions(query);
        if (requestId !== requestIdRef.current) return;

        const uniqueResults = removeDuplicateSuggestions(results);
        cache.set(query, uniqueResults);

        setSuggestions(uniqueResults);
        setStatus(uniqueResults.length > 0 ? "results" : "empty");
        setOpen(true);
      } catch (error) {
        if (requestId !== requestIdRef.current) return;
        console.error("Instagram suggestion error:", error);
        setSuggestions([]);
        setStatus("empty");
        setOpen(true);
      }
    }, 150);

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

  // Shared by "click a suggestion" and "press Enter on a valid typed value".
  const commitUsername = (username: string, suggestion: Suggestion | null) => {
    if (mode === "single") {
      setQuery(username);
      setSelectedSuggestion(suggestion);
      setSuggestions([]);
      setOpen(false);
      onSelect?.(username, suggestion);
      return;
    }

    // multiple mode — add as a chip instead of leaving it in the input
    const isDuplicate = values.some(
      (v) => v.toLowerCase() === username.toLowerCase(),
    );
    if (isDuplicate || atMax) {
      setQuery("");
      setSuggestions([]);
      setOpen(false);
      return;
    }

    onValuesChange?.([...values, username]);
    setQuery("");
    setSelectedSuggestion(null);
    setSuggestions([]);
    setOpen(false);
  };

  const handleSelect = (suggestion: Suggestion) => {
    commitUsername(suggestion.username, suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (mode !== "multiple") return;

    const canCommit = status === "results" || status === "empty";

    if (e.key === "Enter" && canCommit) {
      e.preventDefault();
      commitUsername(query, selectedSuggestion);
    } else if (e.key === "Backspace" && query === "" && values.length > 0) {
      onValuesChange?.(values.slice(0, -1));
    }
  };

  const removeChip = (username: string) => {
    onValuesChange?.(values.filter((v) => v !== username));
  };

  const showDanger = status === "invalid" || invalid;

  return (
    <div ref={containerRef} className="relative">
      <label className="text-sm font-semibold text-ink">{label}</label>

      <div
        className={`mt-1.5 flex items-center rounded-xl border bg-white px-3.5 transition-colors ${
          showDanger
            ? "border-danger focus-within:ring-2 focus-within:ring-danger/30"
            : "border-border focus-within:border-action/50"
        }`}
      >
        {mode === "single" && selectedSuggestion?.profilePicUrl ? (
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
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setOpen(true)}
          placeholder={
            atMax ? `Limit reached${max ? ` (${max})` : ""}` : placeholder
          }
          disabled={atMax}
          className="w-full bg-transparent px-2 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none disabled:cursor-not-allowed"
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

      {/* Chip list — multiple mode only */}
      {mode === "multiple" && values.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {values.map((v) => (
            <span
              key={v}
              className="flex items-center gap-1.5 rounded-full bg-action-tint-bg px-3 py-1.5 text-sm font-medium text-action"
            >
              @{v}
              <button
                type="button"
                onClick={() => removeChip(v)}
                aria-label={`Remove @${v}`}
                className="text-action/70 hover:text-action"
              >
                <X size={13} />
              </button>
            </span>
          ))}
        </div>
      )}
      {mode === "multiple" && typeof max === "number" && (
        <p className="mt-2 text-xs text-muted">
          {values.length}/{max}
        </p>
      )}

      {open && status === "results" && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border bg-white p-2 shadow-lg">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.username}
              type="button"
              onClick={() => handleSelect(suggestion)}
              className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-gray-100"
            >
              {suggestion.profilePicUrl ? (
                <img
                  src={getInstagramImageUrl(suggestion.profilePicUrl)}
                  alt=""
                  className="h-9 w-9 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="h-9 w-9 shrink-0 rounded-full bg-gray-200" />
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  @{suggestion.username}
                  {suggestion.isVerified && <span className="ml-1">✓</span>}
                </p>
                {suggestion.fullName && (
                  <p className="truncate text-xs text-gray-500">
                    {suggestion.fullName}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {open && status === "empty" && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border bg-white p-3 text-xs text-muted shadow-lg">
          No matches found — you can still press Enter to add your exact handle.
        </div>
      )}
    </div>
  );
}
