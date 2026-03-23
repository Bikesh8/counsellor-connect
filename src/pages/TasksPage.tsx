import { useState } from "react";
import { mockTasks, Task } from "@/data/mockData";
import { CheckCircle2, Circle, Clock, AlertTriangle, CalendarClock, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

type ViewMode = "board" | "list";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [view, setView] = useState<ViewMode>("board");

  const toggleComplete = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const overdue = tasks.filter((t) => t.status === "overdue");
  const today = tasks.filter((t) => t.status === "today");
  const upcoming = tasks.filter((t) => t.status === "upcoming");

  const TaskCheckbox = ({ task }: { task: Task }) => (
    <button onClick={() => toggleComplete(task.id)} className={`mt-0.5 ${task.completed ? "text-badge-low" : "text-muted-foreground"} hover:text-primary`}>
      {task.completed ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
    </button>
  );

  const TaskCard = ({ task }: { task: Task }) => (
    <div className={`flex items-start gap-3 p-3 rounded-lg border border-border bg-card ${task.status === "overdue" && !task.completed ? "border-destructive/40 bg-destructive/5" : ""}`}>
      <TaskCheckbox task={task} />
      <div className="flex-1">
        <p className={`text-sm font-semibold text-foreground ${task.completed ? "line-through opacity-50" : ""}`}>{task.leadName}</p>
        <p className={`text-xs text-muted-foreground ${task.completed ? "line-through opacity-50" : ""}`}>{task.description}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{task.type}</span>
          <span className={`text-[10px] ${task.status === "overdue" && !task.completed ? "text-destructive font-semibold" : "text-muted-foreground"}`}>{task.dueDate}</span>
        </div>
      </div>
    </div>
  );

  const TaskRow = ({ task }: { task: Task }) => (
    <tr className={`border-b border-border hover:bg-muted/50 transition-colors ${task.status === "overdue" && !task.completed ? "bg-destructive/5" : ""}`}>
      <td className="py-3 px-4">
        <TaskCheckbox task={task} />
      </td>
      <td className="py-3 px-3">
        <p className={`text-sm font-semibold text-foreground ${task.completed ? "line-through opacity-50" : ""}`}>{task.leadName}</p>
      </td>
      <td className="py-3 px-3">
        <p className={`text-xs text-muted-foreground ${task.completed ? "line-through opacity-50" : ""}`}>{task.description}</p>
      </td>
      <td className="py-3 px-3">
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{task.type}</span>
      </td>
      <td className="py-3 px-3">
        <span className={`text-xs ${task.status === "overdue" && !task.completed ? "text-destructive font-semibold" : "text-muted-foreground"}`}>{task.dueDate}</span>
      </td>
      <td className="py-3 px-3">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
          task.status === "overdue" ? "bg-destructive/10 text-destructive" :
          task.status === "today" ? "bg-primary/10 text-primary" :
          "bg-muted text-muted-foreground"
        }`}>
          {task.status === "overdue" ? "Overdue" : task.status === "today" ? "Today" : "Upcoming"}
        </span>
      </td>
    </tr>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Tasks</h1>
          <p className="text-sm text-muted-foreground">Your follow-ups and scheduled tasks</p>
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <Button variant={view === "board" ? "secondary" : "ghost"} size="sm" className="h-7 px-2 gap-1" onClick={() => setView("board")}>
            <LayoutGrid className="w-3.5 h-3.5" /> Board
          </Button>
          <Button variant={view === "list" ? "secondary" : "ghost"} size="sm" className="h-7 px-2 gap-1" onClick={() => setView("list")}>
            <List className="w-3.5 h-3.5" /> List
          </Button>
        </div>
      </div>

      {view === "board" ? (
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
      ) : (
        <div className="bg-card rounded-lg border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-4 w-10"></th>
                <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Lead</th>
                <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Description</th>
                <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Type</th>
                <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Due</th>
                <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {[...overdue, ...today, ...upcoming].map((t) => <TaskRow key={t.id} task={t} />)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
