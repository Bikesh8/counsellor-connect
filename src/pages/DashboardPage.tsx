import { mockLeads, mockTasks, COUNSELLOR_NAME } from "@/data/mockData";
import { Users, UserCheck, AlertTriangle, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const totalLeads = mockLeads.length;
  const converted = mockLeads.filter((l) => l.stage === "Converted").length;
  const overdueTasks = mockTasks.filter((t) => t.status === "overdue").length;
  const highPriority = mockLeads.filter((l) => l.priority === "High").length;

  const stats = [
    { label: "Total Leads", value: totalLeads, icon: Users, color: "text-primary" },
    { label: "Converted", value: converted, icon: UserCheck, color: "text-badge-low" },
    { label: "Overdue Tasks", value: overdueTasks, icon: AlertTriangle, color: "text-destructive" },
    { label: "High Priority", value: highPriority, icon: TrendingUp, color: "text-badge-high" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-1">Dashboard</h1>
      <p className="text-sm text-muted-foreground mb-6">Welcome back, {COUNSELLOR_NAME}</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent leads */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Recent Leads</h2>
        </div>
        <div className="divide-y divide-border">
          {mockLeads.slice(0, 5).map((lead) => (
            <div key={lead.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">{lead.name}</p>
                <p className="text-xs text-muted-foreground">{lead.program} · {lead.country}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                lead.priority === "High" ? "bg-badge-high-bg text-badge-high" :
                lead.priority === "Medium" ? "bg-badge-medium-bg text-badge-medium" :
                "bg-badge-low-bg text-badge-low"
              }`}>
                {lead.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
