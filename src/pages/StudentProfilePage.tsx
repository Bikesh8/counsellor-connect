import { useParams, useNavigate } from "react-router-dom";
import { mockLeads } from "@/data/mockData";
import { ArrowLeft, Phone, Mail, MapPin, GraduationCap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StageBadge } from "@/components/StageBadge";

export default function StudentProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = mockLeads.find((l) => l.id === Number(id) && l.stage === "Converted");

  if (!student) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Student not found</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/students")}>Back to Students</Button>
      </div>
    );
  }

  return (
    <div>
      <Button variant="ghost" size="sm" className="gap-2 mb-4" onClick={() => navigate("/students")}>
        <ArrowLeft className="w-4 h-4" /> Back to Students
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{student.name}</h1>
                <p className="text-sm text-muted-foreground">Student #{student.id}</p>
                <div className="mt-2"><StageBadge stage="Converted" /></div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 text-muted-foreground"><Phone className="w-4 h-4" />{student.phone}</p>
                <p className="flex items-center gap-2 text-muted-foreground"><Mail className="w-4 h-4" />{student.email}</p>
                <p className="flex items-center gap-2 text-muted-foreground"><MapPin className="w-4 h-4" />{student.branch}</p>
                <p className="flex items-center gap-2 text-muted-foreground"><Calendar className="w-4 h-4" />Created: {student.createdDate}</p>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">GPA:</span> <span className="font-medium text-foreground">{student.gpa}</span></p>
                <p><span className="text-muted-foreground">Qualification:</span> <span className="font-medium text-foreground">{student.qualification}</span></p>
                <p><span className="text-muted-foreground">Year:</span> <span className="font-medium text-foreground">{student.year}</span></p>
                <p><span className="text-muted-foreground">Test Score:</span> <span className="font-medium text-foreground">{student.testScore}</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="font-semibold text-foreground mb-4">Program Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Program</span>
                <span className="font-medium text-foreground">{student.program}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Country</span>
                <span className="font-medium text-foreground">{student.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Source</span>
                <span className="font-medium text-foreground">{student.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Counsellor</span>
                <span className="font-medium text-foreground">{student.counsellor}</span>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="font-semibold text-foreground mb-3">Notes</h2>
            {(student.notes?.length || 0) > 0 ? (
              <div className="space-y-2">
                {student.notes?.map((note) => (
                  <div key={note.id} className="p-3 rounded-lg bg-muted/50 border border-border">
                    <p className="text-sm text-foreground">{note.text}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{note.author} · {note.createdAt}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No notes</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
