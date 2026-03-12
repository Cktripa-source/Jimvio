"use client";
export const dynamic = "force-dynamic";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Package, ArrowLeft, Save, Zap, DollarSign, Image as ImageIcon, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function NewProductPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [vendor, setVendor]     = useState<Record<string, unknown> | null>(null);
  const [categories, setCategories] = useState<Record<string, unknown>[]>([]);
  const [error, setError]       = useState<string | null>(null);
  const [success, setSuccess]   = useState(false);

  const [form, setForm] = useState({
    name:                    "",
    slug:                    "",
    short_description:       "",
    description:             "",
    product_type:            "physical",
    price:                   "",
    compare_at_price:        "",
    currency:                "RWF",
    category_id:             "",
    is_digital:              false,
    digital_file_url:        "",
    track_inventory:         true,
    inventory_quantity:      "0",
    affiliate_enabled:       true,
    affiliate_commission_rate:"10",
    influencer_enabled:      true,
    is_featured:             false,
    status:                  "draft",
    tags:                    "",
  });

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data: vend } = await supabase.from("vendors").select("*").eq("user_id", user.id).single();
      if (!vend) { router.push("/dashboard/roles"); return; }
      setVendor(vend);

      const { data: cats } = await supabase.from("product_categories").select("id, name, slug").eq("is_active", true).order("sort_order");
      setCategories(cats ?? []);
    }
    load();
  }, [router]);

  function handleChange(field: string, value: string | boolean) {
    setForm(prev => {
      const updated = { ...prev, [field]: value };
      if (field === "name") updated.slug = slugify(value as string);
      if (field === "product_type") updated.is_digital = ["digital", "course", "software", "template", "ebook"].includes(value as string);
      return updated;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!vendor || !form.name || !form.price) {
      setError("Product name and price are required.");
      return;
    }

    startTransition(async () => {
      const supabase = createClient();

      // Ensure slug is unique
      let slug = form.slug || slugify(form.name);
      const { data: existing } = await supabase.from("products").select("id").eq("slug", slug).single();
      if (existing) slug = `${slug}-${Date.now()}`;

      const payload: Record<string, unknown> = {
        vendor_id:                vendor.id,
        name:                     form.name,
        slug,
        short_description:        form.short_description || null,
        description:              form.description || null,
        product_type:             form.product_type,
        status:                   form.status,
        price:                    parseFloat(form.price),
        compare_at_price:         form.compare_at_price ? parseFloat(form.compare_at_price) : null,
        currency:                 form.currency,
        category_id:              form.category_id || null,
        is_digital:               form.is_digital,
        digital_file_url:         form.is_digital && form.digital_file_url ? form.digital_file_url : null,
        track_inventory:          !form.is_digital && form.track_inventory,
        inventory_quantity:       form.is_digital ? 0 : parseInt(form.inventory_quantity ?? "0"),
        affiliate_enabled:        form.affiliate_enabled,
        affiliate_commission_rate:parseFloat(form.affiliate_commission_rate ?? "10"),
        influencer_enabled:       form.influencer_enabled,
        is_featured:              form.is_featured,
        tags:                     form.tags ? form.tags.split(",").map(t => t.trim()).filter(Boolean) : null,
        images:                   [],
      };

      const { error: insertErr } = await supabase.from("products").insert(payload);

      if (insertErr) {
        setError(insertErr.message);
      } else {
        setSuccess(true);
        setTimeout(() => router.push("/dashboard/products"), 1500);
      }
    });
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="text-5xl">✅</div>
        <h2 className="text-xl font-bold text-base">Product created!</h2>
        <p className="text-muted-c text-sm">Redirecting to your products...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/products">
          <button className="btn btn-ghost btn-icon"><ArrowLeft className="h-4 w-4" /></button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-base">Add New Product</h1>
          <p className="text-sm text-muted-c">Fill in the details to list your product</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader className="pt-5 px-5 pb-4">
            <CardTitle className="flex items-center gap-2"><Package className="h-4 w-4" /> Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-0 space-y-4">
            <Input
              label="Product Name *"
              placeholder="e.g. iPhone 15 Pro Max 256GB"
              value={form.name}
              onChange={e => handleChange("name", e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-base block mb-1.5">Product Type</label>
                <select
                  value={form.product_type}
                  onChange={e => handleChange("product_type", e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-base bg-subtle text-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
                >
                  <option value="physical">Physical Product</option>
                  <option value="digital">Digital Product</option>
                  <option value="course">Online Course</option>
                  <option value="software">Software / App</option>
                  <option value="template">Template</option>
                  <option value="ebook">Ebook</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-base block mb-1.5">Category</label>
                <select
                  value={form.category_id}
                  onChange={e => handleChange("category_id", e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-base bg-subtle text-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat.id as string} value={cat.id as string}>{cat.name as string}</option>
                  ))}
                </select>
              </div>
            </div>
            <Textarea
              label="Short Description"
              placeholder="Brief product summary (shown in listings)"
              value={form.short_description}
              onChange={e => handleChange("short_description", e.target.value)}
              className="min-h-[80px]"
            />
            <Textarea
              label="Full Description"
              placeholder="Detailed product description..."
              value={form.description}
              onChange={e => handleChange("description", e.target.value)}
              className="min-h-[120px]"
            />
            <Input
              label="Tags (comma-separated)"
              placeholder="e.g. electronics, smartphone, apple"
              value={form.tags}
              onChange={e => handleChange("tags", e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader className="pt-5 px-5 pb-4">
            <CardTitle className="flex items-center gap-2"><DollarSign className="h-4 w-4" /> Pricing</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-0 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Price *"
                type="number"
                placeholder="0"
                min="0"
                step="0.01"
                value={form.price}
                onChange={e => handleChange("price", e.target.value)}
                required
              />
              <Input
                label="Compare-at Price (original)"
                type="number"
                placeholder="0 (optional)"
                min="0"
                step="0.01"
                value={form.compare_at_price}
                onChange={e => handleChange("compare_at_price", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-base block mb-1.5">Currency</label>
              <select
                value={form.currency}
                onChange={e => handleChange("currency", e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-base bg-subtle text-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
              >
                <option value="RWF">RWF — Rwandan Franc</option>
                <option value="USD">USD — US Dollar</option>
                <option value="EUR">EUR — Euro</option>
                <option value="KES">KES — Kenyan Shilling</option>
                <option value="UGX">UGX — Ugandan Shilling</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Inventory — only for physical */}
        {!form.is_digital && (
          <Card>
            <CardHeader className="pt-5 px-5 pb-4">
              <CardTitle className="flex items-center gap-2"><Package className="h-4 w-4" /> Inventory</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 pt-0 space-y-4">
              <Input
                label="Quantity in Stock"
                type="number"
                placeholder="0"
                min="0"
                value={form.inventory_quantity}
                onChange={e => handleChange("inventory_quantity", e.target.value)}
              />
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.track_inventory}
                  onChange={e => handleChange("track_inventory", e.target.checked)}
                  className="accent-purple-600 w-4 h-4"
                />
                <span className="text-sm text-base">Track inventory (show stock warnings)</span>
              </label>
            </CardContent>
          </Card>
        )}

        {/* Digital file — only for digital */}
        {form.is_digital && (
          <Card>
            <CardHeader className="pt-5 px-5 pb-4">
              <CardTitle className="flex items-center gap-2"><ImageIcon className="h-4 w-4" /> Digital File</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 pt-0">
              <Input
                label="Download URL"
                placeholder="https://your-file-host.com/your-file.zip"
                value={form.digital_file_url}
                onChange={e => handleChange("digital_file_url", e.target.value)}
                hint="Link to the file customers will download after purchase"
              />
            </CardContent>
          </Card>
        )}

        {/* Affiliate & Marketing */}
        <Card>
          <CardHeader className="pt-5 px-5 pb-4">
            <CardTitle className="flex items-center gap-2"><Zap className="h-4 w-4" /> Affiliate & Marketing</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-0 space-y-4">
            <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-3 flex items-start gap-2">
              <Info className="h-4 w-4 text-primary-600 shrink-0 mt-0.5" />
              <p className="text-xs text-primary-700 dark:text-primary-300">Enable affiliate marketing to let affiliates promote your product and earn a commission per sale.</p>
            </div>
            <div className="flex items-center justify-between p-3.5 bg-subtle rounded-xl border border-base">
              <div>
                <p className="text-sm font-medium text-base">Enable Affiliate Marketing</p>
                <p className="text-xs text-muted-c mt-0.5">Affiliates can earn commissions promoting this product</p>
              </div>
              <label className="cursor-pointer">
                <input type="checkbox" className="sr-only" checked={form.affiliate_enabled} onChange={e => handleChange("affiliate_enabled", e.target.checked)} />
                <div className={`w-11 h-6 rounded-full transition-colors ${form.affiliate_enabled ? "bg-primary-600" : "bg-muted"}`}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow-sm m-1 transition-transform ${form.affiliate_enabled ? "translate-x-5" : "translate-x-0"}`} />
                </div>
              </label>
            </div>
            {form.affiliate_enabled && (
              <Input
                label="Commission Rate (%)"
                type="number"
                placeholder="10"
                min="1"
                max="90"
                value={form.affiliate_commission_rate}
                onChange={e => handleChange("affiliate_commission_rate", e.target.value)}
                hint="Percentage of sale price affiliates will earn"
              />
            )}
            <div className="flex items-center justify-between p-3.5 bg-subtle rounded-xl border border-base">
              <div>
                <p className="text-sm font-medium text-base">Enable Influencer Campaigns</p>
                <p className="text-xs text-muted-c mt-0.5">Allow influencers to promote this product</p>
              </div>
              <label className="cursor-pointer">
                <input type="checkbox" className="sr-only" checked={form.influencer_enabled} onChange={e => handleChange("influencer_enabled", e.target.checked)} />
                <div className={`w-11 h-6 rounded-full transition-colors ${form.influencer_enabled ? "bg-primary-600" : "bg-muted"}`}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow-sm m-1 transition-transform ${form.influencer_enabled ? "translate-x-5" : "translate-x-0"}`} />
                </div>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Publish */}
        <Card>
          <CardContent className="p-5 flex items-center justify-between gap-4">
            <div>
              <label className="text-sm font-medium text-base block mb-1.5">Publish Status</label>
              <select
                value={form.status}
                onChange={e => handleChange("status", e.target.value)}
                className="h-11 px-3.5 rounded-xl border border-base bg-subtle text-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
              >
                <option value="draft">Save as Draft</option>
                <option value="active">Publish Now</option>
              </select>
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/products">Cancel</Link>
              </Button>
              <Button type="submit" loading={isPending}>
                <Save className="h-4 w-4" />
                {form.status === "active" ? "Publish Product" : "Save Draft"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
