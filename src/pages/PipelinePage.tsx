import { useState } from "react";
import { mockLeads, Lead } from "@/data/mockData";
import { StageBadge } from "@/components/StageBadge";
import { PriorityBadge } from "@/components/PriorityBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail } from "lucide-react";

const pipelineStages = ["New Lead", "Contacted", "Counselling", "Application Started", "Applied", "Offer Received", "Visa Process", "Converted", "Lost"];

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);

  const updateStage = (id: number, stage: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage: stage as Lead["stage"] } : l)));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-1">Pipeline</h1>
      <p className="text-sm text-muted-foreground mb-6">Update lead stages to track progress</p>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-card rounded-lg border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Student Details</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Country</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Program</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Priority</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Stage</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Follow-up</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className={`border-b border-border hover:bg-muted/50 transition-colors ${lead.isOverdue ? "bg-destructive/5" : ""}`}>
                <td className="py-3 px-4">
                  <div>
                    <p className="font-semibold text-foreground">{lead.name} <span className="text-muted-foreground font-normal text-xs">#{lead.id}</span></p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" />{lead.email}</p>
                  </div>
                </td>
                <td className="py-3 px-3 text-xs">{lead.country}</td>
                <td className="py-3 px-3 text-xs">{lead.program}</td>
                <td className="py-3 px-3"><PriorityBadge priority={lead.priority} /></td>
                <td className="py-3 px-3">
                  <Select value={lead.stage} onValueChange={(val) => updateStage(lead.id, val)}>
                    <SelectTrigger className="h-7 text-xs border-0 bg-transparent p-0 w-auto gap-1 shadow-none focus:ring-0">
                      <StageBadge stage={lead.stage} />
                    </SelectTrigger>
                    <SelectContent>
                      {pipelineStages.map((s) => (
                        <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="py-3 px-3">
                  {lead.nextFollowUp ? (
                    <p className={`text-xs ${lead.isOverdue ? "text-destructive font-semibold" : "text-muted-foreground"}`}>
                      {lead.isOverdue ? "⚠ Overdue: " : ""}{lead.nextFollowUp}
                    </p>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-3">
        {leads.map((lead) => (
          <div key={lead.id} className={`bg-card rounded-lg border border-border p-4 ${lead.isOverdue ? "border-destructive/30" : ""}`}>
            <div className="mb-2">
              <p className="font-semibold text-foreground">{lead.name} <span className="text-muted-foreground text-xs">#{lead.id}</span></p>
              <p className="text-xs text-muted-foreground">{lead.email}</p>
            </div>
            <div className="text-xs text-muted-foreground mb-2">{lead.country} · {lead.program}</div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <PriorityBadge priority={lead.priority} />
              <Select value={lead.stage} onValueChange={(val) => updateStage(lead.id, val)}>
                <SelectTrigger className="h-7 text-xs border-0 bg-transparent p-0 w-auto gap-1 shadow-none focus:ring-0">
                  <StageBadge stage={lead.stage} />
                </SelectTrigger>
                <SelectContent>
                  {pipelineStages.map((s) => (
                    <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {lead.isOverdue && lead.nextFollowUp && (
              <p className="text-xs text-destructive font-semibold">⚠ Overdue follow-up: {lead.nextFollowUp}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
