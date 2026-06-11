import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin, Music, Send } from "lucide-react";
import { apiPost } from "@/lib/api";

export function BandBookingSection() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await apiPost("/bookings", {
        name: formData.get("name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        eventType: formData.get("eventType"),
        eventDate: formData.get("eventDate"),
        location: formData.get("location"),
        notes: formData.get("notes"),
      });
      setIsSuccess(true);
      form.reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book-band" className="py-20 md:py-28 bg-secondary/30 text-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
              Book the Thesis7 Band
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Elevate your event with live music. Whether it's a wedding, corporate event, college fest, or private party, the Thesis7 band is ready to bring the energy and own the sound.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: <Music className="w-6 h-6 text-primary" />,
                  title: "Versatile Repertoire",
                  desc: "From soothing acoustic sets to high-energy rock performances, we tailor our music to your event's vibe.",
                  delay: 0.15,
                },
                {
                  icon: <Calendar className="w-6 h-6 text-primary" />,
                  title: "Flexible Scheduling",
                  desc: "We work around your event timeline to ensure seamless setup, soundcheck, and performance.",
                  delay: 0.22,
                },
                {
                  icon: <MapPin className="w-6 h-6 text-primary" />,
                  title: "We Travel to You",
                  desc: "Based in Gouripur Bazar, Cumilla, we are available to travel to venues across the country.",
                  delay: 0.29,
                },
              ].map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: feat.delay, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="flex items-start gap-4 group"
                >
                  <div className="bg-primary/10 p-3 rounded-xl mt-0.5 shrink-0 transition-all duration-200 group-hover:bg-primary/20 group-hover:scale-110">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-bold mb-1">{feat.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-background rounded-3xl p-6 md:p-8 border shadow-xl hover:shadow-2xl hover:border-primary/20 transition-all duration-300 transform hover:scale-[1.01] lg:col-span-5 w-full max-w-md mx-auto lg:ml-auto lg:mr-0"
          >
            <h3 className="text-2xl font-bold mb-6">Request a Booking</h3>
            
            {isSuccess ? (
              <div className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 p-6 rounded-xl text-center">
                <Music className="w-12 h-12 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">Request Sent Successfully!</h4>
                <p>We've received your booking request and will contact you shortly to confirm the details.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="01889-581811" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventType">Event Type</Label>
                    <Input id="eventType" name="eventType" placeholder="e.g. Wedding, Concert" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Event Date</Label>
                    <Input id="eventDate" name="eventDate" type="date" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location / Venue</Label>
                  <Input id="location" name="location" placeholder="City, Venue Name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" name="notes" placeholder="Tell us about the vibe you want, specific songs, etc." className="min-h-[100px]" />
                </div>

                {errorMsg && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                    {errorMsg}
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Booking Request
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
