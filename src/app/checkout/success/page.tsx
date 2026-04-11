import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { getOrderById } from "@/lib/orders";

export const metadata: Metadata = {
  title: "Payment success"
};

export default async function CheckoutSuccessPage({
  searchParams
}: {
  searchParams: Promise<{ orderId?: string; mock?: string; provider?: string }>;
}) {
  const { orderId, mock, provider } = await searchParams;
  const order = orderId ? await getOrderById(orderId) : null;

  return (
    <div className="content-grid py-16">
      <div className="max-w-2xl rounded-md border border-neutral-200 bg-white p-8">
        <p className="text-sm font-semibold uppercase text-[color:var(--primary)]">
          Payment success
        </p>
        <h1 className="mt-3 text-4xl font-semibold">
          The collaboration invite has been sent to your GitHub email.
        </h1>
        <p className="mt-4 leading-7 text-neutral-600">
          Check GitHub for the repository invitation. Razorpay payments may show
          pending until the webhook reaches the server.
        </p>
        {order ? (
          <div className="mt-6 flex flex-wrap gap-2">
            <StatusPill status={order.status} />
            <StatusPill status={order.collabStatus} />
          </div>
        ) : null}
        {mock ? (
          <p className="mt-4 rounded-md border border-[#d6b441] bg-[#fff8d8] p-3 text-sm text-[#6e5a0d]">
            Mock payment mode was used because no payment provider is configured
            in this development environment.
          </p>
        ) : null}
        {provider === "razorpay" ? (
          <p className="mt-4 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-600">
            Keep this page bookmarked until the Razorpay webhook updates the
            order.
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/dashboard">View dashboard</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/products">Browse more</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
