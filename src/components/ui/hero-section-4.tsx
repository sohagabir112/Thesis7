// components/ui/hero-section-4.tsx

import * as React from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

// Props interface for type safety
interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonHref?: string;
  onPrimaryButtonClick?: () => void;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  tertiaryButtonText?: string;
  tertiaryButtonHref?: string;
  imageUrl: string;
}

// Animation variants for the container to orchestrate staggered animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Ease-out cubic for entering elements
const itemVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      title,
      subtitle,
      primaryButtonText,
      primaryButtonHref,
      onPrimaryButtonClick,
      secondaryButtonText,
      secondaryButtonHref,
      tertiaryButtonText,
      tertiaryButtonHref,
      imageUrl,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative flex h-[100svh] min-h-[500px] md:min-h-[700px] w-full items-center overflow-hidden",
          className
        )}
        {...props}
      >
              {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-black"
          aria-hidden="true"
        >
          <img
            src={imageUrl}
            alt="Hero background"
            className="w-full h-full object-contain md:object-cover object-center"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-black/50 dark:bg-black/65" aria-hidden="true" />

        {/* Content Container */}
        <div className="container mx-auto relative z-20 px-4 md:px-6 min-h-[300px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={title}
              className="flex max-w-4xl flex-col items-start text-left text-white drop-shadow-2xl w-full"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            >
          {/* Animated Title */}
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]"
            variants={itemVariants}
          >
            {title}
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.p
            className="mt-5 max-w-2xl text-base leading-7 md:text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] font-medium text-white/90"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>

          {/* Animated Button Group */}
          <motion.div className="mt-8 flex flex-wrap items-center justify-start gap-4" variants={itemVariants}>
            <Button
              asChild={!!primaryButtonHref}
              size="lg"
              className="text-base md:text-lg px-8 py-6 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
              onClick={(e) => {
                if (onPrimaryButtonClick) {
                  e.preventDefault();
                  onPrimaryButtonClick();
                }
              }}
            >
              {primaryButtonHref ? (
                <a href={primaryButtonHref}>{primaryButtonText}</a>
              ) : (
                primaryButtonText
              )}
            </Button>
            {secondaryButtonText && secondaryButtonHref && (
              <Button asChild variant="secondary" size="lg" className="rounded-full">
                <a href={secondaryButtonHref}>{secondaryButtonText}</a>
              </Button>
            )}
            {tertiaryButtonText && tertiaryButtonHref && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full bg-background/20 text-white hover:bg-background/40 hover:text-white border-white/50"
              >
                <a href={tertiaryButtonHref}>{tertiaryButtonText}</a>
              </Button>
            )}
          </motion.div>
          </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll-down indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/70"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          aria-hidden="true"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };
