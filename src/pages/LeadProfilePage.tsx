import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockLeads, Lead, Note, COUNSELLOR_NAME } from "@/data/mockData";
import { ArrowLeft, Phone, Mail, MapPin, GraduationCap, Calendar, MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StageBadge } from "@/components/StageBadge";
import { PriorityBadge } from "@/components/PriorityBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function LeadProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const leadData = mockLeads.find((l) => l.id === Number(id));
  const [lead, setLead] = useState<Lead | undefined>(leadData ? { ...leadData } : undefined);
  const [noteText, setNoteText] = useState("");
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);

  if (!lead) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Lead not found</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/leads")}>Back to Leads</Button>
      </div>
    );
  }

  const addNote = () => {
    if (!noteText.trim()) return;
    const newNote: Note = {
      id: (lead.notes?.length || 0) + 1,
      text: noteText.trim(),
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      author: COUNSELLOR_NAME,
    };
    setLead({ ...lead, notes: [...(lead.notes || []), newNote] });
    setNoteText("");
    setNoteDialogOpen(false);
  };

  return (
    <div>
      <Button variant="ghost" size="sm" className="gap-2 mb-4" onClick={() => navigate("/leads")}>
        <ArrowLeft className="w-4 h-4" /> Back to Leads
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold text-foreground">{lead.name}</h1>
                <p className="text-sm text-muted-foreground">Lead #{lead.id}</p>
              </div>
              <div className="flex gap-2">
                <StatusBadge status={lead.status} />
                <PriorityBadge priority={lead.priority} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 text-muted-foreground"><Phone className="w-4 h-4" />{lead.phone}</p>
                <p className="flex items-center gap-2 text-muted-foreground"><Mail className="w-4 h-4" />{lead.email}</p>
                <p className="flex items-center gap-2 text-muted-foreground"><MapPin className="w-4 h-4" />{lead.branch}</p>
                <p className="flex items-center gap-2 text-muted-foreground"><Calendar className="w-4 h-4" />Created: {lead.createdDate}</p>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">GPA:</span> <span className="font-medium text-foreground">{lead.gpa}</span></p>
                <p><span className="text-muted-foreground">Qualification:</span> <span className="font-medium text-foreground">{lead.qualification}</span></p>
                <p><span className="text-muted-foreground">Year:</span> <span className="font-medium text-foreground">{lead.year}</span></p>
                <p><span className="text-muted-foreground">Test Score:</span> <span className="font-medium text-foreground">{lead.testScore}</span></p>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Notes</h2>
              <Dialog open={noteDialogOpen} onOpenChange={setNoteDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-1"><Plus className="w-3.5 h-3.5" /> Add Note</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Note for {lead.name}</DialogTitle>
                  </DialogHeader>
                  <Textarea placeholder="Type your note here..." value={noteText} onChange={(e) => setNoteText(e.target.value)} className="min-h-[100px]" />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setNoteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={addNote} disabled={!noteText.trim()}>Save Note</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            {(lead.notes?.length || 0) > 0 ? (
              <div className="space-y-3">
                {lead.notes?.map((note) => (
                  <div key={note.id} className="p-3 rounded-lg bg-muted/50 border border-border">
                    <p className="text-sm text-foreground">{note.text}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{note.author} · {note.createdAt}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">No notes yet</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="font-semibold text-foreground mb-4">Lead Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stage</span>
                <StageBadge stage={lead.stage} />
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Country</span>
                <span className="font-medium text-foreground">{lead.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Program</span>
                <span className="font-medium text-foreground">{lead.program}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Source</span>
                <span className="font-medium text-foreground">{lead.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Counsellor</span>
                <span className="font-medium text-foreground">{lead.counsellor}</span>
              </div>
              {lead.nextFollowUp && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Follow-up</span>
                  <span className={`font-medium ${lead.isOverdue ? "text-destructive" : "text-foreground"}`}>
                    {lead.isOverdue && "⚠ "}{lead.nextFollowUp}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="font-semibold text-foreground mb-3">Call Details</h2>
            <p className="text-sm text-muted-foreground">{lead.callDetails}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
