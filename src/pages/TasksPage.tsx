import { useState } from "react";
import { mockTasks, Task, mockLeads } from "@/data/mockData";
import { CheckCircle2, Circle, Clock, AlertTriangle, CalendarClock, LayoutGrid, List, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ViewMode = "board" | "list";

const TASK_TYPES: Task["type"][] = ["Follow-up", "Document Review", "Counselling Session", "Application Check"];
const STATUS_OPTIONS: { value: Task["status"]; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "upcoming", label: "Upcoming" },
  { value: "overdue", label: "Overdue" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [view, setView] = useState<ViewMode>("board");
  const [showCreate, setShowCreate] = useState(false);
  const [newTask, setNewTask] = useState({
    leadName: "",
    type: "Follow-up" as Task["type"],
    dueDate: "",
    status: "upcoming" as Task["status"],
    description: "",
  });

  const toggleComplete = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleCreateTask = () => {
    if (!newTask.leadName || !newTask.dueDate || !newTask.description) return;
    const task: Task = {
      id: Date.now(),
      leadName: newTask.leadName,
      type: newTask.type,
      dueDate: newTask.dueDate,
      status: newTask.status,
      description: newTask.description,
      completed: false,
    };
    setTasks((prev) => [...prev, task]);
    setNewTask({ leadName: "", type: "Follow-up", dueDate: "", status: "upcoming", description: "" });
    setShowCreate(false);
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
        <div className="flex items-center gap-2">
          <Button size="sm" className="gap-1" onClick={() => setShowCreate(true)}>
            <Plus className="w-4 h-4" /> Add Task
          </Button>
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <Button variant={view === "board" ? "secondary" : "ghost"} size="sm" className="h-7 px-2 gap-1" onClick={() => setView("board")}>
              <LayoutGrid className="w-3.5 h-3.5" /> Board
            </Button>
            <Button variant={view === "list" ? "secondary" : "ghost"} size="sm" className="h-7 px-2 gap-1" onClick={() => setView("list")}>
              <List className="w-3.5 h-3.5" /> List
            </Button>
          </div>
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

      {/* Create Task Modal */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Lead / Student</label>
              <Select value={newTask.leadName} onValueChange={(v) => setNewTask((p) => ({ ...p, leadName: v }))}>
                <SelectTrigger><SelectValue placeholder="Select lead" /></SelectTrigger>
                <SelectContent>
                  {mockLeads.map((l) => (
                    <SelectItem key={l.id} value={l.name}>{l.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Task Type</label>
              <Select value={newTask.type} onValueChange={(v) => setNewTask((p) => ({ ...p, type: v as Task["type"] }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TASK_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Due Date</label>
              <Input type="date" value={newTask.dueDate} onChange={(e) => setNewTask((p) => ({ ...p, dueDate: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Status</label>
              <Select value={newTask.status} onValueChange={(v) => setNewTask((p) => ({ ...p, status: v as Task["status"] }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
              <Textarea placeholder="Task description..." value={newTask.description} onChange={(e) => setNewTask((p) => ({ ...p, description: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button onClick={handleCreateTask} disabled={!newTask.leadName || !newTask.dueDate || !newTask.description}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
