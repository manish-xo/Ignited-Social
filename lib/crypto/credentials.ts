// Encrypts customer Instagram credentials before they touch the database.
// AES-256-GCM with a server-only key: a leaked table (or a stray SELECT) only
// exposes ciphertext. Your growth-manager tooling decrypts with the same key.
//
// Never import this from a "use client" file.

import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const ALGORITHM = "aes-256-gcm";

function key(): Buffer {
  const value = process.env.INSTAGRAM_CREDENTIALS_KEY;
  const buf = value ? Buffer.from(value, "base64") : null;
  if (!buf || buf.length !== 32) {
    throw new Error(
      "INSTAGRAM_CREDENTIALS_KEY must be a base64-encoded 32-byte key in .env.local",
    );
  }
  return buf;
}

/** Returns "iv.authTag.ciphertext" (all base64). */
export function encryptSecret(plaintext: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGORITHM, key(), iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  return [iv, cipher.getAuthTag(), encrypted]
    .map((b) => b.toString("base64"))
    .join(".");
}

export function decryptSecret(payload: string): string {
  const [iv, tag, data] = payload.split(".").map((p) => Buffer.from(p, "base64"));
  const decipher = createDecipheriv(ALGORITHM, key(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString(
    "utf8",
  );
}
