import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="content-grid py-20">
      <p className="text-sm font-semibold uppercase text-[color:var(--accent)]">
        404
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold">
        This page is not available.
      </h1>
      <p className="mt-4 max-w-xl text-neutral-600">
        Browse the catalog to find the source code products currently available.
      </p>
      <Button className="mt-8" asChild>
        <Link href="/products">Browse products</Link>
      </Button>
    </div>
  );
}
