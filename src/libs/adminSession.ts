/**
 * Pure crypto helpers using the Web Crypto API (globalThis.crypto.subtle).
 * Works in both Edge runtime (middleware) and Node.js runtime (API routes).
 * No Node.js-specific imports — safe to import in middleware.ts.
 */

export const SESSION_COOKIE = "admin_session";
const SESSION_TTL_SECONDS = 8 * 60 * 60; // 8 hours

const enc = new TextEncoder();

function getSecret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET environment variable is required");
  return s;
}

async function getKey(secret: string): Promise<CryptoKey> {
  return globalThis.crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function b64urlEncode(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function b64urlDecodeBytes(s: string): ArrayBuffer {
  const padded = s + "=".repeat((4 - (s.length % 4)) % 4);
  const binary = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
  const buf = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) buf[i] = binary.charCodeAt(i);
  return buf.buffer;
}

// --- Password hashing --------------------------------------------------

export async function hashPassword(password: string): Promise<string> {
  const key = await getKey(getSecret());
  const sig = await globalThis.crypto.subtle.sign("HMAC", key, enc.encode(password));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// --- Token sign / verify -----------------------------------------------

export interface TokenPayload {
  userId: string;
  username: string;
  exp: number;
}

export async function signToken(payload: Omit<TokenPayload, "exp">): Promise<string> {
  const data: TokenPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const b64 = btoa(JSON.stringify(data))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
  const key = await getKey(getSecret());
  const sig = await globalThis.crypto.subtle.sign("HMAC", key, enc.encode(b64));
  return `${b64}.${b64urlEncode(sig)}`;
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return null;
  const b64 = token.slice(0, dot);
  const sigPart = token.slice(dot + 1);

  try {
    const key = await getKey(getSecret());
    const sigBytes = b64urlDecodeBytes(sigPart);
    const valid = await globalThis.crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      enc.encode(b64)
    );
    if (!valid) {
      console.error("[verifyToken] DEBUG signature invalid, secretLen:", getSecret().length);
      return null;
    }

    const json = atob(b64.replace(/-/g, "+").replace(/_/g, "/") + "==");
    const payload: TokenPayload = JSON.parse(json);
    if (Math.floor(Date.now() / 1000) > payload.exp) {
      console.error("[verifyToken] DEBUG token expired", payload.exp, Math.floor(Date.now() / 1000));
      return null;
    }
    return payload;
  } catch (err) {
    console.error("[verifyToken] DEBUG threw:", err instanceof Error ? err.message : err);
    return null;
  }
}

// --- Cookie helpers ----------------------------------------------------

export async function createSessionCookie(
  userId: string,
  username: string
): Promise<string> {
  const token = await signToken({ userId, username });
  return `${SESSION_COOKIE}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${SESSION_TTL_SECONDS}`;
}

export function clearSessionCookie(): string {
  return `${SESSION_COOKIE}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`;
}

export async function getSessionFromRequest(
  req: Request
): Promise<TokenPayload | null> {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`)
  );
  if (!match) return null;
  return verifyToken(match[1]);
}
