"use client";
export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import { DollarSign, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, AlertCircle, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { formatCurrency } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { TableRowSkeleton } from "@/components/ui/skeleton";

export default function AffiliateEarningsPage() {
  const [earnings, setEarnings] = useState<any[]>([]);
  const [stats, setStats]       = useState({ total: 0, available: 0, pending: 0, paid: 0 });
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [affRes, commissionsRes] = await Promise.all([
        supabase.from("affiliates").select("*").eq("user_id", user.id).single(),
        supabase.from("affiliate_commissions")
          .select("*, orders(order_number, total_amount, created_at)")
          .order("created_at", { ascending: false })
      ]);

      if (affRes.data) {
        const aff = affRes.data;
        setStats({
          total: Number(aff.total_earnings || 0),
          available: Number(aff.available_balance || 0),
          pending: Number(aff.pending_earnings || 0),
          paid: Number(aff.paid_earnings || 0),
        });
      }

      setEarnings(commissionsRes.data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Earnings & Commissions</h1>
          <p className="text-sm text-muted-c mt-0.5">Track your referral income and payout status.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export</Button>
          <Button size="sm"><DollarSign className="h-4 w-4" /> Request Payout</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard title="Total Earned"      value={formatCurrency(stats.total)}     icon={<DollarSign   className="h-4 w-4" />} iconColor="from-blue-600 to-cyan-600" />
        <StatCard title="Available"         value={formatCurrency(stats.available)} icon={<CheckCircle  className="h-4 w-4" />} iconColor="from-emerald-600 to-teal-600" />
        <StatCard title="Pending"           value={formatCurrency(stats.pending)}   icon={<Clock        className="h-4 w-4" />} iconColor="from-amber-600 to-orange-600" />
        <StatCard title="Already Paid"      value={formatCurrency(stats.paid)}      icon={<ArrowUpRight className="h-4 w-4" />} iconColor="from-purple-600 to-pink-600" />
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 bg-subtle border border-base p-3 rounded-xl overflow-x-auto no-scrollbar">
        <Button variant="ghost" size="sm" className="bg-white border text-xs font-bold">All Time</Button>
        <Button variant="ghost" size="sm" className="text-xs font-bold">This Month</Button>
        <Button variant="ghost" size="sm" className="text-xs font-bold">Pending</Button>
        <Button variant="ghost" size="sm" className="text-xs font-bold">Paid</Button>
        <div className="ml-auto">
          <Button variant="ghost" size="sm" className="text-xs font-bold flex items-center gap-2"><Filter className="h-3.5 w-3.5" /> Filters</Button>
        </div>
      </div>

      {/* History Table */}
      <Card>
        <CardHeader className="pt-4 px-4 pb-0"><CardTitle>Commission History</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="table-base">
              <thead>
                <tr>
                  <th className="pl-5">Order ID</th>
                  <th>Date</th>
                  <th className="text-right">Order Amount</th>
                  <th className="text-right">Commission</th>
                  <th>Status</th>
                  <th className="pr-5" />
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array(5).fill(0).map((_, i) => <TableRowSkeleton key={i} cols={6} />)
                  : earnings.length === 0
                  ? (
                    <tr>
                      <td colSpan={6} className="text-center py-20 text-muted-c">
                        <DollarSign className="h-10 w-10 mx-auto mb-3 opacity-20" />
                        <p className="font-medium text-[var(--color-text-primary)]">No commissions yet</p>
                        <p className="text-sm">Promote your links to start earning.</p>
                      </td>
                    </tr>
                  )
                  : earnings.map((e) => (
                    <tr key={e.id} className="group hover:bg-subtle/50 transition-colors">
                      <td className="pl-5">
                        <span className="text-sm font-bold text-[var(--color-text-primary)]">#{e.orders?.order_number || "ORD-"+e.id.slice(0,6)}</span>
                      </td>
                      <td>
                        <span className="text-xs text-muted-c font-medium">{new Date(e.created_at).toLocaleDateString()}</span>
                      </td>
                      <td className="text-right">
                        <span className="text-sm text-[var(--color-text-primary)]">{formatCurrency(Number(e.orders?.total_amount || 0))}</span>
                      </td>
                      <td className="text-right">
                        <span className="text-sm font-black text-[var(--color-accent)]">{formatCurrency(Number(e.amount))}</span>
                      </td>
                      <td>
                        <Badge variant={e.status === "paid" ? "success" : e.status === "cancelled" ? "destructive" : "warning"} className="text-[10px] py-0">
                          {e.status || "pending"}
                        </Badge>
                      </td>
                      <td className="pr-5 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100"><ArrowUpRight className="h-4 w-4" /></Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
