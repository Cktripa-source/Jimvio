import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { iremboPay } from "@/services/payments/irembopay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-irembopay-signature") || "";

    if (!iremboPay.verifyWebhookSignature(body, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(body);
    const { transactionId, reference, status, amount, paidAt, metadata } = payload;

    const supabase = await createClient();

    const paymentStatus = status === "completed" ? "completed"
      : status === "failed" ? "failed"
      : status === "cancelled" ? "cancelled"
      : "processing";

    await supabase.from("transactions").update({
      status: paymentStatus,
      provider_transaction_id: transactionId,
      provider_reference: reference,
      updated_at: new Date().toISOString(),
    }).eq("reference", reference);

    if (status === "completed") {
      const { data: transaction } = await supabase
        .from("transactions")
        .select("order_id, user_id")
        .eq("reference", reference)
        .single();

      if (transaction?.order_id) {
        await supabase.from("orders").update({
          payment_status: "completed",
          status: "confirmed",
          irembopay_transaction_id: transactionId,
          irembopay_reference: reference,
          paid_at: paidAt || new Date().toISOString(),
        }).eq("id", transaction.order_id);

        // Process affiliate commissions
        const { data: orderItems } = await supabase
          .from("order_items")
          .select("*")
          .eq("order_id", transaction.order_id)
          .not("affiliate_id", "is", null);

        if (orderItems && orderItems.length > 0) {
          for (const item of orderItems) {
            if (item.affiliate_id && item.affiliate_commission_amount) {
              await supabase.from("affiliate_commissions").insert({
                affiliate_id: item.affiliate_id,
                order_id: transaction.order_id,
                order_item_id: item.id,
                product_id: item.product_id,
                vendor_id: item.vendor_id,
                commission_rate: item.affiliate_commission_rate,
                order_amount: item.total_price,
                commission_amount: item.affiliate_commission_amount,
                status: "pending",
              });

              await supabase.rpc("increment_affiliate_earnings", {
                p_affiliate_id: item.affiliate_id,
                p_amount: item.affiliate_commission_amount,
              });
            }
          }
        }

        // Notify buyer
        await supabase.from("notifications").insert({
          user_id: transaction.user_id,
          type: "order",
          title: "Payment Confirmed!",
          message: `Your payment of RWF ${amount.toLocaleString()} has been confirmed. Order is being processed.`,
          data: { order_id: transaction.order_id, reference },
          action_url: `/orders/${transaction.order_id}`,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
