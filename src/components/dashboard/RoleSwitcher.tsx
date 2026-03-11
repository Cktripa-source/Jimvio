"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ROLES = [
  { id: "buyer", label: "Buyer", href: "/dashboard/buyer", icon: "🛒" },
  { id: "vendor", label: "Vendor", href: "/dashboard/vendor", icon: "🏪" },
  { id: "affiliate", label: "Affiliate", href: "/dashboard/affiliate", icon: "🔗" },
  { id: "influencer", label: "Influencer", href: "/dashboard/influencer", icon: "📱" },
  { id: "community", label: "Community", href: "/dashboard/community", icon: "👥" },
] as const;

export function RoleSwitcher() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-2 p-2 glass rounded-xl">
      {ROLES.map((role) => {
        const isActive = pathname.startsWith(role.href);
        return (
          <Link
            key={role.id}
            href={role.href}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-primary text-primary-foreground"
                : "hover:bg-white/20 dark:hover:bg-white/10"
            )}
          >
            <span className="mr-2">{role.icon}</span>
            {role.label}
          </Link>
        );
      })}
    </div>
  );
}
