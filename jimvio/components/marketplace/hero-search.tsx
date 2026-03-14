"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Zap, ChevronDown, Camera, Sparkles } from "lucide-react";

export type HeroSearchCategory = { label: string; slug: string };

const DEFAULT_TRENDING = [
  "Electronics",
  "Apparel",
  "Custom manufacturing",
  "Verified suppliers",
  "Wholesale",
  "Dropshipping",
];

interface HeroSearchProps {
  categories: HeroSearchCategory[];
  trendingKeywords?: string[];
}

export function HeroSearch({ categories, trendingKeywords = DEFAULT_TRENDING }: HeroSearchProps) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const searchUrl = (params: { q?: string; cat?: string; ai?: string }) => {
    const sp = new URLSearchParams();
    if (params.q?.trim()) sp.set("q", params.q.trim());
    if (params.cat) sp.set("cat", params.cat);
    if (params.ai === "1") sp.set("sort", "trending");
    return `/marketplace${sp.toString() ? `?${sp.toString()}` : ""}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, useAi: boolean) => {
    e.preventDefault();
    router.push(searchUrl({ q, cat: cat || undefined, ai: useAi ? "1" : undefined }));
  };

  return (
    <div className="w-full max-w-[720px] space-y-5">
      {/* Main search bar — larger, clearer design */}
      <form
        className="bg-white border-2 border-[#e5e7eb] rounded-2xl overflow-hidden shadow-md hover:border-[#f97316]/40 focus-within:border-[#f97316] focus-within:shadow-lg focus-within:shadow-[#f97316]/12 transition-all duration-200 group/search"
        onSubmit={(e) => handleSubmit(e, false)}
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center min-h-[56px] sm:min-h-[64px]">
          {/* Category dropdown */}
          <div className="relative shrink-0 border-b sm:border-b-0 sm:border-r border-[#e5e7eb] bg-[#fafafa] sm:min-h-[64px] flex items-center">
            <button
              type="button"
              onClick={() => setIsCategoryOpen((o) => !o)}
              className="flex items-center justify-between gap-2 px-5 py-4 sm:py-0 sm:min-h-[64px] text-left w-full sm:w-[180px] text-[14px] font-bold text-[#1a1a1a] hover:bg-[#f5f5f5] transition-colors"
            >
              <span className="truncate">{cat ? categories.find((c) => c.slug === cat)?.label ?? "Category" : "All categories"}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 text-[#9ca3af] transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
            </button>
            {isCategoryOpen && (
              <>
                <div className="absolute left-0 sm:w-[240px] right-0 sm:right-auto top-full z-20 mt-1 bg-white border border-[#e5e7eb] rounded-xl shadow-xl py-2 max-h-[300px] overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setCat("");
                      setIsCategoryOpen(false);
                    }}
                    className="w-full px-5 py-3 text-left text-[14px] font-semibold text-[#1a1a1a] hover:bg-[#fff7ed]"
                  >
                    All categories
                  </button>
                  {categories.slice(0, 14).map((c) => (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => {
                        setCat(c.slug);
                        setIsCategoryOpen(false);
                      }}
                      className={`w-full px-5 py-3 text-left text-[14px] hover:bg-[#fff7ed] ${cat === c.slug ? "font-bold text-[#f97316] bg-[#fff7ed]/60" : "text-[#4b5563]"}`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
                <div
                  className="fixed inset-0 z-10"
                  aria-hidden
                  onClick={() => setIsCategoryOpen(false)}
                />
              </>
            )}
          </div>

          {/* Search input — larger and more spacious */}
          <div className="flex-1 flex items-center gap-3 px-5 py-4 sm:py-0 sm:min-h-[64px] min-h-[52px]">
            <Search className="h-6 w-6 text-[#9ca3af] shrink-0 group-focus-within/search:text-[#f97316] transition-colors" />
            <input
              type="text"
              name="q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products, suppliers, or describe what you need..."
              className="flex-1 bg-transparent border-none outline-none text-[#1a1a1a] placeholder:text-[#6b7280] text-[15px] sm:text-[16px] font-medium min-w-0 placeholder:font-normal"
              autoComplete="off"
            />
            <Link
              href="/marketplace"
              className="p-2.5 rounded-xl text-[#9ca3af] hover:text-[#f97316] hover:bg-[#fff7ed] transition-colors shrink-0"
              title="Search by image (coming soon)"
            >
              <Camera className="h-5 w-5" />
            </Link>
          </div>

          {/* Action: AI Match only — Enter still submits form to search */}
          <div className="flex border-t sm:border-t-0 sm:border-l border-[#e5e7eb] sm:min-h-[64px]">
            <button
              type="button"
              onClick={() => {
                router.push(searchUrl({ q, cat: cat || undefined, ai: "1" }));
              }}
              className="flex items-center justify-center gap-2 w-full px-6 py-4 sm:py-0 bg-[#f97316] text-white hover:bg-[#ea580c] transition-colors shrink-0 min-h-[52px] sm:min-h-[64px] shadow-lg shadow-[#f97316]/25 text-[14px] font-black"
            >
              <Zap className="h-5 w-5 fill-white stroke-none" />
              AI Match
            </button>
          </div>
        </div>
      </form>

      {/* Supporting line + quick filters */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="flex items-center gap-1.5 text-[11px] text-[#6b7280] font-medium">
          <Sparkles className="h-3.5 w-3.5 text-[#f97316]" />
          Get AI-powered product matches & supplier recommendations
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-[#9ca3af] font-bold uppercase tracking-wider">Quick:</span>
          <Link
            href="/marketplace?sort=trending"
            className="text-[11px] font-bold text-[#f97316] hover:underline"
          >
            Trending
          </Link>
          <span className="text-[#e5e7eb]">|</span>
          <Link
            href="/marketplace"
            className="text-[11px] font-bold text-[#4b5563] hover:text-[#f97316] hover:underline"
          >
            Verified suppliers
          </Link>
          <span className="text-[#e5e7eb]">|</span>
          <Link
            href="/marketplace?type=physical"
            className="text-[11px] font-bold text-[#4b5563] hover:text-[#f97316] hover:underline"
          >
            In stock
          </Link>
        </div>
      </div>

      {/* Popular / Trending searches — Alibaba-style chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] text-[#9ca3af] font-bold uppercase tracking-wider shrink-0">Popular:</span>
        {(categories.length > 0 ? categories.slice(0, 6).map((c) => c.label) : trendingKeywords.slice(0, 6)).map((keyword) => (
          <Link
            key={keyword}
            href={searchUrl({ q: keyword, cat: categories.find((c) => c.label === keyword)?.slug })}
            className="px-3 py-1.5 rounded-full bg-[#fafafa] border border-[#f0f0f0] text-[12px] font-semibold text-[#4b5563] hover:border-[#f97316] hover:bg-[#fff7ed] hover:text-[#f97316] transition-colors"
          >
            {keyword}
          </Link>
        ))}
      </div>
    </div>
  );
}
