import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="content-grid grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-semibold">CodeSell</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-neutral-600">
            Source code products delivered through GitHub collaborator invites
            after successful payment.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Catalog</p>
          <div className="mt-3 grid gap-2 text-sm text-neutral-600">
            <Link href="/products">Browse products</Link>
            <Link href="/checkout">Checkout</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">Account</p>
          <div className="mt-3 grid gap-2 text-sm text-neutral-600">
            <Link href="/auth/signin">GitHub sign in</Link>
            <Link href="/dashboard">Dashboard</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
