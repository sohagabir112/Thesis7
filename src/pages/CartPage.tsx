import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { apiPost } from "@/lib/api";
import type { Product } from "@/components/ui/card";
import {
  ArrowLeft,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Package,
  CheckCircle2,
  ShoppingBag,
  Truck,
  Phone,
} from "lucide-react";

interface CartPageProps {
  onBack: () => void;
  onBuyNow: (product: Product) => void;
}

export function CartPage({ onBack, onBuyNow }: CartPageProps) {
  const { cartItems, removeFromCart, updateQty, clearCart, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const [checkedOut, setCheckedOut] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const shipping = cartItems.length > 0 ? 80 : 0;
  const total = cartTotal + shipping;

  if (checkedOut) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-md w-full text-center bg-card border rounded-3xl p-10 shadow-2xl"
        >
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-extrabold mb-2">Order Placed! 🎉</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Your cart order of <strong>{cartItems.length} item(s)</strong> totalling{" "}
            <strong>৳{total.toLocaleString()}</strong> has been placed. We'll call you shortly to confirm delivery.
          </p>
          <Button
            onClick={() => {
              clearCart();
              onBack();
            }}
            className="w-full rounded-full"
            size="lg"
          >
            Continue Shopping
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-3 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </button>
          <span className="text-border">|</span>
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-primary" />
            <h1 className="text-base font-bold">My Cart</h1>
            {cartItems.length > 0 && (
              <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 max-w-5xl">

        {cartItems.length === 0 ? (
          /* ── Empty State ── */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[50vh] text-center"
          >
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Looks like you haven't added any instruments yet. Browse our collection and find your perfect match!
            </p>
            <Button onClick={onBack} size="lg" className="rounded-full px-8">
              Browse Instruments
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── Cart Items (left) ── */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-lg">
                  {cartItems.length} Item{cartItems.length > 1 ? "s" : ""} in Cart
                </h2>
                <button
                  onClick={clearCart}
                  className="text-sm text-destructive hover:text-destructive/80 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
              </div>

              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => {
                  const itemPrice = item.product.salePrice ?? item.product.price;
                  return (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -40, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="bg-card border rounded-2xl p-4 flex gap-4 shadow-sm"
                    >
                      {/* Product Image */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 rounded-xl object-cover border shrink-0"
                      />

                      {/* Details */}
                      <div className="flex-grow min-w-0">
                        <p className="text-xs text-primary/70 uppercase tracking-wider font-semibold mb-0.5">
                          {item.product.category}
                        </p>
                        <h3 className="font-bold text-sm leading-snug mb-1 line-clamp-2">
                          {item.product.name}
                        </h3>
                        <div className="flex items-baseline gap-2">
                          <span className="font-extrabold tabular-nums">
                            ৳{itemPrice.toLocaleString()}
                          </span>
                          {item.product.salePrice && (
                            <span className="text-xs line-through text-muted-foreground tabular-nums">
                              ৳{item.product.price.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right controls */}
                      <div className="flex flex-col items-end justify-between shrink-0 gap-3">
                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        {/* Qty controls */}
                        <div className="flex items-center gap-2 bg-secondary rounded-full px-1">
                          <button
                            onClick={() => updateQty(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-background transition-colors cursor-pointer disabled:opacity-40"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-bold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-background transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Line total */}
                        <span className="text-sm font-bold tabular-nums text-primary">
                          ৳{(itemPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Buy individual items */}
              <div className="pt-2">
                <p className="text-xs text-muted-foreground mb-3">
                  Want to order a single item with its own delivery details?
                </p>
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground line-clamp-1 max-w-[200px]">{item.product.name}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs rounded-full px-3"
                        onClick={() => onBuyNow(item.product)}
                      >
                        Buy Now
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Order Summary (right) ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="bg-card border rounded-2xl p-5 shadow-sm sticky top-20 space-y-4">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  <h2 className="font-bold text-base">Order Summary</h2>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>
                      Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)
                    </span>
                    <span className="tabular-nums">৳{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="tabular-nums">৳{shipping}</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-base border-t pt-3 mt-1">
                    <span>Total</span>
                    <span className="tabular-nums text-primary">৳{total.toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full rounded-full font-bold"
                  onClick={() => {
                    if (!isAuthenticated) {
                      setOrderError("Please log in or sign up first to place an order.");
                      return;
                    }
                    setShowCheckoutForm(true);
                    setOrderError(null);
                  }}
                >
                  <Truck className="w-4 h-4 mr-2" />
                  Proceed to Checkout
                </Button>

                {orderError && (
                  <div className="bg-destructive/10 text-destructive text-xs p-2.5 rounded-lg">
                    {orderError}
                  </div>
                )}

                {showCheckoutForm && (
                  <form
                    className="space-y-3 border-t pt-4"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsSubmitting(true);
                      setOrderError(null);
                      const fd = new FormData(e.currentTarget);
                      try {
                        await apiPost("/orders", {
                          customerName: fd.get("customerName"),
                          customerPhone: fd.get("customerPhone"),
                          customerEmail: fd.get("customerEmail"),
                          shippingAddress: fd.get("shippingAddress"),
                          items: cartItems.map((i) => ({
                            productId: i.product.id,
                            name: i.product.name,
                            price: i.product.salePrice ?? i.product.price,
                            quantity: i.quantity,
                          })),
                          total,
                        });
                        setCheckedOut(true);
                      } catch (err) {
                        setOrderError(err instanceof Error ? err.message : "Order failed");
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                  >
                    <div className="space-y-1.5">
                      <Label htmlFor="customerName" className="text-xs">Full Name</Label>
                      <Input id="customerName" name="customerName" placeholder="John Doe" required className="h-9 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="customerPhone" className="text-xs">Phone</Label>
                      <Input id="customerPhone" name="customerPhone" type="tel" placeholder="01889-581811" required className="h-9 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="customerEmail" className="text-xs">Email</Label>
                      <Input id="customerEmail" name="customerEmail" type="email" placeholder="john@example.com" required className="h-9 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="shippingAddress" className="text-xs">Shipping Address</Label>
                      <Input id="shippingAddress" name="shippingAddress" placeholder="Full address" required className="h-9 text-sm" />
                    </div>
                    <Button type="submit" className="w-full rounded-full font-bold" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? "Placing Order..." : "Confirm & Place Order"}
                    </Button>
                  </form>
                )}

                <div className="bg-green-500/10 text-green-700 dark:text-green-400 rounded-xl p-3 text-xs font-medium flex items-start gap-2">
                  <Phone className="w-4 h-4 shrink-0 mt-0.5" />
                  We'll call to confirm before shipping. COD available.
                </div>

                <button
                  onClick={onBack}
                  className="w-full text-sm text-muted-foreground hover:text-foreground text-center transition-colors cursor-pointer"
                >
                  ← Continue Shopping
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
