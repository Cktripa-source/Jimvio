"use client";
export const dynamic = "force-dynamic";
import { RevenueChart } from "@/components/charts/revenue-chart";
import React from "react";
import { BarChart3, TrendingUp, Users, Globe, ShoppingCart, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const conversionFunnel = [
  { stage: "Product Views", value: 52840, percent: 100, color: "from-brand-600 to-brand-500" },
  { stage: "Add to Cart", value: 8420, percent: 15.9, color: "from-blue-600 to-cyan-600" },
  { stage: "Checkout Started", value: 4210, percent: 7.9, color: "from-amber-600 to-yellow-600" },
  { stage: "Purchase Completed", value: 1248, percent: 2.3, color: "from-emerald-600 to-teal-600" },
];

const trafficSources = [
  { source: "Organic Search", visitors: 18420, percent: 34.8, change: 12.4 },
  { source: "Affiliate Links", visitors: 15840, percent: 30.0, change: 28.9 },
  { source: "Social Media", visitors: 9200, percent: 17.4, change: 45.2 },
  { source: "Direct", visitors: 6280, percent: 11.9, change: 8.1 },
  { source: "Email", visitors: 3060, percent: 5.8, change: -2.3 },
];

const topCountries = [
  { country: "🇷🇼 Rwanda", sales: 4820, percent: 38.6 },
  { country: "🇰🇪 Kenya", sales: 2140, percent: 17.1 },
  { country: "🇺🇬 Uganda", sales: 1560, percent: 12.5 },
  { country: "🇹🇿 Tanzania", sales: 1240, percent: 9.9 },
  { country: "🌍 Other Africa", sales: 1080, percent: 8.6 },
  { country: "🌐 Global", sales: 1648, percent: 13.2 },
];

const weeklyData = [
  { month: "Mon", revenue: 124000, orders: 12, affiliate: 0 },
  { month: "Tue", revenue: 185000, orders: 18, affiliate: 0 },
  { month: "Wed", revenue: 156000, orders: 15, affiliate: 0 },
  { month: "Thu", revenue: 210000, orders: 21, affiliate: 0 },
  { month: "Fri", revenue: 248000, orders: 25, affiliate: 0 },
  { month: "Sat", revenue: 192000, orders: 19, affiliate: 0 },
  { month: "Sun", revenue: 134000, orders: 13, affiliate: 0 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Analytics</h1>
          <p className="text-white/50 text-sm mt-1">Deep insights into your platform performance</p>
        </div>
        <div className="flex gap-2">
          {["7D", "30D", "90D", "1Y"].map((p, i) => (
            <button
              key={p}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${i === 1 ? "bg-brand-600 text-white shadow-brand" : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/10"}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value="RWF 12.4M" change={18.2} icon={<DollarSign className="h-4 w-4" />} iconColor="from-brand-600 to-accent-600" />
        <StatCard title="Unique Visitors" value="52,840" change={24.6} icon={<Users className="h-4 w-4" />} iconColor="from-blue-600 to-cyan-600" />
        <StatCard title="Conversion Rate" value="2.36%" change={0.42} icon={<TrendingUp className="h-4 w-4" />} iconColor="from-emerald-600 to-teal-600" />
        <StatCard title="Avg Order Value" value="RWF 9,934" change={6.8} icon={<ShoppingCart className="h-4 w-4" />} iconColor="from-amber-600 to-orange-600" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue — This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Orders — This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart data={weeklyData} type="bar" dataKey="orders" height={300} />
          </CardContent>
        </Card>
      </div>

      {/* Funnel + Traffic + Countries */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Conversion Funnel */}
        <Card>
          <CardHeader><CardTitle>Conversion Funnel</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {conversionFunnel.map((stage, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm text-white/70">{stage.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{stage.value.toLocaleString()}</span>
                    <Badge variant="secondary" className="text-xs">{stage.percent}%</Badge>
                  </div>
                </div>
                <Progress value={stage.percent} indicatorClassName={`bg-gradient-to-r ${stage.color}`} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader><CardTitle>Traffic Sources</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {trafficSources.map((source, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-white/70 truncate">{source.source}</span>
                    <span className="text-sm font-bold text-white ml-2">{source.visitors.toLocaleString()}</span>
                  </div>
                  <Progress value={source.percent} className="h-1.5" />
                </div>
                <span className={`text-xs font-semibold flex-shrink-0 ${source.change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {source.change >= 0 ? "+" : ""}{source.change}%
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Countries */}
        <Card>
          <CardHeader><CardTitle>Top Countries</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {topCountries.map((c, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-white/70">{c.country}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{c.sales.toLocaleString()}</span>
                    <span className="text-xs text-white/40">{c.percent}%</span>
                  </div>
                </div>
                <Progress value={c.percent} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
