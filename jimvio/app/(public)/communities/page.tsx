import React from "react";
import Link from "next/link";
import { Users, Lock, Globe, Star, TrendingUp, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getCommunities } from "@/services/db";
import { formatCurrency } from "@/lib/utils";

export default async function CommunitiesPage() {
  const communities = await getCommunities(20).catch(() => []);

  return (
    <div className="pt-20 page-wrapper min-h-screen">
      {/* Hero */}
      <div className="relative py-16 px-4 text-center border-b border-base overflow-hidden" style={{
        background: "linear-gradient(160deg, #f5f3ff 0%, #ede9fe 40%, #faf5ff 100%)"
      }}>
        <div className="hidden dark:block absolute inset-0" style={{ background: "linear-gradient(160deg, #0A081C 0%, #130A2E 60%, #0A081C 100%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Badge variant="default" className="mb-4"><Users className="h-3.5 w-3.5" /> Communities</Badge>
          <h1 className="text-4xl md:text-5xl font-black text-base mb-4">
            Find Your <span className="text-gradient">Community</span>
          </h1>
          <p className="text-muted-c text-lg mb-8">
            Join paid communities led by experts, creators, and entrepreneurs.
          </p>
          <div className="flex items-center gap-3 max-w-lg mx-auto">
            <form method="GET" className="flex items-center gap-2 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-c" />
                <input
                  name="q"
                  placeholder="Search communities..."
                  className="w-full h-10 pl-9 pr-4 rounded-xl bg-surface border border-base text-sm text-base placeholder:text-muted-c focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                />
              </div>
            </form>
            <Button asChild>
              <Link href="/dashboard/roles"><Plus className="h-4 w-4" /> Create Community</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Active Communities", value: communities.length > 0 ? `${communities.length}+` : "0", icon: <Users className="h-4 w-4" /> },
            { label: "Total Members", value: communities.reduce((s, c) => s + ((c.member_count as number) ?? 0), 0).toLocaleString(), icon: <TrendingUp className="h-4 w-4" /> },
            { label: "Avg Monthly Price", value: communities.filter(c => c.monthly_price).length > 0
                ? formatCurrency(communities.filter(c => c.monthly_price).reduce((s, c) => s + Number(c.monthly_price ?? 0), 0) / communities.filter(c => c.monthly_price).length)
                : "—", icon: <Star className="h-4 w-4" /> },
          ].map((s, i) => (
            <div key={i} className="bg-surface rounded-2xl border border-base shadow-card p-4 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">{s.icon}</div>
              <div>
                <p className="text-lg font-black text-base">{s.value}</p>
                <p className="text-xs text-muted-c">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Communities grid */}
        {communities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {communities.map((c) => {
              const owner = (c as Record<string, unknown>).profiles as Record<string, unknown> | null;
              return (
                <Link key={c.id as string} href={`/communities/${c.slug as string}`}>
                  <Card hover className="h-full group">
                    <CardContent className="p-5 flex flex-col h-full">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform"
                          style={{ background: "linear-gradient(135deg, #4B2D8F, #7C3AED)" }}>
                          {c.avatar_url
                            ? <img src={c.avatar_url as string} alt={c.name as string} className="w-full h-full object-cover rounded-2xl" />
                            : "👥"
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white font-bold text-sm truncate group-hover:text-primary-300 transition-colors">{c.name as string}</h3>
                            {c.is_featured && <Badge variant="accent" className="text-xs py-0 shrink-0">Featured</Badge>}
                          </div>
                          <div className="flex items-center gap-2">
                            {c.category && <Badge variant="secondary" className="text-xs py-0">{c.category as string}</Badge>}
                            {c.is_private
                              ? <span className="flex items-center gap-1 text-xs text-muted-c"><Lock className="h-2.5 w-2.5" /> Private</span>
                              : <span className="flex items-center gap-1 text-xs text-muted-c"><Globe className="h-2.5 w-2.5" /> Public</span>
                            }
                          </div>
                        </div>
                      </div>

                      {c.description && (
                        <p className="text-muted-c text-sm leading-relaxed mb-4 flex-1 line-clamp-3">{c.description as string}</p>
                      )}

                      {owner && (
                        <p className="text-xs text-muted-c mb-3">
                          Owned by <span className="text-base">{owner.full_name as string ?? "Creator"}</span>
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-xs text-muted-c mb-4">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" /> {((c.member_count as number) ?? 0).toLocaleString()} members
                        </span>
                        <span>{((c.post_count as number) ?? 0).toLocaleString()} posts</span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-base">
                        <div>
                          {c.monthly_price ? (
                            <><span className="font-black text-lg" style={{ color: "#7C3AED" }}>
                              {formatCurrency(Number(c.monthly_price))}
                            </span><span className="text-muted-c text-xs">/month</span></>
                          ) : (
                            <span className="font-bold text-emerald-600">Free</span>
                          )}
                        </div>
                        <Button size="sm">Join Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-subtle rounded-2xl border border-base">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-base mb-2">No communities yet</h3>
            <p className="text-muted-c mb-5">Be the first to create a paid community on Jimvio!</p>
            <Button asChild><Link href="/dashboard/roles"><Plus className="h-4 w-4" /> Create Your Community</Link></Button>
          </div>
        )}
      </div>
    </div>
  );
}
