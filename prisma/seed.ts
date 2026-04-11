import { PrismaClient } from "@prisma/client";
import { sampleProducts } from "../src/lib/sample-data";

const prisma = new PrismaClient();

async function main() {
  for (const product of sampleProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        longDesc: product.longDesc,
        price: product.price,
        currency: product.currency,
        repoOwner: product.repoOwner,
        repoName: product.repoName,
        repoUrl: product.repoUrl,
        imageUrl: product.imageUrl,
        screenshots: product.screenshots,
        tags: product.tags,
        techStack: product.techStack,
        isActive: product.isActive,
        featured: product.featured,
        demoUrl: product.demoUrl
      },
      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        longDesc: product.longDesc,
        price: product.price,
        currency: product.currency,
        repoOwner: product.repoOwner,
        repoName: product.repoName,
        repoUrl: product.repoUrl,
        imageUrl: product.imageUrl,
        screenshots: product.screenshots,
        tags: product.tags,
        techStack: product.techStack,
        isActive: product.isActive,
        featured: product.featured,
        demoUrl: product.demoUrl
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
