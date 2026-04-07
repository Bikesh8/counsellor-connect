import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, Plus, Check } from "lucide-react";
import { mockUniversities } from "@/data/mockUniversities";
import { useCompare } from "@/contexts/CompareContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function UniversityListingPage() {
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [search, setSearch] = useState(initialQ);
  const [countryFilter, setCountryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const { addUniversity, removeUniversity, isUniversitySelected } = useCompare();

  const countries = [...new Set(mockUniversities.map(u => u.country))];

  const filtered = useMemo(() => {
    return mockUniversities.filter(u => {
      const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.city.toLowerCase().includes(search.toLowerCase()) || u.programs.some(p => p.name.toLowerCase().includes(search.toLowerCase()));
      const matchCountry = countryFilter === "all" || u.country === countryFilter;
      const matchType = typeFilter === "all" || u.type === typeFilter;
      return matchSearch && matchCountry && matchType;
    });
  }, [search, countryFilter, typeFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Explore Universities</h1>
        <p className="text-sm text-muted-foreground mt-1">Discover and compare top universities worldwide</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search universities or programs..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <Select value={countryFilter} onValueChange={setCountryFilter}>
          <SelectTrigger className="w-full sm:w-44 rounded-xl">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-36 rounded-xl">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Public">Public</SelectItem>
            <SelectItem value="Private">Private</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{filtered.length} universities found</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(uni => {
          const selected = isUniversitySelected(uni.id);
          return (
            <div key={uni.id} className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative h-40 overflow-hidden">
                <img src={uni.coverImage} alt={uni.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-3 left-3 w-12 h-12 rounded-xl bg-card border border-border overflow-hidden shadow">
                  <img src={uni.logo} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground">{uni.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{uni.city}, {uni.country}</p>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{uni.description}</p>
                <div className="flex gap-2 mt-3">
                  <span className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-[10px] font-medium">{uni.type}</span>
                  <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-medium">{uni.assessmentLevel}</span>
                  {uni.ranking && <span className="px-2 py-0.5 rounded-md bg-accent text-accent-foreground text-[10px] font-medium">#{uni.ranking}</span>}
                </div>
                <div className="flex gap-2 mt-4">
                  <Link to={`/public/universities/${uni.id}`} className="flex-1 text-center px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
                    View Details
                  </Link>
                  <button
                    onClick={() => selected ? removeUniversity(uni.id) : addUniversity(uni)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                      selected ? "bg-primary text-primary-foreground" : "border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {selected ? <><Check className="w-3 h-3" /> Added</> : <><Plus className="w-3 h-3" /> Compare</>}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-medium">No universities found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
