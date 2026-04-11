import crypto from "crypto";

export async function createRazorpayOrder({
  orderId,
  amount,
  currency
}: {
  orderId: string;
  amount: number;
  currency: string;
}) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("Razorpay credentials are not configured.");
  }

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString(
        "base64"
      )}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount,
      currency,
      receipt: orderId,
      notes: { orderId }
    })
  });

  if (!response.ok) {
    throw new Error(`Razorpay order creation failed: ${response.status}`);
  }

  return (await response.json()) as { id: string; amount: number; currency: string };
}

export function verifyRazorpayWebhookSignature(
  rawBody: string,
  signature: string | null
) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!secret) {
    throw new Error("RAZORPAY_WEBHOOK_SECRET is not configured.");
  }

  if (!signature) {
    throw new Error("Razorpay signature header is missing.");
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
