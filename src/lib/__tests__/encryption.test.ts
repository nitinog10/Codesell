import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { decrypt, encrypt } from "../encryption";

const ORIGINAL_ENV = { ...process.env };

const resetEnv = () => {
  for (const key of Object.keys(process.env)) {
    if (!(key in ORIGINAL_ENV)) {
      delete process.env[key];
    }
  }

  Object.assign(process.env, ORIGINAL_ENV);
};

describe("encryption", () => {
  beforeEach(resetEnv);
  afterAll(resetEnv);

  it("round trips encrypted payloads", () => {
    process.env.ENCRYPTION_KEY = "a".repeat(64);
    const value = "super-secret-value";

    const payload = encrypt(value);

    expect(decrypt(payload)).toBe(value);
  });

  it("rejects malformed encrypted payloads", () => {
    process.env.ENCRYPTION_KEY = "b".repeat(64);

    expect(() => decrypt("invalid:payload")).toThrow("Invalid encrypted payload.");
  });

  it("falls back to auth secrets for key derivation", () => {
    delete process.env.ENCRYPTION_KEY;
    process.env.AUTH_SECRET = "x".repeat(32);

    const payload = encrypt("fallback-secret");

    expect(decrypt(payload)).toBe("fallback-secret");
  });

  it("requires a configured key in production", () => {
    process.env.NODE_ENV = "production";
    delete process.env.ENCRYPTION_KEY;
    delete process.env.AUTH_SECRET;
    delete process.env.NEXTAUTH_SECRET;

    expect(() => encrypt("value")).toThrow(
      "ENCRYPTION_KEY must be a 64-character hex string in production."
    );
  });
});
