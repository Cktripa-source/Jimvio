import React from "react";
import Link from "next/link";
import { Package, Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { formatCurrency } from "@/lib/utils";

const mockProducts = [
  { id: "1", name: "iPhone 15 Pro Max", sku: "IPH-15PM", price: 850000, inventory: 24, sales: 124, status: "active", type: "physical", rating: 4.9, affiliate: true },
  { id: "2", name: "Next.js 15 Mastery Course", sku: "COURSE-NX15", price: 45000, inventory: null, sales: 892, status: "active", type: "digital", rating: 4.8, affiliate: true },
  { id: "3", name: "Premium Figma UI Kit 2025", sku: "DIG-UIK25", price: 35000, inventory: null, sales: 2103, status: "active", type: "digital", rating: 4.9, affiliate: false },
  { id: "4", name: "Samsung 65\" 4K QLED TV", sku: "SAM-65Q4K", price: 620000, inventory: 8, sales: 45, status: "active", type: "physical", rating: 4.6, affiliate: true },
  { id: "5", name: "AI Automation Bundle", sku: "AI-AUTO-B", price: 75000, inventory: null, sales: 567, status: "active", type: "digital", rating: 4.7, affiliate: true },
  { id: "6", name: "Wireless Headphones Pro", sku: "AUD-WHP-01", price: 95000, inventory: 3, sales: 67, status: "active", type: "physical", rating: 4.5, affiliate: false },
  { id: "7", name: "Python ML Bootcamp 2025", sku: "COURSE-PY-ML", price: 65000, inventory: null, sales: 1590, status: "paused", type: "digital", rating: 4.7, affiliate: true },
  { id: "8", name: "Notion Templates Pack", sku: "DIG-NOT-T", price: 18000, inventory: null, sales: 5672, status: "active", type: "digital", rating: 4.8, affiliate: true },
];

const statusBadge: Record<string, { variant: "success" | "warning" | "secondary", label: string }> = {
  active: { variant: "success", label: "Active" },
  paused: { variant: "warning", label: "Paused" },
  draft: { variant: "secondary", label: "Draft" },
  archived: { variant: "secondary", label: "Archived" },
};

export default function VendorProductsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Products</h1>
          <p className="text-white/50 text-sm mt-1">Manage your product catalog</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/products/new">
            <Plus className="h-4 w-4" /> Add Product
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Products" value="84" change={3.1} icon={<Package className="h-4 w-4" />} iconColor="from-brand-600 to-accent-600" />
        <StatCard title="Active" value="71" change={1.5} icon={<TrendingUp className="h-4 w-4" />} iconColor="from-emerald-600 to-teal-600" />
        <StatCard title="Total Sales" value="11,084" change={18.2} icon={<TrendingUp className="h-4 w-4" />} iconColor="from-blue-600 to-cyan-600" />
        <StatCard title="Low Stock" value="3" change={-2} icon={<Package className="h-4 w-4" />} iconColor="from-amber-600 to-orange-600" />
      </div>

      {/* Toolbar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                placeholder="Search products..."
                className="w-full h-9 pl-9 pr-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
              />
            </div>
            <Button variant="glass" size="sm">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <div className="flex items-center gap-1 border border-white/10 rounded-xl overflow-hidden">
              {["All", "Active", "Digital", "Physical", "Low Stock"].map((f, i) => (
                <button
                  key={f}
                  className={`px-3 py-1.5 text-xs font-medium transition-all ${i === 0 ? "bg-white/10 text-white" : "text-white/50 hover:text-white hover:bg-white/5"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products ({mockProducts.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs font-semibold text-white/40 px-6 py-3 uppercase tracking-wider">Product</th>
                  <th className="text-left text-xs font-semibold text-white/40 px-4 py-3 uppercase tracking-wider">SKU</th>
                  <th className="text-right text-xs font-semibold text-white/40 px-4 py-3 uppercase tracking-wider">Price</th>
                  <th className="text-right text-xs font-semibold text-white/40 px-4 py-3 uppercase tracking-wider">Stock</th>
                  <th className="text-right text-xs font-semibold text-white/40 px-4 py-3 uppercase tracking-wider">Sales</th>
                  <th className="text-center text-xs font-semibold text-white/40 px-4 py-3 uppercase tracking-wider">Status</th>
                  <th className="text-center text-xs font-semibold text-white/40 px-4 py-3 uppercase tracking-wider">Affiliate</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {mockProducts.map((product) => {
                  const status = statusBadge[product.status];
                  return (
                    <tr key={product.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xl flex-shrink-0">
                            {product.type === "digital" ? "💾" : "📦"}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors line-clamp-1">{product.name}</p>
                            <p className="text-xs text-white/40">{product.type === "digital" ? "Digital Product" : "Physical Product"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs text-white/50 font-mono">{product.sku}</span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className="text-sm font-bold text-white">{formatCurrency(product.price)}</span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        {product.inventory === null ? (
                          <span className="text-xs text-white/30">Unlimited</span>
                        ) : (
                          <span className={`text-sm font-medium ${product.inventory <= 5 ? "text-amber-400" : "text-white"}`}>
                            {product.inventory}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className="text-sm text-white">{product.sales.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge variant={product.affiliate ? "success" : "secondary"}>
                          {product.affiliate ? "Enabled" : "Off"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon-sm" variant="ghost" title="View">
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="icon-sm" variant="ghost" title="Edit">
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="icon-sm" variant="ghost" title="Delete" className="hover:text-red-400">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
