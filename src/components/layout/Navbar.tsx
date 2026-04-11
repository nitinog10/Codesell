import Link from "next/link";
import { auth } from "@/lib/auth";
import { SignInButton, SignOutButton } from "@/components/auth/AuthButton";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="content-grid flex min-h-16 items-center justify-between gap-4">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[color:var(--primary)] text-sm text-white">
            CS
          </span>
          <span>CodeSell</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-neutral-700 md:flex">
          <Link href="/products">Products</Link>
          <Link href="/checkout">Checkout</Link>
          {session?.user ? <Link href="/dashboard">Dashboard</Link> : null}
          {session?.user?.role === "ADMIN" ? <Link href="/admin">Admin</Link> : null}
        </nav>
        <div className="flex items-center gap-2">
          {session?.user ? <SignOutButton /> : <SignInButton />}
        </div>
      </div>
    </header>
  );
}
