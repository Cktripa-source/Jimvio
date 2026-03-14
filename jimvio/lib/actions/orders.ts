"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createOrder(productId: string, quantity: number = 1) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/marketplace");
  }

  // 1. Get product details
  const { data: product } = await supabase
    .from("products")
    .select("*, vendors(*)")
    .eq("id", productId)
    .single();

  if (!product) throw new Error("Product not found");

  // 2. Check for affiliate cookie
  const cookieStore = await cookies();
  const refCode = cookieStore.get("jimvio_ref")?.value;
  let affiliateId = null;
  let commissionRate = product.affiliate_commission_rate || 5;
  let commissionAmount = 0;

  if (refCode) {
    const { data: link } = await supabase
      .from("affiliate_links")
      .select("affiliate_id, commission_rate")
      .eq("link_code", refCode)
      .single();
    
    if (link) {
      affiliateId = link.affiliate_id;
      commissionRate = link.commission_rate || commissionRate;
    }
  }

  const totalPrice = product.price * quantity;
  if (affiliateId) {
    commissionAmount = (totalPrice * commissionRate) / 100;
  }

  // 3. Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      buyer_id: user.id,
      total_amount: totalPrice,
      currency: "RWF",
      status: "pending",
      payment_status: "pending",
    })
    .select()
    .single();

  if (orderError) throw orderError;

  // 4. Create order item
  await supabase.from("order_items").insert({
    order_id: order.id,
    product_id: product.id,
    vendor_id: product.vendor_id,
    product_name: product.name,
    quantity: quantity,
    unit_price: product.price,
    total_price: totalPrice,
    affiliate_id: affiliateId,
    affiliate_commission_rate: commissionRate,
    affiliate_commission_amount: commissionAmount,
  });

  // 5. Initialize payment (optional, can redirect to a payment page)
  // In this system, we might redirect to a checkout page or start irembopay
  
  return { orderId: order.id };
}
