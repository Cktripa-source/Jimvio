import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Zap, TrendingUp, Users, ShoppingBag, Star,
  Globe, Shield, CheckCircle, Play, ChevronRight, Sparkles,
  Package, Link2, Video, MessageSquare, BarChart3, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Active Vendors", value: "10,000+", icon: "🏪" },
  { label: "Products Listed", value: "500K+", icon: "📦" },
  { label: "Affiliates", value: "25,000+", icon: "🔗" },
  { label: "Countries", value: "50+", icon: "🌍" },
];

const categories = [
  { name: "Electronics", slug: "electronics", icon: "💻", count: "12,400", color: "from-blue-600 to-cyan-600" },
  { name: "Fashion", slug: "fashion", icon: "👗", count: "8,700", color: "from-pink-600 to-rose-600" },
  { name: "Home & Garden", slug: "home-garden", icon: "🏠", count: "6,200", color: "from-emerald-600 to-teal-600" },
  { name: "Digital Products", slug: "digital", icon: "💾", count: "15,000", color: "from-brand-600 to-accent-600" },
  { name: "Courses", slug: "courses", icon: "📚", count: "3,800", color: "from-amber-600 to-orange-600" },
  { name: "AI Tools", slug: "ai-tools", icon: "🤖", count: "2,100", color: "from-cyan-600 to-blue-600" },
  { name: "Agriculture", slug: "agriculture", icon: "🌱", count: "4,500", color: "from-green-600 to-emerald-600" },
  { name: "Health & Beauty", slug: "health-beauty", icon: "💊", count: "9,300", color: "from-purple-600 to-pink-600" },
];

const howItWorks = [
  {
    step: "01",
    title: "Create Your Account",
    description: "Sign up in seconds. One account gives you access to all platform roles — buyer, vendor, affiliate, influencer, and community.",
    icon: <Users className="h-6 w-6" />,
    color: "from-brand-600 to-accent-600",
  },
  {
    step: "02",
    title: "Choose Your Role",
    description: "Activate any combination of roles from your dashboard. Switch between buyer, vendor, affiliate, and influencer modes seamlessly.",
    icon: <Zap className="h-6 w-6" />,
    color: "from-accent-600 to-pink-600",
  },
  {
    step: "03",
    title: "Start Earning",
    description: "Sell products, earn affiliate commissions, run influencer campaigns, or charge community memberships. Multiple income streams.",
    icon: <TrendingUp className="h-6 w-6" />,
    color: "from-emerald-600 to-teal-600",
  },
  {
    step: "04",
    title: "Get Paid Instantly",
    description: "Receive payouts directly to your Irembopay account. Fast, secure, and reliable payments with full transaction history.",
    icon: <BarChart3 className="h-6 w-6" />,
    color: "from-amber-600 to-orange-600",
  },
];

const features = [
  {
    icon: <ShoppingBag className="h-5 w-5" />,
    title: "Global Marketplace",
    description: "Physical & digital products. Alibaba-style bulk pricing, variants, and inventory management.",
    color: "from-brand-600 to-accent-600",
  },
  {
    icon: <Link2 className="h-5 w-5" />,
    title: "Affiliate Network",
    description: "ClickBank-style affiliate system. Generate links, track clicks, earn commissions automatically.",
    color: "from-emerald-600 to-teal-600",
  },
  {
    icon: <Video className="h-5 w-5" />,
    title: "Viral Clip Engine",
    description: "Upload marketing videos. Influencers download and share your clips. Track every view and conversion.",
    color: "from-pink-600 to-rose-600",
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: "Paid Communities",
    description: "Launch your subscription community. Monthly, yearly, or lifetime plans. Exclusive content and discussions.",
    color: "from-amber-600 to-orange-600",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Advanced Analytics",
    description: "Real-time dashboards for every role. Track sales, clicks, conversions, and community growth.",
    color: "from-cyan-600 to-blue-600",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Secure Payments",
    description: "Irembopay integration for fast, secure local and international payments with fraud protection.",
    color: "from-purple-600 to-brand-600",
  },
];

const trendingProducts = [
  { name: "iPhone 15 Pro Max", price: "RWF 850,000", rating: 4.9, reviews: 1240, image: "📱", vendor: "TechZone RW", badge: "Hot" },
  { name: "Next.js 15 Mastery Course", price: "RWF 45,000", rating: 4.8, reviews: 892, image: "💻", vendor: "DevAcademy", badge: "Best Seller" },
  { name: "AI Business Automation Pack", price: "RWF 75,000", rating: 4.7, reviews: 567, image: "🤖", vendor: "AITools Pro", badge: "New" },
  { name: "Premium UI Kit 2025", price: "RWF 35,000", rating: 4.9, reviews: 2103, image: "🎨", vendor: "DesignLab", badge: "Top Rated" },
];

const testimonials = [
  {
    name: "Jean-Pierre Uwimana",
    role: "Vendor & Affiliate",
    avatar: "👨🏿‍💼",
    content: "JIMVIO changed everything. In 3 months I went from zero to RWF 2M monthly selling digital products AND earning affiliate commissions.",
    rating: 5,
    earnings: "RWF 2M/mo",
  },
  {
    name: "Amina Mukamana",
    role: "Influencer",
    avatar: "👩🏿‍🎤",
    content: "The viral clip engine is genius. I download vendor clips, add my touch, post on TikTok and Instagram, and earn per conversion automatically.",
    rating: 5,
    earnings: "RWF 800K/mo",
  },
  {
    name: "Eric Nzabahimana",
    role: "Community Owner",
    avatar: "👨🏿‍🏫",
    content: "I launched my tech community with 500 paying members in the first month. JIMVIO makes it so easy to monetize your expertise.",
    rating: 5,
    earnings: "RWF 1.5M/mo",
  },
];

const topVendors = [
  { name: "TechZone Rwanda", sales: "12,400", rating: 4.9, emoji: "🏪", category: "Electronics" },
  { name: "Fashion Forward", sales: "8,700", rating: 4.8, emoji: "👗", category: "Fashion" },
  { name: "Digital Masters", sales: "15,000", rating: 4.9, emoji: "💻", category: "Digital" },
  { name: "AgriPlus Rwanda", sales: "6,200", rating: 4.7, emoji: "🌱", category: "Agriculture" },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
        {/* Mesh gradient background */}
        <div className="absolute inset-0 mesh-gradient opacity-60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950 pointer-events-none" />

        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-600/20 blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-600/20 blur-3xl animate-float pointer-events-none" style={{ animationDelay: "3s" }} />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <Badge variant="glass" className="mb-6 px-4 py-2 text-sm">
            <Sparkles className="h-3.5 w-3.5 text-brand-400" />
            <span>Africa&apos;s #1 Creator-Commerce Platform</span>
            <span className="text-brand-400">→</span>
          </Badge>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
            One Platform.{" "}
            <span className="gradient-text">Infinite</span>
            <br />
            Income Streams.
          </h1>

          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            JIMVIO combines a global marketplace, affiliate network, influencer platform,
            and community builder — all in one account. Buy, sell, earn, and grow.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="xl" asChild className="group">
              <Link href="/register">
                Get Started Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="xl" variant="glass" asChild>
              <Link href="/marketplace">
                <Play className="h-5 w-5" />
                Browse Marketplace
              </Link>
            </Button>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-4 text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES GRID ── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="default" className="mb-3">Categories</Badge>
            <h2 className="text-4xl font-black text-white mb-3">
              Shop Every <span className="gradient-text">Category</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              From physical goods to digital products — find everything in one place.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/marketplace?cat=${cat.slug}`}>
                <div className="glass-card-hover p-5 text-center group">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mx-auto mb-3 text-2xl group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">{cat.name}</p>
                  <p className="text-white/40 text-xs">{cat.count} products</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/marketplace">
                View All Categories <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── TRENDING PRODUCTS ── */}
      <section className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Badge variant="accent" className="mb-3">Trending Now</Badge>
              <h2 className="text-4xl font-black text-white">
                Hot <span className="gradient-text">Products</span>
              </h2>
            </div>
            <Button variant="outline" asChild>
              <Link href="/marketplace">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, i) => (
              <Link key={i} href="/marketplace">
                <div className="product-card group">
                  <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-6xl relative overflow-hidden">
                    <span className="group-hover:scale-110 transition-transform duration-300">{product.image}</span>
                    <div className={`absolute top-3 left-3`}>
                      <Badge variant={product.badge === "Hot" ? "destructive" : product.badge === "Best Seller" ? "success" : product.badge === "New" ? "default" : "accent"}>
                        {product.badge}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-white/40 mb-1">{product.vendor}</p>
                    <p className="text-white font-semibold text-sm mb-2 line-clamp-2">{product.name}</p>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-white font-medium">{product.rating}</span>
                      <span className="text-xs text-white/30">({product.reviews.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-brand-400 font-bold">{product.price}</span>
                      <Button size="icon-sm" variant="glass">
                        <ShoppingBag className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="success" className="mb-3">Everything You Need</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              One Platform. <span className="gradient-text">Every Tool.</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              JIMVIO replaces 5 different platforms with a single unified ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Card key={i} hover className="group">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform`}>
                    {f.icon}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-4 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="default" className="mb-3">How It Works</Badge>
            <h2 className="text-4xl font-black text-white mb-4">
              Start Earning in <span className="gradient-text">4 Simple Steps</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, i) => (
              <div key={i} className="relative">
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-white/20 to-transparent z-10" />
                )}
                <div className="glass-card p-6 text-center group hover:bg-white/10 transition-all duration-300">
                  <div className="text-xs font-black text-white/20 mb-4 tracking-widest">{step.step}</div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform shadow-brand`}>
                    {step.icon}
                  </div>
                  <h3 className="text-white font-bold mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP VENDORS ── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Badge variant="warning" className="mb-3">Top Sellers</Badge>
              <h2 className="text-4xl font-black text-white">
                Trusted <span className="gradient-text">Vendors</span>
              </h2>
            </div>
            <Button variant="outline" asChild>
              <Link href="/vendors">All Vendors</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {topVendors.map((vendor, i) => (
              <Link key={i} href="/vendors">
                <div className="glass-card-hover p-5 text-center group">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{vendor.emoji}</div>
                  <p className="text-white font-semibold mb-1">{vendor.name}</p>
                  <p className="text-xs text-white/40 mb-3">{vendor.category}</p>
                  <div className="flex items-center justify-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="h-3 w-3 fill-amber-400" />
                      {vendor.rating}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/50">{vendor.sales} sales</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-4 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="success" className="mb-3">Success Stories</Badge>
            <h2 className="text-4xl font-black text-white mb-4">
              Real People. <span className="gradient-text">Real Earnings.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} gradient hover>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{t.avatar}</div>
                      <div>
                        <p className="text-white font-semibold text-sm">{t.name}</p>
                        <p className="text-white/50 text-xs">{t.role}</p>
                      </div>
                    </div>
                    <Badge variant="success" className="text-xs">{t.earnings}</Badge>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {Array(t.rating).fill(0).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed italic">&ldquo;{t.content}&rdquo;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROLES SHOWCASE ── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="default" className="mb-3">Multi-Role Platform</Badge>
            <h2 className="text-4xl font-black text-white mb-4">
              One Account. <span className="gradient-text">Every Role.</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Activate any role from your dashboard. No separate accounts. No extra fees.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { role: "Buyer", icon: <ShoppingBag className="h-6 w-6" />, desc: "Shop global marketplace", color: "from-blue-600 to-cyan-600" },
              { role: "Vendor", icon: <Package className="h-6 w-6" />, desc: "Sell products globally", color: "from-brand-600 to-accent-600" },
              { role: "Affiliate", icon: <Link2 className="h-6 w-6" />, desc: "Earn commissions", color: "from-emerald-600 to-teal-600" },
              { role: "Influencer", icon: <Video className="h-6 w-6" />, desc: "Promote campaigns", color: "from-pink-600 to-rose-600" },
              { role: "Community", icon: <Users className="h-6 w-6" />, desc: "Build paid communities", color: "from-amber-600 to-orange-600" },
            ].map((r, i) => (
              <div key={i} className="glass-card-hover p-5 text-center group">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${r.color} flex items-center justify-center mx-auto mb-3 text-white group-hover:scale-110 transition-transform`}>
                  {r.icon}
                </div>
                <p className="text-white font-bold text-sm mb-1">{r.role}</p>
                <p className="text-white/40 text-xs">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative glass-card border-brand-500/30 overflow-hidden p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 to-accent-600/20 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-brand-500 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Award className="h-6 w-6 text-brand-400" />
                <Badge variant="glass">Start for Free • No Credit Card Required</Badge>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Ready to Build Your<br />
                <span className="gradient-text">Creator Empire?</span>
              </h2>
              <p className="text-white/60 mb-8 text-lg max-w-xl mx-auto">
                Join 35,000+ creators, vendors, and affiliates already earning on JIMVIO.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="xl" asChild className="group animate-pulse-glow">
                  <Link href="/register">
                    Create Free Account
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="xl" variant="glass" asChild>
                  <Link href="/pricing">
                    View Pricing
                  </Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6 text-xs text-white/40">
                {["Free forever plan", "No setup fees", "Cancel anytime"].map((item, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}