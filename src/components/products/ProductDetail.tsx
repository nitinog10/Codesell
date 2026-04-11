import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { type CatalogProduct } from "@/lib/sample-data";
import { formatMoney } from "@/lib/utils";

export function ProductDetail({ product }: { product: CatalogProduct }) {
  return (
    <article className="content-grid py-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <img
            alt=""
            className="h-[420px] w-full rounded-md object-cover"
            src={product.imageUrl}
          />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {product.screenshots.map((screenshot) => (
              <img
                alt=""
                className="h-52 w-full rounded-md object-cover"
                key={screenshot}
                src={screenshot}
              />
            ))}
          </div>
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h1 className="mt-5 text-4xl font-semibold leading-tight">
            {product.name}
          </h1>
          <p className="mt-4 text-lg leading-8 text-neutral-600">
            {product.description}
          </p>
          <p className="mt-6 text-3xl font-semibold">
            {formatMoney(product.price, product.currency)}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={`/checkout?product=${product.id}`}>Buy now</Link>
            </Button>
            {product.demoUrl ? (
              <Button asChild size="lg" variant="secondary">
                <a href={product.demoUrl} rel="noreferrer" target="_blank">
                  View demo
                </a>
              </Button>
            ) : null}
          </div>
          <div className="mt-8 rounded-md border border-neutral-200 bg-white p-5">
            <p className="font-semibold">Repository delivery</p>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              After payment, GitHub receives a read-only collaborator invite for{" "}
              <span className="font-semibold text-neutral-900">
                {product.repoOwner}/{product.repoName}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-semibold">What you get</h2>
        <div className="prose-lite mt-4">
          {product.longDesc.split("\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {product.techStack.map((tech) => (
            <Badge className="bg-[#eef8f5] text-[#126b59]" key={tech}>
              {tech}
            </Badge>
          ))}
        </div>
      </section>
    </article>
  );
}
