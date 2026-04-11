"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { type CatalogProduct } from "@/lib/sample-data";
import { formatMoney } from "@/lib/utils";

type CreateOrderResponse =
  | { provider: "stripe"; url: string }
  | {
      provider: "razorpay";
      keyId: string;
      orderId: string;
      appOrderId: string;
      amount: number;
      currency: string;
      buyerName?: string | null;
      buyerEmail?: string | null;
    }
  | { provider: "mock"; url: string }
  | { error: string };

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

async function loadRazorpayScript() {
  if (window.Razorpay) {
    return true;
  }

  return new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function PaymentForm({ products }: { products: CatalogProduct[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const total = products.reduce((sum, product) => sum + product.price, 0);
  const currency = products[0]?.currency ?? "INR";

  async function handleSubmit() {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productIds: products.map((product) => product.id)
        })
      });
      const payload = (await response.json()) as CreateOrderResponse;

      if ("error" in payload) {
        setMessage(payload.error);
        return;
      }

      if (payload.provider === "stripe" || payload.provider === "mock") {
        window.location.assign(payload.url);
        return;
      }

      const loaded = await loadRazorpayScript();

      if (!loaded || !window.Razorpay) {
        setMessage("Razorpay checkout could not be loaded.");
        return;
      }

      const checkout = new window.Razorpay({
        key: payload.keyId,
        amount: payload.amount,
        currency: payload.currency,
        name: "CodeSell",
        description: "Source code repository access",
        order_id: payload.orderId,
        prefill: {
          name: payload.buyerName ?? "",
          email: payload.buyerEmail ?? ""
        },
        handler: () => {
          window.location.assign(
            `/checkout/success?orderId=${payload.appOrderId}&provider=razorpay`
          );
        },
        modal: {
          ondismiss: () => {
            setMessage("Payment was not completed.");
          }
        }
      });

      checkout.open();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Checkout failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-md border border-neutral-200 bg-white p-5">
      <h2 className="text-xl font-semibold">Order summary</h2>
      <div className="mt-5 grid gap-4">
        {products.map((product) => (
          <div
            className="grid grid-cols-[64px_1fr_auto] items-center gap-4"
            key={product.id}
          >
            <img
              alt=""
              className="h-16 w-16 rounded-md object-cover"
              src={product.imageUrl}
            />
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-neutral-600">
                {product.repoOwner}/{product.repoName}
              </p>
            </div>
            <p className="font-semibold">
              {formatMoney(product.price, product.currency)}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-5">
        <span className="font-semibold">Total</span>
        <span className="text-2xl font-semibold">{formatMoney(total, currency)}</span>
      </div>
      <Button
        className="mt-6 w-full"
        disabled={isSubmitting || products.length === 0}
        onClick={handleSubmit}
        size="lg"
      >
        {isSubmitting ? "Preparing checkout" : "Continue to payment"}
      </Button>
      {message ? (
        <p className="mt-4 rounded-md border border-[#e4a29a] bg-[#fff3f1] p-3 text-sm text-[#8f2d24]">
          {message}
        </p>
      ) : null}
    </div>
  );
}
