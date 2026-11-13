"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { DEFAULT_NICHE } from "../data";

type NicheState = [number, (index: number) => void];

const NicheContext = createContext<NicheState | null>(null);

/**
 * Shares the selected niche between sections, so the tabs in
 * "Who you want to reach" also switch "The growth, up close".
 */
export function NicheProvider({ children }: { children: ReactNode }) {
  const state = useState(DEFAULT_NICHE);
  return (
    <NicheContext.Provider value={state}>{children}</NicheContext.Provider>
  );
}

/** The shared niche when inside a NicheProvider, otherwise a local one. */
export function useNiche(): NicheState {
  const shared = useContext(NicheContext);
  const local = useState(DEFAULT_NICHE);
  return shared ?? local;
}
