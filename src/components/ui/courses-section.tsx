import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiPost } from "@/lib/api";
import {
  CheckCircle2,
  MapPin,
  Phone,
  Star,
  MonitorPlay,
  Users,
  Gift,
  Music,
  BookOpen,
  Guitar,
  Send,
  X,
} from "lucide-react";

import instructorImg from "@/assets/instructor.png";

// Reusable easing curve — ease-out for entering elements
const EASE_OUT = [0.25, 0.46, 0.45, 0.94];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.45, delay, ease: EASE_OUT },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay, ease: EASE_OUT },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay, ease: EASE_OUT },
});

export function CoursesSection() {
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [enrollSubmitting, setEnrollSubmitting] = useState(false);
  const [enrollError, setEnrollError] = useState<string | null>(null);
  const quickStats = [
    { icon: <Guitar className="w-5 h-5 text-primary shrink-0" />, text: "Beginner to Advanced Training" },
    { icon: <Music className="w-5 h-5 text-primary shrink-0" />, text: "Bangla, Hindi & English Songs" },
    { icon: <MonitorPlay className="w-5 h-5 text-primary shrink-0" />, text: "Online & Offline Classes" },
    { icon: <Gift className="w-5 h-5 text-primary shrink-0" />, text: "First Class Free" },
    { icon: <Star className="w-5 h-5 text-primary shrink-0" />, text: "Practical Learning Approach" },
    { icon: <MapPin className="w-5 h-5 text-primary shrink-0" />, text: "Daudkandi, Cumilla & Online" },
  ];

  const whatYouWillLearn = [
    "Guitar fundamentals from beginner to advanced level",
    "Chords and strumming techniques",
    "Solo playing and melodies",
    "Popular Bangla, Hindi, and English songs",
    "Rhythm and timing practice",
    "Practical hands-on training",
    "Stage performance confidence",
  ];

  const featuresAndReasons = [
    "Step-by-step learning method suitable for all ages",
    "Easy, effective, and practical teaching style",
    "One-on-One Personalized Guidance",
    "Learn at your own pace with real songs",
    "Perfect for complete beginners",
  ];

  return (
    <section id="courses" className="py-20 md:py-28 bg-secondary/20 text-foreground overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">

        {/* ── Section Header ── */}
        <motion.div
          {...fadeUp(0)}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Learn Guitar the Easy Way
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Turn your dream of playing guitar into reality with professional lessons from{" "}
            <strong className="text-foreground">Mamun Malik</strong>.
          </p>
        </motion.div>

        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* ── Left: Instructor Image + Course Highlights ── */}
          <motion.div
            {...fadeLeft(0.05)}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Instructor photo — object-contain so full image is visible */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl bg-muted">
              <img
                src={instructorImg}
                alt="Mamun Malik - Professional Guitar Instructor"
                loading="lazy"
                className="w-full h-auto object-contain"
              />
              {/* Name overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 text-white">
                <h3 className="text-xl font-bold leading-tight">Mamun Malik</h3>
                <p className="text-white/75 text-sm mt-0.5">Professional Guitar Instructor</p>
              </div>
            </div>

            {/* Course Highlights card */}
            <motion.div
              {...fadeUp(0.15)}
              className="bg-card border rounded-2xl p-6 shadow-sm card-hover"
            >
              <h4 className="font-semibold text-base mb-4 border-b pb-2 text-foreground">
                Course Highlights
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-3">
                {quickStats.map((stat, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.3, ease: EASE_OUT }}
                    className="flex items-start gap-2.5 text-sm group"
                  >
                    <span className="mt-0.5 transition-transform duration-200 group-hover:scale-110">
                      {stat.icon}
                    </span>
                    <span className="text-muted-foreground leading-snug">{stat.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* ── Right: Details ── */}
          <motion.div
            {...fadeRight(0.1)}
            className="lg:col-span-7 flex flex-col gap-8"
          >
            {/* Location & Phone */}
            <div className="flex flex-col sm:flex-row gap-5 p-5 bg-primary/5 rounded-2xl border border-primary/10 hover:border-primary/20 hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-3 flex-1">
                <div className="p-2 rounded-lg bg-primary/10 mt-0.5 shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-0.5">Offline Classes Location</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Gouripur Bazar, Ali Tower, Daudkandi, Cumilla
                  </p>
                </div>
              </div>
              <div className="hidden sm:block w-px bg-border/60 self-stretch" />
              <div className="flex items-start gap-3 flex-1">
                <div className="p-2 rounded-lg bg-primary/10 mt-0.5 shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-0.5">Call / WhatsApp</h4>
                  <p className="text-muted-foreground text-sm tabular-nums">01889-581811</p>
                </div>
              </div>
            </div>

            {/* What You'll Learn + Why Choose Us */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* What You'll Learn */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-primary shrink-0" />
                  <h3 className="text-lg font-bold">What You'll Learn</h3>
                </div>
                <ul className="space-y-2.5">
                  {whatYouWillLearn.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.3, ease: EASE_OUT }}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm leading-snug">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Why Choose Us */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-primary shrink-0" />
                  <h3 className="text-lg font-bold">Why Choose Us?</h3>
                </div>
                <ul className="space-y-2.5">
                  {featuresAndReasons.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.05, duration: 0.3, ease: EASE_OUT }}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm leading-snug">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Learning Modes */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold mb-4">Available Learning Modes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: <Users className="w-6 h-6 text-primary" />,
                    title: "Offline Classes",
                    desc: "In-person classes at our Cumilla studio.",
                  },
                  {
                    icon: <MonitorPlay className="w-6 h-6 text-primary" />,
                    title: "Online Classes",
                    desc: "Available across Bangladesh and worldwide.",
                  },
                ].map((mode, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.35, ease: EASE_OUT }}
                    className="p-4 rounded-xl border bg-card tile-hover group"
                  >
                    <div className="mb-2 transition-transform duration-200 group-hover:scale-110 w-fit">
                      {mode.icon}
                    </div>
                    <h4 className="font-bold text-sm">{mode.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{mode.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* ── Free Trial CTA — in the right column ── */}
            <motion.div
              {...fadeUp(0.25)}
              className="bg-primary text-primary-foreground rounded-2xl p-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl relative overflow-hidden"
            >
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1.5">
                  <Gift className="w-6 h-6 text-yellow-300 animate-pulse" aria-hidden="true" />
                  <h3 className="text-xl font-extrabold tracking-tight">Free Trial Class</h3>
                </div>
                <p className="text-primary-foreground/85 text-sm leading-relaxed max-w-xs">
                  Your first guitar class is completely free. Experience the teaching style before making a commitment.
                </p>
              </div>
              <Button
                size="lg"
                variant="secondary"
                className="relative z-10 font-bold text-sm px-7 py-5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 shrink-0 w-full sm:w-auto"
                onClick={() => { setShowEnrollForm(true); setEnrollSuccess(false); setEnrollError(null); }}
              >
                Book Free Trial
              </Button>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Enrollment Modal */}
      <AnimatePresence>
        {showEnrollForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowEnrollForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="bg-background rounded-2xl p-6 md:p-8 w-full max-w-md border shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                onClick={() => setShowEnrollForm(false)}
              >
                <X className="w-5 h-5" />
              </button>

              {enrollSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Enrollment Submitted!</h3>
                  <p className="text-muted-foreground text-sm">We'll contact you soon to schedule your free trial class.</p>
                  <Button className="mt-6" onClick={() => setShowEnrollForm(false)}>Close</Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-1">Enroll for Free Trial</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Fill in your details and we'll schedule your first free guitar class.
                  </p>

                  {enrollError && (
                    <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-4">
                      {enrollError}
                    </div>
                  )}

                  <form
                    className="space-y-4"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setEnrollSubmitting(true);
                      setEnrollError(null);
                      const fd = new FormData(e.currentTarget);
                      try {
                        await apiPost("/enrollments", {
                          courseName: "Guitar — Free Trial",
                          name: fd.get("enrollName"),
                          phone: fd.get("enrollPhone"),
                          email: fd.get("enrollEmail"),
                          message: fd.get("enrollMessage"),
                        });
                        setEnrollSuccess(true);
                      } catch (err) {
                        setEnrollError(err instanceof Error ? err.message : "Failed to enroll");
                      } finally {
                        setEnrollSubmitting(false);
                      }
                    }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="enrollName">Full Name</Label>
                      <Input id="enrollName" name="enrollName" placeholder="John Doe" required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="enrollPhone">Phone</Label>
                        <Input id="enrollPhone" name="enrollPhone" type="tel" placeholder="01889-581811" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="enrollEmail">Email</Label>
                        <Input id="enrollEmail" name="enrollEmail" type="email" placeholder="john@example.com" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="enrollMessage">Message (optional)</Label>
                      <Textarea id="enrollMessage" name="enrollMessage" placeholder="Any questions or preferred schedule?" className="min-h-[80px]" />
                    </div>
                    <Button type="submit" className="w-full" size="lg" disabled={enrollSubmitting}>
                      {enrollSubmitting ? "Submitting..." : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Enrollment
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
