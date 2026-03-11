// User & Auth Types
export type UserRole =
  | "buyer"
  | "vendor"
  | "affiliate"
  | "influencer"
  | "community_owner"
  | "admin";

export interface UserProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

// Product Types
export type ProductType = "physical" | "digital";

export interface Product {
  id: string;
  vendor_id: string;
  title: string;
  slug: string;
  description: string | null;
  product_type: ProductType;
  base_price: number;
  category_id: string;
  affiliate_enabled: boolean;
  status: "draft" | "active" | "archived";
  created_at: string;
  updated_at: string;
}

// Order Types
export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

// Affiliate Types
export interface AffiliateLink {
  id: string;
  affiliate_id: string;
  product_id: string;
  code: string;
  clicks: number;
  conversions: number;
}

// Community Types
export type MembershipTier = "monthly" | "yearly" | "lifetime";
