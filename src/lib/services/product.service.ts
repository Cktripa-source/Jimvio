import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getProducts(params?: {
  category?: string;
  limit?: number;
  offset?: number;
}) {
  const supabase = await createServerSupabaseClient();
  let query = supabase
    .from("products")
    .select(
      `
      *,
      product_images(url, alt_text),
      vendors(business_name, slug, logo_url),
      product_categories(name, slug)
    `
    )
    .eq("status", "active");

  if (params?.category) {
    query = query.eq("category_id", params.category);
  }

  const limit = params?.limit ?? 20;
  const offset = params?.offset ?? 0;
  const { data, error } = await query.range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
}

export async function getProductBySlug(slug: string, vendorSlug?: string) {
  const supabase = await createServerSupabaseClient();
  let builder = supabase
    .from("products")
    .select(
      `
      *,
      product_images(url, alt_text, sort_order),
      product_videos(url, thumbnail_url, duration_seconds),
      product_variants(*),
      vendors(*),
      product_categories(*)
    `
    )
    .eq("slug", slug)
    .eq("status", "active");

  if (vendorSlug) {
    const { data: vendor } = await supabase
      .from("vendors")
      .select("id")
      .eq("slug", vendorSlug)
      .single();
    if (vendor) builder = builder.eq("vendor_id", vendor.id);
  }

  const { data, error } = await builder.single();
  if (error) throw error;
  return data;
}
