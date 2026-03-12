"use client";
export const dynamic = "force-dynamic";
import { RevenueChart } from "@/components/charts/revenue-chart";
import React from "react";
import {
  Users, Package, ShoppingCart, DollarSign, AlertTriangle,
  Shield, TrendingUp, UserCheck, Activity, Ban, CheckCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const pendingVerifications = [
  { name: "TechZone Pro", type: "Vendor", submitted: "2h ago", status: "pending", country: "Rwanda" },
  { name: "AgriBiz Rwanda", type: "Vendor", submitted: "4h ago", status: "pending", country: "Rwanda" },
  { name: "FashionHub EA", type: "Vendor", submitted: "6h ago", status: "pending", country: "Kenya" },
  { name: "Digital Assets Co", type: "Vendor", submitted: "8h ago", status: "pending", country: "Nigeria" },
];

const recentFlags = [
  { type: "fraud", message: "Suspicious order pattern detected", user: "user@example.com", time: "30m ago", severity: "high" },
  { type: "dispute", message: "Buyer opened dispute on order #JV-A8B2C3", user: "buyer@example.com", time: "2h ago", severity: "medium" },
  { type: "fraud", message: "Multiple failed payment attempts", user: "suspect@example.com", time: "3h ago", severity: "high" },
  { type: "report", message: "Product reported for misleading description", user: "reporter@example.com", time: "5h ago", severity: "low" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
          <p className="text-white/50 text-sm mt-1">Platform overview and management</p>
        </div>
        <Badge variant="destructive" className="px-3 py-1.5">
          <Shield className="h-3.5 w-3.5 mr-1" /> Admin Access
        </Badge>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value="84,240" change={12.8} icon={<Users className="h-4 w-4" />} iconColor="from-brand-600 to-accent-600" />
        <StatCard title="Active Vendors" value="10,420" change={8.4} icon={<UserCheck className="h-4 w-4" />} iconColor="from-emerald-600 to-teal-600" />
        <StatCard title="Monthly Revenue" value="RWF 248M" change={22.6} icon={<DollarSign className="h-4 w-4" />} iconColor="from-amber-600 to-orange-600" />
        <StatCard title="Active Disputes" value="24" change={-15.2} icon={<AlertTriangle className="h-4 w-4" />} iconColor="from-red-600 to-rose-600" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Products Listed" value="524,000" change={5.2} icon={<Package className="h-4 w-4" />} iconColor="from-blue-600 to-cyan-600" />
        <StatCard title="Orders Today" value="1,842" change={18.9} icon={<ShoppingCart className="h-4 w-4" />} iconColor="from-purple-600 to-brand-600" />
        <StatCard title="Fraud Flags" value="7" change={-42.1} icon={<Ban className="h-4 w-4" />} iconColor="from-red-700 to-red-600" />
        <StatCard title="Platform Health" value="99.8%" change={0.1} icon={<Activity className="h-4 w-4" />} iconColor="from-emerald-600 to-green-600" />
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Revenue — 12 Months</CardTitle>
        </CardHeader>
        <CardContent>
          <RevenueChart height={280} />
        </CardContent>
      </Card>

      {/* Two-column section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Pending Verifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pending Verifications</CardTitle>
              <Badge variant="warning">{pendingVerifications.length} pending</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingVerifications.map((v, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-lg flex-shrink-0">
                  🏪
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{v.name}</p>
                  <p className="text-xs text-white/40">{v.type} • {v.country} • {v.submitted}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="icon-sm" variant="success" title="Approve" className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30">
                    <CheckCircle className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon-sm" title="Reject" className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-0">
                    <Ban className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="glass" size="sm">View All Verifications</Button>
          </CardContent>
        </Card>

        {/* Fraud & Flags */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Flags & Alerts</CardTitle>
              <Badge variant="destructive">Live</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentFlags.map((flag, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${
                flag.severity === "high"
                  ? "border-red-500/20 bg-red-500/5"
                  : flag.severity === "medium"
                  ? "border-amber-500/20 bg-amber-500/5"
                  : "border-white/10 bg-white/[0.02]"
              }`}>
                <div className="mt-0.5">
                  {flag.type === "fraud" ? (
                    <Shield className="h-4 w-4 text-red-400" />
                  ) : flag.type === "dispute" ? (
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-white/40" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium">{flag.message}</p>
                  <p className="text-xs text-white/40 mt-0.5">{flag.user} • {flag.time}</p>
                </div>
                <Badge
                  variant={flag.severity === "high" ? "destructive" : flag.severity === "medium" ? "warning" : "secondary"}
                  className="text-xs capitalize flex-shrink-0"
                >
                  {flag.severity}
                </Badge>
              </div>
            ))}
            <Button className="w-full" variant="glass" size="sm">View All Alerts</Button>
          </CardContent>
        </Card>
      </div>

      {/* Platform Breakdown */}
      <Card>
        <CardHeader><CardTitle>Role Distribution</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { role: "Buyers", count: 62480, percent: 74.2, color: "from-blue-600 to-cyan-600" },
              { role: "Vendors", count: 10420, percent: 12.4, color: "from-brand-600 to-accent-600" },
              { role: "Affiliates", count: 8240, percent: 9.8, color: "from-emerald-600 to-teal-600" },
              { role: "Influencers", count: 2100, percent: 2.5, color: "from-pink-600 to-rose-600" },
              { role: "Community", count: 1000, percent: 1.1, color: "from-amber-600 to-orange-600" },
            ].map((r, i) => (
              <div key={i} className="glass-card p-4 text-center">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center mx-auto mb-3`}>
                  <Users className="h-4 w-4 text-white" />
                </div>
                <p className="text-lg font-black text-white">{r.count.toLocaleString()}</p>
                <p className="text-xs text-white/50">{r.role}</p>
                <p className="text-xs text-brand-400 font-semibold mt-1">{r.percent}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
