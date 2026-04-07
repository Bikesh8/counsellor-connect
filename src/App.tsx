import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CompareProvider } from "@/contexts/CompareContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PublicLayout } from "@/components/public/PublicLayout";
import DashboardPage from "./pages/DashboardPage";
import LeadsPage from "./pages/LeadsPage";
import LeadProfilePage from "./pages/LeadProfilePage";
import PipelinePage from "./pages/PipelinePage";
import TasksPage from "./pages/TasksPage";
import StudentsPage from "./pages/StudentsPage";
import StudentProfilePage from "./pages/StudentProfilePage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import CalendarPage from "./pages/CalendarPage";
import NotFound from "./pages/NotFound";
import PublicHomePage from "./pages/public/PublicHomePage";
import UniversityListingPage from "./pages/public/UniversityListingPage";
import UniversityDetailPage from "./pages/public/UniversityDetailPage";
import CompareUniversitiesPage from "./pages/public/CompareUniversitiesPage";
import CompareProgramsPage from "./pages/public/CompareProgramsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CompareProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* CRM Dashboard */}
            <Route path="/" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
            <Route path="/leads" element={<DashboardLayout><LeadsPage /></DashboardLayout>} />
            <Route path="/leads/:id" element={<DashboardLayout><LeadProfilePage /></DashboardLayout>} />
            <Route path="/pipeline" element={<DashboardLayout><PipelinePage /></DashboardLayout>} />
            <Route path="/tasks" element={<DashboardLayout><TasksPage /></DashboardLayout>} />
            <Route path="/calendar" element={<DashboardLayout><CalendarPage /></DashboardLayout>} />
            <Route path="/students" element={<DashboardLayout><StudentsPage /></DashboardLayout>} />
            <Route path="/students/:id" element={<DashboardLayout><StudentProfilePage /></DashboardLayout>} />
            <Route path="/profile" element={<DashboardLayout><ProfilePage /></DashboardLayout>} />
            <Route path="/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />

            {/* Public Site */}
            <Route path="/public" element={<PublicLayout><PublicHomePage /></PublicLayout>} />
            <Route path="/public/universities" element={<PublicLayout><UniversityListingPage /></PublicLayout>} />
            <Route path="/public/universities/:id" element={<PublicLayout><UniversityDetailPage /></PublicLayout>} />
            <Route path="/public/compare/universities" element={<PublicLayout><CompareUniversitiesPage /></PublicLayout>} />
            <Route path="/public/compare/programs" element={<PublicLayout><CompareProgramsPage /></PublicLayout>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CompareProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
