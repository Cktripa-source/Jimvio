export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      {children}
    </div>
  );
}
