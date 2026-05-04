import { afterAll, beforeEach, describe, expect, it } from "vitest";
import {
  canUseMockPayments,
  hasDatabaseUrl,
  selectedPaymentProvider
} from "../env";

const ORIGINAL_ENV = { ...process.env };

const resetEnv = () => {
  for (const key of Object.keys(process.env)) {
    if (!(key in ORIGINAL_ENV)) {
      delete process.env[key];
    }
  }

  Object.assign(process.env, ORIGINAL_ENV);
};

describe("env", () => {
  beforeEach(resetEnv);
  afterAll(resetEnv);

  it("reports when a database URL is configured", () => {
    process.env.DATABASE_URL = "postgres://localhost/db";
    expect(hasDatabaseUrl()).toBe(true);
  });

  it("defaults to mock payments without provider credentials", () => {
    delete process.env.STRIPE_SECRET_KEY;
    delete process.env.RAZORPAY_KEY_ID;
    delete process.env.RAZORPAY_KEY_SECRET;
    delete process.env.PAYMENT_PROVIDER;

    expect(selectedPaymentProvider()).toBe("mock");
  });

  it("prefers explicit payment provider configuration", () => {
    process.env.PAYMENT_PROVIDER = "Stripe";
    expect(selectedPaymentProvider()).toBe("stripe");
  });

  it("infers payment provider from Stripe credentials", () => {
    process.env.STRIPE_SECRET_KEY = "sk_test_123";
    expect(selectedPaymentProvider()).toBe("stripe");
  });

  it("infers payment provider from Razorpay credentials", () => {
    delete process.env.STRIPE_SECRET_KEY;
    process.env.RAZORPAY_KEY_ID = "rzp_key";
    process.env.RAZORPAY_KEY_SECRET = "rzp_secret";
    expect(selectedPaymentProvider()).toBe("razorpay");
  });

  it("disallows mock payments in production", () => {
    process.env.NODE_ENV = "production";
    expect(canUseMockPayments()).toBe(false);
  });
});
