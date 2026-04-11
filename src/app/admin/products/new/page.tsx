import type { Metadata } from "next";
import { ProductForm } from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/guards";

export const metadata: Metadata = {
  title: "New product"
};

export default async function NewProductPage() {
  await requireAdmin();

  return (
    <div className="content-grid py-10">
      <p className="text-sm font-semibold uppercase text-[color:var(--accent)]">
        New product
      </p>
      <h1 className="mt-3 text-4xl font-semibold">Add source code product</h1>
      <div className="mt-8">
        <ProductForm />
      </div>
    </div>
  );
}
