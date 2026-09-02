import SetupForm from "./SetupForm";

interface SetupPageProps {
  searchParams: Promise<{
    plan?: string;
    username?: string;
    addons?: string;
  }>;
}

const Setup = async ({ searchParams }: SetupPageProps) => {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-6 py-12">
      <div className="mt-6 w-full max-w-xl">
        <div className="rounded-3xl border border-border bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="relative mx-auto text-[0.7rem] font-[600] uppercase tracking-[0.09rem] text-action">
            Dashboard setup
          </div>

          <h1 className="mt-3 text-3xl font-[700] tracking-tighter text-ink sm:text-4xl">
            Create your password
          </h1>
          <p className="text-md mt-3 text-secondary">
            Create a secure password for your dashboard to track your campaign
            progress.
          </p>

          <SetupForm
            plan={params.plan ?? ""}
            username={params.username ?? ""}
            addons={params.addons ?? ""}
          />
        </div>
      </div>
    </div>
  );
};

export default Setup;
