# Test Coverage Analysis (CodeSell)

## Current state

The repository previously had no executable automated tests. Coverage for backend behavior was mostly manual (documented in `docs/backend-testing.md`) and therefore vulnerable to regressions.

## What was added

- `tests/env.test.ts`
  - Covers payment-provider selection precedence
  - Covers database URL presence detection
  - Covers mock payment availability by environment
- `tests/validators.test.ts`
  - Covers order payload validation boundaries
  - Covers product input defaulting/coercion behavior
- `tests/utils.test.ts`
  - Covers slug conversion, CSV parsing, money formatting, absolute URL generation

## Coverage run summary

Command:

```bash
npm run test:coverage
```

Result snapshot:

- `src/lib/env.ts`: 92.59% line coverage
- `src/lib/utils.ts`: 94.74% line coverage
- `src/lib/validators.ts`: 100% line coverage
- Overall measured files: 97.97% line coverage

## Remaining high-priority gaps

These areas still need integration-level tests (not covered by current unit tests):

1. API routes with DB side effects
   - `/api/orders/create`
   - `/api/webhooks/stripe`
   - `/api/webhooks/razorpay`
   - `/api/orders/[id]/retry-collab`

2. Fulfillment workflow
   - `markOrderPaidAndFulfill`
   - collaborator invite success/failure handling
   - email dispatch paths

3. Auth-protected admin routes
   - Role checks for `/api/admin/products*`

4. Webhook idempotency behavior
   - Duplicate event replays and safe no-op handling

## Recommended next phase

- Add integration tests with a test database and mocked external providers:
  - Stripe event construction/verification mocks
  - Razorpay signature verification mocks
  - GitHub collaborator API mocks
  - Resend email client mocks
- Add route-level test harness for App Router handlers.
