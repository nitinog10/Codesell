import Link from "next/link";
import type { Metadata } from "next";
import { PaymentForm } from "@/components/checkout/PaymentForm";
import { Button } from "@/components/ui/Button";
import { getProductById, getProducts } from "@/lib/products";
import { type CatalogProduct } from "@/lib/sample-data";

export const metadata: Metadata = {
  title: "Checkout"
};

export default async function CheckoutPage({
  searchParams
}: {
  searchParams: Promise<{ product?: string | string[] }>;
}) {
  const { product } = await searchParams;
  const productIds = Array.isArray(product) ? product : product ? [product] : [];
  const products = (
    await Promise.all(productIds.map((productId) => getProductById(productId)))
  ).filter((item): item is CatalogProduct => Boolean(item));

  if (products.length === 0) {
    const availableProducts = await getProducts();

    return (
      <div className="content-grid py-12">
        <h1 className="text-4xl font-semibold">Choose a product</h1>
        <p className="mt-4 max-w-2xl text-neutral-600">
          Start checkout from a product page so the order can be tied to a
          repository.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {availableProducts.map((availableProduct) => (
            <Link
              className="rounded-md border border-neutral-200 bg-white p-5 transition hover:border-neutral-400"
              href={`/checkout?product=${availableProduct.id}`}
              key={availableProduct.id}
            >
              <p className="font-semibold">{availableProduct.name}</p>
              <p className="mt-2 text-sm text-neutral-600">
                {availableProduct.repoOwner}/{availableProduct.repoName}
              </p>
            </Link>
          ))}
        </div>
        <Button asChild className="mt-8" variant="secondary">
          <Link href="/products">Back to products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="content-grid grid gap-8 py-12 lg:grid-cols-[1fr_420px]">
      <div>
        <p className="text-sm font-semibold uppercase text-[color:var(--accent)]">
          Secure checkout
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Complete your order</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">
          Payment is verified by webhook before GitHub repository access is sent.
        </p>
        <div className="mt-8 rounded-md border border-neutral-200 bg-white p-5">
          <p className="font-semibold">Delivery after payment</p>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            The collaboration invite has been sent to your GitHub email once the
            payment provider confirms the transaction.
          </p>
        </div>
      </div>
      <PaymentForm products={products} />
    </div>
  );
}
