"use client";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import zosResolver from "@hookform/resolvers/zod";

interface CompletePageProps {
  searchParams: Promise<{
    plan?: string;
    username?: string;
    addons?: string;
  }>;
}

const Setup = async ({ searchParams }: CompletePageProps) => {
  // const params = await searchParams;
  // const username = params.username ?? "yourhandle";
  // const initial = username.replace(/^@/, "")[0]?.toUpperCase() ?? "?";

  const onSubmit = () => {};

  // const dashboardSetupUrl = `/Dashboard-Setup/Setup?${new URLSearchParams({
  //   plan: params.plan ?? "",
  //   username,
  //   ...(params.addons ? { addons: params.addons } : {}),
  // }).toString()}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-6 py-12">
      <div className="w-full max-w-xl mt-6">
        <div className="rounded-3xl border border-border bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="relative mx-auto uppercase font-[600] text-[0.7rem] text-action tracking-[0.09rem]">
            dashboard setup
          </div>

          <h1 className="mt-3 text-3xl font-[700] tracking-tighter text-ink sm:text-4xl">
            Create your password
          </h1>
          <p className="mt-3 text-md text-secondary">
            Create a secure password for your Social Boost dashboard to track
            your campaign progress.
          </p>

          <form onSubmit={onSubmit} className="mt-8">
            <FieldGroup>
              <Controller
                control={form.control}
                name="email"
                render={({ field }) => <Field></Field>}
              />
            </FieldGroup>
          </form>

          {/* <Link
            href={dashboardSetupUrl}
            className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-xl bg-action text-sm font-medium text-white transition-colors hover:bg-action-hover"
          >
            Continue to Dashboard Setup
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Setup;
