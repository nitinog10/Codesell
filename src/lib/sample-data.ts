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
  }
];
