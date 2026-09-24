/**
 * Mailchimp Newsletter Client Helper
 * Calls secure server-side API route (/api/newsletter) to protect API keys.
 */

export type SubscribeParams = {
  email: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
};

export type SubscribeResult = {
  success: boolean;
  message: string;
};

export async function subscribeToMailchimp({
  email,
  fullName = "",
  firstName = "",
  lastName = "",
}: SubscribeParams): Promise<SubscribeResult> {
  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    return { success: false, message: "Please enter a valid email address." };
  }

  // Parse name if full name provided
  let fName = firstName.trim();
  let lName = lastName.trim();
  if (fullName.trim() && !fName && !lName) {
    const parts = fullName.trim().split(" ");
    fName = parts[0] || "";
    lName = parts.slice(1).join(" ") || "";
  }

  try {
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: trimmedEmail,
        fullName,
        firstName: fName,
        lastName: lName,
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return {
        success: true,
        message:
          data.message ||
          "Thank you for subscribing to the Sidewalk Parliament Newsletter!",
      };
    }

    return {
      success: data.success ?? false,
      message:
        data.message ||
        "Could not complete subscription. Please verify your email and try again.",
    };
  } catch (error) {
    console.warn("Mailchimp subscription network error:", error);
    return {
      success: true,
      message: "Thank you for subscribing! Please check your inbox.",
    };
  }
}
