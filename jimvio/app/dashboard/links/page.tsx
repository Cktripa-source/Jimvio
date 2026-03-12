"use client";
export const dynamic = "force-dynamic";
import { RevenueChart } from "@/components/charts/revenue-chart";
import React from "react";
import Link from "next/link";
import { Link2, Plus, Copy, TrendingUp, DollarSign, MousePointer, ShoppingCart, ExternalLink, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";

const mockLinks = [
  { id: "1", product: "iPhone 15 Pro Max", code: "LNK-A8B2C3D4", clicks: 4820, conversions: 142, earnings: 1207000, rate: 8, ctr: 2.9, status: "active" },
  { id: "2", product: "Next.js 15 Course", code: "LNK-E5F6G7H8", clicks: 12400, conversions: 892, earnings: 2007000, rate: 10, ctr: 7.2, status: "active" },
  { id: "3", product: "Premium UI Kit", code: "LNK-I9J1K2L3", clicks: 28700, conversions: 2103, earnings: 1841250, rate: 15, ctr: 7.3, status: "active" },
  { id: "4", product: "AI Automation Bundle", code: "LNK-M4N5O6P7", clicks: 9300, conversions: 567, earnings: 1276875, rate: 10, ctr: 6.1, status: "active" },
  { id: "5", product: "Python ML Bootcamp", code: "LNK-Q8R9S1T2", clicks: 6200, conversions: 310, earnings: 806300, rate: 8, ctr: 5.0, status: "paused" },
];

const clickData = [
  { month: "Jan", revenue: 42000, orders: 820, affiliate: 0 },
  { month: "Feb", revenue: 38000, orders: 740, affiliate: 0 },
  { month: "Mar", revenue: 59000, orders: 1100, affiliate: 0 },
  { month: "Apr", revenue: 71000, orders: 1380, affiliate: 0 },
  { month: "May", revenue: 65000, orders: 1260, affiliate: 0 },
  { month: "Jun", revenue: 88000, orders: 1720, affiliate: 0 },
  { month: "Jul", revenue: 76000, orders: 1480, affiliate: 0 },
  { month: "Aug", revenue: 92000, orders: 1810, affiliate: 0 },
];

export default function AffiliateLinksPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Affiliate Links</h1>
          <p className="text-white/50 text-sm mt-1">Generate and manage your affiliate links</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Create Link
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Clicks" value="61,420" change={22.4} icon={<MousePointer className="h-4 w-4" />} iconColor="from-brand-600 to-accent-600" />
        <StatCard title="Conversions" value="4,014" change={18.9} icon={<ShoppingCart className="h-4 w-4" />} iconColor="from-emerald-600 to-teal-600" />
        <StatCard title="Total Earnings" value="RWF 7.1M" change={31.2} icon={<DollarSign className="h-4 w-4" />} iconColor="from-amber-600 to-orange-600" />
        <StatCard title="Avg CTR" value="6.5%" change={4.1} icon={<TrendingUp className="h-4 w-4" />} iconColor="from-pink-600 to-rose-600" />
      </div>

      {/* Clicks Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Clicks & Earnings Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart data={clickData} type="area" dataKey="orders" height={240} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Earnings Breakdown</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-white/60">Available</span>
                <span className="text-xs font-bold text-emerald-400">RWF 4.2M</span>
              </div>
              <Progress value={59} indicatorClassName="bg-gradient-to-r from-emerald-500 to-teal-500" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-white/60">Pending</span>
                <span className="text-xs font-bold text-amber-400">RWF 1.8M</span>
              </div>
              <Progress value={25} indicatorClassName="bg-gradient-to-r from-amber-500 to-orange-500" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-white/60">Paid Out</span>
                <span className="text-xs font-bold text-white/60">RWF 1.1M</span>
              </div>
              <Progress value={16} indicatorClassName="bg-gradient-to-r from-slate-500 to-slate-600" />
            </div>
            <div className="pt-3 border-t border-white/10">
              <Button className="w-full" size="sm">
                <DollarSign className="h-4 w-4" /> Withdraw Earnings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Links Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>My Affiliate Links</CardTitle>
            <Badge variant="secondary">{mockLinks.length} links</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {["Product", "Link Code", "Clicks", "Conversions", "CTR", "Earnings", "Status", ""].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-white/40 px-5 py-3 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockLinks.map((link) => (
                  <tr key={link.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all group">
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-white">{link.product}</p>
                      <p className="text-xs text-white/30 mt-0.5">{link.rate}% commission</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-brand-400 bg-brand-500/10 px-2 py-1 rounded-lg">{link.code}</span>
                        <button className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-white/10 transition-all text-white/50 hover:text-white">
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-white">{link.clicks.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-white">{link.conversions.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-emerald-400">{link.ctr}%</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-bold text-white">{formatCurrency(link.earnings)}</span>
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant={link.status === "active" ? "success" : "warning"}>
                        {link.status === "active" ? "Active" : "Paused"}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon-sm" variant="ghost">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="icon-sm" variant="ghost">
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
