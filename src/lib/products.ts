import type { Product } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { hasDatabaseUrl } from "@/lib/env";
import { type CatalogProduct, sampleProducts } from "@/lib/sample-data";

export function fromDbProduct(product: Product): CatalogProduct {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    longDesc: product.longDesc ?? "",
    price: product.price,
    currency: product.currency,
    repoOwner: product.repoOwner,
    repoName: product.repoName,
    repoUrl: product.repoUrl,
    imageUrl: product.imageUrl ?? "",
    screenshots: product.screenshots,
    tags: product.tags,
    techStack: product.techStack,
    isActive: product.isActive,
    featured: product.featured,
    demoUrl: product.demoUrl ?? undefined
  };
}

export async function getProducts(options: { includeInactive?: boolean } = {}) {
  if (!hasDatabaseUrl()) {
    return sampleProducts.filter(
      (product) => options.includeInactive || product.isActive
    );
  }

  try {
    const products = await prisma.product.findMany({
      where: options.includeInactive ? undefined : { isActive: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }]
    });

    return products.map(fromDbProduct);
  } catch {
    return sampleProducts.filter(
      (product) => options.includeInactive || product.isActive
    );
  }
}

export async function getFeaturedProducts() {
  const products = await getProducts();
  return products.filter((product) => product.featured).slice(0, 3);
}

export async function getProductBySlug(slug: string) {
  if (!hasDatabaseUrl()) {
    return sampleProducts.find(
      (product) => product.slug === slug && product.isActive
    );
  }

  try {
    const product = await prisma.product.findUnique({ where: { slug } });
    return product && product.isActive ? fromDbProduct(product) : undefined;
  } catch {
    return sampleProducts.find(
      (sampleProduct) => sampleProduct.slug === slug && sampleProduct.isActive
    );
  }
}

export async function getProductById(id: string) {
  if (!hasDatabaseUrl()) {
    return sampleProducts.find((product) => product.id === id);
  }

  try {
    const product = await prisma.product.findUnique({ where: { id } });
    return product ? fromDbProduct(product) : undefined;
  } catch {
    return sampleProducts.find((product) => product.id === id);
  }
}
