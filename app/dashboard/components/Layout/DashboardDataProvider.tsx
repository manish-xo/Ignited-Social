"use client";

import { createContext, useContext, type ReactNode } from "react";
// import type { DashboardData } from "@/lib/dashboard/types";
import { DashboardData } from "../../lib/types";

const DashboardDataContext = createContext<DashboardData | null>(null);

export function useDashboardData() {
  const ctx = useContext(DashboardDataContext);
  if (!ctx) {
    throw new Error(
      "useDashboardData must be used inside DashboardDataProvider",
    );
  }
  return ctx;
}

export function DashboardDataProvider({
  data,
  children,
}: {
  data: DashboardData;
  children: ReactNode;
}) {
  return (
    <DashboardDataContext.Provider value={data}>
      {children}
    </DashboardDataContext.Provider>
  );
}
