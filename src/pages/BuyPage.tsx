import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/components/ui/card";
import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Phone,
  User,
  CreditCard,
  Package,
  Truck,
} from "lucide-react";

interface BuyPageProps {
  product: Product;
  onBack: () => void;
}

const DISTRICTS = [
  "Dhaka", "Chattogram", "Cumilla", "Gazipur", "Narsingdi",
  "Mymensingh", "Sylhet", "Rajshahi", "Khulna", "Barishal",
  "Rangpur", "Dinajpur", "Bogura", "Narayanganj", "Tangail",
];

const PAYMENT_METHODS = [
  { id: "cod", label: "Cash on Delivery", icon: "💵" },
  { id: "bkash", label: "bKash", icon: "🟣" },
  { id: "nagad", label: "Nagad", icon: "🟠" },
  { id: "bank", label: "Bank Transfer", icon: "🏦" },
];

type FormData = {
  fullName: string;
  phone: string;
  altPhone: string;
  email: string;
  address: string;
  district: string;
  upazila: string;
  postalCode: string;
  notes: string;
  paymentMethod: string;
};

export function BuyPage({ product, onBack }: BuyPageProps) {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    phone: "",
    altPhone: "",
    email: "",
    address: "",
    district: "",
    upazila: "",
    postalCode: "",
    notes: "",
    paymentMethod: "cod",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const price = product.salePrice ?? product.price;
  const shipping = 80;
  const total = price + shipping;

  const update = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1600);
  };

  if (isSuccess) {
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
          <p className="text-muted-foreground mb-2">
            Thank you, <strong>{form.fullName}</strong>!
          </p>
          <p className="text-muted-foreground text-sm mb-6">
            We've received your order for <strong>{product.name}</strong>. Our team will
            contact you at <strong>{form.phone}</strong> to confirm delivery.
          </p>
          <div className="bg-secondary/40 rounded-xl p-4 text-sm text-left space-y-1 mb-6">
            <p><span className="font-medium">Product:</span> {product.name}</p>
            <p><span className="font-medium">Amount:</span> ৳{total.toLocaleString()}</p>
            <p><span className="font-medium">Payment:</span> {PAYMENT_METHODS.find(m => m.id === form.paymentMethod)?.label}</p>
            <p><span className="font-medium">Deliver to:</span> {form.address}, {form.upazila}, {form.district}</p>
          </div>
          <Button onClick={onBack} className="w-full rounded-full" size="lg">
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
          <h1 className="text-base font-bold">Checkout</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Order Form (left) ── */}
          <motion.form
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            onSubmit={handleSubmit}
            className="lg:col-span-2 space-y-6"
          >
            {/* Personal Info */}
            <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-lg">Personal Information</h2>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Your full name"
                  value={form.fullName}
                  onChange={update("fullName")}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone / WhatsApp *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    value={form.phone}
                    onChange={update("phone")}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="altPhone">Alternate Phone</Label>
                  <Input
                    id="altPhone"
                    type="tel"
                    placeholder="01XXXXXXXXX (optional)"
                    value={form.altPhone}
                    onChange={update("altPhone")}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com (optional)"
                  value={form.email}
                  onChange={update("email")}
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-lg">Delivery Address</h2>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="address">Full Address *</Label>
                <Textarea
                  id="address"
                  placeholder="House no., road, area, village..."
                  value={form.address}
                  onChange={update("address")}
                  className="min-h-[80px] resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="district">District *</Label>
                  <select
                    id="district"
                    value={form.district}
                    onChange={update("district")}
                    required
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
                  >
                    <option value="">Select district</option>
                    {DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="upazila">Upazila / Thana *</Label>
                  <Input
                    id="upazila"
                    placeholder="e.g. Daudkandi"
                    value={form.upazila}
                    onChange={update("upazila")}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  placeholder="e.g. 3519"
                  value={form.postalCode}
                  onChange={update("postalCode")}
                  className="max-w-[180px]"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-lg">Payment Method</h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                      form.paymentMethod === method.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={form.paymentMethod === method.id}
                      onChange={update("paymentMethod")}
                      className="sr-only"
                    />
                    <span className="text-xl">{method.icon}</span>
                    <span className="text-sm font-medium">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Special Notes */}
            <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-3">
              <Label htmlFor="notes">Special Instructions (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any specific instructions for packaging or delivery..."
                value={form.notes}
                onChange={update("notes")}
                className="min-h-[80px] resize-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full rounded-full py-6 text-base font-bold"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Placing Order...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Place Order — ৳{total.toLocaleString()}
                </span>
              )}
            </Button>
          </motion.form>

          {/* ── Order Summary (right) ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-4"
          >
            <div className="bg-card border rounded-2xl p-5 shadow-sm sticky top-20">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-base">Order Summary</h2>
              </div>

              {/* Product */}
              <div className="flex gap-3 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 rounded-xl object-cover border shrink-0"
                />
                <div>
                  <p className="text-xs text-primary/70 uppercase tracking-wider font-semibold mb-0.5">
                    {product.category}
                  </p>
                  <p className="font-bold text-sm leading-snug">{product.name}</p>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="font-bold text-base">৳{price.toLocaleString()}</span>
                    {product.salePrice && (
                      <span className="text-xs line-through text-muted-foreground tabular-nums">
                        ৳{product.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Product Price</span>
                  <span className="tabular-nums">৳{price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="tabular-nums">৳{shipping}</span>
                </div>
                <div className="flex justify-between font-extrabold text-base border-t pt-2 mt-2">
                  <span>Total</span>
                  <span className="tabular-nums text-primary">৳{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4 bg-green-500/10 text-green-700 dark:text-green-400 rounded-xl p-3 text-xs font-medium flex items-start gap-2">
                <Phone className="w-4 h-4 shrink-0 mt-0.5" />
                We'll call to confirm before shipping. No payment needed upfront for COD.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
