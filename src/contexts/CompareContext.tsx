import { createContext, useContext, useState, ReactNode } from "react";
import { University, Program } from "@/data/mockUniversities";

interface CompareContextType {
  compareUniversities: University[];
  comparePrograms: Program[];
  addUniversity: (u: University) => void;
  removeUniversity: (id: string) => void;
  addProgram: (p: Program) => void;
  removeProgram: (id: string) => void;
  isUniversitySelected: (id: string) => boolean;
  isProgramSelected: (id: string) => boolean;
  clearAll: () => void;
}

const CompareContext = createContext<CompareContextType | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareUniversities, setCompareUniversities] = useState<University[]>([]);
  const [comparePrograms, setComparePrograms] = useState<Program[]>([]);

  const addUniversity = (u: University) => {
    setCompareUniversities(prev => prev.length >= 4 ? prev : prev.find(x => x.id === u.id) ? prev : [...prev, u]);
  };
  const removeUniversity = (id: string) => setCompareUniversities(prev => prev.filter(x => x.id !== id));
  const addProgram = (p: Program) => {
    setComparePrograms(prev => prev.length >= 4 ? prev : prev.find(x => x.id === p.id) ? prev : [...prev, p]);
  };
  const removeProgram = (id: string) => setComparePrograms(prev => prev.filter(x => x.id !== id));
  const isUniversitySelected = (id: string) => compareUniversities.some(x => x.id === id);
  const isProgramSelected = (id: string) => comparePrograms.some(x => x.id === id);
  const clearAll = () => { setCompareUniversities([]); setComparePrograms([]); };

  return (
    <CompareContext.Provider value={{ compareUniversities, comparePrograms, addUniversity, removeUniversity, addProgram, removeProgram, isUniversitySelected, isProgramSelected, clearAll }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
