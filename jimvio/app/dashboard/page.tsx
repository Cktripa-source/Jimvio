"use client";
export const dynamic = "force-dynamic";
import { RevenueChart } from "@/components/charts/revenue-chart";
import React from "react";
import {
  DollarSign, ShoppingCart, Users, TrendingUp, Package,
  ArrowRight, Star, Eye, Link2, Zap, Clock, CheckCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const recentOrders = [
  { id: "JV-A8B2C3", customer: "Alice Uwimana", amount: 85000, status: "delivered", product: "iPhone 15 Pro", time: "2h ago" },
  { id: "JV-D4E5F6", customer: "Bob Nzabahimana", amount: 45000, status: "processing", product: "Next.js Course", time: "4h ago" },
  { id: "JV-G7H8I9", customer: "Claire Mukamana", amount: 35000, status: "confirmed", product: "UI Kit Bundle", time: "6h ago" },
  { id: "JV-J1K2L3", customer: "David Habimana", amount: 620000, status: "shipped", product: "Samsung 65\" TV", time: "8h ago" },
  { id: "JV-M4N5O6", customer: "Emma Karangwa", amount: 12000, status: "pending", product: "Coffee Premium", time: "12h ago" },
];

const statusConfig = {
  pending: { label: "Pending", variant: "warning" as const },
  confirmed: { label: "Confirmed", variant: "default" as const },
  processing: { label: "Processing", variant: "default" as const },
  shipped: { label: "Shipped", variant: "success" as const },
  delivered: { label: "Delivered", variant: "success" as const },
};

const topProducts = [
  { name: "iPhone 15 Pro Max", sales: 124, revenue: 105400000, progress: 87 },
  { name: "Next.js 15 Mastery", sales: 892, revenue: 40140000, progress: 72 },
  { name: "Premium UI Kit", sales: 2103, revenue: 73605000, progress: 95 },
  { name: "AI Automation Bundle", sales: 567, revenue: 42525000, progress: 65 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Good morning, Jean-Pierre 👋</h1>
          <p className="text-white/50 text-sm mt-1">Here&apos;s what&apos;s happening with your store today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="glass" size="sm">
            <Clock className="h-4 w-4" />
            Last 30 days
          </Button>
          <Button size="sm" asChild>
            <Link href="/dashboard/products/new">
              <Package className="h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value="RWF 12.4M"
          change={18.2}
          changeLabel="vs last month"
          icon={<DollarSign className="h-4 w-4" />}
          iconColor="from-brand-600 to-accent-600"
        />
        <StatCard
          title="Total Orders"
          value="1,248"
          change={12.5}
          changeLabel="vs last month"
          icon={<ShoppingCart className="h-4 w-4" />}
          iconColor="from-blue-600 to-cyan-600"
        />
        <StatCard
          title="Active Products"
          value="84"
          change={3.1}
          changeLabel="this month"
          icon={<Package className="h-4 w-4" />}
          iconColor="from-emerald-600 to-teal-600"
        />
        <StatCard
          title="Affiliate Earnings"
          value="RWF 2.1M"
          change={24.8}
          changeLabel="vs last month"
          icon={<TrendingUp className="h-4 w-4" />}
          iconColor="from-amber-600 to-orange-600"
        />
      </div>

      {/* Revenue Chart + Quick Stats */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Revenue Overview</CardTitle>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs text-white/50">
                  <span className="w-2 h-2 rounded-full bg-brand-500 inline-block" />
                  Revenue
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/50">
                  <span className="w-2 h-2 rounded-full bg-accent-500 inline-block" />
                  Affiliate
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Vendor Store", value: "RWF 10.3M", icon: <Package className="h-4 w-4" />, color: "from-brand-600 to-accent-600", progress: 78 },
              { label: "Affiliate Earnings", value: "RWF 2.1M", icon: <Link2 className="h-4 w-4" />, color: "from-emerald-600 to-teal-600", progress: 52 },
              { label: "Influencer Revenue", value: "RWF 850K", icon: <Zap className="h-4 w-4" />, color: "from-pink-600 to-rose-600", progress: 34 },
              { label: "Community Income", value: "RWF 420K", icon: <Users className="h-4 w-4" />, color: "from-amber-600 to-orange-600", progress: 21 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg bg-gradient-to-br ${item.color}`}>
                      <span className="text-white">{item.icon}</span>
                    </div>
                    <span className="text-sm text-white/70">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{item.value}</span>
                </div>
                <Progress value={item.progress} className="h-1.5" />
              </div>
            ))}

            <div className="pt-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Total Income</span>
                <span className="text-brand-400 font-black">RWF 13.67M</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders + Top Products */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/orders" className="text-brand-400 hover:text-brand-300 flex items-center gap-1 text-xs">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => {
                const status = statusConfig[order.status as keyof typeof statusConfig];
                return (
                  <div key={order.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer group">
                    <Avatar className="h-9 w-9 flex-shrink-0">
                      <AvatarFallback className="text-xs">{order.customer.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{order.customer}</p>
                      <p className="text-xs text-white/40 truncate">{order.product}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-white">RWF {order.amount.toLocaleString()}</p>
                      <Badge variant={status.variant} className="text-xs mt-0.5">{status.label}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Top Products</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/products" className="text-brand-400 hover:text-brand-300 flex items-center gap-1 text-xs">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white/20 w-5">#{i + 1}</span>
                      <span className="text-sm text-white font-medium">{product.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-brand-400">RWF {(product.revenue / 1000000).toFixed(1)}M</p>
                      <p className="text-xs text-white/30">{product.sales} sales</p>
                    </div>
                  </div>
                  <Progress value={product.progress} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Add Product", icon: <Package className="h-5 w-5" />, href: "/dashboard/products/new", color: "from-brand-600 to-accent-600" },
          { label: "Create Affiliate Link", icon: <Link2 className="h-5 w-5" />, href: "/dashboard/links/new", color: "from-emerald-600 to-teal-600" },
          { label: "New Campaign", icon: <Zap className="h-5 w-5" />, href: "/dashboard/campaigns/new", color: "from-pink-600 to-rose-600" },
          { label: "View Analytics", icon: <TrendingUp className="h-5 w-5" />, href: "/dashboard/analytics", color: "from-amber-600 to-orange-600" },
        ].map((action, i) => (
          <Link key={i} href={action.href}>
            <div className="glass-card-hover p-4 flex items-center gap-3 group">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${action.color} text-white group-hover:scale-110 transition-transform flex-shrink-0`}>
                {action.icon}
              </div>
              <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{action.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
