import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { ProductCard, products } from "@/components/ui/card";
import type { Product } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { Footerdemo } from "@/components/ui/footer-section";

interface ProductsPageProps {
  onBack: () => void;
  onBuyNow: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onViewCart: () => void;
}

export function ProductsPage({
  onBack,
  onBuyNow,
  onAddToCart,
  onViewCart,
}: ProductsPageProps) {
  const { cartItems } = useCart();

  const handleToggleWishlist = () => {};

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

      <div className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            All Products
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our complete collection of premium instruments, gear, and accessories. Find the perfect fit for your musical journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch mb-20">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onAddToCart={() => onAddToCart(product)}
              onBuyNow={() => onBuyNow(product)}
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
        </div>
      </div>
      
      <Footerdemo />
    </div>
  );
}
