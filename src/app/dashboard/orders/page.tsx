import type { Metadata } from "next";
import { OrderList } from "@/components/dashboard/OrderList";
import { requireUser } from "@/lib/guards";
import { getOrdersForUser } from "@/lib/orders";

export const metadata: Metadata = {
  title: "Orders"
};

export default async function DashboardOrdersPage() {
  const user = await requireUser();
  const orders = await getOrdersForUser(user.id);

  return (
    <div className="content-grid py-10">
      <p className="text-sm font-semibold uppercase text-[color:var(--accent)]">
        Order history
      </p>
      <h1 className="mt-3 text-4xl font-semibold">Your orders</h1>
      <div className="mt-8">
        <OrderList orders={orders} />
      </div>
    </div>
  );
}
