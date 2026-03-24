import { useState, useMemo } from "react";
import { format, addDays, startOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parse, isToday } from "date-fns";
import { Search, Plus, ChevronLeft, ChevronRight, Clock, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { mockCalendarEvents, CalendarEvent, EventType, EVENT_TYPES, REMINDER_OPTIONS, mockLeads } from "@/data/mockData";

type CalendarView = "day" | "week" | "month";

const eventColors: Record<EventType, { bg: string; text: string; border: string }> = {
  Meeting: { bg: "bg-badge-low-bg", text: "text-badge-low", border: "border-badge-low/30" },
  "Follow-up": { bg: "bg-stage-new-bg", text: "text-stage-new", border: "border-stage-new/30" },
  Deadline: { bg: "bg-badge-medium-bg", text: "text-badge-medium", border: "border-badge-medium/30" },
  Urgent: { bg: "bg-badge-high-bg", text: "text-badge-high", border: "border-badge-high/30" },
};

const timeSlots = Array.from({ length: 10 }, (_, i) => {
  const hour = i + 9;
  return `${hour.toString().padStart(2, "0")}:00`;
});

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>(mockCalendarEvents);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 24));
  const [view, setView] = useState<CalendarView>("week");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({ type: "Meeting", date: "", startTime: "10:00", endTime: "11:00", reminder: "None" });

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: startOfWeek(monthStart, { weekStartsOn: 1 }), end: addDays(endOfMonth(currentDate), 6 - endOfMonth(currentDate).getDay()) });

  const filteredEvents = events.filter((e) => {
    const matchSearch = !searchQuery || e.title.toLowerCase().includes(searchQuery.toLowerCase()) || e.leadName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = filterType === "all" || e.type === filterType;
    return matchSearch && matchType;
  });

  const getEventsForDate = (date: Date) => filteredEvents.filter((e) => isSameDay(parse(e.date, "yyyy-MM-dd", new Date()), date));

  const getEventForSlot = (date: Date, time: string) => {
    return getEventsForDate(date).filter((e) => {
      const eHour = parseInt(e.startTime.split(":")[0]);
      const slotHour = parseInt(time.split(":")[0]);
      return eHour === slotHour;
    });
  };

  const navigate = (dir: number) => {
    if (view === "day") setCurrentDate((d) => addDays(d, dir));
    else if (view === "week") setCurrentDate((d) => addDays(d, dir * 7));
    else setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + dir, 1));
  };

  const openCreate = (date?: string, time?: string) => {
    setNewEvent({ type: "Meeting", date: date || format(currentDate, "yyyy-MM-dd"), startTime: time || "10:00", endTime: time ? `${parseInt(time.split(":")[0]) + 1}:00` : "11:00", reminder: "None", title: "", notes: "" });
    setCreateOpen(true);
  };

  const saveEvent = () => {
    if (!newEvent.title?.trim()) return;
    const ev: CalendarEvent = {
      id: Math.max(...events.map((e) => e.id), 0) + 1,
      title: newEvent.title!,
      type: newEvent.type as EventType,
      date: newEvent.date!,
      startTime: newEvent.startTime!,
      endTime: newEvent.endTime!,
      leadName: newEvent.leadName,
      notes: newEvent.notes,
      reminder: newEvent.reminder,
    };
    setEvents((prev) => [...prev, ev]);
    setCreateOpen(false);
  };

  const deleteEvent = (id: number) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setDetailOpen(false);
  };

  const EventCard = ({ event, compact }: { event: CalendarEvent; compact?: boolean }) => {
    const colors = eventColors[event.type];
    return (
      <button
        onClick={(e) => { e.stopPropagation(); setSelectedEvent(event); setDetailOpen(true); }}
        className={`w-full text-left p-1.5 rounded-md border ${colors.bg} ${colors.border} ${colors.text} transition-all hover:shadow-sm ${compact ? "text-[10px]" : "text-xs"}`}
      >
        <p className="font-semibold truncate">{event.title}</p>
        {!compact && <p className="opacity-75">{event.startTime} - {event.endTime}</p>}
      </button>
    );
  };

  const headerLabel = view === "day" ? format(currentDate, "EEEE, MMMM d, yyyy") : view === "week" ? `${format(weekDays[0], "MMM d")} - ${format(weekDays[6], "MMM d, yyyy")}` : format(currentDate, "MMMM yyyy");

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
          <p className="text-sm text-muted-foreground">Manage your schedule and events</p>
        </div>
        <Button className="gap-2" onClick={() => openCreate()}><Plus className="w-4 h-4" /> New Event</Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search events..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-9 bg-card" />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {EVENT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          {(["day", "week", "month"] as CalendarView[]).map((v) => (
            <Button key={v} variant={view === v ? "secondary" : "ghost"} size="sm" className="h-7 px-3 text-xs capitalize" onClick={() => setView(v)}>{v}</Button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3 mb-4">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => navigate(-1)}><ChevronLeft className="w-4 h-4" /></Button>
        <Button variant="outline" size="sm" className="h-8" onClick={() => setCurrentDate(new Date(2026, 2, 24))}>Today</Button>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => navigate(1)}><ChevronRight className="w-4 h-4" /></Button>
        <h2 className="text-sm font-semibold text-foreground">{headerLabel}</h2>
      </div>

      {/* Calendar Grid */}
      {view === "week" && (
        <>
          {/* Desktop week */}
          <div className="hidden md:block bg-card rounded-lg border border-border overflow-hidden">
            <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border">
              <div className="p-2" />
              {weekDays.map((d) => (
                <div key={d.toISOString()} className={`p-2 text-center border-l border-border ${isToday(d) ? "bg-primary/5" : ""}`}>
                  <p className="text-[10px] uppercase text-muted-foreground">{format(d, "EEE")}</p>
                  <p className={`text-sm font-bold ${isToday(d) ? "text-primary" : "text-foreground"}`}>{format(d, "d")}</p>
                </div>
              ))}
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border/50 min-h-[60px]">
                  <div className="p-1 text-[10px] text-muted-foreground text-right pr-2 pt-1">{time}</div>
                  {weekDays.map((d) => {
                    const slotEvents = getEventForSlot(d, time);
                    return (
                      <div key={d.toISOString()} className="border-l border-border/50 p-0.5 cursor-pointer hover:bg-muted/30" onClick={() => openCreate(format(d, "yyyy-MM-dd"), time)}>
                        {slotEvents.map((ev) => <EventCard key={ev.id} event={ev} />)}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          {/* Mobile agenda */}
          <div className="md:hidden space-y-2">
            {weekDays.map((d) => {
              const dayEvents = getEventsForDate(d);
              if (dayEvents.length === 0) return null;
              return (
                <div key={d.toISOString()}>
                  <p className={`text-xs font-semibold mb-1 ${isToday(d) ? "text-primary" : "text-muted-foreground"}`}>{format(d, "EEE, MMM d")}</p>
                  <div className="space-y-1">
                    {dayEvents.map((ev) => (
                      <div key={ev.id} onClick={() => { setSelectedEvent(ev); setDetailOpen(true); }} className={`flex items-center gap-3 p-3 rounded-lg border ${eventColors[ev.type].bg} ${eventColors[ev.type].border} cursor-pointer`}>
                        <Clock className={`w-4 h-4 ${eventColors[ev.type].text}`} />
                        <div className="flex-1">
                          <p className={`text-sm font-semibold ${eventColors[ev.type].text}`}>{ev.title}</p>
                          <p className="text-xs text-muted-foreground">{ev.startTime} - {ev.endTime}</p>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${eventColors[ev.type].bg} ${eventColors[ev.type].text} font-medium`}>{ev.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {view === "day" && (
        <>
          <div className="hidden md:block bg-card rounded-lg border border-border overflow-hidden">
            <div className="max-h-[500px] overflow-y-auto">
              {timeSlots.map((time) => {
                const slotEvents = getEventForSlot(currentDate, time);
                return (
                  <div key={time} className="flex border-b border-border/50 min-h-[60px]">
                    <div className="w-[60px] p-1 text-[10px] text-muted-foreground text-right pr-2 pt-1 shrink-0">{time}</div>
                    <div className="flex-1 p-0.5 cursor-pointer hover:bg-muted/30 border-l border-border/50" onClick={() => openCreate(format(currentDate, "yyyy-MM-dd"), time)}>
                      {slotEvents.map((ev) => <EventCard key={ev.id} event={ev} />)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Mobile */}
          <div className="md:hidden space-y-1">
            {getEventsForDate(currentDate).length > 0 ? getEventsForDate(currentDate).map((ev) => (
              <div key={ev.id} onClick={() => { setSelectedEvent(ev); setDetailOpen(true); }} className={`flex items-center gap-3 p-3 rounded-lg border ${eventColors[ev.type].bg} ${eventColors[ev.type].border} cursor-pointer`}>
                <Clock className={`w-4 h-4 ${eventColors[ev.type].text}`} />
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${eventColors[ev.type].text}`}>{ev.title}</p>
                  <p className="text-xs text-muted-foreground">{ev.startTime} - {ev.endTime}</p>
                </div>
              </div>
            )) : <p className="text-sm text-muted-foreground text-center py-8">No events for this day</p>}
          </div>
        </>
      )}

      {view === "month" && (
        <>
          <div className="hidden md:block bg-card rounded-lg border border-border overflow-hidden">
            <div className="grid grid-cols-7">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div key={d} className="p-2 text-center text-[10px] uppercase text-muted-foreground border-b border-border font-semibold">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {monthDays.slice(0, 42).map((d) => {
                const dayEvents = getEventsForDate(d);
                const inMonth = d.getMonth() === currentDate.getMonth();
                return (
                  <div key={d.toISOString()} className={`min-h-[80px] p-1 border-b border-r border-border/50 cursor-pointer hover:bg-muted/30 ${!inMonth ? "opacity-40" : ""}`} onClick={() => { setCurrentDate(d); setView("day"); }}>
                    <p className={`text-xs font-medium mb-0.5 ${isToday(d) ? "text-primary font-bold" : "text-foreground"}`}>{format(d, "d")}</p>
                    <div className="space-y-0.5">
                      {dayEvents.slice(0, 2).map((ev) => <EventCard key={ev.id} event={ev} compact />)}
                      {dayEvents.length > 2 && <p className="text-[9px] text-muted-foreground">+{dayEvents.length - 2} more</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Mobile month agenda */}
          <div className="md:hidden space-y-2">
            {eachDayOfInterval({ start: monthStart, end: monthEnd }).map((d) => {
              const dayEvents = getEventsForDate(d);
              if (dayEvents.length === 0) return null;
              return (
                <div key={d.toISOString()}>
                  <p className={`text-xs font-semibold mb-1 ${isToday(d) ? "text-primary" : "text-muted-foreground"}`}>{format(d, "EEE, MMM d")}</p>
                  {dayEvents.map((ev) => (
                    <div key={ev.id} onClick={() => { setSelectedEvent(ev); setDetailOpen(true); }} className={`flex items-center gap-3 p-3 rounded-lg border mb-1 ${eventColors[ev.type].bg} ${eventColors[ev.type].border} cursor-pointer`}>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${eventColors[ev.type].text}`}>{ev.title}</p>
                        <p className="text-xs text-muted-foreground">{ev.startTime} - {ev.endTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Event Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${eventColors[selectedEvent.type].bg} ${eventColors[selectedEvent.type].text}`}>{selectedEvent.type}</span>
                <span className="text-xs text-muted-foreground">{selectedEvent.date}</span>
              </div>
              <p className="text-sm text-foreground flex items-center gap-2"><Clock className="w-4 h-4 text-muted-foreground" />{selectedEvent.startTime} - {selectedEvent.endTime}</p>
              {selectedEvent.leadName && <p className="text-sm text-muted-foreground">Linked to: <span className="font-medium text-foreground">{selectedEvent.leadName}</span></p>}
              {selectedEvent.notes && <p className="text-sm text-muted-foreground">{selectedEvent.notes}</p>}
              {selectedEvent.reminder && <p className="text-xs text-muted-foreground">Reminder: {selectedEvent.reminder}</p>}
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="destructive" size="sm" onClick={() => deleteEvent(selectedEvent.id)}>Delete</Button>
                <Button variant="outline" size="sm" onClick={() => setDetailOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Event Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Title</Label>
              <Input value={newEvent.title || ""} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="Event title" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">Type</Label>
              <Select value={newEvent.type} onValueChange={(v) => setNewEvent({ ...newEvent, type: v as EventType })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {EVENT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label className="text-xs">Date</Label>
                <Input type="date" value={newEvent.date || ""} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs">Start</Label>
                <Input type="time" value={newEvent.startTime || ""} onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs">End</Label>
                <Input type="time" value={newEvent.endTime || ""} onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })} className="mt-1" />
              </div>
            </div>
            <div>
              <Label className="text-xs">Link to Lead/Student</Label>
              <Select value={newEvent.leadName || "none"} onValueChange={(v) => setNewEvent({ ...newEvent, leadName: v === "none" ? undefined : v })}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select lead..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {mockLeads.map((l) => <SelectItem key={l.id} value={l.name}>{l.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Notes</Label>
              <Textarea value={newEvent.notes || ""} onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })} className="mt-1 min-h-[60px]" placeholder="Event notes..." />
            </div>
            <div>
              <Label className="text-xs">Reminder</Label>
              <Select value={newEvent.reminder || "None"} onValueChange={(v) => setNewEvent({ ...newEvent, reminder: v })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {REMINDER_OPTIONS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
              <Button onClick={saveEvent} disabled={!newEvent.title?.trim()}>Create</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
