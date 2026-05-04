# CodeSell Backend Testing Guide

## 1) Prerequisites

- `.env.local` configured (database + auth + payment)
- Database schema applied
- Seeded products

```bash
npm run db:setup
npm run dev
```

---

## 2) Static checks

```bash
npm run lint
npm run build
npx prisma validate
```

---

## 3) Health check

```bash
curl -s http://localhost:3000/api/health | jq
```

Expected:
- `status: "ok"` when DB is reachable
- `status: "degraded"` if DB URL missing

---

## 4) Auth/session check

1. Open `http://localhost:3000/auth/signin`
2. Sign in with GitHub
3. In browser devtools, verify authenticated requests to protected routes succeed (`/dashboard`, `/admin` for admin users)

---

## 5) Checkout/order flow

### A. Create order (via UI)
1. Go to `/products`
2. Purchase one product
3. Verify redirect to provider checkout/mock URL

### B. Duplicate purchase guard
1. Complete payment for product A
2. Attempt to buy product A again
3. Expect HTTP `409` and a duplicate purchase message from `/api/orders/create`

---

## 6) Stripe webhook test (recommended)

Start local webhook forwarder:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Use returned signing secret for `STRIPE_WEBHOOK_SECRET`, then trigger:

```bash
stripe trigger checkout.session.completed
```

Verify in DB:
- `Order.status = PAID`
- `Order.collabStatus = SENT | FAILED`
- `WebhookEvent.processed = true`

---

## 7) Razorpay webhook test

- Configure webhook URL: `http://localhost:3000/api/webhooks/razorpay`
- Send `payment.captured` / `order.paid` test events
- Verify order state transitions and webhook event persistence

---

## 8) Fulfillment + email checks

After successful payment webhook:
- Buyer gets purchase confirmation + collaborator invite notice
- Admin gets alert on delivery failure
- Order detail in dashboard reflects collab status

If email key is missing in development, confirm logs show `[email skipped]` messages.

---

## 9) Suggested regression checklist

- [ ] Health endpoint returns expected states
- [ ] Product CRUD (admin) works
- [ ] Order creation validates payload and currency
- [ ] Duplicate purchase returns `409`
- [ ] Stripe webhook updates paid/refunded states correctly
- [ ] Razorpay webhook updates paid state correctly
- [ ] Collaborator invite retry endpoint works
- [ ] Dashboard order status matches DB values
