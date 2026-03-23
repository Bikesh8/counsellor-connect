import { mockTasks } from "@/data/mockData";
import { CheckCircle2, Clock, AlertTriangle, CalendarClock } from "lucide-react";

export default function TasksPage() {
  const overdue = mockTasks.filter((t) => t.status === "overdue");
  const today = mockTasks.filter((t) => t.status === "today");
  const upcoming = mockTasks.filter((t) => t.status === "upcoming");

  const TaskCard = ({ task }: { task: typeof mockTasks[0] }) => (
    <div className={`flex items-start gap-3 p-3 rounded-lg border border-border bg-card ${task.status === "overdue" ? "border-destructive/40 bg-destructive/5" : ""}`}>
      <div className={`mt-0.5 ${task.status === "overdue" ? "text-destructive" : task.status === "today" ? "text-primary" : "text-muted-foreground"}`}>
        {task.status === "overdue" ? <AlertTriangle className="w-4 h-4" /> : task.status === "today" ? <Clock className="w-4 h-4" /> : <CalendarClock className="w-4 h-4" />}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">{task.leadName}</p>
        <p className="text-xs text-muted-foreground">{task.description}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{task.type}</span>
          <span className={`text-[10px] ${task.status === "overdue" ? "text-destructive font-semibold" : "text-muted-foreground"}`}>{task.dueDate}</span>
        </div>
      </div>
      {task.status !== "overdue" && (
        <button className="text-muted-foreground hover:text-primary">
          <CheckCircle2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-1">Tasks</h1>
      <p className="text-sm text-muted-foreground mb-6">Your follow-ups and scheduled tasks</p>

      <div className="grid gap-6 lg:grid-cols-3">
        <div>
          <h2 className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Overdue ({overdue.length})
          </h2>
          <div className="space-y-2">{overdue.map((t) => <TaskCard key={t.id} task={t} />)}</div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" /> Today ({today.length})
          </h2>
          <div className="space-y-2">{today.map((t) => <TaskCard key={t.id} task={t} />)}</div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
            <CalendarClock className="w-4 h-4" /> Upcoming ({upcoming.length})
          </h2>
          <div className="space-y-2">{upcoming.map((t) => <TaskCard key={t.id} task={t} />)}</div>
        </div>
      </div>
    </div>
  );
}
