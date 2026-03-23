import { mockLeads } from "@/data/mockData";
import { GraduationCap, Mail, Phone } from "lucide-react";
import { StageBadge } from "@/components/StageBadge";

export default function StudentsPage() {
  const students = mockLeads.filter((l) => l.stage === "Converted");

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-1">Students</h1>
      <p className="text-sm text-muted-foreground mb-6">{students.length} converted students</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {students.map((student) => (
          <div key={student.id} className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{student.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" />{student.email}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" />{student.phone}</p>
              </div>
            </div>
            <div className="mt-3 space-y-1 text-xs text-muted-foreground">
              <p><span className="font-medium text-foreground">Program:</span> {student.program}</p>
              <p><span className="font-medium text-foreground">Country:</span> {student.country}</p>
              <p><span className="font-medium text-foreground">GPA:</span> {student.gpa} · {student.testScore}</p>
              <p><span className="font-medium text-foreground">Branch:</span> {student.branch}</p>
            </div>
            <div className="mt-3">
              <StageBadge stage="Converted" />
            </div>
          </div>
        ))}
        {students.length === 0 && (
          <p className="text-sm text-muted-foreground col-span-full text-center py-12">No converted students yet</p>
        )}
      </div>
    </div>
  );
}
