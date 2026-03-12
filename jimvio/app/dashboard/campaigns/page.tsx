import React from "react";
import { Zap, Plus, Play, Pause, Users, Video, TrendingUp, DollarSign, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Progress } from "@/components/ui/progress";

const mockCampaigns = [
  {
    id: "1", title: "iPhone 15 Pro Launch", product: "iPhone 15 Pro Max",
    status: "active", influencers: 12, budget: 500000, spent: 320000,
    views: 284000, clicks: 18700, conversions: 142, revenue: 12070000,
    startDate: "Jan 15, 2025", endDate: "Feb 15, 2025",
  },
  {
    id: "2", title: "Next.js Course Promo Q1", product: "Next.js 15 Course",
    status: "active", influencers: 8, budget: 200000, spent: 145000,
    views: 156000, clicks: 12400, conversions: 892, revenue: 4014000,
    startDate: "Jan 1, 2025", endDate: "Mar 31, 2025",
  },
  {
    id: "3", title: "AI Bundle Mega Push", product: "AI Automation Bundle",
    status: "paused", influencers: 5, budget: 300000, spent: 210000,
    views: 98000, clicks: 9300, conversions: 567, revenue: 4252500,
    startDate: "Dec 1, 2024", endDate: "Dec 31, 2024",
  },
  {
    id: "4", title: "Fashion Week Collection", product: "Premium Fashion Bundle",
    status: "draft", influencers: 0, budget: 400000, spent: 0,
    views: 0, clicks: 0, conversions: 0, revenue: 0,
    startDate: "Feb 1, 2025", endDate: "Feb 28, 2025",
  },
];

const statusBadge = {
  active: { variant: "success" as const, label: "Active" },
  paused: { variant: "warning" as const, label: "Paused" },
  draft: { variant: "secondary" as const, label: "Draft" },
  completed: { variant: "secondary" as const, label: "Completed" },
};

const topInfluencers = [
  { name: "Amina Mukamana", followers: "145K", platform: "TikTok", conversions: 312, earnings: 540000 },
  { name: "Eric Nzaba", followers: "89K", platform: "Instagram", conversions: 248, earnings: 432000 },
  { name: "Grace Uwera", followers: "62K", platform: "YouTube", conversions: 189, earnings: 328500 },
  { name: "Patrick Habimana", followers: "41K", platform: "TikTok", conversions: 143, earnings: 248250 },
];

export default function CampaignsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Influencer Campaigns</h1>
          <p className="text-white/50 text-sm mt-1">Manage your viral marketing campaigns</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> New Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Campaigns" value="12" change={50} icon={<Zap className="h-4 w-4" />} iconColor="from-pink-600 to-rose-600" />
        <StatCard title="Active Influencers" value="25" change={25} icon={<Users className="h-4 w-4" />} iconColor="from-purple-600 to-brand-600" />
        <StatCard title="Total Views" value="538K" change={42.3} icon={<Eye className="h-4 w-4" />} iconColor="from-cyan-600 to-blue-600" />
        <StatCard title="Campaign Revenue" value="RWF 20.3M" change={58.7} icon={<DollarSign className="h-4 w-4" />} iconColor="from-amber-600 to-orange-600" />
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {mockCampaigns.map((campaign) => {
          const status = statusBadge[campaign.status as keyof typeof statusBadge];
          const budgetUsed = campaign.budget > 0 ? Math.round((campaign.spent / campaign.budget) * 100) : 0;
          return (
            <Card key={campaign.id} hover>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={status.variant}>{status.label}</Badge>
                      <span className="text-xs text-white/30">{campaign.startDate} → {campaign.endDate}</span>
                    </div>
                    <h3 className="text-white font-bold">{campaign.title}</h3>
                    <p className="text-xs text-white/50 mt-0.5">{campaign.product}</p>
                  </div>
                  <div className="flex gap-1.5">
                    {campaign.status === "active" ? (
                      <Button size="icon-sm" variant="glass"><Pause className="h-3.5 w-3.5" /></Button>
                    ) : campaign.status === "paused" ? (
                      <Button size="icon-sm" variant="glass"><Play className="h-3.5 w-3.5" /></Button>
                    ) : null}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: "Views", value: campaign.views > 0 ? `${(campaign.views / 1000).toFixed(0)}K` : "—", icon: "👁" },
                    { label: "Clicks", value: campaign.clicks > 0 ? `${(campaign.clicks / 1000).toFixed(1)}K` : "—", icon: "🖱" },
                    { label: "Conv.", value: campaign.conversions > 0 ? campaign.conversions.toString() : "—", icon: "✅" },
                    { label: "Revenue", value: campaign.revenue > 0 ? `RWF ${(campaign.revenue / 1000000).toFixed(1)}M` : "—", icon: "💰" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-2.5 text-center">
                      <div className="text-base mb-1">{stat.icon}</div>
                      <div className="text-sm font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-white/30">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Budget */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-white/50">Budget Used</span>
                    <span className="text-white font-medium">
                      RWF {campaign.spent.toLocaleString()} / {campaign.budget.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={budgetUsed} className="h-2" />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-white/30">{budgetUsed}% used</span>
                    <span className="text-xs text-white/30">{campaign.influencers} influencers</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Top Influencers Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Top Performing Influencers</CardTitle>
            <Button variant="glass" size="sm">
              <Plus className="h-4 w-4" /> Recruit Influencers
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {["Influencer", "Platform", "Followers", "Conversions", "Earnings", ""].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-white/40 px-5 py-3 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topInfluencers.map((inf, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-all">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center text-sm font-bold text-white">
                        {inf.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="text-sm font-medium text-white">{inf.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant="glass">{inf.platform}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-white">{inf.followers}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-emerald-400">{inf.conversions}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-bold text-white">RWF {inf.earnings.toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-4">
                    <Button size="sm" variant="glass">View Profile</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
