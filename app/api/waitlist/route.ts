import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const rawEmail = typeof body.email === "string" ? body.email.trim() : "";
    const rawName = typeof body.firstName === "string" ? body.firstName.trim() : "";
    const rawSource = typeof body.source === "string" ? body.source.trim() : "";

    if (!rawEmail || rawEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)) {
      return NextResponse.json(
        { success: false, message: "A valid email address is required." },
        { status: 400 }
      );
    }

    const firstName = rawName.slice(0, 100);
    const source = rawSource ? rawSource.slice(0, 80) : "book_waitlist";

    const supabaseUrl =
      process.env.SUPABASE_URL ||
      "https://fbzmzvhuutzwcnspotzj.supabase.co";
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_SECRET_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      "";

    if (supabaseUrl && supabaseKey) {
      const res = await fetch(`${supabaseUrl}/rest/v1/waitlist_subscribers`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          first_name: firstName,
          email: rawEmail,
          source: source,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text().catch(() => "");
        console.warn("Supabase waitlist error:", errorText);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist API route error:", error);
    return NextResponse.json({ success: true }); // Graceful degradation
  }
}
