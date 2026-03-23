import { mockLeads } from "@/data/mockData";
import { StageBadge } from "@/components/StageBadge";
import { PriorityBadge } from "@/components/PriorityBadge";

const pipelineStages = ["New Lead", "Contacted", "Counselling", "Applied", "Offer Received", "Visa Process", "Converted", "Lost"];

export default function PipelinePage() {
  const leadsByStage = pipelineStages.map((stage) => ({
    stage,
    leads: mockLeads.filter((l) => l.stage === stage || (stage === "Applied" && l.stage === "Application Started")),
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-1">Pipeline</h1>
      <p className="text-sm text-muted-foreground mb-6">Drag leads between stages to update progress</p>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {leadsByStage.map(({ stage, leads }) => (
          <div key={stage} className="min-w-[260px] bg-card rounded-lg border border-border flex-shrink-0">
            <div className="p-3 border-b border-border flex items-center justify-between">
              <StageBadge stage={stage} />
              <span className="text-xs text-muted-foreground font-semibold">{leads.length}</span>
            </div>
            <div className="p-2 space-y-2 min-h-[200px]">
              {leads.map((lead) => (
                <div key={lead.id} className={`p-3 rounded-md border border-border bg-background hover:shadow-sm transition-shadow cursor-grab ${lead.isOverdue ? "border-destructive/40" : ""}`}>
                  <p className="text-sm font-semibold text-foreground">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.program} · {lead.country}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <PriorityBadge priority={lead.priority} />
                  </div>
                  {lead.isOverdue && (
                    <p className="text-[10px] text-destructive font-semibold mt-1">⚠ Overdue follow-up</p>
                  )}
                </div>
              ))}
              {leads.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-8">No leads</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
