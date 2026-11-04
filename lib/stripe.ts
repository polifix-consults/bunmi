import Stripe from "stripe";

let stripeClient: Stripe | null = null;

/**
 * Lazy singleton Stripe client.
 * Prevents build-time crashes when STRIPE_SECRET_KEY is not yet injected into the environment.
 */
export function getStripe(): Stripe {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured on the server.");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(stripeSecretKey, {
      typescript: true,
      appInfo: {
        name: "Olubunmi Ayantunji Platform",
        version: "1.0.0",
      },
    });
  }

  return stripeClient;
}
