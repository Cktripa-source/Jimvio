"use client";

import React, { use, useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Zap, ShieldCheck, Globe, Filter, Sparkles, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProductCardClient } from "@/components/marketplace/product-card-client";
import { SortSelect } from "@/components/marketplace/sort-select";

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

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface MarketplaceClientProps {
  initialProducts: Product[];
  categories: Category[];
  total: number;
  currentPage: number;
  limit: number;
  params: {
    cat?: string;
    type?: string;
    q?: string;
    sort?: string;
    affiliate?: string;
  };
}

export function MarketplaceClient({ 
  initialProducts, 
  categories, 
  total, 
  currentPage, 
  limit, 
  params 
}: MarketplaceClientProps) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 overflow-hidden">
      {/* ── PREMIUM MARKETPLACE HEADER ── */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white border-b border-[#f0f0f0]"
      >
        <div className="max-w-[1400px] mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <Link href="/" className="text-[10px] font-black capitalize tracking-[0.2em] text-zinc-400 hover:text-[var(--color-accent)] transition-colors">Home</Link>
                <div className="h-1 w-1 rounded-full bg-zinc-300" />
                <span className="text-[10px] font-black capitalize tracking-[0.2em] text-zinc-900 border-b border-black pb-0.5">Marketplace</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter leading-[0.9]">
                Global <span className="text-[var(--color-accent)]">Sourcing</span> Hub
              </h1>
              <p className="text-[var(--color-text-secondary)] text-sm font-medium max-w-lg mt-4 leading-relaxed">
                Connect with verified global manufacturers and digital creators. Secure trading with Jimvio protection.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="hidden lg:flex items-center gap-6 mr-6 py-3 px-6 bg-[#fafafa] rounded-2xl border border-[#f0f0f0]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <span className="text-[10px] font-black capitalize tracking-wider text-zinc-600">Secure Trade</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-600" />
                  <span className="text-[10px] font-black capitalize tracking-wider text-zinc-600">Global Logistics</span>
                </div>
              </div>
              <SortSelect currentSort={params.sort} />
            </div>
          </div>
        </div>

        {/* ── TOP ASSET CLASS FILTERS ── */}
        <div className="max-w-[1400px] mx-auto px-6 py-4 border-t border-[#f5f5f5] flex items-center justify-between overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2">
            {[
              { label: "All Items", value: undefined, icon: <Sparkles className="h-3.5 w-3.5" /> },
              { label: "Physical Goods", value: "physical", icon: <Package className="h-3.5 w-3.5" /> },
              { label: "Digital Assets", value: "digital", icon: <Zap className="h-3.5 w-3.5" /> },
              { label: "Professional Software", value: "software", icon: <Globe className="h-3.5 w-3.5" /> },
            ].map((t) => (
              <Link
                key={t.label}
                href={`/marketplace${t.value ? `?type=${t.value}` : ""}`}
                className={cn(
                  "flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[11px] font-black capitalize tracking-[0.1em] border transition-all whitespace-nowrap",
                  (params.type === t.value || (!params.type && !t.value))
                    ? "bg-black text-white border-black shadow-lg shadow-black/10 scale-105" 
                    : "bg-white text-zinc-500 border-zinc-100 hover:border-black hover:text-black"
                )}
              >
                <span className={cn((params.type === t.value || (!params.type && !t.value)) ? "text-[var(--color-accent)]" : "text-zinc-300 group-hover:text-black hover:text-black")}>
                  {t.icon}
                </span>
                {t.label}
              </Link>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-8 pl-8 border-l border-[#f0f0f0]">
            <div className="flex flex-col items-center">
               <span className="text-[10px] font-black text-zinc-900 leading-none">2.4k+</span>
               <span className="text-[8px] font-black text-zinc-400 capitalize tracking-tighter">Verified Vendors</span>
            </div>
            <div className="flex flex-col items-center">
               <span className="text-[10px] font-black text-zinc-900 leading-none">99.2%</span>
               <span className="text-[8px] font-black text-zinc-400 capitalize tracking-tighter">Success Rate</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        {/* ── MINIMAL SIDEBAR ── */}
        <motion.aside 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:w-64 shrink-0"
        >
          <div className="sticky top-40 space-y-10">
            {/* Categories */}
            <div className="space-y-6">
              <h3 className="text-[11px] font-black text-zinc-900 capitalize tracking-[0.25em] flex items-center gap-3">
                Collections <div className="h-px flex-1 bg-zinc-200" />
              </h3>
              <div className="flex flex-col space-y-2">
                {[{ slug: null, name: "Discovery" }, ...categories].map((cat, idx) => (
                  <motion.div
                    key={cat.slug || "all"}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                  >
                    <Link
                      href={cat.slug ? `/marketplace?cat=${cat.slug}` : "/marketplace"}
                      className={cn(
                        "group flex items-center justify-between py-2 px-3 rounded-xl transition-all duration-300",
                        ((!params.cat && !cat.slug) || (params.cat === cat.slug)) ? "bg-black text-white shadow-xl shadow-black/10 scale-[1.02]" : "text-zinc-500 hover:bg-white hover:text-black hover:translate-x-1"
                      )}
                    >
                      <span className="text-sm font-bold">{cat.name}</span>
                      {(!params.cat && !cat.slug) && (
                        <span className="text-[10px] font-black opacity-40 group-hover:opacity-100">{total}</span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Premium Trust Badge */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-gradient-to-br from-zinc-900 to-black rounded-3xl text-white space-y-4 shadow-2xl shadow-black/20"
            >
              <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center">
                 <ShieldCheck className="h-6 w-6 text-[var(--color-accent)]" />
              </div>
              <div>
                <h4 className="text-xs font-black capitalize tracking-widest mb-1">Secure Trading</h4>
                <p className="text-[10px] text-zinc-400 font-medium leading-relaxed">Your payments are protected by Jimvio Trade Assurance until delivery is confirmed.</p>
              </div>
              <Button size="sm" className="w-full bg-white text-black hover:bg-zinc-100 text-[10px] font-black rounded-lg h-9">
                LEARN MORE
              </Button>
            </motion.div>
          </div>
        </motion.aside>

        {/* ── PRODUCT GRID AREA ── */}
        <div className="flex-1 min-w-0">
          {/* Quick Filter Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-10 flex flex-wrap items-center justify-between gap-6"
          >
             <div className="flex items-center gap-4">
                {[
                  { label: "Trending Now", icon: <TrendingUp className="h-3.5 w-3.5" /> },
                  { label: "New Arrivals", icon: <Clock className="h-3.5 w-3.5" /> }
                ].map((item, i) => (
                  <motion.div 
                    key={item.label}
                    whileHover={{ y: -2 }}
                    className="group flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-zinc-100 shadow-sm cursor-pointer hover:border-black transition-colors"
                  >
                    <span className="text-zinc-400 group-hover:text-black">{item.icon}</span>
                    <span className="text-[10px] font-black capitalize tracking-widest text-zinc-900">{item.label}</span>
                  </motion.div>
                ))}
             </div>
             
             <div className="flex items-center gap-4 text-zinc-300">
                <div className="flex items-center gap-1.5">
                   <CheckCircle2 className="h-3 w-3 text-green-500" />
                   <span className="text-[9px] font-black capitalize tracking-wider text-zinc-500">Verified Suppliers</span>
                </div>
                <div className="h-1 w-1 rounded-full bg-zinc-200" />
                <span className="text-[9px] font-black capitalize tracking-wider text-zinc-500">{total} Items Available</span>
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-[11px] font-black text-zinc-400 capitalize tracking-[0.25em]">
              {params.q ? `Search results for “${params.q}”` : "Latest Curated Discoveries"}
            </h2>
          </motion.div>

          <AnimatePresence mode="wait">
            {initialProducts.length > 0 ? (
              <motion.div 
                key={JSON.stringify(params)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
              >
                {initialProducts.map((p, idx) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: (idx % 8) * 0.05,
                      ease: [0.23, 1, 0.32, 1]
                    }}
                  >
                    <ProductCardClient p={p} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-[#f0f0f0] rounded-[2rem] p-24 text-center shadow-sm"
              >
                <div className="h-20 w-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-zinc-100">
                  <Search className="h-8 w-8 text-zinc-300" />
                </div>
                <h3 className="text-xl font-black text-zinc-900 mb-2">
                  No artifacts found
                </h3>
                <p className="text-sm text-zinc-500 mb-10 max-w-xs mx-auto font-medium">
                  Try refining your filters or explore our curators' picks.
                </p>
                <Link href="/marketplace">
                  <Button size="lg" className="bg-black hover:bg-zinc-800 text-white rounded-xl h-14 px-10 font-black">
                    Reset Search
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10 pb-8">
              {currentPage > 1 && (
                <Link
                  href={`/marketplace?${new URLSearchParams({
                    ...Object.fromEntries(Object.entries(params).filter(([, v]) => v != null && v !== "")),
                    page: String(currentPage - 1),
                  }).toString()}`}
                >
                  <Button variant="secondary" size="sm">Previous</Button>
                </Link>
              )}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pg = Math.max(1, currentPage - 2) + i;
                if (pg > totalPages) return null;
                return (
                  <Link
                    key={pg}
                    href={`/marketplace?${new URLSearchParams({
                      ...Object.fromEntries(Object.entries(params).filter(([, v]) => v != null && v !== "")),
                      page: String(pg),
                    }).toString()}`}
                  >
                    <button
                      type="button"
                      className={`min-w-[40px] h-10 px-2 rounded-lg text-sm font-medium transition-colors ${pg === currentPage ? "bg-[var(--color-accent)] text-white" : "bg-white border border-[#f0f0f0] text-zinc-500 hover:border-black hover:text-black"}`}
                    >
                      {pg}
                    </button>
                  </Link>
                );
              })}
              {currentPage < totalPages && (
                <Link
                  href={`/marketplace?${new URLSearchParams({
                    ...Object.fromEntries(Object.entries(params).filter(([, v]) => v != null && v !== "")),
                    page: String(currentPage + 1),
                  }).toString()}`}
                >
                  <Button variant="secondary" size="sm">Next</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
