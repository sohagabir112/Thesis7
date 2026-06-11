import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Send, Clock } from "lucide-react";
import { apiPost } from "@/lib/api";

export function ContactSection() {
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
      await apiPost("/contacts", {
        name: formData.get("name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      });
      setIsSuccess(true);
      form.reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-background text-foreground relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            Have questions about our courses, instruments, or band services? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-6 lg:col-span-7"
          >
            {[
              {
                icon: <MapPin className="w-6 h-6 text-primary" />,
                title: "Visit Us",
                content: (
                  <address className="not-italic text-muted-foreground text-sm leading-relaxed">
                    Thesis7, Ali Tower, Gouripur Bazar<br />
                    Daudkandi, Cumilla, Bangladesh 3519
                  </address>
                ),
                delay: 0.1,
              },
              {
                icon: <Phone className="w-6 h-6 text-primary" />,
                title: "Call Us",
                content: (
                  <>
                    <p className="text-muted-foreground text-sm tabular-nums">01889-581811</p>
                    <p className="text-xs text-muted-foreground/70 mt-0.5">Available during business hours</p>
                  </>
                ),
                delay: 0.17,
              },
              {
                icon: <Mail className="w-6 h-6 text-primary" />,
                title: "Email Us",
                content: (
                  <>
                    <p className="text-muted-foreground text-sm">monirulislam738833@gmail.com</p>
                    <p className="text-xs text-muted-foreground/70 mt-0.5">We'll reply within 24 hours</p>
                  </>
                ),
                delay: 0.24,
              },
              {
                icon: <Clock className="w-6 h-6 text-primary" />,
                title: "Business Hours",
                content: (
                  <>
                    <p className="text-muted-foreground text-sm">Sat – Thu: 10:00 AM – 8:00 PM</p>
                    <p className="text-muted-foreground text-sm">Friday: Closed</p>
                  </>
                ),
                delay: 0.31,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex items-start gap-4 group"
              >
                <div className="bg-primary/10 p-3 rounded-xl shrink-0 transition-all duration-200 group-hover:bg-primary/20 group-hover:scale-110">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                  {item.content}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl p-6 md:p-8 border shadow-lg hover:shadow-2xl hover:border-primary/20 transition-all duration-300 transform hover:scale-[1.01] relative overflow-hidden lg:col-span-5 w-full max-w-md mx-auto lg:ml-auto lg:mr-0"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />

            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

            {isSuccess ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-4">
                  <Send className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                <p className="text-muted-foreground">Thank you for reaching out. We will get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Full Name</Label>
                  <Input id="contact-name" name="name" placeholder="John Doe" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone Number</Label>
                    <Input id="contact-phone" name="phone" type="tel" placeholder="01889-581811" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email Address</Label>
                    <Input id="contact-email" name="email" type="email" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="How can we help you?" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" placeholder="Type your message here..." className="min-h-[120px]" required />
                </div>

                {errorMsg && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                    {errorMsg}
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
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
