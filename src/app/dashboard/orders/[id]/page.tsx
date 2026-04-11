import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RetryCollabButton } from "@/components/dashboard/RetryCollabButton";
import { StatusPill } from "@/components/ui/StatusPill";
import { Button } from "@/components/ui/Button";
import { requireUser } from "@/lib/guards";
import { getOrderForUser } from "@/lib/orders";
import { formatMoney } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Order detail"
};

export default async function DashboardOrderDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser();
  const { id } = await params;
  const order = await getOrderForUser(id, user.id);

  if (!order) {
    notFound();
  }

  return (
    <div className="content-grid py-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-[color:var(--accent)]">
            Order detail
          </p>
          <h1 className="mt-3 break-all text-4xl font-semibold">Order {order.id}</h1>
        </div>
        <Button asChild variant="secondary">
          <Link href="/dashboard/orders">Back to orders</Link>
        </Button>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-md border border-neutral-200 bg-white p-5">
          <h2 className="text-xl font-semibold">Repositories</h2>
          <div className="mt-5 grid gap-4">
            {order.items.map((item) => (
              <div
                className="grid gap-3 border-b border-neutral-200 pb-4 last:border-0 last:pb-0 md:grid-cols-[1fr_auto]"
                key={item.id}
              >
                <div>
                  <p className="font-semibold">{item.product.name}</p>
                  <a
                    className="mt-1 block break-all text-sm text-[color:var(--primary-strong)]"
                    href={item.product.repoUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {item.product.repoOwner}/{item.product.repoName}
                  </a>
                </div>
                <p className="font-semibold">
                  {formatMoney(item.price, order.currency)}
                </p>
              </div>
            ))}
          </div>
        </div>
        <aside className="rounded-md border border-neutral-200 bg-white p-5">
          <h2 className="text-xl font-semibold">Status</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            <StatusPill status={order.status} />
            <StatusPill status={order.collabStatus} />
          </div>
          <p className="mt-5 text-sm leading-6 text-neutral-600">
            Total: {formatMoney(order.totalAmount, order.currency)}
          </p>
          {order.collabError ? (
            <p className="mt-4 rounded-md border border-[#e4a29a] bg-[#fff3f1] p-3 text-sm text-[#8f2d24]">
              {order.collabError}
            </p>
          ) : null}
          {order.collabStatus === "FAILED" ? (
            <div className="mt-5">
              <RetryCollabButton orderId={order.id} />
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
