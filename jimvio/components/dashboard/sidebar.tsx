"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, ShoppingCart, Heart, Download,
  Star, TrendingUp, Link2, DollarSign, BarChart3, Users,
  MessageSquare, Video, Zap, Globe, Settings, LogOut,
  ChevronLeft, ChevronRight, Bell, Wallet, Shield,
  UserCheck, AlertTriangle, FileText, Layers
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/actions";

type DashboardRole = "buyer" | "vendor" | "affiliate" | "influencer" | "community" | "admin";

const roleMenus: Record<DashboardRole, Array<{ label: string; href: string; icon: React.ReactNode; badge?: string }>> = {
  buyer: [
    { label: "Overview", href: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: "My Orders", href: "/dashboard/orders", icon: <ShoppingCart className="h-4 w-4" /> },
    { label: "Downloads", href: "/dashboard/downloads", icon: <Download className="h-4 w-4" /> },
    { label: "Subscriptions", href: "/dashboard/subscriptions", icon: <Star className="h-4 w-4" /> },
    { label: "Wishlist", href: "/dashboard/wishlist", icon: <Heart className="h-4 w-4" /> },
    { label: "Reviews", href: "/dashboard/reviews", icon: <Star className="h-4 w-4" /> },
    { label: "Wallet", href: "/dashboard/wallet", icon: <Wallet className="h-4 w-4" /> },
  ],
  vendor: [
    { label: "Overview", href: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: "Products", href: "/dashboard/products", icon: <Package className="h-4 w-4" /> },
    { label: "Orders", href: "/dashboard/orders", icon: <ShoppingCart className="h-4 w-4" /> },
    { label: "Inventory", href: "/dashboard/inventory", icon: <Layers className="h-4 w-4" /> },
    { label: "Affiliates", href: "/dashboard/affiliates", icon: <TrendingUp className="h-4 w-4" /> },
    { label: "Campaigns", href: "/dashboard/campaigns", icon: <Zap className="h-4 w-4" /> },
    { label: "Analytics", href: "/dashboard/analytics", icon: <BarChart3 className="h-4 w-4" /> },
    { label: "Payments", href: "/dashboard/payments", icon: <DollarSign className="h-4 w-4" /> },
  ],
  affiliate: [
    { label: "Overview", href: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: "My Links", href: "/dashboard/links", icon: <Link2 className="h-4 w-4" /> },
    { label: "Clicks", href: "/dashboard/clicks", icon: <TrendingUp className="h-4 w-4" /> },
    { label: "Earnings", href: "/dashboard/earnings", icon: <DollarSign className="h-4 w-4" /> },
    { label: "Withdrawals", href: "/dashboard/withdrawals", icon: <Wallet className="h-4 w-4" /> },
    { label: "Leaderboard", href: "/dashboard/leaderboard", icon: <BarChart3 className="h-4 w-4" /> },
  ],
  influencer: [
    { label: "Overview", href: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: "Campaigns", href: "/dashboard/campaigns", icon: <Zap className="h-4 w-4" /> },
    { label: "Clips", href: "/dashboard/clips", icon: <Video className="h-4 w-4" /> },
    { label: "Analytics", href: "/dashboard/analytics", icon: <BarChart3 className="h-4 w-4" /> },
    { label: "Revenue", href: "/dashboard/revenue", icon: <DollarSign className="h-4 w-4" /> },
  ],
  community: [
    { label: "Overview", href: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: "Members", href: "/dashboard/members", icon: <Users className="h-4 w-4" /> },
    { label: "Posts", href: "/dashboard/posts", icon: <MessageSquare className="h-4 w-4" /> },
    { label: "Subscriptions", href: "/dashboard/subscriptions", icon: <Star className="h-4 w-4" /> },
    { label: "Analytics", href: "/dashboard/analytics", icon: <BarChart3 className="h-4 w-4" /> },
    { label: "Revenue", href: "/dashboard/revenue", icon: <DollarSign className="h-4 w-4" /> },
  ],
  admin: [
    { label: "Overview", href: "/admin", icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: "Users", href: "/admin/users", icon: <Users className="h-4 w-4" /> },
    { label: "Vendors", href: "/admin/vendors", icon: <UserCheck className="h-4 w-4" /> },
    { label: "Products", href: "/admin/products", icon: <Package className="h-4 w-4" /> },
    { label: "Orders", href: "/admin/orders", icon: <ShoppingCart className="h-4 w-4" /> },
    { label: "Disputes", href: "/admin/disputes", icon: <AlertTriangle className="h-4 w-4" /> },
    { label: "Analytics", href: "/admin/analytics", icon: <BarChart3 className="h-4 w-4" /> },
    { label: "Fraud", href: "/admin/fraud", icon: <Shield className="h-4 w-4" /> },
    { label: "Reports", href: "/admin/reports", icon: <FileText className="h-4 w-4" /> },
  ],
};

const roleColors: Record<DashboardRole, string> = {
  buyer: "from-blue-600 to-cyan-600",
  vendor: "from-brand-600 to-accent-600",
  affiliate: "from-emerald-600 to-teal-600",
  influencer: "from-pink-600 to-rose-600",
  community: "from-amber-600 to-orange-600",
  admin: "from-red-600 to-rose-600",
};

const roleLabels: Record<DashboardRole, string> = {
  buyer: "Buyer",
  vendor: "Vendor",
  affiliate: "Affiliate",
  influencer: "Influencer",
  community: "Community",
  admin: "Admin",
};

interface SidebarProps {
  role: DashboardRole;
  user: { email: string; full_name?: string | null; avatar_url?: string | null };
  activeRoles: DashboardRole[];
  onRoleChange?: (role: DashboardRole) => void;
}

export function Sidebar({ role, user, activeRoles, onRoleChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const menu = roleMenus[role] || roleMenus.buyer;

  return (
    <aside
      className={cn(
        "flex flex-col h-screen sticky top-0 border-r border-white/10 bg-slate-950/80 backdrop-blur-xl transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-white/10 h-16">
        <div className={cn("w-8 h-8 rounded-xl bg-gradient-to-br flex-shrink-0 flex items-center justify-center shadow-brand", roleColors[role])}>
          <span className="text-white font-black text-sm">J</span>
        </div>
        {!collapsed && (
          <span className="text-xl font-black text-white">
            JIM<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">VIO</span>
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1 rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-all"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Role Switcher */}
      {!collapsed && activeRoles.length > 1 && (
        <div className="p-3 border-b border-white/10">
          <p className="text-xs text-white/30 font-medium uppercase tracking-wider mb-2 px-1">Switch Role</p>
          <div className="flex flex-wrap gap-1">
            {activeRoles.map((r) => (
              <button
                key={r}
                onClick={() => onRoleChange?.(r)}
                className={cn(
                  "px-2 py-1 rounded-lg text-xs font-semibold transition-all",
                  r === role
                    ? `bg-gradient-to-r ${roleColors[r]} text-white shadow-brand`
                    : "text-white/50 hover:text-white hover:bg-white/10"
                )}
              >
                {roleLabels[r]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
        {menu.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                isActive
                  ? `bg-gradient-to-r ${roleColors[role]} text-white shadow-brand`
                  : "text-white/50 hover:text-white hover:bg-white/10"
              )}
              title={collapsed ? item.label : undefined}
            >
              <span className={cn("flex-shrink-0", isActive ? "text-white" : "text-white/50 group-hover:text-white")}>
                {item.icon}
              </span>
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge && (
                    <Badge variant="default" className="text-xs py-0 px-1.5">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/10 transition-all"
          title={collapsed ? "Settings" : undefined}
        >
          <Settings className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
        <Link
          href="/dashboard/notifications"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/10 transition-all"
          title={collapsed ? "Notifications" : undefined}
        >
          <Bell className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Notifications</span>}
        </Link>

        {/* User */}
        <div className="mt-2 pt-2 border-t border-white/10">
          {collapsed ? (
            <Avatar className="h-8 w-8 mx-auto">
              <AvatarImage src={user.avatar_url || ""} />
              <AvatarFallback className="text-xs">
                {user.full_name?.[0] || user.email[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex items-center gap-2.5 px-2 py-2">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={user.avatar_url || ""} />
                <AvatarFallback className="text-xs">
                  {user.full_name?.[0] || user.email[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.full_name || user.email.split("@")[0]}
                </p>
                <p className="text-xs text-white/40 truncate">{user.email}</p>
              </div>
              <form action={signOut}>
                <button type="submit" className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all" title="Sign Out">
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
