import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { mockUniversities } from "@/data/mockUniversities";
import { useCompare } from "@/contexts/CompareContext";
import {
  MapPin, Globe, Plus, Check, Mail, Phone, ExternalLink, Clock, DollarSign,
  BookOpen, GraduationCap, Users, Award, Building2, Calendar, ChevronRight,
  Image as ImageIcon, Star, Shield, Briefcase
} from "lucide-react";

const tabs = ["Overview", "Programs", "Scholarships", "Contact"] as const;

export default function UniversityDetailPage() {
  const { id } = useParams();
  const uni = mockUniversities.find(u => u.id === id);
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Overview");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const { addUniversity, removeUniversity, isUniversitySelected, addProgram, removeProgram, isProgramSelected } = useCompare();

  if (!uni) return <div className="max-w-4xl mx-auto px-4 py-16 text-center text-muted-foreground">University not found</div>;

  const uniSelected = isUniversitySelected(uni.id);

  const quickFacts = [
    { icon: Calendar, label: "Founded", value: uni.founded ? String(uni.founded) : "N/A" },
    { icon: Users, label: "Students", value: uni.studentCount || "N/A" },
    { icon: Globe, label: "International", value: uni.internationalStudents || "N/A" },
    { icon: Award, label: "Ranking", value: uni.ranking ? `#${uni.ranking} QS` : "N/A" },
    { icon: Shield, label: "Acceptance", value: uni.acceptanceRate || "N/A" },
    { icon: Building2, label: "Campus", value: uni.campusSize || "N/A" },
  ];

  return (
    <div className="pb-20">
      {/* Hero */}
      <div className="relative h-56 sm:h-72 lg:h-80 overflow-hidden">
        <img src={uni.coverImage} alt={uni.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 max-w-7xl mx-auto">
          <div className="flex items-end gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-card border-2 border-card overflow-hidden shadow-lg shrink-0">
              <img src={uni.logo} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{uni.name}</h1>
              <div className="flex items-center gap-3 mt-1 text-white/80 text-sm flex-wrap">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {uni.city}, {uni.country}</span>
                {uni.ranking && <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> Rank #{uni.ranking}</span>}
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-medium">{uni.type}</span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-medium">{uni.assessmentLevel}</span>
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
        <div className="flex gap-1 border-b border-border overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content area with sticky sidebar */}
        <div className="mt-6 flex gap-6">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {activeTab === "Overview" && (
              <div className="space-y-6">
                {/* About */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2"><Building2 className="w-5 h-5 text-primary" /> About {uni.name}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{uni.description}</p>
                </div>

                {/* Quick Facts Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {quickFacts.map(f => (
                    <div key={f.label} className="bg-card rounded-xl border border-border p-4 flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <f.icon className="w-4.5 h-4.5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{f.label}</p>
                        <p className="text-sm font-bold text-foreground mt-0.5">{f.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-primary" /> Key Highlights</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {uni.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gallery */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><ImageIcon className="w-5 h-5 text-primary" /> Campus Gallery</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {uni.gallery.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => { setGalleryIdx(i); setGalleryOpen(true); }}
                        className="relative aspect-[3/2] rounded-xl overflow-hidden group cursor-pointer"
                      >
                        <img src={img} alt={`Campus ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gallery Lightbox */}
                {galleryOpen && (
                  <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setGalleryOpen(false)}>
                    <button className="absolute top-4 right-4 text-white text-2xl font-bold" onClick={() => setGalleryOpen(false)}>✕</button>
                    <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl" onClick={(e) => { e.stopPropagation(); setGalleryIdx(i => (i - 1 + uni.gallery.length) % uni.gallery.length); }}>‹</button>
                    <img src={uni.gallery[galleryIdx]} alt="" className="max-w-full max-h-[85vh] rounded-xl object-contain" onClick={e => e.stopPropagation()} />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl" onClick={(e) => { e.stopPropagation(); setGalleryIdx(i => (i + 1) % uni.gallery.length); }}>›</button>
                    <div className="absolute bottom-4 text-white/70 text-sm">{galleryIdx + 1} / {uni.gallery.length}</div>
                  </div>
                )}

                {/* Facilities */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" /> Facilities & Services</h2>
                  <div className="flex flex-wrap gap-2">
                    {uni.facilities.map((f, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-muted text-sm font-medium text-foreground">{f}</span>
                    ))}
                  </div>
                </div>

                {/* Programs preview */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><GraduationCap className="w-5 h-5 text-primary" /> Popular Programs</h2>
                    <button onClick={() => setActiveTab("Programs")} className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                      View all <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {uni.programs.slice(0, 3).map(p => (
                      <Link
                        key={p.id}
                        to={`/public/programs/${p.id}`}
                        className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                      >
                        <div>
                          <span className="text-sm font-semibold text-foreground">{p.name}</span>
                          <span className="ml-2 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-medium">{p.degree}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{p.currency} {p.tuitionFee.toLocaleString()}/yr</div>
                      </Link>
                    ))}
                  </div>
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
                          <div className="flex items-center gap-2 flex-wrap">
                            <Link to={`/public/programs/${prog.id}`} className="font-bold text-foreground hover:text-primary transition-colors">{prog.name}</Link>
                            <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-medium">{prog.degree}</span>
                            {prog.modeOfStudy && <span className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-[10px] font-medium">{prog.modeOfStudy}</span>}
                          </div>
                          {prog.department && <p className="text-xs text-muted-foreground mt-0.5">{prog.department}</p>}
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{prog.description}</p>
                          <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {prog.duration}</span>
                            <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {prog.currency} {prog.tuitionFee.toLocaleString()}</span>
                            <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> IELTS {prog.ieltsRequirement}</span>
                            {prog.gpaRequirement && <span>GPA {prog.gpaRequirement}+</span>}
                            <span>Intake: {prog.intake.join(", ")}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Link
                            to={`/public/programs/${prog.id}`}
                            className="px-3 py-2 rounded-lg text-xs font-medium border border-border text-foreground hover:bg-muted transition-colors"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => pSelected ? removeProgram(prog.id) : addProgram(prog)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                              pSelected ? "bg-primary text-primary-foreground" : "border border-border text-foreground hover:bg-muted"
                            }`}
                          >
                            {pSelected ? <><Check className="w-3 h-3" /> Added</> : <><Plus className="w-3 h-3" /> Compare</>}
                          </button>
                        </div>
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
                    <h3 className="font-bold text-foreground flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> {s.name}</h3>
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

          {/* Sticky Sidebar - Key Info */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* Quick Info Card */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-border">
                    <img src={uni.logo} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{uni.name}</p>
                    <p className="text-xs text-muted-foreground">{uni.city}, {uni.country}</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs">
                  {uni.ranking && (
                    <div className="flex justify-between"><span className="text-muted-foreground">World Ranking</span><span className="font-semibold text-foreground">#{uni.ranking}</span></div>
                  )}
                  <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-semibold text-foreground">{uni.type}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Assessment</span><span className="font-semibold text-foreground">{uni.assessmentLevel}</span></div>
                  {uni.founded && (
                    <div className="flex justify-between"><span className="text-muted-foreground">Founded</span><span className="font-semibold text-foreground">{uni.founded}</span></div>
                  )}
                  {uni.acceptanceRate && (
                    <div className="flex justify-between"><span className="text-muted-foreground">Acceptance Rate</span><span className="font-semibold text-foreground">{uni.acceptanceRate}</span></div>
                  )}
                  <div className="flex justify-between"><span className="text-muted-foreground">Programs</span><span className="font-semibold text-foreground">{uni.programs.length}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Scholarships</span><span className="font-semibold text-foreground">{uni.scholarships.length}</span></div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-card rounded-2xl border border-border p-5 space-y-2.5">
                <button className="w-full px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                  Apply Now
                </button>
                <button
                  onClick={() => uniSelected ? removeUniversity(uni.id) : addUniversity(uni)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                    uniSelected ? "bg-primary/10 text-primary border border-primary/20" : "border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {uniSelected ? <><Check className="w-4 h-4" /> Added to Compare</> : <><Plus className="w-4 h-4" /> Add to Compare</>}
                </button>
                <a
                  href={uni.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-1.5"
                >
                  <Globe className="w-4 h-4" /> Visit Website
                </a>
              </div>

              {/* Contact Quick */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <h3 className="text-sm font-bold text-foreground mb-3">Quick Contact</h3>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> {uni.contact.email}</div>
                  <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {uni.contact.phone}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
