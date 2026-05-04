import test from 'node:test';
import assert from 'node:assert/strict';
import { canUseMockPayments, hasDatabaseUrl, selectedPaymentProvider } from '../src/lib/env';

const ORIGINAL_ENV = { ...process.env };

test('hasDatabaseUrl reflects DATABASE_URL presence', () => {
  process.env.DATABASE_URL = 'postgres://example';
  assert.equal(hasDatabaseUrl(), true);

  delete process.env.DATABASE_URL;
  assert.equal(hasDatabaseUrl(), false);
});

test('selectedPaymentProvider respects PAYMENT_PROVIDER first', () => {
  process.env.PAYMENT_PROVIDER = 'stripe';
  assert.equal(selectedPaymentProvider(), 'stripe');

  process.env.PAYMENT_PROVIDER = 'razorpay';
  assert.equal(selectedPaymentProvider(), 'razorpay');
});

test('selectedPaymentProvider falls back based on configured keys', () => {
  delete process.env.PAYMENT_PROVIDER;
  process.env.STRIPE_SECRET_KEY = 'sk_test_123';
  delete process.env.RAZORPAY_KEY_ID;
  delete process.env.RAZORPAY_KEY_SECRET;
  assert.equal(selectedPaymentProvider(), 'stripe');

  delete process.env.STRIPE_SECRET_KEY;
  process.env.RAZORPAY_KEY_ID = 'rzp_test';
  process.env.RAZORPAY_KEY_SECRET = 'secret';
  assert.equal(selectedPaymentProvider(), 'razorpay');

  delete process.env.RAZORPAY_KEY_ID;
  delete process.env.RAZORPAY_KEY_SECRET;
  assert.equal(selectedPaymentProvider(), 'mock');
});

test('canUseMockPayments is disabled in production only', () => {
  process.env.NODE_ENV = 'production';
  assert.equal(canUseMockPayments(), false);

  process.env.NODE_ENV = 'development';
  assert.equal(canUseMockPayments(), true);
});

test.after(() => {
  process.env = ORIGINAL_ENV;
});
