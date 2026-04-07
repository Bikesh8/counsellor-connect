import { useCompare } from "@/contexts/CompareContext";
import { Link } from "react-router-dom";
import { X, ArrowLeft } from "lucide-react";

export default function CompareUniversitiesPage() {
  const { compareUniversities, removeUniversity } = useCompare();

  if (compareUniversities.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-lg font-medium text-foreground">No universities selected</p>
        <p className="text-sm text-muted-foreground mt-1">Add universities to compare from the listing page</p>
        <Link to="/public/universities" className="inline-flex items-center gap-1 mt-4 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Browse Universities
        </Link>
      </div>
    );
  }

  const rows: { label: string; getValue: (u: typeof compareUniversities[0]) => string }[] = [
    { label: "Location", getValue: u => `${u.city}, ${u.country}` },
    { label: "Type", getValue: u => u.type },
    { label: "Assessment Level", getValue: u => u.assessmentLevel },
    { label: "Ranking", getValue: u => u.ranking ? `#${u.ranking}` : "N/A" },
    { label: "Programs Available", getValue: u => `${u.programs.length}` },
    { label: "Scholarships", getValue: u => u.scholarships.length > 0 ? u.scholarships.map(s => s.name).join(", ") : "None listed" },
    { label: "Contact Email", getValue: u => u.contact.email },
    { label: "Website", getValue: u => u.website },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/public/universities" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Universities
      </Link>
      <h1 className="text-2xl font-bold text-foreground mb-2">Compare Universities</h1>
      <p className="text-sm text-muted-foreground mb-8">Comparing {compareUniversities.length} universities</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground w-40"></th>
              {compareUniversities.map(u => (
                <th key={u.id} className="p-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-xl bg-card border border-border overflow-hidden shadow">
                      <img src={u.logo} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm font-bold text-foreground">{u.name}</span>
                    <button onClick={() => removeUniversity(u.id)} className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1">
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
                {compareUniversities.map(u => (
                  <td key={u.id} className="p-4 text-sm text-foreground text-center">{row.getValue(u)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
