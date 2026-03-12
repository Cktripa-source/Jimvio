import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { createClient } from "@/lib/supabase/server";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  let profile = null;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data } = await supabase
        .from("profiles")
        .select("email, full_name, avatar_url")
        .eq("id", user.id)
        .single();
      profile = data;

      // If profile doesn't exist in DB (tables not created yet), use auth user data
      if (!profile && user.email) {
        profile = {
          email: user.email,
          full_name: user.user_metadata?.full_name || null,
          avatar_url: user.user_metadata?.avatar_url || null,
        };
      }
    }
  } catch {
    // Silently handle DB not set up yet
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={profile} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
