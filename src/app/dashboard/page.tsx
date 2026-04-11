import Link from "next/link";
import type { Metadata } from "next";
import { OrderList } from "@/components/dashboard/OrderList";
import { PurchasedRepos } from "@/components/dashboard/PurchasedRepos";
import { Button } from "@/components/ui/Button";
import { requireUser } from "@/lib/guards";
import { getOrdersForUser } from "@/lib/orders";

export const metadata: Metadata = {
  title: "Dashboard"
};

export default async function DashboardPage() {
  const user = await requireUser();
  const orders = await getOrdersForUser(user.id);

  return (
    <div className="content-grid py-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-[color:var(--accent)]">
            Buyer dashboard
          </p>
          <h1 className="mt-3 text-4xl font-semibold">
            Welcome, {user.name ?? user.username ?? "there"}
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-600">
            Purchased repositories and collaborator invite statuses are tracked
            here.
          </p>
        </div>
        <Button asChild variant="secondary">
          <Link href="/products">Browse products</Link>
        </Button>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Purchased repositories</h2>
        <div className="mt-5">
          <PurchasedRepos orders={orders} />
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Recent orders</h2>
          <Link
            className="text-sm font-semibold text-[color:var(--primary-strong)]"
            href="/dashboard/orders"
          >
            View all
          </Link>
        </div>
        <OrderList orders={orders.slice(0, 5)} />
      </section>
    </div>
  );
}
