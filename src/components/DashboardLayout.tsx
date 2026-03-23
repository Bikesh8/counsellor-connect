import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { TopNavbar } from "./TopNavbar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-foreground/30 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar - hidden on mobile unless open */}
      <div className={`lg:block ${mobileOpen ? "block" : "hidden"}`}>
        <AppSidebar collapsed={collapsed} onToggle={() => {
          setCollapsed(!collapsed);
          setMobileOpen(false);
        }} />
      </div>

      {/* Main */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? "lg:ml-16" : "lg:ml-56"}`}>
        <TopNavbar onMenuToggle={() => setMobileOpen(!mobileOpen)} />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
