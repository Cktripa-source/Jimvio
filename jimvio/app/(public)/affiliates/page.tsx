import React from "react";
import Link from "next/link";
import { TrendingUp, Link2, DollarSign, Users, Star, ArrowRight, Zap, Award, CheckCircle2, ShieldCheck, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getTopAffiliates } from "@/services/db";

export default async function AffiliatesPage() {
  const topEarners = await getTopAffiliates(5);

  const topProducts = [
    { name: "iPhone 15 Pro Max", category: "Electronics", commission: "8%", avgEarning: 68000, sellers: 1240 },
    { name: "Next.js 15 Course", category: "Courses", commission: "40%", avgEarning: 18000, sellers: 892 },
    { name: "Premium UI Kit", category: "Digital", commission: "50%", avgEarning: 17500, sellers: 2103 },
    { name: "AI Automation Bundle", commission: "35%", category: "Software", avgEarning: 26250, sellers: 567 },
    { name: "Python ML Bootcamp", category: "Courses", commission: "40%", avgEarning: 26000, sellers: 1590 },
    { name: "Notion Templates Pack", category: "Digital", commission: "45%", avgEarning: 8100, sellers: 5672 },
  ];

  return (
    <div className="bg-[var(--color-bg)] min-h-screen">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden bg-white border-b border-[var(--color-border)]">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--color-accent)]/5 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
          <Badge className="bg-[var(--color-accent-light)] text-[var(--color-accent)] border-none mb-6 px-4 py-1.5 capitalize tracking-widest font-black text-[10px]">
            <TrendingUp className="h-3.5 w-3.5 mr-2" /> Affiliate Program
          </Badge>
          <h1 className="text-5xl md:text-7xl font-[900] text-[var(--color-text-primary)] mb-8 tracking-tighter leading-[0.95]">
            Turn Your Influence Into <span className="text-[var(--color-accent)]">Income</span>
          </h1>
          <p className="text-[var(--color-text-secondary)] text-xl mb-12 max-w-2xl font-medium leading-relaxed">
            Market verified products from global suppliers. Earn up to 50% commission per sale and withdraw directly to your wallet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="xl" className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] font-black rounded-xl h-16 px-12 text-lg shadow-xl shadow-[var(--color-accent)]/20" asChild>
              <Link href="/register?role=affiliate">
                Join Now For Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="font-black rounded-xl h-16 px-12 text-lg border-2" asChild>
              <Link href="/marketplace">Explore Products</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
            {[
              { label: "Active Affiliates", value: "25,000+" },
              { label: "Catalog Size", value: "100k+ SKUs" },
              { label: "Max Commission", value: "50%" },
              { label: "Monthly Payout", value: "$4.2M+" },
            ].map((s, i) => (
              <div key={i} className="bg-white border border-[var(--color-border)] p-6 rounded-2xl shadow-sm">
                <p className="text-2xl font-black text-[var(--color-text-primary)] mb-1">{s.value}</p>
                <p className="text-[10px] text-[var(--color-text-muted)] font-black capitalize tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-[var(--color-text-primary)] mb-4">How You Earn</h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">Start your affiliate business on Jimvio in three simple steps.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              step: "01", 
              title: "Discover Products", 
              desc: "Select from a massive catalog of electronics, fashion, and digital products.",
              icon: <Globe className="h-6 w-6" />
            },
            { 
              step: "02", 
              title: "Share Your Link", 
              desc: "Promote on social media, your blog, or via direct messaging using smart tracking links.",
              icon: <Link2 className="h-6 w-6" />
            },
            { 
              step: "03", 
              title: "Earn Commissions", 
              desc: "Every successful purchase through your link adds to your balance instantly.",
              icon: <DollarSign className="h-6 w-6" />
            }
          ].map((item, i) => (
            <div key={i} className="relative bg-white border border-[var(--color-border)] p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow group">
              <span className="absolute top-4 right-8 text-5xl font-black text-[var(--color-accent)] opacity-5 group-hover:opacity-10 transition-opacity">{item.step}</span>
              <div className="h-12 w-12 rounded-xl bg-[var(--color-accent-light)] text-[var(--color-accent)] flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-black text-[var(--color-text-primary)] mb-4">{item.title}</h3>
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* High Converting Products */}
      <section className="py-24 bg-[var(--color-surface-secondary)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-[var(--color-text-primary)] mb-2">High Converting Products</h2>
              <p className="text-[var(--color-text-secondary)]">Current top performers for affiliates this week.</p>
            </div>
            <Button variant="ghost" className="font-bold text-[var(--color-accent)]" asChild>
              <Link href="/marketplace">View Full Catalog <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topProducts.map((p, i) => (
              <div key={i} className="bg-white border border-[var(--color-border)] rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <Badge variant="secondary" className="mb-2 text-[10px] capitalize font-bold">{p.category}</Badge>
                    <h3 className="font-black text-[var(--color-text-primary)] truncate max-w-[180px]">{p.name}</h3>
                  </div>
                  <div className="bg-[var(--color-accent-light)] text-[var(--color-accent)] font-black px-3 py-1 rounded-lg text-lg">
                    {p.commission}
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-muted)] font-medium">Potential Earning</span>
                    <span className="font-black text-[var(--color-text-primary)]">RWF {p.avgEarning.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-muted)] font-medium">Active Partners</span>
                    <span className="font-black text-[var(--color-text-primary)]">{p.sellers.toLocaleString()}</span>
                  </div>
                </div>

                <Button className="w-full bg-[#1a1a1a] hover:bg-black font-bold h-11 rounded-xl">
                  <Link2 className="h-4 w-4 mr-2" /> Generate Link
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <Badge className="bg-orange-50 text-orange-600 mb-4 px-3 py-1 capitalize tracking-widest font-black text-[10px]">
            <Award className="h-3.5 w-3.5 mr-2" /> Top Performers
          </Badge>
          <h2 className="text-3xl font-black text-[var(--color-text-primary)]">Affiliate Leaderboard</h2>
        </div>
        
        <div className="bg-white border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-xl">
          {topEarners.length > 0 ? (
            <div className="divide-y divide-[var(--color-border)]">
              {topEarners.map((aff: any, idx: number) => (
                <div key={aff.id} className="flex items-center gap-6 p-6 hover:bg-[var(--color-surface-secondary)] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center font-black text-[var(--color-accent)] shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-[var(--color-text-primary)] truncate capitalize tracking-tight">User #{aff.user_id.slice(0, 8)}</h4>
                    <p className="text-xs text-[var(--color-text-muted)] font-bold">{aff.total_conversions || 0} CONVERSIONS</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-[var(--color-accent)] leading-none">${(aff.total_earnings || 0).toLocaleString()}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)] font-black capitalize mt-1">TOTAL EARNINGS</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-[var(--color-text-muted)]">
              No earnings recorded yet this month. Be the first!
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto bg-[#1a1a1a] rounded-[2.5rem] p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)] opacity-10 blur-[100px]" />
          <Zap className="h-12 w-12 text-[var(--color-accent)] mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Launch Your Affiliate Empire</h2>
          <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Market verified products from global suppliers. Earn up to 50% commission per sale and withdraw directly to your wallet.
          </p>
          <Button size="xl" className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-black rounded-xl h-16 px-12 shadow-2xl shadow-[var(--color-accent)]/40" asChild>
            <Link href="/register?role=affiliate">Activate Your Account Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
