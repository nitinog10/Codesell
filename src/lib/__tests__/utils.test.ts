import { describe, expect, it, beforeEach, afterAll } from "vitest";
import { absoluteUrl, cn, formatMoney, splitCsv, toSlug } from "../utils";

const ORIGINAL_ENV = { ...process.env };

const resetEnv = () => {
  for (const key of Object.keys(process.env)) {
    if (!(key in ORIGINAL_ENV)) {
      delete process.env[key];
    }
  }

  Object.assign(process.env, ORIGINAL_ENV);
};

describe("utils", () => {
  beforeEach(resetEnv);
  afterAll(resetEnv);

  it("merges class names with tailwind conflict resolution", () => {
    expect(cn("px-2", "px-4", "text-sm")).toBe("px-4 text-sm");
  });

  it("formats money values using minor units", () => {
    const formatted = formatMoney(12300).replace(/\s/g, "");
    expect(formatted).toBe("₹123");
  });

  it("converts values into URL-friendly slugs", () => {
    expect(toSlug("  Hello, World!  ")).toBe("hello-world");
  });

  it("splits and trims CSV values while removing blanks", () => {
    expect(splitCsv("alpha, beta,, gamma ,")).toEqual(["alpha", "beta", "gamma"]);
  });

  it("builds absolute URLs from configured app URLs", () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://example.com";
    expect(absoluteUrl("/products")).toBe("https://example.com/products");
  });
});
