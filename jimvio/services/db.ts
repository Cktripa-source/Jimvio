/**
 * Central Supabase service layer — all DB queries live here.
 * Server-side only (uses "server" client).
 */
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function getDB() {
  return createClient();
}

export function getAdminDB() {
  return createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

// ─────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────
export async function getCategories() {
  const db = await getDB();
  const { data } = await db
    .from("product_categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  return data ?? [];
}

// ─────────────────────────────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────────────────────────────
export interface ProductQuery {
  limit?: number;
  offset?: number;
  category?: string;
  type?: string;
  search?: string;
  sort?: "trending" | "newest" | "price_asc" | "price_desc" | "rating" | "sales";
  featured?: boolean;
  affiliate?: boolean;
  vendorId?: string;
}

export async function getProducts(query: ProductQuery = {}) {
  const db = await getDB();
  const {
    limit = 24, offset = 0, category, type, search,
    sort = "trending", featured, affiliate, vendorId,
  } = query;

  let q = db
    .from("products")
    .select(`
      id, name, slug, short_description, price, compare_at_price,
      images, rating, review_count, is_featured, is_digital,
      product_type, status, affiliate_enabled, affiliate_commission_rate,
      sale_count, view_count, wishlist_count, inventory_quantity,
      created_at,
      vendors ( id, business_name, business_slug, rating, verification_status ),
      product_categories ( id, name, slug )
    `, { count: "exact" })
    .eq("status", "active")
    .eq("is_active", true);

  if (vendorId) q = q.eq("vendor_id", vendorId);
  if (featured)  q = q.eq("is_featured", true);
  if (affiliate) q = q.eq("affiliate_enabled", true);
  if (type)      q = q.eq("product_type", type);
  if (category)  q = q.eq("product_categories.slug", category);
  if (search)    q = q.ilike("name", `%${search}%`);

  switch (sort) {
    case "newest":    q = q.order("created_at", { ascending: false }); break;
    case "price_asc": q = q.order("price",      { ascending: true  }); break;
    case "price_desc":q = q.order("price",      { ascending: false }); break;
    case "rating":    q = q.order("rating",     { ascending: false }); break;
    case "sales":     q = q.order("sale_count", { ascending: false }); break;
    default:          q = q.order("view_count", { ascending: false });
  }

  const { data, count } = await q.range(offset, offset + limit - 1);
  return { products: data ?? [], total: count ?? 0 };
}

export async function getProductBySlug(slug: string) {
  const db = await getDB();
  const { data } = await db
    .from("products")
    .select(`
      *,
      vendors ( * ),
      product_categories ( * ),
      product_variants ( * ),
      reviews ( *, profiles ( full_name, avatar_url ) )
    `)
    .eq("slug", slug)
    .eq("status", "active")
    .single();
  return data;
}

export async function getFeaturedProducts(limit = 4) {
  const { products } = await getProducts({ featured: true, limit, sort: "sales" });
  return products;
}

export async function getTrendingProducts(limit = 8) {
  const { products } = await getProducts({ limit, sort: "trending" });
  return products;
}

// ─────────────────────────────────────────────────────────────
// VENDOR PRODUCTS (for dashboard — bypasses active filter)
// ─────────────────────────────────────────────────────────────
export async function getVendorProducts(vendorId: string) {
  const db = await getDB();
  const { data } = await db
    .from("products")
    .select(`
      id, name, slug, price, compare_at_price, status, product_type,
      images, inventory_quantity, sale_count, rating, review_count,
      affiliate_enabled, affiliate_commission_rate, is_active, created_at
    `)
    .eq("vendor_id", vendorId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

// ─────────────────────────────────────────────────────────────
// VENDORS
// ─────────────────────────────────────────────────────────────
export async function getTopVendors(limit = 4) {
  const db = await getDB();
  const { data } = await db
    .from("vendors")
    .select("id, business_name, business_slug, business_logo, rating, total_sales, business_country")
    .eq("is_active", true)
    .eq("verification_status", "verified")
    .order("total_sales", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function getVendorByUserId(userId: string) {
  const db = await getDB();
  const { data } = await db
    .from("vendors")
    .select("*")
    .eq("user_id", userId)
    .single();
  return data;
}

export async function getVendorById(vendorId: string) {
  const db = await getDB();
  const { data } = await db
    .from("vendors")
    .select("*")
    .eq("id", vendorId)
    .single();
  return data;
}

// ─────────────────────────────────────────────────────────────
// COMMUNITIES
// ─────────────────────────────────────────────────────────────
export async function getCommunities(limit = 12) {
  const db = await getDB();
  const { data } = await db
    .from("communities")
    .select(`
      id, name, slug, description, avatar_url, category, tags,
      is_private, is_featured, member_count, post_count,
      monthly_price, yearly_price, lifetime_price, currency,
      profiles ( full_name, avatar_url )
    `)
    .eq("is_active", true)
    .order("member_count", { ascending: false })
    .limit(limit);
  return data ?? [];
}

// ─────────────────────────────────────────────────────────────
// VIRAL CLIPS
// ─────────────────────────────────────────────────────────────
export async function getViralClips(limit = 6) {
  const db = await getDB();
  const { data } = await db
    .from("viral_clips")
    .select(`
      id, title, description, thumbnail_url, video_url, duration,
      total_views, total_shares, total_downloads, total_conversions,
      vendors ( business_name, business_slug ),
      products ( name, slug, price, affiliate_commission_rate )
    `)
    .eq("is_active", true)
    .order("total_views", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function getVendorClips(vendorId: string) {
  const db = await getDB();
  const { data } = await db
    .from("viral_clips")
    .select("*")
    .eq("vendor_id", vendorId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

// ─────────────────────────────────────────────────────────────
// INFLUENCER CAMPAIGNS
// ─────────────────────────────────────────────────────────────
export async function getCampaigns(limit = 6) {
  const db = await getDB();
  const { data } = await db
    .from("influencer_campaigns")
    .select(`
      id, title, description, campaign_type, budget,
      commission_type, commission_rate, status, start_date, end_date,
      total_views, total_clicks, total_conversions, total_revenue,
      vendors ( business_name, business_slug ),
      products ( name, slug, images )
    `)
    .eq("status", "active")
    .order("total_revenue", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function getVendorCampaigns(vendorId: string) {
  const db = await getDB();
  const { data } = await db
    .from("influencer_campaigns")
    .select(`
      *, products ( name, slug, images ),
      influencers ( display_name, profile_image, social_platforms )
    `)
    .eq("vendor_id", vendorId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

// ─────────────────────────────────────────────────────────────
// AFFILIATE LINKS
// ─────────────────────────────────────────────────────────────
export async function getAffiliateById(userId: string) {
  const db = await getDB();
  const { data } = await db
    .from("affiliates")
    .select("*")
    .eq("user_id", userId)
    .single();
  return data;
}

export async function getAffiliateLinks(affiliateId: string) {
  const db = await getDB();
  const { data } = await db
    .from("affiliate_links")
    .select(`
      id, link_code, destination_url, commission_rate, is_active,
      total_clicks, unique_clicks, total_conversions, total_earnings, created_at,
      products ( id, name, slug, images, price ),
      vendors  ( id, business_name )
    `)
    .eq("affiliate_id", affiliateId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAffiliateCommissions(affiliateId: string) {
  const db = await getDB();
  const { data } = await db
    .from("affiliate_commissions")
    .select("*, orders ( order_number, total_amount, created_at )")
    .eq("affiliate_id", affiliateId)
    .order("created_at", { ascending: false })
    .limit(50);
  return data ?? [];
}

// ─────────────────────────────────────────────────────────────
// ORDERS
// ─────────────────────────────────────────────────────────────
export async function getBuyerOrders(userId: string) {
  const db = await getDB();
  const { data } = await db
    .from("orders")
    .select(`
      id, order_number, status, payment_status, total_amount,
      currency, created_at, paid_at, shipped_at, delivered_at,
      order_items ( id, product_name, product_image, quantity, unit_price, total_price )
    `)
    .eq("buyer_id", userId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getVendorOrders(vendorId: string) {
  const db = await getDB();
  const { data } = await db
    .from("orders")
    .select(`
      id, order_number, status, payment_status, total_amount,
      currency, created_at, paid_at,
      profiles ( full_name, email, avatar_url ),
      order_items!inner ( id, product_name, quantity, unit_price, total_price, vendor_id )
    `)
    .eq("order_items.vendor_id", vendorId)
    .order("created_at", { ascending: false })
    .limit(50);
  return data ?? [];
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD STATS
// ─────────────────────────────────────────────────────────────
export async function getVendorDashboardStats(vendorId: string) {
  const db = await getDB();

  const [vendorData, productsData, ordersData] = await Promise.all([
    db.from("vendors").select("total_sales, total_revenue, rating").eq("id", vendorId).single(),
    db.from("products").select("id, status").eq("vendor_id", vendorId).eq("is_active", true),
    db.from("order_items").select("total_price, created_at")
      .eq("vendor_id", vendorId)
      .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
  ]);

  const activeProducts = productsData.data?.filter(p => p.status === "active").length ?? 0;
  const monthlyRevenue = ordersData.data?.reduce((sum, o) => sum + Number(o.total_price), 0) ?? 0;
  const totalOrders   = ordersData.data?.length ?? 0;

  return {
    totalRevenue:  Number(vendorData.data?.total_revenue ?? 0),
    totalSales:    vendorData.data?.total_sales ?? 0,
    activeProducts,
    monthlyRevenue,
    totalOrders,
    rating: Number(vendorData.data?.rating ?? 0),
  };
}

export async function getAffiliateDashboardStats(affiliateId: string) {
  const db = await getDB();
  const { data } = await db
    .from("affiliates")
    .select("total_clicks, total_conversions, total_earnings, available_balance, pending_earnings, paid_earnings, conversion_rate, tier")
    .eq("id", affiliateId)
    .single();
  return data;
}

export async function getPlatformStats() {
  const admin = getAdminDB();
  const [users, vendors, products] = await Promise.all([
    admin.from("profiles").select("id", { count: "exact", head: true }),
    admin.from("vendors").select("id", { count: "exact", head: true }).eq("is_active", true),
    admin.from("products").select("id", { count: "exact", head: true }).eq("status", "active"),
  ]);
  return {
    totalUsers:    users.count    ?? 0,
    totalVendors:  vendors.count  ?? 0,
    totalProducts: products.count ?? 0,
  };
}

// ─────────────────────────────────────────────────────────────
// REVENUE CHART DATA (monthly)
// ─────────────────────────────────────────────────────────────
export async function getRevenueChartData(vendorId?: string) {
  const db = await getDB();
  const months = Array.from({ length: 12 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (11 - i));
    return { month: d.toLocaleString("default", { month: "short" }), year: d.getFullYear(), num: d.getMonth() + 1 };
  });

  let q = db.from("order_items").select("total_price, created_at");
  if (vendorId) q = q.eq("vendor_id", vendorId);

  const { data: items } = await q
    .gte("created_at", new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString());

  const byMonth: Record<string, number> = {};
  items?.forEach(item => {
    const d = new Date(item.created_at);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
    byMonth[key] = (byMonth[key] ?? 0) + Number(item.total_price);
  });

  return months.map(m => ({
    month: m.month,
    revenue: byMonth[`${m.year}-${m.num}`] ?? 0,
    orders: 0,
    affiliate: 0,
  }));
}

// ─────────────────────────────────────────────────────────────
// RECENT ORDERS (for dashboard)
// ─────────────────────────────────────────────────────────────
export async function getRecentVendorOrders(vendorId: string, limit = 5) {
  const db = await getDB();
  const { data } = await db
    .from("orders")
    .select(`
      id, order_number, status, total_amount, currency, created_at,
      profiles ( full_name, email ),
      order_items!inner ( product_name, vendor_id )
    `)
    .eq("order_items.vendor_id", vendorId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}

// ─────────────────────────────────────────────────────────────
// TOP PRODUCTS (for dashboard)
// ─────────────────────────────────────────────────────────────
export async function getTopVendorProducts(vendorId: string, limit = 4) {
  const db = await getDB();
  const { data } = await db
    .from("products")
    .select("id, name, sale_count, price, rating")
    .eq("vendor_id", vendorId)
    .eq("is_active", true)
    .order("sale_count", { ascending: false })
    .limit(limit);
  return data ?? [];
}

// ─────────────────────────────────────────────────────────────
// WALLET
// ─────────────────────────────────────────────────────────────
export async function getUserWallet(userId: string) {
  const db = await getDB();
  const { data } = await db
    .from("wallets")
    .select("*")
    .eq("user_id", userId)
    .single();
  return data;
}

// ─────────────────────────────────────────────────────────────
// NOTIFICATIONS
// ─────────────────────────────────────────────────────────────
export async function getUserNotifications(userId: string, limit = 20) {
  const db = await getDB();
  const { data } = await db
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function getUnreadNotificationCount(userId: string) {
  const db = await getDB();
  const { count } = await db
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_read", false);
  return count ?? 0;
}

// ─────────────────────────────────────────────────────────────
// WISHLISTS
// ─────────────────────────────────────────────────────────────
export async function getUserWishlist(userId: string) {
  const db = await getDB();
  const { data } = await db
    .from("wishlists")
    .select(`
      id, created_at,
      products ( id, name, slug, price, images, rating, review_count )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

// ─────────────────────────────────────────────────────────────
// REVIEWS
// ─────────────────────────────────────────────────────────────
export async function getProductReviews(productId: string) {
  const db = await getDB();
  const { data } = await db
    .from("reviews")
    .select("*, profiles ( full_name, avatar_url )")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

// ─────────────────────────────────────────────────────────────
// ADMIN STATS
// ─────────────────────────────────────────────────────────────
export async function getAdminStats() {
  const admin = getAdminDB();
  const [users, vendors, products, orders, disputes] = await Promise.all([
    admin.from("profiles").select("id", { count: "exact", head: true }),
    admin.from("vendors").select("id", { count: "exact", head: true }).eq("is_active", true),
    admin.from("products").select("id", { count: "exact", head: true }).eq("is_active", true),
    admin.from("orders").select("id, total_amount, status, created_at")
      .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
    admin.from("vendors").select("id", { count: "exact", head: true }).eq("verification_status", "pending"),
  ]);

  const monthlyRevenue = orders.data?.reduce((s, o) => s + Number(o.total_amount), 0) ?? 0;
  return {
    totalUsers:     users.count    ?? 0,
    activeVendors:  vendors.count  ?? 0,
    totalProducts:  products.count ?? 0,
    monthlyRevenue,
    totalOrders:    orders.count   ?? 0,
    pendingVendors: disputes.count ?? 0,
  };
}

export async function getPendingVendors() {
  const admin = getAdminDB();
  const { data } = await admin
    .from("vendors")
    .select("id, business_name, business_country, created_at, profiles ( email )")
    .eq("verification_status", "pending")
    .order("created_at", { ascending: false })
    .limit(10);
  return data ?? [];
}
