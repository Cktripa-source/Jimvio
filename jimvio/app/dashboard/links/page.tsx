"use client";
export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import { Link2, Plus, Copy, TrendingUp, DollarSign, MousePointer, ShoppingCart, ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { formatCurrency } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { TableRowSkeleton } from "@/components/ui/skeleton";

export default function AffiliateLinksPage() {
  const [affiliate, setAffiliate]   = useState<Record<string, unknown> | null>(null);
  const [links, setLinks]           = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading]       = useState(true);
  const [copied, setCopied]         = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newUrl, setNewUrl]         = useState("");
  const [newRate, setNewRate]       = useState("10");
  const [creating, setCreating]     = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: aff } = await supabase.from("affiliates").select("*").eq("user_id", user.id).single();
      setAffiliate(aff);

      if (aff) {
        const { data: lnks } = await supabase
          .from("affiliate_links")
          .select(`
            id, link_code, destination_url, commission_rate, is_active,
            total_clicks, unique_clicks, total_conversions, total_earnings, created_at,
            products ( id, name, slug, price )
          `)
          .eq("affiliate_id", aff.id)
          .order("created_at", { ascending: false });
        setLinks(lnks ?? []);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function activateAffiliate() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase.from("affiliates").insert({ user_id: user.id }).select().single();
    if (data) setAffiliate(data);
  }

  async function createLink() {
    if (!affiliate || !newUrl) return;
    setCreating(true);
    const supabase = createClient();
    const { data, error } = await supabase.from("affiliate_links").insert({
      affiliate_id:    affiliate.id,
      destination_url: newUrl,
      commission_rate: parseFloat(newRate) || 10,
    }).select(`
      id, link_code, destination_url, commission_rate, is_active,
      total_clicks, unique_clicks, total_conversions, total_earnings, created_at,
      products ( id, name, slug, price )
    `).single();

    if (!error && data) {
      setLinks(prev => [data, ...prev]);
      setNewUrl("");
      setShowNewForm(false);
    }
    setCreating(false);
  }

  function copyLink(code: string) {
    const url = `${window.location.origin}/ref/${code}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(code);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  const totalClicks  = links.reduce((s, l) => s + (l.total_clicks as number ?? 0), 0);
  const totalConvs   = links.reduce((s, l) => s + (l.total_conversions as number ?? 0), 0);
  const totalEarnings= links.reduce((s, l) => s + Number(l.total_earnings ?? 0), 0);
  const avgCtr       = totalClicks > 0 ? ((totalConvs / totalClicks) * 100).toFixed(1) : "0.0";

  if (!loading && !affiliate) {
    return (
      <div className="space-y-5">
        <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Affiliate Links</h1>
        <div className="bg-subtle border border-base rounded-xl p-8 text-center">
          <div className="text-4xl mb-3">🔗</div>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Activate Affiliate Role</h3>
          <p className="text-sm text-muted-c mb-4">Start earning commissions by promoting products on Jimvio.</p>
          <Button onClick={activateAffiliate}>Activate Affiliate Role</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Affiliate Links</h1>
          <p className="text-sm text-muted-c mt-0.5">
            Your code: <code className="text-xs bg-subtle border border-base px-2 py-0.5 rounded-lg text-[var(--color-accent)]">
              {affiliate?.affiliate_code as string ?? "—"}
            </code>
          </p>
        </div>
        <Button onClick={() => setShowNewForm(true)}>
          <Plus className="h-4 w-4" /> Create Link
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard title="Total Clicks"    value={loading ? "—" : totalClicks.toLocaleString()}  change={22.4} icon={<MousePointer className="h-4 w-4" />} iconColor="from-primary-600 to-accent-600" />
        <StatCard title="Conversions"     value={loading ? "—" : totalConvs.toLocaleString()}   change={18.9} icon={<ShoppingCart className="h-4 w-4" />} iconColor="from-emerald-600 to-teal-600" />
        <StatCard title="Total Earnings"  value={loading ? "—" : formatCurrency(totalEarnings)} change={31.2} icon={<DollarSign  className="h-4 w-4" />} iconColor="from-amber-600 to-orange-600" />
        <StatCard title="Avg CTR"         value={loading ? "—" : `${avgCtr}%`}                  change={4.1}  icon={<TrendingUp  className="h-4 w-4" />} iconColor="from-blue-600 to-cyan-600" />
      </div>

      {/* Create Link Form */}
      {showNewForm && (
        <Card>
          <CardHeader className="pt-4 px-4 pb-3"><CardTitle>Create New Affiliate Link</CardTitle></CardHeader>
          <CardContent className="px-4 pb-4 pt-0 space-y-4">
            <div>
              <label className="text-sm font-medium text-[var(--color-text-primary)] block mb-1.5">Destination URL</label>
              <input
                type="url"
                value={newUrl}
                onChange={e => setNewUrl(e.target.value)}
                placeholder="https://jimvio.com/marketplace/product-slug"
                className="w-full h-10 px-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-primary)] placeholder:text-muted-c focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--color-text-primary)] block mb-1.5">Commission Rate (%)</label>
              <input
                type="number"
                value={newRate}
                onChange={e => setNewRate(e.target.value)}
                min="1" max="90"
                className="w-32 h-10 px-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 transition-all"
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={createLink} loading={creating}><Link2 className="h-4 w-4" /> Generate Link</Button>
              <Button variant="outline" onClick={() => setShowNewForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Links Table */}
      <Card>
        <CardHeader className="pt-4 px-4 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>My Affiliate Links</CardTitle>
            <Badge variant="secondary">{links.length} links</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="table-base">
              <thead>
                <tr>
                  <th className="pl-5">Product / URL</th>
                  <th>Link Code</th>
                  <th className="text-right">Clicks</th>
                  <th className="text-right">Conv.</th>
                  <th className="text-right">Earnings</th>
                  <th className="text-center">Status</th>
                  <th className="pr-5" />
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array(3).fill(0).map((_, i) => <TableRowSkeleton key={i} cols={7} />)
                  : links.length === 0
                  ? (
                    <tr>
                      <td colSpan={7} className="text-center py-16 text-muted-c">
                        <div className="text-3xl mb-2">🔗</div>
                        <p className="font-medium text-[var(--color-text-primary)] mb-1">No links yet</p>
                        <p className="text-sm">Create your first affiliate link to start earning.</p>
                      </td>
                    </tr>
                  )
                  : links.map((l) => {
                    const product = l.products as Record<string, unknown> | null;
                    const isCopied = copied === l.link_code;
                    return (
                      <tr key={l.id as string} className="group">
                        <td className="pl-5">
                          <p className="text-sm font-medium text-[var(--color-text-primary)]">
                            {product?.name as string ?? "Custom Link"}
                          </p>
                          <p className="text-xs text-muted-c truncate max-w-[200px]">
                            {(l.destination_url as string)?.replace("https://", "")}
                          </p>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <code className="text-xs font-mono bg-subtle border border-base text-[var(--color-accent)] px-2 py-1 rounded-lg">
                              {l.link_code as string}
                            </code>
                            <button
                              onClick={() => copyLink(l.link_code as string)}
                              className="btn btn-ghost btn-icon-sm opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Copy link"
                            >
                              {isCopied ? <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                            </button>
                          </div>
                        </td>
                        <td className="text-right"><span className="text-sm text-[var(--color-text-primary)]">{((l.total_clicks as number) ?? 0).toLocaleString()}</span></td>
                        <td className="text-right"><span className="text-sm text-[var(--color-text-primary)]">{((l.total_conversions as number) ?? 0).toLocaleString()}</span></td>
                        <td className="text-right"><span className="text-sm font-bold text-[var(--color-text-primary)]">{formatCurrency(Number(l.total_earnings ?? 0))}</span></td>
                        <td className="text-center">
                          <Badge variant={l.is_active ? "success" : "warning"}>
                            {l.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="pr-5">
                          <a href={l.destination_url as string} target="_blank" rel="noopener noreferrer"
                            className="btn btn-ghost btn-icon-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
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
