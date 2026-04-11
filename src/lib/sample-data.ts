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

export const sampleProducts: CatalogProduct[] = [
  {
    id: "starter-next-saas",
    name: "Next SaaS Starter Kit",
    slug: "next-saas-starter-kit",
    description:
      "A production-ready Next.js starter with billing, dashboard layouts, auth, and typed server utilities.",
    longDesc:
      "Ship a SaaS dashboard faster with a clean App Router architecture, typed API routes, Stripe-ready billing surfaces, and reusable UI primitives. The repository includes setup docs, environment templates, and opinionated folder boundaries for product teams.",
    price: 12900,
    currency: "INR",
    repoOwner: "codesell",
    repoName: "next-saas-starter",
    repoUrl: "https://github.com/codesell/next-saas-starter",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1400&q=80"
    ],
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
    imageUrl:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1400&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80"
    ],
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
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80"
    ],
    tags: ["AI", "Widget"],
    techStack: ["React", "Web Components", "Prisma", "Resend"],
    isActive: true,
    featured: true,
    demoUrl: "https://demo.codesell.dev/support"
  }
];
