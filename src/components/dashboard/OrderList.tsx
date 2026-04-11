import Link from "next/link";
import { StatusPill } from "@/components/ui/StatusPill";
import type { OrderWithItems } from "@/lib/orders";
import { formatMoney } from "@/lib/utils";

export function OrderList({ orders }: { orders: OrderWithItems[] }) {
  if (orders.length === 0) {
    return (
      <div className="rounded-md border border-neutral-200 bg-white p-6 text-neutral-600">
        No orders yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-neutral-200 bg-white">
      <div className="grid gap-4 divide-y divide-neutral-200">
        {orders.map((order) => (
          <Link
            className="grid gap-3 p-5 transition hover:bg-neutral-50 md:grid-cols-[1fr_auto_auto]"
            href={`/dashboard/orders/${order.id}`}
            key={order.id}
          >
            <div>
              <p className="font-semibold">Order {order.id}</p>
              <p className="mt-1 text-sm text-neutral-600">
                {order.items.map((item) => item.product.name).join(", ")}
              </p>
            </div>
            <div className="flex gap-2">
              <StatusPill status={order.status} />
              <StatusPill status={order.collabStatus} />
            </div>
            <p className="font-semibold">
              {formatMoney(order.totalAmount, order.currency)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
