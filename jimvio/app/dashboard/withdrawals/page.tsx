"use client";
export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import { Wallet, ArrowDownRight, CreditCard, Banknote, HelpCircle, History, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";

export default function AffiliateWithdrawalsPage() {
  const [balance, setBalance] = useState({ available: 0, pending: 0, paid: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const affRes = await supabase.from("affiliates").select("*").eq("user_id", user.id).maybeSingle();
      if (affRes.data) {
        setBalance({
          available: Number(affRes.data.available_balance || 0),
          pending: Number(affRes.data.pending_earnings || 0),
          paid: Number(affRes.data.paid_earnings || 0),
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Withdraw Funds</h1>
          <p className="text-sm text-muted-c mt-0.5">Transfer your earnings to your bank account or wallet.</p>
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-2"><HelpCircle className="h-4 w-4" /> Payout Schedule</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 overflow-hidden border-accent/20 bg-gradient-to-br from-white to-accent/[0.02]">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 text-accent">
                  <Wallet className="h-5 w-5" />
                  <span className="text-xs font-black capitalize tracking-widest">Available Balance</span>
                </div>
                <h2 className="text-5xl font-black text-[var(--color-text-primary)] font-outfit">
                  {formatCurrency(balance.available)}
                </h2>
                <div className="flex items-center gap-4 text-sm text-muted-c font-bold">
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-amber-500" /> {formatCurrency(balance.pending)} Pending</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-emerald-500" /> {formatCurrency(balance.paid)} Paid</span>
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-accent/10 shadow-xl space-y-4 min-w-[300px]">
                <p className="text-xs font-black text-muted-c capitalize tracking-widest">Withdraw Details</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-accent/5 rounded-xl border border-accent/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center"><CreditCard className="h-4 w-4" /></div>
                      <div>
                        <p className="text-xs font-black">Bank Transfer</p>
                        <p className="text-[10px] text-muted-c">Processing: 2-3 Business Days</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="w-full h-12 text-md font-black shadow-lg shadow-accent/20" disabled={balance.available === 0}>
                  Withdraw Now <ArrowDownRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pt-5 px-5 pb-0"><CardTitle className="text-sm">Payout Settings</CardTitle></CardHeader>
          <CardContent className="p-5 space-y-4">
             <div className="p-4 rounded-xl border border-dashed border-base bg-subtle/50 flex flex-col items-center justify-center text-center">
                <Banknote className="h-8 w-8 text-muted-c mb-2" />
                <p className="text-xs font-bold text-[var(--color-text-primary)]">No payout method added</p>
                <p className="text-[10px] text-muted-c mb-3 italic">Connect your bank account to receive payments automatically.</p>
                <Button variant="outline" size="sm" className="h-8 text-[10px] font-black capitalize tracking-wider">Add Method</Button>
             </div>
             
             <div className="space-y-3 py-2">
                <div className="flex items-center justify-between text-xs">
                   <span className="text-muted-c font-bold">Minimum Payout</span>
                   <span className="font-black">$50.00</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                   <span className="text-muted-c font-bold">Auto-Payout</span>
                   <Badge variant="secondary" className="text-[9px]">Disabled</Badge>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pt-4 px-5 pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-md flex items-center gap-2"><History className="h-4 w-4" /> Withdrawal History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
           <div className="overflow-x-auto">
             <table className="table-base">
               <thead>
                 <tr>
                   <th className="pl-5">Reference</th>
                   <th>Date</th>
                   <th>Method</th>
                   <th className="text-right">Amount</th>
                   <th>Status</th>
                 </tr>
               </thead>
               <tbody>
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-muted-c">
                      <p className="text-sm italic">You haven't made any withdrawals yet.</p>
                    </td>
                  </tr>
               </tbody>
             </table>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
