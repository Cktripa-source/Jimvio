"use client";
export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import { Users, Package, ShoppingCart, DollarSign, AlertTriangle, Shield, TrendingUp, UserCheck, CheckCircle, Ban } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { formatCurrency } from "@/lib/utils";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { createClient } from "@/lib/supabase/client";

export default function AdminPage() {
  const [stats, setStats] = useState({ totalUsers: 0, activeVendors: 0, totalProducts: 0, monthlyRevenue: 0, totalOrders: 0, pendingVendors: 0 });
  const [pendingVendors, setPendingVendors] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const admin = supabase; // use anon key for now — admin reads
      const [usersRes, vendorsRes, productsRes, ordersRes, pendingRes] = await Promise.all([
        admin.from("profiles").select("id", { count: "exact", head: true }),
        admin.from("vendors").select("id", { count: "exact", head: true }).eq("is_active", true),
        admin.from("products").select("id", { count: "exact", head: true }).eq("is_active", true),
        admin.from("orders").select("id, total_amount").gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
        admin.from("vendors").select("id, business_name, business_country, created_at").eq("verification_status", "pending").limit(10),
      ]);

      const monthlyRevenue = ordersRes.data?.reduce((s, o) => s + Number(o.total_amount ?? 0), 0) ?? 0;
      setStats({
        totalUsers:     usersRes.count    ?? 0,
        activeVendors:  vendorsRes.count  ?? 0,
        totalProducts:  productsRes.count ?? 0,
        monthlyRevenue,
        totalOrders:    ordersRes.data?.length ?? 0,
        pendingVendors: pendingRes.data?.length ?? 0,
      });
      setPendingVendors(pendingRes.data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Admin Dashboard</h1>
          <p className="text-sm text-muted-c mt-0.5">Platform overview and management</p>
        </div>
        <Badge variant="destructive" className="px-3 py-1.5">
          <Shield className="h-3.5 w-3.5 mr-1" /> Admin Access
        </Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users"     value={stats.totalUsers.toLocaleString()}         change={12.8} icon={<Users       className="h-4 w-4" />} iconColor="from-primary-600 to-accent-600" />
        <StatCard title="Active Vendors"  value={stats.activeVendors.toLocaleString()}       change={8.4}  icon={<UserCheck   className="h-4 w-4" />} iconColor="from-emerald-600 to-teal-600" />
        <StatCard title="Monthly Revenue" value={formatCurrency(stats.monthlyRevenue)}       change={22.6} icon={<DollarSign  className="h-4 w-4" />} iconColor="from-amber-600 to-orange-600" />
        <StatCard title="Pending Verify"  value={stats.pendingVendors}                       change={-15.2}icon={<AlertTriangle className="h-4 w-4" />} iconColor="from-red-600 to-rose-600" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Products Listed"  value={stats.totalProducts.toLocaleString()}     change={5.2}  icon={<Package     className="h-4 w-4" />} iconColor="from-blue-600 to-cyan-600" />
        <StatCard title="Orders (30d)"     value={stats.totalOrders.toLocaleString()}        change={18.9} icon={<ShoppingCart className="h-4 w-4" />} iconColor="from-primary-600 to-accent-600" />
        <StatCard title="Fraud Flags"      value="0"                                         change={-42.1}icon={<Ban         className="h-4 w-4" />} iconColor="from-red-700 to-red-600" />
        <StatCard title="Platform Health"  value="99.9%"                                     change={0.1}  icon={<TrendingUp  className="h-4 w-4" />} iconColor="from-emerald-600 to-green-600" />
      </div>

      <Card>
        <CardHeader className="pt-4 px-4 pb-3"><CardTitle>Platform Revenue — 12 Months</CardTitle></CardHeader>
        <CardContent className="px-4 pb-4 pt-0"><RevenueChart height={260} /></CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Pending Verifications */}
        <Card>
          <CardHeader className="pt-4 px-4 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Pending Verifications</CardTitle>
              <Badge variant={pendingVendors.length > 0 ? "warning" : "success"}>
                {pendingVendors.length} pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0 space-y-2">
            {pendingVendors.length === 0 ? (
              <div className="text-center py-8 text-muted-c">
                <CheckCircle className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-[var(--color-text-primary)]">All caught up!</p>
                <p className="text-xs">No pending vendor verifications.</p>
              </div>
            ) : (
              pendingVendors.map((v: Record<string, unknown>, i: number) => {
                const prof = v.profiles as Record<string, unknown> | null;
                return (
                  <div key={v.id as string} className="flex items-center gap-3 p-3 rounded-lg hover:bg-subtle transition-all">
                    <div className="w-10 h-10 rounded-lg bg-subtle border border-base flex items-center justify-center text-xl shrink-0">🏪</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--color-text-primary)]">{v.business_name as string}</p>
                      <p className="text-xs text-muted-c">{prof?.email as string ?? "—"} · {v.business_country as string}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button className="btn btn-sm border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300">
                        <CheckCircle className="h-3.5 w-3.5" />
                      </button>
                      <button className="btn btn-sm border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                        <Ban className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Platform Summary */}
        <Card>
          <CardHeader className="pt-4 px-4 pb-3"><CardTitle>Platform Summary</CardTitle></CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Buyers",       count: Math.max(0, stats.totalUsers - stats.activeVendors), color: "bg-blue-50 dark:bg-blue-900/30 text-blue-600" },
                { label: "Vendors",      count: stats.activeVendors,  color: "bg-[var(--color-accent-light)] text-[var(--color-accent)]" },
                { label: "Products",     count: stats.totalProducts,  color: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700" },
                { label: "Orders (30d)", count: stats.totalOrders,    color: "bg-amber-50 dark:bg-amber-900/30 text-amber-700" },
              ].map((r, i) => (
                <div key={i} className={`rounded-2xl p-4 text-center ${r.color}`}>
                  <p className="text-2xl font-extrabold">{r.count.toLocaleString()}</p>
                  <p className="text-xs font-medium mt-0.5 opacity-80">{r.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
