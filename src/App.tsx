import { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/ui/hero-section-4";
import { Toaster } from "sonner";
import { Footerdemo } from "@/components/ui/footer-section";
import ProductCardDemo from "@/components/ui/card";
import type { Product } from "@/components/ui/card";
import { CoursesSection } from "@/components/ui/courses-section";
import { BandBookingSection } from "@/components/ui/band-booking-section";
import { ContactSection } from "@/components/ui/contact-section";
import { CartProvider, useCart } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { BuyPage } from "@/pages/BuyPage";
import { CartPage } from "@/pages/CartPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { CoursesPage } from "@/pages/CoursesPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import heroImage from "@/assets/hero section.png";

type Page = "home" | "buy" | "cart" | "products" | "courses" | "dashboard";

// ── Cart icon badge floating in top-right ──────────────────────────────────
function CartBadge({ onClick }: { onClick: () => void }) {
  const { cartCount } = useCart();
  if (cartCount === 0) return null;
  return (
    <AnimatePresence>
      <motion.button
        key="cart-badge"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        onClick={onClick}
        className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-xl cursor-pointer"
        aria-label={`View cart — ${cartCount} items`}
      >
        <ShoppingCart className="w-6 h-6" />
        <span className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center tabular-nums">
          {cartCount}
        </span>
      </motion.button>
    </AnimatePresence>
  );
}

// ── Main Home Page ─────────────────────────────────────────────────────────

const heroSlides = [
  {
    title: "Book the Ultimate Concert Experience",
    subtitle: "Elevate your next event with Thesis7's professional band. We bring the energy, the sound, and the unforgettable moments to your concert, festival, or corporate event.",
    primaryButtonText: "Book Our Band",
    action: "band",
  },
  {
    title: "Master Your Musical Journey",
    subtitle: "Expert guitar lessons, pro-level courses, and personalized coaching to help you own your sound. Start your learning journey today.",
    primaryButtonText: "Explore Courses",
    action: "courses",
  },
  {
    title: "Find Your Perfect Instrument",
    subtitle: "Browse our premium selection of guitars, keyboards, drums, and accessories. Start playing with the best gear today.",
    primaryButtonText: "Shop Instruments",
    action: "shop",
  }
];

function HomePage({
  onBuyNow,
  onViewCart,
  onAddToCart,
  onViewAllProducts,
  onViewCourses,
  onNavigateToDashboard,
}: {
  onBuyNow: (product: Product) => void;
  onViewCart: () => void;
  onAddToCart: (product: Product) => void;
  onViewAllProducts: () => void;
  onViewCourses: () => void;
  onNavigateToDashboard: () => void;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrimaryClick = () => {
    const action = heroSlides[currentSlide].action;
    if (action === "courses") {
      onViewCourses();
    } else if (action === "shop") {
      onViewAllProducts();
    } else {
      document.getElementById('book-band')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onNavigateToDashboard={onNavigateToDashboard} />
      <HeroSection
        title={heroSlides[currentSlide].title}
        subtitle={heroSlides[currentSlide].subtitle}
        primaryButtonText={heroSlides[currentSlide].primaryButtonText}
        onPrimaryButtonClick={handlePrimaryClick}
        imageUrl={heroImage}
      />

      <CoursesSection />

      {/* Featured Instruments Shop */}
      <section id="shop" className="w-full">
        <ProductCardDemo onBuyNow={onBuyNow} onAddToCart={onAddToCart} onViewAllProducts={onViewAllProducts} />
      </section>

      <BandBookingSection />
      <ContactSection />
      <Footerdemo />

      {/* Floating cart button */}
      <CartBadge onClick={onViewCart} />
    </div>
  );
}

// ── App (with CartProvider + page router) ──────────────────────────────────
function AppContent() {
  const [page, setPage] = useState<Page>("home");
  const [buyProduct, setBuyProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  const handleBuyNow = (product: Product) => {
    setBuyProduct(product);
    setPage("buy");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleViewCart = () => {
    setPage("cart");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleBack = () => {
    setPage("home");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleViewAllProducts = () => {
    setPage("products");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleViewCourses = () => {
    setPage("courses");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleNavigateToDashboard = () => {
    setPage("dashboard");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  if (page === "buy" && buyProduct) {
    return <BuyPage product={buyProduct} onBack={handleBack} />;
  }

  if (page === "cart") {
    return (
      <CartPage
        onBack={handleBack}
        onBuyNow={(product) => {
          setBuyProduct(product);
          setPage("buy");
          window.scrollTo({ top: 0, behavior: "instant" });
        }}
      />
    );
  }

  if (page === "products") {
    return (
      <ProductsPage
        onBack={handleBack}
        onBuyNow={handleBuyNow}
        onAddToCart={handleAddToCart}
        onViewCart={handleViewCart}
      />
    );
  }

  if (page === "courses") {
    return (
      <CoursesPage
        onBack={handleBack}
        onViewCart={handleViewCart}
      />
    );
  }

  if (page === "dashboard") {
    return <DashboardPage onBack={handleBack} />;
  }

  return (
    <HomePage
      onBuyNow={handleBuyNow}
      onViewCart={handleViewCart}
      onAddToCart={handleAddToCart}
      onViewAllProducts={handleViewAllProducts}
      onViewCourses={handleViewCourses}
      onNavigateToDashboard={handleNavigateToDashboard}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
        <Toaster position="bottom-right" richColors />
      </CartProvider>
    </AuthProvider>
  );
}
