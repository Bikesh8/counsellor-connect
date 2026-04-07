import { useCompare } from "@/contexts/CompareContext";
import { Link } from "react-router-dom";
import { X, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function CompareProgramsPage() {
  const { comparePrograms, removeProgram } = useCompare();
  const [groupByUni, setGroupByUni] = useState(false);

  if (comparePrograms.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-lg font-medium text-foreground">No programs selected</p>
        <p className="text-sm text-muted-foreground mt-1">Add programs to compare from university pages</p>
        <Link to="/public/universities" className="inline-flex items-center gap-1 mt-4 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Browse Universities
        </Link>
      </div>
    );
  }

  const uniqueUnis = [...new Set(comparePrograms.map(p => p.universityName))];
  const allFees = comparePrograms.map(p => p.tuitionFee);
  const allIelts = comparePrograms.map(p => p.ieltsRequirement);
  const minFee = Math.min(...allFees);
  const minIelts = Math.min(...allIelts);

  // Duration in years for comparison
  const parseDuration = (d: string) => {
    const match = d.match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 99;
  };
  const allDurations = comparePrograms.map(p => parseDuration(p.duration));
  const minDuration = Math.min(...allDurations);

  type Row = { label: string; getValue: (p: typeof comparePrograms[0]) => string; highlight?: (p: typeof comparePrograms[0]) => boolean };
  const rows: Row[] = [
    { label: "University", getValue: p => p.universityName },
    { label: "Program", getValue: p => p.name },
    { label: "Degree", getValue: p => p.degree },
    { label: "Duration", getValue: p => p.duration, highlight: p => parseDuration(p.duration) === minDuration },
    { label: "Tuition Fee", getValue: p => `${p.currency} ${p.tuitionFee.toLocaleString()}`, highlight: p => p.tuitionFee === minFee },
    { label: "IELTS", getValue: p => `${p.ieltsRequirement}`, highlight: p => p.ieltsRequirement === minIelts },
    { label: "Intake", getValue: p => p.intake.join(", ") },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/public/universities" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Universities
      </Link>
      <h1 className="text-2xl font-bold text-foreground mb-2">Compare Programs</h1>
      <p className="text-sm text-muted-foreground mb-4">Comparing programs across {uniqueUnis.length} {uniqueUnis.length === 1 ? "university" : "universities"}</p>

      <div className="flex gap-1 mb-6">
        <button
          onClick={() => setGroupByUni(true)}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${groupByUni ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
        >
          Group by University
        </button>
        <button
          onClick={() => setGroupByUni(false)}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${!groupByUni ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
        >
          Flat View
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground w-36"></th>
              {comparePrograms.map(p => (
                <th key={p.id} className="p-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-bold text-foreground">{p.name}</span>
                    <span className="text-[10px] text-muted-foreground">{p.universityName}</span>
                    <button onClick={() => removeProgram(p.id)} className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 mt-1">
                      <X className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                <td className="p-4 text-xs font-semibold text-muted-foreground">{row.label}</td>
                {comparePrograms.map(p => (
                  <td key={p.id} className={`p-4 text-sm text-center ${row.highlight?.(p) ? "text-green-600 font-bold bg-green-50" : "text-foreground"}`}>
                    {row.getValue(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
