import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, fullName, firstName, lastName } = await req.json();
    const trimmedEmail = (email || "").trim();

    if (!trimmedEmail) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    let fName = (firstName || "").trim();
    let lName = (lastName || "").trim();
    if (fullName && !fName && !lName) {
      const parts = fullName.trim().split(" ");
      fName = parts[0] || "";
      lName = parts.slice(1).join(" ") || "";
    }

    const audienceId =
      process.env.MAILCHIMP_AUDIENCE_ID ||
      process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID ||
      "f1970002ce";
    const apiKey =
      process.env.MAILCHIMP_API_KEY ||
      process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY ||
      "";

    if (!apiKey) {
      // Graceful local acceptance if no API key is configured
      return NextResponse.json({
        success: true,
        message: "Thank you for subscribing! Please check your inbox.",
      });
    }

    const dc = apiKey.includes("-") ? apiKey.split("-")[1] : "us10";
    const endpoint = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`any:${apiKey}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: trimmedEmail,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
        },
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      return NextResponse.json({
        success: true,
        message: "Thank you for subscribing to the Sidewalk Parliament Newsletter!",
      });
    }

    const title = String(data.title || "");
    const detail = String(data.detail || "");

    if (
      title.toLowerCase().includes("member exists") ||
      detail.toLowerCase().includes("already a list member")
    ) {
      return NextResponse.json({
        success: true,
        message: "You are already subscribed to the Sidewalk Parliament Newsletter!",
      });
    }

    return NextResponse.json({
      success: false,
      message:
        detail ||
        "Could not complete subscription. Please verify your email and try again.",
    });
  } catch (err) {
    console.error("Newsletter API route error:", err);
    return NextResponse.json(
      { success: false, message: "Subscription failed. Please try again later." },
      { status: 500 }
    );
  }
}
