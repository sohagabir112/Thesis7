import { Navbar } from "@/components/ui/navbar";
import { Footerdemo } from "@/components/ui/footer-section";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Shield, LayoutDashboard, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export function DashboardPage({ onBack }: { onBack: () => void }) {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">You are not logged in</h2>
        <Button onClick={onBack}>Return Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/10 text-foreground flex flex-col">
      <Navbar onNavigateToDashboard={() => {}} />

      <main className="flex-1 container mx-auto px-4 md:px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" onClick={onBack} aria-label="Go back">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sidebar / Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-1"
            >
              <div className="bg-card border shadow-sm rounded-2xl p-6">
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                  <User className="w-10 h-10" />
                </div>
                <h2 className="text-xl font-bold text-center mb-1">{user.name}</h2>
                <p className="text-sm text-muted-foreground text-center mb-6">Member</p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <span className="capitalize">{user.role || "User"}</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t">
                  <Button variant="destructive" className="w-full" onClick={() => { logout(); onBack(); }}>
                    Log out
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Main Content Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 space-y-6"
            >
              <div className="bg-card border shadow-sm rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <LayoutDashboard className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold">Recent Activity</h3>
                </div>
                <div className="text-center py-12 border-2 border-dashed rounded-xl bg-muted/50">
                  <p className="text-muted-foreground text-sm">
                    No recent activity to show. Book a band or buy an instrument!
                  </p>
                  <Button variant="secondary" className="mt-4" onClick={onBack}>
                    Explore Thesis7
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footerdemo />
    </div>
  );
}
