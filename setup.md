# CodeSell Setup Guide

This guide takes the app from a fresh clone to a working local MVP, then lists
the production settings needed for real GitHub repository delivery.

## 1. Requirements

- Node.js 22 or newer
- npm 11 or newer
- PostgreSQL database, for example Neon
- GitHub OAuth app for buyer login
- GitHub seller Personal Access Token for repository collaborator invites
- Stripe or Razorpay account
- Resend account for transactional email

## 2. Install Dependencies

```bash
npm install
```

This also runs `prisma generate` through the `postinstall` script.

## 3. Create Local Environment File

Copy the example file:

```bash
copy .env.example .env.local
```

Generate local secrets:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Use the base64url value for `AUTH_SECRET` and `NEXTAUTH_SECRET`. Use the hex
value for `ENCRYPTION_KEY`.

Minimum local `.env.local` values:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=replace-with-generated-secret
NEXTAUTH_SECRET=replace-with-generated-secret
DATABASE_URL=postgresql://user:pass@host/dbname?sslmode=require
ENCRYPTION_KEY=replace-with-64-character-hex-key
```

The public catalog can render with sample products before the database is
configured, but order creation, admin CRUD, dashboards, webhooks, and delivery
require `DATABASE_URL`.

## 4. Configure GitHub OAuth

Create a GitHub OAuth app:

- Homepage URL: `http://localhost:3000`
- Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

Add the values:

```env
GITHUB_CLIENT_ID=replace-with-github-oauth-client-id
GITHUB_CLIENT_SECRET=replace-with-github-oauth-client-secret
```

The app requests `read:user` and `user:email` scopes.

## 5. Configure Seller Repository Delivery

Create a GitHub seller Personal Access Token that can add collaborators to the
private product repositories.

Add the values:

```env
GITHUB_SELLER_PAT=replace-with-seller-pat
GITHUB_SELLER_USERNAME=replace-with-seller-github-username
```

The app calls GitHub with `permission: "pull"` so buyers only receive read-only
access.

## 6. Set Up Database

Push the schema:

```bash
npm run db:push
```

Seed sample products:

```bash
npm run db:seed
```

For migration-based development, use:

```bash
npm run db:migrate
```

Validate the schema:

```bash
npx prisma validate
```

If Prisma validation runs before `.env.local` has `DATABASE_URL`, it will fail
because the schema requires that environment variable.

## 7. Bootstrap Admin Access

1. Start the app.
2. Login once with GitHub at `/auth/signin`.
3. Update your user role in the database from `BUYER` to `ADMIN`.

Example SQL:

```sql
UPDATE "User"
SET role = 'ADMIN'
WHERE email = 'you@example.com';
```

After this, `/admin`, `/admin/products`, and `/admin/orders` are available.

## 8. Configure Payments

Choose one provider with `PAYMENT_PROVIDER`.

Stripe:

```env
PAYMENT_PROVIDER=stripe
STRIPE_SECRET_KEY=sk_test_replace
STRIPE_PUBLISHABLE_KEY=pk_test_replace
STRIPE_WEBHOOK_SECRET=whsec_replace
```

Webhook endpoint:

```text
http://localhost:3000/api/webhooks/stripe
```

Stripe events handled:

- `checkout.session.completed`
- `checkout.session.async_payment_failed`
- `charge.refunded`

Razorpay:

```env
PAYMENT_PROVIDER=razorpay
RAZORPAY_KEY_ID=rzp_test_replace
RAZORPAY_KEY_SECRET=replace-with-razorpay-secret
RAZORPAY_WEBHOOK_SECRET=replace-with-razorpay-webhook-secret
```

Webhook endpoint:

```text
http://localhost:3000/api/webhooks/razorpay
```

Razorpay events handled:

- `payment.captured`
- `order.paid`

In non-production, if no provider is configured, the app can return a mock
checkout success URL after creating an order.

## 9. Configure Email

Add Resend settings:

```env
RESEND_API_KEY=re_replace
EMAIL_FROM=CodeSell <delivered@codesell.dev>
ADMIN_EMAIL=owner@example.com
```

Emails are sent for purchase confirmation, collaborator invite notice, and
admin delivery failure alerts. If `RESEND_API_KEY` is missing in development,
email delivery is skipped and logged.

## 10. Run Locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Useful routes:

- `/products`
- `/auth/signin`
- `/checkout`
- `/dashboard`
- `/admin`
- `/admin/products`
- `/admin/orders`

## 11. Verify Before Launch

Run:

```bash
npm run lint
npm run build
```

Expected note: the current code may warn about raw `<img>` usage for dynamic
product image URLs. The build still passes.

## 12. Production Checklist

- Set `NEXT_PUBLIC_APP_URL` and `NEXTAUTH_URL` to the production domain.
- Use strong production-only `AUTH_SECRET`, `NEXTAUTH_SECRET`, and
  `ENCRYPTION_KEY`.
- Use a production PostgreSQL connection string.
- Update the GitHub OAuth callback URL to:

  ```text
  https://your-domain.com/api/auth/callback/github
  ```

- Add production payment webhook endpoints:

  ```text
  https://your-domain.com/api/webhooks/stripe
  https://your-domain.com/api/webhooks/razorpay
  ```

- Use live payment keys only after test-mode checkout and webhook delivery pass.
- Confirm the seller GitHub PAT can add collaborators to every product repo.
- Confirm `ADMIN_EMAIL` receives delivery failure alerts.
- Set your admin user role to `ADMIN` in production.
- Run a full smoke test: GitHub login, product checkout, webhook receipt,
  collaborator invite, dashboard order status, and email delivery.
