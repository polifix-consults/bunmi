/**
 * Orders and Stripe Webhook Events Supabase persistence helpers.
 * Strictly uses SUPABASE_SERVICE_ROLE_KEY to interact with RLS-protected tables.
 */
import type { BookEdition } from "./book";

export interface OrderRecord {
  id: string;
  order_reference: string;
  buyer_name: string | null;
  buyer_email: string | null;
  book_edition: BookEdition;
  quantity: number;
  expected_amount: number;
  paid_amount: number;
  refunded_amount: number;
  currency: string;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  stripe_customer_id: string | null;
  order_status:
    | "pending"
    | "paid"
    | "failed"
    | "cancelled"
    | "refunded"
    | "partially_refunded"
    | "disputed";
  payment_status: "unpaid" | "paid" | "refunded" | "partially_refunded";
  dispute_status?: "needs_response" | "under_review" | "won" | "lost" | null;
  email_delivery_status: "pending" | "sent" | "failed";
  email_attempts: number;
  email_last_error?: string | null;
  email_sent_at?: string | null;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface WebhookEventRecord {
  id: string;
  event_type: string;
  api_version?: string | null;
  processed_at: string;
  payload: Record<string, unknown>;
  status: "processed" | "failed" | "ignored";
  error?: string | null;
}

const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://fbzmzvhuutzwcnspotzj.supabase.co";

function getServiceKey(): string {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.NEXT_SUPABASE_SECRET_KEY ||
    ""
  );
}

function getHeaders() {
  const key = getServiceKey();
  if (!key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY is not configured on the server."
    );
  }
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };
}

/**
 * Generate human-friendly reference e.g., OA-2026-X9K4
 */
export function generateOrderReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 5; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const year = new Date().getFullYear();
  return `OA-${year}-${random}`;
}

/**
 * Create a new pending order in Supabase
 */
export async function createPendingOrder(params: {
  buyerName: string;
  buyerEmail: string;
  bookEdition: BookEdition;
  quantity: number;
  expectedAmount: number;
  currency: string;
  metadata?: Record<string, unknown>;
}): Promise<OrderRecord> {
  const orderRef = generateOrderReference();

  const res = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      order_reference: orderRef,
      buyer_name: params.buyerName,
      buyer_email: params.buyerEmail,
      book_edition: params.bookEdition,
      quantity: params.quantity,
      expected_amount: params.expectedAmount,
      paid_amount: 0,
      refunded_amount: 0,
      currency: params.currency.toLowerCase(),
      order_status: "pending",
      payment_status: "unpaid",
      email_delivery_status: "pending",
      email_attempts: 0,
      metadata: params.metadata || {},
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create pending order: ${res.status} ${errorText}`);
  }

  const created: OrderRecord[] = await res.json();
  return created[0];
}

/**
 * Associate the Stripe Checkout Session ID with the pending order
 */
export async function attachStripeSession(
  orderId: string,
  sessionId: string
): Promise<void> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/orders?id=eq.${encodeURIComponent(orderId)}`,
    {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({
        stripe_session_id: sessionId,
        updated_at: new Date().toISOString(),
      }),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to attach Stripe session to order: ${res.status} ${errorText}`);
  }
}

/**
 * Find order by Stripe Checkout Session ID
 */
export async function getOrderBySessionId(
  sessionId: string
): Promise<OrderRecord | null> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/orders?stripe_session_id=eq.${encodeURIComponent(sessionId)}&limit=1`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to query order by session ID: ${res.status} ${errorText}`);
  }

  const orders: OrderRecord[] = await res.json();
  return orders.length > 0 ? orders[0] : null;
}

/**
 * Find order by ID
 */
export async function getOrderById(orderId: string): Promise<OrderRecord | null> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/orders?id=eq.${encodeURIComponent(orderId)}&limit=1`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to query order by ID: ${res.status} ${errorText}`);
  }

  const orders: OrderRecord[] = await res.json();
  return orders.length > 0 ? orders[0] : null;
}

/**
 * Mark an order paid after verified webhook processing
 */
export async function markOrderPaid(params: {
  orderId: string;
  buyerName: string | null;
  buyerEmail: string | null;
  paidAmount: number;
  stripePaymentIntentId?: string | null;
  stripeCustomerId?: string | null;
}): Promise<OrderRecord> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/orders?id=eq.${encodeURIComponent(params.orderId)}`,
    {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({
        buyer_name: params.buyerName,
        buyer_email: params.buyerEmail,
        paid_amount: params.paidAmount,
        stripe_payment_intent_id: params.stripePaymentIntentId || null,
        stripe_customer_id: params.stripeCustomerId || null,
        order_status: "paid",
        payment_status: "paid",
        updated_at: new Date().toISOString(),
      }),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to mark order paid: ${res.status} ${errorText}`);
  }

  const updated: OrderRecord[] = await res.json();
  return updated[0];
}

/**
 * Update refund status for an order
 */
export async function updateOrderRefund(params: {
  stripePaymentIntentId: string;
  refundedAmount: number;
  isFullRefund: boolean;
}): Promise<OrderRecord | null> {
  const resGet = await fetch(
    `${SUPABASE_URL}/rest/v1/orders?stripe_payment_intent_id=eq.${encodeURIComponent(
      params.stripePaymentIntentId
    )}&limit=1`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!resGet.ok) return null;
  const orders: OrderRecord[] = await resGet.json();
  if (!orders || orders.length === 0) return null;

  const current = orders[0];
  const newRefundedTotal = Math.max(current.refunded_amount || 0, params.refundedAmount);
  const newStatus = params.isFullRefund ? "refunded" : "partially_refunded";

  const resPatch = await fetch(
    `${SUPABASE_URL}/rest/v1/orders?id=eq.${encodeURIComponent(current.id)}`,
    {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({
        refunded_amount: newRefundedTotal,
        order_status: newStatus,
        payment_status: newStatus,
        updated_at: new Date().toISOString(),
      }),
    }
  );

  if (!resPatch.ok) {
    const errorText = await resPatch.text();
    throw new Error(`Failed to update refund status: ${resPatch.status} ${errorText}`);
  }

  const updated: OrderRecord[] = await resPatch.json();
  return updated[0];
}

/**
 * Record a webhook event for idempotency and auditing
 */
export async function recordWebhookEvent(params: {
  id: string;
  eventType: string;
  apiVersion?: string | null;
  payload: Record<string, unknown>;
  status: "processed" | "failed" | "ignored";
  error?: string | null;
}): Promise<boolean> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/stripe_webhook_events`, {
    method: "POST",
    headers: {
      ...getHeaders(),
      // Use ignore-duplicates so re-deliveries don't throw 409
      Prefer: "resolution=ignore-duplicates,return=minimal",
    },
    body: JSON.stringify({
      id: params.id,
      event_type: params.eventType,
      api_version: params.apiVersion || null,
      processed_at: new Date().toISOString(),
      payload: params.payload,
      status: params.status,
      error: params.error || null,
    }),
  });

  return res.ok || res.status === 201;
}

/**
 * Check if a webhook event was already processed
 */
export async function isWebhookEventProcessed(eventId: string): Promise<boolean> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/stripe_webhook_events?id=eq.${encodeURIComponent(
      eventId
    )}&select=id`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!res.ok) return false;
  const events = await res.json();
  return Array.isArray(events) && events.length > 0;
}

/**
 * Update email delivery outcome on an order
 */
export async function updateOrderEmailDelivery(params: {
  orderId: string;
  status: "sent" | "failed";
  attempts: number;
  lastError?: string | null;
}): Promise<void> {
  const body: Record<string, unknown> = {
    email_delivery_status: params.status,
    email_attempts: params.attempts,
    email_last_error: params.lastError || null,
    updated_at: new Date().toISOString(),
  };

  if (params.status === "sent") {
    body.email_sent_at = new Date().toISOString();
  }

  await fetch(
    `${SUPABASE_URL}/rest/v1/orders?id=eq.${encodeURIComponent(params.orderId)}`,
    {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(body),
    }
  );
}
