import { mockLeads, mockTasks, mockCalendarEvents, COUNSELLOR_NAME } from "@/data/mockData";
import {
  Users, UserCheck, AlertTriangle, TrendingUp, Phone, Calendar as CalendarIcon,
  Target, DollarSign, Clock, ArrowUpRight, ArrowDownRight, CheckCircle2,
  GraduationCap, Globe, Activity, Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from "recharts";
import { StageBadge } from "@/components/StageBadge";
import { PriorityBadge } from "@/components/PriorityBadge";

const COLORS = ["hsl(var(--primary))", "hsl(var(--badge-low))", "hsl(var(--badge-medium))", "hsl(var(--badge-high))", "hsl(var(--muted-foreground))"];

export default function DashboardPage() {
  const totalLeads = mockLeads.length;
  const converted = mockLeads.filter((l) => l.stage === "Converted").length;
  const overdueTasks = mockTasks.filter((t) => t.status === "overdue").length;
  const todayTasks = mockTasks.filter((t) => t.status === "today").length;
  const highPriority = mockLeads.filter((l) => l.priority === "High").length;
  const inPipeline = mockLeads.filter((l) => !["Converted", "Lost", "New Lead"].includes(l.stage)).length;
  const applicationsSubmitted = mockLeads.filter((l) =>
    ["Applied", "Offer Received", "Visa Process", "Converted"].includes(l.stage)
  ).length;
  const offersReceived = mockLeads.filter((l) => ["Offer Received", "Visa Process", "Converted"].includes(l.stage)).length;
  const conversionRate = ((converted / totalLeads) * 100).toFixed(1);
  const responseRate = 78;

  // KPI cards
  const stats = [
    { label: "Total Leads", value: totalLeads, icon: Users, color: "text-primary", bg: "bg-primary/10", change: "+12%", up: true },
    { label: "Conversion Rate", value: `${conversionRate}%`, icon: Target, color: "text-badge-low", bg: "bg-badge-low-bg", change: "+3.2%", up: true },
    { label: "Active Pipeline", value: inPipeline, icon: Activity, color: "text-badge-medium", bg: "bg-badge-medium-bg", change: "+5", up: true },
    { label: "Overdue Tasks", value: overdueTasks, icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", change: "-2", up: false },
  ];

  // Pipeline funnel
  const stages = ["New Lead", "Contacted", "Interested", "Counselling", "Application Started", "Applied", "Offer Received", "Visa Process", "Converted"];
  const funnelData = stages.map((s) => ({
    stage: s,
    count: mockLeads.filter((l) => l.stage === s).length,
  }));

  // Leads by country
  const countryMap = mockLeads.reduce<Record<string, number>>((acc, l) => {
    acc[l.country] = (acc[l.country] || 0) + 1;
    return acc;
  }, {});
  const countryData = Object.entries(countryMap).map(([name, value]) => ({ name, value }));

  // Source distribution
  const sourceMap = mockLeads.reduce<Record<string, number>>((acc, l) => {
    acc[l.source] = (acc[l.source] || 0) + 1;
    return acc;
  }, {});
  const sourceData = Object.entries(sourceMap).map(([name, value]) => ({ name, value }));

  // Trend (mock 6 months)
  const trendData = [
    { month: "Oct", leads: 18, converted: 3 },
    { month: "Nov", leads: 22, converted: 5 },
    { month: "Dec", leads: 19, converted: 4 },
    { month: "Jan", leads: 28, converted: 6 },
    { month: "Feb", leads: 32, converted: 8 },
    { month: "Mar", leads: totalLeads, converted },
  ];

  const upcomingEvents = [...mockCalendarEvents]
    .sort((a, b) => (a.date + a.startTime).localeCompare(b.date + b.startTime))
    .slice(0, 4);

  const recentLeads = [...mockLeads].sort((a, b) => b.id - a.id).slice(0, 5);
  const todayList = mockTasks.filter((t) => t.status === "today" || t.status === "overdue").slice(0, 5);

  // Top programs
  const programMap = mockLeads.reduce<Record<string, number>>((acc, l) => {
    acc[l.program] = (acc[l.program] || 0) + 1;
    return acc;
  }, {});
  const topPrograms = Object.entries(programMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, {COUNSELLOR_NAME} — here's your day at a glance.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/leads" className="px-3 py-2 text-sm font-medium border border-border rounded-md hover:bg-muted">View Leads</Link>
          <Link to="/calendar" className="px-3 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90">Open Calendar</Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-9 h-9 rounded-md flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className={`text-xs font-semibold flex items-center gap-0.5 ${stat.up ? "text-badge-low" : "text-destructive"}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Secondary KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: GraduationCap, label: "Applications Submitted", value: applicationsSubmitted },
          { icon: Award, label: "Offers Received", value: offersReceived },
          { icon: Phone, label: "Response Rate", value: `${responseRate}%` },
          { icon: CheckCircle2, label: "Tasks Today", value: todayTasks },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-lg border border-border p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
              <s.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Trend */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-foreground">Leads & Conversions</h2>
              <p className="text-xs text-muted-foreground">Last 6 months</p>
            </div>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="leadsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--badge-low))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--badge-low))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="leads" stroke="hsl(var(--primary))" fill="url(#leadsGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="converted" stroke="hsl(var(--badge-low))" fill="url(#convGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Source pie */}
        <div className="bg-card rounded-lg border border-border p-4">
          <h2 className="font-semibold text-foreground mb-1">Lead Sources</h2>
          <p className="text-xs text-muted-foreground mb-4">Where leads come from</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={sourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3}>
                {sourceData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {sourceData.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                  <span className="text-foreground">{s.name}</span>
                </div>
                <span className="text-muted-foreground">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline funnel + Country */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-4">
          <h2 className="font-semibold text-foreground mb-1">Pipeline Funnel</h2>
          <p className="text-xs text-muted-foreground mb-4">Leads at each stage</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={funnelData} layout="vertical" margin={{ left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis dataKey="stage" type="category" stroke="hsl(var(--muted-foreground))" fontSize={11} width={120} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-semibold text-foreground">Top Destinations</h2>
            <Globe className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mb-4">Leads by country</p>
          <div className="space-y-3">
            {countryData.sort((a, b) => b.value - a.value).map((c) => {
              const pct = (c.value / totalLeads) * 100;
              return (
                <div key={c.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-foreground">{c.name}</span>
                    <span className="text-muted-foreground">{c.value} ({pct.toFixed(0)}%)</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tasks + Events + Recent leads */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Today's tasks */}
        <div className="bg-card rounded-lg border border-border">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <h2 className="font-semibold text-foreground">Today & Overdue</h2>
            </div>
            <Link to="/tasks" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-border max-h-80 overflow-auto">
            {todayList.length === 0 && <p className="p-4 text-sm text-muted-foreground">No tasks for today</p>}
            {todayList.map((t) => (
              <div key={t.id} className="p-3 flex items-start gap-3">
                <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${t.status === "overdue" ? "bg-destructive" : "bg-primary"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{t.description}</p>
                  <p className="text-xs text-muted-foreground">{t.leadName} · {t.type}</p>
                </div>
                <span className={`text-xs font-semibold ${t.status === "overdue" ? "text-destructive" : "text-muted-foreground"}`}>
                  {t.dueDate}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming events */}
        <div className="bg-card rounded-lg border border-border">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-primary" />
              <h2 className="font-semibold text-foreground">Upcoming Events</h2>
            </div>
            <Link to="/calendar" className="text-xs text-primary hover:underline">Calendar</Link>
          </div>
          <div className="divide-y divide-border max-h-80 overflow-auto">
            {upcomingEvents.map((e) => (
              <div key={e.id} className="p-3 flex items-start gap-3">
                <div className="w-12 text-center shrink-0">
                  <p className="text-xs text-muted-foreground">{new Date(e.date).toLocaleDateString("en-US", { month: "short" })}</p>
                  <p className="text-lg font-bold text-foreground leading-none">{new Date(e.date).getDate()}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{e.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {e.startTime} - {e.endTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top programs */}
        <div className="bg-card rounded-lg border border-border">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-primary" />
              <h2 className="font-semibold text-foreground">Top Programs</h2>
            </div>
            <span className="text-xs text-muted-foreground">By demand</span>
          </div>
          <div className="divide-y divide-border">
            {topPrograms.map(([prog, count], i) => (
              <div key={prog} className="p-3 flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{prog}</p>
                  <p className="text-xs text-muted-foreground">{count} {count === 1 ? "lead" : "leads"}</p>
                </div>
                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${(count / totalLeads) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent leads table */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Recent Leads</h2>
          <Link to="/leads" className="text-xs text-primary hover:underline">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs text-muted-foreground">
              <tr>
                <th className="text-left font-medium px-4 py-2">Name</th>
                <th className="text-left font-medium px-4 py-2">Program</th>
                <th className="text-left font-medium px-4 py-2">Country</th>
                <th className="text-left font-medium px-4 py-2">Stage</th>
                <th className="text-left font-medium px-4 py-2">Priority</th>
                <th className="text-left font-medium px-4 py-2">Next Follow-up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentLeads.map((l) => (
                <tr key={l.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <Link to={`/leads/${l.id}`} className="font-medium text-foreground hover:text-primary">{l.name}</Link>
                    <p className="text-xs text-muted-foreground">{l.email}</p>
                  </td>
                  <td className="px-4 py-3 text-foreground">{l.program}</td>
                  <td className="px-4 py-3 text-muted-foreground">{l.country}</td>
                  <td className="px-4 py-3"><StageBadge stage={l.stage} /></td>
                  <td className="px-4 py-3"><PriorityBadge priority={l.priority} /></td>
                  <td className={`px-4 py-3 text-xs ${l.isOverdue ? "text-destructive font-semibold" : "text-muted-foreground"}`}>
                    {l.nextFollowUp || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
