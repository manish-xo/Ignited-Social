import type { ReactNode } from "react";
import { PencilLine, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { supportMailto } from "../../lib/support";
import type { TargetingStrategy } from "../../lib/types";
import { CardHeader, Eyebrow, GlassCard, Muted } from "../ui";

const NOT_SET = <Muted>Not set</Muted>;

function Chips({
  items,
  tone = "neutral",
}: {
  items: string[];
  tone?: "neutral" | "action" | "success";
}) {
  if (!items.length) return NOT_SET;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium",
            tone === "action" && "bg-action/10 text-action",
            tone === "success" && "bg-success-bg text-success-ink",
            tone === "neutral" && "glass-inset text-ink",
          )}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function Item({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Eyebrow>{label}</Eyebrow>
      <div className="mt-1.5 text-sm font-medium text-ink">{children}</div>
    </div>
  );
}

export default function TargetingCard({
  targeting: t,
  username,
}: {
  targeting: TargetingStrategy;
  username: string | null;
}) {
  return (
    <GlassCard>
      <CardHeader
        icon={Target}
        title="Targeting & strategy"
        subtitle="What you told us during onboarding. Your manager works from this."
        action={
          <a
            href={supportMailto(
              "Change my targeting",
              username ? `Instagram: @${username}\n\nWhat I'd like to change:\n` : undefined,
            )}
            className="glass-inset inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-xs font-semibold text-ink transition-colors duration-300 hover:text-action"
          >
            <PencilLine size={13} />
            Request a change
          </a>
        }
      />

      {t.targetAudience && (
        <blockquote className="glass-inset mt-5 rounded-2xl p-4 text-sm italic leading-relaxed text-secondary">
          &ldquo;{t.targetAudience}&rdquo;
        </blockquote>
      )}

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Item label="Niche">{t.niche ?? NOT_SET}</Item>
        <Item label="Max following">{t.maxFollowing ?? NOT_SET}</Item>
        <Item label="Target gender">{t.targetGender ?? NOT_SET}</Item>
        <Item label="Location reach">{t.locationAccuracy ?? NOT_SET}</Item>
      </div>

      <div className="mt-5 grid gap-5 border-t border-ink/5 pt-5 md:grid-cols-2">
        <Item label="Goals">
          <Chips items={t.goals} />
        </Item>
        <Item label="Locations">
          <Chips items={t.locations} tone="action" />
        </Item>
        <Item label="Accounts like yours">
          <Chips items={t.inspirationalProfiles} />
        </Item>
        <Item label="Hashtags">
          <Chips items={t.hashtags} tone="success" />
        </Item>
      </div>

      {t.additionalInfo && (
        <div className="mt-5 border-t border-ink/5 pt-5">
          <Item label="Notes for your manager">
            <p className="font-normal leading-relaxed text-secondary">
              {t.additionalInfo}
            </p>
          </Item>
        </div>
      )}
    </GlassCard>
  );
}
