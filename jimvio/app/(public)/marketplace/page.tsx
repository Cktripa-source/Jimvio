import React from "react";
import Link from "next/link";
import { SlidersHorizontal, Grid3X3, List, Search, TrendingUp, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductCard } from "@/components/marketplace/product-card";
import { Separator } from "@/components/ui/separator";

const categories = [
  { name: "All Products", slug: "all", count: 52000 },
  { name: "Electronics", slug: "electronics", count: 12400 },
  { name: "Fashion", slug: "fashion", count: 8700 },
  { name: "Home & Garden", slug: "home-garden", count: 6200 },
  { name: "Digital Products", slug: "digital", count: 15000 },
  { name: "Online Courses", slug: "courses", count: 3800 },
  { name: "AI Tools", slug: "ai-tools", count: 2100 },
  { name: "Agriculture", slug: "agriculture", count: 4500 },
  { name: "Health & Beauty", slug: "health-beauty", count: 9300 },
  { name: "Software", slug: "software", count: 1800 },
  { name: "Templates", slug: "templates", count: 5400 },
  { name: "Ebooks", slug: "ebooks", count: 7600 },
];

// Mock products for display
const mockProducts = [
  { id: "1", name: "iPhone 15 Pro Max 256GB Titanium Black", slug: "iphone-15-pro-max", price: 850000, compare_at_price: 980000, rating: 4.9, review_count: 1240, is_featured: true, affiliate_enabled: true, vendors: { business_name: "TechZone Rwanda" }, images: [] },
  { id: "2", name: "Next.js 15 Full-Stack Mastery Course 2025", slug: "nextjs-mastery", price: 45000, compare_at_price: 90000, rating: 4.8, review_count: 892, is_digital: true, affiliate_enabled: true, vendors: { business_name: "DevAcademy" }, images: [] },
  { id: "3", name: "AI Business Automation Bundle", slug: "ai-automation-bundle", price: 75000, rating: 4.7, review_count: 567, is_digital: true, affiliate_enabled: true, vendors: { business_name: "AITools Pro" }, images: [] },
  { id: "4", name: "Premium Figma UI Kit 2025 – 500+ Components", slug: "figma-ui-kit", price: 35000, compare_at_price: 55000, rating: 4.9, review_count: 2103, is_digital: true, vendors: { business_name: "DesignLab" }, images: [] },
  { id: "5", name: "Samsung 65\" 4K QLED Smart TV", slug: "samsung-65-qled", price: 620000, compare_at_price: 750000, rating: 4.6, review_count: 435, affiliate_enabled: true, vendors: { business_name: "ElectroHub RW" }, images: [] },
  { id: "6", name: "Rwandan Coffee Premium Blend 1kg", slug: "rwanda-coffee-premium", price: 12000, rating: 4.8, review_count: 3820, is_featured: true, vendors: { business_name: "Café Rwanda" }, images: [] },
  { id: "7", name: "Python & Machine Learning Bootcamp", slug: "python-ml-bootcamp", price: 65000, compare_at_price: 120000, rating: 4.7, review_count: 1590, is_digital: true, affiliate_enabled: true, vendors: { business_name: "TechLearn Africa" }, images: [] },
  { id: "8", name: "Wireless Noise-Cancelling Headphones Pro", slug: "wireless-headphones-pro", price: 95000, compare_at_price: 130000, rating: 4.5, review_count: 678, affiliate_enabled: true, vendors: { business_name: "AudioZone" }, images: [] },
  { id: "9", name: "E-commerce Launch Checklist (Ebook)", slug: "ecommerce-launch-ebook", price: 8500, rating: 4.6, review_count: 2341, is_digital: true, affiliate_enabled: true, vendors: { business_name: "BizBooks RW" }, images: [] },
  { id: "10", name: "Solar Panel 200W Complete Kit", slug: "solar-panel-kit", price: 285000, rating: 4.7, review_count: 234, vendors: { business_name: "SolarPower Rwanda" }, images: [] },
  { id: "11", name: "Notion Business Templates Bundle", slug: "notion-templates", price: 18000, compare_at_price: 35000, rating: 4.8, review_count: 5672, is_digital: true, affiliate_enabled: true, vendors: { business_name: "ProductivityPro" }, images: [] },
  { id: "12", name: "Gym Equipment Home Set Complete", slug: "gym-equipment-home", price: 180000, compare_at_price: 220000, rating: 4.5, review_count: 189, vendors: { business_name: "FitRwanda" }, images: [] },
];

export default function MarketplacePage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-900/50 to-transparent border-b border-white/5 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-black text-white mb-1">Marketplace</h1>
              <p className="text-white/50 text-sm">52,000+ products from verified vendors</p>
            </div>
            <div className="flex items-center gap-3 max-w-lg w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search products, vendors, categories..."
                  className="w-full h-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm pl-9 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                />
              </div>
              <Button size="sm" variant="glass">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1.5">
              <Package className="h-3.5 w-3.5 text-brand-400" />
              52,000+ products
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              10,000+ vendors
            </span>
            <span className="text-white/20">•</span>
            <span>Showing 1–24 of 52,000</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/marketplace?cat=${cat.slug}`}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all group"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-white/30 group-hover:text-white/50">{(cat.count / 1000).toFixed(1)}K</span>
                  </Link>
                ))}
              </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div>
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Price Range</h3>
              <div className="space-y-2">
                {[
                  "Under RWF 10,000",
                  "RWF 10K – 50K",
                  "RWF 50K – 200K",
                  "RWF 200K – 500K",
                  "Above RWF 500K",
                ].map((range) => (
                  <label key={range} className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" className="accent-brand-500 w-3.5 h-3.5 rounded" />
                    <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{range}</span>
                  </label>
                ))}
              </div>
            </div>

            <Separator />

            {/* Product Type */}
            <div>
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Type</h3>
              <div className="space-y-2">
                {["Physical Products", "Digital Products", "Courses", "Software", "Templates"].map((type) => (
                  <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" className="accent-brand-500 w-3.5 h-3.5 rounded" />
                    <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <Separator />

            {/* Features */}
            <div>
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Features</h3>
              <div className="space-y-2">
                {["Affiliate Enabled", "Free Shipping", "Top Rated (4.5+)", "On Sale", "New Arrivals"].map((feature) => (
                  <label key={feature} className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" className="accent-brand-500 w-3.5 h-3.5 rounded" />
                    <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{feature}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default" className="cursor-pointer">All Products</Badge>
              <Badge variant="secondary" className="cursor-pointer">Trending</Badge>
              <Badge variant="secondary" className="cursor-pointer">New Arrivals</Badge>
              <Badge variant="secondary" className="cursor-pointer">On Sale</Badge>
              <Badge variant="success" className="cursor-pointer">
                <TrendingUp className="h-2.5 w-2.5" /> Affiliate Only
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Select defaultValue="trending">
                <SelectTrigger className="w-36 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="sales">Best Selling</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border border-white/10 rounded-xl overflow-hidden">
                <button className="p-2 bg-white/10 text-white hover:bg-white/20 transition-all">
                  <Grid3X3 className="h-3.5 w-3.5" />
                </button>
                <button className="p-2 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product as unknown as Parameters<typeof ProductCard>[0]["product"]} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-10">
            <Button variant="glass" size="sm" disabled>Previous</Button>
            {[1, 2, 3, 4, 5].map((page) => (
              <Button
                key={page}
                variant={page === 1 ? "default" : "glass"}
                size="sm"
                className="w-9"
              >
                {page}
              </Button>
            ))}
            <Button variant="glass" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
