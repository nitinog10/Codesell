import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Payment failed"
};

export default function CheckoutFailurePage() {
  return (
    <div className="content-grid py-16">
      <div className="max-w-2xl rounded-md border border-neutral-200 bg-white p-8">
        <p className="text-sm font-semibold uppercase text-[color:var(--accent)]">
          Payment failed
        </p>
        <h1 className="mt-3 text-4xl font-semibold">
          The payment was not completed.
        </h1>
        <p className="mt-4 leading-7 text-neutral-600">
          No repository access is sent until the payment provider confirms a
          successful transaction.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/products">Try again</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
