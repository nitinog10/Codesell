export type CatalogProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDesc: string;
  price: number;
  currency: string;
  repoOwner: string;
  repoName: string;
  repoUrl: string;
  imageUrl: string;
  screenshots: string[];
  tags: string[];
  techStack: string[];
  isActive: boolean;
  featured: boolean;
  demoUrl?: string;
};

const productImage = (name: string) => `https://placehold.co/1200x800?text=${encodeURIComponent(name)}`;

export const sampleProducts: CatalogProduct[] = [
  {
    id: "starter-next-saas",
    name: "Next SaaS Starter Kit",
    slug: "next-saas-starter-kit",
    description: "A production-ready Next.js starter with billing, dashboard layouts, auth, and typed server utilities.",
    longDesc: "Ship a SaaS dashboard faster with a clean App Router architecture, typed API routes, Stripe-ready billing surfaces, and reusable UI primitives. The repository includes setup docs, environment templates, and opinionated folder boundaries for product teams.",
    price: 12900,
    currency: "INR",
    repoOwner: "codesell",
    repoName: "next-saas-starter",
    repoUrl: "https://github.com/codesell/next-saas-starter",
    imageUrl: productImage("Next SaaS Starter Kit"),
    screenshots: [productImage("Next SaaS Starter Kit Screenshot 1"), productImage("Next SaaS Starter Kit Screenshot 2")],
    tags: ["SaaS", "Starter"],
    techStack: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    isActive: true,
    featured: true,
    demoUrl: "https://demo.codesell.dev/saas"
  },
  {
    id: "mobile-commerce-api",
    name: "Mobile Commerce API",
    slug: "mobile-commerce-api",
    description:
      "A Node API for storefront apps with product search, checkout adapters, and order tracking.",
    longDesc:
      "Use this backend as a fast base for mobile commerce experiments. It includes inventory models, payment adapter boundaries, order state transitions, and webhook handling examples for teams building mobile-first storefronts.",
    price: 8900,
    currency: "INR",
    repoOwner: "codesell",
    repoName: "mobile-commerce-api",
    repoUrl: "https://github.com/codesell/mobile-commerce-api",
    imageUrl: productImage("Mobile Commerce API"),
    screenshots: [productImage("Mobile Commerce API Screenshot 1"), productImage("Mobile Commerce API Screenshot 2")],
    tags: ["API", "Commerce"],
    techStack: ["Node.js", "PostgreSQL", "Zod", "Razorpay"],
    isActive: true,
    featured: false,
    demoUrl: "https://demo.codesell.dev/commerce-api"
  },
  {
    id: "ai-support-widget",
    name: "AI Support Widget",
    slug: "ai-support-widget",
    description:
      "A drop-in support widget with conversation capture, routing rules, and a typed integration layer.",
    longDesc:
      "Add a polished support workflow to a product without starting from scratch. The repository includes the embeddable widget, admin inbox screens, routing rules, and a provider abstraction for AI response engines.",
    price: 15900,
    currency: "INR",
    repoOwner: "codesell",
    repoName: "ai-support-widget",
    repoUrl: "https://github.com/codesell/ai-support-widget",
    imageUrl: productImage("AI Support Widget"),
    screenshots: [productImage("AI Support Widget Screenshot 1"), productImage("AI Support Widget Screenshot 2")],
    tags: ["AI", "Widget"],
    techStack: ["React", "Web Components", "Prisma", "Resend"],
    isActive: true,
    featured: true,
    demoUrl: "https://demo.codesell.dev/support"
  }
];
