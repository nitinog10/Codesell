"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function DeleteProductButton({ productId }: { productId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function remove() {
    const confirmed = window.confirm("Delete this product?");

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE"
      });

      if (response.ok) {
        router.refresh();
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Button disabled={isDeleting} onClick={remove} size="sm" variant="danger">
      {isDeleting ? "Deleting" : "Delete"}
    </Button>
  );
}
