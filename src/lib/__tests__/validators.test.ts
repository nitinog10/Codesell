import { describe, expect, it } from "vitest";
import { createOrderSchema, productInputSchema } from "../validators";

describe("validators", () => {
  it("applies defaults for optional product fields", () => {
    const parsed = productInputSchema.parse({
      name: "Sample Product",
      slug: "sample-product",
      description: "This description is long enough.",
      price: "2500",
      repoOwner: "octo",
      repoName: "repo",
      repoUrl: "https://github.com/octo/repo"
    });

    expect(parsed.longDesc).toBe("");
    expect(parsed.currency).toBe("INR");
    expect(parsed.screenshots).toEqual([]);
    expect(parsed.tags).toEqual([]);
    expect(parsed.techStack).toEqual([]);
    expect(parsed.isActive).toBe(true);
    expect(parsed.featured).toBe(false);
  });

  it("rejects invalid product slugs", () => {
    const result = productInputSchema.safeParse({
      name: "Bad Slug",
      slug: "Bad Slug!",
      description: "This description is long enough.",
      price: 1000,
      repoOwner: "octo",
      repoName: "repo",
      repoUrl: "https://github.com/octo/repo"
    });

    expect(result.success).toBe(false);
  });

  it("coerces optional URLs for product assets", () => {
    const parsed = productInputSchema.parse({
      name: "Asset Product",
      slug: "asset-product",
      description: "This description is long enough.",
      price: 1000,
      repoOwner: "octo",
      repoName: "repo",
      repoUrl: "https://github.com/octo/repo",
      imageUrl: "",
      demoUrl: ""
    });

    expect(parsed.imageUrl).toBe("");
    expect(parsed.demoUrl).toBe("");
  });

  it("enforces order size limits", () => {
    expect(
      createOrderSchema.safeParse({
        productIds: []
      }).success
    ).toBe(false);

    expect(
      createOrderSchema.safeParse({
        productIds: Array.from({ length: 11 }, (_, index) => `${index}`)
      }).success
    ).toBe(false);
  });
});
