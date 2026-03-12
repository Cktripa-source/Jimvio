import React from "react";
import Link from "next/link";
import { TrendingUp, Link2, DollarSign, Users, Star, ArrowRight, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const topAffiliates = [
  { rank: 1, name: "Jean-Claude Niyonzima", avatar: "👨🏿‍💻", earnings: 4200000, conversions: 1842, tier: "Gold", badge: "🥇" },
  { rank: 2, name: "Amina Umubyeyi", avatar: "👩🏿‍💼", earnings: 3800000, conversions: 1654, tier: "Gold", badge: "🥈" },
  { rank: 3, name: "Patrick Rwigamba", avatar: "👨🏿‍🎓", earnings: 3200000, conversions: 1390, tier: "Silver", badge: "🥉" },
  { rank: 4, name: "Grace Ishimwe", avatar: "👩🏿‍🎨", earnings: 2800000, conversions: 1210, tier: "Silver", badge: "4️⃣" },
  { rank: 5, name: "Eric Mugabo", avatar: "👨🏿‍🏫", earnings: 2400000, conversions: 1050, tier: "Silver", badge: "5️⃣" },
];

const topProducts = [
  { name: "iPhone 15 Pro Max", category: "Electronics", commission: "8%", avgEarning: 68000, sellers: 1240 },
  { name: "Next.js 15 Course", category: "Courses", commission: "40%", avgEarning: 18000, sellers: 892 },
  { name: "Premium UI Kit", category: "Digital", commission: "50%", avgEarning: 17500, sellers: 2103 },
  { name: "AI Automation Bundle", commission: "35%", category: "Software", avgEarning: 26250, sellers: 567 },
  { name: "Python ML Bootcamp", category: "Courses", commission: "40%", avgEarning: 26000, sellers: 1590 },
  { name: "Notion Templates Pack", category: "Digital", commission: "45%", avgEarning: 8100, sellers: 5672 },
];

const howToEarn = [
  { step: "01", title: "Sign Up & Activate Affiliate Role", desc: "Create a free account and activate the affiliate role from your dashboard.", icon: "👤" },
  { step: "02", title: "Browse Products & Get Links", desc: "Pick from thousands of affiliate-enabled products. Generate your unique tracking link.", icon: "🔗" },
  { step: "03", title: "Promote & Drive Traffic", desc: "Share your links on social media, blogs, YouTube, or any platform you use.", icon: "📢" },
  { step: "04", title: "Earn Commissions Automatically", desc: "Get paid for every sale made through your link. Withdraw to Irembopay instantly.", icon: "💰" },
];

export default function AffiliatesPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <Badge variant="success" className="mb-4">
            <TrendingUp className="h-3.5 w-3.5" /> Affiliate Program
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5">
            Earn While You <span className="gradient-text">Sleep</span>
          </h1>
          <p className="text-white/60 text-xl mb-8 max-w-2xl mx-auto">
            Promote thousands of products. Earn up to 50% commission per sale. Get paid instantly via Irembopay.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="xl" asChild>
              <Link href="/register?role=affiliate">
                Start Earning Free <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="glass" asChild>
              <Link href="/marketplace">Browse Products</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: "Active Affiliates", value: "25,000+" },
              { label: "Products to Promote", value: "50,000+" },
              { label: "Avg Commission", value: "Up to 50%" },
              { label: "Paid Out Total", value: "RWF 2.4B+" },
            ].map((s, i) => (
              <div key={i} className="glass-card p-4 text-center">
                <p className="text-xl font-black text-white">{s.value}</p>
                <p className="text-xs text-white/50 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Earn */}
      <section className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">How to Earn</h2>
            <p className="text-white/50">Start earning in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howToEarn.map((step, i) => (
              <div key={i} className="glass-card p-5 text-center">
                <div className="text-3xl mb-3">{step.icon}</div>
                <p className="text-xs font-black text-brand-400 mb-1 uppercase tracking-widest">{step.step}</p>
                <h3 className="text-white font-bold mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Products */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-white mb-2">Top Affiliate Products</h2>
              <p className="text-white/50">Highest converting products to promote</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/marketplace?affiliate=1">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {topProducts.map((p, i) => (
              <Card key={i} hover>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white font-bold mb-1">{p.name}</h3>
                      <Badge variant="secondary" className="text-xs">{p.category}</Badge>
                    </div>
                    <Badge variant="success" className="text-sm font-black">{p.commission}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">Avg Earning/Sale</span>
                    <span className="text-brand-400 font-bold">RWF {p.avgEarning.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1 mb-4">
                    <span className="text-white/50">Active Affiliates</span>
                    <span className="text-white">{p.sellers.toLocaleString()}</span>
                  </div>
                  <Button size="sm" className="w-full">
                    <Link2 className="h-3.5 w-3.5" /> Get Affiliate Link
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="warning" className="mb-3"><Award className="h-3.5 w-3.5" /> Leaderboard</Badge>
            <h2 className="text-3xl font-black text-white">Top Earners This Month</h2>
          </div>
          <div className="space-y-3">
            {topAffiliates.map((aff) => (
              <div key={aff.rank} className="glass-card-hover flex items-center gap-4 p-4">
                <span className="text-2xl w-8 text-center">{aff.badge}</span>
                <div className="text-3xl">{aff.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold">{aff.name}</p>
                  <div className="flex items-center gap-3 text-xs text-white/40 mt-0.5">
                    <span>{aff.conversions.toLocaleString()} conversions</span>
                    <span>•</span>
                    <Badge variant={aff.tier === "Gold" ? "warning" : "secondary"} className="text-xs py-0">{aff.tier}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-brand-400 font-black">RWF {(aff.earnings / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-white/30">this month</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/affiliates/leaderboard">Full Leaderboard <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto glass-card border-brand-500/20 p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600/15 to-accent-600/15 pointer-events-none" />
          <div className="relative z-10">
            <Zap className="h-10 w-10 text-brand-400 mx-auto mb-4" />
            <h2 className="text-3xl font-black text-white mb-3">Ready to Start Earning?</h2>
            <p className="text-white/60 mb-6">Join 25,000+ affiliates earning passive income on JIMVIO</p>
            <Button size="xl" asChild>
              <Link href="/register?role=affiliate">
                Join Affiliate Program Free <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
