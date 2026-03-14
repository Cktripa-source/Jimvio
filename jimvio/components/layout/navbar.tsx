"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search, Bell, ChevronDown, User, ShoppingCart, MessageCircle, Menu, X, Globe, HelpCircle, ShieldCheck,
  LayoutDashboard, Settings, LogOut, TrendingUp, Video, Users, Factory, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/auth/actions";
import { getNavbarCounts } from "@/lib/actions/marketplace";

interface NavbarProps {
  user?: { email: string; full_name?: string; avatar_url?: string } | null;
}

export function Navbar({ user }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [counts, setCounts] = useState({ cartCount: 0, chatCount: 0 });
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    const refreshCounts = () => {
      if (!user) {
        setCounts({ cartCount: 0, chatCount: 0 });
        return;
      }

      getNavbarCounts().then(res => {
        setCounts(res);
      }).catch(e => console.error("Navbar: Update failed", e));
    };

    refreshCounts();

    window.addEventListener("cart-updated", refreshCounts);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("cart-updated", refreshCounts);
    };
  }, [user]);

  return (
    <header
      className={cn(
        "flex flex-col w-full z-50 fixed top-0 left-0 right-0 transition-all duration-300 rounded-b-2xl overflow-hidden",
        "bg-white/75 backdrop-blur-xl border-b border-x border-white/70 shadow-lg shadow-black/[0.06]",
        isScrolled && "shadow-xl shadow-black/[0.08] border-[#f97316]/10"
      )}
    >
      {/* ── UTILITY BAR (compact) — hidden on mobile to avoid clutter ── */}
      <div className="hidden md:block bg-white/50 backdrop-blur-sm border-b border-white/70 py-1.5 px-4 md:px-5">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between overflow-x-auto no-scrollbar whitespace-nowrap">
          <div className="text-[10px] text-[#6b7280] font-black capitalize tracking-wider">
            Global Hub for <span className="text-[#f97316]">Creator-Commerce</span>
          </div>
          <div className="flex items-center gap-0">
            {[
              { label: "English", icon: <Globe className="h-3 w-3" /> },
              { label: "USD $", icon: null },
              { label: "Help Center", icon: <HelpCircle className="h-3 w-3" /> },
              { label: "Become a Supplier", icon: null, href: "/dashboard/roles" },
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.href || "#"}
                className="text-[11px] text-[#4b5563] px-3 py-1.5 rounded-lg hover:text-[#f97316] hover:bg-white/60 transition-colors flex items-center gap-1.5 whitespace-nowrap font-bold first:ml-0"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            <div className="flex items-center ml-2 pl-2 border-l border-white/50">
              {!user ? (
                <div className="flex items-center gap-1">
                  <Link href="/login" className="text-[11px] text-[#1a1a1a] px-3 py-1.5 rounded-lg hover:bg-white/60 hover:text-[#f97316] transition-colors font-black capitalize tracking-tighter">Sign In</Link>
                  <Link href="/register" className="text-[11px] text-[#f97316] px-3 py-1.5 rounded-lg hover:bg-[#f97316]/10 font-black hover:text-[#ea580c] transition-colors capitalize tracking-tighter">Join Free</Link>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Link href="/dashboard" className="text-[11px] text-[#f97316] px-3 py-1.5 rounded-lg hover:bg-white/60 hover:text-[#ea580c] transition-colors font-black capitalize tracking-tighter">My Dashboard</Link>
                  <span className="text-[11px] text-[#6b7280] px-3 py-1.5 font-bold truncate max-w-[140px]">Hi, {user.full_name || user.email.split('@')[0]}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN NAV (glass content) ── */}
      <nav className="bg-white/40 backdrop-blur-sm flex-1">
        <div className="max-w-[1280px] mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex items-center justify-between gap-2 sm:gap-3 lg:gap-6 min-h-[52px] sm:min-h-[56px] lg:h-[56px] min-w-0">
            {/* Logo — shrink on very small screens */}
            <Link href="/" className="shrink-0 transition-transform active:scale-95 flex items-center min-w-0 max-w-[50%]">
              <Image
                src="/jimvio-logo.png"
                alt="Jimvio"
                width={320}
                height={90}
                className="w-[90px] sm:w-[120px] md:w-[160px] lg:w-[200px] h-auto object-contain"
                priority
              />
            </Link>

            {/* Search — glass style, desktop only */}
            <div className="flex-1 max-w-[520px] hidden lg:block min-w-0">
              <div className="flex rounded-2xl overflow-hidden h-12 bg-white/70 backdrop-blur-sm border border-white/80 shadow-inner focus-within:ring-2 focus-within:ring-[#f97316]/30 focus-within:border-[#f97316]/40 transition-all">
                <div className="pl-4 pr-3 flex items-center gap-2 bg-white/50 border-r border-white/60 text-[12px] text-[#4b5563] cursor-pointer hover:bg-white/70 transition-colors font-bold capitalize tracking-tight whitespace-nowrap min-w-[120px]">
                  All Categories <ChevronDown className="h-3.5 w-3.5 text-[#9ca3af]" />
                </div>
                <input
                  type="text"
                  placeholder="Search globally, sell everywhere..."
                  className="flex-1 px-4 text-[14px] outline-none font-semibold placeholder:text-[#9ca3af] bg-transparent w-full min-w-0"
                />
                <button className="bg-[#f97316] hover:bg-[#ea580c] text-white px-5 flex items-center justify-center transition-colors rounded-r-2xl">
                  <Search className="h-4 w-4 stroke-[2.5px]" />
                </button>
              </div>
            </div>

            {/* Right group: always visible, menu last on mobile; no wrap */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0 flex-nowrap min-w-0">
              {user ? (
                <>
                  {/* Mobile Cart & Chat */}
                  <div className="flex lg:hidden items-center gap-0.5">
                    <Link href="/cart" className="relative p-2.5 rounded-2xl text-[#4b5563] hover:text-[#f97316] hover:bg-white/60 transition-all">
                      <ShoppingCart className="h-5 w-5" />
                      {counts.cartCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-[#f97316] text-white text-[9px] font-black flex items-center justify-center rounded-full shadow-lg border-2 border-white">
                          {counts.cartCount}
                        </span>
                      )}
                    </Link>
                    <Link href="/messages" className="relative p-2.5 rounded-2xl text-[#4b5563] hover:text-[#f97316] hover:bg-white/60 transition-all">
                      <MessageCircle className="h-5 w-5" />
                      {counts.chatCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-[#f97316] text-white text-[9px] font-black flex items-center justify-center rounded-full shadow-lg border-2 border-white">
                          {counts.chatCount}
                        </span>
                      )}
                    </Link>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex flex-col items-center gap-0.5 px-2 sm:px-3 py-1.5 rounded-2xl hover:bg-white/60 transition-colors group outline-none">
                        {user.avatar_url ? (
                          <Avatar className="h-5 w-5 border-2 border-[var(--color-accent)]">
                            <AvatarImage src={user.avatar_url} />
                            <AvatarFallback className="text-[10px] bg-[var(--color-accent)] text-white font-black">
                              {user.full_name?.charAt(0) || user.email.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="h-5 w-5 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-[9px] font-black border-2 border-white">
                            {user.full_name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="hidden sm:block text-[9px] text-[var(--color-accent)] font-black mt-0.5 capitalize tracking-tighter">Account</span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-2">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-black truncate">{user.full_name || "Creator"}</p>
                          <p className="text-[10px] text-muted-c font-bold capitalize tracking-widest truncate">{user.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer flex items-center gap-2">
                          <LayoutDashboard className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/settings" className="cursor-pointer flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-500 hover:text-red-600 focus:text-red-600 cursor-pointer flex items-center gap-2"
                        onSelect={async () => {
                          await signOut();
                          window.location.href = "/";
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="flex items-center gap-0.5">
                   <Link href="/cart" className="relative p-2.5 rounded-2xl text-[#4b5563] hover:text-[#f97316] hover:bg-white/60 transition-all">
                      <ShoppingCart className="h-5 w-5" />
                    </Link>
                  <Link href="/login" className="flex flex-col items-center gap-0.5 px-2 sm:px-3 py-1.5 rounded-2xl hover:bg-white/60 transition-colors group">
                    <div className="h-5 w-5 rounded-full bg-[#fafafa] border border-[#f0f0f0] flex items-center justify-center text-[#4b5563]">
                      <User className="h-3 w-3" />
                    </div>
                    <span className="hidden sm:block text-[9px] text-[#6b7280] font-black capitalize tracking-tighter">Sign In</span>
                  </Link>
                </div>
              )}

              <Link href="/requests/new" className="hidden lg:block ml-2">
                <Button className="bg-[#f97316] hover:bg-[#ea580c] text-white rounded-2xl h-10 px-5 text-[12px] font-black shadow-lg shadow-[#f97316]/25 whitespace-nowrap border-0">
                  Post Buying Lead
                </Button>
              </Link>

              {/* Mobile menu toggle — always visible, high contrast */}
              <button
                type="button"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className="lg:hidden flex items-center justify-center min-w-[44px] min-h-[44px] rounded-2xl bg-[#1a1a1a] text-white hover:bg-[#333] active:scale-95 transition-all shadow-md"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* ── DESKTOP SECONDARY NAV (compact) ── */}
          <div className="hidden lg:flex items-center justify-center gap-1 sm:gap-4 h-10 border-t border-white/60 bg-white/30 backdrop-blur-sm relative rounded-b-2xl">
            <div className="flex items-center gap-6 h-full px-2">
              {[
                { label: "Marketplace", href: "/marketplace", icon: <Globe className="h-3.5 w-3.5" /> },
                { label: "Affiliates", href: "/affiliates", icon: <TrendingUp className="h-3.5 w-3.5" /> },
                { label: "Influencers", href: "/influencers", icon: <Video className="h-3.5 w-3.5" /> },
                { label: "Communities", href: "/communities", icon: <Users className="h-3.5 w-3.5" /> },
                { label: "Vendors", href: "/vendors", icon: <Factory className="h-3.5 w-3.5" /> },
              ].map(link => (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  className={cn(
                    "flex items-center gap-2 text-[12px] font-black capitalize tracking-wide hover:text-[#f97316] transition-colors h-full px-4 py-2 rounded-xl hover:bg-white/50",
                    pathname === link.href && "text-[#f97316] bg-white/50"
                  )}
                >
                  <span className="text-[#9ca3af]">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Cart & Chat (Desktop) */}
            <div className="absolute right-4 flex items-center gap-1 h-full">
              <Link href="/cart" className="relative flex items-center gap-2 px-4 py-2 h-full rounded-xl hover:bg-white/50 transition-colors group">
                <ShoppingCart className="h-4 w-4 text-[#4b5563] group-hover:text-[#f97316]" />
                <span className="text-[11px] text-[#6b7280] font-black capitalize tracking-tighter group-hover:text-[#f97316]">Cart</span>
                {counts.cartCount > 0 && (
                  <Badge className="h-4 w-auto min-w-[18px] px-1.5 bg-[#f97316] text-white text-[10px] flex items-center justify-center border-none shadow-md rounded-full">
                    {counts.cartCount}
                  </Badge>
                )}
              </Link>
              <Link href="/messages" className="relative flex items-center gap-2 px-4 py-2 h-full rounded-xl hover:bg-white/50 transition-colors group">
                <MessageCircle className="h-4 w-4 text-[#4b5563] group-hover:text-[#f97316]" />
                <span className="text-[11px] text-[#6b7280] font-black capitalize tracking-tighter group-hover:text-[#f97316]">Chat</span>
                {counts.chatCount > 0 && (
                  <Badge className="h-4 w-auto min-w-[18px] px-1.5 bg-[#f97316] text-white text-[10px] flex items-center justify-center border-none shadow-md rounded-full">
                    {counts.chatCount}
                  </Badge>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu — portal to body so not clipped by header overflow-hidden */}
        {mobileOpen && typeof document !== "undefined" && createPortal(
          <>
            <div
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
              aria-hidden
              onClick={() => setMobileOpen(false)}
            />
            <div className="lg:hidden fixed inset-0 z-[9999] overflow-y-auto bg-white shadow-2xl w-full pt-[env(safe-area-inset-top,0px)]">
              <div className="sticky top-0 flex items-center justify-between px-4 py-4 bg-white border-b border-[#f0f0f0] z-10">
                <span className="text-sm font-black text-[#1a1a1a] uppercase tracking-wider">Menu</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="p-2 rounded-xl bg-[#f5f5f5] text-[#4b5563] hover:bg-[#eee]"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4 flex flex-col gap-2 pb-24">
                {/* Search with AI — primary mobile search CTA */}
                <Link
                  href="/marketplace"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-[#fff7ed] to-[#ffedd5] border border-[#f97316]/20 shadow-sm active:scale-[0.99]"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#f97316] flex items-center justify-center shrink-0">
                    <Search className="h-6 w-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-black text-[#1a1a1a]">Search with Jimvio AI</p>
                    <p className="text-[12px] text-[#6b7280] font-medium">Products, suppliers, marketplace</p>
                  </div>
                  <span className="text-[#f97316] shrink-0 font-black text-sm">Go →</span>
                </Link>

                <div className="text-[10px] font-black text-[#9ca3af] capitalize tracking-[0.2em] mt-2 mb-2">Main Navigation</div>
              {[
                { label: "Marketplace", href: "/marketplace", icon: <Globe className="h-5 w-5" /> },
                { label: "Affiliates", href: "/affiliates", icon: <TrendingUp className="h-5 w-5" /> },
                { label: "Influencers", href: "/influencers", icon: <Video className="h-5 w-5" /> },
                { label: "Communities", href: "/communities", icon: <Users className="h-5 w-5" /> },
                { label: "Vendors", href: "/vendors", icon: <Factory className="h-5 w-5" /> },
              ].map(link => (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  className="flex items-center gap-4 py-3.5 px-4 rounded-xl text-[15px] font-black text-[#1a1a1a] hover:bg-[#fff7ed] hover:text-[#f97316] transition-all active:scale-[0.98]"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="p-2 rounded-lg bg-[#fafafa] text-[#6b7280]">{link.icon}</span>
                  {link.label}
                </Link>
              ))}

              <div className="text-[10px] font-black text-[#9ca3af] capitalize tracking-[0.2em] mt-8 mb-4 border-t border-[#f0f0f0] pt-6">Trade Tools</div>
              <Link 
                href="/requests/new" 
                className="flex items-center justify-between py-4 px-6 bg-[#f97316] text-white rounded-2xl font-black shadow-lg shadow-orange-500/20 active:scale-[0.98]"
                onClick={() => setMobileOpen(false)}
              >
                Post Buying Lead <Plus className="h-5 w-5" />
              </Link>

              {!user && (
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <Link href="/login" className="py-4 text-center bg-[#fafafa] border border-[#f0f0f0] rounded-xl font-black text-sm text-[#1a1a1a] active:scale-95" onClick={() => setMobileOpen(false)}>Login</Link>
                  <Link href="/register" className="py-4 text-center bg-white border-2 border-[#f97316] text-[#f97316] rounded-xl font-black text-sm active:scale-95" onClick={() => setMobileOpen(false)}>Join Free</Link>
                </div>
              )}
              </div>
            </div>
          </>,
          document.body
        )}
      </nav>
    </header>
  );
}
