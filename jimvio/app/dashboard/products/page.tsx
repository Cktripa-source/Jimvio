"use client";
export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Plus, Search, TrendingUp, Eye, Edit, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { formatCurrency } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { TableRowSkeleton } from "@/components/ui/skeleton";

const statusMap: Record<string, { label: string; variant: "success" | "warning" | "secondary" }> = {
  active:   { label: "Active",   variant: "success"   },
  paused:   { label: "Paused",   variant: "warning"   },
  draft:    { label: "Draft",    variant: "secondary" },
  archived: { label: "Archived", variant: "secondary" },
};

export default function ProductsPage() {
  const [products, setProducts]   = useState<Record<string, unknown>[]>([]);
  const [filtered, setFiltered]   = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading]     = useState(true);
  const [vendor, setVendor]       = useState<Record<string, unknown> | null>(null);
  const [search, setSearch]       = useState("");
  const [activeFilter, setFilter] = useState("All");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: vend } = await supabase.from("vendors").select("*").eq("user_id", user.id).single();
      setVendor(vend);

      if (vend) {
        const { data: prods } = await supabase
          .from("products")
          .select(`
            id, name, slug, price, compare_at_price, status, product_type,
            images, inventory_quantity, sale_count, rating, review_count,
            affiliate_enabled, affiliate_commission_rate, is_active,
            is_digital, created_at
          `)
          .eq("vendor_id", vend.id)
          .order("created_at", { ascending: false });

        setProducts(prods ?? []);
        setFiltered(prods ?? []);
      }
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    let result = products;
    if (search) result = result.filter(p => (p.name as string)?.toLowerCase().includes(search.toLowerCase()));
    if (activeFilter !== "All") {
      if (activeFilter === "Active")   result = result.filter(p => p.status === "active");
      if (activeFilter === "Digital")  result = result.filter(p => p.is_digital === true);
      if (activeFilter === "Physical") result = result.filter(p => p.is_digital === false);
      if (activeFilter === "Low Stock")result = result.filter(p => !p.is_digital && (p.inventory_quantity as number) <= 5);
    }
    setFiltered(result);
  }, [search, activeFilter, products]);

  async function toggleStatus(productId: string, currentStatus: string) {
    const supabase  = createClient();
    const newStatus = currentStatus === "active" ? "paused" : "active";
    const { error } = await supabase.from("products").update({ status: newStatus }).eq("id", productId);
    if (!error) setProducts(prev => prev.map(p => p.id === productId ? { ...p, status: newStatus } : p));
  }

  async function deleteProduct(productId: string) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    const supabase  = createClient();
    const { error } = await supabase.from("products").update({ is_active: false, status: "archived" }).eq("id", productId);
    if (!error) setProducts(prev => prev.filter(p => p.id !== productId));
  }

  const active    = products.filter(p => p.status === "active").length;
  const lowStock  = products.filter(p => !p.is_digital && (p.inventory_quantity as number) <= 5).length;
  const totalSales= products.reduce((s, p) => s + (p.sale_count as number ?? 0), 0);

  if (!loading && !vendor) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-base">Products</h1>
        <div className="bg-subtle border border-base rounded-2xl p-10 text-center">
          <div className="text-4xl mb-3">🏪</div>
          <h3 className="text-lg font-bold text-base mb-2">Activate Vendor Role First</h3>
          <p className="text-sm text-muted-c mb-4">You need a vendor account to manage products.</p>
          <Button asChild><Link href="/dashboard/roles">Activate Vendor Role</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-base">Products</h1>
          <p className="text-sm text-muted-c mt-0.5">Manage your product catalog</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/products/new"><Plus className="h-4 w-4" /> Add Product</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Products" value={loading ? "—" : products.length}  change={3.1}  icon={<Package    className="h-4 w-4" />} iconColor="from-primary-600 to-accent-600" />
        <StatCard title="Active"         value={loading ? "—" : active}            change={1.5}  icon={<TrendingUp className="h-4 w-4" />} iconColor="from-emerald-600 to-teal-600" />
        <StatCard title="Total Sales"    value={loading ? "—" : totalSales.toLocaleString()} change={18.2} icon={<TrendingUp className="h-4 w-4" />} iconColor="from-blue-600 to-cyan-600" />
        <StatCard title="Low Stock"      value={loading ? "—" : lowStock}           change={-2}   icon={<Package    className="h-4 w-4" />} iconColor="from-amber-600 to-orange-600" />
      </div>

      {/* Filter bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-c pointer-events-none" />
              <input
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-9 pl-10 pr-3.5 rounded-xl border border-base bg-subtle text-sm text-base placeholder:text-muted-c focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
              />
            </div>
            <div className="flex items-center gap-1 bg-subtle border border-base rounded-xl overflow-hidden p-1">
              {["All", "Active", "Digital", "Physical", "Low Stock"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeFilter === f ? "text-white shadow-primary" : "text-muted-c hover:text-base"}`}
                  style={activeFilter === f ? { background: "linear-gradient(135deg, #4B2D8F, #7C3AED)" } : undefined}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="pt-5 px-5 pb-4">
          <CardTitle>
            {loading ? "Loading..." : `All Products (${filtered.length})`}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="table-base">
              <thead>
                <tr>
                  <th className="pl-5">Product</th>
                  <th className="text-right">Price</th>
                  <th className="text-right">Stock</th>
                  <th className="text-right">Sales</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Affiliate</th>
                  <th className="pr-5" />
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array(5).fill(0).map((_, i) => <TableRowSkeleton key={i} cols={7} />)
                  : filtered.length === 0
                  ? (
                    <tr>
                      <td colSpan={7} className="text-center py-16 text-muted-c">
                        <div className="text-4xl mb-2">📦</div>
                        {products.length === 0
                          ? <><p className="font-medium text-base mb-1">No products yet</p><p className="text-sm">Start adding products to your store.</p></>
                          : <><p className="font-medium text-base">No results found</p><p className="text-sm">Try a different search term.</p></>
                        }
                      </td>
                    </tr>
                  )
                  : filtered.map((p) => {
                    const s      = statusMap[p.status as string] ?? { label: "Unknown", variant: "secondary" as const };
                    const images = (p.images as string[]) ?? [];
                    return (
                      <tr key={p.id as string} className="group">
                        <td className="pl-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-subtle border border-base shrink-0 flex items-center justify-center text-xl">
                              {images[0]
                                ? <img src={images[0]} alt={p.name as string} className="w-full h-full object-cover" />
                                : (p.is_digital ? "💾" : "📦")
                              }
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-base group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors line-clamp-1">{p.name as string}</p>
                              <p className="text-xs text-muted-c">{p.is_digital ? "Digital" : "Physical"} · {p.product_type as string}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-right"><span className="text-sm font-semibold text-base">{formatCurrency(Number(p.price))}</span></td>
                        <td className="text-right">
                          {p.is_digital
                            ? <span className="text-xs text-muted-c">Unlimited</span>
                            : <span className={`text-sm font-medium ${(p.inventory_quantity as number) <= 5 ? "text-amber-600 dark:text-amber-400" : "text-base"}`}>
                                {(p.inventory_quantity as number) ?? 0}
                              </span>
                          }
                        </td>
                        <td className="text-right"><span className="text-sm text-base">{((p.sale_count as number) ?? 0).toLocaleString()}</span></td>
                        <td className="text-center"><Badge variant={s.variant}>{s.label}</Badge></td>
                        <td className="text-center">
                          <button
                            onClick={() => {/* toggle affiliate */}}
                            title={p.affiliate_enabled ? "Affiliate ON" : "Affiliate OFF"}
                          >
                            {p.affiliate_enabled
                              ? <ToggleRight className="h-5 w-5 text-emerald-500 mx-auto" />
                              : <ToggleLeft  className="h-5 w-5 text-muted-c mx-auto" />
                            }
                          </button>
                        </td>
                        <td className="pr-5">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link href={`/marketplace/${p.slug as string}`}>
                              <button className="btn btn-ghost btn-icon-sm" title="View"><Eye className="h-3.5 w-3.5" /></button>
                            </Link>
                            <Link href={`/dashboard/products/${p.id as string}/edit`}>
                              <button className="btn btn-ghost btn-icon-sm" title="Edit"><Edit className="h-3.5 w-3.5" /></button>
                            </Link>
                            <button
                              className="btn btn-ghost btn-icon-sm"
                              title={p.status === "active" ? "Pause" : "Activate"}
                              onClick={() => toggleStatus(p.id as string, p.status as string)}
                            >
                              {p.status === "active"
                                ? <ToggleRight className="h-3.5 w-3.5 text-emerald-500" />
                                : <ToggleLeft  className="h-3.5 w-3.5 text-muted-c" />
                              }
                            </button>
                            <button
                              className="btn btn-ghost btn-icon-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                              title="Delete"
                              onClick={() => deleteProduct(p.id as string)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
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
