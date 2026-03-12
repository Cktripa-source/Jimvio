"use client";
import React from "react";
import Link from "next/link";
import {
  ArrowRight, Star, CheckCircle, TrendingUp, Users,
  ShoppingBag, Link2, Video, MessageSquare, Shield,
  Package, BarChart3, Zap, ChevronRight, Play,
  Flame, Award, BookOpen, Monitor, ShoppingCart,
  Code2, Activity, Clock, ExternalLink, ChevronLeft,
  Megaphone, LayoutDashboard, Scissors, LineChart,
  Download, Bell, CalendarDays, Tag
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  DATA                                                                 */
/* ------------------------------------------------------------------ */

const featuredProducts = [
  { id: 1, title: "AI ChatGPT Prompts Guide",       img: "📘", price: 29,  originalPrice: 59,  rating: 4.8, reviews: 2882, category: "Ebook",   earn: "40%", badge: "Hot" },
  { id: 2, title: "Notion Ultimate Productivity Hub",img: "📓", price: 49,  originalPrice: null, rating: 4.7, reviews: 3811, category: "Template", earn: "35%", badge: "Best Seller" },
  { id: 3, title: "TikTok Growth Mastery Course",    img: "🎬", price: 99,  originalPrice: 199, rating: 4.9, reviews: 7387, category: "Course",   earn: "50%", badge: "Trending" },
  { id: 4, title: "Freelance Business Course",       img: "💼", price: 59,  originalPrice: 99,  rating: 4.8, reviews: 3712, category: "Course",   earn: "45%", badge: "New" },
];

const viralClips = [
  { id: 1, title: "Learn ChatGPT Prompts – Step by Step", thumbnail: "🎯", monthlyEarning: "15k", views: "284K", product: "Notion Course",     sales: 850,   tab: "trending" },
  { id: 2, title: "TikTok Growth Secrets Revealed",        thumbnail: "📱", monthlyEarning: "15k", views: "156K", product: "TikTok Mastery",   sales: 420,   tab: "trending" },
  { id: 3, title: "Freelance Income Blueprint 2025",        thumbnail: "💰", monthlyEarning: "459", views: "98K",  product: "Freelance Course", sales: 180,   tab: "trending" },
];

const affiliateHubCategories = [
  { label: "Ebooks",       icon: <BookOpen  className="h-6 w-6" />, color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600",  count: "2,400+" },
  { label: "Courses",      icon: <Monitor   className="h-6 w-6" />, color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600",  count: "1,800+" },
  { label: "Merchandise",  icon: <ShoppingCart className="h-6 w-6"/>, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",    count: "900+"   },
  { label: "Software",     icon: <Code2     className="h-6 w-6" />, color: "bg-green-100 dark:bg-green-900/30 text-green-600",    count: "650+"   },
];

const stats = [
  { value: "120k",  label: "Users"     },
  { value: "$8.2M", label: "Sales"     },
  { value: "3,400", label: "Creators"  },
  { value: "25k",   label: "Affiliates"},
];

/* ─── SIDEBAR DATA ─── */
const liveActivity = [
  { name: "John Itom Carada", action: "Joined Typing Device",      amount: "$45,250", time: "5 min ago", avatar: "JI" },
  { name: "AlexGrowth",       action: "Joined Typing Device",      amount: "$91,359", time: "12 min ago",avatar: "AG" },
  { name: "Lisa Teach",       action: "Joined Replies Meets",      amount: "$32,189", time: "18 min ago",avatar: "LT" },
];

const topAffiliates = [
  { name: "CreatorBoost",  niche: "Productivity & Design", rating: 4.8, conversions: "0.70 Referrals", avatar: "CB" },
  { name: "AlexGrowth",   niche: "Business Courses",       rating: 4.5, conversions: "1.90 Referrals", avatar: "AG" },
  { name: "CreatorBoost",  niche: "Lifestyle Fitness",      rating: 4.2, conversions: "0.70 Referrals", avatar: "CB" },
];

const toolsResources = [
  { label: "AI Marketing\nPromo Rates", icon: <Megaphone className="h-5 w-5" />,     color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600" },
  { label: "Sales\nTemplate",           icon: <Tag       className="h-5 w-5" />,     color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600" },
  { label: "Clip\nGrowth",             icon: <Scissors  className="h-5 w-5" />,     color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600"       },
  { label: "Growth\nDashboard",        icon: <LineChart className="h-5 w-5" />,     color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600"       },
];

const featuredVendors = [
  { name: "CreatorBoost", category: "Courses — Productivity Guides",  rating: 4.8, sales: "3,311 Titles", avatar: "CB" },
  { name: "AlexGrowth",  category: "Courses — Tutorials Topics",      rating: 3.1, sales: "5,033 Items",  avatar: "AG" },
  { name: "CreatorBoost", category: "Creative Productivity Courses",   rating: 3.7, sales: "6,021 Items",  avatar: "CB" },
];

const upcomingDrops = [
  { title: "AI Creator Toolkit", price: "$15",  date: "Tomorrow",  icon: "🤖", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600" },
  { title: "Influencer Growth",  price: "$10",  date: "In 2 days", icon: "📈", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600" },
  { title: "S4.BP: Tech",        price: "$24",  date: "Fri",       icon: "⚡", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600"       },
];

const categories = [
  { name: "Electronics",    slug: "electronics",  icon: "💻", count: "12.4K" },
  { name: "Fashion",        slug: "fashion",      icon: "👗", count: "8.7K"  },
  { name: "Digital",        slug: "digital",      icon: "💾", count: "15K"   },
  { name: "Courses",        slug: "courses",      icon: "📚", count: "3.8K"  },
  { name: "AI Tools",       slug: "ai-tools",     icon: "🤖", count: "2.1K"  },
  { name: "Agriculture",    slug: "agriculture",  icon: "🌱", count: "4.5K"  },
  { name: "Health",         slug: "health-beauty",icon: "💊", count: "9.3K"  },
  { name: "Home & Garden",  slug: "home-garden",  icon: "🏠", count: "6.2K"  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                                 */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <div className="page-wrapper">

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-10 overflow-hidden" style={{
        background: "linear-gradient(160deg, #f5f3ff 0%, #ede9fe 40%, #faf5ff 100%)"
      }}>
        <div className="dark:hidden absolute inset-0" style={{
          background: "linear-gradient(160deg, #f5f3ff 0%, #ede9fe 40%, #faf5ff 100%)"
        }} />
        <div className="hidden dark:block absolute inset-0" style={{
          background: "linear-gradient(160deg, #0A081C 0%, #130A2E 60%, #0A081C 100%)"
        }} />
        <div className="container-xl relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <Badge variant="default" className="mb-5 px-4 py-1.5 text-sm">
              🌍 Africa&apos;s #1 Creator-Commerce Platform
            </Badge>
            <h1 className="heading-xl text-base mb-5 text-balance">
              One Account.{" "}
              <span className="text-gradient">Every Role.</span>
              <br />Unlimited Income.
            </h1>
            <p className="text-lg text-muted-c mb-7 leading-relaxed">
              Buy, sell, affiliate, influence, and build communities — all under one platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/register">Get Started Free <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/marketplace"><Play className="h-4 w-4" /> Browse Marketplace</Link>
              </Button>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
            {categories.map((c) => (
              <Link key={c.slug} href={`/marketplace?cat=${c.slug}`}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-base shadow-card text-sm font-medium text-base hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-200 dark:hover:border-primary-800 transition-all cursor-pointer">
                  {c.icon} {c.name} <span className="text-muted-c text-xs">({c.count})</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN TWO-COLUMN LAYOUT ───────────────────────────────── */}
      <div className="container-xl py-8">
        <div className="flex gap-6 items-start">

          {/* ═══════════════════════════════════════════════════════
              LEFT / MAIN CONTENT
          ═══════════════════════════════════════════════════════ */}
          <div className="flex-1 min-w-0 space-y-8">

            {/* ── FEATURED PRODUCTS ──────────────────────────────── */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-accent-500" />
                  <h2 className="text-xl font-bold text-base">Featured Products</h2>
                  <div className="flex gap-0.5 ml-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-3.5 w-3.5 text-accent-500 fill-accent-500" />)}
                  </div>
                </div>
                <Link href="/marketplace" className="text-sm text-primary-700 dark:text-primary-300 hover:underline flex items-center gap-1">
                  View all <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {featuredProducts.map((p) => (
                  <Link key={p.id} href="/marketplace">
                    <div className="bg-surface rounded-2xl border border-base shadow-card hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group cursor-pointer">
                      {/* Thumbnail */}
                      <div className="relative aspect-video bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 flex items-center justify-center text-5xl overflow-hidden">
                        <span className="group-hover:scale-110 transition-transform duration-300">{p.img}</span>
                        <div className="absolute top-2 left-2 flex gap-1">
                          {p.badge === "Hot" && <span className="badge badge-red text-xs font-bold">{p.badge}</span>}
                          {p.badge === "Best Seller" && <span className="badge badge-orange text-xs font-bold">Best Seller</span>}
                          {p.badge === "Trending" && <span className="badge badge-purple text-xs font-bold">Trending</span>}
                          {p.badge === "New" && <span className="badge badge-blue text-xs font-bold">New</span>}
                        </div>
                        <div className="absolute top-2 right-2">
                          <span className="badge badge-green text-xs">+{p.earn}</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-muted-c mb-0.5">{p.category}</p>
                        <h3 className="text-sm font-semibold text-base mb-2 line-clamp-2 leading-snug group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                          {p.title}
                        </h3>
                        <div className="flex items-center gap-1 mb-2.5">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className={`h-3 w-3 ${i <= Math.floor(p.rating) ? "text-accent-500 fill-accent-500" : "text-muted-c/30"}`} />
                          ))}
                          <span className="text-xs text-muted-c ml-0.5">({p.reviews.toLocaleString()})</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <span className="font-bold text-primary-900 dark:text-primary-300 text-base">${p.price}</span>
                            {p.originalPrice && (
                              <span className="text-xs text-muted-c line-through ml-1">${p.originalPrice}</span>
                            )}
                          </div>
                          <button
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all active:scale-95"
                            style={{ background: "linear-gradient(135deg, #4B2D8F, #7C3AED)" }}
                            onClick={(e) => e.preventDefault()}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* ── VIRAL CLIPS ─────────────────────────────────────── */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-primary-700 dark:text-primary-300" />
                    <h2 className="text-xl font-bold text-base">Viral Clips</h2>
                  </div>
                  <div className="flex items-center gap-1 bg-subtle border border-base rounded-xl p-1">
                    {["Trending", "Best Sellers", "New Releases"].map((tab, i) => (
                      <button
                        key={tab}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          i === 0
                            ? "text-white shadow-primary"
                            : "text-muted-c hover:text-base"
                        }`}
                        style={i === 0 ? { background: "linear-gradient(135deg, #4B2D8F, #7C3AED)" } : undefined}
                      >
                        {i === 0 && <Flame className="h-3 w-3" />}
                        {i === 1 && <Award className="h-3 w-3" />}
                        {i === 2 && <Zap className="h-3 w-3" />}
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="btn btn-ghost btn-icon-sm"><ChevronLeft className="h-3.5 w-3.5" /></button>
                  <button className="btn btn-ghost btn-icon-sm"><ChevronRight className="h-3.5 w-3.5" /></button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {viralClips.map((clip) => (
                  <div key={clip.id} className="bg-surface rounded-2xl border border-base shadow-card overflow-hidden group">
                    {/* Video thumbnail */}
                    <div
                      className="relative aspect-video flex items-center justify-center text-5xl cursor-pointer"
                      style={{ background: "linear-gradient(135deg, #4B2D8F22, #7C3AED33), linear-gradient(135deg, #1a1030, #2d1f5e)" }}
                    >
                      <span className="group-hover:scale-110 transition-transform duration-200">{clip.thumbnail}</span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all cursor-pointer">
                          <Play className="h-5 w-5 text-white ml-0.5" />
                        </div>
                      </div>
                      {/* Platform icons overlay */}
                      <div className="absolute bottom-2 right-2 flex gap-1">
                        <span className="text-xs bg-black/40 text-white rounded px-1.5 py-0.5 backdrop-blur-sm">{clip.views} views</span>
                      </div>
                    </div>

                    <div className="p-3">
                      <p className="text-xs font-medium text-base mb-0.5 line-clamp-1">{clip.title}</p>
                      <p className="text-xs text-muted-c mb-2">{clip.product}</p>
                      <div className="flex items-center gap-1 mb-1">
                        {[1,2,3,4,5].map(i => <Star key={i} className="h-2.5 w-2.5 text-accent-500 fill-accent-500" />)}
                      </div>
                      <p className="text-xs text-muted-c mb-2">
                        Earning to <span className="font-bold text-base">${clip.monthlyEarning}/sale</span> · {clip.sales} sales
                      </p>
                      <button
                        className="w-full py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95"
                        style={{ background: "linear-gradient(135deg, #4B2D8F, #7C3AED)" }}
                      >
                        <Megaphone className="h-3 w-3 inline-block mr-1" /> Promote
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── AFFILIATE & INFLUENCER HUB ──────────────────────── */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Link2 className="h-5 w-5 text-primary-700 dark:text-primary-300" />
                  <h2 className="text-xl font-bold text-base">Affiliate & Influencer Hub</h2>
                </div>
                <div className="flex gap-1">
                  <button className="btn btn-ghost btn-icon-sm"><ChevronLeft className="h-3.5 w-3.5" /></button>
                  <button className="btn btn-ghost btn-icon-sm"><ChevronRight className="h-3.5 w-3.5" /></button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {affiliateHubCategories.map((cat) => (
                  <Link key={cat.label} href={`/marketplace?type=${cat.label.toLowerCase()}`}>
                    <div className="bg-surface rounded-2xl border border-base shadow-card hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200 p-4 text-center group cursor-pointer">
                      <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                        {cat.icon}
                      </div>
                      <p className="font-semibold text-sm text-base">{cat.label}</p>
                      <p className="text-xs text-muted-c mt-0.5">{cat.count} products</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Stats + Testimonial Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Testimonial */}
                <div className="rounded-2xl overflow-hidden relative p-5 flex items-center gap-4"
                  style={{ background: "linear-gradient(135deg, #4B2D8F 0%, #7C3AED 100%)" }}>
                  <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "radial-gradient(circle at 80% 50%, #F5A623 0%, transparent 60%)" }} />
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl shrink-0 relative z-10">
                    👨‍💼
                  </div>
                  <div className="relative z-10">
                    <p className="text-white text-sm leading-relaxed">
                      &ldquo;I made{" "}
                      <span className="font-black text-accent-300" style={{ color: "#F5A623" }}>$12,000</span>
                      {" "}selling my course on Jimvio in 3 months.&rdquo;
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-purple-200">— Rising Influencer</span>
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: "#F5A623", color: "#fff" }}
                      >
                        Rising Influencer
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((s) => (
                    <div key={s.label} className="bg-surface rounded-2xl border border-base shadow-card p-4 text-center">
                      <p className="text-2xl font-extrabold text-gradient mb-0.5">{s.value}</p>
                      <p className="text-xs text-muted-c font-medium">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── MARKETPLACE PREVIEW ─────────────────────────────── */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-primary-700 dark:text-primary-300" />
                  <h2 className="text-xl font-bold text-base">Marketplace</h2>
                  <Badge variant="default" className="text-xs">52,000+ products</Badge>
                </div>
                <Link href="/marketplace" className="text-sm text-primary-700 dark:text-primary-300 hover:underline flex items-center gap-1">
                  Open Marketplace <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  { name: "Samsung 65\" QLED TV",       price: "RWF 620,000", emoji: "📺", vendor: "ElectroHub",  rating: 4.6, earn: "8%",  reviews: 435 },
                  { name: "Python ML Bootcamp 2025",     price: "RWF 65,000",  emoji: "🐍", vendor: "TechLearn",   rating: 4.7, earn: "40%", reviews: 1590 },
                  { name: "Premium Figma UI Kit",         price: "RWF 35,000",  emoji: "🎨", vendor: "DesignLab",   rating: 4.9, earn: "50%", reviews: 2103 },
                  { name: "Wireless Headphones Pro",      price: "RWF 95,000",  emoji: "🎧", vendor: "AudioZone",   rating: 4.5, earn: "12%", reviews: 678  },
                ].map((p, i) => (
                  <Link key={i} href="/marketplace">
                    <div className="bg-surface rounded-2xl border border-base shadow-card hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group cursor-pointer">
                      <div className="aspect-square bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 flex items-center justify-center text-5xl relative">
                        <span className="group-hover:scale-110 transition-transform duration-300">{p.emoji}</span>
                        <span className="absolute top-2 right-2 badge badge-green text-xs">+{p.earn}</span>
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-muted-c mb-0.5">{p.vendor}</p>
                        <p className="text-sm font-semibold text-base mb-2 line-clamp-2 leading-snug">{p.name}</p>
                        <div className="flex items-center gap-1 mb-2">
                          {[1,2,3,4,5].map(i => <Star key={i} className={`h-3 w-3 ${i <= Math.floor(p.rating) ? "text-accent-500 fill-accent-500" : "text-muted-c/30"}`} />)}
                          <span className="text-xs text-muted-c ml-0.5">({p.reviews.toLocaleString()})</span>
                        </div>
                        <p className="font-bold text-primary-900 dark:text-primary-300 text-sm">{p.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-4 text-center">
                <Button variant="outline" size="lg" asChild>
                  <Link href="/marketplace">
                    Browse All 52,000+ Products <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </section>

            {/* ── HOW IT WORKS ───────────────────────────────────── */}
            <section>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-base mb-2">Start Earning in <span className="text-gradient">4 Steps</span></h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { s: "01", icon: "👤", t: "Create Account",    d: "Sign up free. One account for all roles." },
                  { s: "02", icon: "⚡", t: "Activate Roles",     d: "Enable Vendor, Affiliate, or Influencer." },
                  { s: "03", icon: "🚀", t: "Start Earning",      d: "Sell, promote, or build a community." },
                  { s: "04", icon: "💰", t: "Get Paid Fast",       d: "Withdraw via Irembopay instantly." },
                ].map((s, i) => (
                  <div key={i} className="bg-surface rounded-2xl border border-base shadow-card p-5 text-center group hover:shadow-card-md transition-all duration-200">
                    <div className="text-xs font-black text-muted-c/30 mb-2 tracking-widest">{s.s}</div>
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">{s.icon}</div>
                    <h3 className="font-semibold text-sm text-base mb-1">{s.t}</h3>
                    <p className="text-xs text-muted-c leading-relaxed">{s.d}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* ═══════════════════════════════════════════════════════
              RIGHT SIDEBAR
          ═══════════════════════════════════════════════════════ */}
          <aside className="hidden xl:flex flex-col gap-5 w-72 shrink-0">

            {/* ── LIVE ACTIVITY ───────────────────────────────────── */}
            <div className="bg-surface rounded-2xl border border-base shadow-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="text-sm font-bold text-base">Live Activity</h3>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-2.5 w-2.5 text-accent-500 fill-accent-500" />)}
                  </div>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-muted-c" />
              </div>
              <div className="space-y-3">
                {liveActivity.map((a, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: "linear-gradient(135deg, #4B2D8F, #7C3AED)" }}>
                      {a.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-base truncate">{a.name}</p>
                      <p className="text-xs text-muted-c truncate">{a.action}</p>
                      <p className="text-xs text-muted-c">{a.time}</p>
                    </div>
                    <span className="text-xs font-bold text-primary-900 dark:text-primary-300 shrink-0">{a.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── TOP AFFILIATES ──────────────────────────────────── */}
            <div className="bg-surface rounded-2xl border border-base shadow-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary-700 dark:text-primary-300" />
                  <h3 className="text-sm font-bold text-base">Top Affiliates</h3>
                </div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-2.5 w-2.5 text-accent-500 fill-accent-500" />)}
                </div>
              </div>
              <div className="space-y-3">
                {topAffiliates.map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: i === 1 ? "linear-gradient(135deg, #F5A623, #d97706)" : "linear-gradient(135deg, #4B2D8F, #7C3AED)" }}>
                      {a.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-base">{a.name}</p>
                        <div className="flex gap-0.5 ml-1">
                          {[1,2,3,4].map(j => <Star key={j} className={`h-2.5 w-2.5 ${j <= Math.floor(a.rating) ? "text-accent-500 fill-accent-500" : "text-muted-c/30"}`} />)}
                        </div>
                      </div>
                      <p className="text-xs text-muted-c truncate">{a.niche}</p>
                      <p className="text-xs text-muted-c">{a.conversions}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── TOOLS & RESOURCES ───────────────────────────────── */}
            <div className="bg-surface rounded-2xl border border-base shadow-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary-700 dark:text-primary-300" />
                  <h3 className="text-sm font-bold text-base">Tools & Resources</h3>
                </div>
                <div className="flex gap-1">
                  <button className="btn btn-ghost btn-icon-sm"><ChevronLeft className="h-3 w-3" /></button>
                  <button className="btn btn-ghost btn-icon-sm"><ChevronRight className="h-3 w-3" /></button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {toolsResources.map((t, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer group">
                    <div className={`w-11 h-11 rounded-xl ${t.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      {t.icon}
                    </div>
                    <p className="text-[10px] text-muted-c text-center leading-tight whitespace-pre-line">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── FEATURED VENDORS ────────────────────────────────── */}
            <div className="bg-surface rounded-2xl border border-base shadow-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary-700 dark:text-primary-300" />
                  <h3 className="text-sm font-bold text-base">Featured Vendors</h3>
                </div>
              </div>
              <div className="space-y-3">
                {featuredVendors.map((v, i) => (
                  <div key={i} className="flex items-start gap-2.5 cursor-pointer group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0 group-hover:scale-105 transition-transform"
                      style={{ background: "linear-gradient(135deg, #4B2D8F, #7C3AED)" }}>
                      {v.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-semibold text-base group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">{v.name}</p>
                        <div className="flex gap-0.5 items-center shrink-0">
                          <Star className="h-2.5 w-2.5 text-accent-500 fill-accent-500" />
                          <span className="text-xs font-semibold text-base">{v.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-c truncate">{v.category}</p>
                      <p className="text-xs text-muted-c">{v.sales}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/vendors" className="mt-3 block text-center text-xs text-primary-700 dark:text-primary-300 hover:underline">
                View all vendors →
              </Link>
            </div>

            {/* ── UPCOMING DROPS ──────────────────────────────────── */}
            <div className="bg-surface rounded-2xl border border-base shadow-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary-700 dark:text-primary-300" />
                  <h3 className="text-sm font-bold text-base">Upcoming Drops</h3>
                </div>
                <button className="text-xs text-primary-700 dark:text-primary-300 hover:underline flex items-center gap-0.5">
                  More <ChevronRight className="h-3 w-3" />
                </button>
              </div>
              <div className="space-y-3">
                {upcomingDrops.map((d, i) => (
                  <div key={i} className="flex items-center gap-2.5 cursor-pointer group">
                    <div className={`w-9 h-9 rounded-xl ${d.color} flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform`}>
                      {d.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-base">{d.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-primary-900 dark:text-primary-300">{d.price}</span>
                        <span className="text-xs text-muted-c flex items-center gap-0.5">
                          <Clock className="h-2.5 w-2.5" /> {d.date}
                        </span>
                      </div>
                    </div>
                    <Bell className="h-3.5 w-3.5 text-muted-c group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* ── JOIN CTA ─────────────────────────────────────────── */}
            <div className="rounded-2xl overflow-hidden relative p-5 text-center"
              style={{ background: "linear-gradient(135deg, #4B2D8F 0%, #7C3AED 100%)" }}>
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #F5A623 0%, transparent 50%)" }} />
              <div className="relative z-10">
                <p className="text-white font-bold mb-1 text-sm">Ready to start earning?</p>
                <p className="text-purple-200 text-xs mb-3">Join 35,000+ creators today</p>
                <Button size="sm" asChild className="w-full bg-white hover:bg-purple-50" style={{ color: "#4B2D8F" }}>
                  <Link href="/register">Create Free Account</Link>
                </Button>
              </div>
            </div>

          </aside>
        </div>
      </div>

      {/* ── FULL-WIDTH CTA BANNER ───────────────────────────────── */}
      <section className="container-xl py-8">
        <div className="relative rounded-3xl overflow-hidden px-10 py-14 text-center"
          style={{ background: "linear-gradient(135deg, #4B2D8F 0%, #7C3AED 60%, #9333ea 100%)" }}>
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 0%, transparent 60%), radial-gradient(circle at 80% 50%, #F5A623 0%, transparent 60%)" }}
          />
          <div className="relative z-10">
            <p className="text-purple-200 text-sm font-semibold uppercase tracking-widest mb-3">Free Forever Plan Available</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Build Your Creator Empire
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm text-purple-100">
              {["35,000+ Creators", "RWF 2.4B+ Paid Out", "50+ Countries", "99.9% Uptime"].map((s, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-purple-300" /> {s}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" asChild className="bg-white hover:bg-purple-50 shadow-card-lg" style={{ color: "#4B2D8F" }}>
                <Link href="/register">Create Free Account <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button size="lg" asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
