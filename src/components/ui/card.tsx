import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

import img1 from "@/assets/products/1.jpeg";
import img2 from "@/assets/products/2.jpeg";
import img3 from "@/assets/products/3.jpeg";
import img4 from "@/assets/products/4.jpg";
import img5 from "@/assets/products/5.jpeg";
import img6 from "@/assets/products/6.jpeg";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart?: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
  onToggleWishlist?: (productId: number, isWishlisted: boolean) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,        // 80ms stagger per card
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94], // ease-out cubic
    },
  }),
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistClick = () => {
    const next = !isWishlisted;
    setIsWishlisted(next);
    onToggleWishlist?.(product.id, next);
  };

  const handleAddToCart = () => onAddToCart?.(product);
  const handleBuyNow = () => onBuyNow?.(product);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="flex flex-col h-full w-full rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden group cursor-pointer"
      whileHover={{ y: -6, boxShadow: "0 20px 40px -8px rgba(0,0,0,0.2)" }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      {/* Image Container — fixed aspect ratio for alignment */}
      <div className="relative w-full" style={{ paddingTop: "75%" }}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-200 bg-background/70 hover:bg-background shadow-md backdrop-blur-sm cursor-pointer ${
            isWishlisted ? "text-red-500" : "text-muted-foreground hover:text-red-400"
          }`}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* Sale Badge */}
        {product.salePrice && (
          <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-2.5 py-1 rounded-full text-xs font-bold shadow-md">
            -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
          </div>
        )}

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
            <span className="bg-destructive text-destructive-foreground px-4 py-2 rounded-full font-semibold text-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content — flex-grow keeps button at bottom across all cards */}
      <div className="p-5 flex flex-col flex-grow gap-2">
        {/* Category */}
        <p className="text-xs uppercase tracking-widest font-semibold text-primary/70">
          {product.category}
        </p>

        {/* Product Name — clamp ensures consistent height */}
        <h3 className="font-bold text-base leading-snug line-clamp-2 min-h-[2.75rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={13}
                className={
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-muted-foreground/40"
                }
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-medium tabular-nums">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price — push to bottom before button */}
        <div className="flex items-center justify-between mt-auto pt-3">
          <div className="flex items-baseline gap-2">
            {product.salePrice ? (
              <>
                <span className="text-xl font-extrabold text-destructive tabular-nums">
                  ৳{product.salePrice.toLocaleString()}
                </span>
                <span className="text-sm line-through text-muted-foreground tabular-nums">
                  ৳{product.price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-xl font-extrabold tabular-nums">
                ৳{product.price.toLocaleString()}
              </span>
            )}
          </div>

          {product.inStock && (
            <span className="text-xs text-green-600 dark:text-green-400 font-semibold bg-green-500/10 px-2 py-0.5 rounded-full shrink-0">
              In Stock
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3">
          <Button
            onClick={handleBuyNow}
            disabled={!product.inStock}
            size="sm"
            className="flex-1 font-semibold text-xs"
          >
            Buy Now
          </Button>
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            size="sm"
            variant="outline"
            className="flex-1 font-semibold text-xs gap-1"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

interface ProductCardDemoProps {
  onBuyNow?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onViewAllProducts?: () => void;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Acoustic Guitar",
    category: "Acoustic",
    price: 19999,
    image: img1,
    rating: 4.8,
    reviews: 124,
    inStock: true,
  },
  {
    id: 2,
    name: "Electric Guitar Set",
    category: "Electric",
    price: 29999,
    salePrice: 24999,
    image: img2,
    rating: 4.5,
    reviews: 86,
    inStock: true,
  },
  {
    id: 3,
    name: "Professional Bass Guitar",
    category: "Bass",
    price: 34999,
    image: img3,
    rating: 4.9,
    reviews: 42,
    inStock: true,
  },
  {
    id: 4,
    name: "Premium Keyboard",
    category: "Keyboard",
    price: 49999,
    image: img4,
    rating: 4.7,
    reviews: 215,
    inStock: true,
  },
  {
    id: 5,
    name: "Acoustic Drum Kit",
    category: "Drums",
    price: 59999,
    salePrice: 54999,
    image: img5,
    rating: 4.6,
    reviews: 67,
    inStock: true,
  },
  {
    id: 6,
    name: "Studio Microphone",
    category: "Accessories",
    price: 12999,
    image: img6,
    rating: 4.8,
    reviews: 312,
    inStock: false,
  },
];

const ProductCardDemo: React.FC<ProductCardDemoProps> = ({
  onBuyNow,
  onAddToCart,
  onViewAllProducts,
}) => {

  const handleAddToCart = (p: Product) => {
    if (onAddToCart) onAddToCart(p);
    else alert(`${p.name} added to cart!`);
  };

  const handleBuyNow = (p: Product) => {
    if (onBuyNow) onBuyNow(p);
    else alert(`Buying: ${p.name}`);
  };

  const handleToggleWishlist = (_productId: number, _wishlisted: boolean) => {};

  return (
    <div className="w-full py-20 md:py-28 bg-secondary/10">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Featured Instruments
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Explore our curated selection of premium instruments for beginners and pros.
          </p>
        </motion.div>

        {/* Products Grid — items-stretch ensures equal height cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
        </div>

        {/* View All Products Button */}
        {onViewAllProducts && (
          <div className="flex justify-center mt-12">
            <Button onClick={onViewAllProducts} size="lg" className="px-8 py-6 text-lg">
              View All Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export { ProductCard, ProductCardDemo };
export default ProductCardDemo;
