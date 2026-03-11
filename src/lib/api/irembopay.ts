/**
 * Irembopay API Integration
 * Phase 11 - Payment processing
 * @see https://irembopay.com/docs (replace with actual docs URL)
 */

const IREMBOPAY_API_URL = process.env.IREMBOPAY_API_URL || "https://api.irembopay.com";
const API_KEY = process.env.IREMBOPAY_API_KEY;
const API_SECRET = process.env.IREMBOPAY_SECRET;

export interface CreatePaymentParams {
  amount: number;
  currency?: string;
  reference: string;
  customer_email: string;
  customer_name?: string;
  callback_url?: string;
  metadata?: Record<string, unknown>;
}

export interface PaymentResponse {
  success: boolean;
  payment_url?: string;
  transaction_id?: string;
  error?: string;
}

export async function createPayment(
  params: CreatePaymentParams
): Promise<PaymentResponse> {
  if (!API_KEY || !API_SECRET) {
    return { success: false, error: "Irembopay not configured" };
  }

  try {
    const response = await fetch(`${IREMBOPAY_API_URL}/v1/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "X-API-Secret": API_SECRET,
      },
      body: JSON.stringify({
        amount: params.amount,
        currency: params.currency ?? "USD",
        reference: params.reference,
        customer_email: params.customer_email,
        customer_name: params.customer_name,
        callback_url: params.callback_url,
        metadata: params.metadata,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.message || "Payment failed" };
    }
    return {
      success: true,
      payment_url: data.payment_url,
      transaction_id: data.transaction_id,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Payment request failed",
    };
  }
}

export async function verifyPayment(transactionId: string): Promise<boolean> {
  if (!API_KEY || !API_SECRET) return false;

  try {
    const response = await fetch(
      `${IREMBOPAY_API_URL}/v1/payments/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "X-API-Secret": API_SECRET,
        },
      }
    );
    const data = await response.json();
    return data.status === "completed" || data.status === "paid";
  } catch {
    return false;
  }
}
