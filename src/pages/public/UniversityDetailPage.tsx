import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { mockUniversities } from "@/data/mockUniversities";
import { useCompare } from "@/contexts/CompareContext";
import { MapPin, Globe, Plus, Check, Mail, Phone, ExternalLink, Clock, DollarSign, BookOpen } from "lucide-react";

const tabs = ["Overview", "Programs", "Scholarships", "Contact"] as const;

export default function UniversityDetailPage() {
  const { id } = useParams();
  const uni = mockUniversities.find(u => u.id === id);
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Overview");
  const { addUniversity, removeUniversity, isUniversitySelected, addProgram, removeProgram, isProgramSelected } = useCompare();

  if (!uni) return <div className="max-w-4xl mx-auto px-4 py-16 text-center text-muted-foreground">University not found</div>;

  const uniSelected = isUniversitySelected(uni.id);

  return (
    <div className="pb-20">
      {/* Hero */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <img src={uni.coverImage} alt={uni.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 max-w-7xl mx-auto">
          <div className="flex items-end gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-card border-2 border-card overflow-hidden shadow-lg shrink-0">
              <img src={uni.logo} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{uni.name}</h1>
              <div className="flex items-center gap-3 mt-1 text-white/80 text-sm">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {uni.city}, {uni.country}</span>
                {uni.ranking && <span>Rank #{uni.ranking}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-4 relative z-10 flex gap-3">
        <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 shadow-lg transition-colors">
          Apply Now
        </button>
        <button
          onClick={() => uniSelected ? removeUniversity(uni.id) : addUniversity(uni)}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg transition-colors flex items-center gap-1.5 ${
            uniSelected ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-muted"
          }`}
        >
          {uniSelected ? <><Check className="w-4 h-4" /> Added to Compare</> : <><Plus className="w-4 h-4" /> Add to Compare</>}
        </button>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="flex gap-1 border-b border-border">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === "Overview" && (
            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-foreground mb-3">About</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{uni.description}</p>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Type", value: uni.type },
                  { label: "Assessment", value: uni.assessmentLevel },
                  { label: "Programs", value: `${uni.programs.length} available` },
                ].map(info => (
                  <div key={info.label} className="bg-card rounded-xl border border-border p-4">
                    <p className="text-xs text-muted-foreground">{info.label}</p>
                    <p className="text-sm font-bold text-foreground mt-1">{info.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Programs" && (
            <div className="space-y-4">
              {uni.programs.map(prog => {
                const pSelected = isProgramSelected(prog.id);
                return (
                  <div key={prog.id} className="bg-card rounded-2xl border border-border p-5 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-foreground">{prog.name}</h3>
                          <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-medium">{prog.degree}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{prog.description}</p>
                        <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {prog.duration}</span>
                          <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {prog.currency} {prog.tuitionFee.toLocaleString()}</span>
                          <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> IELTS {prog.ieltsRequirement}</span>
                          <span>Intake: {prog.intake.join(", ")}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => pSelected ? removeProgram(prog.id) : addProgram(prog)}
                        className={`shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                          pSelected ? "bg-primary text-primary-foreground" : "border border-border text-foreground hover:bg-muted"
                        }`}
                      >
                        {pSelected ? <><Check className="w-3 h-3" /> Added</> : <><Plus className="w-3 h-3" /> Compare</>}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "Scholarships" && (
            <div className="space-y-4">
              {uni.scholarships.length === 0 && <p className="text-sm text-muted-foreground">No scholarships listed.</p>}
              {uni.scholarships.map(s => (
                <div key={s.id} className="bg-card rounded-2xl border border-border p-5">
                  <h3 className="font-bold text-foreground">{s.name}</h3>
                  <div className="grid sm:grid-cols-3 gap-3 mt-3 text-xs">
                    <div><p className="text-muted-foreground">Amount</p><p className="font-semibold text-foreground mt-0.5">{s.amount}</p></div>
                    <div><p className="text-muted-foreground">Eligibility</p><p className="font-semibold text-foreground mt-0.5">{s.eligibility}</p></div>
                    <div><p className="text-muted-foreground">Deadline</p><p className="font-semibold text-foreground mt-0.5">{s.deadline}</p></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Contact" && (
            <div className="bg-card rounded-2xl border border-border p-6 max-w-lg">
              <h2 className="text-lg font-bold text-foreground mb-4">Contact Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-muted-foreground" /> <span>{uni.contact.email}</span></div>
                <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-muted-foreground" /> <span>{uni.contact.phone}</span></div>
                <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-muted-foreground" /> <span>{uni.contact.address}</span></div>
                <a href={uni.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-primary hover:underline">
                  <Globe className="w-4 h-4" /> {uni.website}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
