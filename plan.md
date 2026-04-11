# CodeSell — MVP Implementation Plan

> **E-commerce platform for selling source code with GitHub-native authentication and automated repository access delivery.**

---

## 1. Product Overview

### What It Does
- Sellers (you) list source code products tied to private GitHub repositories
- Buyers authenticate **exclusively via GitHub OAuth**
- After successful payment, the buyer is **automatically added as a read-only collaborator** to the purchased repo
- A confirmation message appears: _"The collaboration invite has been sent to your GitHub email"_

### Core User Flow

```mermaid
graph TD
    A[Landing Page] --> B[Browse Products]
    B --> C{Authenticated?}
    C -->|No| D[Login with GitHub]
    D --> C
    C -->|Yes| E[Add to Cart / Buy Now]
    E --> F[Checkout & Payment]
    F --> G{Payment Success?}
    G -->|Yes| H[GitHub API: Add Collaborator]
    H --> I[Show Success Message]
    I --> J["Collab invite sent to your email"]
    G -->|No| K[Payment Failed - Retry]
```

---

## 2. Architecture

### High-Level System Design

```mermaid
graph LR
    subgraph Client
        A[Next.js Frontend]
    end

    subgraph Server
        B[Next.js API Routes]
        C[Auth Module - NextAuth]
        D[Payment Module]
        E[GitHub Integration Module]
    end

    subgraph External
        F[GitHub OAuth]
        G[GitHub REST API]
        H[Stripe / Razorpay]
        I[Email Service - Resend]
    end

    subgraph Data
        J[(PostgreSQL - Neon)]
        K[Prisma ORM]
    end

    A <--> B
    B <--> C
    B <--> D
    B <--> E
    C <--> F
    E <--> G
    D <--> H
    B <--> I
    B <--> K
    K <--> J
```

### Architecture Principles
| Principle | Decision |
|---|---|
| **Monolith-first** | Single Next.js app (API + Frontend) — split later if needed |
| **Serverless-ready** | Deploys to Vercel/Netlify with zero config |
| **Database** | Serverless PostgreSQL (Neon) — scales to zero, pay-per-query |
| **Auth** | NextAuth.js with GitHub provider — battle-tested, session-based |
| **Payments** | Stripe (global) or Razorpay (India-first) — webhook-driven |
| **Email** | Resend — developer-friendly, React email templates |

---

## 3. Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | Full-stack, SSR, API routes, edge-ready |
| **Language** | TypeScript | Type safety across stack |
| **Styling** | Tailwind CSS v4 + shadcn/ui | Rapid, consistent, beautiful UI |
| **Auth** | NextAuth.js v5 (Auth.js) | GitHub OAuth with zero boilerplate |
| **Database** | PostgreSQL (Neon Serverless) | Serverless, branching, scales to zero |
| **ORM** | Prisma | Type-safe queries, migrations, schema-first |
| **Payments** | Stripe (or Razorpay) | Webhooks, subscriptions, global reach |
| **GitHub API** | Octokit.js | Official GitHub SDK — collab management |
| **Email** | Resend + React Email | Transactional emails with React templates |
| **Deployment** | Vercel | Git-push deploys, edge functions, preview URLs |
| **Storage** | Vercel Blob / Cloudflare R2 | Product images, screenshots |

---

## 4. Database Schema (Prisma)

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── AUTH ────────────────────────────────────────────
model User {
  id            String    @id @default(cuid())
  githubId      String    @unique
  username      String    @unique
  email         String    @unique
  name          String?
  avatarUrl     String?
  accessToken   String    // encrypted, for GitHub API calls
  role          Role      @default(BUYER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  orders        Order[]
  sessions      Session[]
  accounts      Account[]

  @@index([githubId])
  @@index([email])
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum Role {
  BUYER
  ADMIN
}

// ─── PRODUCTS ───────────────────────────────────────
model Product {
  id            String   @id @default(cuid())
  name          String
  slug          String   @unique
  description   String   @db.Text
  longDesc      String?  @db.Text        // markdown
  price         Int                       // in smallest currency unit (paise/cents)
  currency      String   @default("INR")
  repoOwner     String                    // GitHub username/org
  repoName      String                    // GitHub repo name
  repoUrl       String                    // full URL for display
  imageUrl      String?
  screenshots   String[]                  // array of image URLs
  tags          String[]
  techStack     String[]
  isActive      Boolean  @default(true)
  featured      Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  orders        Order[]
  orderItems    OrderItem[]

  @@unique([repoOwner, repoName])
  @@index([slug])
  @@index([isActive])
}

// ─── ORDERS ─────────────────────────────────────────
model Order {
  id              String      @id @default(cuid())
  userId          String
  status          OrderStatus @default(PENDING)
  totalAmount     Int                        // smallest currency unit
  currency        String      @default("INR")
  paymentId       String?     @unique        // Stripe/Razorpay payment ID
  paymentMethod   String?
  collabStatus    CollabStatus @default(PENDING)
  collabError     String?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  user            User        @relation(fields: [userId], references: [id])
  items           OrderItem[]

  @@index([userId])
  @@index([status])
  @@index([paymentId])
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  productId String
  price     Int                              // price at time of purchase

  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id])

  @@unique([orderId, productId])             // can't buy same product twice in one order
}

enum OrderStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

enum CollabStatus {
  PENDING
  SENT
  ACCEPTED
  FAILED
}

// ─── WEBHOOK LOGS ───────────────────────────────────
model WebhookEvent {
  id          String   @id @default(cuid())
  provider    String                       // "stripe" | "razorpay"
  eventType   String
  payload     Json
  processed   Boolean  @default(false)
  error       String?
  createdAt   DateTime @default(now())

  @@index([provider, eventType])
  @@index([processed])
}
```

---

## 5. Core Modules — Detailed Design

### 5.1 Authentication (GitHub OAuth)

```
Flow:
1. User clicks "Login with GitHub"
2. Redirected to GitHub OAuth consent screen
3. GitHub redirects back with auth code
4. NextAuth exchanges code for access_token
5. Fetch user profile (username, email, avatar)
6. Upsert user in DB
7. Create session → redirect to dashboard
```

**Key Config:**
- GitHub OAuth App scopes: `read:user`, `user:email`
- Store `access_token` encrypted (AES-256) — needed later for collaborator API
- NextAuth callbacks: `jwt`, `session`, `signIn`

**Important:** The seller's GitHub account uses a **Personal Access Token (PAT)** with `repo` + `admin:org` scope to add collaborators. This is separate from buyer tokens.

---

### 5.2 Product Catalog

| Feature | Details |
|---|---|
| Product listing page | Grid/card layout with filters (tags, tech stack, price range) |
| Product detail page | Full description (MDX), screenshots carousel, live demo link, tech stack badges |
| Search | Full-text search via PostgreSQL `tsvector` or client-side filtering (MVP) |
| Admin panel | CRUD products, toggle active/featured, view orders |

---

### 5.3 Payment Flow

```mermaid
sequenceDiagram
    participant B as Buyer
    participant F as Frontend
    participant A as API Server
    participant P as Stripe/Razorpay
    participant G as GitHub API
    participant E as Email - Resend

    B->>F: Click "Buy Now"
    F->>A: POST /api/orders/create
    A->>A: Create Order (PENDING)
    A->>P: Create Payment Session/Order
    P-->>A: Payment Session ID
    A-->>F: Redirect to Payment
    F->>P: User completes payment
    P->>A: Webhook payment.success
    A->>A: Update Order to PAID
    A->>G: PUT /repos/owner/repo/collaborators/username
    Note over A,G: Permission: pull (read-only)
    G-->>A: 201 Created (invite sent)
    A->>A: Update CollabStatus to SENT
    A->>E: Send confirmation email
    A-->>F: Order success page
    F->>B: Collab invite sent to your email
```

**Webhook Security:**
- Verify Stripe signature (`stripe-signature` header)
- Verify Razorpay signature (HMAC SHA256)
- Idempotency: check `WebhookEvent` table before processing
- Retry logic: if GitHub API fails, queue for retry (max 3 attempts)

---

### 5.4 GitHub Collaborator Integration

```typescript
// Pseudocode for the core logic
async function addCollaborator(order: Order) {
  const octokit = new Octokit({ auth: SELLER_GITHUB_PAT });

  for (const item of order.items) {
    const product = item.product;
    const buyer = order.user;

    try {
      await octokit.repos.addCollaborator({
        owner: product.repoOwner,
        repo: product.repoName,
        username: buyer.username,
        permission: "pull",  // READ-ONLY access
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { collabStatus: "SENT" },
      });
    } catch (error) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          collabStatus: "FAILED",
          collabError: error.message,
        },
      });
      // Queue for retry
    }
  }
}
```

**Permission Levels:**
| Level | Access |
|---|---|
| `pull` ✅ | Read-only — clone, fetch, view code |
| `push` ❌ | Read + Write — NOT used |
| `admin` ❌ | Full control — NOT used |

---

### 5.5 Email Notifications

| Trigger | Email |
|---|---|
| Payment success | Purchase confirmation + collab invite notice |
| Collab invite sent | "Check your GitHub email for the invite" |
| Collab failed (admin) | Alert to admin with error details |
| Welcome | Post-signup welcome email |

---

## 6. Page Structure & Routes

```
/                           → Landing / Hero page
/products                   → Product catalog (grid + filters)
/products/[slug]            → Product detail page
/auth/signin                → GitHub OAuth login
/checkout                   → Payment page
/checkout/success           → Post-payment success page
/checkout/failure           → Payment failed page
/dashboard                  → Buyer dashboard (purchases, active repos)
/dashboard/orders           → Order history
/dashboard/orders/[id]      → Order detail
/admin                      → Admin dashboard (protected)
/admin/products             → Product CRUD
/admin/products/new         → Add new product
/admin/products/[id]/edit   → Edit product
/admin/orders               → All orders
/api/auth/[...nextauth]     → NextAuth API routes
/api/orders/create          → Create order + payment session
/api/webhooks/stripe        → Stripe webhook handler
/api/webhooks/razorpay      → Razorpay webhook handler
/api/admin/products         → Product CRUD API
```

---

## 7. Security Considerations

| Threat | Mitigation |
|---|---|
| **Token theft** | Encrypt GitHub PAT at rest (AES-256), never expose to client |
| **Webhook spoofing** | Verify signatures (Stripe/Razorpay HMAC) |
| **Double-purchase exploit** | Idempotent webhook processing, unique constraint on orderId+productId |
| **Unauthorized admin access** | Role-based middleware, ADMIN role check on all /admin routes |
| **CSRF** | NextAuth built-in CSRF protection |
| **Rate limiting** | Rate limit API routes (e.g., upstash/ratelimit) |
| **SQL injection** | Prisma parameterized queries (built-in) |
| **XSS** | React auto-escaping + CSP headers |
| **GitHub PAT scope creep** | Use fine-grained PAT with minimal repo permissions |
| **Payment bypass** | NEVER trust client — always verify via webhook |

---

## 8. Scalability Strategy

### Phase 1: MVP (Current)
- Single Next.js app on Vercel
- Neon serverless Postgres (auto-scales)
- GitHub API calls inline (synchronous)

### Phase 2: Growth (100+ daily orders)
- Move GitHub collab logic to background job queue (Inngest / QStash)
- Add Redis cache for product catalog (Upstash)
- CDN for product images (Vercel Blob / Cloudflare R2)
- Database connection pooling (PgBouncer via Neon)

### Phase 3: Scale (1000+ daily orders)
- Separate API service (if Next.js API routes bottleneck)
- Read replicas for database
- Event-driven architecture (webhook → queue → worker)
- Multi-region deployment
- Monitoring: Sentry + Vercel Analytics

```mermaid
graph TB
    subgraph "Phase 1 - MVP"
        A1[Next.js on Vercel]
        B1[Neon Postgres]
        C1[Inline GitHub API]
    end

    subgraph "Phase 2 - Growth"
        A2[Next.js on Vercel]
        B2[Neon + Connection Pool]
        C2[Inngest Job Queue]
        D2[Upstash Redis Cache]
        E2[Cloudflare R2 CDN]
    end

    subgraph "Phase 3 - Scale"
        A3[Edge API + SSR]
        B3[Postgres + Read Replicas]
        C3[Event Bus]
        D3[Distributed Cache]
        E3[Multi-Region CDN]
        F3[Sentry + Monitoring]
    end

    A1 --> A2 --> A3
```

---

## 9. Environment Variables

```env
# ─── App ─────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<random-32-char-string>

# ─── Database ────────────────────────────
DATABASE_URL=postgresql://user:pass@host/dbname?sslmode=require

# ─── GitHub OAuth (Buyer Login) ──────────
GITHUB_CLIENT_ID=<from-github-oauth-app>
GITHUB_CLIENT_SECRET=<from-github-oauth-app>

# ─── GitHub PAT (Seller - Collab Mgmt) ───
GITHUB_SELLER_PAT=<fine-grained-pat-with-repo-collab-scope>
GITHUB_SELLER_USERNAME=<your-github-username>

# ─── Stripe ──────────────────────────────
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# ─── Razorpay (alternative) ─────────────
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=<secret>
RAZORPAY_WEBHOOK_SECRET=<webhook-secret>

# ─── Email (Resend) ─────────────────────
RESEND_API_KEY=re_...

# ─── Encryption ─────────────────────────
ENCRYPTION_KEY=<32-byte-hex-key>
```

---

## 10. MVP Development Phases

### Phase 0: Setup & Scaffolding — ~1 day
- [ ] Initialize Next.js 15 project with TypeScript
- [ ] Configure Tailwind CSS v4 + shadcn/ui
- [ ] Set up Prisma + Neon database
- [ ] Run initial migration
- [ ] Set up environment variables
- [ ] Configure ESLint + Prettier
- [ ] Set up Git repo with .gitignore

### Phase 1: Authentication — ~1 day
- [ ] Install & configure NextAuth.js v5
- [ ] Set up GitHub OAuth App on GitHub
- [ ] Implement GitHub provider with correct scopes
- [ ] Build login/logout UI components
- [ ] Implement session management
- [ ] Add role-based access (BUYER vs ADMIN)
- [ ] Protect routes with middleware
- [ ] Test: login → session → logout flow

### Phase 2: Product Catalog — ~2 days
- [ ] Create admin product CRUD API routes
- [ ] Build admin dashboard (add/edit/delete products)
- [ ] Build public product listing page (grid + cards)
- [ ] Build product detail page (description, screenshots, price)
- [ ] Implement slug-based routing
- [ ] Add tag/tech-stack filtering
- [ ] Seed database with 2-3 sample products
- [ ] Responsive design for mobile

### Phase 3: Payment Integration — ~2 days
- [ ] Set up Stripe (or Razorpay) account + API keys
- [ ] Implement POST /api/orders/create (creates order + payment session)
- [ ] Build checkout page with payment UI
- [ ] Implement webhook handler (/api/webhooks/stripe)
- [ ] Add webhook signature verification
- [ ] Implement idempotent webhook processing
- [ ] Build success/failure pages
- [ ] Test: full payment cycle (test mode)

### Phase 4: GitHub Collaborator Automation — ~1 day
- [ ] Create fine-grained GitHub PAT for seller account
- [ ] Implement addCollaborator() function with Octokit
- [ ] Wire it into the post-payment webhook flow
- [ ] Add retry logic for GitHub API failures
- [ ] Update CollabStatus on order
- [ ] Test: buy product → collab invite received

### Phase 5: Email Notifications — ~1 day
- [ ] Set up Resend account + API key
- [ ] Design email templates with React Email:
  - Purchase confirmation
  - Collab invite notification
  - Admin alert (on failures)
- [ ] Wire emails into post-payment flow
- [ ] Test: buy product → email received

### Phase 6: Buyer Dashboard — ~1 day
- [ ] Build /dashboard page — purchased products list
- [ ] Build /dashboard/orders — order history
- [ ] Build /dashboard/orders/[id] — order detail with collab status
- [ ] Show collab invite status (pending/sent/accepted/failed)
- [ ] Add "re-send invite" button for failed collabs

### Phase 7: Polish & Launch — ~1 day
- [ ] Landing page with hero section, features, testimonials
- [ ] SEO: meta tags, OG images, sitemap
- [ ] Loading states, error boundaries, toast notifications
- [ ] Mobile responsiveness audit
- [ ] Lighthouse performance audit
- [ ] Deploy to Vercel (production)
- [ ] Connect custom domain
- [ ] Switch Stripe/Razorpay to live mode
- [ ] Smoke test full flow in production

---

## 11. Folder Structure

```
CodeSell/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Landing page
│   │   ├── globals.css
│   │   ├── (auth)/
│   │   │   └── signin/page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx              # Catalog
│   │   │   └── [slug]/page.tsx       # Detail
│   │   ├── checkout/
│   │   │   ├── page.tsx
│   │   │   ├── success/page.tsx
│   │   │   └── failure/page.tsx
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   └── orders/
│   │   │       ├── page.tsx
│   │   │       └── [id]/page.tsx
│   │   ├── admin/
│   │   │   ├── page.tsx
│   │   │   ├── products/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/edit/page.tsx
│   │   │   └── orders/page.tsx
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── orders/
│   │       │   └── create/route.ts
│   │       ├── webhooks/
│   │       │   ├── stripe/route.ts
│   │       │   └── razorpay/route.ts
│   │       └── admin/
│   │           └── products/route.ts
│   ├── components/
│   │   ├── ui/                       # shadcn components
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── ProductDetail.tsx
│   │   ├── checkout/
│   │   │   └── PaymentForm.tsx
│   │   └── dashboard/
│   │       ├── OrderList.tsx
│   │       └── PurchasedRepos.tsx
│   ├── lib/
│   │   ├── prisma.ts                 # Prisma client singleton
│   │   ├── auth.ts                   # NextAuth config
│   │   ├── stripe.ts                 # Stripe client + helpers
│   │   ├── github.ts                 # Octokit + collab functions
│   │   ├── email.ts                  # Resend client + templates
│   │   ├── encryption.ts             # AES-256 encrypt/decrypt
│   │   └── utils.ts                  # Shared utilities
│   ├── types/
│   │   └── index.ts                  # Shared TypeScript types
│   └── middleware.ts                 # Route protection
├── emails/
│   ├── PurchaseConfirmation.tsx      # React Email template
│   ├── CollabInvite.tsx
│   └── AdminAlert.tsx
├── public/
│   ├── images/
│   └── favicon.ico
├── .env.local
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 12. Key Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next-auth": "^5.0.0",
    "@prisma/client": "^6.0.0",
    "prisma": "^6.0.0",
    "@octokit/rest": "^21.0.0",
    "stripe": "^17.0.0",
    "resend": "^4.0.0",
    "@react-email/components": "^0.0.30",
    "zod": "^3.23.0",
    "lucide-react": "^0.400.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.5.0"
  }
}
```

---

## 13. Risk Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| GitHub API rate limits (5000/hr authenticated) | Collab invites fail | Queue + retry with exponential backoff |
| Buyer doesn't have a GitHub email set | Invite not received | Validate during OAuth, warn user |
| Payment succeeds but collab fails | Revenue but no delivery | Webhook retry + admin alert + manual fallback |
| GitHub PAT expires/revoked | All collabs fail | Monitor PAT health, alert on 401 |
| Buyer already has access | API error | Check existing collabs before adding |
| Repo deleted/renamed | Broken product | Validate repo existence on product creation |
| Refund requested | Need to revoke access | Implement removeCollaborator() on refund webhook |

---

## 14. Future Enhancements (Post-MVP)

- [ ] **License key system** — alternative to GitHub collab for non-GitHub products
- [ ] **Bundle deals** — buy multiple products at discount
- [ ] **Subscription model** — monthly access to all repos
- [ ] **Reviews & ratings** — social proof
- [ ] **Analytics dashboard** — sales, revenue, top products
- [ ] **Multi-seller marketplace** — let others sell their code too
- [ ] **Discord integration** — auto-add buyers to private Discord channels
- [ ] **Live demo previews** — embedded Stackblitz/CodeSandbox
- [ ] **Coupon/promo codes** — marketing tool
- [ ] **Affiliate program** — referral commission system

---

## 15. Estimated Timeline

| Phase | Duration | Cumulative |
|---|---|---|
| Phase 0: Setup | 1 day | Day 1 |
| Phase 1: Auth | 1 day | Day 2 |
| Phase 2: Products | 2 days | Day 4 |
| Phase 3: Payments | 2 days | Day 6 |
| Phase 4: GitHub Collab | 1 day | Day 7 |
| Phase 5: Email | 1 day | Day 8 |
| Phase 6: Dashboard | 1 day | Day 9 |
| Phase 7: Polish & Launch | 1 day | Day 10 |

> **Total MVP: ~10 working days**

---

## Open Questions

> [!IMPORTANT]
> **Please confirm the following before we begin implementation:**

1. **Payment Gateway**: Stripe (global, USD) or Razorpay (India, INR) or both?
2. **Hosting**: Vercel (recommended) or Netlify? Or self-hosted?
3. **Domain**: Do you have a domain name ready?
4. **Products**: How many products/repos will you list initially?
5. **Pricing**: Fixed prices per product, or tiered (basic/pro)?
6. **Currency**: INR, USD, or multi-currency?
7. **Admin**: Just you as admin, or multi-admin support needed?
8. **Refund Policy**: Should revoking collab access on refund be automated?
