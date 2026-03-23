import { COUNSELLOR_NAME, COUNSELLOR_INITIALS } from "@/data/mockData";
import { Mail, Phone, MapPin, Building, Calendar } from "lucide-react";

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-1">My Profile</h1>
      <p className="text-sm text-muted-foreground mb-6">Your account information</p>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-xl font-bold text-primary-foreground">
                {COUNSELLOR_INITIALS}
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">{COUNSELLOR_NAME}</h2>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">Counsellor</span>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3 text-sm">
                <p className="flex items-center gap-2 text-muted-foreground"><Mail className="w-4 h-4" /> sarah.mitchell@educrm.com</p>
                <p className="flex items-center gap-2 text-muted-foreground"><Phone className="w-4 h-4" /> +1 555-0199</p>
                <p className="flex items-center gap-2 text-muted-foreground"><MapPin className="w-4 h-4" /> Main Branch</p>
              </div>
              <div className="space-y-3 text-sm">
                <p className="flex items-center gap-2 text-muted-foreground"><Building className="w-4 h-4" /> EduCRM Study Abroad</p>
                <p className="flex items-center gap-2 text-muted-foreground"><Calendar className="w-4 h-4" /> Joined: Sep 2023</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="font-semibold text-foreground mb-4">Quick Stats</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Total Leads</span><span className="font-bold text-foreground">10</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Converted</span><span className="font-bold text-badge-low">1</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Active Tasks</span><span className="font-bold text-foreground">7</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Conversion Rate</span><span className="font-bold text-foreground">10%</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
