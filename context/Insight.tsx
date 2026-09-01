"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";

export type InsightType =
  | "Press Release"
  | "Articles"
  | "All";

type InsightsContextType = {
  selectedInsigth: InsightType;
  setSelectedInsigth: (dept: InsightType) => void;
  refreshInsights: () => void;
};

const insightsContext = createContext<InsightsContextType | undefined>(undefined);

export function InsigthProvider({ children }: { children: ReactNode }) {
  const [selectedInsigth, setSelectedInsigth] = useState<InsightType>("All");
  const router = useRouter();

  const refreshInsights = useCallback(() => {
    router.refresh();
  }, [router]);

  return (
    <insightsContext.Provider value={{ selectedInsigth, setSelectedInsigth, refreshInsights }}>
      {children}
    </insightsContext.Provider>
  );
}

export function useInsigth() {
  const context = useContext(insightsContext);
  if (!context) throw new Error("useInsigth must be used within InsightProvider");
  return context;
}