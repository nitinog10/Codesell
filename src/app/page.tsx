import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/lib/products";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <section
        className="relative flex min-h-[72vh] items-end bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1800&q=80)"
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="content-grid relative pb-16 pt-24">
          <p className="text-sm font-semibold uppercase text-[#f7c948]">
            Source code marketplace
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight md:text-6xl">
            Buy private repositories and get GitHub access after payment.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-100">
            Production-ready code products for teams that want a working base,
            not another blank repo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/products">Browse products</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/auth/signin">Login with GitHub</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="content-grid py-14">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-[color:var(--accent)]">
              Featured repos
            </p>
            <h2 className="mt-2 text-3xl font-semibold">Ready to clone</h2>
          </div>
          <Link className="text-sm font-semibold text-[color:var(--primary-strong)]" href="/products">
            View all products
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-white">
        <div className="content-grid grid gap-8 py-14 md:grid-cols-3">
          <div>
            <p className="text-4xl font-semibold text-[color:var(--primary)]">
              GitHub
            </p>
            <p className="mt-3 text-neutral-600">
              Buyer identity comes from GitHub OAuth only.
            </p>
          </div>
          <div>
            <p className="text-4xl font-semibold text-[color:var(--accent)]">
              Webhooks
            </p>
            <p className="mt-3 text-neutral-600">
              Payments are confirmed server-side before delivery starts.
            </p>
          </div>
          <div>
            <p className="text-4xl font-semibold text-[#8a6d00]">Read-only</p>
            <p className="mt-3 text-neutral-600">
              Repository access is granted with GitHub pull permission.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
