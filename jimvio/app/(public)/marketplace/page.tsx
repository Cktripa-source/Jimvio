"use client";
import React from "react";
import Link from "next/link";
import {
  SlidersHorizontal, Grid3X3, List, Search, TrendingUp, Package,
  Star, ShoppingBag, Zap, ChevronDown, Flame, Tag, CheckCircle,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categories = [
  { name: "All Products",   slug: "all",         count: 52000 },
  { name: "Electronics",    slug: "electronics", count: 12400 },
  { name: "Fashion",        slug: "fashion",     count: 8700  },
  { name: "Home & Garden",  slug: "home-garden", count: 6200  },
  { name: "Digital",        slug: "digital",     count: 15000 },
  { name: "Courses",        slug: "courses",     count: 3800  },
  { name: "AI Tools",       slug: "ai-tools",    count: 2100  },
  { name: "Agriculture",    slug: "agriculture", count: 4500  },
  { name: "Health & Beauty",slug: "health-beauty",count: 9300 },
  { name: "Software",       slug: "software",    count: 1800  },
  { name: "Templates",      slug: "templates",   count: 5400  },
  { name: "Ebooks",         slug: "ebooks",      count: 7600  },
];

const mockProducts = [
  { id: "1",  name: "iPhone 15 Pro Max 256GB",          slug: "iphone-15-pro-max",  price: 850000, original: 980000, rating: 4.9, reviews: 1240, emoji: "📱", vendor: "TechZone Rwanda",  type: "physical", earn: "8%",  badge: "Featured" },
  { id: "2",  name: "Next.js 15 Full-Stack Mastery",    slug: "nextjs-mastery",     price: 45000,  original: 90000,  rating: 4.8, reviews: 892,  emoji: "💻", vendor: "DevAcademy",       type: "digital",  earn: "40%", badge: "Best Seller" },
  { id: "3",  name: "AI Business Automation Bundle",    slug: "ai-automation",      price: 75000,  original: null,   rating: 4.7, reviews: 567,  emoji: "🤖", vendor: "AITools Pro",      type: "digital",  earn: "35%", badge: null },
  { id: "4",  name: "Premium Figma UI Kit 2025",        slug: "figma-ui-kit",       price: 35000,  original: 55000,  rating: 4.9, reviews: 2103, emoji: "🎨", vendor: "DesignLab",        type: "digital",  earn: "50%", badge: "Top Rated" },
  { id: "5",  name: "Samsung 65\" 4K QLED Smart TV",   slug: "samsung-65-qled",    price: 620000, original: 750000, rating: 4.6, reviews: 435,  emoji: "📺", vendor: "ElectroHub RW",    type: "physical", earn: "8%",  badge: null },
  { id: "6",  name: "Rwandan Coffee Premium 1kg",       slug: "rwanda-coffee",      price: 12000,  original: null,   rating: 4.8, reviews: 3820, emoji: "☕", vendor: "Café Rwanda",      type: "physical", earn: null,  badge: "Local" },
  { id: "7",  name: "Python & Machine Learning Bootcamp", slug: "python-ml",        price: 65000,  original: 120000, rating: 4.7, reviews: 1590, emoji: "🐍", vendor: "TechLearn Africa", type: "digital",  earn: "40%", badge: "Hot" },
  { id: "8",  name: "Wireless Noise-Cancelling Headphones", slug: "headphones-pro", price: 95000,  original: 130000, rating: 4.5, reviews: 678,  emoji: "🎧", vendor: "AudioZone",        type: "physical", earn: "12%", badge: null },
  { id: "9",  name: "E-commerce Launch Checklist Ebook",slug: "ecommerce-ebook",    price: 8500,   original: null,   rating: 4.6, reviews: 2341, emoji: "📖", vendor: "BizBooks RW",      type: "digital",  earn: "45%", badge: null },
  { id: "10", name: "Solar Panel 200W Complete Kit",    slug: "solar-panel-kit",    price: 285000, original: 320000, rating: 4.7, reviews: 234,  emoji: "☀️", vendor: "SolarPower RW",    type: "physical", earn: null,  badge: "Eco" },
  { id: "11", name: "Notion Business Templates Bundle", slug: "notion-templates",   price: 18000,  original: 35000,  rating: 4.8, reviews: 5672, emoji: "📋", vendor: "ProductivityPro",  type: "digital",  earn: "45%", badge: "Best Seller" },
  { id: "12", name: "Gym Equipment Home Set Complete",  slug: "gym-equipment",      price: 180000, original: 220000, rating: 4.5, reviews: 189,  emoji: "🏋️", vendor: "FitRwanda",        type: "physical", earn: null,  badge: null },
];

const badgeStyle: Record<string, string> = {
  "Featured":    "badge badge-purple",
  "Best Seller": "badge badge-orange",
  "Top Rated":   "badge badge-green",
  "Hot":         "badge badge-red",
  "Local":       "badge badge-blue",
  "Eco":         "badge badge-green",
};

function ProductCard({ p }: { p: typeof mockProducts[0] }) {
  const discount = p.original ? Math.round(((p.original - p.price) / p.original) * 100) : 0;
  return (
    <Link href={`/marketplace/${p.slug}`}>
      <div className="bg-surface rounded-2xl border border-base shadow-card hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group cursor-pointer">
        <div className="relative aspect-square bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 flex items-center justify-center text-5xl overflow-hidden">
          <span className="group-hover:scale-110 transition-transform duration-300">{p.emoji}</span>

          {/* Hover overlay with action buttons */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200 flex items-end justify-end p-2.5 gap-1.5 opacity-0 group-hover:opacity-100">
            <button onClick={(e) => e.preventDefault()} className="w-8 h-8 rounded-xl bg-surface/90 shadow-card flex items-center justify-center text-primary-700 dark:text-primary-300 hover:bg-surface transition-colors">
              <ShoppingBag className="h-3.5 w-3.5" />
            </button>
            <button onClick={(e) => e.preventDefault()} className="w-8 h-8 rounded-xl bg-surface/90 shadow-card flex items-center justify-center text-muted-c hover:bg-surface transition-colors">
              <MessageCircle className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            {discount > 0 && <span className="badge badge-red text-xs font-bold">{discount}% OFF</span>}
            {p.badge && <span className={`${badgeStyle[p.badge] || "badge badge-gray"} text-xs`}>{p.badge}</span>}
          </div>
          {p.earn && (
            <div className="absolute top-2.5 right-2.5">
              <span className="badge badge-green text-xs"><TrendingUp className="h-2.5 w-2.5" /> {p.earn}</span>
            </div>
          )}
        </div>

        <div className="p-3.5">
          <div className="flex items-center justify-between mb-0.5">
            <p className="text-xs text-muted-c truncate">{p.vendor}</p>
            {p.type === "digital" && <span className="badge badge-blue text-xs py-0">Digital</span>}
          </div>
          <h3 className="font-semibold text-sm text-base mb-2 line-clamp-2 leading-snug group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">{p.name}</h3>
          <div className="flex items-center gap-0.5 mb-2.5">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className={`h-3 w-3 ${i <= Math.floor(p.rating) ? "text-accent-500 fill-accent-500" : "text-muted-c/25"}`} />
            ))}
            <span className="text-xs text-muted-c ml-1">({p.reviews.toLocaleString()})</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-primary-900 dark:text-primary-300">
                {p.price >= 1000 ? `RWF ${p.price.toLocaleString()}` : `$${p.price}`}
              </span>
              {p.original && (
                <span className="text-xs text-muted-c line-through ml-1.5">
                  {p.original >= 1000 ? `RWF ${p.original.toLocaleString()}` : `$${p.original}`}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function MarketplacePage() {
  return (
    <div className="pt-20 page-wrapper min-h-screen">
      {/* Header */}
      <div className="border-b border-base py-6 px-4" style={{
        background: "linear-gradient(160deg, #f5f3ff 0%, #ede9fe 60%, #faf5ff 100%)"
      }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-black text-base mb-0.5">Marketplace</h1>
              <p className="text-sm text-muted-c">52,000+ products from 10,000+ verified vendors</p>
            </div>
            <div className="flex items-center gap-2 max-w-lg flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-c pointer-events-none" />
                <input
                  placeholder="Search products, vendors, categories..."
                  className="w-full h-11 pl-10 pr-4 rounded-2xl border border-base bg-surface text-sm text-base placeholder:text-muted-c focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 shadow-card transition-all"
                />
              </div>
              <Button variant="outline" size="default">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-c">
            <span className="flex items-center gap-1.5">
              <Package className="h-3.5 w-3.5 text-primary-700 dark:text-primary-300" /> 52,000+ products
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" /> 10,000+ vendors
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-accent-500" /> Affiliate enabled on 38,000+ products
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 space-y-5">
            {/* Categories */}
            <div>
              <h3 className="text-xs font-semibold text-muted-c uppercase tracking-wider mb-3">Categories</h3>
              <div className="space-y-0.5">
                {categories.map((cat, i) => (
                  <Link key={cat.slug} href={`/marketplace?cat=${cat.slug}`}>
                    <div className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all cursor-pointer ${
                      i === 0
                        ? "font-semibold text-white"
                        : "text-muted-c hover:text-base hover:bg-subtle"
                    }`}
                    style={i === 0 ? { background: "linear-gradient(135deg, #4B2D8F, #7C3AED)" } : undefined}>
                      <span>{cat.name}</span>
                      <span className={`text-xs ${i === 0 ? "text-purple-200" : "text-muted-c"}`}>
                        {(cat.count / 1000).toFixed(cat.count < 2000 ? 1 : 0)}K
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="h-px bg-border-base" />

            {/* Price Range */}
            <div>
              <h3 className="text-xs font-semibold text-muted-c uppercase tracking-wider mb-3">Price Range</h3>
              <div className="space-y-2">
                {["Under RWF 10,000", "RWF 10K–50K", "RWF 50K–200K", "RWF 200K–500K", "Above RWF 500K"].map((r) => (
                  <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" className="accent-purple-600 w-3.5 h-3.5" />
                    <span className="text-sm text-muted-c group-hover:text-base transition-colors">{r}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px bg-border-base" />

            {/* Type */}
            <div>
              <h3 className="text-xs font-semibold text-muted-c uppercase tracking-wider mb-3">Product Type</h3>
              <div className="space-y-2">
                {["Physical", "Digital", "Courses", "Software", "Templates"].map((t) => (
                  <label key={t} className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" className="accent-purple-600 w-3.5 h-3.5" />
                    <span className="text-sm text-muted-c group-hover:text-base transition-colors">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px bg-border-base" />

            {/* Features */}
            <div>
              <h3 className="text-xs font-semibold text-muted-c uppercase tracking-wider mb-3">Features</h3>
              <div className="space-y-2">
                {["Affiliate Enabled", "Free Shipping", "Top Rated (4.5+)", "On Sale", "Verified Vendor"].map((f) => (
                  <label key={f} className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" className="accent-purple-600 w-3.5 h-3.5" />
                    <span className="text-sm text-muted-c group-hover:text-base transition-colors">{f}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex flex-wrap gap-2">
              {["All", "Trending", "New Arrivals", "On Sale", "Affiliate Only"].map((f, i) => (
                <button
                  key={f}
                  className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
                    i === 0
                      ? "text-white shadow-primary"
                      : "border border-base bg-surface text-muted-c hover:text-base hover:bg-subtle"
                  }`}
                  style={i === 0 ? { background: "linear-gradient(135deg, #4B2D8F, #7C3AED)" } : undefined}
                >
                  {i === 2 && <Zap className="h-3 w-3 inline-block mr-1 text-accent-500" />}
                  {f}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <select className="h-9 px-3 rounded-xl border border-base bg-surface text-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-500/30 cursor-pointer">
                <option>Trending</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
                <option>Best Selling</option>
              </select>
              <div className="flex border border-base rounded-xl overflow-hidden bg-surface">
                <button className="p-2 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                  <Grid3X3 className="h-3.5 w-3.5" />
                </button>
                <button className="p-2 text-muted-c hover:text-base hover:bg-subtle transition-all">
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {mockProducts.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-10">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            {[1,2,3,4,5].map((pg) => (
              <button
                key={pg}
                className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                  pg === 1 ? "text-white shadow-primary" : "border border-base bg-surface text-muted-c hover:bg-subtle"
                }`}
                style={pg === 1 ? { background: "linear-gradient(135deg, #4B2D8F, #7C3AED)" } : undefined}
              >
                {pg}
              </button>
            ))}
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
