"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function RetryCollabButton({ orderId }: { orderId: string }) {
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function retry() {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/orders/${orderId}/retry-collab`, {
        method: "POST"
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || payload.error) {
        setMessage(payload.error ?? "Retry failed.");
        return;
      }

      setMessage("Retry started. Refresh the page to see the latest status.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Button disabled={isSubmitting} onClick={retry} variant="secondary">
        {isSubmitting ? "Retrying" : "Re-send invite"}
      </Button>
      {message ? <p className="mt-3 text-sm text-neutral-600">{message}</p> : null}
    </div>
  );
}
