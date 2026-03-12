import React from "react";
import Link from "next/link";
import { Search, TrendingUp, Package, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategories, getProducts, type ProductQuery } from "@/services/db";
// formatCurrency used in ProductCardClient
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters";
import { ProductCardClient } from "@/components/marketplace/product-card-client";

interface PageProps {
  searchParams: Promise<{
    cat?: string; type?: string; q?: string;
    sort?: string; page?: string; affiliate?: string;
  }>;
}

export default async function MarketplacePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page ?? "1"));
  const limit  = 12;
  const offset = (currentPage - 1) * limit;

  const query: ProductQuery = {
    limit,
    offset,
    search:    params.q,
    sort:      (params.sort as ProductQuery["sort"]) ?? "trending",
    affiliate: params.affiliate === "1" ? true : undefined,
    type:      params.type,
  };

  const [categories, { products, total }] = await Promise.all([
    getCategories().catch(() => []),
    getProducts(query).catch(() => ({ products: [], total: 0 })),
  ]);

  const totalPages  = Math.ceil(total / limit);

  // Category icons mapping
  const iconMap: Record<string, string> = {
    electronics: "💻", fashion: "👗", "home-garden": "🏠", digital: "💾",
    courses: "📚", "ai-tools": "🤖", agriculture: "🌱", "health-beauty": "💊",
    software: "🖥️", templates: "📐", ebooks: "📖", industrial: "⚙️",
  };

  return (
    <div className="pt-20 page-wrapper min-h-screen">
      {/* Header */}
      <div className="border-b border-base py-6 px-4 bg-gradient-to-b from-primary-50/50 to-transparent dark:from-primary-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
            <div>
              <h1 className="text-3xl font-black text-base mb-0.5">Marketplace</h1>
              <p className="text-sm text-muted-c">{total.toLocaleString()} products from verified vendors</p>
            </div>
            <form method="GET" className="flex items-center gap-2 max-w-lg flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-c pointer-events-none" />
                <input
                  name="q"
                  defaultValue={params.q ?? ""}
                  placeholder="Search products, vendors, categories..."
                  className="w-full h-11 pl-10 pr-4 rounded-2xl border border-base bg-surface text-sm text-base placeholder:text-muted-c focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 shadow-card transition-all"
                />
              </div>
              <Button type="submit" variant="default" size="default">Search</Button>
            </form>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-muted-c">
            <span className="flex items-center gap-1.5"><Package className="h-3.5 w-3.5 text-primary-700 dark:text-primary-300" /> {total.toLocaleString()} products</span>
            <span className="flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5 text-emerald-500" /> Verified vendors</span>
            <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-accent-500" /> Affiliate-enabled products</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">

        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 space-y-5">
            <div>
              <h3 className="text-xs font-semibold text-muted-c uppercase tracking-wider mb-3">Categories</h3>
              <div className="space-y-0.5">
                <Link href="/marketplace">
                  <div className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all cursor-pointer ${!params.cat && !params.type ? "font-semibold text-white" : "text-muted-c hover:text-base hover:bg-subtle"}`}
                    style={!params.cat && !params.type ? { background: "linear-gradient(135deg, #4B2D8F, #7C3AED)" } : undefined}>
                    <span>All Products</span>
                    <span className={!params.cat && !params.type ? "text-purple-200" : "text-muted-c"} style={{ fontSize: "11px" }}>{total.toLocaleString()}</span>
                  </div>
                </Link>
                {categories.map((cat) => (
                  <Link key={cat.slug} href={`/marketplace?cat=${cat.slug}`}>
                    <div className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all cursor-pointer ${params.cat === cat.slug ? "font-semibold text-white" : "text-muted-c hover:text-base hover:bg-subtle"}`}
                      style={params.cat === cat.slug ? { background: "linear-gradient(135deg, #4B2D8F, #7C3AED)" } : undefined}>
                      <span className="flex items-center gap-1.5">
                        <span>{iconMap[cat.slug] ?? "📦"}</span>
                        <span>{cat.name}</span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="h-px bg-border-base" />

            <MarketplaceFilters currentSort={params.sort} currentType={params.type} />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex flex-wrap gap-2">
              {[
                { label: "All",            href: "/marketplace" },
                { label: "Trending",       href: "/marketplace?sort=trending" },
                { label: "New Arrivals",   href: "/marketplace?sort=newest" },
                { label: "On Sale",        href: "/marketplace?sort=price_asc" },
                { label: "Affiliate Only", href: "/marketplace?affiliate=1" },
              ].map((f, i) => {
                const isActive = (i === 0 && !params.sort && !params.affiliate) ||
                                 (params.sort === "trending" && i === 1) ||
                                 (params.sort === "newest" && i === 2) ||
                                 (params.sort === "price_asc" && i === 3) ||
                                 (params.affiliate === "1" && i === 4);
                return (
                  <Link key={f.label} href={f.href}>
                    <span
                      className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all cursor-pointer inline-flex items-center gap-1 ${isActive ? "text-white shadow-primary" : "border border-base bg-surface text-muted-c hover:text-base hover:bg-subtle"}`}
                      style={isActive ? { background: "linear-gradient(135deg, #4B2D8F, #7C3AED)" } : undefined}
                    >
                      {i === 4 && <Zap className="h-3 w-3 text-accent-500" />}
                      {f.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            <form method="GET" className="flex items-center gap-2">
              {params.q && <input type="hidden" name="q" value={params.q} />}
              {params.cat && <input type="hidden" name="cat" value={params.cat} />}
              <select name="sort" defaultValue={params.sort ?? "trending"}
                onChange={(e) => { (e.target.form as HTMLFormElement)?.submit(); }}
                className="h-9 px-3 rounded-xl border border-base bg-surface text-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-500/30 cursor-pointer">
                <option value="trending">Trending</option>
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="sales">Best Selling</option>
              </select>
            </form>
          </div>

          {/* Product results */}
          {params.q && (
            <p className="text-sm text-muted-c mb-4">
              {total.toLocaleString()} results for <strong className="text-base">&ldquo;{params.q}&rdquo;</strong>
            </p>
          )}

          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((p) => (
                <ProductCardClient key={p.id} p={p as Parameters<typeof ProductCardClient>[0]["p"]} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-subtle rounded-2xl border border-base">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-bold text-base mb-2">No products found</h3>
              <p className="text-sm text-muted-c mb-4">
                {params.q ? `No results for "${params.q}". Try a different search.` : "No products in this category yet."}
              </p>
              <Button asChild variant="outline"><Link href="/marketplace">Browse All</Link></Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {currentPage > 1 && (
                <Link href={`/marketplace?${new URLSearchParams({ ...Object.fromEntries(Object.entries(params).filter(([,v]) => v)), page: String(currentPage - 1) }).toString()}`}>
                  <Button variant="outline" size="sm">Previous</Button>
                </Link>
              )}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pg = Math.max(1, currentPage - 2) + i;
                if (pg > totalPages) return null;
                return (
                  <Link key={pg} href={`/marketplace?${new URLSearchParams({ ...Object.fromEntries(Object.entries(params).filter(([,v]) => v)), page: String(pg) }).toString()}`}>
                    <button className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${pg === currentPage ? "text-white shadow-primary" : "border border-base bg-surface text-muted-c hover:bg-subtle"}`}
                      style={pg === currentPage ? { background: "linear-gradient(135deg, #4B2D8F, #7C3AED)" } : undefined}>
                      {pg}
                    </button>
                  </Link>
                );
              })}
              {currentPage < totalPages && (
                <Link href={`/marketplace?${new URLSearchParams({ ...Object.fromEntries(Object.entries(params).filter(([,v]) => v)), page: String(currentPage + 1) }).toString()}`}>
                  <Button variant="outline" size="sm">Next</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

