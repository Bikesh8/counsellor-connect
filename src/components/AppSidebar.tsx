import { useState } from "react";
import { LayoutDashboard, Users, Kanban, CheckSquare, GraduationCap, ChevronLeft, User, Settings, CalendarDays } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Leads", url: "/leads", icon: Users },
  { title: "Pipeline", url: "/pipeline", icon: Kanban },
  { title: "Tasks", url: "/tasks", icon: CheckSquare },
  { title: "Calendar", url: "/calendar", icon: CalendarDays },
];

const managementItems = [
  { title: "Students", url: "/students", icon: GraduationCap },
];

const accountItems = [
  { title: "My Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const location = useLocation();
  const [calDate, setCalDate] = useState<Date | undefined>(new Date());

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const linkClass = (path: string) => {
    const active = isActive(path);
    return `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      active
        ? "bg-sidebar-primary text-sidebar-primary-foreground"
        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    }`;
  };

  const renderSection = (label: string, items: typeof mainItems) => (
    <div>
      {!collapsed && <p className="text-[10px] uppercase tracking-wider text-sidebar-foreground mb-2 px-3">{label}</p>}
      <div className="space-y-1">
        {items.map((item) => (
          <NavLink key={item.url} to={item.url} end={item.url === "/"} className={linkClass(item.url)} activeClassName="">
            <item.icon className="w-4 h-4 shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </div>
    </div>
  );

  return (
    <aside className={`fixed top-0 left-0 h-screen bg-sidebar flex flex-col transition-all duration-300 z-50 ${collapsed ? "w-16" : "w-56"}`}>
      <div className="flex items-center justify-between px-4 h-16 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-sm font-bold text-sidebar-accent-foreground">EduCRM</h1>
              <p className="text-[10px] text-sidebar-foreground">Study Abroad</p>
            </div>
          )}
        </div>
        <button onClick={onToggle} className="text-sidebar-foreground hover:text-sidebar-accent-foreground">
          <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {renderSection("Main", mainItems)}
        {renderSection("Management", managementItems)}
        {renderSection("Account", accountItems)}

      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-xs font-bold text-sidebar-primary-foreground">SM</div>
          {!collapsed && (
            <div>
              <p className="text-xs font-semibold text-sidebar-accent-foreground">Sarah Mitchell</p>
              <p className="text-[10px] text-sidebar-foreground">Counsellor</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
