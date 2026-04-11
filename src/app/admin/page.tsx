import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { requireAdmin } from "@/lib/guards";
import { getAdminStats } from "@/lib/orders";
import { formatMoney } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin"
};

export default async function AdminPage() {
  await requireAdmin();
  const stats = await getAdminStats();

  return (
    <div className="content-grid py-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-[color:var(--accent)]">
            Admin
          </p>
          <h1 className="mt-3 text-4xl font-semibold">Operations</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/admin/products/new">New product</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/admin/orders">Orders</Link>
          </Button>
        </div>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-5">
        <Stat label="Revenue" value={formatMoney(stats.revenue, "INR")} />
        <Stat label="Paid orders" value={stats.paidOrders} />
        <Stat label="Pending" value={stats.pendingOrders} />
        <Stat label="Failed collabs" value={stats.failedCollabs} />
        <Stat label="Products" value={stats.products} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-neutral-200 bg-white p-5">
      <p className="text-sm text-neutral-600">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
