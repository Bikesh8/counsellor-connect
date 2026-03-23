import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Bell, Moon, Globe, Shield } from "lucide-react";

export default function SettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [overdueAlerts, setOverdueAlerts] = useState(true);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-1">Settings</h1>
      <p className="text-sm text-muted-foreground mb-6">Manage your preferences</p>

      <div className="max-w-2xl space-y-6">
        {/* Notifications */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="font-semibold text-foreground flex items-center gap-2 mb-4"><Bell className="w-4 h-4" /> Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-foreground">Email Notifications</p><p className="text-xs text-muted-foreground">Receive email updates for new leads and tasks</p></div>
              <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
            </div>
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-foreground">Push Notifications</p><p className="text-xs text-muted-foreground">Browser push notifications for urgent items</p></div>
              <Switch checked={pushNotif} onCheckedChange={setPushNotif} />
            </div>
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-foreground">Overdue Alerts</p><p className="text-xs text-muted-foreground">Get alerted when follow-ups are overdue</p></div>
              <Switch checked={overdueAlerts} onCheckedChange={setOverdueAlerts} />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="font-semibold text-foreground flex items-center gap-2 mb-4"><Moon className="w-4 h-4" /> Appearance</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Theme</p>
              <p className="text-xs text-muted-foreground mb-2">Select your preferred theme</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Light</Button>
                <Button variant="outline" size="sm">Dark</Button>
                <Button variant="secondary" size="sm">System</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Account */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="font-semibold text-foreground flex items-center gap-2 mb-4"><Shield className="w-4 h-4" /> Account</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Change Password</p>
              <div className="space-y-2 max-w-sm">
                <Input type="password" placeholder="Current password" className="h-9" />
                <Input type="password" placeholder="New password" className="h-9" />
                <Input type="password" placeholder="Confirm new password" className="h-9" />
              </div>
              <Button size="sm" className="mt-3">Update Password</Button>
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="font-semibold text-foreground flex items-center gap-2 mb-4"><Globe className="w-4 h-4" /> Language & Region</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Language</span><span className="font-medium text-foreground">English</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Timezone</span><span className="font-medium text-foreground">UTC-5 (Eastern)</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Date Format</span><span className="font-medium text-foreground">MMM DD, YYYY</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
