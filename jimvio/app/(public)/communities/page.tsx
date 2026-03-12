import React from "react";
import Link from "next/link";
import { Users, Lock, Globe, Star, TrendingUp, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const communities = [
  {
    id: "1", name: "Rwanda Dev Community", slug: "rwanda-dev", description: "The largest community for developers in Rwanda and East Africa. Weekly live sessions, code reviews, and job opportunities.",
    owner: "Eric Nzabahimana", avatar: "👨🏿‍💻", members: 2840, posts: 1240, category: "Technology",
    monthlyPrice: 15000, yearlyPrice: 150000, isPrivate: false, isFeatured: true, rating: 4.9,
  },
  {
    id: "2", name: "African E-Commerce Mastery", slug: "african-ecommerce", description: "Learn to build and scale e-commerce businesses in Africa. Strategies, tools, and real case studies.",
    owner: "Amina Mukamana", avatar: "👩🏿‍💼", members: 1620, posts: 890, category: "Business",
    monthlyPrice: 25000, yearlyPrice: 250000, isPrivate: true, isFeatured: true, rating: 4.8,
  },
  {
    id: "3", name: "Digital Creators Hub", slug: "digital-creators", description: "For content creators, designers, and digital product sellers. Share work, get feedback, and grow together.",
    owner: "Grace Uwera", avatar: "👩🏿‍🎨", members: 4100, posts: 2800, category: "Creators",
    monthlyPrice: 10000, yearlyPrice: 95000, isPrivate: false, isFeatured: false, rating: 4.7,
  },
  {
    id: "4", name: "Kigali Investors Circle", slug: "kigali-investors", description: "Exclusive community for serious investors and entrepreneurs in Rwanda. Deals, pitches, and networking.",
    owner: "Patrick Habimana", avatar: "👨🏿‍💼", members: 580, posts: 420, category: "Finance",
    monthlyPrice: 50000, yearlyPrice: 480000, isPrivate: true, isFeatured: true, rating: 4.9,
  },
  {
    id: "5", name: "AI & Automation Masters", slug: "ai-automation", description: "Deep dive into AI tools, automation workflows, and building AI-powered products. Practical, results-focused.",
    owner: "Jean-Pierre Uwimana", avatar: "👨🏿‍🔬", members: 1180, posts: 660, category: "Technology",
    monthlyPrice: 35000, yearlyPrice: 330000, isPrivate: false, isFeatured: false, rating: 4.8,
  },
  {
    id: "6", name: "Fashion Africa Network", slug: "fashion-africa", description: "Connect with African fashion designers, retailers, and brand builders. Trends, markets, and collaborations.",
    owner: "Chloe Uwimbabazi", avatar: "👩🏿‍🎤", members: 3200, posts: 1800, category: "Fashion",
    monthlyPrice: 12000, yearlyPrice: 110000, isPrivate: false, isFeatured: false, rating: 4.6,
  },
];

const categories = ["All", "Technology", "Business", "Finance", "Creators", "Fashion", "Health", "Education"];

export default function CommunitiesPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <div className="relative py-16 px-4 text-center border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/20 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Badge variant="default" className="mb-4">
            <Users className="h-3.5 w-3.5" /> Communities
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Find Your <span className="gradient-text">Community</span>
          </h1>
          <p className="text-white/60 text-lg mb-8">
            Join paid communities led by experts, creators, and entrepreneurs. Monthly, yearly, or lifetime access.
          </p>
          <div className="flex items-center gap-3 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                placeholder="Search communities..."
                className="w-full h-10 pl-9 pr-4 rounded-xl bg-white/10 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4" /> Create Community
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${i === 0 ? "bg-brand-600 text-white shadow-brand" : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Active Communities", value: "1,240+", icon: <Users className="h-4 w-4" /> },
            { label: "Total Members", value: "85,000+", icon: <TrendingUp className="h-4 w-4" /> },
            { label: "Avg Monthly Posts", value: "12,500+", icon: <Star className="h-4 w-4" /> },
          ].map((s, i) => (
            <div key={i} className="glass-card p-4 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-brand-500/20 text-brand-400">{s.icon}</div>
              <div>
                <p className="text-lg font-black text-white">{s.value}</p>
                <p className="text-xs text-white/50">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {communities.map((community) => (
            <Link key={community.id} href={`/communities/${community.slug}`}>
              <Card hover className="h-full group">
                <CardContent className="p-5 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-600 to-accent-600 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                      {community.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-bold text-sm truncate group-hover:text-brand-300 transition-colors">
                          {community.name}
                        </h3>
                        {community.isFeatured && <Badge variant="accent" className="text-xs py-0 flex-shrink-0">Featured</Badge>}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs py-0">{community.category}</Badge>
                        {community.isPrivate ? (
                          <span className="flex items-center gap-1 text-xs text-white/40">
                            <Lock className="h-2.5 w-2.5" /> Private
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-white/40">
                            <Globe className="h-2.5 w-2.5" /> Public
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {community.description}
                  </p>

                  {/* Owner */}
                  <p className="text-xs text-white/40 mb-3">
                    Owned by <span className="text-white/60">{community.owner}</span>
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {community.members.toLocaleString()} members
                    </span>
                    <span>{community.posts.toLocaleString()} posts</span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="h-3 w-3 fill-amber-400" /> {community.rating}
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div>
                      <span className="text-brand-400 font-black text-lg">
                        RWF {community.monthlyPrice.toLocaleString()}
                      </span>
                      <span className="text-white/40 text-xs">/month</span>
                    </div>
                    <Button size="sm" variant="default">Join Now</Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
