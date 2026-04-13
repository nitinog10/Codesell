# CodeSell

CodeSell is a Next.js MVP for selling private GitHub source code repositories. Buyers authenticate with GitHub OAuth, complete payment through Stripe or Razorpay, and receive read-only collaborator access after webhook confirmation.

## Stack

- Next.js App Router with TypeScript
- Auth.js / NextAuth GitHub provider
- Prisma with PostgreSQL
- Stripe checkout plus Razorpay order/webhook support
- Octokit GitHub collaborator automation
- Resend React Email notifications
- Tailwind CSS

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill the values for GitHub OAuth, PostgreSQL, payment provider, seller GitHub PAT, Resend, and encryption.

3. Push the Prisma schema and seed products:

   ```bash
   npm run db:push
   npm run db:seed
   ```

4. Start the app:

   ```bash
   npm run dev
   ```

5. Visit `http://localhost:3000`.

## Notes

- Admin access is controlled by the `User.role` field. Set your user to `ADMIN` in the database after the first GitHub login.
- The public catalog falls back to sample products when `DATABASE_URL` is not configured, but order creation requires a real database.
- Repository delivery uses `GITHUB_SELLER_PAT` and always requests GitHub `pull` permission.

## Code Improvements Applied

- Added regression tests for high-risk files: `src/lib/sample-data.ts`, `emails/CollabInvite.tsx`, `emails/PurchaseConfirmation.tsx`.
- Proposed extracting shared utility code into a dedicated module to reduce coupling.
- Re-indexed and regenerated walkthroughs/diagrams to maintain up-to-date documentation.
