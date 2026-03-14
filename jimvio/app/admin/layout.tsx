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
    <div className="flex h-screen overflow-hidden bg-page">
      <Sidebar
        role="admin"
        user={mockAdminUser}
        activeRoles={["admin"]}
      />
      <main className="flex-1 overflow-y-auto bg-[var(--color-bg)]">
        <div className="p-4 sm:p-5 lg:p-6 max-w-[1400px]">{children}</div>
      </main>
    </div>
  );
}
