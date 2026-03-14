import React, { use } from "react";
import { getCategories, getProducts, type ProductQuery } from "@/services/db";
import { MarketplaceClient } from "@/components/marketplace/marketplace-client";

interface PageProps {
  searchParams: Promise<{
    cat?: string;
    type?: string;
    q?: string;
    sort?: string;
    page?: string;
    affiliate?: string;
  }>;
}

export default async function MarketplacePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page ?? "1"));
  const limit = 24;
  const offset = (currentPage - 1) * limit;

  const query: ProductQuery = {
    limit,
    offset,
    search: params.q,
    category: params.cat,
    sort: (params.sort as ProductQuery["sort"]) ?? "trending",
    affiliate: params.affiliate === "1" ? true : undefined,
    type: params.type,
  };

  const [categories, { products: rawProducts, total }] = await Promise.all([
    getCategories().catch(() => []),
    getProducts(query).catch(() => ({ products: [], total: 0 })),
  ]);

  const products = (rawProducts ?? []).map((p: any) => ({
    ...p,
    vendors: Array.isArray(p.vendors) ? p.vendors[0] ?? null : p.vendors,
    product_categories: Array.isArray(p.product_categories) ? p.product_categories[0] ?? null : p.product_categories,
  }));

  return (
    <MarketplaceClient
      initialProducts={products}
      categories={categories}
      total={total}
      currentPage={currentPage}
      limit={limit}
      params={params}
    />
  );
}
