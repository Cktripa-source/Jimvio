"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Sidebar, type DashboardRole } from "@/components/dashboard/sidebar";
import { createClient } from "@/lib/supabase/client";

interface UserProfile {
  email: string;
  full_name: string | null;
  avatar_url: string | null;
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const welcomeRole  = searchParams.get("welcome") as DashboardRole | null;

  const [activeRole, setActiveRole]     = useState<DashboardRole>("buyer");
  const [activeRoles, setActiveRoles]   = useState<DashboardRole[]>(["buyer"]);
  const [user, setUser]                 = useState<UserProfile>({ email: "user@jimvio.com", full_name: null, avatar_url: null });
  const [loaded, setLoaded]             = useState(false);

  useEffect(() => {
    async function loadUserAndRoles() {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;

      // Get profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("email, full_name, avatar_url")
        .eq("id", authUser.id)
        .single();

      if (profile) {
        setUser({ email: profile.email, full_name: profile.full_name, avatar_url: profile.avatar_url });
      }

      // Detect active roles based on what exists in DB
      const roles: DashboardRole[] = ["buyer"];

      const [vendorRes, affiliateRes, influencerRes, communityRes] = await Promise.all([
        supabase.from("vendors")    .select("id").eq("user_id", authUser.id).maybeSingle(),
        supabase.from("affiliates") .select("id").eq("user_id", authUser.id).maybeSingle(),
        supabase.from("influencers").select("id").eq("user_id", authUser.id).maybeSingle(),
        supabase.from("communities").select("id").eq("owner_id", authUser.id).maybeSingle(),
      ]);

      if (vendorRes.data)     roles.push("vendor");
      if (affiliateRes.data)  roles.push("affiliate");
      if (influencerRes.data) roles.push("influencer");
      if (communityRes.data)  roles.push("community");

      setActiveRoles(roles);

      // Set active role: prefer welcome param, then highest privilege
      if (welcomeRole && roles.includes(welcomeRole)) {
        setActiveRole(welcomeRole);
      } else if (roles.includes("vendor")) {
        setActiveRole("vendor");
      } else if (roles.includes("affiliate")) {
        setActiveRole("affiliate");
      } else if (roles.includes("influencer")) {
        setActiveRole("influencer");
      } else if (roles.includes("community")) {
        setActiveRole("community");
      } else {
        setActiveRole("buyer");
      }

      setLoaded(true);
    }

    loadUserAndRoles();
  }, [welcomeRole]);

  return (
    <div className="flex h-screen overflow-hidden bg-page">
      <Sidebar
        role={activeRole}
        user={user}
        activeRoles={activeRoles}
        onRoleChange={setActiveRole}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
