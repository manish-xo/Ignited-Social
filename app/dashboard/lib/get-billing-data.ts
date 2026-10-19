import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { paypalFetch } from "@/lib/paypal/client";
import { getPlan } from "@/lib/plans";
import { UPSELL_OFFERS } from "@/lib/upsells";
import { ADDON_OFFERS } from "@/app/Addons/lib/addons";
import { getDashboardUser } from "./session";
import type {
  BillingPageData,
  OfferCard,
  Payment,
  SubscriptionLine,
} from "./types";

const PAYPAL_TIMEOUT_MS = 8_000;

const PAYPAL_MANAGE_URL =
  process.env.PAYPAL_ENV === "live"
    ? "https://www.paypal.com/myaccount/autopay/"
    : "https://www.sandbox.paypal.com/myaccount/autopay/";

// The parts of PayPal's subscription and transaction responses we use.
interface PayPalSubscription {
  status?: string;
  start_time?: string;
  subscriber?: {
    email_address?: string;
    name?: { given_name?: string; surname?: string };
    shipping_address?: {
      address?: { country_code?: string; postal_code?: string };
    };
  };
  billing_info?: { next_billing_time?: string };
}

interface PayPalTransaction {
  id: string;
  status: string;
  time: string;
  amount_with_breakdown?: {
    gross_amount?: { value: string; currency_code: string };
  };
}

const paypalGet = <T,>(path: string) =>
  paypalFetch(path, {
    signal: AbortSignal.timeout(PAYPAL_TIMEOUT_MS),
  }) as Promise<T>;

function paymentStatus(s: string): Payment["status"] {
  if (s === "COMPLETED") return "paid";
  if (s === "REFUNDED" || s === "PARTIALLY_REFUNDED") return "refunded";
  if (s === "DECLINED") return "failed";
  return "pending";
}

interface Row {
  id: string;
  name: string;
  kind: SubscriptionLine["kind"];
  monthlyPrice: number;
  dbStatus: string | null;
  createdAt: string;
  slugs: string[];
}

export async function getBillingData(): Promise<BillingPageData> {
  const { signupId, subscription, planSlug, email } = await getDashboardUser();

  const [{ data: upsells }, { data: addons }] = await Promise.all([
    signupId
      ? supabaseAdmin
          .from("paypal_upsells")
          .select("paypal_subscription_id, offer, monthly_amount, status, created_at")
          .eq("signup_id", signupId)
      : Promise.resolve({ data: [] }),
    signupId
      ? supabaseAdmin
          .from("paypal_addons")
          .select("paypal_subscription_id, addons, monthly_amount, status, created_at")
          .eq("signup_id", signupId)
      : Promise.resolve({ data: [] }),
  ]);

  const plan = planSlug ? getPlan(planSlug) : null;

  const rows: Row[] = [];
  if (subscription?.paypal_subscription_id) {
    rows.push({
      id: subscription.paypal_subscription_id,
      name: `${plan?.name ?? "Growth"} plan`,
      kind: "plan",
      monthlyPrice: plan?.price ?? 0,
      dbStatus: subscription.status,
      createdAt: subscription.created_at,
      slugs: [],
    });
  }
  for (const u of upsells ?? []) {
    rows.push({
      id: u.paypal_subscription_id,
      name: UPSELL_OFFERS.find((o) => o.slug === u.offer)?.name ?? u.offer,
      kind: "upsell",
      monthlyPrice: Number(u.monthly_amount) || 0,
      dbStatus: u.status,
      createdAt: u.created_at,
      slugs: [u.offer],
    });
  }
  for (const a of addons ?? []) {
    const slugs = (a.addons ?? []) as string[];
    rows.push({
      id: a.paypal_subscription_id,
      name: slugs
        .map((s) => ADDON_OFFERS.find((o) => o.slug === s)?.name ?? s)
        .join(" + "),
      kind: "addon",
      monthlyPrice: Number(a.monthly_amount) || 0,
      dbStatus: a.status,
      createdAt: a.created_at,
      slugs,
    });
  }

  // Live details from PayPal. One failing call doesn't break the page; the
  // stored status is shown instead.
  let paypalReachable = rows.length === 0;
  const live = await Promise.all(
    rows.map(async (row) => {
      const since = new Date(Date.parse(row.createdAt) - 86_400_000);
      const [sub, tx] = await Promise.allSettled([
        paypalGet<PayPalSubscription>(`/v1/billing/subscriptions/${row.id}`),
        paypalGet<{ transactions?: PayPalTransaction[] }>(
          `/v1/billing/subscriptions/${row.id}/transactions?` +
            new URLSearchParams({
              start_time: since.toISOString(),
              end_time: new Date().toISOString(),
            }),
        ),
      ]);
      if (sub.status === "fulfilled") paypalReachable = true;
      else console.error(`PayPal subscription ${row.id}:`, sub.reason);
      return {
        row,
        sub: sub.status === "fulfilled" ? sub.value : null,
        transactions:
          tx.status === "fulfilled" ? (tx.value?.transactions ?? []) : [],
      };
    }),
  );

  const subscriptions: SubscriptionLine[] = live.map(({ row, sub }) => ({
    id: row.id,
    name: row.name,
    kind: row.kind,
    monthlyPrice: row.monthlyPrice,
    status: sub?.status ?? row.dbStatus ?? "UNKNOWN",
    nextBillingDate: sub?.billing_info?.next_billing_time ?? null,
    startedAt: sub?.start_time ?? row.createdAt,
  }));

  const payments: Payment[] = live
    .flatMap(({ row, transactions }) =>
      transactions.map((t) => ({
        id: t.id,
        description: row.name,
        status: paymentStatus(t.status),
        date: t.time,
        amount: Number(t.amount_with_breakdown?.gross_amount?.value) || 0,
        currency: t.amount_with_breakdown?.gross_amount?.currency_code ?? "USD",
      })),
    )
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  const active = subscriptions.filter((s) => s.status === "ACTIVE");
  const nextDates = active
    .map((s) => s.nextBillingDate)
    .filter((d): d is string => !!d)
    .sort();

  // Billing details: what PayPal has for the main subscription, else what we
  // stored at checkout.
  const mainSub = live.find((l) => l.row.kind === "plan")?.sub;
  const name = [
    mainSub?.subscriber?.name?.given_name,
    mainSub?.subscriber?.name?.surname,
  ]
    .filter(Boolean)
    .join(" ");

  // Offers the customer doesn't have yet. Either Content Creation tier counts
  // as having content creation.
  const owned = new Set(live.flatMap((l) => l.row.slugs));
  const hasContent = UPSELL_OFFERS.some((o) => owned.has(o.slug));
  const offers: OfferCard[] = [
    ...(hasContent
      ? []
      : UPSELL_OFFERS.map((o) => ({
          slug: o.slug,
          name: o.name,
          monthlyPrice: o.monthlyPrice,
          description: o.features[0],
        }))),
    ...ADDON_OFFERS.filter((o) => !owned.has(o.slug)).map((o) => ({
      slug: o.slug,
      name: o.name,
      monthlyPrice: o.monthlyPrice,
      description: o.description,
    })),
  ];

  return {
    plan: plan
      ? {
          name: plan.name,
          price: plan.price,
          features: plan.features.map((f) => f.text),
        }
      : null,
    subscriptions,
    monthlyTotal: active.reduce((sum, s) => sum + s.monthlyPrice, 0),
    nextBillingDate: nextDates[0] ?? null,
    billing: {
      name: name || subscription?.full_name || null,
      email: mainSub?.subscriber?.email_address ?? subscription?.email ?? email,
      country:
        mainSub?.subscriber?.shipping_address?.address?.country_code ??
        subscription?.country ??
        null,
      postalCode:
        mainSub?.subscriber?.shipping_address?.address?.postal_code ??
        subscription?.postal_code ??
        null,
    },
    payments,
    paypalReachable,
    paypalManageUrl: PAYPAL_MANAGE_URL,
    offers,
  };
}
