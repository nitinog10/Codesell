export type PaymentProvider = "stripe" | "razorpay" | "mock";

export function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL);
}

export function selectedPaymentProvider(): PaymentProvider {
  const configured = process.env.PAYMENT_PROVIDER?.toLowerCase();

  if (configured === "stripe" || configured === "razorpay") {
    return configured;
  }

  if (process.env.STRIPE_SECRET_KEY) {
    return "stripe";
  }

  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    return "razorpay";
  }

  return "mock";
}

export function canUseMockPayments() {
  return process.env.NODE_ENV !== "production";
}
