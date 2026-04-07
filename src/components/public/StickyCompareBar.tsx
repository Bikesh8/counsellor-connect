import { useCompare } from "@/contexts/CompareContext";
import { X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function StickyCompareBar() {
  const { compareUniversities, comparePrograms, removeUniversity, removeProgram, clearAll } = useCompare();
  const uniCount = compareUniversities.length;
  const progCount = comparePrograms.length;
  const total = uniCount + progCount;

  if (total === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t-2 border-primary shadow-[0_-4px_20px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 overflow-x-auto">
        <span className="text-sm font-semibold text-foreground shrink-0">Compare ({total}/4):</span>

        <div className="flex items-center gap-2 flex-1 overflow-x-auto">
          {compareUniversities.map(u => (
            <div key={u.id} className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium shrink-0">
              {u.name}
              <button onClick={() => removeUniversity(u.id)} className="hover:bg-primary/20 rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {comparePrograms.map(p => (
            <div key={p.id} className="flex items-center gap-1.5 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-medium shrink-0">
              {p.name} <span className="text-muted-foreground">• {p.universityName}</span>
              <button onClick={() => removeProgram(p.id)} className="hover:bg-muted rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button onClick={clearAll} className="text-xs text-muted-foreground hover:text-foreground">Clear</button>
          {uniCount > 0 && (
            <Link to="/public/compare/universities" className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90">
              Compare Unis <ArrowRight className="w-3 h-3" />
            </Link>
          )}
          {progCount > 0 && (
            <Link to="/public/compare/programs" className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90">
              Compare Programs <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
