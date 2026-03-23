import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, SlidersHorizontal, MoreHorizontal, Phone, Mail, Eye, Edit, MessageSquare, CalendarClock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { mockLeads, Lead, Note, COUNSELLOR_NAME } from "@/data/mockData";
import { PriorityBadge } from "@/components/PriorityBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { StageBadge } from "@/components/StageBadge";

const stages = ["New Lead", "Contacted", "Interested", "Counselling", "Application Started", "Applied", "Offer Received", "Visa Process", "Converted", "Lost"];

export default function LeadsPage() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [noteLeadId, setNoteLeadId] = useState<number | null>(null);

  const filtered = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateStage = (id: number, stage: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage: stage as Lead["stage"] } : l)));
  };

  const openNoteDialog = (leadId: number) => {
    setNoteLeadId(leadId);
    setNoteText("");
    setNoteDialogOpen(true);
  };

  const addNote = () => {
    if (!noteText.trim() || noteLeadId === null) return;
    setLeads((prev) => prev.map((l) => {
      if (l.id !== noteLeadId) return l;
      const newNote: Note = {
        id: (l.notes?.length || 0) + 1,
        text: noteText.trim(),
        createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        author: COUNSELLOR_NAME,
      };
      return { ...l, notes: [...(l.notes || []), newNote] };
    }));
    setNoteDialogOpen(false);
    setNoteText("");
  };

  const noteLeadName = noteLeadId !== null ? leads.find((l) => l.id === noteLeadId)?.name : "";

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leads</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} total leads</p>
        </div>
        <Button className="mt-3 sm:mt-0 gap-2"><Plus className="w-4 h-4" /> Add Lead</Button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search leads..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-9 bg-card" />
        </div>
        <Button variant="outline" size="sm" className="gap-2"><SlidersHorizontal className="w-4 h-4" /> Filters</Button>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-card rounded-lg border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Student's Details</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Created Date</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Country</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Program</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Source</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Counsellor</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Status</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Stage</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Priority</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Branch</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Call Details</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr key={lead.id} className={`border-b border-border hover:bg-muted/50 transition-colors ${lead.isOverdue ? "bg-destructive/5" : ""}`}>
                <td className="py-3 px-4">
                  <div>
                    <p className="font-semibold text-foreground">{lead.name} <span className="text-muted-foreground font-normal text-xs">#{lead.id}</span></p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" />{lead.email}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">GPA: {lead.gpa} &nbsp; Qual: {lead.qualification} &nbsp; Year: {lead.year}</p>
                    <p className="text-xs text-muted-foreground">{lead.testScore}</p>
                  </div>
                </td>
                <td className="py-3 px-3 text-xs">{lead.createdDate}</td>
                <td className="py-3 px-3 text-xs">{lead.country}</td>
                <td className="py-3 px-3 text-xs">{lead.program}</td>
                <td className="py-3 px-3 text-xs">{lead.source}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">{lead.counsellorInitials}</div>
                    <span className="text-xs">{lead.counsellor.split(" ")[0]}</span>
                  </div>
                </td>
                <td className="py-3 px-3"><StatusBadge status={lead.status} /></td>
                <td className="py-3 px-3">
                  <Select value={lead.stage} onValueChange={(val) => updateStage(lead.id, val)}>
                    <SelectTrigger className="h-7 text-xs border-0 bg-transparent p-0 w-auto gap-1 shadow-none focus:ring-0">
                      <StageBadge stage={lead.stage} />
                    </SelectTrigger>
                    <SelectContent>
                      {stages.map((s) => (<SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="py-3 px-3"><PriorityBadge priority={lead.priority} /></td>
                <td className="py-3 px-3 text-xs">{lead.branch}</td>
                <td className="py-3 px-3">
                  <div className="text-xs">
                    <p className="truncate max-w-[120px]">{lead.callDetails}</p>
                    {lead.nextFollowUp && (
                      <p className={`text-[10px] mt-0.5 ${lead.isOverdue ? "text-destructive font-semibold" : "text-muted-foreground"}`}>
                        {lead.isOverdue ? "⚠ Overdue: " : "Next: "}{lead.nextFollowUp}
                      </p>
                    )}
                  </div>
                </td>
                <td className="py-3 px-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="w-4 h-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2 text-xs" onClick={() => navigate(`/leads/${lead.id}`)}><Eye className="w-3.5 h-3.5" />View Lead</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-xs"><Edit className="w-3.5 h-3.5" />Update Stage</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-xs" onClick={() => openNoteDialog(lead.id)}><MessageSquare className="w-3.5 h-3.5" />Add Note</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-xs"><CalendarClock className="w-3.5 h-3.5" />Schedule Follow-up</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-3">
        {filtered.map((lead) => (
          <div key={lead.id} className={`bg-card rounded-lg border border-border p-4 ${lead.isOverdue ? "border-destructive/30" : ""}`} onClick={() => navigate(`/leads/${lead.id}`)}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-foreground">{lead.name} <span className="text-muted-foreground text-xs">#{lead.id}</span></p>
                <p className="text-xs text-muted-foreground">{lead.email}</p>
                <p className="text-xs text-muted-foreground">{lead.phone}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => e.stopPropagation()}><MoreHorizontal className="w-4 h-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2 text-xs" onClick={() => navigate(`/leads/${lead.id}`)}><Eye className="w-3.5 h-3.5" />View Lead</DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-xs"><Edit className="w-3.5 h-3.5" />Update Stage</DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-xs" onClick={(e) => { e.stopPropagation(); openNoteDialog(lead.id); }}><MessageSquare className="w-3.5 h-3.5" />Add Note</DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-xs"><CalendarClock className="w-3.5 h-3.5" />Schedule Follow-up</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="text-xs text-muted-foreground mb-2">GPA: {lead.gpa} · {lead.qualification} · {lead.testScore}</div>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-xs text-muted-foreground">{lead.country}</span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">{lead.program}</span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">{lead.source}</span>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <StatusBadge status={lead.status} />
              <StageBadge stage={lead.stage} />
              <PriorityBadge priority={lead.priority} />
            </div>
            {lead.isOverdue && lead.nextFollowUp && (
              <p className="text-xs text-destructive font-semibold mt-2">⚠ Overdue follow-up: {lead.nextFollowUp}</p>
            )}
          </div>
        ))}
      </div>

      {/* Add Note Dialog */}
      <Dialog open={noteDialogOpen} onOpenChange={setNoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Note for {noteLeadName}</DialogTitle>
          </DialogHeader>
          <Textarea placeholder="Type your note here..." value={noteText} onChange={(e) => setNoteText(e.target.value)} className="min-h-[100px]" />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setNoteDialogOpen(false)}>Cancel</Button>
            <Button onClick={addNote} disabled={!noteText.trim()}>Save Note</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
