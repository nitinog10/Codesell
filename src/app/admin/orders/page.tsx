import type { Metadata } from "next";
import { StatusPill } from "@/components/ui/StatusPill";
import { requireAdmin } from "@/lib/guards";
import { getAllOrders } from "@/lib/orders";
import { formatMoney } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin orders"
};

export default async function AdminOrdersPage() {
  await requireAdmin();
  const orders = await getAllOrders();

  return (
    <div className="content-grid py-10">
      <p className="text-sm font-semibold uppercase text-[color:var(--accent)]">
        Orders
      </p>
      <h1 className="mt-3 text-4xl font-semibold">All orders</h1>
      <div className="mt-8 overflow-hidden rounded-md border border-neutral-200 bg-white">
        {orders.length === 0 ? (
          <p className="p-6 text-neutral-600">No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div
              className="grid gap-4 border-b border-neutral-200 p-5 last:border-0 md:grid-cols-[1fr_auto_auto]"
              key={order.id}
            >
              <div>
                <p className="break-all font-semibold">Order {order.id}</p>
                <p className="mt-1 text-sm text-neutral-600">
                  {order.user.email ?? order.user.username ?? "No buyer email"}
                </p>
                <p className="mt-1 text-sm text-neutral-600">
                  {order.items.map((item) => item.product.name).join(", ")}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <StatusPill status={order.status} />
                <StatusPill status={order.collabStatus} />
              </div>
              <p className="font-semibold">
                {formatMoney(order.totalAmount, order.currency)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
