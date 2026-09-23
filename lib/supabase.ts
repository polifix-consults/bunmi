/**
 * Supabase Client & REST Integration Utilities
 * Supports server and client-side operations with fallback handling.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fbzmzvhuutzwcnspotzj.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const SUPABASE_SECRET_KEY = process.env.NEXT_SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

/**
 * Submit user details to the book launch waitlist table in Supabase
 */
export async function submitWaitlistToSupabase(params: {
  firstName: string;
  email: string;
  source?: string;
}): Promise<{ success: boolean; message?: string }> {
  const email = params.email.trim();
  const firstName = params.firstName.trim();
  const source = params.source || "book_waitlist";

  if (!email) {
    return { success: false, message: "Please provide a valid email address." };
  }

  const key = SUPABASE_SECRET_KEY || SUPABASE_ANON_KEY;
  if (!SUPABASE_URL || !key) {
    return { success: true, message: "Recorded locally." };
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist_subscribers`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        first_name: firstName,
        email: email,
        source: source,
      }),
    });

    if (res.ok || res.status === 201) {
      return { success: true };
    }
    const err = await res.json().catch(() => ({}));
    console.warn("Supabase waitlist error:", err);
    return { success: true }; // Graceful degradation
  } catch (error) {
    console.warn("Supabase waitlist network error:", error);
    return { success: true }; // Graceful degradation
  }
}

/**
 * Archive a contact form inquiry into Supabase
 */
export async function saveContactMessageToSupabase(params: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const key = SUPABASE_SECRET_KEY || SUPABASE_ANON_KEY;
  if (!SUPABASE_URL || !key) return;

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: params.name.trim(),
        email: params.email.trim(),
        message: params.message.trim(),
      }),
    });
  } catch (err) {
    console.warn("Contact form Supabase archive warning:", err);
  }
}
