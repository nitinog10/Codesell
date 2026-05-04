import test from 'node:test';
import assert from 'node:assert/strict';
import { createOrderSchema, productInputSchema } from '../src/lib/validators';

test('createOrderSchema accepts valid product ids', () => {
  const parsed = createOrderSchema.safeParse({ productIds: ['a', 'b'] });
  assert.equal(parsed.success, true);
});

test('createOrderSchema rejects empty arrays and too many items', () => {
  assert.equal(createOrderSchema.safeParse({ productIds: [] }).success, false);
  assert.equal(
    createOrderSchema.safeParse({ productIds: Array.from({ length: 11 }, (_, i) => `${i}`) }).success,
    false
  );
});

test('productInputSchema applies defaults and coercions', () => {
  const parsed = productInputSchema.parse({
    name: 'Starter Kit',
    slug: 'starter-kit',
    description: 'A long enough product description.',
    price: '1200',
    repoOwner: 'codesell',
    repoName: 'starter',
    repoUrl: 'https://github.com/codesell/starter',
    imageUrl: '',
    screenshots: [],
    tags: ['Next.js'],
    techStack: ['TypeScript']
  });

  assert.equal(parsed.price, 1200);
  assert.equal(parsed.currency, 'INR');
  assert.equal(parsed.isActive, true);
  assert.equal(parsed.featured, false);
});
