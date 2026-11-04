import { NextRequest, NextResponse } from "next/server";
import { getEventConfig } from "@/lib/config/event";
import { createPendingOrder, attachStripeSession } from "@/lib/orders";
import { getStripe } from "@/lib/stripe";
import {
  BOOK_CURRENCY,
  BOOK_EDITION_PRICES_IN_CENTS,
  getBookEditionLabel,
  isBookEdition,
} from "@/lib/book";

export const dynamic = "force-dynamic";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Basic in-memory rate limiting map: ip -> timestamps[]
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);

  // Periodically clean up map if it grows large
  if (rateLimitMap.size > 1000) {
    for (const [key, times] of rateLimitMap.entries()) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error: "Too many checkout attempts. Please wait a minute and try again.",
        },
        { status: 429 }
      );
    }

    // 2. Kill-switch / Configuration check
    const config = getEventConfig();
    if (!config.checkoutEnabled) {
      return NextResponse.json(
        {
          error:
            "Ticket reservations and book sales are currently not open. Please join our launch waitlist for priority announcements.",
        },
        { status: 503 }
      );
    }

    // 3. Parse and sanitize input
    let body: Record<string, unknown>;
    try {
      const parsed: unknown = await req.json();
      if (!isRecord(parsed)) {
        return NextResponse.json({ error: "Invalid checkout request." }, { status: 400 });
      }
      body = parsed;
    } catch {
      return NextResponse.json({ error: "Invalid checkout request." }, { status: 400 });
    }

    const buyerName =
      typeof body.buyerName === "string" ? body.buyerName.trim() : "";
    const buyerEmail =
      typeof body.buyerEmail === "string" ? body.buyerEmail.trim() : "";
    const rawEdition = body.bookEdition;
    if (
      !buyerName ||
      buyerName.length > 120 ||
      !buyerEmail ||
      buyerEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail)
    ) {
      return NextResponse.json(
        { error: "Enter a valid name and email address to continue." },
        { status: 400 }
      );
    }
    if (!isBookEdition(rawEdition)) {
      return NextResponse.json(
        { error: "Choose either the Paperback or Hardcover edition." },
        { status: 400 }
      );
    }
    const bookEdition = rawEdition;

    const rawQty = body.quantity;
    let quantity = 1;
    if (typeof rawQty === "number" && Number.isInteger(rawQty)) {
      quantity = rawQty;
    } else if (typeof rawQty === "string" && /^\d+$/.test(rawQty)) {
      quantity = parseInt(rawQty, 10);
    }

    if (quantity < 1 || quantity > config.maxCopiesPerOrder) {
      return NextResponse.json(
        {
          error: `Please select between 1 and ${config.maxCopiesPerOrder} copies per order.`,
        },
        { status: 400 }
      );
    }

    // 4. Resolve Site Base URL (strict origin validation against allowlist)
    const configuredSiteUrl = process.env.SITE_URL?.trim().replace(/\/$/, "");
    const allowedOrigins = new Set(
      [
        configuredSiteUrl,
        "https://olubunmiayantunji.com",
        "https://www.olubunmiayantunji.com",
        process.env.NODE_ENV === "development" ? "http://localhost:3000" : null,
      ].filter(Boolean) as string[]
    );

    const requestOrigin = (req.headers.get("origin") || "").replace(/\/$/, "");
    const siteUrl =
      requestOrigin && allowedOrigins.has(requestOrigin)
        ? requestOrigin
        : configuredSiteUrl || "https://olubunmiayantunji.com";

    const pricePerUnit = BOOK_EDITION_PRICES_IN_CENTS[bookEdition];
    const expectedTotal = pricePerUnit * quantity;
    const editionLabel = getBookEditionLabel(bookEdition);

    // 5. Persist Pending Order in Supabase
    const order = await createPendingOrder({
      buyerName,
      buyerEmail,
      bookEdition,
      quantity,
      expectedAmount: expectedTotal,
      currency: BOOK_CURRENCY,
      metadata: {
        source: "web_checkout",
        client_ip: ip,
        bookEdition,
        createdAtIso: new Date().toISOString(),
      },
    });

    // 6. Create Stripe Checkout Session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        customer_email: buyerEmail,
        line_items: [
          {
            price_data: {
              currency: BOOK_CURRENCY,
              unit_amount: pricePerUnit,
              product_data: {
                name: `${config.bookTitle} — ${editionLabel} & Launch Admission`,
                description: `Personally autographed ${editionLabel.toLowerCase()} copy with official admission to the ${config.title}. Collect your book in person at the event.`,
              },
            },
            quantity,
          },
        ],
        client_reference_id: order.id,
        metadata: {
          orderId: order.id,
          orderReference: order.order_reference,
          buyerName,
          buyerEmail,
          bookEdition,
          quantity: String(quantity),
          currency: BOOK_CURRENCY,
          expectedTotal: String(expectedTotal),
        },
        success_url: `${siteUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/order/cancelled`,
        custom_text: {
          submit: {
            message:
              `Your ${editionLabel.toLowerCase()} purchase confirms your admission to the Book Launch & Policy Dialogue. Collect your autographed copy at the venue registration desk.`,
          },
        },
      },
      {
        // Stable idempotency key tied to our database order ID
        idempotencyKey: `checkout_sess_${order.id}`,
      }
    );

    // 7. Attach session ID to order
    if (session.id) {
      await attachStripeSession(order.id, session.id);
    }

    return NextResponse.json({
      url: session.url,
      orderReference: order.order_reference,
    });
  } catch (error: unknown) {
    console.error("Checkout creation error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
