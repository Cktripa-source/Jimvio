import React from "react";
import Link from "next/link";
import {
  Zap, Shirt, Settings, Sprout, Pill, FlaskConical, HardHat, Car, Home, Laptop, GraduationCap, Wrench,
  ChevronRight, ChevronDown, User, ShoppingCart, MessageCircle, Star, ShieldCheck, CheckCircle, Ship, Globe, DollarSign,
  ArrowRight, Search, Menu, Package, TrendingUp, Users, Factory, Megaphone, Video, BarChart2,
  Lock, CreditCard, PlayCircle, Plus, Info, Clock, ThumbsUp, Bookmark, UserPlus, Linkedin
} from "lucide-react";
import {
  getCategories, getFeaturedProducts, getTrendingProducts, getTopVendors,
  getCommunities, getViralClips, getCampaigns, getTopAffiliates, getPlatformStats
} from "@/services/db";
import { createClient, getCachedUser } from "@/lib/supabase/server";
import { HeroRightPanel } from "@/components/layout/hero-right-panel";
import { HeroSearch } from "@/components/marketplace/hero-search";
import { ProductCardClient } from "@/components/marketplace/product-card-client";
import { ViralStoryRow } from "@/components/marketplace/viral-story-row";
import { FollowButton } from "@/components/marketplace/follow-button";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  let profile: { email?: string | null; full_name?: string | null; avatar_url?: string | null } | null = null;
  try {
    const { data: { user } } = await getCachedUser();
    if (user) {
      const supabase = await createClient();
      const { data } = await supabase
        .from("profiles")
        .select("email, full_name, avatar_url")
        .eq("id", user.id)
        .single();
      profile = data ?? {
        email: user.email,
        full_name: user.user_metadata?.full_name ?? null,
        avatar_url: user.user_metadata?.avatar_url ?? null,
      };
    }
  } catch {
    // ignore
  }

  const [
    categories, featured, trending, vendors,
    communities, viralClips, topAffiliates, platformStats
  ] = await Promise.all([
    getCategories().catch(() => []),
    getFeaturedProducts(6).catch(() => []),
    getTrendingProducts(8).catch(() => []),
    getTopVendors(4).catch(() => []),
    getCommunities(4).catch(() => []),
    getViralClips(6).catch(() => []),
    getTopAffiliates(3).catch(() => []),
    getPlatformStats().catch(() => ({ totalUsers: 0, totalVendors: 0, totalProducts: 0 })),
  ]);

  const sidebarCats = (categories.length > 0 ? categories.slice(0, 12) : [
    { name: "Electronics", slug: "electronics" },
    { name: "Machinery", slug: "machinery" },
  ]).map((cat: any) => {
    let icon = <Package className="h-4 w-4" />;
    if (cat.name.toLowerCase().includes("elect")) icon = <Zap className="h-4 w-4" />;
    if (cat.name.toLowerCase().includes("fashion")) icon = <Shirt className="h-4 w-4" />;
    if (cat.name.toLowerCase().includes("machin")) icon = <Settings className="h-4 w-4" />;
    if (cat.name.toLowerCase().includes("agri")) icon = <Sprout className="h-4 w-4" />;
    if (cat.name.toLowerCase().includes("health")) icon = <Pill className="h-4 w-4" />;
    return { icon, label: cat.name, slug: cat.slug };
  });

  return (
    <div className="bg-white min-h-screen pb-20 md:pb-0">

      {/* ── HERO AREA ── */}
      <div className="bg-white border-b border-[#e8e8e8]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 xl:grid-cols-[1fr,280px] gap-6 py-6 items-start">

          {/* Hero card: one badge, clips row, headline, CTAs, stats, search */}
          <div className="rounded-3xl overflow-hidden bg-white border border-[#f0f0f0] shadow-sm hover:border-[#f97316]/15 transition-colors">
            {/* Single live badge + viral clips row */}
            <div className="border-b border-[#f0f0f0] bg-[#fafafa]/60 px-4 sm:px-6 pt-5 pb-5">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#fff7ed] border border-[#f97316]/20 rounded-full text-[10px] font-black text-[#f97316] uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse" />
                    Creator Hub Live
                  </span>
                </div>
                <div className="flex-1 min-w-0" />
              </div>
              <ViralStoryRow clips={viralClips} showHeader={false} />
            </div>

            {/* Headline, copy, CTAs, stats, search */}
            <div className="px-4 sm:px-6 md:px-10 py-8 md:py-10 relative">
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              <div className="relative z-10">
                <div className="max-w-[600px]">
                <h1 className="text-[28px] sm:text-[38px] md:text-[48px] font-black text-[#1a1a1a] leading-[1.08] tracking-tight mb-5">
                  Source with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#7c2d12]">Viral Impact.</span>
                </h1>
                <p className="text-[14px] md:text-[16px] text-[#4b5563] font-medium leading-relaxed mb-8">
                  Join the world's most powerful B2B platform built for creators. Verified suppliers, AI-driven sourcing, and viral commerce at your fingertips.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Link href="/marketplace" className="w-full sm:w-auto order-1">
                    <button className="w-full bg-[#f97316] text-white px-8 py-4 rounded-2xl text-[14px] font-black transition-all hover:bg-[#ea580c] hover:scale-[1.02] active:scale-95 shadow-xl shadow-[#f97316]/25">
                      Explore Market →
                    </button>
                  </Link>
                  <Link href="/register?role=influencer" className="w-full sm:w-auto order-2">
                    <button className="w-full bg-white border-2 border-[#f0f0f0] text-[#4b5563] px-8 py-4 rounded-2xl text-[14px] font-bold transition-all hover:bg-[#fafafa] hover:border-[#f97316] hover:text-[#f97316] active:scale-95">
                      Join as Creator
                    </button>
                  </Link>
                </div>

                {/* Stats: single compact row */}
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 py-4 px-4 bg-[#fff7ed]/50 border border-[#f97316]/10 rounded-xl mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                      <Users className="h-4 w-4 text-[#f97316]" />
                    </div>
                    <div>
                      <p className="text-[13px] font-black text-[#1a1a1a]">{platformStats.totalVendors}+ Vendors</p>
                      <p className="text-[10px] text-[#4b5563] font-medium">Verified global suppliers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                      <TrendingUp className="h-4 w-4 text-[#f97316]" />
                    </div>
                    <div>
                      <p className="text-[13px] font-black text-[#1a1a1a]">{platformStats.totalProducts}+ Products</p>
                      <p className="text-[10px] text-[#4b5563] font-medium">Active trade listings</p>
                    </div>
                  </div>
                  <Link href="/affiliates" className="ml-auto text-[11px] font-black text-[#f97316] uppercase tracking-widest hover:underline flex items-center gap-1 shrink-0">
                    Learn more <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
                </div>

                {/* AI Search — larger box, category dropdown, AI Match, popular & quick filters */}
                <div className="mt-8 w-full max-w-[720px]">
                  <HeroSearch
                    categories={(categories.length > 0 ? categories : [{ name: "Electronics", slug: "electronics" }, { name: "Apparel", slug: "apparel" }]).map((c: { name: string; slug: string }) => ({ label: c.name, slug: c.slug }))}
                    trendingKeywords={["Electronics", "Apparel", "Custom manufacturing", "Verified suppliers", "Wholesale", "Dropshipping"]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Sign In (guest) or Welcome back + quick actions (logged in) */}
          <HeroRightPanel profile={profile} />
        </div>
      </div>

      {/* ── TRUST BAR ── */}
      <div className="bg-white border-b border-[#f0f0f0] py-6 shadow-sm relative z-10">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-wrap items-center justify-between gap-y-8">
          {[
            { icon: <ShieldCheck className="h-8 w-8 text-[#f97316]" />, title: "Trade Assurance", desc: "Payment protection & peace of mind" },
            { icon: <CheckCircle className="h-8 w-8 text-[#f97316]" />, title: "Verified Partners", desc: "Audited manufacturer profiles" },
            { icon: <Ship className="h-8 w-8 text-[#f97316]" />, title: "Global Logistics", desc: "60+ freight partners worldwide" },
            { icon: <DollarSign className="h-8 w-8 text-[#f97316]" />, title: "Secure Payouts", desc: "Multi-currency escrow protection" },
            { icon: <Globe className="h-8 w-8 text-[#f97316]" />, title: "Creator Network", desc: "Reach influencers in 180+ regions" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 px-6 md:border-r last:border-none border-[#f0f0f0] flex-1 min-w-[220px] justify-center md:justify-start">
              <span className="shrink-0 p-2.5 bg-[#fff7ed] rounded-xl">{item.icon}</span>
              <div className="leading-tight">
                <h5 className="text-[14px] font-black text-[#1a1a1a] mb-0.5 tracking-tight">{item.title}</h5>
                <p className="text-[11px] text-[#9ca3af] font-bold capitalize tracking-wider">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-12">

        {/* Recommended Picks + Category Sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr,260px] gap-6">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[20px] sm:text-[22px] font-extrabold text-[#1a1a1a] flex items-center gap-2.5 tracking-tight">
                <Star className="h-5 w-5 text-[#f97316] fill-[#f97316]" /> Recommended Picks
              </h2>
              <Link href="/marketplace" className="text-[11px] font-bold text-[#f97316] capitalize tracking-widest flex items-center gap-1.5 hover:gap-2.5 transition-all">
                Browse All <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
              {featured.map((p) => (
                <ProductCardClient key={p.id} p={p as any} />
              ))}
            </div>
          </div>
          {/* Category Quick Access */}
          <div className="hidden lg:block">
            <div className="bg-white border border-[#eee] rounded-2xl overflow-hidden sticky top-[100px] shadow-sm hover:shadow-md transition-shadow">
              <div className="px-5 py-4 bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white">
                <h3 className="text-[13px] font-bold capitalize tracking-widest">Shop by Category</h3>
              </div>
              <div className="p-2">
                {sidebarCats.slice(0, 8).map((cat, idx) => (
                  <div key={idx} className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-[#fff7ed] transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-[#fff7ed] group-hover:bg-[#f97316] flex items-center justify-center transition-colors">
                      <span className="text-[#f97316] group-hover:text-white transition-colors">{cat.icon}</span>
                    </div>
                    <span className="text-[13px] font-semibold text-[#374151] group-hover:text-[#f97316] transition-colors flex-1">{cat.label}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-[#d1d5db] group-hover:text-[#f97316] transition-colors" />
                  </div>
                ))}
              </div>
              <div className="px-4 pb-4">
                <Link href="/marketplace" className="block w-full text-center py-2.5 text-[12px] font-bold text-[#f97316] border border-[#f97316]/20 rounded-xl hover:bg-[#fff7ed] transition-all">
                  View All Categories →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Flash Deals + Trending Categories */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr,260px] gap-6">
          <div className="bg-white border border-[#eee] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
            <div className="bg-gradient-to-r from-[#9a3412] via-[#ea580c] to-[#f97316] px-6 py-4 flex items-center flex-wrap gap-4">
              <div className="flex items-center gap-2.5 text-white text-[18px] font-extrabold tracking-tight">
                <Zap className="h-5 w-5 fill-white stroke-none animate-pulse" /> Flash Trade Deals
              </div>
              <div className="flex items-center gap-2.5 ml-auto text-white">
                <span className="text-[10px] font-bold text-white/60 capitalize tracking-widest hidden sm:inline">Ending In:</span>
                <div className="flex items-center gap-1">
                  {["08", "24", "15"].map((num, i) => (
                    <React.Fragment key={i}>
                      <div className="bg-white/15 backdrop-blur text-white px-2 py-1 text-[16px] font-extrabold rounded-lg min-w-[34px] text-center border border-white/20">
                        {num}
                      </div>
                      {i < 2 && <span className="font-bold opacity-40 text-sm">:</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 p-4 ">
              {trending.slice(0, 5).map((p, i) => (
                <Link key={p.id} href={`/marketplace/${p.slug}`} className="group rounded-xl p-3 hover:bg-[#faf8ff] transition-all shadow-sm hover:shadow-md">
                  <div className="aspect-square bg-[#f8f8fa] rounded-xl mb-3 flex items-center justify-center relative overflow-hidden border border-[#f0f0f0] group-hover:border-[#f97316]/20 transition-all">
                    <Package className="h-8 w-8 text-[#e0e0e0] group-hover:text-[#f97316]/20" />
                    <div className="absolute top-2 right-2 bg-[#f97316] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      -{Math.floor(Math.random() * 30 + 10)}%
                    </div>
                  </div>
                  <h4 className="text-[12px] font-semibold text-[#1a1a1a] mb-1.5 line-clamp-1 group-hover:text-[#f97316] transition-colors">{p.name || "Refined Goods"}</h4>
                  <div className="text-[15px] font-extrabold text-[#1a1a1a] mb-1">RWF {p.price.toLocaleString()}</div>
                  <div className="text-[10px] text-[#9ca3af] line-through font-medium mb-2">RWF {(Number(p.price) * 1.3).toLocaleString()}</div>
                  <div className="w-full h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden mb-1.5">
                    <div className="h-full bg-gradient-to-r from-[#f97316] to-[#fb923c] rounded-full" style={{ width: `${80 - i * 10}%` }} />
                  </div>
                  <div className="text-[9px] text-[#9ca3af] font-bold capitalize tracking-wider">
                    <span className="text-[#f97316]">{80 - i * 10}%</span> claimed
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* Trending Categories Card */}
          <div className="hidden lg:flex flex-col gap-4">
            <div className="bg-gradient-to-br from-[#280333] to-[#ef7b54] rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-[14px] font-bold mb-1">🔥 Trending Now</h3>
              <p className="text-[11px] text-white/60 mb-4">Hot categories this week</p>
              <div className="space-y-2">
                {["Solar Panels", "AI Hardware", "Organic Cotton", "EV Parts"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-2.5 hover:bg-white/20 cursor-pointer transition-all">
                    <span className="text-[12px]">{["⚡", "🤖", "🌿", "🔋"][i]}</span>
                    <span className="text-[12px] font-semibold flex-1">{item}</span>
                    <span className="text-[10px] text-white/50 font-bold">+{[34, 28, 19, 15][i]}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-[#eee] rounded-2xl p-5 shadow-sm">
              <h3 className="text-[13px] font-bold text-[#1a1a1a] mb-3">💎 Top Suppliers</h3>
              <div className="space-y-3">
                {["TechVista Corp", "GreenLeaf Textiles", "NovaParts Ltd"].map((name, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f97316] to-[#fb923c] flex items-center justify-center text-white text-[11px] font-bold">{name[0]}</div>
                    <div className="flex-1">
                      <p className="text-[12px] font-semibold text-[#1a1a1a]">{name}</p>
                      <p className="text-[10px] text-[#9ca3af]">⭐ {(4.5 + i * 0.2).toFixed(1)} · Verified</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Explore Categories */}
        <section className="bg-white border border-[#f0f0f0] rounded-2xl p-10 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-10 relative z-10">
            <h2 className="font-outfit text-[24px] font-black text-[#1a1a1a] flex items-center gap-3 capitalize tracking-tight">
              <Menu className="h-6 w-6 text-[#f97316]" /> Global Industries
            </h2>
            <Link href="/marketplace" className="text-[12px] font-black text-[#f97316] capitalize tracking-[0.2em] flex items-center gap-2 hover:gap-3 transition-all border-b-2 border-[#f97316]/10 pb-1">
              All Sections <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
            {[
              { label: "Electronics", icon: <Zap className="h-7 w-7" />, count: "48K+", img: "/images/industries/electronics.png", color: "<from-orange-600/10 to-black/80" },
              { label: "Fashion", icon: <Shirt className="h-7 w-7" />, count: "32K+", img: "/images/industries/fashion.png", color: "from-purple-600/10 to-black/80" },
              { label: "Machinery", icon: <Settings className="h-7 w-7" />, count: "21K+", img: "/images/industries/machinery.png", color: "from-blue-600/10 to-black/80" },
              { label: "Agriculture", icon: <Sprout className="h-7 w-7" />, count: "18K+", img: "/images/industries/agriculture.png", color: "from-green-600/10 to-black/80" },
              { label: "Health", icon: <Pill className="h-7 w-7" />, count: "14K+", img: "/images/industries/health.png", color: "from-red-600/10 to-black/10" },
              { label: "Digital", icon: <Laptop className="h-7 w-7" />, count: "11K+", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800", color: "from-cyan-600/10 to-black/80" },
            ].map((cat, i) => (
              <div
                key={i}
                className="relative h-[220px] rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500 active:scale-95"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${cat.img}')` }}
                />

                {/* Gradient Overlay */}
                <div className={cn("absolute inset-0 bg-gradient-to-t transition-opacity duration-500", cat.color)} />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 group-hover:bg-[#f97316] group-hover:scale-110 transition-all duration-300 text-white">
                    {cat.icon}
                  </div>
                  <h4 className="text-[17px] font-black text-white mb-1 capitalize tracking-tight group-hover:text-[#f97316] transition-colors">{cat.label}</h4>
                  <p className="text-[11px] text-white/70 font-black capitalize tracking-widest">{cat.count} Suppliers</p>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-[#f97316]/20 mix-blend-overlay" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Affiliate & Influencer Hybrid section */}
        <div className="bg-white border border-[#f0f0f0] rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          <div className="bg-gradient-to-br from-[#1a1a1a] via-[#7c2d12] to-[#f97316] p-8 md:p-16 relative overflow-hidden text-white flex flex-col justify-center">
            <div className="absolute right-[-40px] bottom-[-40px] text-[180px] opacity-[0.03] leading-none font-black">$</div>
            <div className="bg-white/10 backdrop-blur-md text-white border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] capitalize mb-6 inline-block w-fit">
              Partner with Jimvio
            </div>
            <h3 className="font-outfit text-[28px] md:text-[36px] font-black leading-tight mb-6 capitalize tracking-tight">Turn Your Network<br />Into Global Trade</h3>
            <p className="text-[14px] md:text-[16px] text-white/70 mb-10 leading-relaxed font-bold">Earn high-ticket commissions on every bulk deal referred through our creator-friendly B2B ecosystem.</p>
            <div className="space-y-4 mb-12">
              {["12% Commission Cap", "Lifetime Referral Tracking", "Creator Studio Tools"].map(t => (
                <div key={t} className="flex items-center gap-4 text-[13px] md:text-[15px] font-bold">
                  <div className="w-6 h-6 rounded-lg bg-white/10 text-white flex items-center justify-center text-[12px] font-black border border-white/10">✓</div> {t}
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="w-full sm:w-auto bg-white text-[#f97316] hover:bg-[#fff7ed] font-black h-14 px-10 rounded-xl text-[14px] md:text-[15px] shadow-2xl">Start Earning</Button>
              <Button variant="outline" className="w-full sm:w-auto border-2 border-white/20 text-white hover:bg-white/10 h-14 px-10 rounded-xl font-bold text-[14px] md:text-[15px]">Creator Hub</Button>
            </div>
          </div>
          <div className="bg-[#fffbf5] p-8 md:p-16 flex flex-col justify-center">
            <h3 className="font-outfit text-[22px] md:text-[26px] font-black text-[#1a1a1a] mb-3 capitalize tracking-tight">Active Campaigns</h3>
            <p className="text-[14px] md:text-[15px] text-[#6b7280] mb-8 md:mb-10 font-bold">Bridging the gap between major manufacturers and authentic voices.</p>
            <div className="flex flex-wrap gap-2 mb-10">
              {["Tech", "Industry", "SaaS", "Direct", "Agri"].map((t, i) => (
                <span key={i} className={cn("px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-[11px] md:text-[12px] font-black border capitalize tracking-widest transition-all cursor-pointer", i === 0 ? "bg-[#f97316] text-white border-[#f97316] shadow-lg shadow-orange-500/20" : "bg-white text-[#4b5563] border-[#f0f0f0] hover:border-[#f97316] hover:text-[#f97316]")}>
                  {t}
                </span>
              ))}
            </div>
            <div className="bg-white border border-[#f0f0f0] rounded-2xl p-6 flex items-center gap-6 shadow-sm mb-10 hover:shadow-xl transition-all border-l-4 border-l-[#f97316]">
              <Avatar className="h-14 w-14 border-4 border-[#f97316]/5 ring-1 ring-[#f0f0f0]">
                <AvatarFallback className="bg-[#f97316] text-white font-black text-[18px]">JK</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-[16px] font-black text-[#1a1a1a]">Julian K.</div>
                <div className="text-[12px] text-[#9ca3af] font-black capitalize tracking-widest">Tech Strategist · 1.2M</div>
              </div>
              <div className="text-right">
                <div className="text-[22px] font-black text-[#f97316] font-outfit">$8,900</div>
                <p className="text-[9px] text-[#9ca3af] font-black capitalize tracking-[0.2em]">Monthly Avg</p>
              </div>
            </div>
            <Button className="w-full h-14 bg-[#f97316] hover:bg-[#ea580c] text-white font-black rounded-xl text-[15px] shadow-lg shadow-orange-500/20">Access Dashboard →</Button>
          </div>
        </div>

        {/* Communities */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-outfit text-[24px] font-black text-[#1a1a1a] flex items-center gap-3 capitalize tracking-tight">
              <MessageCircle className="h-6 w-6 text-[#f97316]" /> Trading Communities
            </h2>
            <Link href="/communities" className="text-[12px] font-black text-[#f97316] capitalize tracking-[0.2em] flex items-center gap-2 hover:gap-3 transition-all border-b-2 border-[#f97316]/10 pb-1">
              Join Conversation <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.3fr] gap-8">
            <div className="space-y-3">
              {communities.map((c: any) => (
                <div key={c.id} className="bg-white border border-[#f0f0f0] rounded-xl p-5 flex items-center gap-5 cursor-pointer hover:bg-[#fffbf5] border-l-[6px] border-l-transparent hover:border-l-[#f97316] transition-all group shadow-sm">
                  <div className="w-14 h-14 rounded-xl bg-[#fafafa] flex items-center justify-center group-hover:bg-[#f97316]/5 transition-colors shrink-0">
                    <Users className="h-7 w-7 text-[#9ca3af] group-hover:text-[#f97316]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[15px] font-black text-[#1a1a1a] leading-tight mb-1">{c.name}</h4>
                    <p className="text-[12px] text-[#6b7280] truncate font-bold capitalize tracking-tight">{c.description || "B2B Insights & Networking"}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[16px] font-black text-[#f97316] font-outfit">{c.member_count?.toLocaleString() || "1K+"}</div>
                    <div className="text-[10px] text-green-500 font-black flex items-center justify-end gap-1.5 capitalize tracking-widest">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> {Math.floor(Math.random() * 100 + 20)} active
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#1a1a1a] rounded-2xl p-8 text-white min-h-[400px] flex flex-col shadow-2xl relative overflow-hidden border border-white/5">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <MessageCircle className="h-40 w-40 text-white" />
              </div>
              <div className="flex items-center gap-2.5 text-[14px] font-black mb-8 text-white/90 capitalize tracking-widest relative z-10">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" /> Live Insight: Electronics Tech
              </div>
              <div className="space-y-6 mb-10 flex-1 overflow-y-auto no-scrollbar relative z-10">
                {[
                  { name: "Jason K.", loc: "Taipei", msg: "Anyone seeing lead time increases on MLCCs? Our distributor pushed to 16 weeks.", color: "bg-[#f97316]" },
                  { name: "Sara L.", loc: "Shenzhen", msg: "Verified. We switched to TDK last quarter. DM for supplier IDs.", color: "bg-[#9a3412]", me: true },
                  { name: "Marco R.", loc: "Milan", msg: "Vishay has stock too. Better price but 10K+ min pcs.", color: "bg-[#f97316]" },
                ].map((m, i) => (
                  <div key={i} className={cn("flex gap-4 max-w-[85%]", m.me ? "ml-auto flex-row-reverse" : "")}>
                    <Avatar className="h-9 w-9 shrink-0 ring-2 ring-white/10">
                      <AvatarFallback className={cn("text-[11px] font-black text-white", m.color)}>{m.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className={cn("p-4 rounded-2xl", m.me ? "bg-[#f97316] rounded-tr-none text-white shadow-xl" : "bg-white/5 backdrop-blur-md rounded-tl-none border border-white/10")}>
                      <span className="block text-[10px] font-black text-white/30 capitalize tracking-[0.2em] mb-2">{m.name} · {m.loc}</span>
                      <p className="text-[14px] font-bold leading-relaxed">{m.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2.5 relative z-10">
                {["#components", "#MLCC", "#sourcing", "#supply-chain"].map(t => (
                  <span key={t} className="px-4 py-1.5 bg-white/5 rounded-full text-[11px] text-white/40 font-black capitalize tracking-widest border border-white/5 hover:bg-white/10 cursor-pointer transition-all">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Creators Archive - Premium Redesign */}
        <section className="relative py-12">
          <div className="absolute inset-0 bg-gradient-to-r from-[#f97316]/2 via-transparent to-transparent pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-[2px] w-8 bg-[#f97316]" />
                <span className="text-[10px] font-black capitalize tracking-[0.4em] text-[#f97316]">Vault & History</span>
              </div>
              <h2 className="font-outfit text-[32px] md:text-[40px] font-black text-[#1a1a1a] flex items-center gap-4 leading-none capitalize tracking-tighter">
                Creators <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a1a1a] to-[#6b7280]">Archive</span>
              </h2>
            </div>
            
            <Link href="/dashboard/clippings" className="group">
              <div className="bg-white border-2 border-[#f0f0f0] hover:border-[#f97316] px-8 py-3 rounded-2xl flex items-center gap-3 transition-all shadow-xl shadow-black/5 hover:translate-y-[-4px] active:scale-95 group-hover:bg-[#f97316]/5">
                <Bookmark className="h-5 w-5 text-[#f97316] fill-[#f97316]/10 group-hover:fill-[#f97316]/30 transition-colors" />
                <span className="text-[13px] font-black text-[#1a1a1a] capitalize tracking-widest">My Library</span>
                <div className="w-8 h-8 rounded-full bg-[#f97316] flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {viralClips.map((clip: any) => (
              <div key={clip.id} className="group relative bg-[#1a1a1a] rounded-[28px] overflow-hidden shadow-2xl transition-all duration-500 hover:translate-y-[-8px] border border-white/5">
                {/* Image / Thumbnail Area */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                    style={{ backgroundImage: `url(${clip.thumbnail_url || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop"})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-90" />
                  
                  {/* Floating Interactive Elements */}
                  <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-20">
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                       <span className="text-[10px] font-black text-white capitalize tracking-widest">{clip.total_views?.toLocaleString() || "1.2K"} Live Views</span>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#f97316] transition-all">
                       <Bookmark className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform duration-500">
                      <PlayCircle className="h-8 w-8 fill-white" />
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 relative z-20">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-8 w-8 border-2 border-white/10 ring-2 ring-[#f97316]/20">
                      <AvatarFallback className="bg-[#f97316] text-[10px] font-black text-white">{clip.vendors?.business_name?.[0] || "V"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-white leading-none mb-0.5">{clip.vendors?.business_name || "Verified Supplier"}</span>
                      <span className="text-[9px] text-white/40 font-bold capitalize tracking-widest">Master Partner</span>
                    </div>
                    {clip.vendors?.id && (
                      <FollowButton 
                        vendorId={clip.vendors.id} 
                        variant="ghost" 
                        className="ml-auto h-7 px-2 text-[10px] text-[var(--color-accent)] border-[var(--color-accent)]/20 hover:bg-[var(--color-accent)] hover:text-white" 
                      />
                    )}
                  </div>
                  
                  <h4 className="text-[18px] md:text-[20px] font-black text-white leading-[1.2] mb-6 group-hover:text-[#f97316] transition-colors line-clamp-2">
                    {clip.title}
                  </h4>

                  <div className="flex items-center gap-4 pt-6 mt-auto border-t border-white/5">
                    {clip.products ? (
                      <Link href={`/marketplace/${clip.products.slug}`} className="flex-1 group/prod">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3 hover:bg-[#f97316]/10 hover:border-[#f97316]/30 transition-all">
                          <div className="w-10 h-10 rounded-lg bg-[#f97316]/20 flex items-center justify-center text-[#f97316] overflow-hidden shrink-0">
                            {clip.products.images && clip.products.images.length > 0 ? (
                              <img 
                                src={clip.products.images[0]} 
                                alt={clip.products.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <ShoppingCart className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-black text-white/40 capitalize tracking-widest leading-none mb-1">Featured Item</p>
                            <p className="text-[13px] font-bold text-white truncate">{clip.products.name}</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[13px] font-black text-[#f97316]">${clip.products.price}</p>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#f97316] to-[#7c2d12] w-2/3" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Decorative Glow */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#f97316]/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </section>

        {/* Market Intelligence */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white border border-[#f0f0f0] rounded-2xl p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#f97316]" />
            <h4 className="font-outfit text-[22px] font-black text-[#1a1a1a] mb-10 flex items-center gap-3 capitalize tracking-tight">
              <BarChart2 className="h-6 w-6 text-[#f97316]" /> Market Pulse
            </h4>
            <div className="space-y-8">
              {(categories.length > 0 ? categories.slice(0, 4) : [
                { name: "Electronics", product_count: 80 },
                { name: "Machinery", product_count: 35 },
                { name: "Textiles", product_count: 65 },
                { name: "Health", product_count: 90 },
              ]).map((cat: any, i: number) => (
                <div key={i} className="flex items-center gap-8 group">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[14px] font-black text-[#1a1a1a] capitalize tracking-tight">{cat.name} Market</span>
                      <span className={cn("text-[11px] font-black px-2 py-0.5 rounded capitalize tracking-widest bg-green-100 text-green-600")}>
                        ↑ {8 + i}%
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-[#fafafa] rounded-full overflow-hidden border border-[#f0f0f0]">
                      <div className={cn("h-full rounded-full transition-all duration-1000 bg-[#f97316]")} style={{ width: `${60 + (i * 10)}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#f0f0f0] rounded-2xl p-10 shadow-sm">
            <h4 className="font-outfit text-[22px] font-black text-[#1a1a1a] mb-8 flex items-center gap-3 capitalize tracking-tight">
              <TrendingUp className="h-6 w-6 text-[#f97316]" /> Hot Sourcing
            </h4>
            <div className="flex flex-wrap gap-2.5 mb-10">
              {(categories.length > 0 ? categories.slice(0, 8) : []).map((cat: any) => (
                <Link href={`/marketplace?category=${cat.slug}`} key={cat.id}>
                  <span className="px-5 py-2.5 bg-[#fafafa] border border-[#f0f0f0] rounded-xl text-[12px] font-black text-[#4b5563] hover:bg-[#fff7ed] hover:border-[#f97316] hover:text-[#f97316] cursor-pointer transition-all capitalize tracking-widest">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
            <h4 className="text-[11px] font-black text-[#9ca3af] capitalize tracking-[0.25em] mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#f0f0f0]" /> Active Leads <div className="h-px flex-1 bg-[#f0f0f0]" />
            </h4>
            <div className="space-y-3">
              {(trending.length > 0 ? trending.slice(0, 3) : []).map((prod: any, i: number) => (
                <Link key={i} href={`/marketplace/${prod.slug}`}>
                  <div className="bg-white border border-[#f0f0f0] p-5 rounded-xl flex items-center gap-5 hover:bg-[#fffbf5] transition-all cursor-pointer group shadow-sm hover:border-[#f97316]/30 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-[#fff7ed] flex items-center justify-center text-[#f97316] transition-transform group-hover:scale-110 shadow-inner overflow-hidden">
                      {prod.images?.[0] ? (
                        <img src={prod.images[0]} className="w-full h-full object-cover" alt="" />
                      ) : (
                        <Package className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h5 className="text-[14px] font-black text-[#1a1a1a] mb-0.5 leading-tight truncate">{prod.name}</h5>
                      <p className="text-[11px] text-[#9ca3af] font-bold capitalize tracking-widest">${prod.price} · {prod.vendors?.business_name || "Verified"}</p>
                    </div>
                    <span className="text-[10px] font-black text-[#f97316] p-1 bg-[#fff7ed] rounded capitalize tracking-wider">Live</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* How it Works Strip */}
      <div className="bg-[#fffbf5] border-y border-[#f97316]/5 py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-[700px] mx-auto mb-20">
            <h2 className="font-outfit text-[36px] font-black text-[#1a1a1a] mb-4 capitalize tracking-tight">The Jimvio Protocol</h2>
            <p className="text-[16px] text-[#6b7280] font-bold capitalize tracking-widest leading-relaxed">Simplifying Global Trade for the Modern Era</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            <div className="absolute top-14 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#f97316] via-[#f97316] to-transparent hidden lg:block opacity-10 border-dashed" />
            {[
              { icon: <UserPlus />, title: "Digital ID", desc: "One unified account for vendors, buyers, and creators." },
              { icon: <ArrowRight />, title: "AI Search", desc: "Find verified partners in seconds using our neural matching." },
              { icon: <Search />, title: "Smart Contracts", desc: "Automated agreements and secure multi-currency escrow." },
              { icon: <ShieldCheck />, title: "Global Sync", desc: "Real-time tracking and logistics integration across 180 countries." },
            ].map((s, idx) => (
              <div key={idx} className="text-center group relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-[#f97316] text-white flex items-center justify-center font-outfit text-[28px] font-black mx-auto mb-8 shadow-2xl shadow-orange-500/30 group-hover:scale-110 transition-transform leading-none hover:rotate-6">
                  0{idx + 1}
                </div>
                <h4 className="text-[17px] font-black text-[#1a1a1a] mb-4 capitalize tracking-tight">{s.title}</h4>
                <p className="text-[14px] text-[#6b7280] font-bold leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-20">
            <Button size="lg" className="bg-[#f97316] hover:bg-[#ea580c] text-white font-black px-12 h-16 rounded-xl text-[16px] shadow-2xl shadow-orange-500/30 hover:-translate-y-2 transition-all capitalize tracking-widest active:scale-95">
              Initialize Trade Access
            </Button>
          </div>
        </div>
      </div>

      {/* App Promo */}
      <div className="bg-gradient-to-br from-[#1a1a1a] via-[#431407] to-[#9a3412] py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-20 relative z-10">
          <div className="flex-1 max-w-[600px]">
            <h3 className="font-outfit text-[42px] font-black text-white mb-6 leading-tight capitalize tracking-tight">Trade Anywhere.<br />Global Mastery.</h3>
            <p className="text-[17px] text-white/50 font-bold leading-relaxed mb-12 capitalize tracking-wide">The Jimvio mobile application integrates every facet of the creator-commerce ecosystem into a single high-performance interface.</p>
            <div className="flex flex-wrap gap-5">
              {[
                { name: "App Store", sub: "Available on", icon: <Lock className="h-6 w-6" /> },
                { name: "Google Play", sub: "Get it on", icon: <PlayCircle className="h-6 w-6" /> }
              ].map(btn => (
                <div key={btn.name} className="flex items-center gap-4 px-8 py-3.5 bg-white/5 border-2 border-white/10 rounded-xl hover:bg-[#f97316] hover:border-[#f97316] cursor-pointer transition-all text-white group shadow-2xl">
                  <div className="shrink-0 group-hover:scale-110 transition-transform">{btn.icon}</div>
                  <div className="leading-tight">
                    <div className="text-[10px] text-white/40 font-black capitalize tracking-[0.2em]">{btn.sub}</div>
                    <div className="text-[18px] font-black tracking-tight">{btn.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center md:text-right">
            <div className="w-32 h-32 bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-2xl flex items-center justify-center mx-auto md:ml-auto mb-5 shadow-inner group cursor-pointer hover:border-[#f97316] transition-colors">
              <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center">
                {/* QR Placeholder */}
                <div className="w-16 h-16 bg-[#f97316] rounded flex items-center justify-center">
                  <Zap className="h-8 w-8 text-white fill-white stroke-none" />
                </div>
              </div>
            </div>
            <p className="text-[11px] font-black text-white/40 capitalize tracking-[0.3em] leading-tight">Sync Your<br />Device</p>
          </div>
        </div>
      </div>

    </div>
  );
}
