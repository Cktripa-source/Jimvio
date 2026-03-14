"use client";
export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import { ShoppingCart, Search, Eye, Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { TableRowSkeleton } from "@/components/ui/skeleton";

const statusConfig = {
  pending:    { label: "Pending",    variant: "warning"   as const, icon: <Clock       className="h-3.5 w-3.5" /> },
  confirmed:  { label: "Confirmed",  variant: "default"   as const, icon: <CheckCircle className="h-3.5 w-3.5" /> },
  processing: { label: "Processing", variant: "default"   as const, icon: <Package     className="h-3.5 w-3.5" /> },
  shipped:    { label: "Shipped",    variant: "accent"    as const, icon: <Truck        className="h-3.5 w-3.5" /> },
  delivered:  { label: "Delivered",  variant: "success"   as const, icon: <CheckCircle className="h-3.5 w-3.5" /> },
  cancelled:  { label: "Cancelled",  variant: "secondary" as const, icon: <XCircle     className="h-3.5 w-3.5" /> },
  refunded:   { label: "Refunded",   variant: "secondary" as const, icon: <XCircle     className="h-3.5 w-3.5" /> },
};

export default function VendorOrdersPage() {
  const [orders, setOrders]       = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading]     = useState(true);
  const [vendor, setVendor]       = useState<Record<string, unknown> | null>(null);
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState("All");
  const [updating, setUpdating]   = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: vend } = await supabase.from("vendors").select("id").eq("user_id", user.id).single();
      setVendor(vend);

      if (vend) {
        const { data } = await supabase
          .from("orders")
          .select(`
            id, order_number, status, payment_status, total_amount, currency,
            created_at, paid_at, shipped_at, delivered_at,
            profiles ( full_name, email, phone ),
            order_items!inner (
              id, product_name, product_image, quantity, unit_price, total_price, vendor_id
            )
          `)
          .order("created_at", { ascending: false })
          .limit(100);

        // Filter only orders that contain items from this vendor
        const vendorOrders = (data ?? []).filter(order => {
          const items = order.order_items as Record<string, unknown>[];
          return items.some(item => item.vendor_id === vend.id);
        });
        setOrders(vendorOrders);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function updateOrderStatus(orderId: string, newStatus: string) {
    setUpdating(orderId);
    const supabase = createClient();
    const updates: Record<string, string | null> = { status: newStatus };
    if (newStatus === "shipped")   updates.shipped_at   = new Date().toISOString();
    if (newStatus === "delivered") updates.delivered_at = new Date().toISOString();
    await supabase.from("orders").update(updates).eq("id", orderId);
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus, ...updates } : o));
    setUpdating(null);
  }

  const filtered = orders.filter(o => {
    const matchSearch = !search ||
      (o.order_number as string)?.toLowerCase().includes(search.toLowerCase()) ||
      ((o.profiles as Record<string, unknown>)?.full_name as string)?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || o.status === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  const stats = {
    total:     orders.length,
    pending:   orders.filter(o => o.status === "pending"   || o.status === "confirmed").length,
    shipped:   orders.filter(o => o.status === "shipped"   || o.status === "processing").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    revenue:   orders.filter(o => o.payment_status === "completed").reduce((s, o) => s + Number(o.total_amount ?? 0), 0),
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Orders</h1>
        <p className="text-sm text-muted-c mt-0.5">Manage and fulfill customer orders</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard title="Total Orders"   value={loading ? "—" : stats.total}              icon={<ShoppingCart className="h-4 w-4" />} iconColor="from-primary-600 to-accent-600" />
        <StatCard title="Pending"        value={loading ? "—" : stats.pending}             icon={<Clock        className="h-4 w-4" />} iconColor="from-amber-600 to-orange-600" />
        <StatCard title="Shipped"        value={loading ? "—" : stats.shipped}             icon={<Truck        className="h-4 w-4" />} iconColor="from-blue-600 to-cyan-600" />
        <StatCard title="Total Revenue"  value={loading ? "—" : formatCurrency(stats.revenue)} icon={<CheckCircle className="h-4 w-4" />} iconColor="from-emerald-600 to-teal-600" />
      </div>

      {/* Filter & Search */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-c pointer-events-none" />
          <input
            placeholder="Search orders or customers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-primary)] placeholder:text-muted-c focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-accent)] transition-all"
          />
        </div>
        <div className="flex items-center gap-1 bg-subtle border border-base rounded-lg overflow-hidden p-0.5">
          {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${filter === f ? "bg-[var(--color-accent)] text-white shadow-primary" : "text-muted-c hover:text-[var(--color-text-primary)]"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader className="pt-4 px-4 pb-3">
          <CardTitle>{loading ? "Loading..." : `${filtered.length} Orders`}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="table-base">
              <thead>
                <tr>
                  <th className="pl-5">Order</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th className="text-right">Amount</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Payment</th>
                  <th className="pr-5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array(5).fill(0).map((_, i) => <TableRowSkeleton key={i} cols={7} />)
                  : filtered.length === 0
                  ? (
                    <tr><td colSpan={7} className="text-center py-12 text-muted-c">
                      <div className="text-4xl mb-2">📦</div>
                      <p className="font-medium text-[var(--color-text-primary)] mb-1">No orders yet</p>
                      <p className="text-sm">{vendor ? "Orders from customers will appear here." : "Activate vendor role first."}</p>
                    </td></tr>
                  )
                  : filtered.map(order => {
                    const profile = order.profiles as Record<string, unknown> | null;
                    const items   = (order.order_items as Record<string, unknown>[]) ?? [];
                    const s       = statusConfig[order.status as keyof typeof statusConfig] ?? statusConfig.pending;
                    const ps      = order.payment_status as string;
                    const isUpdating = updating === order.id;

                    return (
                      <tr key={order.id as string} className="group">
                        <td className="pl-5">
                          <p className="text-sm font-semibold text-[var(--color-text-primary)]">{order.order_number as string}</p>
                          <p className="text-xs text-muted-c">{new Date(order.created_at as string).toLocaleDateString()}</p>
                        </td>
                        <td>
                          <p className="text-sm font-medium text-[var(--color-text-primary)]">{profile?.full_name as string ?? "—"}</p>
                          <p className="text-xs text-muted-c">{profile?.email as string ?? "—"}</p>
                        </td>
                        <td>
                          <p className="text-sm text-[var(--color-text-primary)] line-clamp-1">{items[0]?.product_name as string ?? "—"}</p>
                          {items.length > 1 && <p className="text-xs text-muted-c">+{items.length - 1} more</p>}
                        </td>
                        <td className="text-right">
                          <span className="text-sm font-bold text-[var(--color-text-primary)]">{formatCurrency(Number(order.total_amount))}</span>
                        </td>
                        <td className="text-center">
                          <Badge variant={s.variant} className="flex items-center gap-1 mx-auto w-fit">
                            {s.icon} {s.label}
                          </Badge>
                        </td>
                        <td className="text-center">
                          <Badge variant={ps === "completed" ? "success" : ps === "pending" ? "warning" : "secondary"}>
                            {ps === "completed" ? "Paid" : ps === "pending" ? "Pending" : ps}
                          </Badge>
                        </td>
                        <td className="pr-5">
                          <div className="flex items-center gap-1.5">
                            {/* Next action button */}
                            {order.status === "confirmed" && (
                              <Button size="sm" variant="outline" loading={isUpdating} onClick={() => updateOrderStatus(order.id as string, "processing")}>
                                <Package className="h-3.5 w-3.5" /> Process
                              </Button>
                            )}
                            {order.status === "processing" && (
                              <Button size="sm" variant="outline" loading={isUpdating} onClick={() => updateOrderStatus(order.id as string, "shipped")}>
                                <Truck className="h-3.5 w-3.5" /> Ship
                              </Button>
                            )}
                            {order.status === "shipped" && (
                              <Button size="sm" loading={isUpdating} onClick={() => updateOrderStatus(order.id as string, "delivered")}>
                                <CheckCircle className="h-3.5 w-3.5" /> Delivered
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
