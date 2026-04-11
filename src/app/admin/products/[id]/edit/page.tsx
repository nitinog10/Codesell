import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/guards";
import { getProductById } from "@/lib/products";

export const metadata: Metadata = {
  title: "Edit product"
};

export default async function EditProductPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="content-grid py-10">
      <p className="text-sm font-semibold uppercase text-[color:var(--accent)]">
        Edit product
      </p>
      <h1 className="mt-3 text-4xl font-semibold">{product.name}</h1>
      <div className="mt-8">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
