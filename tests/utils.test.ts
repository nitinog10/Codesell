import test from 'node:test';
import assert from 'node:assert/strict';
import { absoluteUrl, formatMoney, splitCsv, toSlug } from '../src/lib/utils';

test('toSlug normalizes text', () => {
  assert.equal(toSlug('  Hello, Code Sell!  '), 'hello-code-sell');
});

test('splitCsv parses and trims values', () => {
  assert.deepEqual(splitCsv('a, b, ,c'), ['a', 'b', 'c']);
});

test('formatMoney formats minor units', () => {
  assert.equal(formatMoney(12900, 'INR').includes('129'), true);
});

test('absoluteUrl uses NEXT_PUBLIC_APP_URL if set', () => {
  process.env.NEXT_PUBLIC_APP_URL = 'https://codesell.dev';
  assert.equal(absoluteUrl('/checkout'), 'https://codesell.dev/checkout');
  delete process.env.NEXT_PUBLIC_APP_URL;
});
