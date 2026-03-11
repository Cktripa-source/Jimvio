export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen gradient-bg">
      <div className="container py-8">
        <p className="text-muted-foreground mb-4">Admin Dashboard - Phase 6</p>
        {children}
      </div>
    </div>
  );
}
