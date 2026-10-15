"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "My account is small. Am I ready for this?",
    a: "You don’t need a big following to begin. You need something worth sharing, a sense of who you want to reach, and a willingness to keep posting. We work with artists, coaches, local businesses, creators and product brands. Your first-week audit helps you see where to start.",
  },
  {
    q: "I want customers. How do followers help?",
    a: "A relevant follow gives someone another chance to see your work, get to know you and consider what you offer. That’s the opportunity. Your content builds trust; your offer gives them a reason to act. On Scale, we work on that path with you, from your profile to an enquiry, booking or sale.",
  },
  {
    q: "How will you find people who actually care?",
    a: "We start with people already following accounts like yours, then narrow by your niche, location and other relevant signals. Your Brand Manager reviews the response and adjusts the targeting. A local photographer needs a different audience from an online coach. Your plan should reflect that.",
  },
  {
    q: "I’m already stretched. How much will I have to do?",
    a: "We handle the audience research and daily outreach. You create and publish the content, answer your enquiries and make the changes you choose to take on. Your manager works with the time and resources you have. Grow includes basic content guidance; Scale gives you a monthly plan and weekly reviews.",
  },
  {
    q: "Will my account still sound and feel like me?",
    a: "Yes. You stay in charge of what you make and publish. We help sharpen the message, find stronger ways to tell your story and spot what’s working. Your taste, your voice and your work remain yours.",
  },
  {
    q: "What if I’ve already tried a service like this?",
    a: "Start with seven days free. Meet your Brand Manager, see the activity in your dashboard and get your account audit. Judge the work for yourself. If you decide to leave, cancel and your last payment is automatically refunded. You keep the audit.",
  },
];

/**
 * One question open at a time. Hovering a question nudges it slightly to the
 * right; clicking opens its answer with a smooth height animation.
 */
export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="mx-auto mt-14 max-w-3xl border-t border-border">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;

        return (
          <div key={item.q} className="border-b border-border">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center gap-4 py-6 text-left outline-none focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-action/40"
              >
                <span
                  // Tailwind v4's translate-x-* sets the CSS `translate`
                  // property (not `transform`), so that's what must transition.
                  className={`flex-1 text-base font-semibold -tracking-[0.02em] transition-[translate,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 sm:text-lg ${
                    isOpen ? "text-action" : "text-ink group-hover:text-action"
                  }`}
                >
                  {item.q}
                </span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-[rotate,scale,background-color,border-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen
                      ? "rotate-45 border-action bg-action text-white"
                      : "border-border bg-white text-ink group-hover:rotate-90 group-hover:scale-110 group-hover:border-action/40 group-hover:text-action"
                  }`}
                >
                  <Plus size={16} strokeWidth={2} />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`pb-7 pr-12 text-sm leading-relaxed text-secondary transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:text-base ${
                    isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                  }`}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
