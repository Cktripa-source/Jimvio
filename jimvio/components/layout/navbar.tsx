"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag, Menu, X, Search, Bell, ChevronDown,
  Zap, Users, TrendingUp, Globe, LogIn, UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    label: "Marketplace",
    href: "/marketplace",
    icon: <ShoppingBag className="h-4 w-4" />,
    children: [
      { label: "All Products", href: "/marketplace" },
      { label: "Electronics", href: "/marketplace?cat=electronics" },
      { label: "Fashion", href: "/marketplace?cat=fashion" },
      { label: "Digital Products", href: "/marketplace?type=digital" },
      { label: "Courses", href: "/marketplace?cat=courses" },
    ],
  },
  {
    label: "Affiliates",
    href: "/affiliates",
    icon: <TrendingUp className="h-4 w-4" />,
    children: [
      { label: "Affiliate Marketplace", href: "/affiliates" },
      { label: "Top Earners", href: "/affiliates/leaderboard" },
      { label: "Join as Affiliate", href: "/register?role=affiliate" },
    ],
  },
  {
    label: "Influencers",
    href: "/influencers",
    icon: <Zap className="h-4 w-4" />,
    children: [
      { label: "Browse Campaigns", href: "/influencers" },
      { label: "Top Influencers", href: "/influencers/top" },
      { label: "Join as Influencer", href: "/register?role=influencer" },
    ],
  },
  {
    label: "Communities",
    href: "/communities",
    icon: <Users className="h-4 w-4" />,
  },
  {
    label: "Vendors",
    href: "/vendors",
    icon: <Globe className="h-4 w-4" />,
  },
];

interface NavbarProps {
  user?: { email: string; full_name?: string; avatar_url?: string } | null;
}

export function Navbar({ user }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-glass"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-brand group-hover:scale-110 transition-transform">
              <span className="text-white font-black text-sm">J</span>
            </div>
            <span className="text-xl font-black text-white">
              JIM<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">VIO</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    pathname.startsWith(link.href)
                      ? "text-white bg-white/10"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.label}
                  {link.children && <ChevronDown className="h-3 w-3 opacity-50" />}
                </Link>

                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-2 w-52 rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-xl shadow-glass-lg py-2 animate-slide-down">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all text-sm">
              <Search className="h-4 w-4" />
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <button className="relative p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500" />
                </button>
                <Link href="/dashboard">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all cursor-pointer">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={user.avatar_url || ""} />
                      <AvatarFallback className="text-xs">
                        {user.full_name?.[0] || user.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-white font-medium max-w-[100px] truncate">
                      {user.full_name?.split(" ")[0] || user.email.split("@")[0]}
                    </span>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">
                    <UserPlus className="h-4 w-4" />
                    Get Started
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/10 py-4 px-4 animate-slide-down">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-3 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/10 mt-3 pt-3 flex flex-col gap-2">
              {user ? (
                <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full" variant="glass">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full" variant="glass">Sign In</Button>
                  </Link>
                  <Link href="/register" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
