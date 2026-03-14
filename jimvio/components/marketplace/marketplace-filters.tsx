"use client";

import Link from "next/link";

export function MarketplaceFilters({
  currentType,
}: {
  currentSort?: string;
  currentType?: string;
}) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <h3 className="text-label text-[var(--color-text-muted)] mb-3">Product type</h3>
      <div className="space-y-0.5">
        {[
          { label: "Physical", value: "physical" },
          { label: "Digital", value: "digital" },
          { label: "Courses", value: "course" },
          { label: "Software", value: "software" },
          { label: "Templates", value: "template" },
          { label: "Ebooks", value: "ebook" },
        ].map((t) => (
          <Link key={t.value} href={`/marketplace?type=${t.value}`}>
            <div
              className={`px-3 py-2 rounded-[var(--radius-md)] text-sm transition-colors cursor-pointer ${
                currentType === t.value
                  ? "font-medium text-[var(--color-accent)] bg-[var(--color-accent-light)] border border-[var(--color-accent)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]"
              }`}
            >
              {t.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
