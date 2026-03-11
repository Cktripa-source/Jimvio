import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getCategories() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("product_categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data;
}
