"use client";

export const dynamic = "force-dynamic";

import React from "react";
import { Users, Package, ShoppingCart, DollarSign, AlertTriangle, Shield, TrendingUp, UserCheck, CheckCircle, Ban } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { RevenueChart } from "@/components/charts/revenue-chart";

const pending = [
  { name: "TechZone Pro",     type: "Vendor", time: "2h ago",  country: "Rwanda"  },
  { name: "AgriBiz Rwanda",   type: "Vendor", time: "4h ago",  country: "Rwanda"  },
  { name: "FashionHub EA",    type: "Vendor", time: "6h ago",  country: "Kenya"   },
  { name: "Digital Assets Co",type: "Vendor", time: "8h ago",  country: "Nigeria" },
];

const flags = [
  { type: "fraud",   msg: "Suspicious order pattern detected",          user: "user@example.com",    severity: "high",   time: "30m" },
  { type: "dispute", msg: "Buyer opened dispute on order #JV-A8B2C3",  user: "buyer@example.com",   severity: "medium", time: "2h"  },
  { type: "fraud",   msg: "Multiple failed payment attempts",           user: "suspect@example.com", severity: "high",   time: "3h"  },
  { type: "report",  msg: "Product reported for misleading description",user: "reporter@example.com",severity: "low",    time: "5h"  },
];

export default function AdminPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-base">Admin Dashboard</h1>
          <p className="text-sm text-muted-c mt-0.5">Platform overview and management</p>
        </div>
        <Badge variant="destructive" className="px-3 py-1.5">
          <Shield className="h-3.5 w-3.5 mr-1" /> Admin Access
        </Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users"      value="84,240"   change={12.8} icon={<Users       className="h-4 w-4" />} iconColor="bg-primary-50 dark:bg-primary-900/30 text-primary-600" />
        <StatCard title="Active Vendors"   value="10,420"   change={8.4}  icon={<UserCheck   className="h-4 w-4" />} iconColor="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600" />
        <StatCard title="Monthly Revenue"  value="RWF 248M" change={22.6} icon={<DollarSign  className="h-4 w-4" />} iconColor="bg-amber-50 dark:bg-amber-900/30 text-amber-600" />
        <StatCard title="Active Disputes"  value="24"       change={-15.2} icon={<AlertTriangle className="h-4 w-4" />} iconColor="bg-red-50 dark:bg-red-900/30 text-red-600" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Products Listed"  value="524K"    change={5.2}  icon={<Package     className="h-4 w-4" />} iconColor="bg-blue-50 dark:bg-blue-900/30 text-blue-600" />
        <StatCard title="Orders Today"     value="1,842"   change={18.9} icon={<ShoppingCart className="h-4 w-4" />} iconColor="bg-purple-50 dark:bg-purple-900/30 text-purple-600" />
        <StatCard title="Fraud Flags"      value="7"       change={-42.1} icon={<Ban className="h-4 w-4" />} iconColor="bg-red-50 dark:bg-red-900/30 text-red-600" />
        <StatCard title="Platform Health"  value="99.8%"   change={0.1}  icon={<TrendingUp  className="h-4 w-4" />} iconColor="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600" />
      </div>

      <Card>
        <CardHeader className="pt-5 px-5 pb-4"><CardTitle>Platform Revenue — 12 Months</CardTitle></CardHeader>
        <CardContent className="px-5 pb-5 pt-0"><RevenueChart height={260} /></CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <Card>
          <CardHeader className="pt-5 px-5 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Pending Verifications</CardTitle>
              <Badge variant="warning">{pending.length} pending</Badge>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-0 space-y-2">
            {pending.map((v, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-subtle transition-all">
                <div className="w-10 h-10 rounded-xl bg-subtle border border-base flex items-center justify-center text-xl shrink-0">🏪</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-base">{v.name}</p>
                  <p className="text-xs text-muted-c">{v.type} · {v.country} · {v.time}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="btn btn-sm border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40">
                    <CheckCircle className="h-3.5 w-3.5" />
                  </button>
                  <button className="btn btn-sm border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100">
                    <Ban className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pt-5 px-5 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Flags & Alerts</CardTitle>
              <Badge variant="destructive">Live</Badge>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-0 space-y-2">
            {flags.map((f, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${
                f.severity === "high"   ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10"    :
                f.severity === "medium" ? "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10" :
                "border-base bg-subtle"
              }`}>
                {f.type === "fraud" ? (
                  <Shield className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-base">{f.msg}</p>
                  <p className="text-xs text-muted-c mt-0.5">{f.user} · {f.time} ago</p>
                </div>
                <Badge
                  variant={f.severity === "high" ? "destructive" : f.severity === "medium" ? "warning" : "secondary"}
                  className="shrink-0 capitalize"
                >
                  {f.severity}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
