import React from "react";
import Link from "next/link";
import {
  ArrowRight, Star, CheckCircle, TrendingUp, Users,
  ShoppingBag, Link2, Video, MessageSquare, Shield,
  Package, BarChart3, Zap, ChevronRight, Play,
  Flame, BookOpen, Monitor, ShoppingCart, Code2,
  Activity, Clock, CalendarDays, Bell, Megaphone,
  Scissors, LineChart, Tag
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  getCategories, getFeaturedProducts, getTrendingProducts,
  getViralClips, getCommunities, getTopVendors, getPlatformStats,
} from "@/services/db";
import { formatCurrency } from "@/lib/utils";
import { HomepageClientShell } from "@/components/shared/homepage-client-shell";

// ─────────────────────────────────────────────────────────────────
// Server component — fetches all dynamic data in parallel
// ─────────────────────────────────────────────────────────────────
export default async function HomePage() {
  const [categories, featured, trending, clips, communities, vendors, platformStats] =
    await Promise.all([
      getCategories().catch(() => []),
      getFeaturedProducts(4).catch(() => []),
      getTrendingProducts(8).catch(() => []),
      getViralClips(3).catch(() => []),
      getCommunities(3).catch(() => []),
      getTopVendors(4).catch(() => []),
      getPlatformStats().catch(() => ({ totalUsers: 0, totalVendors: 0, totalProducts: 0 })),
    ]);

  const siteStats = [
    { value: `${platformStats.totalVendors > 0 ? platformStats.totalVendors.toLocaleString() : "10,000"}+`, label: "Active Vendors",   icon: "🏪" },
    { value: `${platformStats.totalProducts > 0 ? platformStats.totalProducts.toLocaleString() : "500K"}+`,  label: "Products Listed", icon: "📦" },
    { value: "25,000+",  label: "Affiliates", icon: "🔗" },
    { value: "50+",      label: "Countries",  icon: "🌍" },
  ];

  // Fallback categories if DB empty
  const displayCategories = categories.length > 0 ? categories.slice(0, 8) : [
    { id: "1", slug: "electronics",  name: "Electronics",   icon: "💻" },
    { id: "2", slug: "fashion",      name: "Fashion",       icon: "👗" },
    { id: "3", slug: "digital",      name: "Digital",       icon: "💾" },
    { id: "4", slug: "courses",      name: "Courses",       icon: "📚" },
    { id: "5", slug: "ai-tools",     name: "AI Tools",      icon: "🤖" },
    { id: "6", slug: "agriculture",  name: "Agriculture",   icon: "🌱" },
    { id: "7", slug: "health-beauty",name: "Health",        icon: "💊" },
    { id: "8", slug: "home-garden",  name: "Home & Garden", icon: "🏠" },
  ];

  return (
    <div className="page-wrapper">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-10 overflow-hidden" style={{
        background: "linear-gradient(160deg, #f5f3ff 0%, #ede9fe 40%, #faf5ff 100%)"
      }}>
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

          {/* Platform stats (dynamic) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-6">
            {siteStats.map((s) => (
              <div key={s.label} className="bg-surface rounded-2xl border border-base shadow-card p-4 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xl font-extrabold text-base">{s.value}</div>
                <div className="text-xs text-muted-c mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Category pills (dynamic from DB) */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {displayCategories.map((c) => (
              <Link key={c.slug} href={`/marketplace?cat=${c.slug}`}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-base shadow-card text-sm font-medium text-base hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-200 dark:hover:border-primary-800 transition-all cursor-pointer">
                  {c.icon} {c.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN TWO-COLUMN LAYOUT ─────────────────────────────── */}
      <div className="container-xl py-8">
        <div className="flex gap-6 items-start">

          {/* ══════════════════════════════════════════
              MAIN CONTENT
          ══════════════════════════════════════════ */}
          <div className="flex-1 min-w-0 space-y-10">

            {/* ── FEATURED PRODUCTS (dynamic) ───────── */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-accent-500" />
                  <h2 className="text-xl font-bold text-base">Featured Products</h2>
                  {featured.length > 0 && (
                    <div className="flex gap-0.5 ml-1">
                      {[1,2,3,4,5].map(i => <Star key={i} className="h-3.5 w-3.5 text-accent-500 fill-accent-500" />)}
                    </div>
                  )}
                </div>
                <Link href="/marketplace?featured=1" className="text-sm text-primary-700 dark:text-primary-300 hover:underline flex items-center gap-1">
                  View all <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {featured.length > 0 ? (
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                  {featured.map((p: Record<string, unknown>) => (
                    <ProductCard key={p.id as string} product={p} />
                  ))}
                </div>
              ) : (
                <EmptyProductsCard
                  label="No featured products yet"
                  sub="Vendors will feature their best products here."
                  href="/marketplace"
                />
              )}
            </section>

            {/* ── VIRAL CLIPS (dynamic) ─────────────── */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary-700 dark:text-primary-300" />
                  <h2 className="text-xl font-bold text-base">Viral Clips</h2>
                  <div className="flex items-center gap-1 bg-subtle border border-base rounded-xl p-1">
                    {["Trending", "Best Sellers", "New Releases"].map((tab, i) => (
                      <span
                        key={tab}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={i === 0 ? { background: "linear-gradient(135deg, #4B2D8F, #7C3AED)", color: "white" } : { color: "var(--tw-text-muted)" }}
                      >
                        {i === 0 && <Flame className="h-3 w-3" />}
                        {tab}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {clips.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {clips.map((clip: Record<string, unknown>) => (
                    <ClipCard key={clip.id as string} clip={clip} />
                  ))}
                </div>
              ) : (
                <EmptyProductsCard
                  label="No viral clips yet"
                  sub="Vendors will upload marketing videos for influencers to promote."
                  href="/dashboard/clips"
                />
              )}
            </section>

            {/* ── AFFILIATE & INFLUENCER HUB ─────────── */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Link2 className="h-5 w-5 text-primary-700 dark:text-primary-300" />
                  <h2 className="text-xl font-bold text-base">Affiliate & Influencer Hub</h2>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Ebooks",      icon: <BookOpen      className="h-6 w-6" />, color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600", slug: "ebooks" },
                  { label: "Courses",     icon: <Monitor       className="h-6 w-6" />, color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600", slug: "courses" },
                  { label: "Merchandise", icon: <ShoppingCart  className="h-6 w-6" />, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",       slug: "physical" },
                  { label: "Software",    icon: <Code2         className="h-6 w-6" />, color: "bg-green-100 dark:bg-green-900/30 text-green-600",    slug: "software" },
                ].map((cat) => (
                  <Link key={cat.label} href={`/marketplace?type=${cat.slug}`}>
                    <div className="bg-surface rounded-2xl border border-base shadow-card hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200 p-4 text-center group cursor-pointer">
                      <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                        {cat.icon}
                      </div>
                      <p className="font-semibold text-sm text-base">{cat.label}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Stats + Testimonial */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden relative p-5 flex items-center gap-4"
                  style={{ background: "linear-gradient(135deg, #4B2D8F 0%, #7C3AED 100%)" }}>
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, #F5A623 0%, transparent 60%)" }} />
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl shrink-0 relative z-10">👨‍💼</div>
                  <div className="relative z-10">
                    <p className="text-white text-sm leading-relaxed">
                      &ldquo;I made <span className="font-black" style={{ color: "#F5A623" }}>$12,000</span> selling my course on Jimvio in 3 months.&rdquo;
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-purple-200">— Rising Influencer</span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "#F5A623", color: "#fff" }}>Rising Influencer</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: platformStats.totalUsers > 0 ? `${(platformStats.totalUsers / 1000).toFixed(0)}k` : "120k", label: "Users" },
                    { value: "$8.2M",  label: "Sales" },
                    { value: "3,400",  label: "Creators" },
                    { value: "25k",    label: "Affiliates" },
                  ].map((s) => (
                    <div key={s.label} className="bg-surface rounded-2xl border border-base shadow-card p-4 text-center">
                      <p className="text-2xl font-extrabold text-gradient mb-0.5">{s.value}</p>
                      <p className="text-xs text-muted-c font-medium">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── MARKETPLACE PREVIEW (dynamic) ──────── */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-primary-700 dark:text-primary-300" />
                  <h2 className="text-xl font-bold text-base">Marketplace</h2>
                  <Badge variant="default" className="text-xs">
                    {platformStats.totalProducts > 0 ? `${platformStats.totalProducts.toLocaleString()}+` : "52,000+"} products
                  </Badge>
                </div>
                <Link href="/marketplace" className="text-sm text-primary-700 dark:text-primary-300 hover:underline flex items-center gap-1">
                  Open Marketplace <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {trending.length > 0 ? (
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                  {trending.slice(0, 4).map((p: Record<string, unknown>) => (
                    <ProductCard key={p.id as string} product={p} />
                  ))}
                </div>
              ) : (
                <EmptyProductsCard
                  label="Marketplace is empty"
                  sub="Be the first to list a product!"
                  href="/register"
                />
              )}
              <div className="mt-4 text-center">
                <Button variant="outline" size="lg" asChild>
                  <Link href="/marketplace">Browse All Products <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
            </section>

            {/* ── HOW IT WORKS ─────────────────────────── */}
            <section>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-base mb-2">Start Earning in <span className="text-gradient">4 Steps</span></h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { s: "01", icon: "👤", t: "Create Account",   d: "Sign up free. One account for all roles." },
                  { s: "02", icon: "⚡", t: "Activate Roles",    d: "Enable Vendor, Affiliate, or Influencer." },
                  { s: "03", icon: "🚀", t: "Start Earning",     d: "Sell, promote, or build a community." },
                  { s: "04", icon: "💰", t: "Get Paid Fast",      d: "Withdraw via Irembopay instantly." },
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

          {/* ══════════════════════════════════════════
              RIGHT SIDEBAR (dynamic)
          ══════════════════════════════════════════ */}
          <aside className="hidden xl:flex flex-col gap-5 w-72 shrink-0">

            {/* Live Activity (static UI — real-time via subscription in future) */}
            <div className="bg-surface rounded-2xl border border-base shadow-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="text-sm font-bold text-base">Live Activity</h3>
                </div>
                <Activity className="h-3.5 w-3.5 text-muted-c" />
              </div>
              <div className="space-y-3">
                {[
                  { name: "John Itom",   action: "Joined Platform",   amount: "$45,250", time: "5 min ago" },
                  { name: "AlexGrowth",  action: "Made a Sale",       amount: "$91,359", time: "12 min ago" },
                  { name: "Lisa Teach",  action: "Launched Community",amount: "$32,189", time: "18 min ago" },
                ].map((a, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: "linear-gradient(135deg, #4B2D8F, #7C3AED)" }}>
                      {a.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-base truncate">{a.name}</p>
                      <p className="text-xs text-muted-c">{a.action} · {a.time}</p>
                    </div>
                    <span className="text-xs font-bold text-primary-900 dark:text-primary-300 shrink-0">{a.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Vendors (dynamic) */}
            {vendors.length > 0 && (
              <div className="bg-surface rounded-2xl border border-base shadow-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary-700 dark:text-primary-300" />
                    <h3 className="text-sm font-bold text-base">Featured Vendors</h3>
                  </div>
                </div>
                <div className="space-y-3">
                  {vendors.map((v: Record<string, unknown>, i: number) => (
                    <Link key={v.id as string} href={`/vendors/${v.business_slug as string}`}>
                      <div className="flex items-start gap-2.5 cursor-pointer group">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0 group-hover:scale-105 transition-transform"
                          style={{ background: "linear-gradient(135deg, #4B2D8F, #7C3AED)" }}>
                          {(v.business_name as string).slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <p className="text-xs font-semibold text-base group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors truncate">{v.business_name as string}</p>
                            <div className="flex items-center shrink-0">
                              <Star className="h-2.5 w-2.5 text-accent-500 fill-accent-500" />
                              <span className="text-xs font-semibold text-base ml-0.5">{Number(v.rating ?? 0).toFixed(1)}</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-c">{(v.total_sales as number)?.toLocaleString() ?? 0} sales</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/vendors" className="mt-3 block text-center text-xs text-primary-700 dark:text-primary-300 hover:underline">
                  View all vendors →
                </Link>
              </div>
            )}

            {/* Communities (dynamic) */}
            {communities.length > 0 && (
              <div className="bg-surface rounded-2xl border border-base shadow-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary-700 dark:text-primary-300" />
                    <h3 className="text-sm font-bold text-base">Hot Communities</h3>
                  </div>
                </div>
                <div className="space-y-3">
                  {communities.map((c: Record<string, unknown>) => (
                    <Link key={c.id as string} href={`/communities/${c.slug as string}`}>
                      <div className="flex items-center gap-2.5 cursor-pointer group">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform bg-primary-50 dark:bg-primary-900/30">
                          {c.avatar_url ? "👥" : "👥"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-base group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors truncate">{c.name as string}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-muted-c">{(c.member_count as number)?.toLocaleString() ?? 0} members</span>
                            {!!c.monthly_price && (
                              <span className="text-xs font-bold text-primary-700 dark:text-primary-300">
                                RWF {(c.monthly_price as number).toLocaleString()}/mo
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/communities" className="mt-3 block text-center text-xs text-primary-700 dark:text-primary-300 hover:underline">
                  Browse all communities →
                </Link>
              </div>
            )}

            {/* Tools & Resources */}
            <div className="bg-surface rounded-2xl border border-base shadow-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 text-primary-700 dark:text-primary-300" />
                <h3 className="text-sm font-bold text-base">Tools & Resources</h3>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "AI\nMarketing", icon: <Megaphone className="h-5 w-5" />, color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600", href: "/dashboard/ai" },
                  { label: "Sales\nTemplate", icon: <Tag     className="h-5 w-5" />, color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600", href: "/marketplace?type=template" },
                  { label: "Clip\nGrowth",  icon: <Scissors className="h-5 w-5" />, color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600",      href: "/dashboard/clips" },
                  { label: "Growth\nDashboard",icon:<LineChart className="h-5 w-5"/>,color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",      href: "/dashboard/analytics" },
                ].map((t, i) => (
                  <Link key={i} href={t.href}>
                    <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                      <div className={`w-11 h-11 rounded-xl ${t.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        {t.icon}
                      </div>
                      <p className="text-[10px] text-muted-c text-center leading-tight whitespace-pre-line">{t.label}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Join CTA */}
            <div className="rounded-2xl overflow-hidden relative p-5 text-center"
              style={{ background: "linear-gradient(135deg, #4B2D8F 0%, #7C3AED 100%)" }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #F5A623 0%, transparent 50%)" }} />
              <div className="relative z-10">
                <p className="text-white font-bold mb-1 text-sm">Ready to start earning?</p>
                <p className="text-purple-200 text-xs mb-3">Join {platformStats.totalUsers > 0 ? (platformStats.totalUsers / 1000).toFixed(0) : "35"}k+ creators today</p>
                <Button size="sm" asChild className="w-full bg-white hover:bg-purple-50" style={{ color: "#4B2D8F" }}>
                  <Link href="/register">Create Free Account</Link>
                </Button>
              </div>
            </div>

          </aside>
        </div>
      </div>

      {/* ── FULL-WIDTH CTA ─────────────────────────────────── */}
      <section className="container-xl py-8">
        <div className="relative rounded-3xl overflow-hidden px-10 py-14 text-center"
          style={{ background: "linear-gradient(135deg, #4B2D8F 0%, #7C3AED 60%, #9333ea 100%)" }}>
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 0%, transparent 60%), radial-gradient(circle at 80% 50%, #F5A623 0%, transparent 60%)" }} />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Build Your Creator Empire</h2>
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm text-purple-100">
              {["Free Forever Plan", "No Setup Fees", "Cancel Anytime", "50+ Countries"].map((s, i) => (
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

// ─────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────

function ProductCard({ product: p }: { product: Record<string, unknown> }) {
  const images   = (p.images as string[]) ?? [];
  const imgSrc   = images[0] ?? null;
  const vendor   = p.vendors as Record<string, unknown> | null;
  const price    = Number(p.price ?? 0);
  const original = p.compare_at_price ? Number(p.compare_at_price) : null;
  const discount = original ? Math.round(((original - price) / original) * 100) : 0;
  const rating   = Number(p.rating ?? 0);
  const earn     = p.affiliate_enabled ? `${p.affiliate_commission_rate ?? 10}%` : null;

  return (
    <Link href={`/marketplace/${p.slug as string}`}>
      <div className="bg-surface rounded-2xl border border-base shadow-card hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group cursor-pointer">
        <div className="relative aspect-video bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 flex items-center justify-center overflow-hidden">
          {imgSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imgSrc} alt={p.name as string} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <span className="text-5xl group-hover:scale-110 transition-transform duration-300">📦</span>
          )}
          {discount > 0 && <span className="absolute top-2 left-2 badge badge-red text-xs font-bold">{discount}% OFF</span>}
          {earn && <span className="absolute top-2 right-2 badge badge-green text-xs"><TrendingUp className="h-2.5 w-2.5" /> {earn}</span>}
          {!!p.is_featured && <span className="absolute bottom-2 left-2 badge badge-purple text-xs">Featured</span>}
        </div>
        <div className="p-3">
          <p className="text-xs text-muted-c mb-0.5 truncate">{vendor?.business_name as string ?? "Jimvio Store"}</p>
          <h3 className="font-semibold text-sm text-base mb-2 line-clamp-2 leading-snug group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
            {p.name as string}
          </h3>
          {rating > 0 && (
            <div className="flex items-center gap-1 mb-2">
              {[1,2,3,4,5].map(i => <Star key={i} className={`h-3 w-3 ${i <= Math.floor(rating) ? "text-accent-500 fill-accent-500" : "text-muted-c/30"}`} />)}
              <span className="text-xs text-muted-c ml-0.5">({(p.review_count as number)?.toLocaleString() ?? 0})</span>
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

function ClipCard({ clip: c }: { clip: Record<string, unknown> }) {
  const product = c.products as Record<string, unknown> | null;
  const vendor  = c.vendors  as Record<string, unknown> | null;

  return (
    <div className="bg-surface rounded-2xl border border-base shadow-card overflow-hidden group">
      <div className="relative aspect-video flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #1a1030, #2d1f5e)" }}>
        {c.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.thumbnail_url as string} alt={c.title as string} className="w-full h-full object-cover" />
        ) : (
          <span className="text-5xl">🎬</span>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all cursor-pointer">
            <Play className="h-5 w-5 text-white ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2">
          <span className="text-xs bg-black/40 text-white rounded px-1.5 py-0.5 backdrop-blur-sm">
            {((c.total_views as number) ?? 0).toLocaleString()} views
          </span>
        </div>
      </div>
      <div className="p-3">
        <p className="text-xs font-medium text-base mb-0.5 line-clamp-1">{c.title as string}</p>
        <p className="text-xs text-muted-c mb-2">{vendor?.business_name as string ?? "Jimvio Vendor"}</p>
        {product && (
          <p className="text-xs text-muted-c mb-2">
            Product: <span className="font-medium text-base">{product.name as string}</span>
          </p>
        )}
        <button
          className="w-full py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: "linear-gradient(135deg, #4B2D8F, #7C3AED)" }}
        >
          <Megaphone className="h-3 w-3 inline-block mr-1" /> Promote
        </button>
      </div>
    </div>
  );
}

function EmptyProductsCard({ label, sub, href }: { label: string; sub: string; href: string }) {
  return (
    <div className="col-span-4 bg-subtle border border-base rounded-2xl p-10 text-center">
      <div className="text-4xl mb-3">📦</div>
      <p className="font-semibold text-base mb-1">{label}</p>
      <p className="text-sm text-muted-c mb-4">{sub}</p>
      <Button size="sm" asChild><Link href={href}>Get Started</Link></Button>
    </div>
  );
}
