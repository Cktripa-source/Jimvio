import { Header } from "@/components/layout/Header";
import { RoleSwitcher } from "@/components/dashboard/RoleSwitcher";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      <div className="container py-8">
        <div className="mb-6">
          <RoleSwitcher />
        </div>
        {children}
      </div>
    </div>
  );
}
