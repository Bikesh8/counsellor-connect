import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { mockUniversities, allPrograms, Program } from "@/data/mockUniversities";
import { useCompare } from "@/contexts/CompareContext";
import {
  MapPin, Clock, DollarSign, BookOpen, GraduationCap, Globe, ArrowLeft,
  Check, Plus, ChevronRight, AlertTriangle, CheckCircle2, XCircle,
  Briefcase, FileText, Award, Building2, Languages, Users
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function ProgramDetailPage() {
  const { programId } = useParams();
  const program = allPrograms.find(p => p.id === programId);
  const uni = program ? mockUniversities.find(u => u.id === program.universityId) : undefined;
  const { addProgram, removeProgram, isProgramSelected } = useCompare();

  const [showChanceCalc, setShowChanceCalc] = useState(false);
  const [showApply, setShowApply] = useState(false);
  const [chanceForm, setChanceForm] = useState({ gpa: "", ielts: "", experience: "" });
  const [chanceResult, setChanceResult] = useState<{ score: number; eligible: boolean; details: string[] } | null>(null);

  const [applyForm, setApplyForm] = useState({ name: "", email: "", phone: "", gpa: "", ielts: "", statement: "" });
  const [applyErrors, setApplyErrors] = useState<string[]>([]);
  const [applySuccess, setApplySuccess] = useState(false);

  if (!program || !uni) {
    return <div className="max-w-4xl mx-auto px-4 py-16 text-center text-muted-foreground">Program not found</div>;
  }

  const pSelected = isProgramSelected(program.id);

  // Similar programs: same degree or same field from other universities
  const similarPrograms = allPrograms.filter(p =>
    p.id !== program.id && (p.degree === program.degree || p.name.toLowerCase().includes(program.name.split(" ")[0].toLowerCase()))
  ).slice(0, 4);

  const calculateChance = () => {
    const gpa = parseFloat(chanceForm.gpa);
    const ielts = parseFloat(chanceForm.ielts);
    const details: string[] = [];
    let score = 0;

    // GPA check
    if (!isNaN(gpa)) {
      const req = program.gpaRequirement || 3.0;
      if (gpa >= req) { score += 40; details.push(`✅ GPA ${gpa} meets requirement (${req}+)`); }
      else if (gpa >= req - 0.3) { score += 25; details.push(`⚠️ GPA ${gpa} is slightly below requirement (${req}+)`); }
      else { score += 10; details.push(`❌ GPA ${gpa} is below requirement (${req}+)`); }
    } else { details.push("❌ GPA not provided"); }

    // IELTS check
    if (!isNaN(ielts)) {
      if (ielts >= program.ieltsRequirement) { score += 40; details.push(`✅ IELTS ${ielts} meets requirement (${program.ieltsRequirement}+)`); }
      else if (ielts >= program.ieltsRequirement - 0.5) { score += 20; details.push(`⚠️ IELTS ${ielts} is slightly below requirement (${program.ieltsRequirement}+)`); }
      else { score += 5; details.push(`❌ IELTS ${ielts} is below requirement (${program.ieltsRequirement}+)`); }
    } else { details.push("❌ IELTS not provided"); }

    // Experience bonus
    if (chanceForm.experience === "yes") { score += 20; details.push("✅ Relevant work/research experience"); }
    else { score += 0; details.push("ℹ️ No relevant experience (not mandatory)"); }

    const eligible = score >= 60;
    setChanceResult({ score: Math.min(score, 100), eligible, details });
  };

  const handleApply = () => {
    const errors: string[] = [];
    if (!applyForm.name.trim()) errors.push("Full name is required");
    if (!applyForm.email.trim()) errors.push("Email is required");
    if (!applyForm.gpa.trim()) errors.push("GPA is required");
    if (!applyForm.ielts.trim()) errors.push("IELTS score is required");

    // Eligibility check
    const gpa = parseFloat(applyForm.gpa);
    const ielts = parseFloat(applyForm.ielts);
    if (program.gpaRequirement && gpa < program.gpaRequirement) {
      errors.push(`GPA ${gpa} does not meet minimum requirement of ${program.gpaRequirement}`);
    }
    if (ielts < program.ieltsRequirement) {
      errors.push(`IELTS ${ielts} does not meet minimum requirement of ${program.ieltsRequirement}`);
    }

    setApplyErrors(errors);
    if (errors.length === 0) {
      setApplySuccess(true);
    }
  };

  const infoItems = [
    { icon: Clock, label: "Duration", value: program.duration },
    { icon: DollarSign, label: "Tuition Fee", value: `${program.currency} ${program.tuitionFee.toLocaleString()}/yr` },
    { icon: BookOpen, label: "IELTS Required", value: String(program.ieltsRequirement) },
    { icon: GraduationCap, label: "Degree", value: program.degree },
    { icon: Languages, label: "Language", value: program.languageOfInstruction || "English" },
    { icon: Users, label: "Mode", value: program.modeOfStudy || "Full-time" },
  ];

  return (
    <div className="pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/public/universities" className="hover:text-foreground transition-colors">Universities</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/public/universities/${uni.id}`} className="hover:text-foreground transition-colors">{uni.name}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">{program.name}</span>
        </nav>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4">
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-border shrink-0">
              <img src={uni.logo} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">{program.name}</h1>
                <span className="px-2.5 py-0.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold">{program.degree}</span>
              </div>
              <Link to={`/public/universities/${uni.id}`} className="text-sm text-primary hover:underline mt-1 inline-flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> {uni.name}
              </Link>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1.5">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {uni.city}, {uni.country}</span>
                {program.department && <span>• {program.department}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 flex gap-6">
        {/* Left column */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Key Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {infoItems.map(item => (
              <div key={item.label} className="bg-card rounded-xl border border-border p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /> Program Overview</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{program.description}</p>
          </div>

          {/* Curriculum */}
          {program.curriculum && program.curriculum.length > 0 && (
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> Curriculum</h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {program.curriculum.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">{i + 1}</div>
                    <span className="text-sm text-foreground">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Eligibility */}
          {program.eligibilityCriteria && program.eligibilityCriteria.length > 0 && (
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-primary" /> Eligibility Requirements</h2>
              <div className="space-y-2">
                {program.eligibilityCriteria.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-xl border border-border">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Career Outcomes */}
          {program.careerOutcomes && program.careerOutcomes.length > 0 && (
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" /> Career Outcomes</h2>
              <div className="flex flex-wrap gap-2">
                {program.careerOutcomes.map((c, i) => (
                  <span key={i} className="px-4 py-2 rounded-xl bg-primary/5 border border-primary/10 text-sm font-medium text-foreground">{c}</span>
                ))}
              </div>
            </div>
          )}

          {/* Intake & Application */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Intake & Application</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs mb-1">Available Intakes</p>
                <div className="flex flex-wrap gap-2">
                  {program.intake.map(i => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-sm font-medium">{i}</span>
                  ))}
                </div>
              </div>
              {program.applicationFee !== undefined && (
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Application Fee</p>
                  <p className="font-semibold text-foreground">{program.applicationFee === 0 ? "Free" : `${program.currency} ${program.applicationFee}`}</p>
                </div>
              )}
            </div>
          </div>

          {/* Similar Programs */}
          {similarPrograms.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">Similar Programs</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {similarPrograms.map(sp => (
                  <Link
                    key={sp.id}
                    to={`/public/programs/${sp.id}`}
                    className="bg-card rounded-2xl border border-border p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-sm text-foreground">{sp.name}</span>
                      <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-medium">{sp.degree}</span>
                    </div>
                    <p className="text-xs text-primary font-medium">{sp.universityName}</p>
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{sp.duration}</span>
                      <span>{sp.currency} {sp.tuitionFee.toLocaleString()}</span>
                      <span>IELTS {sp.ieltsRequirement}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Sidebar */}
        <div className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-24 space-y-4">
            {/* Actions Card */}
            <div className="bg-card rounded-2xl border border-border p-5 space-y-2.5">
              <button
                onClick={() => setShowApply(true)}
                className="w-full px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Apply Now
              </button>
              <button
                onClick={() => setShowChanceCalc(true)}
                className="w-full px-4 py-2.5 rounded-xl border border-primary text-primary text-sm font-semibold hover:bg-primary/5 transition-colors"
              >
                Calculate Your Chance
              </button>
              <button
                onClick={() => pSelected ? removeProgram(program.id) : addProgram(program)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                  pSelected ? "bg-primary/10 text-primary border border-primary/20" : "border border-border text-foreground hover:bg-muted"
                }`}
              >
                {pSelected ? <><Check className="w-4 h-4" /> Added to Compare</> : <><Plus className="w-4 h-4" /> Compare Program</>}
              </button>
            </div>

            {/* Program Summary */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h3 className="text-sm font-bold text-foreground mb-3">Program Summary</h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between"><span className="text-muted-foreground">Tuition</span><span className="font-semibold text-foreground">{program.currency} {program.tuitionFee.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-semibold text-foreground">{program.duration}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">IELTS</span><span className="font-semibold text-foreground">{program.ieltsRequirement}</span></div>
                {program.gpaRequirement && <div className="flex justify-between"><span className="text-muted-foreground">Min GPA</span><span className="font-semibold text-foreground">{program.gpaRequirement}</span></div>}
                <div className="flex justify-between"><span className="text-muted-foreground">Degree</span><span className="font-semibold text-foreground">{program.degree}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Intake</span><span className="font-semibold text-foreground">{program.intake.join(", ")}</span></div>
              </div>
            </div>

            {/* University Quick */}
            <Link to={`/public/universities/${uni.id}`} className="block bg-card rounded-2xl border border-border p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-border">
                  <img src={uni.logo} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{uni.name}</p>
                  <p className="text-xs text-muted-foreground">{uni.city}, {uni.country}</p>
                </div>
              </div>
              {uni.ranking && <p className="text-xs text-muted-foreground mt-2">World Ranking: #{uni.ranking}</p>}
            </Link>
          </div>
        </div>
      </div>

      {/* Calculate Your Chance Dialog */}
      <Dialog open={showChanceCalc} onOpenChange={setShowChanceCalc}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Calculate Your Chance</DialogTitle>
            <DialogDescription>Enter your academic details to estimate your admission chances for {program.name}.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Your GPA (out of 4.0)</label>
              <input type="number" step="0.1" min="0" max="4" placeholder="e.g. 3.5" value={chanceForm.gpa} onChange={e => setChanceForm(f => ({ ...f, gpa: e.target.value }))} className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Your IELTS Score</label>
              <input type="number" step="0.5" min="0" max="9" placeholder="e.g. 7.0" value={chanceForm.ielts} onChange={e => setChanceForm(f => ({ ...f, ielts: e.target.value }))} className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Relevant Experience?</label>
              <select value={chanceForm.experience} onChange={e => setChanceForm(f => ({ ...f, experience: e.target.value }))} className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background text-sm">
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <button onClick={calculateChance} className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Calculate
            </button>

            {chanceResult && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Admission Chance</span>
                  <span className={`text-lg font-bold ${chanceResult.score >= 60 ? "text-green-600" : chanceResult.score >= 40 ? "text-yellow-600" : "text-red-600"}`}>{chanceResult.score}%</span>
                </div>
                <Progress value={chanceResult.score} className="h-3" />
                <div className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 ${
                  chanceResult.eligible ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {chanceResult.eligible ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  {chanceResult.eligible ? "You appear eligible for this program!" : "You may not meet the minimum requirements."}
                </div>
                <div className="space-y-1.5">
                  {chanceResult.details.map((d, i) => (
                    <p key={i} className="text-xs text-muted-foreground">{d}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Apply Dialog */}
      <Dialog open={showApply} onOpenChange={(open) => { setShowApply(open); if (!open) { setApplyErrors([]); setApplySuccess(false); } }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Apply to {program.name}</DialogTitle>
            <DialogDescription>{uni.name} • {program.degree} Program</DialogDescription>
          </DialogHeader>
          {applySuccess ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Application Submitted!</h3>
              <p className="text-sm text-muted-foreground mt-2">Your application for {program.name} at {uni.name} has been received. You'll hear back within 2–4 weeks.</p>
              <button onClick={() => setShowApply(false)} className="mt-4 px-6 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">Done</button>
            </div>
          ) : (
            <div className="space-y-3">
              {applyErrors.length > 0 && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                  {applyErrors.map((e, i) => (
                    <p key={i} className="text-xs text-red-700 flex items-center gap-1.5"><XCircle className="w-3 h-3 shrink-0" /> {e}</p>
                  ))}
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-foreground">Full Name *</label>
                <input type="text" value={applyForm.name} onChange={e => setApplyForm(f => ({ ...f, name: e.target.value }))} className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email *</label>
                <input type="email" value={applyForm.email} onChange={e => setApplyForm(f => ({ ...f, email: e.target.value }))} className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Phone</label>
                <input type="tel" value={applyForm.phone} onChange={e => setApplyForm(f => ({ ...f, phone: e.target.value }))} className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Your GPA * <span className="text-xs text-muted-foreground">(min {program.gpaRequirement || "N/A"})</span></label>
                  <input type="number" step="0.1" value={applyForm.gpa} onChange={e => setApplyForm(f => ({ ...f, gpa: e.target.value }))} className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">IELTS * <span className="text-xs text-muted-foreground">(min {program.ieltsRequirement})</span></label>
                  <input type="number" step="0.5" value={applyForm.ielts} onChange={e => setApplyForm(f => ({ ...f, ielts: e.target.value }))} className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background text-sm" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Personal Statement</label>
                <textarea rows={3} value={applyForm.statement} onChange={e => setApplyForm(f => ({ ...f, statement: e.target.value }))} className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background text-sm resize-none" placeholder="Why do you want to join this program?" />
              </div>
              <button onClick={handleApply} className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                Submit Application
              </button>
              <p className="text-xs text-muted-foreground text-center">You must meet minimum GPA and IELTS requirements to apply.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
