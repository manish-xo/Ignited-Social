import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { getPlan } from "@/lib/plans";

interface SuccessPageProps {
  searchParams: Promise<{ plan?: string }>;
}

export default async function PaymentSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const params = await searchParams;
  const plan = getPlan(params.plan);

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 size={28} className="text-success" />
        </div>
        <h1 className="mt-6 font-heading text-3xl font-bold text-ink">
          You&apos;re all set
        </h1>
        <p className="mt-2 text-sm text-secondary">
          Your {plan.name} plan is active. Your growth manager will reach out
          within 24 hours to kick things off.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-action px-6 text-sm font-semibold text-white hover:bg-action-hover"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
