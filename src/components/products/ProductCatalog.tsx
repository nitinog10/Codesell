"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { Input } from "@/components/ui/Input";
import { type CatalogProduct } from "@/lib/sample-data";

export function ProductCatalog({ products }: { products: CatalogProduct[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");
  const [tech, setTech] = useState("all");

  const tags = useMemo(
    () => Array.from(new Set(products.flatMap((product) => product.tags))).sort(),
    [products]
  );
  const techStack = useMemo(
    () =>
      Array.from(new Set(products.flatMap((product) => product.techStack))).sort(),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesQuery =
        !normalizedQuery ||
        [product.name, product.description, product.longDesc]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesTag = tag === "all" || product.tags.includes(tag);
      const matchesTech = tech === "all" || product.techStack.includes(tech);

      return matchesQuery && matchesTag && matchesTech;
    });
  }, [products, query, tag, tech]);

  return (
    <div>
      <div className="grid gap-3 rounded-md border border-neutral-200 bg-white p-4 md:grid-cols-[1fr_180px_180px]">
        <Input
          aria-label="Search products"
          placeholder="Search products"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          aria-label="Filter by tag"
          className="h-11 rounded-md border border-neutral-300 bg-white px-3 text-sm"
          value={tag}
          onChange={(event) => setTag(event.target.value)}
        >
          <option value="all">All tags</option>
          {tags.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          aria-label="Filter by tech stack"
          className="h-11 rounded-md border border-neutral-300 bg-white px-3 text-sm"
          value={tech}
          onChange={(event) => setTech(event.target.value)}
        >
          <option value="all">All tech</option>
          {techStack.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 ? (
        <div className="mt-8 rounded-md border border-neutral-200 bg-white p-6 text-neutral-600">
          No products match the current filters.
        </div>
      ) : null}
    </div>
  );
}
