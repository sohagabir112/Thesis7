import { motion } from "framer-motion";
import { Lightbulb, ShieldCheck, ThumbsUp, DollarSign } from "lucide-react";

export function BuyingGuideSection() {
  const tips = [
    {
      icon: <DollarSign className="w-6 h-6 text-primary" />,
      title: "Set a Realistic Budget",
      desc: "Beginner instruments don't have to be expensive, but avoid 'toy' models. A solid entry-level guitar or keyboard will stay in tune and play easier.",
    },
    {
      icon: <ThumbsUp className="w-6 h-6 text-primary" />,
      title: "Comfort & Size",
      desc: "For guitars, acoustic sizes (like 3/4 or 4/4) matter depending on your age and height. An electric might be easier on beginner fingers.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "Check Quality & Action",
      desc: "Look for smooth fret edges, sturdy tuning pegs, and low 'action' (the distance from the strings to the fretboard).",
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-primary" />,
      title: "Consult an Expert",
      desc: "Not sure what to buy? Our instructors can guide you to pick the right instrument for your learning goals.",
    },
  ];

  return (
    <section className="bg-primary/5 border border-primary/10 rounded-3xl p-6 md:p-10 mb-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
          Buying Your First Musical Instrument?
        </h2>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          Starting your musical journey is exciting! Here are some essential tips to help you choose an instrument that will inspire you to keep practicing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="flex items-start gap-4 bg-background rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="bg-primary/10 p-3 rounded-xl shrink-0">
              {tip.icon}
            </div>
            <div>
              <h3 className="font-bold mb-1.5">{tip.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
