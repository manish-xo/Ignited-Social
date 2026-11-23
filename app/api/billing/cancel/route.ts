import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { paypalFetch } from "@/lib/paypal/client";

/**
 * Cancel one or more of the signed-in customer's subscriptions from the
 * dashboard. Cancelling the main plan cancels the content and add-ons too,
 * since they run on top of it. PayPal stops future charges; nothing already
 * paid is refunded here.
 */
const schema = z.object({
  ids: z.array(z.string().min(1).max(64)).min(1).max(10),
  reason: z.string().trim().max(500).optional(),
});

type Kind = "plan" | "upsell" | "addon";
const TABLE: Record<Kind, string> = {
  plan: "paypal_subscriptions",
  upsell: "paypal_upsells",
  addon: "paypal_addons",
};

export const POST = async (req: NextRequest) => {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
  const { ids, reason } = parsed.data;

  // Who's asking: the dashboard's Supabase session.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => req.cookies.getAll(), setAll: () => {} } },
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(
      { message: "Please log in again." },
      { status: 401 },
    );
  }
  const signupId = (user.user_metadata?.signup_id as string) ?? null;
  if (!signupId) {
    return NextResponse.json(
      { message: "We couldn't find subscriptions on this account." },
      { status: 404 },
    );
  }

  // Everything this customer pays for, so nobody can cancel someone else's.
  const [main, upsells, addons] = await Promise.all(
    (Object.keys(TABLE) as Kind[]).map((kind) =>
      supabaseAdmin
        .from(TABLE[kind])
        .select("paypal_subscription_id, status")
        .eq("signup_id", signupId),
    ),
  );
  if (main.error || upsells.error || addons.error) {
    console.error(
      "billing/cancel lookup error:",
      main.error ?? upsells.error ?? addons.error,
    );
    return NextResponse.json(
      { message: "Couldn't load your subscriptions. Please try again." },
      { status: 500 },
    );
  }
  const owned = [
    ...(main.data ?? []).map((r) => ({ ...r, kind: "plan" as Kind })),
    ...(upsells.data ?? []).map((r) => ({ ...r, kind: "upsell" as Kind })),
    ...(addons.data ?? []).map((r) => ({ ...r, kind: "addon" as Kind })),
  ].filter((r) => r.paypal_subscription_id);

  const ownedIds = new Set(owned.map((r) => r.paypal_subscription_id));
  if (!ids.every((id) => ownedIds.has(id))) {
    return NextResponse.json(
      { message: "Subscription not found." },
      { status: 404 },
    );
  }

  // The plan takes everything with it.
  const plan = owned.find(
    (r) => r.kind === "plan" && ids.includes(r.paypal_subscription_id),
  );
  const targets = (
    plan ? owned : owned.filter((r) => ids.includes(r.paypal_subscription_id))
  ).filter((r) => r.status !== "CANCELLED");

  const paypalReason = (reason || "Cancelled from the dashboard").slice(0, 127);
  const results = await Promise.all(
    targets.map(async (t) => {
      try {
        await paypalFetch(
          `/v1/billing/subscriptions/${t.paypal_subscription_id}/cancel`,
          {
            method: "POST",
            body: JSON.stringify({ reason: paypalReason }),
          },
        );
        return { ...t, ok: true };
      } catch (err) {
        // Already cancelled in PayPal (e.g. from PayPal itself): fine.
        if (String(err).includes("SUBSCRIPTION_STATUS_INVALID"))
          return { ...t, ok: true };
        console.error(
          `billing/cancel PayPal ${t.paypal_subscription_id}:`,
          err,
        );
        return { ...t, ok: false };
      }
    }),
  );

  const cancelled = results.filter((r) => r.ok);
  const failed = results.filter((r) => !r.ok);

  // Mirror the new status in our tables and keep the reason for the team.
  await Promise.all(
    (Object.keys(TABLE) as Kind[]).map(async (kind) => {
      const idsOfKind = cancelled
        .filter((r) => r.kind === kind)
        .map((r) => r.paypal_subscription_id);
      if (!idsOfKind.length) return;
      const { error } = await supabaseAdmin
        .from(TABLE[kind])
        .update({ status: "CANCELLED" })
        .in("paypal_subscription_id", idsOfKind);
      if (error)
        console.error(`billing/cancel status update (${kind}):`, error);
    }),
  );
  if (cancelled.length) {
    const { error } = await supabaseAdmin
      .from("subscription_cancellations")
      .insert(
        cancelled.map((r) => ({
          user_id: user.id,
          signup_id: signupId,
          paypal_subscription_id: r.paypal_subscription_id,
          kind: r.kind,
          reason: reason || null,
        })),
      );
    // Missing table (migration not run yet) shouldn't undo a done cancellation.
    if (error) console.error("billing/cancel log insert:", error);
  }

  if (failed.length && !cancelled.length) {
    return NextResponse.json(
      {
        message:
          "PayPal didn't accept the cancellation. Please try again in a moment.",
      },
      { status: 502 },
    );
  }
  return NextResponse.json({
    cancelled: cancelled.map((r) => r.paypal_subscription_id),
    failed: failed.map((r) => r.paypal_subscription_id),
  });
};
