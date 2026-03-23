import { mockLeads } from "@/data/mockData";
import { GraduationCap, Mail, Phone, Eye } from "lucide-react";
import { StageBadge } from "@/components/StageBadge";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function StudentsPage() {
  const students = mockLeads.filter((l) => l.stage === "Converted");
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-1">Students</h1>
      <p className="text-sm text-muted-foreground mb-6">{students.length} converted students</p>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-card rounded-lg border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Student Details</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Program</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Country</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">GPA</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Test Score</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Branch</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Status</th>
              <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{student.name} <span className="text-muted-foreground font-normal text-xs">#{student.id}</span></p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" />{student.email}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" />{student.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3 text-xs">{student.program}</td>
                <td className="py-3 px-3 text-xs">{student.country}</td>
                <td className="py-3 px-3 text-xs">{student.gpa}</td>
                <td className="py-3 px-3 text-xs">{student.testScore}</td>
                <td className="py-3 px-3 text-xs">{student.branch}</td>
                <td className="py-3 px-3"><StageBadge stage="Converted" /></td>
                <td className="py-3 px-3">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => navigate(`/students/${student.id}`)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-3">
        {students.map((student) => (
          <div key={student.id} className="bg-card rounded-lg border border-border p-4" onClick={() => navigate(`/students/${student.id}`)}>
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
            </div>
            <div className="mt-3">
              <StageBadge stage="Converted" />
            </div>
          </div>
        ))}
        {students.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-12">No converted students yet</p>
        )}
      </div>
    </div>
  );
}
