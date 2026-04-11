"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="content-grid py-20">
      <p className="text-sm font-semibold uppercase text-[color:var(--accent)]">
        Something broke
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold">
        The request could not be completed.
      </h1>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={reset}>Try again</Button>
        <Link className="rounded-md border border-neutral-300 px-4 py-2" href="/">
          Go home
        </Link>
      </div>
    </div>
  );
}
