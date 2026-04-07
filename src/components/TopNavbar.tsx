import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, Menu, Building2, ChevronDown, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { COUNSELLOR_NAME } from "@/data/mockData";
import { mockAgencies, CURRENT_AGENCY_ID, CURRENT_BRANCH_ID } from "@/data/mockAgencies";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface TopNavbarProps {
  onMenuToggle: () => void;
}

export function TopNavbar({ onMenuToggle }: TopNavbarProps) {
  const [selectedAgencyId, setSelectedAgencyId] = useState(CURRENT_AGENCY_ID);
  const [selectedBranchId, setSelectedBranchId] = useState(CURRENT_BRANCH_ID);

  const selectedAgency = mockAgencies.find((a) => a.id === selectedAgencyId);
  const selectedBranch = selectedAgency?.branches.find((b) => b.id === selectedBranchId);

  const handleSelect = (agencyId: number, branchId: number) => {
    setSelectedAgencyId(agencyId);
    setSelectedBranchId(branchId);
  };

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3 flex-1">
        <button onClick={onMenuToggle} className="lg:hidden text-muted-foreground">
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search leads, students..."
            className="pl-9 bg-background border-border text-sm h-9"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        {/* Public Site Switch */}
        <Link
          to="/public"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <Globe className="w-3.5 h-3.5" />
          Public Site
        </Link>
        {/* Agency/Branch Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-foreground leading-tight">{selectedAgency?.name}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{selectedBranch?.name}</p>
              </div>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            {mockAgencies.map((agency) => (
              <div key={agency.id}>
                <DropdownMenuLabel className="text-xs font-semibold text-foreground">{agency.name}</DropdownMenuLabel>
                {agency.branches.map((branch) => (
                  <DropdownMenuItem
                    key={branch.id}
                    onClick={() => handleSelect(agency.id, branch.id)}
                    className={cn(
                      "flex items-center justify-between cursor-pointer",
                      selectedAgencyId === agency.id && selectedBranchId === branch.id && "bg-primary/10 text-primary"
                    )}
                  >
                    <div>
                      <p className="text-sm">{branch.name}</p>
                      <p className="text-[10px] text-muted-foreground">{branch.location}</p>
                    </div>
                    {selectedAgencyId === agency.id && selectedBranchId === branch.id && (
                      <span className="text-[10px] font-medium text-primary">Active</span>
                    )}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <button className="relative text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-destructive" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
            SM
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold">{COUNSELLOR_NAME}</p>
            <p className="text-[10px] text-muted-foreground">Counsellor</p>
          </div>
        </div>
      </div>
    </header>
  );
}
