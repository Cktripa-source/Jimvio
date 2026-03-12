"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, TrendingUp, ShoppingBag, MessageCircle, Heart } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

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
  vendors?: { business_name?: string } | null;
}

export function ProductCardClient({ p }: { p: Product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const images   = p.images ?? [];
  const imgSrc   = images[0] ?? null;
  const price    = Number(p.price ?? 0);
  const original = p.compare_at_price ? Number(p.compare_at_price) : null;
  const discount = original ? Math.round(((original - price) / original) * 100) : 0;
  const rating   = Number(p.rating ?? 0);
  const earn     = p.affiliate_enabled ? `${p.affiliate_commission_rate ?? 10}%` : null;

  return (
    <Link href={`/marketplace/${p.slug}`}>
      <div className="bg-surface rounded-2xl border border-base shadow-card hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group cursor-pointer">
        <div className="relative aspect-square bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 flex items-center justify-center text-5xl overflow-hidden">
          {imgSrc
            ? <img src={imgSrc} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            : <span className="group-hover:scale-110 transition-transform duration-300">📦</span>
          }
          {/* Hover actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200 flex items-end justify-end p-2.5 gap-1.5 opacity-0 group-hover:opacity-100">
            <button
              onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
              className="w-8 h-8 rounded-xl bg-surface/90 shadow-card flex items-center justify-center hover:bg-surface transition-colors"
            >
              <Heart className={`h-3.5 w-3.5 ${wishlisted ? "fill-red-500 text-red-500" : "text-muted-c"}`} />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); }}
              className="w-8 h-8 rounded-xl bg-surface/90 shadow-card flex items-center justify-center text-primary-700 dark:text-primary-300 hover:bg-surface transition-colors"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); }}
              className="w-8 h-8 rounded-xl bg-surface/90 shadow-card flex items-center justify-center text-muted-c hover:bg-surface transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" />
            </button>
          </div>
          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            {discount > 0 && <span className="badge badge-red text-xs font-bold">{discount}% OFF</span>}
            {p.is_featured && <span className="badge badge-purple text-xs">Featured</span>}
          </div>
          {earn && (
            <div className="absolute top-2.5 right-2.5">
              <span className="badge badge-green text-xs"><TrendingUp className="h-2.5 w-2.5" /> {earn}</span>
            </div>
          )}
        </div>
        <div className="p-3.5">
          <div className="flex items-center justify-between mb-0.5">
            <p className="text-xs text-muted-c truncate">{p.vendors?.business_name ?? "Jimvio Store"}</p>
            {p.is_digital && <span className="badge badge-blue text-xs py-0">Digital</span>}
          </div>
          <h3 className="font-semibold text-sm text-base mb-2 line-clamp-2 leading-snug group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">{p.name}</h3>
          {rating > 0 && (
            <div className="flex items-center gap-0.5 mb-2.5">
              {[1,2,3,4,5].map(i => <Star key={i} className={`h-3 w-3 ${i <= Math.floor(rating) ? "text-accent-500 fill-accent-500" : "text-muted-c/25"}`} />)}
              <span className="text-xs text-muted-c ml-1">({(p.review_count ?? 0).toLocaleString()})</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-primary-900 dark:text-primary-300">{formatCurrency(price)}</span>
              {original && <span className="text-xs text-muted-c line-through ml-1.5">{formatCurrency(original)}</span>}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
