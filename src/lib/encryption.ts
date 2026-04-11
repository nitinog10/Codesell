import crypto from "crypto";

const algorithm = "aes-256-gcm";

function getKey() {
  const configured = process.env.ENCRYPTION_KEY;

  if (configured && /^[a-f0-9]{64}$/i.test(configured)) {
    return Buffer.from(configured, "hex");
  }

  const fallback = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;

  if (fallback && fallback.length >= 32) {
    return crypto.createHash("sha256").update(fallback).digest();
  }

  if (process.env.NODE_ENV !== "production") {
    return crypto
      .createHash("sha256")
      .update("codesell-development-encryption-key")
      .digest();
  }

  throw new Error(
    "ENCRYPTION_KEY must be a 64-character hex string in production."
  );
}

export function encrypt(value: string) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(algorithm, getKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final()
  ]);
  const tag = cipher.getAuthTag();

  return [iv.toString("hex"), tag.toString("hex"), encrypted.toString("hex")].join(
    ":"
  );
}

export function decrypt(payload: string) {
  const [ivHex, tagHex, encryptedHex] = payload.split(":");

  if (!ivHex || !tagHex || !encryptedHex) {
    throw new Error("Invalid encrypted payload.");
  }

  const decipher = crypto.createDecipheriv(
    algorithm,
    getKey(),
    Buffer.from(ivHex, "hex")
  );
  decipher.setAuthTag(Buffer.from(tagHex, "hex"));

  return Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, "hex")),
    decipher.final()
  ]).toString("utf8");
}
