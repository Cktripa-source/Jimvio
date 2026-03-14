import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { createClient, getCachedUser } from "@/lib/supabase/server";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  let profile = null;

  try {
    const { data: { user } } = await getCachedUser();
    const supabase = await createClient();

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
      <main className="flex-1 pt-[var(--navbar-height)]">{children}</main>
      <Footer />
    </div>
  );
}
