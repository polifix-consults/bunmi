import { SITE } from "@/lib/site";
import { saveContactMessageToSupabase } from "@/lib/supabase";

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
  botcheck?: string; // honeypot
};

export type ContactResponse = {
  success: boolean;
  message: string;
};

/**
 * Sends contact form submissions to Olubunmi Ayantunji's email and archives to Supabase.
 * Supports Web3Forms, Formspree, or FormSubmit fallback with zero configuration required.
 */
export async function submitContactForm(data: ContactFormData): Promise<ContactResponse> {
  // Silent drop for spambots triggering the honeypot
  if (data.botcheck && data.botcheck.trim().length > 0) {
    return { success: true, message: "Message sent successfully." };
  }

  // Asynchronously archive copy into Supabase
  saveContactMessageToSupabase({
    name: data.name,
    email: data.email,
    message: data.message,
  }).catch(() => {});

  const emailRecipient = SITE.email || "olubunmiayantunji@gmail.com";
  const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID?.trim();

  // 1. Web3Forms (if access key is provided in .env)
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
        return { success: true, message: "Message received successfully." };
      }
      return {
        success: false,
        message: resData.message || "Failed to send message. Please try again.",
      };
    } catch {
      return {
        success: false,
        message: "Network error occurred while submitting. Please try again or email directly.",
      };
    }
  }

  // 2. Formspree (if form ID is provided in .env)
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
        return { success: true, message: "Message received successfully." };
      }
      const resData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: resData.error || "Failed to send message. Please try again.",
      };
    } catch {
      return {
        success: false,
        message: "Network error occurred while submitting. Please try again or email directly.",
      };
    }
  }

  // 3. FormSubmit.co (Zero-config fallback directly to Olubunmi's email)
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${emailRecipient}`, {
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
    });

    const resData = await response.json().catch(() => ({}));
    if (response.ok || resData.success === "true" || resData.success === true) {
      return { success: true, message: "Message received successfully." };
    }
    return {
      success: false,
      message: resData.message || "Could not deliver message. Please contact via email directly.",
    };
  } catch {
    return {
      success: false,
      message: "Network error occurred. Please try again or email directly at " + emailRecipient,
    };
  }
}
