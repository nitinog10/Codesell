import { StatusPill } from "@/components/ui/StatusPill";
import type { OrderWithItems } from "@/lib/orders";

export function PurchasedRepos({ orders }: { orders: OrderWithItems[] }) {
  const paidItems = orders.flatMap((order) =>
    order.items.map((item) => ({
      order,
      product: item.product
    }))
  );

  if (paidItems.length === 0) {
    return (
      <div className="rounded-md border border-neutral-200 bg-white p-6 text-neutral-600">
        Purchased repositories will appear here.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {paidItems.map(({ order, product }) => (
        <div
          className="rounded-md border border-neutral-200 bg-white p-5"
          key={`${order.id}-${product.id}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold">{product.name}</p>
              <a
                className="mt-1 block break-all text-sm text-[color:var(--primary-strong)]"
                href={product.repoUrl}
                rel="noreferrer"
                target="_blank"
              >
                {product.repoOwner}/{product.repoName}
              </a>
            </div>
            <StatusPill status={order.collabStatus} />
          </div>
        </div>
      ))}
    </div>
  );
}
