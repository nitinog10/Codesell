# Codesell

## Overview

The `repo_d7d98402c220` repository contains the source code and configuration for the CodeSell platform, a web application designed to facilitate the buying and selling of code snippets and templates. The primary tech stack includes `Next.js` for the frontend and backend, `TypeScript` for type safety, and `Tailwind CSS` for styling. The project leverages `Prisma` for database interactions and `Vitest` for testing.

The folder structure is organized to separate concerns effectively. The `docs` folder contains documentation for the backend API, testing guidelines, and test coverage analysis. The `emails` folder includes React components for generating various email templates. The `nitinog10-Codesell-e6af67a` folder is the core of the application, containing configuration files, source code, and additional documentation.

Users of this project include developers looking to buy or sell code snippets, administrators managing the platform, and collaborators involved in code projects. The application provides features for user authentication, product management, order processing, and email notifications, all integrated within a cohesive Next.js application.

## Architecture

```markdown
## Architecture

### Overview

The CodeSell project is structured to facilitate scalability, maintainability, and efficient development workflows. The architecture is primarily based on a Next.js framework, leveraging TypeScript for type safety and Prisma for database interactions. The project is organized into distinct layers and modules, each serving specific purposes.

### Layers and Modules

1. **Configuration Files**:
    - `.env.example`: Template for environment variables.
    - `eslint.config.mjs`: ESLint configuration.
    - `next-env.d.ts`: Type definitions for Next.js.
    - `next.config.ts`: Next.js configuration.
    - `postcss.config.mjs`: PostCSS configuration.
    - `tailwind.config.ts`: Tailwind CSS configuration.
    - `tsconfig.json`: TypeScript configuration.
    - `vitest.config.ts`: Vitest configuration.

2. **Documentation**:
    - `README.md`: Project overview and setup instructions.
    - `plan.md`: Implementation plan for the MVP.
    - `setup.md`: Setup guide for local development.
    - `docs/`: Directory containing detailed documentation on backend APIs, testing, and test coverage.

3. **Emails**:
    - `emails/`: Directory containing React components for generating email templates (`AdminAlert.tsx`, `CollabInvite.tsx`, `PurchaseConfirmation.tsx`).

4. **Source Code (`src/`)**:
    - **Middleware**:
        - `middleware.ts`: Middleware functions for request handling.
    - **App**:
        - `app/`: Main application directory containing pages, components, and API routes.
            - **Pages**:
                - `error.tsx`, `globals.css`, `layout.tsx`, `loading.tsx`, `not-found.tsx`, `page.tsx`, `robots.ts`, `sitemap.ts`: Core application pages and configurations.
            - **Admin**:
                - `admin/`: Admin-specific pages and components.
                    - `page.tsx`, `orders/`, `products/`: Admin dashboard and management pages.
            - **API**:
                - `api/`: API routes for various functionalities.
                    - `admin/`, `auth/`, `health/`, `orders/`, `webhooks/`: Specific API endpoints.
            - **Auth**:
                - `auth/`: Authentication-related pages.
                    - `signin/`: Sign-in page.
            - **Checkout**:
                - `checkout/`: Checkout-related pages.
                    - `page.tsx`, `failure/`, `success/`: Checkout flow pages.
            - **Dashboard**:
                - `dashboard/`: User dashboard pages.
                    - `page.tsx`, `orders/`: Dashboard and order management pages.
            - **Products**:
                - `products/`: Product-related pages.
                    - `page.tsx`, `[slug]/`: Product listing and detail pages.
    - **Components**:
        - `components/`: Reusable UI components.
            - `admin/`: Admin-specific components.

5. **Prisma**:
    - `prisma/`: Directory for Prisma schema and seed data.
        - `schema.prisma`: Prisma schema definition.
        - `seed.ts`: Database seeding script.

### Data Flow

- **Environment Configuration**: Environment variables are loaded from `.env` files.
- **Request Handling**: Incoming requests are processed by middleware defined in `middleware.ts`.
- **Page Rendering**: Pages are rendered based on the routing defined in the `app/` directory.
- **API Interactions**: API routes handle business logic and interact with the database via Prisma.
- **Database**: Prisma manages database operations, ensuring type-safe interactions.
- **Emails**: Email templates are generated using React components in the `emails/` directory.

### Key Design Patterns

- **Modularization**: The codebase is divided into distinct modules (`app/`, `components/`, `api/`) to promote reusability and maintainability.
- **Separation of Concerns**: Configuration, business logic, and UI components are separated into different files and directories.
- **Type Safety**: TypeScript is used throughout the project to ensure type safety and reduce runtime errors.

### Main Entry Points

- **Next.js Pages**: The main entry points for the application are the Next.js pages defined in the `app/` directory.
- **API Routes**: The API routes in `app/api/` serve as entry points for backend functionality.
- **Middleware**: Middleware functions in `middleware.ts` handle initial request processing.
```

## Folder Structure

```
├── .env.example
├── README.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── plan.md
├── postcss.config.mjs
├── setup.md
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
├── docs/
│   ├── backend-api.md
│   ├── backend-testing.md
│   └── test-coverage-analysis.md
├── emails/
│   ├── AdminAlert.tsx
│   ├── CollabInvite.tsx
│   └── PurchaseConfirmation.tsx
├── nitinog10-Codesell-e6af67a/
│   ├── .env.example
│   ├── README.md
│   ├── eslint.config.mjs
│   ├── next-env.d.ts
│   ├── next.config.ts
│   ├── package.json
│   ├── plan.md
│   ├── postcss.config.mjs
│   ├── setup.md
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── vitest.config.ts
│   ├── docs/
│   │   ├── backend-api.md
│   │   ├── backend-testing.md
│   │   └── test-coverage-analysis.md
│   ├── emails/
│   │   ├── AdminAlert.tsx
│   │   ├── CollabInvite.tsx
│   │   └── PurchaseConfirmation.tsx
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── middleware.ts
│   │   ├── app/
│   │   │   ├── error.tsx
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── not-found.tsx
│   │   │   ├── page.tsx
│   │   │   ├── robots.ts
│   │   │   ├── sitemap.ts
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── orders/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── products/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── [id]/
│   │   │   │       │   └── edit/
│   │   │   │       │       └── page.tsx
│   │   │   │       └── new/
│   │   │   │           └── page.tsx
│   │   │   ├── api/
│   │   │   │   ├── admin/
│   │   │   │   │   └── products/
│   │   │   │   │       ├── route.ts
│   │   │   │   │       └── [id]/
│   │   │   │   │           └── route.ts
│   │   │   │   ├── auth/
│   │   │   │   │   └── [...nextauth]/
│   │   │   │   │       └── route.ts
│   │   │   │   ├── health/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── orders/
│   │   │   │   │   ├── [id]/
│   │   │   │   │   │   └── retry-collab/
│   │   │   │   │   │       └── route.ts
│   │   │   │   │   └── create/
│   │   │   │   │       └── route.ts
│   │   │   │   └── webhooks/
│   │   │   │       ├── razorpay/
│   │   │   │       │   └── route.ts
│   │   │   │       └── stripe/
│   │   │   │           └── route.ts
│   │   │   ├── auth/
│   │   │   │   └── signin/
│   │   │   │       └── page.tsx
│   │   │   ├── checkout/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── failure/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── success/
│   │   │   │       └── page.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx
│   │   │   │   └── orders/
│   │   │   │       ├── page.tsx
│   │   │   │       └── [id]/
│   │   │   │           └── page.tsx
│   │   │   └── products/
│   │   │       ├── page.tsx
│   │   │       └── [slug]/
│   │   │           └── page.tsx
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   ├── ProductActions.tsx
│   │   │   │   └── ProductForm.tsx
│   │   │   ├── auth/
│   │   │   │   └── AuthButton.tsx
│   │   │   ├── checkout/
│   │   │   │   └── PaymentForm.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── OrderList.tsx
│   │   │   │   ├── PurchasedRepos.tsx
│   │   │   │   └── RetryCollabButton.tsx
│   │   │   ├── layout/
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Navbar.tsx
│   │   │   ├── products/
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── ProductCatalog.tsx
│   │   │   │   └── ProductDetail.tsx
│   │   │   └── ui/
│   │   │       ├── Badge.tsx
│   │   │       ├── Button.tsx
│   │   │       ├── Input.tsx
│   │   │       ├── StatusPill.tsx
│   │   │       └── Textarea.tsx
│   │   ├── lib/
│   │   │   ├── auth.ts
│   │   │   ├── email.tsx
│   │   │   ├── encryption.ts
│   │   │   ├── env.ts
│   │   │   ├── fulfillment.ts
│   │   │   ├── github.ts
│   │   │   ├── guards.ts
│   │   │   ├── orders.ts
│   │   │   ├── prisma.ts
│   │   │   ├── products.ts
│   │   │   ├── razorpay.ts
│   │   │   ├── sample-data.ts
│   │   │   ├── stripe.ts
│   │   │   ├── utils.ts
│   │   │   ├── validators.ts
│   │   │   └── __tests__/
│   │   │       ├── encryption.test.ts
│   │   │       ├── env.test.ts
│   │   │       ├── utils.test.ts
│   │   │       └── validators.test.ts
│   │   └── types/
│   │       └── next-auth.d.ts
│   └── tests/
│       ├── env.test.ts
│       ├── utils.test.ts
│       └── validators.test.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── middleware.ts
│   ├── app/
│   │   ├── error.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   ├── admin/
│   │   │   ├── page.tsx
│   │   │   ├── orders/
│   │   │   │   └── page.tsx
│   │   │   └── products/
│   │   │       ├── page.tsx
│   │   │       ├── [id]/
│   │   │       │   └── edit/
│   │   │       │       └── page.tsx
│   │   │       └── new/
│   │   │           └── page.tsx
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   └── products/
│   │   │   │       ├── route.ts
│   │   │   │       └── [id]/
│   │   │   │           └── route.ts
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── health/
│   │   │   │   └── route.ts
│   │   │   ├── orders/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── retry-collab/
│   │   │   │   │       └── route.ts
│   │   │   │   └── create/
│   │   │   │       └── route.ts
│   │   │   └── webhooks/
│   │   │       ├── razorpay/
│   │   │       │   └── route.ts
│   │   │       └── stripe/
│   │   │           └── route.ts
│   │   ├── auth/
│   │   │   └── signin/
│   │   │       └── page.tsx
│   │   ├── checkout/
│   │   │   ├── page.tsx
│   │   │   ├── failure/
│   │   │   │   └── page.tsx
│   │   │   └── success/
│   │   │       └── page.tsx
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   └── orders/
│   │   │       ├── page.tsx
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   │   └── products/
│   │       ├── page.tsx
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── components/
│   │   ├── admin/
│   │   │   ├── ProductActions.tsx
│   │   │   └── ProductForm.tsx
│   │   ├── auth/
│   │   │   └── AuthButton.tsx
│   │   ├── checkout/
│   │   │   └── PaymentForm.tsx
│   │   ├── dashboard/
│   │   │   ├── OrderList.tsx
│   │   │   ├── PurchasedRepos.tsx
│   │   │   └── RetryCollabButton.tsx
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductCatalog.tsx
│   │   │   └── ProductDetail.tsx
│   │   └── ui/
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── StatusPill.tsx
│   │       └── Textarea.tsx
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── email.tsx
│   │   ├── encryption.ts
│   │   ├── env.ts
│   │   ├── fulfillment.ts
│   │   ├── github.ts
│   │   ├── guards.ts
│   │   ├── orders.ts
│   │   ├── prisma.ts
│   │   ├── products.ts
│   │   ├── razorpay.ts
│   │   ├── sample-data.ts
│   │   ├── stripe.ts
│   │   ├── utils.ts
│   │   ├── validators.ts
│   │   └── __tests__/
│   │       ├── encryption.test.ts
│   │       ├── env.test.ts
│   │       ├── utils.test.ts
│   │       └── validators.test.ts
│   └── types/
│       └── next-auth.d.ts
└── tests/
    ├── env.test.ts
    ├── utils.test.ts
    └── validators.test.ts
```

## Dependencies

### Dependencies

#### Production Dependencies

- **@auth/prisma-adapter** (`^2.10.0`): Adapter for integrating Auth.js with Prisma.
- **@octokit/rest** (`^21.1.1`): A REST client for the GitHub API.
- **@prisma/client** (`^6.8.2`): Prisma Client for database access.
- **@radix-ui/react-slot** (`^1.1.1`): A component for managing slots in Radix UI.
- **@react-email/components** (`^0.0.38`): Components for building emails with React.
- **class-variance-authority** (`^0.7.1`): Utility for managing class names in a type-safe manner.
- **clsx** (`^2.1.1`): Utility for conditionally joining class names.
- **lucide-react** (`^0.468.0`): React icons library.
- **next** (`^15.3.3`): Framework for server-rendered React applications.
- **next-auth** (`^5.0.0-beta.28`): Authentication for Next.js applications.
- **react** (`^19.0.0`): Library for building user interfaces.
- **react-dom** (`^19.0.0`): DOM bindings for React.
- **resend** (`^4.5.1`): Library for sending emails.
- **stripe** (`^17.7.0`): Library for processing payments.
- **tailwind-merge** (`^2.6.0`): Utility for merging Tailwind CSS classes.
- **zod** (`^3.24.1`): TypeScript-first schema validation library.

#### Development Dependencies

- **@eslint/eslintrc** (`^3.3.1`): ESLint configuration for TypeScript projects.
- **@tailwindcss/postcss** (`^4.1.8`): PostCSS plugin for Tailwind CSS.
- **@types/node** (`^22.10.2`): TypeScript definitions for Node.js.
- **@types/react** (`^19.0.2`): TypeScript definitions for React.
- **@types/react-dom** (`^19.0.2`): TypeScript definitions for React DOM.
- **@vitest/coverage-v8** (`^4.1.5`): Coverage reporter for Vitest.
- **eslint** (`^9.17.0`): Pluggable linting utility for JavaScript and JSX.
- **eslint-config-next** (`^15.3.3`): ESLint configuration for Next.js.
- **prisma** (`^6.8.2`): Prisma ORM for database access.
- **tailwindcss** (`^4.1.8`): Utility-first CSS framework.
- **tsx** (`^4.19.2`): TypeScript compiler for JSX.
- **typescript** (`^5.7.2`): Superset of JavaScript that compiles to plain JavaScript.
- **vitest** (`^4.1.5`): Vite-powered testing framework.

## File Documentation

### `.env.example`

##### `.env.example` Documentation

This file contains example environment variables used to configure various services and settings in the application. It's a template for creating a `.env` file that holds sensitive and environment-specific configurations.

#### Dependencies

No direct dependencies are listed here as it's purely a configuration file.

#### Configuration

| Key | Purpose |
| --- | ------- |
| `NEXT_PUBLIC_APP_URL` | Base URL for the application. |
| `NEXTAUTH_URL` | URL for NextAuth authentication service. |
| `AUTH_SECRET` | Secret key for general authentication. |
| `NEXTAUTH_SECRET` | Secret key for NextAuth. |
| `DATABASE_URL` | Connection string for the PostgreSQL database. |
| `GITHUB_CLIENT_ID` | Client ID for GitHub OAuth. |
| `GITHUB_CLIENT_SECRET` | Client secret for GitHub OAuth. |
| `GITHUB_SELLER_PAT` | Personal Access Token for GitHub. |
| `GITHUB_SELLER_USERNAME` | GitHub username for the seller. |
| `PAYMENT_PROVIDER` | Payment provider in use (e.g., Stripe). |
| `STRIPE_SECRET_KEY` | Secret key for Stripe. |
| `STRIPE_PUBLISHABLE_KEY` | Publishable key for Stripe. |
| `STRIPE_WEBHOOK_SECRET` | Webhook secret for Stripe. |
| `RAZORPAY_KEY_ID` | Key ID for Razorpay. |
| `RAZORPAY_KEY_SECRET` | Key secret for Razorpay. |
| `RAZORPAY_WEBHOOK_SECRET` | Webhook secret for Razorpay. |
| `RESEND_API_KEY` | API key for the Resend email service. |
| `EMAIL_FROM` | Default "From" email address for emails. |
| `ADMIN_EMAIL` | Admin email address. |
| `ENCRYPTION_KEY` | Key for encryption purposes. |

#### Notes

- All placeholders (`replace-with-*`) must be replaced with actual values before using this file in a production environment.
- The `DATABASE_URL` should be updated with the correct database credentials and host.
- The `AUTH_SECRET`, `NEXTAUTH_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `GITHUB_CLIENT_SECRET`, `GITHUB_SELLER_PAT`, and `ENCRYPTION_KEY` should be generated and kept secure.
- Environment variables in this file should never be committed to version control; use `.gitignore` to exclude `.env` files.

### `README.md`

##### `README.md` Documentation

#### Module Overview

This file provides an overview of the `nitinog10/Codesell` repository, detailing its purpose, architecture, folder structure, and dependencies. It serves as the entry point for understanding the project.

#### Dependencies

##### Major Libraries

| Library             | Purpose                                                                                       | Version Constraint | Type       |
|---------------------|-----------------------------------------------------------------------------------------------|--------------------|------------|
| Next.js             | React framework for production                                                               | `^15.3.3`          | Production |
| React               | JavaScript library for building user interfaces                                              | `^19.0.0`          | Production |
| React-DOM           | DOM bindings for React                                                                        | `^19.0.0`          | Production |
| Prisma              | ORM for Node.js and TypeScript                                                                | `^6.8.2`           | Production |
| Tailwind CSS        | Utility-first CSS framework for rapidly building custom designs                              | `^4.1.8`           | Production |
| TypeScript          | Typed superset of JavaScript that compiles to plain JavaScript                                | `^5.7.2`           | Development|
| ESLint              | Tool for identifying and reporting on patterns found in ECMAScript/JavaScript code           | `^9.17.0`          | Development|
| @auth/prisma-adapter| Adapter for using Prisma with NextAuth.js                                                     | `^2.10.0`          | Production |
| @octokit/rest       | REST client for the GitHub API                                                                | `^21.1.1`          | Production |
| @prisma/client      | Prisma Client for database access                                                             | `^6.8.2`           | Production |
| @radix-ui/react-slot| Component for rendering children with specific props                                         | `^1.1.1`           | Production |
| @react-email/components| Components for building email templates with React                                        | `^0.0.38`          | Production |
| class-variance-authority| Utility for managing class names in a type-safe way                                      | `^0.7.1`           | Production |
| clsx                | Utility for constructing className strings conditionally                                      | `^2.1.1`           | Production |
| lucide-react        | React icons based on Lucide                                                                   | `^0.468.0`         | Production |
| next-auth           | Authentication for Next.js applications                                                       | `^5.0.0-beta.28`   | Production |
| resend              | Library for sending emails                                                                    | `^4.5.1`           | Production |
| stripe              | Library for handling payments                                                                 | `^17.7.0`          | Production |
| tailwind-merge      | Utility for merging Tailwind CSS classes                                                      | `^2.6.0`           | Production |
| zod                 | TypeScript-first schema declaration and validation library                                    | `^3.24.1`          | Production |

##### Development Dependencies

| Library                 | Purpose                                                                 | Version Constraint | Type       |
|-------------------------|-------------------------------------------------------------------------|--------------------|------------|
| @eslint/eslintrc        | ESLint configuration for TypeScript projects                           | `^3.3.1`           | Development|
| @tailwindcss/postcss    | PostCSS plugin for Tailwind CSS                                         | `^4.1.8`           | Development|
| @types/node             | TypeScript definitions for Node.js                                      | `^22.10.2`         | Development|
| @types/react            | TypeScript definitions for React                                        | `^19.0.2`          | Development|
| @types/react-dom        | TypeScript definitions for React DOM                                    | `^19.0.2`          | Development|
| eslint-config-next      | ESLint configuration for Next.js                                       | `^15.3.3`          | Development|
| tsx                     | A TypeScript version of Babel's `ts-node`                              | `^4.19.2`          | Development|

#### Notes

- The repository is structured to separate concerns, with directories for API routes (`src/app/api`), frontend pages (`src/app`), and reusable components (`src/components`).
- The project uses Prisma as the ORM for database interactions and Tailwind CSS for styling.
- Environment variables are configured via `.env.example`, which should be copied to `.env` and populated with actual values for local development and deployment.
- The application facilitates the buying and selling of code repositories, with features for user authentication, admin management, and payment processing via Stripe and Razorpay.

### `eslint.config.mjs`

This file configures ESLint for the project, setting up the rules and extensions to be used across the codebase. It ensures consistent code quality and style by integrating with Next.js and TypeScript.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `FlatCompat` | Provides compatibility for ESLint configuration files. |
| `dirname` | Retrieves the directory name from a file path. |
| `fileURLToPath` | Converts a URL to a file path. |

#### Configuration

| Configuration | Purpose |
| --- | --- |
| `ignores` | Specifies directories and files that ESLint should ignore. |
| `extends` | Integrates predefined ESLint configurations from Next.js and TypeScript. |

#### Notes

- The `FlatCompat` instance ensures that ESLint can work with configuration files in both the old and new formats.
- The `ignores` array prevents ESLint from checking certain directories and files that are typically not part of the codebase or are auto-generated.
- The `extends` method includes Next.js and TypeScript-specific rules to maintain consistency across the project.

### `next-env.d.ts`

This file provides type definitions for Next.js and related modules used in the project. It ensures that TypeScript can correctly infer types for Next.js features and custom configurations.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `next` | Type definitions for Next.js core functionalities. |
| `next/image-types/global` | Type definitions specific to Next.js image optimization features. |
| `./.next/types/routes.d.ts` | Custom type definitions for Next.js routes. |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| N/A | N/A | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| N/A | N/A | N/A | N/A |

#### Configuration or Constants

| Identifier | Purpose |
| --- | --- |
| N/A | N/A |

#### Notes

- This file should not be edited directly. It is auto-generated and managed by Next.js.
- For more information, refer to the [Next.js TypeScript documentation](https://nextjs.org/docs/app/api-reference/config/typescript).

### `next.config.ts`

This file configures Next.js for our project, enabling experimental features like server actions.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `NextConfig` | Type definition for Next.js configuration. |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| N/A | N/A | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| N/A | N/A | N/A | N/A |

#### Configuration

| Setting | Purpose |
| --- | --- |
| `experimental.serverActions.bodySizeLimit` | Sets the body size limit for server actions to 2mb. |

#### Notes

- This configuration enables experimental server actions in Next.js.
- The `bodySizeLimit` is set to 2mb to ensure server actions do not exceed a reasonable size limit.

### `package.json`

#### Module Overview

The `package.json` file is the heart of any Node.js project. It holds metadata about the project, including its dependencies, scripts, and configuration settings. This file is crucial for managing the project's lifecycle and ensuring that all necessary tools and libraries are installed and configured correctly.

#### Dependencies

| Dependency | Purpose |
|------------|---------|
| `next` | Framework for building the application. |
| `react` | Library for building user interfaces. |
| `prisma` | ORM for database interactions. |
| `vitest` | Testing framework for JavaScript and TypeScript. |
| `tailwindcss` | Utility-first CSS framework for styling. |

#### Scripts

| Script | Description |
|--------|-------------|
| `dev` | Starts the development server. |
| `build` | Builds the application for production. |
| `start` | Starts the production server. |
| `lint` | Runs ESLint to check for code quality. |
| `db:generate` | Generates Prisma client. |
| `db:push` | Pushes database schema changes. |
| `db:migrate` | Migrates the database schema. |
| `db:seed` | Seeds the database with initial data. |
| `postinstall` | Generates Prisma client after installing dependencies. |
| `db:setup` | Validates, pushes, and seeds the database. |
| `test` | Runs tests using Vitest. |
| `test:coverage` | Runs tests and generates coverage reports. |

#### Configuration

| Key | Value | Purpose |
|-----|-------|---------|
| `prisma.seed` | `tsx prisma/seed.ts` | Specifies the script to run for seeding the database. |

#### Notes

- Ensure that all scripts and dependencies are kept up-to-date to avoid compatibility issues.
- The `postinstall` script is crucial for generating the Prisma client after dependencies are installed.
- When updating dependencies, check for breaking changes that might affect the project.

### `plan.md`

##### CodeSell MVP Implementation Plan

#### Module Overview

This document outlines the implementation plan for the CodeSell MVP, an e-commerce platform for selling source code with GitHub-native authentication and automated repository access delivery.

#### Dependencies

- **Next.js**: Full-stack framework for frontend and API routes.
- **TypeScript**: Type safety across the stack.
- **Tailwind CSS + shadcn/ui**: Rapid, consistent, and beautiful UI.
- **NextAuth.js**: GitHub OAuth with zero boilerplate.
- **Prisma**: Type-safe queries, migrations, schema-first.
- **Octokit.js**: Official GitHub SDK for collaborator management.
- **Resend + React Email**: Transactional emails with React templates.

#### Classes

| Class | Purpose | Key Methods |
|---|---|---|
| `User` | Represents a user in the system | `create`, `update`, `getByGitHubId` |
| `Product` | Represents a product listed for sale | `create`, `update`, `getBySlug` |
| `Order` | Represents an order placed by a buyer | `create`, `updateStatus`, `getById` |
| `OrderItem` | Represents an item within an order | `create`, `getByOrderId` |
| `WebhookEvent` | Represents a webhook event from payment providers | `create`, `markAsProcessed` |

#### Functions

| Function | Parameters | Returns | Description |
|---|---|---|---|
| `loginWithGitHub` | `code: string` | `Promise<User>` | Handles GitHub OAuth login flow |
| `createOrder` | `userId: string, items: OrderItem[]` | `Promise<Order>` | Creates a new order and payment session |
| `handlePaymentSuccess` | `paymentId: string` | `Promise<void>` | Updates order status and adds GitHub collaborator |
| `sendCollabInvite` | `order: Order` | `Promise<void>` | Sends collaboration invite to buyer's GitHub |
| `sendConfirmationEmail` | `order: Order` | `Promise<void>` | Sends purchase confirmation email |

#### Configuration

- **GitHub OAuth App scopes**: `read:user`, `user:email`
- **Seller's GitHub PAT scopes**: `repo`, `admin:org`
- **NextAuth callbacks**: `jwt`, `session`, `signIn`

#### Constants

- **Permission Levels**:
  - `pull`: Read-only access
  - `push`: Read + Write access (not used)
  - `admin`: Full control (not used)

#### Notes

- The seller's GitHub account uses a Personal Access Token (PAT) with `repo` + `admin:org` scope to add collaborators. This is separate from buyer tokens.
- Webhook security includes verifying Stripe and Razorpay signatures, idempotency checks, and retry logic for GitHub API failures.

### `postcss.config.mjs`

This file configures PostCSS plugins for our project. It specifies which plugins to use and their settings.

#### Dependencies

| Import | Purpose |
| --- | --- |
| PostCSS | A tool for transforming CSS with JavaScript plugins. This is the core library that our configuration will use to apply the specified plugins. |

#### Configuration

| Configuration | Purpose |
| --- | --- |
| `plugins` | An object specifying the PostCSS plugins to use. |

#### Notes

- This configuration uses the `@tailwindcss/postcss` plugin, which integrates Tailwind CSS with PostCSS.
- The `@tailwindcss/postcss` plugin is included without any specific configuration options, meaning it will use the default settings provided by Tailwind CSS.
- Ensure that PostCSS and the `@tailwindcss/postcss` plugin are correctly installed in your project dependencies.

### `setup.md`

##### CodeSell Setup Guide

This guide takes the app from a fresh clone to a working local MVP, then lists the production settings needed for real GitHub repository delivery.

#### Module Overview

This file provides a step-by-step guide for setting up the CodeSell application locally and preparing it for production deployment. It covers dependency installation, environment configuration, database setup, and service integration.

#### Dependencies

- Node.js 22 or newer
- npm 11 or newer
- PostgreSQL database (e.g., Neon)
- GitHub OAuth app for buyer login
- GitHub seller Personal Access Token for repository collaborator invites
- Stripe or Razorpay account
- Resend account for transactional email

#### Configuration

##### Environment Variables

| Variable                 | Description                                                                                       |
|--------------------------|---------------------------------------------------------------------------------------------------|
| `NEXT_PUBLIC_APP_URL`    | The public URL of the application.                                                                |
| `NEXTAUTH_URL`           | The URL for NextAuth.                                                                             |
| `AUTH_SECRET`            | Secret key for authentication.                                                                    |
| `NEXTAUTH_SECRET`        | Secret key for NextAuth.                                                                          |
| `DATABASE_URL`           | The connection string for the PostgreSQL database.                                                |
| `ENCRYPTION_KEY`         | The encryption key for sensitive data.                                                            |
| `GITHUB_CLIENT_ID`       | The GitHub OAuth client ID.                                                                       |
| `GITHUB_CLIENT_SECRET`  | The GitHub OAuth client secret.                                                                  |
| `GITHUB_SELLER_PAT`      | The GitHub seller Personal Access Token.                                                         |
| `GITHUB_SELLER_USERNAME`| The GitHub username of the seller.                                                               |
| `PAYMENT_PROVIDER`       | The payment provider (either `stripe` or `razorpay`).                                            |
| `STRIPE_SECRET_KEY`      | The Stripe secret key (if using Stripe).                                                          |
| `STRIPE_PUBLISHABLE_KEY`| The Stripe publishable key (if using Stripe).                                                    |
| `STRIPE_WEBHOOK_SECRET` | The Stripe webhook secret (if using Stripe).                                                     |
| `RAZORPAY_KEY_ID`        | The Razorpay key ID (if using Razorpay).                                                          |
| `RAZORPAY_KEY_SECRET`    | The Razorpay key secret (if using Razorpay).                                                      |
| `RAZORPAY_WEBHOOK_SECRET`| The Razorpay webhook secret (if using Razorpay).                                                |
| `RESEND_API_KEY`         | The Resend API key for email delivery.                                                           |
| `EMAIL_FROM`             | The email address from which emails are sent.                                                     |
| `ADMIN_EMAIL`            | The email address of the admin user.                                                              |

#### Notes

- Ensure `DATABASE_URL` is set before running Prisma validation to avoid failures.
- For migration-based development, use `npm run db:migrate`.
- After setting up the database, bootstrap admin access by logging in and updating your user role to `ADMIN` in the database.
- In non-production environments, if no payment provider is configured, the app can return a mock checkout success URL after creating an order.
- Before launching, run `npm run lint` and `npm run build` to verify the code.
- For production, use strong, production-only secrets and update all URLs to the production domain.
- Perform a full smoke test to ensure all features work as expected in production.

### `tailwind.config.ts`

#### Module Overview

This file configures Tailwind CSS for our project. It specifies which files to scan for class names, defines the theme's custom extensions, and sets up the foundational styles.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `Config` | Type definition from `tailwindcss` to define the configuration structure. |

#### Configuration

| Configuration | Description |
| --- | --- |
| `content` | Specifies the file paths to scan for Tailwind CSS classes. Includes all `.ts` and `.tsx` files in `src/app`, `src/components`, and `emails` directories. |
| `theme.extend` | Allows for extending the default Tailwind CSS theme with custom values. Here, it adds a custom sans-serif font family. |

#### Notes

- Ensure that all paths in `content` are updated if the project structure changes.
- Custom font families should be defined in the `theme.extend.fontFamily` section.
- Tailwind CSS classes used in the project must be included in the `content` array to be processed correctly.

### `tsconfig.json`

This file configures the TypeScript compiler for our project, specifying compiler options and file inclusions/exclusions.

#### Dependencies

- **TypeScript**: The primary dependency, used for compiling TypeScript code to JavaScript.

#### Configuration

| Setting | Purpose |
| --- | --- |
| `target` | Sets the ECMAScript target version. |
| `lib` | Specifies library files to include in the compilation. |
| `allowJs` | Allows JavaScript files to be compiled. |
| `skipLibCheck` | Skips type checking of all declaration files. |
| `strict` | Enables all strict type-checking options. |
| `noEmit` | Prevents the compiler from emitting output files. |
| `esModuleInterop` | Enables interoperability between CommonJS and ES Modules. |
| `module` | Sets the module code generation strategy. |
| `moduleResolution` | Specifies the module resolution strategy. |
| `resolveJsonModule` | Allows importing JSON modules. |
| `isolatedModules` | Treats each file as a separate module. |
| `jsx` | Sets the JSX code generation strategy. |
| `incremental` | Enables incremental compilation. |
| `plugins` | Adds custom compiler plugins. |
| `paths` | Defines custom module aliases. |

#### Notes

- `noEmit` is set to `true`, meaning the compiler won't generate JavaScript files, which is useful for type checking without output.
- `isolatedModules` ensures that each file is treated as a separate module, which can help with tree-shaking and module bundling.
- `paths` alias `@/*` to `./src/*`, simplifying imports within the project.

### `vitest.config.ts`

This file configures the Vitest testing framework for our project. It sets up the environment, specifies which files to include for testing, and enables coverage reporting.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `defineConfig` | Function from `vitest/config` to define the Vitest configuration. |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| N/A | N/A | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `defineConfig` | Configuration object | Vitest configuration object | Defines the configuration for Vitest tests. |

#### Configuration

| Setting | Value | Description |
| --- | --- | --- |
| `environment` | `"node"` | Specifies the testing environment as Node.js. |
| `include` | `["src/**/*.test.ts"]` | Includes all test files in the `src` directory and its subdirectories. |
| `clearMocks` | `true` | Clears mocks between each test to prevent state leakage. |
| `coverage` | | Configures code coverage reporting. |
| `provider` | `"v8"` | Uses the V8 engine for coverage. |
| `reporter` | `["text", "lcov"]` | Reports coverage in text and LCOV formats. |

#### Notes

- Ensure that all test files follow the `*.test.ts` naming convention to be included in the test suite.
- The coverage reports will be generated in the default output directory specified by Vitest.
- Adjust the `coverage` settings if you need different reporting formats or coverage providers.

### `docs/backend-api.md`

##### CodeSell Backend API Documentation

This document describes the server APIs implemented in the Next.js app router.

#### Base URL

- Local: `http://localhost:3000`
- Production: `https://your-domain.com`

---

#### Dependencies

| Import | Purpose |
| --- | --- |
| `Auth.js` | Handles GitHub OAuth for authentication |
| `stripe` | Stripe API client for payment processing |
| `razorpay` | Razorpay API client for payment processing |
| `WebhookEvent` | Database table for handling webhook idempotency |

---

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `WebhookEvent` | Database table for handling webhook idempotency | `create`, `findByIdempotencyKey` |

---

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `GET /api/auth/[...nextauth]` | N/A | Authentication status | Handles sign in with GitHub, session retrieval, and sign out |
| `GET /api/health` | N/A | JSON health status | Returns the health status of the app and database |
| `GET /api/admin/products` | N/A | JSON product list | Lists products (admin only) |
| `POST /api/admin/products` | JSON product data | JSON product object | Creates a product (admin only) |
| `GET /api/admin/products/[id]` | Product ID | JSON product object | Fetches a single product (admin only) |
| `PATCH /api/admin/products/[id]` | Product ID, JSON product data | JSON product object | Updates a single product (admin only) |
| `DELETE /api/admin/products/[id]` | Product ID | N/A | Deletes a single product (admin only) |
| `POST /api/orders/create` | JSON product IDs | JSON payment session details | Creates a new order and payment session |
| `POST /api/orders/[id]/retry-collab` | Order ID | N/A | Retries collaborator invite delivery for failed order fulfillment |
| `POST /api/webhooks/stripe` | Stripe webhook payload | N/A | Processes Stripe events |
| `POST /api/webhooks/razorpay` | Razorpay webhook payload | N/A | Processes Razorpay events |

---

#### Configuration

- **Provider Scopes**: `read:user`, `user:email`
- **Session Required**: For protected checkout/admin APIs

---

#### Notes

- Ensure all products exist, are active, and share one currency when creating an order.
- User cannot repurchase a previously paid product, which returns a `409` status.
- Stripe and Razorpay webhooks include signature verification and idempotency handling.
- Error codes `400`, `401`, `403`, `404`, `409`, `500`, and `503` are used for various failure scenarios.

### `docs/backend-testing.md`

##### CodeSell Backend Testing Guide

#### Module Overview

This document outlines the steps to test the backend of the CodeSell application, ensuring all components function correctly and securely.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `dotenv` | Loads environment variables from `.env.local`. |
| `prisma` | Interacts with the database. |
| `axios` | Makes HTTP requests for webhook testing. |
| `stripe` | Handles Stripe webhook events. |
| `jq` | Parses JSON output for curl commands. |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| N/A | N/A | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| N/A | N/A | N/A | N/A |

#### Configuration

Ensure the `.env.local` file is correctly configured with database, authentication, and payment provider details.

#### Notes

- Always run `npm run db:setup` before starting tests to ensure the database is in the correct state.
- Use the browser's developer tools to inspect network requests when testing authentication and protected routes.
- When testing webhooks, ensure the local server is running and accessible at `http://localhost:3000`.
- For email checks, verify log messages if the email key is missing in the development environment.

### `docs/test-coverage-analysis.md`

##### Test Coverage Analysis (CodeSell)

#### Module Overview

This document outlines the current state of test coverage for the CodeSell project, detailing the automated tests added, the results of the coverage run, and the remaining high-priority gaps that need attention.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `jest` | Framework for running and managing tests |
| `supertest` | HTTP assertions for testing Express apps |
| `jest-fetch-mock` | Mocking fetch API calls |
| `dotenv` | Loading environment variables from a `.env` file |

#### Classes

No classes are defined in this document.

#### Functions

No specific functions are detailed in this document.

#### Configuration

The test coverage is run using the command:

```bash
npm run test:coverage
```

#### Notes

- The current test coverage is high, but there are still significant areas without integration-level tests.
- Future work should focus on adding integration tests for API routes, fulfillment workflows, admin routes, and webhook idempotency.
- Ensure to mock external providers and use a test database to avoid side effects during testing.

### `emails/AdminAlert.tsx`

##### Module Overview

The `emails/AdminAlert.tsx` file defines a React component for generating an email notification when there's a failure in delivering an order. This email alerts the admin to manually review the issue.

#### Dependencies

| Import | Purpose |
|--------|---------|
| `@react-email/components` | Provides React components for building emails. |

#### Classes

| Class | Purpose | Key Methods |
|-------|---------|-------------|
| `AdminAlertEmail` | Generates the email content for an admin alert. | N/A |

#### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `AdminAlertEmail` | `orderId: string`, `error: string`, `products: Array<{ name: string; repoUrl: string }>` | JSX for the email | Renders the email content with order details and error information. |

#### Configuration

No specific configuration is required for this file. The styles are defined inline within the component.

#### Notes

- The `orderId`, `error`, and `products` props are required for the email content.
- The `products` array should contain objects with `name` and `repoUrl` properties.
- Ensure the `repoUrl` is unique for each product to avoid key conflicts in the list.

### `emails/CollabInvite.tsx`

##### Module Overview

The `emails/CollabInvite.tsx` file defines a React component for generating an email template to notify users that their GitHub collaboration invite has been sent. This email includes the buyer's name and a list of products with links to their respective GitHub repositories.

##### Dependencies

| Import | Description |
|--------|-------------|
| `@react-email/components` | Provides React components for building email templates. |

##### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `CollabInviteEmail` | `{ buyerName: string, products: Array<{ name: string; repoUrl: string }> }` | JSX.Element | Renders an email template with the buyer's name and product links. |

##### Configuration

| Variable | Description |
|----------|-------------|
| `styles` | An object containing CSS styles for the email template. |

##### Notes

- The `CollabInviteEmail` function expects `buyerName` and `products` as props. `buyerName` is a string representing the buyer's name, and `products` is an array of objects, each containing `name` and `repoUrl` properties.
- The `products` array is mapped to generate a list of links within the email.
- Ensure that the `repoUrl` is unique for each product to avoid key conflicts in the rendered list.

### `emails/PurchaseConfirmation.tsx`

##### Module Overview

The `emails/PurchaseConfirmation.tsx` file defines a React component for generating a purchase confirmation email. This email informs the buyer that their payment has been received and provides details about the purchased products and the order ID.

##### Dependencies

| Import | Description |
| --- | --- |
| `@react-email/components` | Provides React components for building emails, such as `Html`, `Head`, `Body`, `Container`, `Heading`, `Text`, `Preview`, `Section`, and `Link`. |

##### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `PurchaseConfirmationEmail` | `buyerName: string`, `products: Array<{ name: string; repoUrl: string }>`, `orderId: string` | JSX element | Renders the purchase confirmation email with the provided buyer name, products, and order ID. |

##### Configuration

| Variable | Description |
| --- | --- |
| `styles` | An object containing CSS styles for various elements in the email. |

##### Notes

- The `products` array should contain objects with `name` and `repoUrl` properties.
- The `Link` component is used to create clickable links to the product repositories.
- The email layout is styled to ensure readability and a consistent look across different email clients.

### `nitinog10-Codesell-e6af67a/.env.example`

##### Module Overview

This file, `.env.example`, serves as a template for environment variables that configure the application's settings. It includes placeholders for sensitive information such as API keys, database credentials, and secrets required for authentication and third-party integrations.

##### Dependencies

No direct dependencies are listed here as this file contains plain text environment variables.

##### Configuration

| Variable | Purpose | Example Value |
|----------|---------|---------------|
| NEXT_PUBLIC_APP_URL | Public URL for the application | `http://localhost:3000` |
| NEXTAUTH_URL | URL for NextAuth.js configuration | `http://localhost:3000` |
| AUTH_SECRET | Secret key for authentication | `replace-with-a-random-32-character-secret` |
| NEXTAUTH_SECRET | Secret key for NextAuth.js | `replace-with-a-random-32-character-secret` |
| DATABASE_URL | URL for the PostgreSQL database | `postgresql://user:pass@host/dbname?sslmode=require` |
| GITHUB_CLIENT_ID | GitHub OAuth client ID | `replace-with-github-oauth-client-id` |
| GITHUB_CLIENT_SECRET | GitHub OAuth client secret | `replace-with-github-oauth-client-secret` |
| GITHUB_SELLER_PAT | GitHub Personal Access Token for the seller | `replace-with-seller-fine-grained-pat` |
| GITHUB_SELLER_USERNAME | GitHub username for the seller | `replace-with-seller-github-username` |
| PAYMENT_PROVIDER | Payment provider service | `stripe` |
| STRIPE_SECRET_KEY | Stripe secret key | `sk_test_replace` |
| STRIPE_PUBLISHABLE_KEY | Stripe publishable key | `pk_test_replace` |
| STRIPE_WEBHOOK_SECRET | Stripe webhook secret | `whsec_replace` |
| RAZORPAY_KEY_ID | Razorpay key ID | `rzp_test_replace` |
| RAZORPAY_KEY_SECRET | Razorpay key secret | `replace-with-razorpay-secret` |
| RAZORPAY_WEBHOOK_SECRET | Razorpay webhook secret | `replace-with-razorpay-webhook-secret` |
| RESEND_API_KEY | Resend API key | `re_replace` |
| EMAIL_FROM | Default email address for sending emails | `CodeSell <delivered@codesell.dev>` |
| ADMIN_EMAIL | Admin email address | `owner@example.com` |
| ENCRYPTION_KEY | Encryption key for data protection | `replace-with-64-hex-characters` |

##### Notes

- All placeholder values should be replaced with actual credentials and keys before deploying the application.
- Sensitive information should never be hard-coded in the source code to avoid security risks.
- This file is intended to be copied as `.env` and filled with real values for production use.
- Ensure environment variables are correctly set in the deployment environment to avoid configuration issues.

### `nitinog10-Codesell-e6af67a/README.md`

##### nitinog10/Codesell — Documentation

#### Module Overview

This repository is a full-stack web application built using Next.js, TypeScript, and Prisma. It facilitates the buying and selling of code repositories, with features for user authentication, admin management, and payment processing via Stripe and Razorpay.

#### Dependencies

##### Major Libraries

| Library              | Purpose                                                                                           | Version Constraint | Type       |
|----------------------|---------------------------------------------------------------------------------------------------|--------------------|------------|
| Next.js              | React framework for production.                                                                   | `^15.3.3`          | Production |
| React                | JavaScript library for building user interfaces.                                                  | `^19.0.0`          | Production |
| React-DOM            | DOM bindings for React.                                                                           | `^19.0.0`          | Production |
| Prisma               | ORM for Node.js and TypeScript.                                                                   | `^6.8.2`           | Production |
| Tailwind CSS         | Utility-first CSS framework for rapidly building custom designs.                                  | `^4.1.8`           | Production |
| TypeScript           | Typed superset of JavaScript that compiles to plain JavaScript.                                   | `^5.7.2`           | Development|
| ESLint               | Tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.               | `^9.17.0`          | Development|
| @auth/prisma-adapter | Adapter for using Prisma with NextAuth.js.                                                        | `^2.10.0`          | Production |
| @octokit/rest        | REST client for the GitHub API.                                                                   | `^21.1.1`          | Production |
| @prisma/client       | Prisma Client for database access.                                                                | `^6.8.2`           | Production |
| @radix-ui/react-slot | Component for rendering children with specific props.                                             | `^1.1.1`           | Production |
| @react-email/components | Components for building email templates with React.                                           | `^0.0.38`          | Production |
| class-variance-authority | Utility for managing class names in a type-safe way.                                         | `^0.7.1`           | Production |
| clsx                 | Utility for constructing className strings conditionally.                                         | `^2.1.1`           | Production |
| lucide-react         | React icons based on Lucide.                                                                       | `^0.468.0`         | Production |
| next-auth            | Authentication for Next.js applications.                                                          | `^5.0.0-beta.28`   | Production |
| resend               | Library for sending emails.                                                                       | `^4.5.1`           | Production |
| stripe               | Library for handling payments.                                                                    | `^17.7.0`          | Production |
| tailwind-merge       | Utility for merging Tailwind CSS classes.                                                         | `^2.6.0`           | Production |
| zod                  | TypeScript-first schema declaration and validation library.                                       | `^3.24.1`          | Production |

##### Development Dependencies

| Library                  | Purpose                                                                                       | Version Constraint | Type       |
|--------------------------|-----------------------------------------------------------------------------------------------|--------------------|------------|
| @eslint/eslintrc         | ESLint configuration for TypeScript projects.                                                 | `^3.3.1`           | Development|
| @tailwindcss/postcss     | PostCSS plugin for Tailwind CSS.                                                              | `^4.1.8`           | Development|
| @types/node              | TypeScript definitions for Node.js.                                                           | `^22.10.2`         | Development|
| @types/react             | TypeScript definitions for React.                                                             | `^19.0.2`          | Development|
| @types/react-dom         | TypeScript definitions for React DOM.                                                         | `^19.0.2`          | Development|
| eslint-config-next       | ESLint configuration for Next.js.                                                             | `^15.3.3`          | Development|
| tsx                      | TypeScript version of Babel's `ts-node`.                                                       | `^4.19.2`          | Development|

#### Folder Structure

```
├──.env.example
├── README.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── plan.md
├── postcss.config.mjs
├── setup.md
├── tailwind.config.ts
├── tsconfig.json
├── emails/
│   ├── AdminAlert.tsx
│   ├── CollabInvite.tsx
│   └── PurchaseConfirmation.tsx
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── src/
    ├── middleware.ts
    ├── app/
    │   ├── error.tsx
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── loading.tsx
    │   ├── not-found.tsx
    │   ├── page.tsx
    │   ├── robots.ts
    │   ├── sitemap.ts
    │   ├── admin/
    │   │   ├── page.tsx
    │   │   ├── orders/
    │   │   │   └── page.tsx
    │   │   └── products/
    │   │       ├── page.tsx
    │   │       ├── [id]/
    │   │       │   └── edit/
    │   │       │       └── page.tsx
    │   │       └── new/
    │   │           └── page.tsx
    │   ├── api/
    │   │   ├── admin/
    │   │   │   └── products/
    │   │   │       ├── route.ts
    │   │   │       └── [id]/
    │   │   │           └── route.ts
    │   │   ├── auth/
    │   │   │   └── [...nextauth]/
    │   │   │       └── route.ts
    │   │   ├── orders/
    │   │   │   ├── [id]/
    │   │   │   │   └── retry-collab/
    │   │   │   │       └── route.ts
    │   │   │   └── create/
    │   │   │       └── route.ts
    │   │   └── webhooks/

### `nitinog10-Codesell-e6af67a/eslint.config.mjs`

This file configures ESLint for the project, setting up the rules and extensions to ensure consistent code quality across the codebase.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `FlatCompat` | Provides compatibility for ESLint configuration. |
| `dirname` | Retrieves the directory name from a file path. |
| `fileURLToPath` | Converts a URL to a file path. |

#### Configuration

| Configuration | Purpose |
| --- | --- |
| `ignores` | Specifies directories and files that ESLint should ignore. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `fileURLToPath` | `import.meta.url` | `string` | Converts a URL to a file path. |

#### Notes

- The `FlatCompat` instance is used to extend ESLint configurations from `next/core-web-vitals` and `next/typescript`.
- The `ignores` array lists directories and files that should not be linted.
- This configuration ensures that only relevant files are linted, improving efficiency and avoiding unnecessary errors from ignored directories.

### `nitinog10-Codesell-e6af67a/next-env.d.ts`

##### Module Overview

The `nitinog10-Codesell-e6af67a/next-env.d.ts` file provides TypeScript type definitions for the Next.js framework and its related components. It ensures that TypeScript can correctly understand and type-check the Next.js environment and its routes.

##### Dependencies

| Import | Purpose |
| --- | --- |
| `next` | Provides type definitions for Next.js core functionalities. |
| `next/image-types/global` | Adds type definitions for image-related features in Next.js. |
| `./.next/types/routes.d.ts` | Supplies type definitions for Next.js routes. |

##### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| N/A | N/A | N/A |

##### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| N/A | N/A | N/A | N/A |

##### Configuration or Constants

| Constant | Purpose |
| --- | --- |
| N/A | N/A |

##### Notes

- This file should not be edited directly. It is auto-generated and relies on Next.js documentation for its type definitions.
- For more information, refer to the [Next.js TypeScript documentation](https://nextjs.org/docs/app/api-reference/config/typescript).

### `nitinog10-Codesell-e6af67a/next.config.ts`

#### Module Overview

This file configures the Next.js application for experimental features, specifically enabling server actions with a custom body size limit.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `NextConfig` | Type definition for Next.js configuration. |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `NextConfig` | Represents the Next.js configuration object. | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `nextConfig` | None | `NextConfig` | Configuration object enabling experimental server actions with a custom body size limit. |

#### Configuration

| Setting | Value | Description |
| --- | --- | --- |
| `experimental.serverActions.bodySizeLimit` | `"2mb"` | Sets the maximum body size limit for server actions to 2MB. |

#### Notes

- The `bodySizeLimit` setting is part of Next.js experimental features and may change or be removed in future versions.
- Ensure that the server can handle the specified body size limit to avoid errors during runtime.

### `nitinog10-Codesell-e6af67a/package.json`

##### `package.json` Documentation

This file defines the project's metadata, dependencies, and scripts for managing the `codesell` application.

#### Dependencies

| Dependency | Purpose |
|------------|---------|
| `@auth/prisma-adapter` | Adapter for integrating Auth.js with Prisma. |
| `@octokit/rest` | REST client for interacting with GitHub API. |
| `@prisma/client` | Prisma client for database interactions. |
| `@radix-ui/react-slot` | UI components for React. |
| `@react-email/components` | Components for building emails with React. |
| `class-variance-authority` | Utility for managing class names in React. |
| `clsx` | Utility for conditionally joining class names. |
| `lucide-react` | React icons library. |
| `next` | Framework for building React applications. |
| `next-auth` | Authentication solution for Next.js apps. |
| `react` | Library for building user interfaces. |
| `react-dom` | DOM library for React. |
| `resend` | Library for sending emails. |
| `stripe` | Library for handling payments. |
| `tailwind-merge` | Utility for merging Tailwind CSS classes. |
| `zod` | Schema validation library. |

#### Scripts

| Script | Description |
|--------|-------------|
| `dev` | Starts the development server. |
| `build` | Builds the application for production. |
| `start` | Starts the production server. |
| `lint` | Runs ESLint to check for code quality. |
| `db:generate` | Generates Prisma client. |
| `db:push` | Pushes database schema changes. |
| `db:migrate` | Runs database migrations. |
| `db:seed` | Seeds the database with initial data. |
| `postinstall` | Generates Prisma client after installing dependencies. |
| `db:setup` | Validates, pushes, and seeds the database. |
| `test` | Runs tests. |
| `test:coverage` | Runs tests and generates coverage report. |

#### Prisma Configuration

| Key | Value |
|-----|-------|
| `seed` | Specifies the script to run for seeding the database. |

#### Notes

- Ensure you run `prisma generate` after adding or modifying the schema to update the Prisma client.
- The `db:setup` script is useful for setting up the database in a fresh environment.
- The `test:coverage` script is helpful for checking test coverage and ensuring code quality.

### `nitinog10-Codesell-e6af67a/plan.md`

##### CodeSell MVP Implementation Plan

#### Module Overview

This document outlines the implementation plan for CodeSell, an e-commerce platform for selling source code with GitHub-native authentication and automated repository access delivery.

#### Dependencies

- **Next.js**: Full-stack framework for SSR, API routes, and edge-ready deployment.
- **TypeScript**: Type safety across the stack.
- **Tailwind CSS + shadcn/ui**: Rapid, consistent, and beautiful UI.
- **NextAuth.js**: GitHub OAuth with zero boilerplate.
- **Prisma**: Type-safe queries, migrations, and schema-first database ORM.
- **Octokit.js**: Official GitHub SDK for collaborator management.
- **Resend + React Email**: Transactional emails with React templates.
- **Vercel**: Git-push deploys, edge functions, and preview URLs.

#### Classes

| Class | Purpose | Key Methods |
|---|---|---|
| `User` | Represents a user in the system | `create`, `update`, `getByGitHubId` |
| `Product` | Represents a product (source code) for sale | `create`, `update`, `getBySlug` |
| `Order` | Represents an order placed by a buyer | `create`, `updateStatus`, `getById` |
| `OrderItem` | Represents an item within an order | `create`, `getByOrderId` |

#### Functions

| Function | Parameters | Returns | Description |
|---|---|---|---|
| `loginWithGitHub` | `code: string` | `Promise<User>` | Handles GitHub OAuth login flow |
| `createOrder` | `products: Product[], userId: string` | `Promise<Order>` | Creates a new order for the given products |
| `processPayment` | `orderId: string` | `Promise<void>` | Processes the payment for the given order |
| `addCollaborator` | `order: Order` | `Promise<void>` | Adds the buyer as a collaborator to the purchased repository |
| `sendEmail` | `type: string, data: any` | `Promise<void>` | Sends an email based on the given type and data |

#### Configuration

- **GitHub OAuth App scopes**: `read:user`, `user:email`
- **Seller's GitHub account**: Uses a Personal Access Token (PAT) with `repo` + `admin:org` scope

#### Constants

- **Permission Levels**:
  - `pull`: Read-only access (clone, fetch, view code)
  - `push`: Read + Write access (NOT used)
  - `admin`: Full control (NOT used)

#### Notes

- The `addCollaborator` function uses the seller's GitHub PAT to add collaborators. This is separate from buyer tokens.
- Webhook security includes verifying Stripe and Razorpay signatures, idempotency checks, and retry logic for GitHub API failures.
- The database schema uses Prisma for type-safe queries and migrations.

### `nitinog10-Codesell-e6af67a/postcss.config.mjs`

#### Module Overview

This file configures PostCSS for the project, specifically integrating Tailwind CSS. It sets up the necessary plugins to process and apply Tailwind CSS styles during the build process.

#### Dependencies

- `@tailwindcss/postcss`: This plugin integrates Tailwind CSS with PostCSS, allowing for the use of Tailwind's utility-first CSS classes in the project.

#### Configuration

| Configuration | Purpose |
|---------------|---------|
| `plugins` | Specifies the PostCSS plugins to use. |

#### Notes

- This configuration is minimal, relying on Tailwind CSS to handle all necessary transformations.
- Ensure that Tailwind CSS is installed and configured in the project for this to work correctly.

### `nitinog10-Codesell-e6af67a/setup.md`

##### CodeSell Setup Guide

#### Module Overview

This file provides a step-by-step guide to set up the CodeSell application locally and prepare it for production deployment. It covers dependency installation, environment configuration, database setup, and service integration.

#### Dependencies

- Node.js 22 or newer
- npm 11 or newer
- PostgreSQL database (e.g., Neon)
- GitHub OAuth app
- GitHub seller Personal Access Token
- Stripe or Razorpay account
- Resend account for transactional email

#### Configuration

##### Environment Variables
Key environment variables required for local and production setup:

Variable | Description
---------|------------
`NEXT_PUBLIC_APP_URL` | Public URL of the app
`NEXTAUTH_URL` | URL for NextAuth
`AUTH_SECRET` | Secret for authentication
`NEXTAUTH_SECRET` | Secret for NextAuth
`DATABASE_URL` | PostgreSQL database URL
`ENCRYPTION_KEY` | Encryption key for sensitive data
`GITHUB_CLIENT_ID` | GitHub OAuth client ID
`GITHUB_CLIENT_SECRET` | GitHub OAuth client secret
`GITHUB_SELLER_PAT` | GitHub seller Personal Access Token
`GITHUB_SELLER_USERNAME` | GitHub seller username
`PAYMENT_PROVIDER` | Payment provider (stripe or razorpay)
`STRIPE_SECRET_KEY` | Stripe secret key
`STRIPE_PUBLISHABLE_KEY` | Stripe publishable key
`STRIPE_WEBHOOK_SECRET` | Stripe webhook secret
`RAZORPAY_KEY_ID` | Razorpay key ID
`RAZORPAY_KEY_SECRET` | Razorpay key secret
`RAZORPAY_WEBHOOK_SECRET` | Razorpay webhook secret
`RESEND_API_KEY` | Resend API key
`EMAIL_FROM` | Email sender address
`ADMIN_EMAIL` | Admin email address

#### Notes

- Ensure `DATABASE_URL` is configured before running Prisma validation to avoid failures.
- For local development, if no payment provider is configured, the app returns a mock checkout success URL.
- In production, use strong, unique secrets for `AUTH_SECRET`, `NEXTAUTH_SECRET`, and `ENCRYPTION_KEY`.
- Perform a full smoke test before launching to ensure all features work as expected.

### `nitinog10-Codesell-e6af67a/tailwind.config.ts`

#### Module Overview

This file defines the configuration for Tailwind CSS in our project. It specifies which files to scan for classes and sets up the theme's customizations.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `Config` | Type definition for Tailwind CSS configuration. |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| N/A | N/A | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `config` | N/A | `Config` | The main Tailwind CSS configuration object. |

#### Configuration

| Setting | Value | Purpose |
| --- | --- | --- |
| `content` | `["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./emails/**/*.{ts,tsx}"]` | Specifies the files Tailwind should scan for classes. |
| `theme.extend.fontFamily.sans` | `["var(--font-sans)", "Arial", "sans-serif"]` | Extends the default font family to include a custom variable and fallbacks. |

#### Notes

- The `content` array includes all `.ts` and `.tsx` files in the `src/app`, `src/components`, and `emails` directories.
- The `theme.extend.fontFamily` customization allows us to use a CSS variable for the primary font, with fallbacks to Arial and generic sans-serif.

### `nitinog10-Codesell-e6af67a/tsconfig.json`

This `tsconfig.json` file configures the TypeScript compiler for the `nitinog10-Codesell-e6af67a` project. It sets compiler options and specifies which files to include and exclude from compilation.

#### Dependencies

- **TypeScript**: The primary dependency, used for compiling TypeScript files.
- **Next Plugin**: A custom plugin named `next` for additional compilation features.

#### Configuration

| Setting | Purpose | Details |
|---------|---------|---------|
| `target` | JavaScript version | ES2017 |
| `lib` | Library files | dom, dom.iterable, esnext |
| `allowJs` | Allow JavaScript files | false |
| `skipLibCheck` | Skip type checking of all declaration files | true |
| `strict` | Enable all strict type-checking options | true |
| `noEmit` | Do not emit output files | true |
| `esModuleInterop` | Enables emit interoperability between CommonJS and ES Modules | true |
| `module` | Module code generation | esnext |
| `moduleResolution` | Module resolution preference | bundler |
| `resolveJsonModule` | Allow importing.json files | true |
| `isolatedModules` | Treat each file as a separate module | true |
| `jsx` | JSX code generation | preserve |
| `incremental` | Enable incremental compilation | true |
| `paths` | Module aliases | "@/*" maps to "./src/*" |

#### Notes

- `noEmit: true` means the compiler will not generate JavaScript files, useful for type checking without output.
- `resolveJsonModule: true` allows importing `.json` files as modules.
- `isolatedModules: true` ensures each file is treated as a separate module, which can help with tree-shaking and module bundling.
- The `paths` setting provides a convenient alias `@/*` for easier imports within the project.

### `nitinog10-Codesell-e6af67a/vitest.config.ts`

##### Module Overview

This file, `nitinog10-Codesell-e6af67a/vitest.config.ts`, configures the Vitest testing framework for our project. It sets up the environment, specifies which files to include in tests, and enables coverage reporting.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `defineConfig` | A function from `vitest/config` to define the Vitest configuration. |

#### Configuration

| Setting | Purpose |
| --- | --- |
| `environment` | Sets the testing environment to `node`. |
| `include` | Specifies the pattern for test files to include (`src/**/*.test.ts`). |
| `clearMocks` | Clears mocks between tests to avoid side effects. |
| `coverage` | Enables coverage reporting with the V8 provider and `text` and `lcov` reporters. |

#### Notes

- Ensure that all test files follow the `*.test.ts` naming convention to be included in the test suite.
- Coverage reports will be generated in both text and LCOV formats, useful for integration with CI tools.

### `nitinog10-Codesell-e6af67a/docs/backend-api.md`

##### CodeSell Backend API Documentation

This document outlines the server APIs implemented in the Next.js app router, detailing endpoints, request/response formats, and error handling.

#### Base URL

- Local: `http://localhost:3000`
- Production: `https://your-domain.com`

#### Dependencies

| Import | Purpose |
| --- | --- |
| `next-auth` | Authentication handling |
| `stripe` | Payment processing |
| `razorpay` | Alternative payment processing |
| `express` | Web server framework |
| `jsonwebtoken` | JWT handling for sessions |

#### Auth APIs

| Endpoint | Method | Parameters | Returns | Description |
| --- | --- | --- | --- | --- |
| `/api/auth/[...nextauth]` | `GET/POST` | N/A | JSON | Sign in with GitHub, session retrieval, and sign out |

#### Health

| Endpoint | Method | Parameters | Returns | Description |
| --- | --- | --- | --- | --- |
| `/api/health` | `GET` | N/A | JSON | Returns app/database health status |

#### Products (Admin)

| Endpoint | Method | Parameters | Returns | Description |
| --- | --- | --- | --- | --- |
| `/api/admin/products` | `GET` | N/A | JSON list | List products (admin only) |
| `/api/admin/products` | `POST` | JSON body | JSON | Create product (admin only) |
| `/api/admin/products/[id]` | `GET` | N/A | JSON | Fetch one product (admin only) |
| `/api/admin/products/[id]` | `PATCH` | JSON body | JSON | Update one product (admin only) |
| `/api/admin/products/[id]` | `DELETE` | N/A | JSON | Delete one product (admin only) |

#### Orders

| Endpoint | Method | Parameters | Returns | Description |
| --- | --- | --- | --- | --- |
| `/api/orders/create` | `POST` | JSON body | JSON | Create a new order and payment session/order |
| `/api/orders/[id]/retry-collab` | `POST` | N/A | JSON | Retries collaborator invite delivery for failed order fulfillment |

#### Webhooks

| Endpoint | Method | Parameters | Returns | Description |
| --- | --- | --- | --- | --- |
| `/api/webhooks/stripe` | `POST` | JSON body | JSON | Processes Stripe events |
| `/api/webhooks/razorpay` | `POST` | JSON body | JSON | Processes Razorpay events |

#### Error Codes Quick Reference

- `400` Invalid payload / signature
- `401` Not authenticated
- `403` Authenticated but unauthorized (admin routes)
- `404` Product/order not found
- `409` Duplicate purchase attempt
- `500` Misconfiguration / processing failure
- `503` Database unavailable

#### Notes

- Ensure all API endpoints requiring authentication check for valid GitHub sessions.
- Always validate request bodies to prevent malformed data.
- Handle errors gracefully and return meaningful error messages to the client.

### `nitinog10-Codesell-e6af67a/docs/backend-testing.md`

##### CodeSell Backend Testing Guide

#### Module Overview

This file provides a comprehensive guide for backend testing of the CodeSell application. It outlines the necessary steps to ensure the backend is functioning correctly, including setup, static checks, health checks, authentication, order flows, webhook tests, and fulfillment checks.

#### Dependencies

- **`npm run db:setup`**: Sets up the database and seeds it with initial data.
- **`npm run dev`**: Starts the development server.
- **`npm run lint`**: Runs linter to check code quality.
- **`npm run build`**: Builds the project.
- **`npx prisma validate`**: Validates the Prisma schema.
- **`curl`**: Used for making HTTP requests.
- **`jq`**: Parses JSON output from curl.
- **`stripe` CLI**: Used for testing Stripe webhooks.

#### Classes

| Class | Purpose | Key Methods |
|-------|---------|-------------|
| N/A   | N/A     | N/A         |

#### Functions

| Function | Parameters | Returns | Description |
|----------|------------|----------|-------------|
| N/A      | N/A        | N/A      | N/A         |

#### Configuration

- **Environment Variables**: Ensure `.env.local` is configured with the necessary database, authentication, and payment details.

#### Notes

- Ensure the database is reachable before running tests.
- When testing webhooks, verify the order status and webhook event processing in the database.
- For email checks, confirm the logs show `[email skipped]` if the email key is missing in development.

---

#### 1) Prerequisites

- `.env.local` configured (database + auth + payment)
- Database schema applied
- Seeded products

```bash
npm run db:setup
npm run dev
```

---

#### 2) Static checks

```bash
npm run lint
npm run build
npx prisma validate
```

---

#### 3) Health check

```bash
curl -s http://localhost:3000/api/health | jq
```

Expected:
- `status: "ok"` when DB is reachable
- `status: "degraded"` if DB URL missing

---

#### 4) Auth/session check

1. Open `http://localhost:3000/auth/signin`
2. Sign in with GitHub
3. In browser devtools, verify authenticated requests to protected routes succeed (`/dashboard`, `/admin` for admin users)

---

#### 5) Checkout/order flow

##### A. Create order (via UI)
1. Go to `/products`
2. Purchase one product
3. Verify redirect to provider checkout/mock URL

##### B. Duplicate purchase guard
1. Complete payment for product A
2. Attempt to buy product A again
3. Expect HTTP `409` and a duplicate purchase message from `/api/orders/create`

---

#### 6) Stripe webhook test (recommended)

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

#### 7) Razorpay webhook test

- Configure webhook URL: `http://localhost:3000/api/webhooks/razorpay`
- Send `payment.captured` / `order.paid` test events
- Verify order state transitions and webhook event persistence

---

#### 8) Fulfillment + email checks

After successful payment webhook:
- Buyer gets purchase confirmation + collaborator invite notice
- Admin gets alert on delivery failure
- Order detail in dashboard reflects collab status

If email key is missing in development, confirm logs show `[email skipped]` messages.

---

#### 9) Suggested regression checklist

- [ ] Health endpoint returns expected states
- [ ] Product CRUD (admin) works
- [ ] Order creation validates payload and currency
- [ ] Duplicate purchase returns `409`
- [ ] Stripe webhook updates paid/refunded states correctly
- [ ] Razorpay webhook updates paid state correctly
- [ ] Collaborator invite retry endpoint works
- [ ] Dashboard order status matches DB values

### `nitinog10-Codesell-e6af67a/docs/test-coverage-analysis.md`

##### Module Overview

This document outlines the current state of test coverage for the CodeSell project, detailing the automated tests added, the coverage results, and the remaining high-priority gaps that need attention. It serves as a guide for understanding the testing landscape and prioritizing future test development.

#### Dependencies

- **Jest**: A JavaScript testing framework used to run and report on the test suite.
- **Supertest**: A library for testing HTTP servers, used here for API route testing.
- **TypeScript**: The programming language in which the tests are written.

#### Classes

| Class | Purpose | Key Methods |
|-------|---------|-------------|
| N/A | N/A | N/A |

#### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| N/A | N/A | N/A | N/A |

#### Configuration

- **`npm run test:coverage`**: The command to execute the test suite and generate coverage reports.

#### Constants

- **N/A**

#### Notes

- The current test suite focuses on unit tests for utility functions and validators. 
- Integration tests for API routes with database interactions and webhook handling are still needed.
- Test coverage for admin routes and webhook idempotency is incomplete.
- Future work should prioritize these gaps to ensure robust test coverage across the application.

### `nitinog10-Codesell-e6af67a/emails/AdminAlert.tsx`

##### Module Overview

The `AdminAlert.tsx` file defines a React component for sending an email notification to administrators when an order delivery fails. This email includes details about the failed order, the error message, and a list of products involved.

##### Dependencies

| Import | Purpose |
| --- | --- |
| `@react-email/components` | Provides React components for building email templates. |

##### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `AdminAlertEmail` | `orderId: string`, `error: string`, `products: Array<{ name: string; repoUrl: string }>` | JSX Element | Renders an email with details about a failed order delivery. |

##### Configuration

The `styles` object defines CSS styles for the email layout, including colors, font sizes, and spacing.

##### Notes

- The `Link` component from `@react-email/components` is used to create clickable text links within the email.
- The `products` array is expected to contain objects with `name` and `repoUrl` properties.
- Ensure the `repoUrl` is a valid URL for the `Link` component to function correctly.
- The email's design is responsive to fit within a 560px wide container.

### `nitinog10-Codesell-e6af67a/emails/CollabInvite.tsx`

##### Module Overview

The `CollabInvite.tsx` file defines a React component for generating an email notification when a GitHub collaboration invite is sent. This email includes the buyer's name and links to the relevant repositories.

##### Dependencies

| Import | Purpose |
| --- | --- |
| `@react-email/components` | Provides React components for building email templates. |

##### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `CollabInviteEmail` | `buyerName: string` <br> `products: Array<{ name: string; repoUrl: string }>` | JSX Element | Renders an email template for a GitHub collaboration invite. |

##### Configuration

The `styles` object defines CSS styles for the email template, including colors, font sizes, and spacing.

##### Notes

- The `CollabInviteEmail` function expects `buyerName` and `products` as props. `products` should be an array of objects with `name` and `repoUrl` properties.
- Ensure the `repoUrl` is unique for each product to avoid key conflicts in the rendered list.
- The email template uses a fixed width container for better compatibility across email clients.

### `nitinog10-Codesell-e6af67a/emails/PurchaseConfirmation.tsx`

##### Module Overview

The `PurchaseConfirmation.tsx` file generates an email template for confirming a purchase made on CodeSell. It includes the buyer's name, a list of purchased products, and the order ID.

##### Dependencies

| Import | Description |
| --- | --- |
| `@react-email/components` | Provides React components for building email templates. |

##### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `PurchaseConfirmationEmail` | `buyerName: string`, `products: Array<{ name: string; repoUrl: string }>`, `orderId: string` | JSX Element | Renders the purchase confirmation email with the buyer's name, products, and order ID. |

##### Configuration

| Variable | Type | Description |
| --- | --- | --- |
| `styles` | `const` | Defines CSS styles for the email template. |

##### Notes

- The `products` array should contain objects with `name` and `repoUrl` properties.
- Ensure the `repoUrl` is a valid GitHub repository URL.
- The email template uses a fixed width container for better compatibility across email clients.

### `nitinog10-Codesell-e6af67a/prisma/schema.prisma`

##### nitin0g10-Codesell-e6af67a/prisma/schema.prisma

This file defines the database schema using Prisma, a next-generation ORM. It outlines the structure of the database, including tables, relationships, and constraints.

#### Dependencies

| Import | Purpose |
|--------|---------|
| `prisma-client-js` | Provides the Prisma client for interacting with the database. |

#### Models

| Model | Purpose |
|-------|---------|
| `User` | Represents a user in the system. |
| `Account` | Stores account information linked to a user. |
| `Session` | Manages session tokens for user authentication. |
| `VerificationToken` | Handles email verification tokens. |
| `Product` | Represents a product available for purchase. |
| `Order` | Manages orders placed by users. |
| `OrderItem` | Links products to orders. |
| `WebhookEvent` | Tracks events received from external providers. |

#### Enums

| Enum | Purpose |
|------|---------|
| `Role` | Defines user roles (BUYER, ADMIN). |
| `OrderStatus` | Tracks the status of an order (PENDING, PAID, FAILED, REFUNDED). |
| `CollabStatus` | Tracks the status of collaboration (PENDING, SENT, ACCEPTED, FAILED). |

#### Configuration

- **Generator**: Uses `prisma-client-js` for the Prisma client.
- **Datasource**: Connects to a PostgreSQL database using the `DATABASE_URL` from environment variables.

#### Notes

- All primary keys are auto-generated using `cuid()`.
- Unique constraints are applied to fields that require uniqueness, such as `email`, `githubId`, and `sessionToken`.
- Relationships between models are defined using foreign keys and relations.
- Indexes are added to frequently queried fields to improve performance.

### `nitinog10-Codesell-e6af67a/prisma/seed.ts`

##### `nitinog10-Codesell-e6af67a/prisma/seed.ts`

This file seeds the database with sample product data using Prisma.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `PrismaClient` from `@prisma/client` | Provides an interface to interact with the database. |
| `sampleProducts` from `../src/lib/sample-data` | Contains the sample data to be inserted into the database. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `main` | None | Promise<void> | Seeds the database with sample product data. |

#### Notes

- This script should be run once to seed the database with initial data.
- Ensure the database schema matches the structure of the `sampleProducts` data.
- Handle errors gracefully to avoid database connection leaks.

### `nitinog10-Codesell-e6af67a/src/middleware.ts`

##### Module Overview

This file defines middleware for handling authentication in specific routes. It checks for session cookies and redirects unauthenticated users to the sign-in page if they attempt to access protected routes.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `NextResponse, type NextRequest` | Provides the necessary types and functions to handle HTTP responses and requests in Next.js. |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| N/A | N/A | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `hasSessionCookie` | `request: NextRequest` | `boolean` | Checks if the request contains any of the session cookies indicating an authenticated user. |
| `middleware` | `request: NextRequest` | `NextResponse` | Redirects unauthenticated users to the sign-in page for protected routes. |

#### Configuration

| Key | Value | Description |
| --- | --- | --- |
| `matcher` | `["/dashboard/:path*", "/admin/:path*"]` | Specifies the routes where this middleware should be applied. |

#### Notes

- The `hasSessionCookie` function checks for multiple session cookie names to accommodate different authentication strategies.
- The middleware redirects users to `/auth/signin` with the `callbackUrl` parameter set to the original requested path.
- The `config` object ensures this middleware only runs for specified routes.

### `nitinog10-Codesell-e6af67a/src/app/error.tsx`

This file defines the `ErrorPage` component, which renders a user-friendly error message when a request fails. It provides options to retry the request or navigate back to the home page.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `Link` | Routing component from Next.js for client-side navigation. |
| `Button` | A UI component for rendering buttons. |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `ErrorPage` | Displays an error message and actions to retry or navigate home. | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `ErrorPage` | `reset` | N/A | Renders an error page with a retry button and a home link. |

#### Notes

- The `reset` function is called when the retry button is clicked, which should ideally re-invoke the failed request.
- The `Link` component navigates to the home page when clicked.
- The error message includes the generic text "Something broke" and a more detailed description of the failure.
- The styling classes are used to format the layout and appearance of the error page.

### `nitinog10-Codesell-e6af67a/src/app/globals.css`

##### Module Overview

The `nitinog10-Codesell-e6af67a/src/app/globals.css` file is the central repository for global CSS styles used throughout the application. It sets up the base styles, including font settings, color schemes, and layout rules, ensuring consistency across all components.

##### Dependencies

- **TailwindCSS**: A utility-first CSS framework that provides a set of pre-defined classes to style the application.

##### Classes

| Class | Purpose | Key Methods |
|-------|---------|-------------|
| `:root` | Defines global CSS variables for colors and fonts. | N/A |
| `*` | Applies `box-sizing: border-box` to all elements. | N/A |
| `html` | Ensures smooth scrolling behavior. | N/A |
| `body` | Sets the minimum height, margin, background color, text color, and font family for the entire document. | N/A |
| `a` | Removes default text decoration and inherits text color. | N/A |
| `img` | Ensures images are displayed as blocks and do not exceed their container width. | N/A |
| `button, input, textarea, select` | Ensures these elements inherit the font properties from their parent. | N/A |
| `::selection` | Changes the background and text color when text is selected. | N/A |
| `.content-grid` | Centers the content within a maximum width and adds margin. | N/A |
| `.prose-lite p` | Styles paragraphs within the `.prose-lite` class, setting margins and line height. | N/A |

##### Notes

- The CSS variables defined in `:root` are used throughout the stylesheet to maintain a consistent color scheme and typography.
- The `min-height: 100vh` on the `body` ensures the body takes up at least the full height of the viewport.
- The `scroll-behavior: smooth` on the `html` element provides a smooth scrolling effect when navigating to anchor links.
- The `.content-grid` class is designed to center content with a maximum width, ensuring a responsive layout.

### `nitinog10-Codesell-e6af67a/src/app/layout.tsx`

##### Module Overview

This file, `nitinog10-Codesell-e6af67a/src/app/layout.tsx`, defines the root layout component for the application. It wraps the entire application in HTML structure, including the Navbar and Footer components, and provides metadata for the application.

#### Dependencies

- **`Metadata`**: Type definition for metadata configuration.
- **`Navbar`**: Component for the application's navigation bar.
- **`Footer`**: Component for the application's footer.
- **`globals.css`**: Global styles for the application.

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| None | N/A | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `RootLayout` | `{ children: React.ReactNode }` | JSX.Element | Renders the root layout of the application, including the Navbar, children, and Footer. |

#### Configuration

- **`metadata`**: Contains metadata for the application, including title, description, and Open Graph settings.

#### Notes

- The `metadata` object is used to set the default title and description of the application, as well as Open Graph metadata for social sharing.
- The `RootLayout` component is responsible for rendering the main HTML structure of the application, including the Navbar and Footer components.

### `nitinog10-Codesell-e6af67a/src/app/loading.tsx`

##### Module Overview

The `nitinog10-Codesell-e6af67a/src/app/loading.tsx` file defines a functional component `Loading` that renders a loading spinner and placeholders to indicate that content is being loaded. This component provides a visual cue to users that the application is processing data in the background.

##### Dependencies

- **React**: The core library for building the component.
- **Tailwind CSS**: For styling the component elements.

##### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `Loading` | None | JSX element | Renders a loading indicator with a spinner and placeholders. |

##### Notes

- The `Loading` component is designed to be simple and lightweight, focusing solely on visual feedback during data loading.
- The spinner and placeholders are styled using Tailwind CSS classes for a clean, responsive design.
- This component can be used in any part of the application where asynchronous data fetching is in progress.

### `nitinog10-Codesell-e6af67a/src/app/not-found.tsx`

##### Module Overview

The `not-found.tsx` file defines a React component that renders a 404 error page. It provides users with a friendly message when a requested page is not found, along with a link to browse available products.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `Link` | A Next.js component for client-side navigation. |
| `Button` | A UI component from the project's UI library. |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| `NotFound` | Renders the 404 error page. | None |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `NotFound` | None | JSX element | Renders a 404 error message and a link to the product catalog. |

#### Notes

- The `Button` component wraps a `Link` to `/products` for navigation.
- The styling classes (`content-grid`, `py-20`, etc.) are utility classes for layout and spacing.
- This component assumes the existence of a `/products` route in the Next.js application.

### `nitinog10-Codesell-e6af67a/src/app/page.tsx`

##### `nitinog10-Codesell-e6af67a/src/app/page.tsx`

#### Module Overview

This file defines the `HomePage` component, which is the main entry point for the homepage of the Codesell application. It fetches featured products and displays them along with a call-to-action for browsing products and logging in.

#### Dependencies

| Import | Description |
| --- | --- |
| `Link` from `next/link` | Provides client-side navigation between pages. |
| `Button` from `@/components/ui/Button` | A styled button component. |
| `ProductCard` from `@/components/products/ProductCard` | A component to display individual product cards. |
| `getFeaturedProducts` from `@/lib/products` | A function to fetch featured products. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `HomePage` | None | JSX | Renders the homepage with featured products and navigation buttons. |

#### Notes

- The `HomePage` function is an `async` function, which means it returns a promise. This is necessary for the `await` keyword used to fetch featured products.
- The background image in the first section is set via inline styles. This is a static image URL from Unsplash.
- The `ProductCard` component is mapped over the `featuredProducts` array to display each product.
- The `Button` component uses the `asChild` prop to wrap the `Link` component, allowing for styled navigation links.
- Ensure that the `getFeaturedProducts` function is properly implemented and returns an array of product objects with an `id` property.

### `nitinog10-Codesell-e6af67a/src/app/robots.ts`

##### Module Overview

This file defines the `robots.ts` module, which generates the `robots.txt` file for the application. It specifies which pages search engines are allowed or disallowed from crawling, and includes the URL for the sitemap.

##### Dependencies

- `MetadataRoute` from `"next"` is imported to define the structure of the `robots.txt` file.

##### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `robots` | None | `MetadataRoute.Robots` | Generates the `robots.txt` file configuration. |

##### Notes

- The `baseUrl` is determined by the `NEXT_PUBLIC_APP_URL` environment variable or defaults to `http://localhost:3000`.
- Search engines are allowed to crawl the root (`/`) but are disallowed from crawling `/admin`, `/api`, and `/dashboard`.
- The sitemap URL is constructed using the `baseUrl`.

### `nitinog10-Codesell-e6af67a/src/app/sitemap.ts`

This file generates a sitemap for the application by combining static paths and dynamic product routes. It uses the `getProducts` function to fetch product data and constructs URLs for each product page.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `MetadataRoute` | Type definition for Next.js sitemap routes. |
| `getProducts` | Function to fetch product data from the backend. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `sitemap` | None | `Promise<MetadataRoute.Sitemap>` | Generates a sitemap with static paths and product pages. |

#### Notes

- The sitemap includes static paths like `/auth/signin` and `/dashboard`.
- Each product URL is dynamically generated using the slug from the product data.
- The `baseUrl` is determined from the environment variable `NEXT_PUBLIC_APP_URL` or defaults to `http://localhost:3000`.
- All entries have a `lastModified` date set to the current date.

### `nitinog10-Codesell-e6af67a/src/app/admin/page.tsx`

##### `nitinog10-Codesell-e6af67a/src/app/admin/page.tsx`

This file defines the `AdminPage` component, which is the entry point for the admin dashboard in the application. It displays key statistics and provides navigation links for managing products and orders.

#### Dependencies

| Import | Description |
| ------ | ----------- |
| `Link` from `next/link` | Provides client-side navigation capabilities. |
| `Metadata` from `next` | Defines metadata for the page. |
| `Button` from `@/components/ui/Button` | Custom button component for UI consistency. |
| `requireAdmin` from `@/lib/guards` | Middleware to ensure the user is an admin. |
| `getAdminStats` from `@/lib/orders` | Function to fetch admin statistics. |
| `formatMoney` from `@/lib/utils` | Utility to format monetary values. |

#### Functions

| Function | Parameters | Returns | Description |
| -------- | ---------- | ------- | ----------- |
| `AdminPage` | None | JSX Element | Renders the admin dashboard with key statistics and navigation links. |
| `Stat` | `{ label: string; value: string | number }` | JSX Element | Displays a statistic with a label and value. |

#### Notes

- The `requireAdmin` function ensures that only authenticated admins can access this page.
- The `getAdminStats` function fetches the necessary statistics for the admin dashboard.
- The `formatMoney` function formats the revenue value to the specified currency (INR in this case).
- The `Stat` component is used to display individual statistics in a consistent format.

### `nitinog10-Codesell-e6af67a/src/app/admin/orders/page.tsx`

##### `nitinog10-Codesell-e6af67a/src/app/admin/orders/page.tsx`

This file defines the page component for the admin orders section, displaying a list of all orders with relevant details.

#### Dependencies

| Import | Description |
| --- | --- |
| `Metadata` from `next` | Defines metadata for the page. |
| `StatusPill` from `@/components/ui/StatusPill` | A component to display the status of an order. |
| `requireAdmin` from `@/lib/guards` | A function to ensure the user is an admin. |
| `getAllOrders` from `@/lib/orders` | A function to fetch all orders. |
| `formatMoney` from `@/lib/utils` | A function to format monetary values. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `AdminOrdersPage` | None | JSX | Renders the admin orders page with a list of orders. |

#### Notes

- The `requireAdmin` function ensures that only admin users can access this page.
- The `getAllOrders` function fetches all orders from the backend.
- The `formatMoney` function is used to format the total amount of each order.
- The page displays a message if there are no orders yet.
- The `StatusPill` component is used to show the status of each order.

### `nitinog10-Codesell-e6af67a/src/app/admin/products/page.tsx`

##### nitin0g10-Codesell-e6af67a/src/app/admin/products/page.tsx

This file defines the `AdminProductsPage` component, which displays a list of products in the admin section of the application. It includes functionality for viewing, editing, and deleting products.

#### Dependencies

| Import | Description |
| --- | --- |
| `Link` | Next.js component for client-side navigation. |
| `Metadata` | Type definition for page metadata. |
| `DeleteProductButton` | Custom component for deleting a product. |
| `Button` | UI component for buttons. |
| `Badge` | UI component for displaying labels. |
| `requireAdmin` | Higher-order function to enforce admin access. |
| `getProducts` | Function to fetch product data. |
| `formatMoney` | Utility function to format currency values. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `AdminProductsPage` | None | JSX | Renders the admin products page with a list of products and actions. |

#### Notes

- The `requireAdmin` function must be called before any admin-specific logic to ensure the user has the necessary permissions.
- The `getProducts` function fetches all products, including inactive ones, which are then displayed in the UI.
- The `formatMoney` function is used to format the product prices in a user-friendly way.
- The `DeleteProductButton` component is used to provide a button for deleting products. It requires the `productId` as a prop.

When working with this file, ensure that any changes to the product display logic are tested thoroughly to maintain the integrity of the admin product management functionality.

### `nitinog10-Codesell-e6af67a/src/app/admin/products/[id]/edit/page.tsx`

#### Module Overview

This file defines the React component for editing an existing product in the admin section of the application. It fetches product data based on the provided `id` and renders a form to update the product details.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `Metadata` | Type definition for metadata properties. |
| `notFound` | Redirects to a 404 page if the product doesn't exist. |
| `ProductForm` | Component for rendering the product edit form. |
| `requireAdmin` | Middleware to ensure the user is an admin. |
| `getProductById` | Function to fetch product data by ID. |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| None | N/A | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `EditProductPage` | `params` (Promise<{ id: string }>) | JSX element | Renders the product edit page, includes fetching product data and rendering the form. |

#### Notes

- Ensure the `id` parameter is valid and exists in the database.
- The `requireAdmin` middleware must be called before accessing the page to prevent unauthorized access.
- If the product with the given `id` does not exist, the `notFound` function is called to redirect to a 404 page.
- The `ProductForm` component is used to display and handle the form for editing product details.

### `nitinog10-Codesell-e6af67a/src/app/admin/products/new/page.tsx`

#### Module Overview

This file defines the React component for the admin page where new products can be added. It includes a form for product details and ensures that only admin users can access this page.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `Metadata` | Type definition for metadata properties. |
| `ProductForm` | Component for the product creation form. |
| `requireAdmin` | Function to enforce admin access to the page. |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| None | N/A | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `NewProductPage` | None | JSX element | Renders the new product form and ensures admin access. |

#### Configuration or Constants

| Name | Type | Value |
| --- | --- | --- |
| `metadata` | `Metadata` | `{ title: "New product" }` |

#### Notes

- The `requireAdmin` function is called before rendering the component to ensure that only admin users can access this page.
- The `ProductForm` component is used to collect product details from the user.
- The page title is set to "New product" for SEO and user interface purposes.

### `nitinog10-Codesell-e6af67a/src/app/api/admin/products/route.ts`

##### Module Overview

This file defines the API routes for managing products in the admin section of the application. It includes logic for handling GET and POST requests to retrieve and create product data, respectively. It ensures that only authenticated admin users can access these endpoints.

#### Dependencies

| Import | Purpose |
|--------|---------|
| `NextResponse` | Provides a way to create HTTP responses in a Next.js API route. |
| `auth` | Handles user authentication and session management. |
| `hasDatabaseUrl` | Checks if the database URL is configured in the environment variables. |
| `fromDbProduct` | Converts a database product object to a format suitable for API responses. |
| `prisma` | An ORM for interacting with the database. |
| `productInputSchema` | A validation schema for product input data. |

#### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `requireAdminResponse` | None | `NextResponse` | Ensures the user is authenticated and has admin role. Returns an error response if not. |
| `productData` | `input` (parsed product input) | `object` | Converts parsed product input into a format suitable for database insertion. |
| `GET` | None | `NextResponse` | Handles GET requests to retrieve all products. Returns a JSON array of products. |
| `POST` | `request` (HTTP request object) | `NextResponse` | Handles POST requests to create a new product. Returns the created product or an error response. |

#### Notes

- The `requireAdminResponse` function is used in both `GET` and `POST` to ensure admin access before proceeding with the main logic.
- The `productData` function is a helper to transform validated product input into a database-friendly format.
- Always ensure the database URL is configured to avoid a 503 error.
- The `productInputSchema` is used to validate incoming product data, ensuring it meets the required format before processing.

### `nitinog10-Codesell-e6af67a/src/app/api/admin/products/[id]/route.ts`

##### Module Overview

This file defines the API routes for managing a product in the admin panel. It includes endpoints for retrieving, updating, and deleting a product by its ID. It ensures that only authenticated admin users can access these operations.

#### Dependencies

| Import | Purpose |
|--------|---------|
| `NextResponse` | Provides a way to create HTTP responses in Next.js. |
| `auth` | Handles user authentication. |
| `hasDatabaseUrl` | Checks if the database URL is configured. |
| `fromDbProduct` | Converts a database product object to a usable format. |
| `prisma` | ORM client for database operations. |
| `productInputSchema` | Validates the product input data. |

#### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `requireAdminResponse` | None | `NextResponse` or `null` | Ensures the user is authenticated and has admin access. Returns an error response if not. |
| `productData` | `input` (parsed product input) | `object` | Maps the parsed product input to a database-friendly format. |
| `GET` | `_request` (Request), `{ params }` (Promise<{ id: string }>) | `NextResponse` | Retrieves a product by its ID. Returns an error if the product is not found or access is denied. |
| `PUT` | `request` (Request), `{ params }` (Promise<{ id: string }>) | `NextResponse` | Updates a product by its ID with new data. Returns an error if the data is invalid or access is denied. |
| `DELETE` | `_request` (Request), `{ params }` (Promise<{ id: string }>) | `NextResponse` | Deletes a product by its ID. If deletion fails, it archives the product instead. |

#### Notes

- The `requireAdminResponse` function is a middleware that checks for admin access and returns appropriate error responses.
- The `productData` function is a helper that formats the product input data for database operations.
- The `GET`, `PUT`, and `DELETE` functions handle the respective HTTP methods for product management.
- Error handling is consistent across all functions, ensuring a uniform response format.
- Be cautious with the `DELETE` function: it attempts to delete a product but archives it if deletion fails. This behavior should be clearly documented and understood.

### `nitinog10-Codesell-e6af67a/src/app/api/auth/[...nextauth]/route.ts`

##### Module Overview

This file defines the API route for handling authentication in the `nitinog10-Codesell` application. It exports two HTTP handlers, `GET` and `POST`, which are used to manage authentication requests.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `{ handlers }` | Provides the HTTP handlers for GET and POST requests. |

#### Classes

| Class | Purpose | Key Methods |
| --- | --- | --- |
| N/A | N/A | N/A |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `GET` | N/A | Response | Handles GET requests for authentication. |
| `POST` | N/A | Response | Handles POST requests for authentication. |

#### Notes

- The `runtime` is set to `"nodejs"`, indicating that this route will run in a Node.js environment.
- The handlers are directly imported and exported, simplifying the route configuration.

### `nitinog10-Codesell-e6af67a/src/app/api/health/route.ts`

##### `nitinog10-Codesell-e6af67a/src/app/api/health/route.ts`

#### Module Overview

This file defines the health check endpoint for the application. It assesses the operational status of the application and database, returning a JSON response with the status and specific checks.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `NextResponse` | Provides methods to create HTTP responses in Next.js. |
| `hasDatabaseUrl` | Checks if a database URL is configured in the environment. |
| `prisma` | Prisma client for database interactions. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `GET` | None | `NextResponse` | Handles GET requests to the health check endpoint. |

#### Notes

- The health check endpoint returns a `status` of `ok`, `degraded`, or `error` based on the application and database checks.
- If the database URL is not configured, the database check returns `not_configured`.
- If the database connection fails, the endpoint returns a `503` status code.
- The `checks` object includes statuses for both the application and database.

### `nitinog10-Codesell-e6af67a/src/app/api/orders/[id]/retry-collab/route.ts`

##### Module Overview

This file defines the API route for retrying a collaboration on a paid order. It allows a user to retry the collaboration process if it previously failed, provided the order is in a paid state.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `CollabStatus` | Enum type from Prisma client for collaboration statuses. |
| `NextResponse` | Utility from Next.js to create HTTP responses. |
| `auth` | Authentication middleware to verify user sessions. |
| `fulfillPaidOrder` | Function to handle the fulfillment of a paid order. |
| `hasDatabaseUrl` | Utility to check if the database URL is configured. |
| `prisma` | Prisma client for database interactions. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `POST` | `_request: Request`, `{ params }: { params: Promise<{ id: string }> }` | `NextResponse` | Handles the POST request to retry the collaboration on a paid order. |

#### Notes

- The function checks if the user is authenticated before proceeding.
- It verifies if the database is configured to prevent runtime errors.
- Ensures the order exists and is in a paid state before attempting to retry the collaboration.
- Updates the order's collaboration status and resets any previous errors.
- Calls the `fulfillPaidOrder` function to handle the fulfillment process for the order.

### `nitinog10-Codesell-e6af67a/src/app/api/orders/create/route.ts`

##### Module Overview

This file defines the route for creating orders in the application. It handles the HTTP POST request to create a new order, validates the request, checks product availability, and initiates the payment process using either Stripe, Razorpay, or a mock payment provider.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `CollabStatus, OrderStatus` | Enums from Prisma client for collaboration and order statuses. |
| `NextResponse` | Utility from Next.js for creating HTTP responses. |
| `auth` | Authentication middleware to verify user sessions. |
| `canUseMockPayments, hasDatabaseUrl, selectedPaymentProvider` | Environment-based utilities to check configurations. |
| `prisma` | Prisma client for database interactions. |
| `createOrderSchema` | Validation schema for order creation requests. |
| `createStripeCheckoutSession` | Function to create a Stripe checkout session. |
| `createRazorpayOrder` | Function to create a Razorpay order. |
| `absoluteUrl` | Utility to generate absolute URLs. |
| `fromDbProduct` | Function to transform database product objects for payment providers. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `POST` | `request: Request` | `NextResponse` | Handles the POST request to create an order, including validation, product checking, and payment initiation. |

#### Notes

- The function assumes the presence of environment variables for payment providers.
- Mock payments are only used if explicitly configured.
- The function checks for product availability and currency consistency before proceeding.
- Error handling is done through JSON responses with appropriate HTTP status codes.

### `nitinog10-Codesell-e6af67a/src/app/api/webhooks/razorpay/route.ts`

##### `nitinog10-Codesell-e6af67a/src/app/api/webhooks/razorpay/route.ts`

This file handles incoming webhook events from Razorpay, verifies their authenticity, and processes them accordingly.

#### Dependencies

| Import | Purpose |
| --- | --- |
| `crypto` | Provides cryptographic functionality to generate hashes. |
| `NextResponse` | Utility from Next.js to create HTTP responses. |
| `hasDatabaseUrl` | Checks if the database URL is configured. |
| `markOrderPaidAndFulfill` | Marks an order as paid and fulfills it. |
| `prisma` | ORM client for database operations. |
| `verifyRazorpayWebhookSignature` | Verifies the signature of Razorpay webhooks. |

#### Functions

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `providerEventId` | `rawBody: string`, `payload: RazorpayWebhook` | `string` | Generates a unique event ID for Razorpay webhooks. |
| `appOrderId` | `payload: RazorpayWebhook` | `string` | Retrieves the application's order ID from the webhook payload. |
| `POST` | `request: Request` | `NextResponse` | Handles incoming POST requests for Razorpay webhooks. |

#### Notes

- The `POST` function checks if the database is configured before processing the webhook.
- It verifies the Razorpay webhook signature to ensure the request's authenticity.
- If the webhook event type is `payment.captured` or `order.paid`, it marks the order as paid and fulfilled.
- Errors during processing are logged in the database for debugging purposes.

### `nitinog10-Codesell-e6af67a/src/app/api/webhooks/stripe/route.ts`

##### Module Overview

This file handles webhook events from Stripe, processes them, and updates the application's database accordingly. It's designed to respond to specific Stripe events like successful checkouts, failed payments, and refunds, and to update the order statuses in the system.

##### Dependencies

| Import | Description |
| ------ | ----------- |
| `Stripe` | Stripe's Node.js library for interacting with the Stripe API. |
| `NextResponse` | A utility from Next.js for creating HTTP responses. |
| `hasDatabaseUrl` | A utility function to check if the database URL is configured. |
| `markOrderPaidAndFulfill`, `markOrderRefundedAndRevoke` | Functions to update order statuses in the database. |
| `prisma` | An ORM client for interacting with the database. |
| `constructStripeEvent` | A utility function to construct a Stripe event from the raw webhook data. |

##### Functions

| Function | Parameters | Returns | Description |
| -------- | ---------- | ------- | ----------- |
| `POST` | `request: Request` | `Promise<NextResponse>` | Handles POST requests to the webhook endpoint, processes Stripe events, and updates the database. |

##### Notes

- The `POST` function checks if the database is configured before processing any events.
- It uses the `constructStripeEvent` function to validate the incoming Stripe webhook events.
- The function updates the database with the event details and marks the event as processed.
- It handles specific Stripe event types like `checkout.session.completed`, `checkout.session.async_payment_failed`, and `charge.refunded`.
- Error handling is implemented to update the database with any errors that occur during processing.
- The `runtime` is set to `"nodejs"` to ensure compatibility with the serverless function environment.

---

*Documentation auto-generated by DocuVerse*
