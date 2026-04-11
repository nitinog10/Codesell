import Stripe from "stripe";
import { absoluteUrl } from "@/lib/utils";
import type { CatalogProduct } from "@/lib/sample-data";

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  return secretKey ? new Stripe(secretKey) : null;
}

export async function createStripeCheckoutSession({
  orderId,
  products,
  buyerEmail
}: {
  orderId: string;
  products: CatalogProduct[];
  buyerEmail?: string | null;
}) {
  const stripe = getStripe();

  if (!stripe) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  return stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: buyerEmail ?? undefined,
    client_reference_id: orderId,
    metadata: { orderId },
    success_url: absoluteUrl(`/checkout/success?orderId=${orderId}`),
    cancel_url: absoluteUrl(`/checkout/failure?orderId=${orderId}`),
    line_items: products.map((product) => ({
      quantity: 1,
      price_data: {
        currency: product.currency.toLowerCase(),
        unit_amount: product.price,
        product_data: {
          name: product.name,
          description: product.description,
          images: product.imageUrl ? [product.imageUrl] : undefined,
          metadata: {
            productId: product.id,
            repo: `${product.repoOwner}/${product.repoName}`
          }
        }
      }
    }))
  });
}

export function constructStripeEvent(body: string, signature: string | null) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    throw new Error("Stripe webhook configuration is missing.");
  }

  if (!signature) {
    throw new Error("Stripe signature header is missing.");
  }

  return stripe.webhooks.constructEvent(body, signature, webhookSecret);
}
