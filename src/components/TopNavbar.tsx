import { Search, Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { COUNSELLOR_NAME } from "@/data/mockData";

interface TopNavbarProps {
  onMenuToggle: () => void;
}

export function TopNavbar({ onMenuToggle }: TopNavbarProps) {
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
      <div className="flex items-center gap-4">
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
