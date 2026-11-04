import { Resend } from "resend";
import { getEventConfig } from "./config/event";
import { OrderRecord } from "./orders";
import { getBookEditionLabel } from "./book";

/**
 * Escape raw strings to prevent HTML injection in emails
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function formatCurrency(
  amountInCents: number,
  currency: string,
): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountInCents / 100);
}

/**
 * Generate responsive HTML email for order confirmation & launch admission
 */
export function renderOrderConfirmationHtml(order: OrderRecord): string {
  const config = getEventConfig();
  const safeName = escapeHtml(order.buyer_name || "Valued Guest");
  const safeRef = escapeHtml(order.order_reference);
  const safeBookTitle = escapeHtml(config.bookTitle);
  const safeBookSubtitle = escapeHtml(config.bookSubtitle);
  const safeEdition = escapeHtml(getBookEditionLabel(order.book_edition));
  const safeEventTitle = escapeHtml(config.title);
  const safeDate = escapeHtml(config.dateText);
  const safeVenue = escapeHtml(config.venueText);
  const safeSupport = escapeHtml(config.supportEmail);
  const formattedTotal = formatCurrency(order.paid_amount, order.currency);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Book Order & Launch Admission Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #334155;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F8FAFC; width: 100%; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #FFFFFF; padding: 32px 32px 24px; border-bottom: 1px solid #E2E8F0; text-align: left;">
              <p style="display: inline-block; margin: 0 0 12px; padding: 5px 10px; border-radius: 4px; background-color: #EBF2F9; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.18em; color: #0A2540;">Official Confirmation</p>
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #0A2540; letter-spacing: -0.02em;">Olubunmi Ayantunji</h1>
              <p style="margin: 4px 0 0; font-size: 13px; color: #64748B;">Public Policy Analyst, Author &amp; Legislative Counsel</p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 700; color: #0F172A;">Thank you, ${safeName}!</h2>
              <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #475569;">
               This pre-order confirms your attendance at the Book Launch and Policy Dialogue, taking place from 10:00 AM to 12:00 PM at Routunda of the Innovation Saskatchewan 140–10 Research Drive, Regina,. 
Your copy of the book will be presented to you at the event, personally autographed by the author.
Thank you for your support. I look forward to welcoming you for an engaging conversation on policy, innovation, and governance.
              </p>

              <!-- Order Summary Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #0A2540;">Proof of Purchase &amp; Ticket</p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #64748B;">Order Reference:</td>
                        <td align="right" style="padding: 6px 0; font-size: 15px; font-weight: 700; font-family: monospace; color: #0A2540;">${safeRef}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #64748B;">Publication:</td>
                        <td align="right" style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0F172A;">${safeBookTitle}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #64748B;">Edition:</td>
                        <td align="right" style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0F172A;">${safeEdition}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #64748B;">Quantity:</td>
                        <td align="right" style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0F172A;">${order.quantity} Autographed ${safeEdition} ${order.quantity === 1 ? "Copy" : "Copies"}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #64748B;">Admission Status:</td>
                        <td align="right" style="padding: 6px 0; font-size: 14px; font-weight: 700; color: #0A2540;">Confirmed (Included)</td>
                      </tr>
                      <tr style="border-top: 1px solid #E2E8F0;">
                        <td style="padding: 12px 0 0; font-size: 15px; font-weight: 700; color: #0F172A;">Total Paid:</td>
                        <td align="right" style="padding: 12px 0 0; font-size: 17px; font-weight: 800; color: #0A2540;">${formattedTotal}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Pickup & Event Instructions -->
              <h3 style="margin: 0 0 12px; font-size: 16px; font-weight: 700; color: #0A2540;">Book Pickup &amp; Event Details</h3>
              <div style="background-color: #EBF2F9; border-left: 3px solid #0A2540; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 14px; color: #0F172A;"><strong>Event:</strong> ${safeEventTitle}</p>
                <p style="margin: 0 0 8px; font-size: 14px; color: #334155;"><strong>Date &amp; Time:</strong> ${safeDate}</p>
                <p style="margin: 0 0 12px; font-size: 14px; color: #334155;"><strong>Venue:</strong> ${safeVenue}</p>
                <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #475569;">
                  <em>There is no postal shipping.</em> Your personally autographed ${safeEdition.toLowerCase()} edition will be presented to you upon check-in at the venue. Please keep this email and your reference code (<strong>${safeRef}</strong>) accessible on your mobile device.
                </p>
              </div>

              <!-- Support & Assistance -->
              <p style="margin: 0 0 8px; font-size: 13px; color: #64748B; line-height: 1.5;">
                Need assistance, dietary accommodation, or have questions regarding your order? Contact our coordination desk at <a href="mailto:${safeSupport}" style="color: #0A2540; text-decoration: underline;">${safeSupport}</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F8FAFC; padding: 20px 32px; border-top: 1px solid #E2E8F0; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #64748B;">
                &copy; ${new Date().getFullYear()} Olubunmi Ayantunji. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Generate plain-text email fallback
 */
export function renderOrderConfirmationText(order: OrderRecord): string {
  const config = getEventConfig();
  const formattedTotal = formatCurrency(order.paid_amount, order.currency);
  const edition = getBookEditionLabel(order.book_edition);

  return `OLUBUNMI AYANTUNJI — OFFICIAL CONFIRMATION
Book Order & Launch Attendance

Order Reference: ${order.order_reference}
Buyer: ${order.buyer_name || "Valued Guest"}
Publication: ${config.bookTitle}: ${config.bookSubtitle}
Edition: ${edition}
Quantity: ${order.quantity} Autographed ${edition} ${order.quantity === 1 ? "Copy" : "Copies"}
Total Paid: ${formattedTotal}
Admission: Confirmed (Included with book purchase)

EVENT & PICKUP DETAILS:
Event: ${config.title}
Date & Time: ${config.dateText}
Venue: ${config.venueText}

INSTRUCTIONS:
There is no postal shipping. You will collect your personally autographed ${edition.toLowerCase()} edition at the Book Launch and Policy Dialogue. Please present this confirmation email or your Order Reference (${order.order_reference}) at the registration desk upon arrival.

Inquiries & Support: ${config.supportEmail}
`;
}

/**
 * Dispatch confirmation email via Resend
 */
export async function sendOrderConfirmationEmail(
  order: OrderRecord,
): Promise<{ success: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: "RESEND_API_KEY is not configured.",
    };
  }

  if (!order.buyer_email) {
    return {
      success: false,
      error: "No buyer email address present on order.",
    };
  }

  const resend = new Resend(apiKey);
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ||
    "Olubunmi Ayantunji <orders@olubunmiayantunji.com>";

  try {
    const res = await resend.emails.send({
      from: fromEmail,
      to: [order.buyer_email],
      subject: `Confirmed: Book Order & Launch Attendance [Ref: ${order.order_reference}]`,
      html: renderOrderConfirmationHtml(order),
      text: renderOrderConfirmationText(order),
    });

    if (res.error) {
      return {
        success: false,
        error: res.error.message || "Failed to send email via Resend.",
      };
    }

    return {
      success: true,
      id: res.data?.id,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      error: message,
    };
  }
}
