-- JIMVIO Platform - Row Level Security (RLS)
-- Phase 2: RLS Policies

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulk_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE influencer_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE influencer_campaign_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE viral_clips ENABLE ROW LEVEL SECURITY;
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES
-- ============================================
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================
-- ROLES
-- ============================================
CREATE POLICY "Users can view own roles" ON roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own roles" ON roles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own roles" ON roles
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- PRODUCT CATEGORIES (Public read)
-- ============================================
CREATE POLICY "Categories are viewable by everyone" ON product_categories
  FOR SELECT USING (true);

-- ============================================
-- VENDORS
-- ============================================
CREATE POLICY "Vendors are viewable by everyone" ON vendors
  FOR SELECT USING (true);

CREATE POLICY "Vendors can update own" ON vendors
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can create vendor" ON vendors
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- PRODUCTS
-- ============================================
CREATE POLICY "Active products are viewable by everyone" ON products
  FOR SELECT USING (status = 'active' OR EXISTS (
    SELECT 1 FROM vendors WHERE vendors.id = products.vendor_id AND vendors.user_id = auth.uid()
  ));

CREATE POLICY "Vendors can manage own products" ON products
  FOR ALL USING (EXISTS (
    SELECT 1 FROM vendors WHERE vendors.id = products.vendor_id AND vendors.user_id = auth.uid()
  ));

-- ============================================
-- PRODUCT VARIANTS, IMAGES, VIDEOS
-- ============================================
CREATE POLICY "Product variants viewable with product" ON product_variants
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM products p
    LEFT JOIN vendors v ON v.id = p.vendor_id
    WHERE p.id = product_variants.product_id
    AND (p.status = 'active' OR v.user_id = auth.uid())
  ));

CREATE POLICY "Vendors can manage product variants" ON product_variants
  FOR ALL USING (EXISTS (
    SELECT 1 FROM products p
    JOIN vendors v ON v.id = p.vendor_id
    WHERE p.id = product_variants.product_id AND v.user_id = auth.uid()
  ));

CREATE POLICY "Product images viewable with product" ON product_images
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM products p
    LEFT JOIN vendors v ON v.id = p.vendor_id
    WHERE p.id = product_images.product_id
    AND (p.status = 'active' OR v.user_id = auth.uid())
  ));

CREATE POLICY "Vendors can manage product images" ON product_images
  FOR ALL USING (EXISTS (
    SELECT 1 FROM products p
    JOIN vendors v ON v.id = p.vendor_id
    WHERE p.id = product_images.product_id AND v.user_id = auth.uid()
  ));

CREATE POLICY "Product videos viewable with product" ON product_videos
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM products p
    LEFT JOIN vendors v ON v.id = p.vendor_id
    WHERE p.id = product_videos.product_id
    AND (p.status = 'active' OR v.user_id = auth.uid())
  ));

CREATE POLICY "Vendors can manage product videos" ON product_videos
  FOR ALL USING (EXISTS (
    SELECT 1 FROM products p
    JOIN vendors v ON v.id = p.vendor_id
    WHERE p.id = product_videos.product_id AND v.user_id = auth.uid()
  ));

CREATE POLICY "Bulk pricing viewable with product" ON bulk_pricing
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM products p
    LEFT JOIN vendors v ON v.id = p.vendor_id
    WHERE p.id = bulk_pricing.product_id AND (p.status = 'active' OR v.user_id = auth.uid())
  ));

CREATE POLICY "Vendors can manage bulk pricing" ON bulk_pricing
  FOR ALL USING (EXISTS (
    SELECT 1 FROM products p
    JOIN vendors v ON v.id = p.vendor_id
    WHERE p.id = bulk_pricing.product_id AND v.user_id = auth.uid()
  ));

CREATE POLICY "Shipping settings viewable with product" ON shipping_settings
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM products p
    LEFT JOIN vendors v ON v.id = p.vendor_id
    WHERE p.id = shipping_settings.product_id AND (p.status = 'active' OR v.user_id = auth.uid())
  ));

CREATE POLICY "Vendors can manage shipping settings" ON shipping_settings
  FOR ALL USING (EXISTS (
    SELECT 1 FROM products p
    JOIN vendors v ON v.id = p.vendor_id
    WHERE p.id = shipping_settings.product_id AND v.user_id = auth.uid()
  ));

-- ============================================
-- ORDERS
-- ============================================
CREATE POLICY "Buyers can view own orders" ON orders
  FOR SELECT USING (auth.uid() = buyer_id);

CREATE POLICY "Buyers can create orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Vendors can view orders for their products" ON orders
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM order_items oi
    JOIN products p ON p.id = oi.product_id
    JOIN vendors v ON v.id = p.vendor_id
    WHERE oi.order_id = orders.id AND v.user_id = auth.uid()
  ));

CREATE POLICY "Order items follow order access" ON order_items
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM orders WHERE orders.id = order_items.order_id
    AND (orders.buyer_id = auth.uid() OR EXISTS (
      SELECT 1 FROM products p
      JOIN vendors v ON v.id = p.vendor_id
      WHERE p.id = order_items.product_id AND v.user_id = auth.uid()
    ))
  ));

CREATE POLICY "System can insert order items" ON order_items
  FOR INSERT WITH CHECK (true);

-- ============================================
-- REVIEWS
-- ============================================
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- WISHLISTS
-- ============================================
CREATE POLICY "Users can manage own wishlist" ON wishlists
  FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- AFFILIATES
-- ============================================
CREATE POLICY "Affiliates can view own data" ON affiliates
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create affiliate" ON affiliates
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Affiliates can update own" ON affiliates
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Affiliate links - own or product is affiliate enabled" ON affiliate_links
  FOR SELECT USING (
    auth.uid() = (SELECT user_id FROM affiliates WHERE affiliates.id = affiliate_links.affiliate_id)
    OR EXISTS (SELECT 1 FROM products WHERE products.id = affiliate_links.product_id AND products.affiliate_enabled = true)
  );

CREATE POLICY "Affiliates can manage own links" ON affiliate_links
  FOR ALL USING (EXISTS (
    SELECT 1 FROM affiliates WHERE affiliates.id = affiliate_links.affiliate_id AND affiliates.user_id = auth.uid()
  ));

CREATE POLICY "Affiliate sales - affiliate can view own" ON affiliate_sales
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM affiliates WHERE affiliates.id = affiliate_sales.affiliate_id AND affiliates.user_id = auth.uid()
  ));

CREATE POLICY "Affiliate clicks - link owner can view" ON affiliate_clicks
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM affiliate_links al
    JOIN affiliates a ON a.id = al.affiliate_id
    WHERE al.id = affiliate_clicks.affiliate_link_id AND a.user_id = auth.uid()
  ));

-- ============================================
-- INFLUENCERS
-- ============================================
CREATE POLICY "Influencers can view own data" ON influencers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create influencer" ON influencers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Influencers can update own" ON influencers
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Active campaigns viewable by everyone" ON influencer_campaigns
  FOR SELECT USING (status = 'active' OR EXISTS (
    SELECT 1 FROM vendors WHERE vendors.id = influencer_campaigns.vendor_id AND vendors.user_id = auth.uid()
  ));

CREATE POLICY "Vendors can manage own campaigns" ON influencer_campaigns
  FOR ALL USING (EXISTS (
    SELECT 1 FROM vendors WHERE vendors.id = influencer_campaigns.vendor_id AND vendors.user_id = auth.uid()
  ));

CREATE POLICY "Campaign members - participants can view" ON influencer_campaign_members
  FOR SELECT USING (
    auth.uid() = (SELECT user_id FROM influencers WHERE influencers.id = influencer_campaign_members.influencer_id)
    OR EXISTS (
      SELECT 1 FROM influencer_campaigns ic
      JOIN vendors v ON v.id = ic.vendor_id
      WHERE ic.id = influencer_campaign_members.campaign_id AND v.user_id = auth.uid()
    )
  );

CREATE POLICY "Viral clips viewable by campaign/influencer" ON viral_clips
  FOR SELECT USING (
    auth.uid() = (SELECT user_id FROM influencers WHERE influencers.id = viral_clips.influencer_id)
    OR EXISTS (
      SELECT 1 FROM influencer_campaigns ic
      JOIN vendors v ON v.id = ic.vendor_id
      WHERE ic.id = viral_clips.campaign_id AND v.user_id = auth.uid()
    )
  );

CREATE POLICY "Influencers can manage own clips" ON viral_clips
  FOR ALL USING (EXISTS (
    SELECT 1 FROM influencers WHERE influencers.id = viral_clips.influencer_id AND influencers.user_id = auth.uid()
  ));

-- ============================================
-- COMMUNITIES
-- ============================================
CREATE POLICY "Communities viewable if public or member" ON communities
  FOR SELECT USING (
    is_public = true OR owner_id = auth.uid()
    OR EXISTS (SELECT 1 FROM community_members WHERE community_id = communities.id AND user_id = auth.uid())
  );

CREATE POLICY "Owners can manage communities" ON communities
  FOR ALL USING (auth.uid() = owner_id);

CREATE POLICY "Community plans viewable with community" ON community_plans
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM communities c
    WHERE c.id = community_plans.community_id
    AND (c.is_public = true OR c.owner_id = auth.uid()
      OR EXISTS (SELECT 1 FROM community_members cm WHERE cm.community_id = c.id AND cm.user_id = auth.uid()))
  ));

CREATE POLICY "Community members - members and owner can view" ON community_members
  FOR SELECT USING (
    user_id = auth.uid()
    OR EXISTS (SELECT 1 FROM communities WHERE id = community_members.community_id AND owner_id = auth.uid())
  );

CREATE POLICY "Community posts - members can view" ON community_posts
  FOR SELECT USING (
    (is_exclusive = false OR EXISTS (
      SELECT 1 FROM community_members
      WHERE community_members.community_id = community_posts.community_id
      AND community_members.user_id = auth.uid()
    ))
    AND EXISTS (
      SELECT 1 FROM communities c
      WHERE c.id = community_posts.community_id
      AND (c.is_public = true OR c.owner_id = auth.uid()
        OR EXISTS (SELECT 1 FROM community_members cm WHERE cm.community_id = c.id AND cm.user_id = auth.uid()))
    )
  );

CREATE POLICY "Authors can manage own posts" ON community_posts
  FOR ALL USING (auth.uid() = author_id);

-- ============================================
-- TRANSACTIONS & PAYOUTS
-- ============================================
CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own payouts" ON payouts
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- NOTIFICATIONS
-- ============================================
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications" ON notifications
  FOR INSERT WITH CHECK (true);
