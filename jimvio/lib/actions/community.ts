"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getCommunitySlug } from "@/services/db";

export async function joinCommunity(communityId: string, plan: "monthly" | "yearly" | "lifetime" = "monthly") {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Authentication required" };

    // Check if already a member
    const { data: existing } = await supabase
      .from("community_members")
      .select("id, subscription_status")
      .eq("community_id", communityId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing?.subscription_status === "active") {
      return { success: false, error: "You are already a member of this community" };
    }

    if (existing) {
      // Reactivate
      const { error } = await supabase
        .from("community_members")
        .update({ subscription_status: "active", subscription_plan: plan, subscribed_at: new Date().toISOString(), cancelled_at: null })
        .eq("id", existing.id);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("community_members")
        .insert({ community_id: communityId, user_id: user.id, subscription_plan: plan, role: "member" });
      if (error) throw error;
    }

    revalidatePath("/communities");
    const slug = await getCommunitySlug(communityId);
    if (slug) revalidatePath(`/communities/${slug}`);
    return { success: true };
  } catch (error: any) {
    console.error("Join community error:", error);
    return { success: false, error: error.message };
  }
}

export async function leaveCommunity(communityId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Authentication required" };

    const { error } = await supabase
      .from("community_members")
      .update({ subscription_status: "cancelled", cancelled_at: new Date().toISOString() })
      .eq("community_id", communityId)
      .eq("user_id", user.id);

    if (error) throw error;

    revalidatePath("/communities");
    const slug = await getCommunitySlug(communityId);
    if (slug) revalidatePath(`/communities/${slug}`);
    return { success: true };
  } catch (error: any) {
    console.error("Leave community error:", error);
    return { success: false, error: error.message };
  }
}

export async function createCommunityPost(communityId: string, formData: { title?: string; body: string; postType?: string }) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Authentication required" };

    const { data, error } = await supabase
      .from("community_posts")
      .insert({
        community_id: communityId,
        author_id: user.id,
        title: formData.title || null,
        body: formData.body,
        post_type: formData.postType || "discussion",
      })
      .select()
      .single();

    if (error) throw error;

    // Increment post count
    const { data: community } = await supabase
      .from("communities")
      .select("post_count")
      .eq("id", communityId)
      .single();

    if (community) {
      await supabase
        .from("communities")
        .update({ post_count: (community.post_count || 0) + 1 })
        .eq("id", communityId);
    }

    revalidatePath("/communities");
    const slug = await getCommunitySlug(communityId);
    if (slug) revalidatePath(`/communities/${slug}`);
    return { success: true, data };
  } catch (error: any) {
    console.error("Create post error:", error);
    return { success: false, error: error.message };
  }
}

export async function createPostComment(postId: string, body: string, parentId?: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Authentication required" };

    const { data, error } = await supabase
      .from("community_post_comments")
      .insert({
        post_id: postId,
        author_id: user.id,
        body,
        parent_id: parentId || null,
      })
      .select("*, profiles(full_name, avatar_url)")
      .single();

    if (error) throw error;

    const { data: post } = await supabase.from("community_posts").select("community_id").eq("id", postId).single();
    revalidatePath("/communities");
    if (post?.community_id) {
      const slug = await getCommunitySlug(post.community_id);
      if (slug) revalidatePath(`/communities/${slug}`);
    }
    return { success: true, data };
  } catch (error: any) {
    console.error("Create comment error:", error);
    return { success: false, error: error.message };
  }
}

export async function likePost(postId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Authentication required" };

    // Get current like_count and community_id
    const { data: post } = await supabase
      .from("community_posts")
      .select("like_count, community_id")
      .eq("id", postId)
      .single();

    const { error } = await supabase
      .from("community_posts")
      .update({ like_count: (post?.like_count || 0) + 1 })
      .eq("id", postId);

    if (error) throw error;

    revalidatePath("/communities");
    if (post?.community_id) {
      const slug = await getCommunitySlug(post.community_id);
      if (slug) revalidatePath(`/communities/${slug}`);
    }
    return { success: true };
  } catch (error: any) {
    console.error("Like post error:", error);
    return { success: false, error: error.message };
  }
}

export async function createCommunity(formData: {
  name: string;
  slug: string;
  description: string;
  category: string;
  isPrivate: boolean;
  monthlyPrice?: number;
  yearlyPrice?: number;
}) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Authentication required" };

    const { data, error } = await supabase
      .from("communities")
      .insert({
        owner_id: user.id,
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        category: formData.category,
        is_private: formData.isPrivate,
        monthly_price: formData.monthlyPrice || null,
        yearly_price: formData.yearlyPrice || null,
      })
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/communities");
    revalidatePath("/dashboard");
    return { success: true, data };
  } catch (error: any) {
    console.error("Create community error:", error);
    return { success: false, error: error.message };
  }
}

export async function getMembershipStatus(communityId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { isMember: false, isOwner: false };

    const [memberRes, communityRes] = await Promise.all([
      supabase
        .from("community_members")
        .select("id, subscription_status, role")
        .eq("community_id", communityId)
        .eq("user_id", user.id)
        .eq("subscription_status", "active")
        .maybeSingle(),
      supabase
        .from("communities")
        .select("owner_id")
        .eq("id", communityId)
        .single(),
    ]);

    return {
      isMember: !!memberRes.data,
      isOwner: communityRes.data?.owner_id === user.id,
      role: memberRes.data?.role || null,
    };
  } catch {
    return { isMember: false, isOwner: false };
  }
}
