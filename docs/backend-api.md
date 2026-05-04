# CodeSell Backend API Documentation

This document describes the server APIs implemented in the Next.js app router.

## Base URL

- Local: `http://localhost:3000`
- Production: `https://your-domain.com`

---

## Auth APIs

### `GET/POST /api/auth/[...nextauth]`
Handled by Auth.js (GitHub OAuth).

**Purpose**
- Sign in with GitHub
- Session retrieval and sign out

**Notes**
- Uses provider scopes: `read:user`, `user:email`
- Session required for protected checkout/admin APIs

---

## Health

### `GET /api/health`
Returns app/database health.

**Success response**
```json
{ "status": "ok", "checks": { "app": "ok", "database": "ok" } }
```

**No database configured**
```json
{ "status": "degraded", "checks": { "app": "ok", "database": "not_configured" } }
```

**Database failure**
- HTTP `503`
```json
{ "status": "error", "checks": { "app": "ok", "database": "error" } }
```

---

## Products (Admin)

### `GET /api/admin/products`
List products (admin only).

### `POST /api/admin/products`
Create product (admin only).

### `GET /api/admin/products/[id]`
Fetch one product (admin only).

### `PATCH /api/admin/products/[id]`
Update one product (admin only).

### `DELETE /api/admin/products/[id]`
Delete one product (admin only).

---

## Orders

### `POST /api/orders/create`
Create a new order and payment session/order.

**Auth**
- Required (GitHub session)

**Request body**
```json
{
  "productIds": ["prod_id_1", "prod_id_2"]
}
```

**Validation rules**
- All products must exist and be active
- All products must share one currency
- User cannot repurchase a previously paid product (returns `409`)

**Response (Stripe)**
```json
{ "provider": "stripe", "url": "https://checkout.stripe.com/..." }
```

**Response (Razorpay)**
```json
{
  "provider": "razorpay",
  "keyId": "rzp_test_...",
  "orderId": "order_...",
  "appOrderId": "...",
  "amount": 12900,
  "currency": "INR"
}
```

**Response (Mock non-production)**
```json
{ "provider": "mock", "url": "http://localhost:3000/checkout/success?..." }
```

### `POST /api/orders/[id]/retry-collab`
Retries collaborator invite delivery for failed order fulfillment.

---

## Webhooks

### `POST /api/webhooks/stripe`
Processes Stripe events:
- `checkout.session.completed`
- `checkout.session.async_payment_failed`
- `charge.refunded`

Features:
- Signature verification
- Idempotency via `WebhookEvent` table
- Marks paid/failed/refunded + fulfillment

### `POST /api/webhooks/razorpay`
Processes Razorpay events:
- `payment.captured`
- `order.paid`

Features:
- HMAC signature verification
- Idempotency via `WebhookEvent` table

---

## Error Codes Quick Reference

- `400` Invalid payload / signature
- `401` Not authenticated
- `403` Authenticated but unauthorized (admin routes)
- `404` Product/order not found
- `409` Duplicate purchase attempt
- `500` Misconfiguration / processing failure
- `503` Database unavailable
