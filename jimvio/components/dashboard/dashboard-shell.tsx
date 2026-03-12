"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";

type DashboardRole = "buyer" | "vendor" | "affiliate" | "influencer" | "community" | "admin";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [activeRole, setActiveRole] = useState<DashboardRole>("vendor");

  const mockUser = {
    email: "user@jimvio.com",
    full_name: "Jean-Pierre Uwimana",
    avatar_url: null,
  };
  const mockActiveRoles: DashboardRole[] = ["buyer", "vendor", "affiliate", "influencer", "community"];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <Sidebar
        role={activeRole}
        user={mockUser}
        activeRoles={mockActiveRoles}
        onRoleChange={setActiveRole}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
