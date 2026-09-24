import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { firstName, email, source } = await req.json();
    const trimmedEmail = (email || "").trim();

    if (!trimmedEmail) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    const supabaseUrl =
      process.env.SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      "https://fbzmzvhuutzwcnspotzj.supabase.co";
    const supabaseKey =
      process.env.SUPABASE_SECRET_KEY ||
      process.env.NEXT_SUPABASE_SECRET_KEY ||
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
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
          first_name: (firstName || "").trim(),
          email: trimmedEmail,
          source: source || "book_waitlist",
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
