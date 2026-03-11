"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");

  return (
    <header className="sticky top-0 z-50 w-full border-b glass">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
          JIMVIO
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/marketplace"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Marketplace
          </Link>
          <Link
            href="/affiliate"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Affiliate
          </Link>
          <Link
            href="/influencers"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Influencers
          </Link>
          <Link
            href="/communities"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Communities
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button variant="ghost" asChild>
                <Link href={isDashboard ? "/" : "/dashboard"}>
                  {isDashboard ? "Home" : "Dashboard"}
                </Link>
              </Button>
              <form action="/api/auth/signout" method="post">
                <Button type="submit" variant="outline" size="sm">
                  Sign out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
