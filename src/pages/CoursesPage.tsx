import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Footerdemo } from "@/components/ui/footer-section";
import { CoursesSection } from "@/components/ui/courses-section";

interface CoursesPageProps {
  onBack: () => void;
  onViewCart: () => void;
}

export function CoursesPage({
  onBack,
  onViewCart,
}: CoursesPageProps) {
  const { cartItems } = useCart();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
            onClick={onViewCart}
          >
            <ShoppingCart className="w-5 h-5 text-primary" />
            {cartItems.length > 0 && (
              <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <CoursesSection />
      </div>
      
      <Footerdemo />
    </div>
  );
}
