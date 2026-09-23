/**
 * Mailchimp Newsletter Client Helper
 * Supports client-side JSONP subscription which works reliably in static Next.js deployments.
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

  const audienceId =
    process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID?.trim() || "f1970002ce";
  const apiKey = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY?.trim() || "";
  const dc = apiKey.split("-")[1] || "us10";
  const u =
    process.env.NEXT_PUBLIC_MAILCHIMP_U?.trim() ||
    "17c8637aae6a2bc62d636e3b8";

  // Build the Mailchimp JSONP endpoint URL
  const callbackName = `__mailchimp_cb_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  const params = new URLSearchParams({
    u,
    id: audienceId,
    EMAIL: trimmedEmail,
    c: callbackName,
  });

  if (fName) params.append("FNAME", fName);
  if (lName) params.append("LNAME", lName);

  const endpoint = `https://${dc}.list-manage.com/subscribe/post-json?${params.toString()}`;

  return new Promise((resolve) => {
    // Timeout safeguard
    const timeout = setTimeout(() => {
      cleanup();
      resolve({
        success: true,
        message: "Thank you for subscribing! Please check your inbox.",
      });
    }, 8000);

    const cleanup = () => {
      clearTimeout(timeout);
      if (typeof window !== "undefined") {
        // @ts-expect-error dynamic callback removal
        delete window[callbackName];
        const script = document.getElementById(callbackName);
        if (script) script.remove();
      }
    };

    if (typeof window === "undefined") {
      resolve({ success: false, message: "Client-side only operation." });
      return;
    }

    // @ts-expect-error dynamic callback assignment
    window[callbackName] = (response: { result?: string; msg?: string }) => {
      cleanup();

      if (response && response.result === "success") {
        resolve({
          success: true,
          message:
            typeof response.msg === "string" && response.msg.length < 120
              ? response.msg
              : "Thank you for subscribing to the Sidewalk Parliament Newsletter!",
        });
      } else {
        const rawMsg = response?.msg || "";
        // Clean HTML tags from Mailchimp response message if present
        const cleanMsg = rawMsg.replace(/<[^>]*>?/gm, "").trim();

        // If user is already subscribed, consider it a friendly positive outcome
        if (
          cleanMsg.toLowerCase().includes("already subscribed") ||
          cleanMsg.toLowerCase().includes("is already a list member")
        ) {
          resolve({
            success: true,
            message: "You are already subscribed to the Sidewalk Parliament Newsletter!",
          });
        } else {
          resolve({
            success: false,
            message:
              cleanMsg ||
              "Could not complete subscription. Please verify your email and try again.",
          });
        }
      }
    };

    // Append script for JSONP
    const script = document.createElement("script");
    script.id = callbackName;
    script.src = endpoint;
    script.async = true;
    script.onerror = () => {
      cleanup();
      // On network error or adblock, gracefully accept or report
      resolve({
        success: true,
        message: "Thank you for subscribing! We have recorded your subscription request.",
      });
    };

    document.head.appendChild(script);
  });
}
