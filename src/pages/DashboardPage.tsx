import { mockLeads, mockTasks, mockCalendarEvents, COUNSELLOR_NAME } from "@/data/mockData";
import {
  Info, Bell, Download, Plus, ArrowRight, Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const totalLeads = mockLeads.length;
  const activeStudents = mockLeads.filter((l) => !["Lost"].includes(l.stage)).length;
  const openCases = mockLeads.filter((l) =>
    ["Counselling", "Application Started", "Applied", "Offer Received", "Visa Process"].includes(l.stage)
  ).length;
  const inProgress = mockLeads.filter((l) => ["Application Started", "Applied"].includes(l.stage)).length;
  const pendingTasks = mockTasks.filter((t) => t.status !== "completed").length;
  const overdueTasks = mockTasks.filter((t) => t.status === "overdue").length;

  // Pipeline by stage (study abroad context)
  const pipelineStages = [
    { label: "Inquiry", key: "New Lead", color: "bg-muted-foreground/40" },
    { label: "Counselling", key: "Counselling", color: "bg-primary" },
    { label: "Docs Collected", key: "Application Started", color: "bg-[hsl(250_60%_55%)]" },
    { label: "Applied", key: "Applied", color: "bg-[hsl(35_90%_55%)]" },
    { label: "Offer Received", key: "Offer Received", color: "bg-[hsl(160_65%_42%)]" },
    { label: "Visa Refused", key: "Lost", color: "bg-destructive" },
  ];
  const pipelineData = pipelineStages.map((s) => ({
    ...s,
    count: mockLeads.filter((l) => l.stage === s.key).length,
  }));
  const maxPipeline = Math.max(...pipelineData.map((p) => p.count), 1);

  // Country segments (replacing Skilled/Student/Partner)
  const countryMap = mockLeads.reduce<Record<string, number>>((acc, l) => {
    acc[l.country] = (acc[l.country] || 0) + 1;
    return acc;
  }, {});
  const topCountries = Object.entries(countryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  const countryTiles = topCountries.map(([name, count], i) => ({
    name,
    pct: Math.round((count / totalLeads) * 100),
    bg: ["bg-primary/10 text-primary", "bg-[hsl(160_65%_42%)]/10 text-[hsl(160_65%_30%)]", "bg-[hsl(35_90%_55%)]/15 text-[hsl(35_90%_35%)]"][i],
  }));

  // Upcoming deadlines from calendar + overdue tasks
  const upcoming = [...mockCalendarEvents]
    .sort((a, b) => (a.date + a.startTime).localeCompare(b.date + b.startTime))
    .slice(0, 4);

  // Recent activity feed
  const activity = [
    { dot: "bg-[hsl(160_65%_42%)]", text: `${mockLeads[0]?.name}'s application lodged via University Portal`, time: "10m ago" },
    { dot: "bg-[hsl(35_90%_55%)]", text: `Invoice #INV-2841 overdue — ${mockLeads[1]?.name} — $1,200`, time: "1h ago" },
    { dot: "bg-[hsl(250_60%_55%)]", text: `${COUNSELLOR_NAME} clocked in · 9:02 AM · Main Branch`, time: "3h ago" },
    { dot: "bg-primary", text: `Service Agreement sent to ${mockLeads[2]?.name}`, time: "4h ago" },
    { dot: "bg-destructive", text: `Visa refused — ${mockLeads[3]?.name} — Review required`, time: "Yesterday" },
    { dot: "bg-[hsl(160_65%_42%)]", text: `New lead: ${mockLeads[4]?.name} — via Instagram`, time: "Yesterday" },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search clients, cases…"
              className="w-72 px-3 py-1.5 text-sm bg-card border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button className="w-9 h-9 rounded-md border border-border bg-card flex items-center justify-center hover:bg-muted">
            <Bell className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="px-3 py-1.5 text-sm font-medium border border-border rounded-md bg-card hover:bg-muted flex items-center gap-1.5">
            <Download className="w-4 h-4" /> Export
          </button>
          <Link to="/leads" className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> New Client
          </Link>
        </div>
      </div>

      {/* Alert banner */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-primary/5 border border-primary/20 rounded-md text-sm">
        <Info className="w-4 h-4 text-primary shrink-0" />
        <p className="text-foreground">
          <span className="font-semibold">{overdueTasks} deadlines</span>
          <span className="text-muted-foreground"> in the next 7 days · </span>
          <span className="font-semibold">2 invoices overdue</span>
          <span className="text-muted-foreground"> · {COUNSELLOR_NAME} on approved leave until 5 May</span>
        </p>
      </div>

      {/* KPI tiles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "ACTIVE CLIENTS", value: activeStudents, sub: "↑ 12 this month", subColor: "text-[hsl(160_65%_42%)]", bar: "bg-primary", barWidth: "70%" },
          { label: "OPEN CASES", value: openCases, sub: `${inProgress} in progress`, subColor: "text-muted-foreground", bar: "bg-[hsl(250_60%_55%)]", barWidth: "55%" },
          { label: "REVENUE MTD", value: "$94k", sub: "↑ 18% vs Apr", subColor: "text-[hsl(160_65%_42%)]", bar: "bg-[hsl(160_65%_42%)]", barWidth: "85%" },
          { label: "PENDING TASKS", value: pendingTasks, sub: `${overdueTasks} overdue`, subColor: "text-destructive", bar: "bg-destructive", barWidth: "40%" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-lg border border-border p-4">
            <p className="text-[11px] font-semibold tracking-wider text-muted-foreground">{s.label}</p>
            <p className="text-3xl font-bold text-foreground mt-2">{s.value}</p>
            <p className={`text-xs mt-1 ${s.subColor}`}>{s.sub}</p>
            <div className="h-1 bg-muted rounded-full mt-3 overflow-hidden">
              <div className={`h-full ${s.bar} rounded-full`} style={{ width: s.barWidth }} />
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Case Pipeline */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Case Pipeline</h2>
            <Link to="/pipeline" className="text-xs text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {pipelineData.map((p) => (
              <div key={p.label} className="flex items-center gap-3">
                <span className="w-32 text-sm text-foreground shrink-0">{p.label}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${p.color} rounded-full`} style={{ width: `${(p.count / maxPipeline) * 100}%` }} />
                </div>
                <span className="w-8 text-right text-sm font-medium text-foreground">{p.count}</span>
              </div>
            ))}
          </div>

          {/* Country segments */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            {countryTiles.map((c) => (
              <div key={c.name} className={`rounded-md py-4 text-center ${c.bg}`}>
                <p className="text-[11px] font-semibold tracking-wider opacity-80">{c.name.toUpperCase()}</p>
                <p className="text-2xl font-bold mt-1">{c.pct}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Upcoming Deadlines</h2>
            <Link to="/calendar" className="text-xs text-primary hover:underline flex items-center gap-1">
              All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {upcoming.map((e) => {
              const d = new Date(e.date);
              const days = Math.max(0, Math.ceil((d.getTime() - Date.now()) / 86400000));
              return (
                <div key={e.id} className="flex items-start gap-3">
                  <div className="w-11 text-center shrink-0 bg-muted rounded-md py-1">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase">{d.toLocaleDateString("en-US", { month: "short" })}</p>
                    <p className="text-base font-bold text-foreground leading-none">{d.getDate()}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-foreground truncate">{e.title}</p>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary shrink-0">
                        {days === 0 ? "today" : `${days} day${days > 1 ? "s" : ""}`}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> {e.startTime} · Assigned: {COUNSELLOR_NAME}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity + Right column */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Recent Activity</h2>
            <Link to="/leads" className="text-xs text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {activity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 py-1">
                <span className={`w-2 h-2 rounded-full ${a.dot} shrink-0`} />
                <p className="text-sm text-foreground flex-1 truncate">{a.text}</p>
                <span className="text-xs text-muted-foreground shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Team at a Glance */}
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Team at a Glance</h2>
            <Link to="/settings" className="text-xs text-primary hover:underline">Go to Team →</Link>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: "STAFF", value: 18, color: "text-primary" },
              { label: "ON LEAVE", value: 3, color: "text-[hsl(35_90%_45%)]" },
              { label: "TODAY IN", value: 14, color: "text-[hsl(160_65%_42%)]" },
            ].map((s) => (
              <div key={s.label} className="bg-muted/50 rounded-md p-3 text-center">
                <p className="text-[10px] font-semibold tracking-wider text-muted-foreground">{s.label}</p>
                <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Leave Pending Approval</p>
          <div className="space-y-2">
            {[
              { name: "Mia Nguyen", initials: "MN", detail: "Annual Leave · 1–5 May (5 days)", status: "Pending", statusColor: "bg-[hsl(35_90%_55%)]/15 text-[hsl(35_90%_35%)]" },
              { name: "Ryan Thomas", initials: "RT", detail: "Sick Leave · 29 Apr", status: "Approved", statusColor: "bg-[hsl(160_65%_42%)]/15 text-[hsl(160_65%_30%)]" },
            ].map((p) => (
              <div key={p.name} className="flex items-center gap-2.5 p-2 rounded-md hover:bg-muted/40">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                  {p.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{p.detail}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${p.statusColor}`}>{p.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Finance Snapshot */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Finance Snapshot</h2>
          <Link to="/billing" className="text-xs text-primary hover:underline">Go to Finance →</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "COLLECTED", value: "$94k", bg: "bg-[hsl(160_65%_42%)]/10", color: "text-[hsl(160_65%_30%)]" },
            { label: "OVERDUE", value: "$12k", bg: "bg-destructive/10", color: "text-destructive" },
            { label: "PENDING", value: "$28k", bg: "bg-[hsl(35_90%_55%)]/15", color: "text-[hsl(35_90%_35%)]" },
          ].map((f) => (
            <div key={f.label} className={`rounded-md py-5 text-center ${f.bg}`}>
              <p className={`text-[11px] font-semibold tracking-wider ${f.color} opacity-80`}>{f.label}</p>
              <p className={`text-2xl font-bold mt-1 ${f.color}`}>{f.value}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border text-sm">
          <span className="text-muted-foreground">Payroll Due 15 May</span>
          <span className="font-semibold text-foreground">$56,400</span>
        </div>
      </div>
    </div>
  );
}
