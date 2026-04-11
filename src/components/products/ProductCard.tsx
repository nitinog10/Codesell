import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { type CatalogProduct } from "@/lib/sample-data";
import { formatMoney } from "@/lib/utils";

export function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md border border-neutral-200 bg-white">
      <Link href={`/products/${product.slug}`}>
        <img
          alt=""
          className="h-48 w-full object-cover"
          loading="lazy"
          src={product.imageUrl}
        />
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap gap-2">
          {product.tags.slice(0, 2).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-semibold">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-600">
            {product.description}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="text-lg font-semibold">
            {formatMoney(product.price, product.currency)}
          </span>
          <Button asChild size="sm">
            <Link href={`/checkout?product=${product.id}`}>Buy now</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
