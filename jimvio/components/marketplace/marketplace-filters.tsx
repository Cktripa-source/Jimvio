"use client";
import Link from "next/link";

export function MarketplaceFilters({ currentSort, currentType }: { currentSort?: string; currentType?: string }) {
  return (
    <>
      <div>
        <h3 className="text-xs font-semibold text-muted-c uppercase tracking-wider mb-3">Product Type</h3>
        <div className="space-y-1">
          {[
            { label: "Physical",   value: "physical" },
            { label: "Digital",    value: "digital"  },
            { label: "Courses",    value: "course"   },
            { label: "Software",   value: "software" },
            { label: "Templates",  value: "template" },
            { label: "Ebooks",     value: "ebook"    },
          ].map((t) => (
            <Link key={t.value} href={`/marketplace?type=${t.value}`}>
              <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all cursor-pointer ${currentType === t.value ? "font-semibold text-white" : "text-muted-c hover:text-base hover:bg-subtle"}`}
                style={currentType === t.value ? { background: "linear-gradient(135deg, #4B2D8F, #7C3AED)" } : undefined}>
                {t.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
