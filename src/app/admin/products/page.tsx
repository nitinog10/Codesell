import Link from "next/link";
import type { Metadata } from "next";
import { DeleteProductButton } from "@/components/admin/ProductActions";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { requireAdmin } from "@/lib/guards";
import { getProducts } from "@/lib/products";
import { formatMoney } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin products"
};

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await getProducts({ includeInactive: true });

  return (
    <div className="content-grid py-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-[color:var(--accent)]">
            Product CRUD
          </p>
          <h1 className="mt-3 text-4xl font-semibold">Products</h1>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">New product</Link>
        </Button>
      </div>
      <div className="mt-8 overflow-hidden rounded-md border border-neutral-200 bg-white">
        {products.map((product) => (
          <div
            className="grid gap-4 border-b border-neutral-200 p-5 last:border-0 md:grid-cols-[1fr_auto_auto]"
            key={product.id}
          >
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="mt-1 text-sm text-neutral-600">
                {product.repoOwner}/{product.repoName}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge>{product.isActive ? "active" : "inactive"}</Badge>
                {product.featured ? <Badge>featured</Badge> : null}
              </div>
            </div>
            <p className="font-semibold">
              {formatMoney(product.price, product.currency)}
            </p>
            <div className="flex items-start gap-2">
              <Button asChild size="sm" variant="secondary">
                <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
              </Button>
              <DeleteProductButton productId={product.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
