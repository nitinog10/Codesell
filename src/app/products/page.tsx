import type { Metadata } from "next";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products"
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="content-grid py-10">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase text-[color:var(--accent)]">
          Catalog
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Source code products</h1>
        <p className="mt-4 text-lg leading-8 text-neutral-600">
          Pick a repository, sign in with GitHub, and complete payment to receive
          a read-only collaborator invite.
        </p>
      </div>
      <div className="mt-8">
        <ProductCatalog products={products} />
      </div>
    </div>
  );
}
