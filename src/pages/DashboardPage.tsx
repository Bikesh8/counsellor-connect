import { mockLeads, mockTasks, COUNSELLOR_NAME } from "@/data/mockData";
import { Bell, Download, Plus, ArrowRight, Search, Users, UserPlus, CalendarClock, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, Legend, PieChart, Pie, Cell,
} from "recharts";
import { StageBadge } from "@/components/StageBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { PriorityBadge } from "@/components/PriorityBadge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

// ============ Mock data shaped to API contract ============
// /api/dashboard → sections: stats, analytics, tables

const STAGE_LABELS: Record<string, string> = {
  new_lead: "New Lead",
  contacted: "Contacted",
  interested: "Interested",
  counselling: "Counselling",
  application_started: "Application Started",
  offer_letter: "Offer Letter",
  application_submitted: "Application Submitted",
  visa_processing: "Visa Processing",
  visa_approved: "Visa Approved",
};

export default function DashboardPage() {
  // ===== STATS =====
  const today = new Date().toISOString().slice(0, 10);
  const myClients = mockLeads.length;
  const newLeadsToday = 3;
  const followUpToday = mockTasks.filter((t) => t.status === "today" || t.status === "overdue").length;
  const highPriorityLeads = mockLeads.filter((l) => l.priority === "High").length;

  const statCards = [
    { id: "my_clients", title: "My Students / Clients", value: myClients, description: "Total leads assigned to you.", icon: Users, color: "text-primary", bg: "bg-primary/10" },
    { id: "new_leads_today", title: "New Leads Today", value: newLeadsToday, description: "Leads assigned to you and created today.", icon: UserPlus, color: "text-[hsl(160_65%_42%)]", bg: "bg-[hsl(160_65%_42%)]/10" },
    { id: "follow_up_today", title: "Follow Up Today", value: followUpToday, description: "Tasks assigned to you that are due today.", icon: CalendarClock, color: "text-[hsl(35_90%_45%)]", bg: "bg-[hsl(35_90%_55%)]/15" },
    { id: "high_priority_leads", title: "High Priority Leads", value: highPriorityLeads, description: "High-priority leads currently assigned to you.", icon: Flame, color: "text-destructive", bg: "bg-destructive/10" },
  ];

  // ===== ANALYTICS =====
  const leadPipelineData = Object.keys(STAGE_LABELS).map((key) => ({
    stage: STAGE_LABELS[key],
    count: Math.floor(Math.random() * 12) + 1,
  }));

  const monthlyPerformanceData = [
    { month: "Nov", actual: 8, target: 10 },
    { month: "Dec", actual: 12, target: 12 },
    { month: "Jan", actual: 15, target: 14 },
    { month: "Feb", actual: 11, target: 14 },
    { month: "Mar", actual: 18, target: 16 },
    { month: "Apr", actual: 14, target: 16 },
  ];

  const leadDistributionData = [
    { type: "Education", count: 28, color: "hsl(var(--primary))" },
    { type: "Migration", count: 12, color: "hsl(160 65% 42%)" },
  ];
  const distTotal = leadDistributionData.reduce((s, d) => s + d.count, 0);

  // ===== TABLES =====
  const tasksToday = mockTasks.slice(0, 5).map((t, i) => ({
    id: `TSK-${1000 + i}`,
    title: t.title,
    priority: t.priority,
    status: t.status,
    dueDate: t.dueDate,
    leadId: `LD-${200 + i}`,
  }));

  const recentLeads = mockLeads.slice(0, 6);

  const applicationTracker = mockLeads.slice(0, 5).map((l, i) => ({
    id: `APP-${5000 + i}`,
    applicantName: l.name,
    universityName: ["University of Toronto", "Monash University", "Imperial College London", "ETH Zurich", "NUS"][i % 5],
    programName: l.program,
    createdAt: l.createdDate,
  }));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Welcome back, {COUNSELLOR_NAME.split(" ")[0]} · {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search leads, tasks…"
              className="w-72 pl-8 pr-3 py-1.5 text-sm bg-card border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button className="w-9 h-9 rounded-md border border-border bg-card flex items-center justify-center hover:bg-muted">
            <Bell className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="px-3 py-1.5 text-sm font-medium border border-border rounded-md bg-card hover:bg-muted flex items-center gap-1.5">
            <Download className="w-4 h-4" /> Export
          </button>
          <Link to="/leads" className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> New Lead
          </Link>
        </div>
      </div>

      {/* ===== SECTION: STATS — My Performance ===== */}
      <section>
        <h2 className="text-sm font-semibold text-foreground mb-3">My Performance</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.id} className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">{s.title}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{s.value}</p>
                  </div>
                  <div className={`w-9 h-9 rounded-md ${s.bg} ${s.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{s.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== SECTION: ANALYTICS ===== */}
      <section>
        <h2 className="text-sm font-semibold text-foreground mb-3">Analytics</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Lead Pipeline — bar */}
          <div className="lg:col-span-2 bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Lead Pipeline</h3>
                <p className="text-xs text-muted-foreground">Leads grouped by current stage</p>
              </div>
              <Link to="/pipeline" className="text-xs text-primary hover:underline flex items-center gap-1">
                View pipeline <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={leadPipelineData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="stage" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} interval={0} angle={-25} textAnchor="end" height={70} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Lead Distribution — donut */}
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="mb-4">
              <h3 className="font-semibold text-foreground">Lead Distribution</h3>
              <p className="text-xs text-muted-foreground">Education vs Migration</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={leadDistributionData} dataKey="count" nameKey="type" innerRadius={55} outerRadius={80} paddingAngle={3}>
                  {leadDistributionData.map((d) => <Cell key={d.type} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {leadDistributionData.map((d) => (
                <div key={d.type} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                    <span className="text-foreground">{d.type}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {d.count} <span className="text-xs">({Math.round((d.count / distTotal) * 100)}%)</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Performance — line */}
        <div className="bg-card rounded-lg border border-border p-4 mt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Monthly Performance</h3>
              <p className="text-xs text-muted-foreground">Actual conversions vs target</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyPerformanceData} margin={{ top: 5, right: 20, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="actual" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="target" stroke="hsl(160 65% 42%)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* ===== SECTION: TABLES — My Work ===== */}
      <section>
        <h2 className="text-sm font-semibold text-foreground mb-3">My Work</h2>

        {/* Tasks Due Today */}
        <div className="bg-card rounded-lg border border-border p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-foreground">Tasks Due Today</h3>
              <p className="text-xs text-muted-foreground">{tasksToday.length} task{tasksToday.length !== 1 && "s"} scheduled</p>
            </div>
            <Link to="/tasks" className="text-xs text-primary hover:underline flex items-center gap-1">
              All tasks <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="border border-border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="text-xs">ID</TableHead>
                  <TableHead className="text-xs">Title</TableHead>
                  <TableHead className="text-xs">Priority</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Due Date</TableHead>
                  <TableHead className="text-xs">Lead ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasksToday.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground text-sm py-8">No tasks due today</TableCell></TableRow>
                ) : tasksToday.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="text-xs font-mono text-muted-foreground">{t.id}</TableCell>
                    <TableCell className="text-sm font-medium text-foreground">{t.title}</TableCell>
                    <TableCell><PriorityBadge priority={t.priority as any} /></TableCell>
                    <TableCell>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted text-foreground capitalize">{t.status}</span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{t.dueDate}</TableCell>
                    <TableCell className="text-xs font-mono text-primary">{t.leadId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-card rounded-lg border border-border p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-foreground">Recent Leads</h3>
              <p className="text-xs text-muted-foreground">Latest leads assigned to you</p>
            </div>
            <Link to="/leads" className="text-xs text-primary hover:underline flex items-center gap-1">
              All leads <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="border border-border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="text-xs">ID</TableHead>
                  <TableHead className="text-xs">Name</TableHead>
                  <TableHead className="text-xs">Email</TableHead>
                  <TableHead className="text-xs">Stage</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Priority</TableHead>
                  <TableHead className="text-xs">Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentLeads.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell className="text-xs font-mono text-muted-foreground">LD-{200 + l.id}</TableCell>
                    <TableCell className="text-sm font-medium text-foreground">
                      <Link to={`/leads/${l.id}`} className="hover:text-primary">{l.name}</Link>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{l.email}</TableCell>
                    <TableCell><StageBadge stage={l.stage} /></TableCell>
                    <TableCell><StatusBadge status={l.status} /></TableCell>
                    <TableCell><PriorityBadge priority={l.priority} /></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{l.createdDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Application Tracker */}
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-foreground">Application Tracker</h3>
              <p className="text-xs text-muted-foreground">Submitted applications and their universities</p>
            </div>
            <Link to="/students" className="text-xs text-primary hover:underline flex items-center gap-1">
              All applications <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="border border-border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="text-xs">Application ID</TableHead>
                  <TableHead className="text-xs">Applicant</TableHead>
                  <TableHead className="text-xs">University</TableHead>
                  <TableHead className="text-xs">Program</TableHead>
                  <TableHead className="text-xs">Submitted At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicationTracker.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="text-xs font-mono text-muted-foreground">{a.id}</TableCell>
                    <TableCell className="text-sm font-medium text-foreground">{a.applicantName}</TableCell>
                    <TableCell className="text-sm text-foreground">{a.universityName}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{a.programName}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{a.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </div>
  );
}
