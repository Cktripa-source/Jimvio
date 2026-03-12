"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Star, Zap, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency, calculateDiscount } from "@/lib/utils";
import type { Product } from "@/types/database.types";

interface ProductCardProps {
  product: Partial<Product> & {
    id: string;
    name: string;
    price: number;
    slug: string;
  };
  viewMode?: "grid" | "list";
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const discount = product.compare_at_price
    ? calculateDiscount(product.price, product.compare_at_price)
    : 0;

  const images = Array.isArray(product.images) ? product.images as string[] : [];
  const primaryImage = images[0] || null;

  if (viewMode === "list") {
    return (
      <Link href={`/marketplace/${product.slug}`}>
        <div className="glass-card-hover flex gap-4 p-4 group">
          <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-slate-800">
            {primaryImage ? (
              <Image src={primaryImage} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl">📦</div>
            )}
          </div>
          <div className="flex-1 min-w-0 py-1">
            <p className="text-xs text-white/40 mb-1">
              {(product as { vendors?: { business_name?: string } }).vendors?.business_name || "JIMVIO Store"}
            </p>
            <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-brand-300 transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              {product.rating !== undefined && product.rating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs text-white/70">{product.rating}</span>
                  <span className="text-xs text-white/30">({product.review_count || 0})</span>
                </div>
              )}
              {product.affiliate_enabled && (
                <Badge variant="success" className="text-xs py-0">Affiliate</Badge>
              )}
              {product.is_digital && (
                <Badge variant="default" className="text-xs py-0">Digital</Badge>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-brand-400 font-bold text-lg">{formatCurrency(product.price)}</span>
              {discount > 0 && (
                <>
                  <span className="text-white/30 text-sm line-through">{formatCurrency(product.compare_at_price!)}</span>
                  <Badge variant="destructive" className="text-xs">{discount}% OFF</Badge>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-shrink-0">
            <Button size="sm" variant="default">
              <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
            </Button>
            <Button size="sm" variant="glass" onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}>
              <Heart className={cn("h-3.5 w-3.5", wishlisted && "fill-red-400 text-red-400")} />
            </Button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/marketplace/${product.slug}`}>
      <div className="product-card group relative">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-slate-800/50 rounded-t-2xl">
          {primaryImage ? (
            <Image src={primaryImage} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">📦</div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button size="icon-sm" variant="glass" title="Quick view">
              <Eye className="h-3.5 w-3.5" />
            </Button>
            <Button size="icon-sm" onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }} variant="glass">
              <Heart className={cn("h-3.5 w-3.5", wishlisted && "fill-red-400 text-red-400")} />
            </Button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {discount > 0 && (
              <Badge variant="destructive" className="text-xs font-bold">{discount}% OFF</Badge>
            )}
            {product.is_featured && (
              <Badge variant="warning" className="text-xs">Featured</Badge>
            )}
            {product.is_digital && (
              <Badge variant="default" className="text-xs">Digital</Badge>
            )}
          </div>

          {product.affiliate_enabled && (
            <div className="absolute top-3 right-3">
              <Badge variant="success" className="text-xs">
                <Zap className="h-2.5 w-2.5" /> Affiliate
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-white/40 mb-1 truncate">
            {(product as { vendors?: { business_name?: string } }).vendors?.business_name || "JIMVIO Store"}
          </p>
          <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-brand-300 transition-colors leading-tight">
            {product.name}
          </h3>

          {product.rating !== undefined && product.rating > 0 && (
            <div className="flex items-center gap-1 mb-3">
              {Array(5).fill(0).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < Math.floor(product.rating!) ? "text-amber-400 fill-amber-400" : "text-white/20"
                  )}
                />
              ))}
              <span className="text-xs text-white/40 ml-1">({product.review_count || 0})</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <span className="text-brand-400 font-bold">{formatCurrency(product.price)}</span>
              {discount > 0 && (
                <span className="text-white/30 text-xs line-through ml-2">{formatCurrency(product.compare_at_price!)}</span>
              )}
            </div>
            <Button
              size="icon-sm"
              onClick={(e) => e.preventDefault()}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
