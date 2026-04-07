import { Search, ArrowRight, GraduationCap, Globe, Users, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { mockUniversities } from "@/data/mockUniversities";

export default function PublicHomePage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const featured = mockUniversities.slice(0, 6);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/public/universities?q=${encodeURIComponent(search)}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
            <Globe className="w-3.5 h-3.5" /> Trusted by 10,000+ students worldwide
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight">
            Discover Your Perfect<br />
            <span className="text-primary">University Abroad</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore top universities, compare programs, and find the best fit for your academic journey — all in one place.
          </p>
          <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search universities or programs..."
              className="w-full pl-12 pr-32 py-4 rounded-2xl border border-border bg-card shadow-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { icon: GraduationCap, label: "Universities", value: "50+" },
            { icon: BookOpen, label: "Programs", value: "300+" },
            { icon: Globe, label: "Countries", value: "12" },
            { icon: Users, label: "Students Placed", value: "10K+" },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Featured Universities</h2>
              <p className="text-sm text-muted-foreground mt-1">Top-rated institutions around the world</p>
            </div>
            <Link to="/public/universities" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(uni => (
              <Link
                key={uni.id}
                to={`/public/universities/${uni.id}`}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={uni.coverImage} alt={uni.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-3 left-3 w-12 h-12 rounded-xl bg-card border border-border overflow-hidden shadow">
                    <img src={uni.logo} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{uni.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{uni.city}, {uni.country}</p>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{uni.description}</p>
                  <div className="flex gap-2 mt-3">
                    <span className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-[10px] font-medium">{uni.type}</span>
                    <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-medium">{uni.assessmentLevel}</span>
                    {uni.ranking && <span className="px-2 py-0.5 rounded-md bg-accent text-accent-foreground text-[10px] font-medium">#{uni.ranking}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
