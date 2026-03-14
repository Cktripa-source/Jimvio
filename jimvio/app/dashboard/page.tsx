"use client";
export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";
import {
  DollarSign, ShoppingCart, Package, TrendingUp,
  ArrowRight, Link2, Zap, Plus, BarChart3, Star, Wallet
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";

const statusMap: Record<string, { label: string; variant: "success" | "warning" | "secondary" | "accent" | "default" }> = {
  pending:    { label: "Pending",    variant: "warning" },
  confirmed:  { label: "Confirmed",  variant: "accent"  },
  processing: { label: "Processing", variant: "default" },
  shipped:    { label: "Shipped",    variant: "accent"  },
  delivered:  { label: "Delivered",  variant: "success" },
  cancelled:  { label: "Cancelled",  variant: "secondary" },
};

export default function DashboardPage() {
  const [profile, setProfile]         = useState<Record<string, unknown> | null>(null);
  const [vendor, setVendor]           = useState<Record<string, unknown> | null>(null);
  const [stats, setStats]             = useState({ totalRevenue: 0, totalOrders: 0, activeProducts: 0, monthlyRevenue: 0 });
  const [recentOrders, setRecentOrders] = useState<Record<string, unknown>[]>([]);
  const [topProducts, setTopProducts] = useState<Record<string, unknown>[]>([]);
  const [chartData, setChartData]     = useState<{ month: string; revenue: number; orders: number; affiliate: number }[]>([]);
  const [loading, setLoading]         = useState(true);
  const [wallet, setWallet]           = useState<Record<string, unknown> | null>(null);
  const [influencer, setInfluencer]   = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Load profile & roles
        const { data: prof } = await supabase
          .from("profiles")
          .select("*, user_roles(*)")
          .eq("id", user.id)
          .single();
        setProfile(prof);

        // Load wallet
        const { data: wal } = await supabase.from("wallets").select("*").eq("user_id", user.id).maybeSingle();
        setWallet(wal);

        // Check roles
        const [vendorRes, affiliateRes, influencerRes] = await Promise.all([
          supabase.from("vendors").select("*").eq("user_id", user.id).maybeSingle(),
          supabase.from("affiliates").select("*").eq("user_id", user.id).maybeSingle(),
          supabase.from("influencers").select("*").eq("user_id", user.id).maybeSingle(),
        ]);

        const vend = vendorRes.data;
        const aff  = affiliateRes.data;
        const inf  = influencerRes.data;
        setVendor(vend);
        setInfluencer(inf);

        // If we have a preferred role or vendor as default
        if (vend) {
          const now  = new Date();
          const mo30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

          const [productsRes, ordersRes, allOrdersRes] = await Promise.all([
            supabase.from("products").select("id, status").eq("vendor_id", vend.id).eq("is_active", true),
            supabase.from("order_items").select("total_price, created_at").eq("vendor_id", vend.id).gte("created_at", mo30),
            supabase.from("orders")
              .select("id, order_number, status, total_amount, currency, created_at, profiles(full_name, email), order_items!inner(product_name, vendor_id)")
              .eq("order_items.vendor_id", vend.id)
              .order("created_at", { ascending: false })
              .limit(5),
          ]);

          const active  = productsRes.data?.filter(p => p.status === "active").length ?? 0;
          const monthly = ordersRes.data?.reduce((s, o) => s + Number(o.total_price), 0) ?? 0;

          setStats({
            totalRevenue:    Number(vend.total_revenue ?? 0),
            totalOrders:     vend.total_sales ?? 0,
            activeProducts:  active,
            monthlyRevenue:  monthly,
          });
          setRecentOrders(allOrdersRes.data ?? []);

          // Top products
          const { data: topP } = await supabase
            .from("products")
            .select("id, name, sale_count, price, rating")
            .eq("vendor_id", vend.id)
            .eq("is_active", true)
            .order("sale_count", { ascending: false })
            .limit(4);
          setTopProducts(topP ?? []);

          // Chart data
          const { data: chartItems } = await supabase
            .from("order_items")
            .select("total_price, created_at")
            .eq("vendor_id", vend.id)
            .gte("created_at", new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString());

          const months = Array.from({ length: 12 }, (_, i) => {
            const d = new Date(); d.setMonth(d.getMonth() - (11 - i));
            return { month: d.toLocaleString("default", { month: "short" }), key: `${d.getFullYear()}-${d.getMonth() + 1}`, revenue: 0, orders: 0, affiliate: 0 };
          });
          chartItems?.forEach(item => {
            const d   = new Date(item.created_at);
            const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
            const m   = months.find(x => x.key === key);
            if (m) { m.revenue += Number(item.total_price); m.orders++; }
          });
          setChartData(months);
        } else if (aff) {
          // Affiliate view statistics
          const [linksRes, commissionsRes] = await Promise.all([
            supabase.from("affiliate_links").select("total_clicks, total_conversions, total_earnings").eq("affiliate_id", aff.id),
            supabase.from("affiliate_commissions").select("amount, created_at, status").eq("affiliate_id", aff.id).limit(5),
          ]);

          const totalClicks = linksRes.data?.reduce((s, l) => s + (l.total_clicks ?? 0), 0) ?? 0;
          const totalConvs  = linksRes.data?.reduce((s, l) => s + (l.total_conversions ?? 0), 0) ?? 0;

          setStats({
            totalRevenue:   Number(aff.total_earnings ?? 0),
            totalOrders:    totalConvs,
            activeProducts: totalClicks,
            monthlyRevenue: Number(aff.available_balance ?? 0),
          });

          setRecentOrders(commissionsRes.data ?? []);
        } else if (inf) {
          // Influencer stats
          setStats({
            totalRevenue:   Number(inf.total_earnings ?? 0),
            totalOrders:    inf.total_conversions ?? 0,
            activeProducts: 0,
            monthlyRevenue: Number(inf.available_balance ?? 0),
          });
        } else {
          // Buyer dashboard
          const { data: orders } = await supabase
            .from("orders")
            .select("id, order_number, status, total_amount, currency, created_at, order_items(product_name, quantity)")
            .eq("buyer_id", user.id)
            .order("created_at", { ascending: false })
            .limit(5);
          setRecentOrders(orders ?? []);
        }
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const userName = (profile?.full_name as string)?.split(" ")[0] ?? "there";
  const hour     = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  if (loading) {
    return (
      <div className="space-y-5 animate-fade-in">
        <div className="h-7 w-56 bg-[var(--color-surface-secondary)] rounded-lg animate-pulse" />
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          {[1,2,3,4].map(i => <div key={i} className="h-24 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl animate-pulse" />)}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 h-72 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl animate-pulse" />
          <div className="h-72 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">{greeting}, {userName} 👋</h1>
          <p className="text-sm text-muted-c mt-0.5">
            {vendor ? "Here's your store performance today." : "Welcome to your dashboard."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {vendor ? (
            <Button size="sm" asChild>
              <Link href="/dashboard/products/new"><Plus className="h-3.5 w-3.5" /> Add Product</Link>
            </Button>
          ) : (
            <Button size="sm" asChild>
              <Link href="/dashboard/roles"><Zap className="h-3.5 w-3.5" /> Activate Vendor Role</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Wallet banner */}
      {wallet && (
        <div className="rounded-xl p-4 flex items-center justify-between bg-[var(--color-accent)] text-white shadow-[var(--shadow-md)]">
          <div>
            <p className="text-white/80 text-xs font-medium">Available Balance</p>
            <p className="text-2xl font-bold">{formatCurrency(Number(wallet.available_balance ?? 0))}</p>
          </div>
          <div className="text-right text-xs">
            <p className="text-white/80">Total Earned: <span className="font-semibold text-white">{formatCurrency(Number(wallet.total_earned ?? 0))}</span></p>
            <p className="text-white/80 mt-0.5">Pending: <span className="font-semibold text-white">{formatCurrency(Number(wallet.pending_balance ?? 0))}</span></p>
          </div>
          <Button size="sm" className="bg-white text-[var(--color-accent)] hover:bg-white/90 ml-4">Withdraw</Button>
        </div>
      )}

      {/* Stats */}
      {(vendor || stats.totalRevenue > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          <StatCard 
            title={vendor ? "Total Revenue" : "Total Earnings"} 
            value={formatCurrency(stats.totalRevenue)}  
            change={18.2} 
            changeLabel="all time" 
            icon={<DollarSign className="h-4 w-4" />} 
            iconColor={vendor ? "from-primary-600 to-accent-600" : "from-emerald-600 to-teal-600"} 
          />
          <StatCard 
            title={vendor ? "Monthly Revenue" : "Available Balance"} 
            value={formatCurrency(stats.monthlyRevenue)} 
            change={12.5} 
            changeLabel="vs last month" 
            icon={vendor ? <ShoppingCart className="h-4 w-4" /> : <Wallet className="h-4 w-4" />} 
            iconColor="from-blue-600 to-cyan-600" 
          />
          <StatCard 
            title={vendor ? "Active Products" : "Links Shared"} 
            value={stats.activeProducts} 
            change={3.1} 
            changeLabel="this month" 
            icon={vendor ? <Package className="h-4 w-4" /> : <Link2 className="h-4 w-4" />} 
            iconColor="from-emerald-600 to-teal-600" 
          />
          <StatCard 
            title={vendor ? "Total Sales" : "Conversions"} 
            value={stats.totalOrders.toLocaleString()} 
            change={24.8} 
            changeLabel="all time" 
            icon={vendor ? <TrendingUp className="h-4 w-4" /> : <Zap className="h-4 w-4" />} 
            iconColor="from-amber-600 to-orange-600" 
          />
        </div>
      )}

      {/* Influencer Prompt */}
      {influencer && !vendor && (
        <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/30 rounded-xl p-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-pink-700">Creator Studio is active!</h3>
            <p className="text-xs text-pink-600">You're currently in the basic view. Switch to the Creator Studio for advanced tools.</p>
          </div>
          <Button size="sm" variant="outline" className="border-pink-500/50 text-pink-600 hover:bg-pink-500/10" asChild>
            <Link href="/dashboard/influencer">Open Creator Studio <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
          </Button>
        </div>
      )}

      {/* No role state */}
      {!vendor && stats.totalRevenue === 0 && (
        <div className="bg-subtle border border-base rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">🏪</div>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">You don't have a creator store yet</h3>
          <p className="text-sm text-muted-c mb-4">Jimvio is a B2B Marketplace. Activate the Creator or Vendor role to start selling or earning.</p>
          <div className="flex gap-3 justify-center">
            <Button asChild><Link href="/dashboard/roles"><Zap className="h-4 w-4" /> Activate Roles</Link></Button>
            <Button asChild variant="outline"><Link href="/marketplace">Browse Marketplace</Link></Button>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          {chartData.length > 0 ? (
            <Card>
              <CardHeader className="pb-3 pt-4 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle>{vendor ? "Sales Overview" : "Earnings Performance"}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0">
                <RevenueChart data={chartData} />
              </CardContent>
            </Card>
          ) : recentOrders.length > 0 ? (
            <Card>
              <CardHeader className="pb-2 pt-4 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle>{vendor ? "Recent Orders" : "Recent Commissions"}</CardTitle>
                  <Link href={vendor ? "/dashboard/orders" : "/dashboard/earnings"} className="text-xs text-[var(--color-accent)] hover:underline flex items-center gap-1">
                    View all <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0">
                <div className="space-y-1">
                  {recentOrders.map((item: any) => {
                    const isCommission = !!item.amount;
                    return (
                      <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-subtle transition-all cursor-pointer">
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarFallback className="text-xs bg-[var(--color-accent-light)] text-[var(--color-accent)]">
                            {isCommission ? "AC" : "OR"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                            {isCommission ? "Order Commission" : (item.profiles?.full_name || "New Order")}
                          </p>
                          <p className="text-xs text-muted-c truncate">
                            {isCommission ? new Date(item.created_at).toLocaleDateString() : (item.order_items?.[0]?.product_name || "B2B Bulk Purchase")}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold text-[var(--color-text-primary)]">
                            {formatCurrency(Number(isCommission ? item.amount : item.total_amount))}
                          </p>
                          <Badge variant={item.status === "paid" || item.status === "delivered" ? "success" : "warning"} className="text-xs mt-0.5">
                            {item.status || "Pending"}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>

        <Card>
          <CardHeader className="pb-2 pt-4 px-4"><CardTitle>Payout Status</CardTitle></CardHeader>
          <CardContent className="px-4 pb-4 pt-0 space-y-3">
            {[
              { label: vendor ? "Store Balance" : "Total Earned", value: formatCurrency(stats.totalRevenue), pct: 100, color: "bg-[var(--color-accent)]" },
              { label: "Available to Withdraw", value: formatCurrency(Number(wallet?.available_balance ?? 0)), pct: 52, color: "bg-[var(--color-success)]" },
              { label: "Pending Verification", value: formatCurrency(Number(wallet?.pending_balance ?? 0)), pct: 21, color: "bg-[var(--color-warning)]" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-c">{item.label}</span>
                  <span className="text-sm font-semibold text-[var(--color-text-primary)]">{item.value}</span>
                </div>
                <div className="h-1.5 bg-[var(--color-surface-secondary)] rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
            <Button className="w-full mt-4" size="sm">Request Payout</Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      {recentOrders.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <Card>
            <CardHeader className="pb-2 pt-4 px-4">
              <div className="flex items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Link href="/dashboard/orders" className="text-xs text-[var(--color-accent)] hover:underline flex items-center gap-1">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0">
              <div className="space-y-1">
                {recentOrders.map((order) => {
                  const s = statusMap[order.status as string] ?? { label: "Unknown", variant: "secondary" as const };
                  const prof = order.profiles as Record<string, unknown> | null;
                  const items = order.order_items as Record<string, unknown>[] | null;
                  const productName = items?.[0]?.product_name as string ?? "Product";
                  const customerName = prof?.full_name as string ?? prof?.email as string ?? "Customer";
                  return (
                    <div key={order.id as string} className="flex items-center gap-3 p-2 rounded-lg hover:bg-subtle transition-all cursor-pointer">
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="text-xs bg-[var(--color-accent-light)] text-[var(--color-accent)]">
                          {(customerName.split(" ").map((n: string) => n[0]).join("")).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">{customerName}</p>
                        <p className="text-xs text-muted-c truncate">{productName}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-[var(--color-text-primary)]">{formatCurrency(Number(order.total_amount ?? 0))}</p>
                        <Badge variant={s.variant} className="text-xs mt-0.5">{s.label}</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          {topProducts.length > 0 && (
            <Card>
              <CardHeader className="pb-2 pt-4 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle>Top Products</CardTitle>
                  <Link href="/dashboard/products" className="text-xs text-[var(--color-accent)] hover:underline flex items-center gap-1">
                    View all <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0 space-y-3">
                {topProducts.map((p, i) => (
                  <div key={p.id as string}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs font-bold text-muted-c w-5 shrink-0">#{i + 1}</span>
                        <span className="text-sm font-medium text-[var(--color-text-primary)] truncate">{p.name as string}</span>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <p className="text-xs font-bold text-[var(--color-accent)]">{formatCurrency(Number(p.price))}</p>
                        <p className="text-xs text-muted-c">{(p.sale_count as number)?.toLocaleString() ?? 0} sales</p>
                      </div>
                    </div>
                    <div className="h-1.5 bg-[var(--color-surface-secondary)] rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-[var(--color-accent)]" style={{ width: `${Math.min(100, ((p.sale_count as number) ?? 0) / Math.max(1, (topProducts[0]?.sale_count as number) ?? 1) * 100)}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Empty state for buyers with no orders */}
      {!vendor && recentOrders.length === 0 && (
        <div className="bg-subtle border border-base rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">🛒</div>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">No orders yet</h3>
          <p className="text-sm text-muted-c mb-4">Start shopping on the marketplace!</p>
          <Button asChild><Link href="/marketplace">Browse Marketplace</Link></Button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Add Product",         icon: <Package    className="h-4 w-4" />, href: "/dashboard/products/new",  color: "bg-[var(--color-accent-light)] text-[var(--color-accent)]" },
          { label: "Create Affiliate Link",icon: <Link2     className="h-4 w-4" />, href: "/dashboard/links/new",     color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
          { label: "New Campaign",        icon: <Zap        className="h-4 w-4" />, href: "/dashboard/campaigns/new", color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400" },
          { label: "View Analytics",      icon: <BarChart3  className="h-4 w-4" />, href: "/dashboard/analytics",     color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
        ].map((a, i) => (
          <Link key={i} href={a.href}>
            <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-card p-3 flex items-center gap-3 hover:shadow-card-md hover:border-[var(--color-border-strong)] transition-all duration-150 cursor-pointer group">
              <div className={`p-2 rounded-lg shrink-0 transition-transform ${a.color}`}>{a.icon}</div>
              <span className="text-sm font-medium text-[var(--color-text-primary)] leading-tight">{a.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
