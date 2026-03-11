import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/shared/GlassCard";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatCurrency } from "@/lib/utils";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  if (!slug?.length) notFound();

  const vendorSlug = slug[0];
  const productSlug = slug[1];

  const supabase = await createServerSupabaseClient();
  const { data: vendor } = await supabase
    .from("vendors")
    .select("id")
    .eq("slug", vendorSlug)
    .single();

  if (!vendor) notFound();

  const { data: product, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_images(url, alt_text, sort_order),
      product_videos(url, thumbnail_url, duration_seconds),
      product_variants(*),
      vendors(business_name, slug, logo_url),
      product_categories(name, slug)
    `
    )
    .eq("vendor_id", vendor.id)
    .eq("slug", productSlug)
    .eq("status", "active")
    .single();

  if (error || !product) notFound();

  const primaryImage = (product.product_images as { url: string }[])?.[0]?.url;

  return (
    <div className="container py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Media */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
            {primaryImage ? (
              <img
                src={primaryImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No image
              </div>
            )}
          </div>
          {(product.product_images as { url: string; alt_text?: string }[])?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {(product.product_images as { url: string; alt_text?: string }[]).map((img, i) => (
                <button
                  key={i}
                  className="w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary"
                >
                  <img
                    src={img.url}
                    alt={img.alt_text ?? ""}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <Link
            href={`/vendors/${(product.vendors as { slug: string })?.slug}`}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            {(product.vendors as { business_name: string })?.business_name}
          </Link>
          <h1 className="text-3xl font-bold mt-2 mb-4">{product.title}</h1>
          <p className="text-4xl font-bold text-primary mb-6">
            {formatCurrency(Number(product.base_price))}
          </p>
          {product.compare_at_price && (
            <p className="text-muted-foreground line-through mb-2">
              {formatCurrency(Number(product.compare_at_price))}
            </p>
          )}
          <p className="text-muted-foreground mb-6">{product.description}</p>

          {/* Variants */}
          {(product.product_variants as { id: string; name: string; price: number }[])?.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Options</label>
              <div className="flex flex-wrap gap-2">
                {(product.product_variants as { id: string; name: string; price: number }[]).map(
                  (v) => (
                    <button
                      key={v.id}
                      className="px-4 py-2 rounded-lg border hover:border-primary transition-colors"
                    >
                      {v.name} - {formatCurrency(Number(v.price))}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button size="lg">Add to Cart</Button>
            <Button size="lg" variant="outline">
              Add to Wishlist
            </Button>
          </div>

          {product.affiliate_enabled && (
            <GlassCard className="mt-6">
              <p className="text-sm text-muted-foreground">
                Affiliate program enabled. Earn commissions by promoting this
                product.
              </p>
              <Link href="/affiliate" className="text-primary text-sm font-medium mt-2 inline-block">
                Join affiliate program →
              </Link>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
