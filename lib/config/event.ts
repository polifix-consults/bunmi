/**
 * Central configuration for Book Launch and Policy Dialogue
 * Keeps event details, pricing, copy, and checkout kill switch unified across the site,
 * checkout sessions, and confirmation emails.
 */

export interface EventConfig {
  title: string;
  bookTitle: string;
  bookSubtitle: string;
  author: string;
  currency: string;
  priceInCents: number;
  priceFormatted: string;
  maxCopiesPerOrder: number;
  dateText: string;
  venueText: string;
  venueName: string;
  venueAddress: string;
  cityCountry: string;
  supportEmail: string;
  checkoutEnabled: boolean;
  refundPolicyText: string;
  deliveryPolicyText: string;
}

export function getEventConfig(): EventConfig {
  const currency = (process.env.BOOK_CURRENCY || "cad").toLowerCase();
  const priceInCents = parseInt(process.env.BOOK_PRICE_CENTS || "3999", 10);
  const maxCopies = parseInt(process.env.MAX_COPIES_PER_ORDER || "5", 10);

  // Formatter for display
  const priceFormatted = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(priceInCents / 100);

  const isCheckoutEnabled =
    process.env.CHECKOUT_ENABLED === "true" &&
    Boolean(process.env.STRIPE_SECRET_KEY);

  const venueName =
    process.env.EVENT_VENUE_NAME ||
    "CB 139, College Avenue Campus, University of Regina";
  const venueAddress =
    process.env.EVENT_VENUE_ADDRESS ||
    "📍 2155 College Ave, Regina, SK";
  const venueText =
    process.env.EVENT_VENUE_TEXT ||
    `${venueName}, ${venueAddress.replace("📍 ", "")}`;

  return {
    title: process.env.EVENT_TITLE || "Book Launch and Policy Dialogue",
    bookTitle: "Copy and Paste Governance",
    bookSubtitle: "Why Borrowed Policies Fail African Realities",
    author: "Olubunmi Ayantunji",
    currency,
    priceInCents,
    priceFormatted,
    maxCopiesPerOrder: isNaN(maxCopies) || maxCopies < 1 ? 5 : maxCopies,
    dateText:
      process.env.EVENT_DATE_TEXT ||
      "To be announced (all registered attendees will receive email notification)",
    venueText,
    venueName,
    venueAddress,
    cityCountry: process.env.EVENT_CITY_COUNTRY || "Canada",
    supportEmail: process.env.CONTACT_SUPPORT_EMAIL || "info@olubunmiayantunji.com",
    checkoutEnabled: isCheckoutEnabled,
    deliveryPolicyText: "Delivery is free on orders shipped to Canada and the United States.",
    refundPolicyText:
      "Orders include personal book reservation and launch admission. Delivery is free on orders shipped to Canada and the United States. For inquiries or refund requests, please contact our team at " +
      (process.env.CONTACT_SUPPORT_EMAIL || "info@olubunmiayantunji.com") +
      ".",
  };
}
