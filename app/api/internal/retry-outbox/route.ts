import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { OrderRecord, updateOrderEmailDelivery } from "@/lib/orders";
import { sendOrderConfirmationEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  "https://fbzmzvhuutzwcnspotzj.supabase.co";

const SUPABASE_SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  "";

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function POST(req: NextRequest) {
  const secret = process.env.INTERNAL_CRON_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "INTERNAL_CRON_SECRET is not configured on the server." },
      { status: 500 }
    );
  }

  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();

  if (!token || !safeCompare(token, secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find paid orders where email delivery failed or remained pending with attempts < 5
  const queryUrl = `${SUPABASE_URL}/rest/v1/orders?order_status=eq.paid&email_delivery_status=neq.sent&email_attempts=lt.5&limit=20`;

  const res = await fetch(queryUrl, {
    method: "GET",
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to query pending emails" },
      { status: 500 }
    );
  }

  const orders: OrderRecord[] = await res.json();
  const results = [];

  for (const order of orders) {
    const sendRes = await sendOrderConfirmationEmail(order);
    const attempts = (order.email_attempts || 0) + 1;
    await updateOrderEmailDelivery({
      orderId: order.id,
      status: sendRes.success ? "sent" : "failed",
      attempts,
      lastError: sendRes.error || null,
    });
    results.push({
      orderId: order.id,
      orderReference: order.order_reference,
      success: sendRes.success,
      attempts,
    });
  }

  return NextResponse.json({
    retriedCount: orders.length,
    results,
  });
}
