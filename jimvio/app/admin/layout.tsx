"use client";

import React from "react";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const mockAdminUser = {
    email: "admin@jimvio.com",
    full_name: "JIMVIO Admin",
    avatar_url: null,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <Sidebar
        role="admin"
        user={mockAdminUser}
        activeRoles={["admin"]}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
