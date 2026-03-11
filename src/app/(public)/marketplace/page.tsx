import Link from "next/link";
import { GlassCard } from "@/components/shared/GlassCard";
import { getProducts } from "@/lib/services/product.service";
import { getCategories } from "@/lib/services/category.service";
import { formatCurrency } from "@/lib/utils";

export default async function MarketplacePage() {
  const [products, categories] = await Promise.all([
    getProducts({ limit: 24 }).catch(() => []),
    getCategories().catch(() => []),
  ]);

  return (
    <div className="container py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar - Categories */}
        <aside className="lg:w-64 shrink-0">
          <GlassCard>
            <h3 className="font-semibold mb-4">Categories</h3>
            <nav className="space-y-2">
              <Link
                href="/marketplace"
                className="block py-2 text-sm hover:text-primary transition-colors"
              >
                All Products
              </Link>
              {categories.map((cat: { id: string; name: string; slug: string }) => (
                <Link
                  key={cat.id}
                  href={`/marketplace?category=${cat.slug}`}
                  className="block py-2 text-sm hover:text-primary transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </GlassCard>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Marketplace</h1>
          <p className="text-muted-foreground mb-8">
            Physical and digital products. Electronics, Fashion, Software,
            Courses, AI Tools, and more.
          </p>

          {products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: {
                id: string;
                title: string;
                slug: string;
                base_price: number;
                product_type: string;
                vendor_id: string;
                product_images?: { url: string }[];
                vendors?: { slug: string };
              }) => (
                <Link
                  key={product.id}
                  href={`/marketplace/${product.vendors?.slug || product.vendor_id}/${product.slug}`}
                >
                  <GlassCard className="h-full hover:scale-[1.02] transition-transform cursor-pointer overflow-hidden">
                    <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                      {product.product_images?.[0]?.url ? (
                        <img
                          src={product.product_images[0].url}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold line-clamp-2">{product.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded bg-muted capitalize">
                        {product.product_type}
                      </span>
                    </div>
                    <p className="text-primary font-semibold mt-2">
                      {formatCurrency(Number(product.base_price))}
                    </p>
                  </GlassCard>
                </Link>
              ))}
            </div>
          ) : (
            <GlassCard className="text-center py-16">
              <p className="text-muted-foreground mb-4">
                No products yet. Be the first to list!
              </p>
              <Link
                href="/signup"
                className="text-primary font-medium hover:underline"
              >
                Sign up to become a vendor
              </Link>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
