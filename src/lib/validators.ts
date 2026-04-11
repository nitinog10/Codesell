import { z } from "zod";

export const productInputSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  description: z.string().min(10),
  longDesc: z.string().optional().default(""),
  price: z.coerce.number().int().positive(),
  currency: z.string().min(3).max(3).default("INR"),
  repoOwner: z.string().min(1),
  repoName: z.string().min(1),
  repoUrl: z.string().url(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  screenshots: z.array(z.string().url()).default([]),
  tags: z.array(z.string().min(1)).default([]),
  techStack: z.array(z.string().min(1)).default([]),
  isActive: z.coerce.boolean().default(true),
  featured: z.coerce.boolean().default(false),
  demoUrl: z.string().url().optional().or(z.literal(""))
});

export const createOrderSchema = z.object({
  productIds: z.array(z.string().min(1)).min(1).max(10)
});
