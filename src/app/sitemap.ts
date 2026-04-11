import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const products = await getProducts();

  return [
    "",
    "/products",
    "/auth/signin",
    "/checkout",
    "/dashboard"
  ]
    .map((path) => ({
      url: new URL(path, baseUrl).toString(),
      lastModified: new Date()
    }))
    .concat(
      products.map((product) => ({
        url: new URL(`/products/${product.slug}`, baseUrl).toString(),
        lastModified: new Date()
      }))
    );
}
