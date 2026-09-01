"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type DepartmentContextType = {
  selectedDepartment: string;
  setSelectedDepartment: (dept: string) => void;
};

const DepartmentContext = createContext<DepartmentContextType | undefined>(undefined);

export function DepartmentProvider({ children }: { children: ReactNode }) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  return (
    <DepartmentContext.Provider value={{ selectedDepartment, setSelectedDepartment }}>
      {children}
    </DepartmentContext.Provider>
  );
}

export function useDepartment() {
  const context = useContext(DepartmentContext);
  if (!context) throw new Error("useDepartment must be used within DepartmentProvider");
  return context;
}