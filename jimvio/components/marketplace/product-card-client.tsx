"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Star, Heart, ShoppingBag, Eye } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/actions/marketplace";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price?: number | null;
  images?: string[];
  rating?: number;
  review_count?: number;
  is_featured?: boolean;
  is_digital?: boolean;
  affiliate_enabled?: boolean;
  affiliate_commission_rate?: number | null;
  vendors?: { id: string; business_name?: string } | null;
}

export function ProductCardClient({ p }: { p: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const images = p.images ?? [];
  const imgSrc = images[0] ?? null;
  const price = Number(p.price ?? 0);
  const original = p.compare_at_price ? Number(p.compare_at_price) : null;
  const discount = original ? Math.round(((original - price) / original) * 100) : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading) return;
    
    setIsLoading(true);
    const vendorId = p.vendors?.id;
    console.log("Attempting to add to cart:", { productId: p.id, vendorId });
    
    if (!vendorId) {
      console.error("No vendor ID found for product:", p.id);
      alert("Error: Cannot find vendor for this product.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await addToCart(p.id, vendorId);
      console.log("ProductCard: Add results from server:", result);
      
      if (result.success) {
        console.log("ProductCard: Success! Triggering global 'cart-updated' event.");
        window.dispatchEvent(new CustomEvent("cart-updated"));
        toast.success(`"${p.name}" added to cart!`);
      } else {
        console.error("ProductCard: Fail response:", result.error);
        toast.error(result.error || "Failed to add to cart");
      }
    } catch (err) {
      console.error("ProductCard: Fatal error adding to cart:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="group relative bg-white border border-[#eee] rounded-2xl flex flex-col h-full hover:shadow-2xl transition-all duration-500 overflow-hidden">
      {/* Wishlist Button - Floating */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          setIsWishlisted(!isWishlisted);
        }}
        className="absolute top-4 right-4 z-20 h-9 w-9 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
      >
        <Heart className={cn("h-4 w-4 transition-colors", isWishlisted ? "fill-red-500 text-red-500" : "text-zinc-400")} />
      </button>

      {/* Image Area */}
      <Link 
        href={`/marketplace/${p.slug}`} 
        className={cn(
          "relative aspect-square bg-[#f9f9fb] flex items-center justify-center p-4 overflow-hidden"
        )}
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={p.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-[#f0f0f0] flex items-center justify-center">
            <Package className="h-8 w-8 text-[#d1d5db]" />
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {discount > 0 && (
            <span className="px-2.5 py-1 rounded-lg bg-black text-white text-[9px] font-black capitalize tracking-wider shadow-xl">
              −{discount}%
            </span>
          )}
          {p.is_featured && (
            <span className="px-2.5 py-1 rounded-lg bg-[var(--color-accent)] text-white text-[9px] font-black capitalize tracking-wider shadow-xl">
              CURATED
            </span>
          )}
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-x-4 bottom-4 z-10 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <Button className="w-full bg-black text-white hover:bg-zinc-800 rounded-xl py-6 h-11 text-[11px] font-black capitalize tracking-widest shadow-2xl">
            <Eye className="h-4 w-4 mr-2" /> Quick View
          </Button>
        </div>
      </Link>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-2 mb-2">
          <p className="text-[9px] font-black text-zinc-400 capitalize tracking-[0.15em] truncate flex-1">
            {p.vendors?.business_name || "Global Sourcing Hub"}
          </p>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-2.5 w-2.5 fill-current" />
            <span className="text-[10px] font-black text-zinc-900">{p.rating || "4.8"}</span>
          </div>
        </div>

        <Link href={`/marketplace/${p.slug}`}>
          <h3 className="text-sm font-bold text-zinc-900 line-clamp-2 leading-tight mb-4 group-hover:text-[var(--color-accent)] transition-colors tracking-tight">
            {p.name}
          </h3>
        </Link>
        
        <div className="mt-auto space-y-4">
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <p className="text-lg font-black text-zinc-900 tracking-tighter">
                {formatCurrency(price)}
              </p>
              {original && (
                <p className="text-[11px] text-zinc-400 line-through font-medium">
                  {formatCurrency(original)}
                </p>
              )}
            </div>
            <p className="text-[9px] text-zinc-400 font-black capitalize tracking-widest">
              MOQ: 1 pc
            </p>
          </div>
          
          <div className="flex gap-2">
             <Button 
               onClick={handleAddToCart}
               loading={isLoading}
               className="flex-1 bg-[var(--color-accent)] hover:bg-[#e06614] text-white rounded-xl h-10 text-[10px] font-black capitalize tracking-widest shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
             >
               ADD TO CART
             </Button>
             <Button 
               variant="outline"
               className="h-10 w-10 p-0 rounded-xl border-zinc-100 flex items-center justify-center hover:bg-zinc-50 hover:border-zinc-200 transition-all active:scale-95"
             >
               <ShoppingBag className="h-4 w-4 text-zinc-600" />
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
