"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { type CatalogProduct } from "@/lib/sample-data";
import { splitCsv, toSlug } from "@/lib/utils";

type ProductFormState = {
  name: string;
  slug: string;
  description: string;
  longDesc: string;
  price: string;
  currency: string;
  repoOwner: string;
  repoName: string;
  repoUrl: string;
  imageUrl: string;
  screenshots: string;
  tags: string;
  techStack: string;
  demoUrl: string;
  isActive: boolean;
  featured: boolean;
};

function initialState(product?: CatalogProduct): ProductFormState {
  return {
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    longDesc: product?.longDesc ?? "",
    price: product ? String(product.price) : "",
    currency: product?.currency ?? "INR",
    repoOwner: product?.repoOwner ?? "",
    repoName: product?.repoName ?? "",
    repoUrl: product?.repoUrl ?? "",
    imageUrl: product?.imageUrl ?? "",
    screenshots: product?.screenshots.join(", ") ?? "",
    tags: product?.tags.join(", ") ?? "",
    techStack: product?.techStack.join(", ") ?? "",
    demoUrl: product?.demoUrl ?? "",
    isActive: product?.isActive ?? true,
    featured: product?.featured ?? false
  };
}

export function ProductForm({ product }: { product?: CatalogProduct }) {
  const router = useRouter();
  const [state, setState] = useState(() => initialState(product));
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const endpoint = product
    ? `/api/admin/products/${product.id}`
    : "/api/admin/products";
  const method = product ? "PUT" : "POST";

  const payload = useMemo(
    () => ({
      ...state,
      price: Number(state.price),
      screenshots: splitCsv(state.screenshots),
      tags: splitCsv(state.tags),
      techStack: splitCsv(state.techStack)
    }),
    [state]
  );

  function update<Key extends keyof ProductFormState>(
    key: Key,
    value: ProductFormState[Key]
  ) {
    setState((current) => ({
      ...current,
      [key]: value
    }));
  }

  async function submit() {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok || data.error) {
        setMessage(data.error ?? "Product could not be saved.");
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-5 rounded-md border border-neutral-200 bg-white p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          Name
          <Input
            value={state.name}
            onChange={(event) => {
              const name = event.target.value;
              update("name", name);
              if (!product) {
                update("slug", toSlug(name));
              }
            }}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Slug
          <Input
            value={state.slug}
            onChange={(event) => update("slug", event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold md:col-span-2">
          Description
          <Textarea
            value={state.description}
            onChange={(event) => update("description", event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold md:col-span-2">
          Long description
          <Textarea
            value={state.longDesc}
            onChange={(event) => update("longDesc", event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Price in smallest unit
          <Input
            inputMode="numeric"
            value={state.price}
            onChange={(event) => update("price", event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Currency
          <Input
            value={state.currency}
            onChange={(event) => update("currency", event.target.value.toUpperCase())}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Repo owner
          <Input
            value={state.repoOwner}
            onChange={(event) => update("repoOwner", event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Repo name
          <Input
            value={state.repoName}
            onChange={(event) => update("repoName", event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold md:col-span-2">
          Repo URL
          <Input
            value={state.repoUrl}
            onChange={(event) => update("repoUrl", event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold md:col-span-2">
          Image URL
          <Input
            value={state.imageUrl}
            onChange={(event) => update("imageUrl", event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold md:col-span-2">
          Screenshot URLs
          <Input
            value={state.screenshots}
            onChange={(event) => update("screenshots", event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Tags
          <Input
            value={state.tags}
            onChange={(event) => update("tags", event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Tech stack
          <Input
            value={state.techStack}
            onChange={(event) => update("techStack", event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold md:col-span-2">
          Demo URL
          <Input
            value={state.demoUrl}
            onChange={(event) => update("demoUrl", event.target.value)}
          />
        </label>
      </div>
      <div className="flex flex-wrap gap-5">
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input
            checked={state.isActive}
            type="checkbox"
            onChange={(event) => update("isActive", event.target.checked)}
          />
          Active
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input
            checked={state.featured}
            type="checkbox"
            onChange={(event) => update("featured", event.target.checked)}
          />
          Featured
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button disabled={isSubmitting} onClick={submit}>
          {isSubmitting ? "Saving" : "Save product"}
        </Button>
        {message ? <p className="text-sm text-[#8f2d24]">{message}</p> : null}
      </div>
    </div>
  );
}
