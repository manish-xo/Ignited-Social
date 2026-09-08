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

// const cache = new Map<string, Suggestion[]>();

// function isValidFormat(value: string) {
//   return /^[a-zA-Z0-9._]{1,30}$/.test(value) && !value.includes("..");
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

//   const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (debounceRef.current) {
//       clearTimeout(debounceRef.current);
//     }

//     if (query.length === 0) {
//       setStatus("idle");
//       setSuggestions([]);
//       setOpen(false);
//       onSelect?.("", null);
//       return;
//     }

//     if (!isValidFormat(query)) {
//       setStatus("invalid");
//       setSuggestions([]);
//       setOpen(false);
//       onSelect?.("", null);
//       return;
//     }

//     /*
//      * Keep react-hook-form updated with whatever
//      * the user is currently typing.
//      */
//     onSelect?.(
//       query,
//       selectedSuggestion?.username === query ? selectedSuggestion : null,
//     );

//     /*
//      * Use cached results if we already searched
//      * for this username.
//      */
//     if (cache.has(query)) {
//       const cached = cache.get(query)!;

//       setSuggestions(cached);
//       setStatus(cached.length ? "results" : "empty");
//       setOpen(true);

//       return;
//     }

//     setStatus("checking");
//     setOpen(true);

//     debounceRef.current = setTimeout(async () => {
//       try {
//         const results = await getSuggestions(query);

//         cache.set(query, results);

//         setSuggestions(results);
//         setStatus(results.length ? "results" : "empty");
//         setOpen(true);
//       } catch (error) {
//         console.error("Instagram suggestion error:", error);

//         setSuggestions([]);
//         setStatus("empty");
//         setOpen(true);
//       }
//     }, 250);

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

//   const handleChange = (raw: string) => {
//     const cleaned = raw.replace(/\s/g, "").replace(/^@+/, "");

//     setSelectedSuggestion(null);
//     setQuery(cleaned);
//   };

//   const handleSelect = (suggestion: Suggestion) => {
//     setQuery(suggestion.username);
//     setSelectedSuggestion(suggestion);
//     setSuggestions([]);
//     setOpen(false);

//     /*
//      * Send the actual Instagram account back
//      * to Signupform / react-hook-form.
//      */
//     onSelect?.(suggestion.username, suggestion);
//   };

//   const showDanger = status === "invalid" || invalid;

//   return (
//     <div ref={containerRef} className="relative">
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

//         {status === "checking" && (
//           <Loader2 size={16} className="animate-spin text-muted" />
//         )}

//         {showDanger && <AlertCircle size={16} className="text-danger/70" />}
//       </div>

//       {/* Invalid username */}
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
//               {suggestion.profilePicUrl ? (
//                 <img
//                   src={getInstagramImageUrl(suggestion.profilePicUrl)}
//                   alt=""
//                   className="h-9 w-9 shrink-0 rounded-full object-cover"
//                 />
//               ) : (
//                 <div className="h-9 w-9 shrink-0 rounded-full bg-gray-200" />
//               )}

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
import { Loader2, AlertCircle } from "lucide-react";
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
  onSelect?: (username: string, suggestion: Suggestion | null) => void;
  invalid?: boolean;
}

/*
 * Cache suggestions so if the user comes back
 * to a previously searched username, we don't
 * need to call SocialBoost again.
 */
const cache = new Map<string, Suggestion[]>();

/*
 * Instagram username format validation.
 */
function isValidFormat(value: string) {
  return /^[a-zA-Z0-9._]{1,30}$/.test(value) && !value.includes("..");
}

/*
 * Remove duplicate usernames returned by SocialBoost.
 *
 * We compare usernames case-insensitively so:
 *
 * akhil.outdoors
 * Akhil.Outdoors
 * AKHIL.OUTDOORS
 *
 * are treated as the same Instagram account.
 */
function removeDuplicateSuggestions(suggestions: Suggestion[]): Suggestion[] {
  const seen = new Set<string>();

  return suggestions.filter((suggestion) => {
    const username = suggestion.username?.trim();

    if (!username) {
      return false;
    }

    const normalizedUsername = username.toLowerCase();

    if (seen.has(normalizedUsername)) {
      return false;
    }

    seen.add(normalizedUsername);

    return true;
  });
}

export default function InstagramUsernameInput({
  onSelect,
  invalid = false,
}: InstagramUsernameInputProps) {
  const { getSuggestions } = useInstagramSuggestions();

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<Suggestion | null>(null);
  const [open, setOpen] = useState(false);

  /*
   * Debounce timer.
   */
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /*
   * Used to make sure an older request cannot
   * overwrite the results of a newer request.
   *
   * Example:
   *
   * "shy"    request starts
   * "shyam"  request starts
   *
   * If "shy" returns AFTER "shyam", we ignore "shy".
   */
  const requestIdRef = useRef(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  /*
   * Search suggestions whenever query changes.
   */
  useEffect(() => {
    /*
     * Cancel pending debounce.
     */
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    /*
     * Empty input.
     */
    if (query.length === 0) {
      requestIdRef.current++;

      setStatus("idle");
      setSuggestions([]);
      setOpen(false);

      onSelect?.("", null);

      return;
    }

    /*
     * Invalid Instagram username format.
     */
    if (!isValidFormat(query)) {
      requestIdRef.current++;

      setStatus("invalid");
      setSuggestions([]);
      setOpen(false);

      onSelect?.("", null);

      return;
    }

    /*
     * Keep react-hook-form updated with the
     * username currently being typed.
     */
    onSelect?.(
      query,
      selectedSuggestion?.username === query ? selectedSuggestion : null,
    );

    /*
     * Check cache first.
     */
    const cached = cache.get(query);

    if (cached) {
      setSuggestions(cached);
      setStatus(cached.length ? "results" : "empty");
      setOpen(true);

      return;
    }

    /*
     * Show loading state immediately.
     */
    setStatus("checking");
    setOpen(true);

    /*
     * Wait 250ms before calling SocialBoost.
     */
    debounceRef.current = setTimeout(async () => {
      /*
       * Create a unique ID for this request.
       */
      const requestId = ++requestIdRef.current;

      try {
        /*
         * Call our SocialBoost hook.
         */
        const results = await getSuggestions(query);

        /*
         * If another request started after this one,
         * ignore this response.
         */
        if (requestId !== requestIdRef.current) {
          return;
        }

        /*
         * Remove duplicate usernames.
         */
        const uniqueResults = removeDuplicateSuggestions(results);

        /*
         * Cache the cleaned results.
         */
        cache.set(query, uniqueResults);

        /*
         * Update UI.
         */
        setSuggestions(uniqueResults);
        setStatus(uniqueResults.length > 0 ? "results" : "empty");
        setOpen(true);
      } catch (error) {
        /*
         * Ignore errors from stale requests.
         */
        if (requestId !== requestIdRef.current) {
          return;
        }

        console.error("Instagram suggestion error:", error);

        setSuggestions([]);
        setStatus("empty");
        setOpen(true);
      }
    }, 150);

    /*
     * Cleanup debounce when query changes.
     */
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };

    // We intentionally react only to query changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  /*
   * Close dropdown when clicking outside.
   */
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

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  /*
   * Handle user typing.
   */
  const handleChange = (raw: string) => {
    /*
     * Remove spaces and leading @ symbols.
     *
     * @shyam -> shyam
     * @@@shyam -> shyam
     */
    const cleaned = raw.replace(/\s/g, "").replace(/^@+/, "");

    /*
     * Once the user changes the text,
     * the previously selected account is no longer
     * considered selected.
     */
    setSelectedSuggestion(null);

    setQuery(cleaned);
  };

  /*
   * Handle clicking a suggestion.
   */
  const handleSelect = (suggestion: Suggestion) => {
    /*
     * Put the actual Instagram username in the input.
     */
    setQuery(suggestion.username);

    /*
     * Remember the selected account.
     */
    setSelectedSuggestion(suggestion);

    /*
     * Clear suggestions and close dropdown.
     */
    setSuggestions([]);
    setOpen(false);

    /*
     * Send selected account back to Signupform.
     *
     * Signupform will receive:
     *
     * username
     * profilePicUrl
     */
    onSelect?.(suggestion.username, suggestion);
  };

  const showDanger = status === "invalid" || invalid;

  return (
    <div ref={containerRef} className="relative">
      {/* Label */}
      <label className="text-sm font-semibold text-ink">
        Instagram username
      </label>

      {/* Input */}
      <div
        className={`mt-1.5 flex items-center rounded-xl border bg-white px-3.5 transition-colors ${
          showDanger
            ? "border-danger focus-within:ring-2 focus-within:ring-danger/30"
            : "border-border focus-within:border-action/50"
        }`}
      >
        {/* Selected profile picture */}
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
          onFocus={() => {
            if (query.length >= 2) {
              setOpen(true);
            }
          }}
          placeholder="yourhandle"
          className="w-full bg-transparent px-2 py-3 text-sm text-ink placeholder:text-placeholder focus:outline-none"
        />

        {/* Loading */}
        {status === "checking" && (
          <Loader2 size={16} className="animate-spin text-muted" />
        )}

        {/* Error */}
        {showDanger && <AlertCircle size={16} className="text-danger/70" />}
      </div>

      {/* Invalid username message */}
      {status === "invalid" && (
        <p className="mt-1.5 text-[11px] text-danger">
          Usernames can only contain letters, numbers, periods, and underscores.
        </p>
      )}

      {/* Suggestions */}
      {open && status === "results" && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border bg-white p-2 shadow-lg">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.username}
              type="button"
              onClick={() => handleSelect(suggestion)}
              className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-gray-100"
            >
              {/* Profile picture */}
              {suggestion.profilePicUrl ? (
                <img
                  src={getInstagramImageUrl(suggestion.profilePicUrl)}
                  alt=""
                  className="h-9 w-9 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="h-9 w-9 shrink-0 rounded-full bg-gray-200" />
              )}

              {/* Username + full name */}
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

      {/* No results */}
      {open && status === "empty" && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border bg-white p-3 text-xs text-muted shadow-lg">
          No matches found — you can still type your exact handle.
        </div>
      )}
    </div>
  );
}
