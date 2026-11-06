"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "Are the followers real people who are likely to care about my work?",
    a: [
      "Yes. We look for people based on your niche, interests, location and related accounts. Our outreach grabs their attention and brings them to your profile.",
      "They decide to follow because your work interests them. Your content gives those people a reason to stay and engage.",
      "We never buy followers or add fake accounts.",
    ],
  },
  {
    q: "What will you actually do from my account?",
    a: [
      "We follow relevant accounts and like their posts to help the right people discover your profile. Your Brand Manager chooses who to approach, reviews the response and regularly refines the targeting.",
      "We also unfollow accounts added through our outreach, while protecting accounts you follow yourself. Any other action on your Instagram account requires your express approval.",
      "You can see the activity in your dashboard and tell your manager who you want to reach or avoid.",
    ],
  },
  {
    q: "Could the outreach put my account at risk?",
    a: [
      "Your account is in experienced hands. The team behind Ignited has managed 20,000+ accounts since 2016.",
      "Our outreach strategy follows Instagram’s Terms of Use and Community Guidelines. Your account, brand and relationships come before growth targets.",
      "We start gradually, adjust the pace to your account and monitor the activity. Your Brand Manager makes adjustments when needed.",
      "Instagram can still request verification or apply restrictions. If a warning appears, we pause outreach, review the issue and guide you through the next steps.",
    ],
  },
  {
    q: "What access do you need, and how do I stay in control?",
    a: [
      "We need access to your Instagram account to manage outreach. You connect it during setup and keep using Instagram as usual.",
      "Access is limited to team members working on your account. We don’t edit your profile or change settings. We never read or reply to your private messages.",
      "We carry out the outreach you’ve authorised. Any additional activity requires your express permission.",
      "The account is yours. You can remove our access at any time.",
    ],
  },
  {
    q: "Is my account ready for Ignited?",
    a: [
      "You can even start with zero followers. What matters is giving visitors a clear sense of what you do and a reason to follow.",
      "A public profile, a clear bio and recent posts about what you do give us a useful starting point. If your account is new, inconsistent or still taking shape, your Brand Manager helps you identify what needs attention first.",
      "You don’t have to figure all of that out before you get help.",
    ],
  },
  {
    q: "Can Ignited work with the time and content I can realistically produce?",
    a: [
      "Yes. We build your content plan around your time, skills and resources.",
      "Your Brand Manager handles outreach and helps you decide what to create next. You create and publish the content. Your voice and creative choices stay yours. The plan gives you direction and makes the work easier to manage.",
      "Together, we build a posting routine you can maintain — one that gives new visitors a reason to follow and existing followers a reason to stay.",
    ],
  },
  {
    q: "What growth should I realistically expect, and when?",
    a: [
      "Our estimated monthly growth is 150–500+ new followers on Grow and 250–800+ on Scale. Your niche, target audience, profile and content affect where you land.",
      "We usually begin targeting within 24–48 hours of setup, or on Monday if you join over the weekend. Your first new followers usually arrive within two to three days of outreach starting.",
      "Judge progress over several weeks. Daily numbers will vary.",
    ],
  },
  {
    q: "What happens if my growth is slow or the wrong people are following?",
    a: [
      "Your Brand Manager takes on a pro-active role in finding what needs to change.",
      "If the audience doesn’t fit, we adjust the targeting. If growth is slow, we review the outreach, your profile and your content, then work through the improvements with you.",
      "You’ll know what we’re changing, why, and whether it’s helping.",
      "If you don’t feel understood or supported by your Brand Manager, you can request a different one.",
      "You can also cancel anytime. Your most recent payment is refunded automatically, whether it’s your first paid month or a later one.",
    ],
  },
  {
    q: "How will Ignited help turn followers into enquiries or sales?",
    a: [
      "We get your account in front of potential customers, then help you give them a reason to enquire, book or buy.",
      "Both plans include a tailored content plan. Scale adds a review of your offer, landing page and the steps from first interest to purchase, with clear advice for improvement.",
      "Your Brand Manager helps improve the opportunity to win business. You put the suggestion into practice and handle enquiries.",
      "Results depend on your offer and how people respond – we don’t promise a fixed number of sales or bookings.",
    ],
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
                <div
                  className={`space-y-3 pb-7 pr-12 text-sm leading-relaxed text-secondary transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:text-base ${
                    isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                  }`}
                >
                  {item.a.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
