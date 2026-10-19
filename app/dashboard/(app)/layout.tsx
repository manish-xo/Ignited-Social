import type { Metadata } from "next";
import { getShellData } from "../lib/session";
import Backdrop from "../_components/shell/Backdrop";
import Sidebar from "../_components/shell/Sidebar";
import MobileNav from "../_components/shell/MobileNav";
import DashboardHeader from "../_components/shell/DashboardHeader";

export const metadata: Metadata = {
  title: "Dashboard · Ignited Social",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const shell = await getShellData();

  return (
    <div className="relative isolate min-h-dvh">
      <Backdrop />
      <div className="flex w-full gap-4 px-3 pb-28 pt-3 md:px-4 md:pb-4 md:pt-4">
        <Sidebar />
        <main className="min-w-0 flex-1 space-y-5">
          <DashboardHeader shell={shell} />
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
