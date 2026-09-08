// "use client";

// import { useEffect, useRef, useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import { useStepper } from "../components/stepper/StepperContext";
// import { ScrollArea } from "@/components/ui/scroll-area";

// const SOURCES = [
//   "Google",
//   "Instagram",
//   "Facebook",
//   "Youtube",
//   "Reddit",
//   "TikTok",
//   "Other",
// ];

// export default function HowHeardStep() {
//   const { formData, updateFormData, setStepValid } = useStepper();
//   const [source, setSource] = useState<string>(
//     (formData.referralSource as string) ?? "",
//   );
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setStepValid(source.length > 0);
//     updateFormData({ referralSource: source });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [source]);

//   useEffect(() => {
//     const onClickOutside = (e: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target as Node)
//       ) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", onClickOutside);
//     return () => document.removeEventListener("mousedown", onClickOutside);
//   }, []);

//   return (
//     <div>
//       <h1 className="text-center text-4xl font-[700] tracking-tighter text-ink">
//         How did you hear about us?
//       </h1>
//       <p className="text-md mt-3 text-center text-secondary">
//         This helps us understand what's working.
//       </p>

//       <div className="relative mt-6" ref={dropdownRef}>
//         <button
//           type="button"
//           onClick={() => setOpen((v) => !v)}
//           className="flex w-full items-center justify-between rounded-xl border border-border bg-white px-3.5 py-3 text-left text-sm text-ink focus:outline-none focus:ring-2 focus:ring-action/30"
//         >
//           <span className={source ? "text-ink" : "text-placeholder"}>
//             {source || "Select a source"}
//           </span>
//           {open ? (
//             <ChevronUp size={16} className="text-muted" />
//           ) : (
//             <ChevronDown size={16} className="text-muted" />
//           )}
//         </button>

//         {open && (
//           <div className="absolute z-10 mt-1.5 w-full overflow-hidden rounded-xl border border-border bg-white py-1.5 shadow-lg">
//             <ScrollArea className="h-[25rem] py-1.5">
//               {SOURCES.map((opt) => (
//                 <button
//                   key={opt}
//                   type="button"
//                   onClick={() => {
//                     setSource(opt);
//                     setOpen(false);
//                   }}
//                   className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-border/20 ${
//                     opt === source
//                       ? "bg-action-tint-bg font-semibold text-action"
//                       : "text-ink"
//                   }`}
//                 >
//                   {opt}
//                 </button>
//               ))}
//             </ScrollArea>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import { useStepper } from "../components/stepper/StepperContext";
// import { ScrollArea } from "@/components/ui/scroll-area";

// const SOURCES = [
//   "Google",
//   "Instagram",
//   "Facebook",
//   "Youtube",
//   "Reddit",
//   "TikTok",
//   "Other",
// ];

// export default function HowHeardStep() {
//   const { formData, updateFormData, setStepValid } = useStepper();
//   const [source, setSource] = useState<string>(
//     (formData.referralSource as string) ?? "",
//   );
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setStepValid(source.length > 0);
//     updateFormData({ referralSource: source });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [source]);

//   useEffect(() => {
//     const onClickOutside = (e: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target as Node)
//       ) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", onClickOutside);
//     return () => document.removeEventListener("mousedown", onClickOutside);
//   }, []);

//   return (
//     <div className="h-64">
//       <h1 className="text-center text-4xl font-[700] tracking-tighter text-ink">
//         How did you hear about us?
//       </h1>
//       <p className="text-md mt-3 text-center text-secondary">
//         This helps us understand what&apos;s working.
//       </p>

//       <div className="relative mt-6" ref={dropdownRef}>
//         <button
//           type="button"
//           onClick={() => setOpen((v) => !v)}
//           className="flex w-full items-center justify-between rounded-xl border border-border bg-white px-3.5 py-3 text-left text-sm text-ink focus:outline-none focus:ring-2 focus:ring-action/30"
//         >
//           <span className={source ? "text-ink" : "text-placeholder"}>
//             {source || "Select a source"}
//           </span>
//           {open ? (
//             <ChevronUp size={16} className="text-muted" />
//           ) : (
//             <ChevronDown size={16} className="text-muted" />
//           )}
//         </button>

//         {open && (
//           <div
//             data-scroll-lock
//             onWheel={(e) => e.stopPropagation()}
//             className="absolute z-10 mt-1.5 w-full overflow-hidden rounded-xl border border-border bg-white shadow-lg"
//           >
//             <ScrollArea className="h-60 w-full rounded-md py-1.5">
//               {SOURCES.map((opt) => (
//                 <button
//                   key={opt}
//                   type="button"
//                   onClick={() => {
//                     setSource(opt);
//                     setOpen(false);
//                   }}
//                   className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-border/20 ${
//                     opt === source
//                       ? "bg-action-tint-bg font-semibold text-action"
//                       : "text-ink"
//                   }`}
//                 >
//                   {opt}
//                 </button>
//               ))}
//             </ScrollArea>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import { useStepper } from "../components/stepper/StepperContext";

// const SOURCES = [
//   "Google",
//   "Instagram",
//   "Facebook",
//   "Youtube",
//   "Reddit",
//   "TikTok",
//   "Other",
// ];

// export default function HowHeardStep() {
//   const { formData, updateFormData, setStepValid } = useStepper();

//   const [source, setSource] = useState<string>(
//     (formData.referralSource as string) ?? "",
//   );

//   const [open, setOpen] = useState(false);

//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setStepValid(source.length > 0);

//     updateFormData({
//       referralSource: source,
//     });

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [source]);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="bg-red-900">
//       {/* Heading */}
//       <h1 className="text-center text-4xl font-[700] tracking-tighter text-ink">
//         How did you hear about us?
//       </h1>

//       {/* Description */}
//       <p className="mt-3 text-center text-md text-secondary">
//         This helps us understand what&apos;s working.
//       </p>

//       {/* Dropdown */}
//       <div ref={dropdownRef} className="relative mt-6">
//         {/* Trigger */}
//         <button
//           type="button"
//           onClick={() => setOpen((prev) => !prev)}
//           className="
//             flex
//             w-full
//             items-center
//             justify-between
//             rounded-xl
//             border
//             border-border
//             bg-white
//             px-3.5
//             py-3
//             text-left
//             text-sm
//             text-ink
//             focus:outline-none
//             focus:ring-2
//             focus:ring-action/30
//           "
//         >
//           <span className={source ? "text-ink" : "text-placeholder"}>
//             {source || "Select a source"}
//           </span>

//           {open ? (
//             <ChevronUp size={16} className="text-muted" />
//           ) : (
//             <ChevronDown size={16} className="text-muted" />
//           )}
//         </button>

//         {/* Dropdown */}
//         {open && (
//           <div className="absolute left-0 top-full z-50 mt-1.5 w-full rounded-xl border border-border bg-white shadow-lg">
//             {/* Scrollable area */}
//             <div
//               className="
//                 h-60
//                 w-full
//                 overflow-y-auto
//                 overscroll-contain
//                 py-1.5
//               "
//               onWheel={(e) => e.stopPropagation()}
//             >
//               {SOURCES.map((opt) => (
//                 <button
//                   key={opt}
//                   type="button"
//                   onClick={() => {
//                     setSource(opt);
//                     setOpen(false);
//                   }}
//                   className={`
//                     block
//                     w-full
//                     px-4
//                     py-2.5
//                     text-left
//                     text-sm
//                     transition-colors
//                     hover:bg-border/20
//                     ${
//                       opt === source
//                         ? "bg-action-tint-bg font-semibold text-action"
//                         : "text-ink"
//                     }
//                   `}
//                 >
//                   {opt}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useStepper } from "../components/stepper/StepperContext";

const SOURCES = [
  "Google",
  "Instagram",
  "Facebook",
  "Youtube",
  "Reddit",
  "TikTok",
  "Other",
];

export default function HowHeardStep() {
  const { formData, updateFormData, setStepValid } = useStepper();

  const [source, setSource] = useState<string>(
    (formData.referralSource as string) ?? "",
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setStepValid(source.length > 0);
    updateFormData({ referralSource: source });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  return (
    <div>
      {/* Heading */}
      <h1 className="text-center text-4xl font-[700] tracking-tighter text-ink">
        How did you hear about us?
      </h1>

      <p className="text-md mt-3 text-center text-secondary">
        This helps us understand what&apos;s working.
      </p>

      {/* Dropdown */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-xl border border-border bg-white px-3.5 py-3 text-left text-sm text-ink focus:outline-none focus:ring-2 focus:ring-action/30"
        >
          <span className={source ? "text-ink" : "text-placeholder"}>
            {source || "Select a source"}
          </span>

          {open ? (
            <ChevronUp size={16} className="text-muted" />
          ) : (
            <ChevronDown size={16} className="text-muted" />
          )}
        </button>

        {/* Dropdown is now NORMAL FLOW */}
        {open && (
          <div className="mt-1.5 w-full overflow-hidden rounded-xl border border-border bg-white shadow-lg">
            {SOURCES.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setSource(opt);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-3 text-left text-sm transition-colors hover:bg-border/20 ${
                  opt === source
                    ? "bg-action-tint-bg font-semibold text-action"
                    : "text-ink"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
