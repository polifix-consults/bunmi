import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

export async function POST(req: Request) {
  try {
    let data: Record<string, unknown> = {};
    try {
      data = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    // Silent drop for spambots triggering the honeypot
    const botcheck = typeof data.botcheck === "string" ? data.botcheck.trim() : "";
    if (botcheck.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Message sent successfully.",
      });
    }

    const name = typeof data.name === "string" ? data.name.trim() : "";
    const email = typeof data.email === "string" ? data.email.trim() : "";
    const message = typeof data.message === "string" ? data.message.trim() : "";

    if (!name || name.length > 120) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid name (up to 120 characters)." },
        { status: 400 }
      );
    }

    if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || message.length > 5000) {
      return NextResponse.json(
        { success: false, message: "Message is required and must not exceed 5000 characters." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.SUPABASE_URL || "https://fbzmzvhuutzwcnspotzj.supabase.co";
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_SECRET_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      "";

    // Asynchronously archive copy into Supabase if configured
    if (supabaseUrl && supabaseKey) {
      fetch(`${supabaseUrl}/rest/v1/contact_messages`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      }).catch((err) => {
        console.warn("Contact form Supabase archive warning:", err);
      });
    }

    const emailRecipient =
      process.env.CONTACT_INBOX_EMAIL?.trim() ||
      SITE.email ||
      "olubunmiayantunji@gmail.com";
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
    const formspreeId = process.env.FORMSPREE_ID?.trim();

    // 1. Web3Forms
    if (web3formsKey) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            name: data.name,
            email: data.email,
            message: data.message,
            subject: `New Inquiry from ${data.name} via Olubunmi Ayantunji Portfolio`,
            from_name: data.name,
            reply_to: data.email,
          }),
        });

        const resData = await response.json();
        if (response.ok && resData.success) {
          return NextResponse.json({
            success: true,
            message: "Message received successfully.",
          });
        }
        return NextResponse.json({
          success: false,
          message: resData.message || "Failed to send message. Please try again.",
        });
      } catch {
        return NextResponse.json({
          success: false,
          message:
            "Network error occurred while submitting. Please try again or email directly.",
        });
      }
    }

    // 2. Formspree
    if (formspreeId) {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            message: data.message,
            _replyto: data.email,
            _subject: `New Contact Submission from ${data.name}`,
          }),
        });

        if (response.ok) {
          return NextResponse.json({
            success: true,
            message: "Message received successfully.",
          });
        }
        const resData = await response.json().catch(() => ({}));
        return NextResponse.json({
          success: false,
          message: resData.error || "Failed to send message. Please try again.",
        });
      } catch {
        return NextResponse.json({
          success: false,
          message:
            "Network error occurred while submitting. Please try again or email directly.",
        });
      }
    }

    // 3. FormSubmit.co fallback
    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${emailRecipient}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            message: data.message,
            _subject: `New Inquiry from ${data.name} — ${SITE.name} Website`,
            _replyto: data.email,
            _template: "table",
            _captcha: "false",
          }),
        }
      );

      const resData = await response.json().catch(() => ({}));
      if (
        response.ok ||
        resData.success === "true" ||
        resData.success === true
      ) {
        return NextResponse.json({
          success: true,
          message: "Message received successfully.",
        });
      }
      return NextResponse.json({
        success: false,
        message:
          resData.message ||
          "Could not deliver message. Please contact via email directly.",
      });
    } catch {
      return NextResponse.json({
        success: false,
        message:
          "Network error occurred. Please try again or email directly at " +
          emailRecipient,
      });
    }
  } catch (error) {
    console.error("Contact API route error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
