import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import logoImage from "@/assets/logo.jpg";
import { toast } from "sonner";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Courses", href: "#courses" },
  { name: "Shop", href: "#shop" },
  { name: "Band Booking", href: "#book-band" },
  { name: "Contact", href: "#contact" },
];

type AuthMode = "login" | "signup" | null;

export function Navbar({ onNavigateToDashboard }: { onNavigateToDashboard?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#");
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, isAuthenticated, login, signup, logout, error, clearError } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Highlight active nav link based on scroll position
      const sections = navLinks
        .filter((l) => l.href !== "#")
        .map((l) => document.querySelector(l.href));

      let current = "#";
      sections.forEach((section) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100) current = `#${section.id}`;
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /** Smooth scroll with navbar offset */
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("#");
      return;
    }
    const target = document.querySelector(href);
    if (!target) return;
    const navbarHeight = 80;
    const top =
      target.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    clearError();
    setFormData({ name: "", email: "", password: "", phone: "" });
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (authMode === "signup") {
        await signup(formData.name, formData.email, formData.password, formData.phone);
        toast.success("Account created successfully!");
      } else {
        await login(formData.email, formData.password);
        toast.success("Logged in successfully!");
      }
      setAuthMode(null);
      if (onNavigateToDashboard) {
        onNavigateToDashboard();
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-background/85 backdrop-blur-md border-border shadow-sm py-3"
            : "bg-transparent border-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "#")}
            className="flex items-center gap-2 cursor-pointer"
            aria-label="Thesis7 Home"
          >
            <img src={logoImage} alt="Thesis7 Logo" className="h-16 w-auto rounded-md" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer inline-block ${
                        isActive
                          ? "text-primary"
                          : "text-foreground/70 hover:text-foreground"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.name}
                      {/* Animated active underline indicator */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-indicator"
                          className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-3 border-l pl-6 border-border/50">
              {isAuthenticated ? (
                <>
                  <span className="text-sm font-medium text-foreground/80 flex items-center gap-1.5 cursor-pointer hover:text-primary transition-colors" onClick={() => onNavigateToDashboard?.()}>
                    <User className="w-4 h-4" />
                    {user?.name}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm font-medium gap-1.5"
                    onClick={() => onNavigateToDashboard?.()}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Dashboard
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-sm font-medium gap-1.5"
                    onClick={logout}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-sm font-medium bg-background/50 hover:bg-background/80 backdrop-blur-sm"
                    onClick={() => openAuth("login")}
                  >
                    Log in
                  </Button>
                  <Button size="sm" className="text-sm font-medium" onClick={() => openAuth("signup")}>
                    Sign up
                  </Button>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground bg-background/50 backdrop-blur-sm rounded-md cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:hidden bg-background border-b border-border overflow-hidden shadow-lg"
            >
              <nav
                className="container mx-auto px-4 py-4 flex flex-col gap-4"
                aria-label="Mobile navigation"
              >
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`block px-3 py-2.5 text-base font-medium rounded-md transition-colors duration-150 cursor-pointer ${
                          activeSection === link.href
                            ? "text-primary bg-primary/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                        }`}
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <div className="flex flex-col gap-2 pt-3 border-t border-border">
                  {isAuthenticated ? (
                    <>
                      <p className="text-sm text-center text-muted-foreground">
                        Signed in as <strong>{user?.name}</strong>
                      </p>
                      <Button variant="outline" className="w-full justify-center gap-1.5" onClick={() => { setIsMobileMenuOpen(false); onNavigateToDashboard?.(); }}>
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        Dashboard
                      </Button>
                      <Button variant="outline" className="w-full justify-center gap-1.5" onClick={() => { setIsMobileMenuOpen(false); logout(); }}>
                        <LogOut className="w-3.5 h-3.5" />
                        Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full justify-center"
                        onClick={() => { setIsMobileMenuOpen(false); openAuth("login"); }}
                      >
                        Log in
                      </Button>
                      <Button
                        className="w-full justify-center"
                        onClick={() => { setIsMobileMenuOpen(false); openAuth("signup"); }}
                      >
                        Sign up
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Auth Modal */}
      <AnimatePresence>
        {authMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setAuthMode(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="bg-background rounded-2xl p-6 md:p-8 w-full max-w-md border shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-1">
                {authMode === "login" ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {authMode === "login"
                  ? "Sign in to your Thesis7 account"
                  : "Join Thesis7 to book, shop, and learn"}
              </p>

              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="auth-name">Full Name</Label>
                    <Input
                      id="auth-name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="auth-email">Email</Label>
                  <Input
                    id="auth-email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="auth-password">Password</Label>
                  <Input
                    id="auth-password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
                    required
                    minLength={6}
                  />
                </div>

                {authMode === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="auth-phone">Phone (optional)</Label>
                    <Input
                      id="auth-phone"
                      type="tel"
                      placeholder="01889-581811"
                      value={formData.phone}
                      onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    />
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting
                    ? "Please wait..."
                    : authMode === "login"
                      ? "Log In"
                      : "Create Account"}
                </Button>
              </form>

              <p className="text-sm text-muted-foreground text-center mt-5">
                {authMode === "login" ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      className="text-primary font-medium hover:underline cursor-pointer"
                      onClick={() => openAuth("signup")}
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      className="text-primary font-medium hover:underline cursor-pointer"
                      onClick={() => openAuth("login")}
                    >
                      Log in
                    </button>
                  </>
                )}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
