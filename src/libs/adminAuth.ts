/**
 * Admin auth utilities — includes MongoDB-dependent helpers.
 * Do NOT import this file in middleware.ts.
 * For middleware, import from adminSession.ts instead.
 */
export {
  SESSION_COOKIE,
  hashPassword,
  signToken,
  verifyToken,
  createSessionCookie,
  clearSessionCookie,
  getSessionFromRequest,
  type TokenPayload,
} from "@/libs/adminSession";

import { cookies } from "next/headers";
import { verifyToken } from "@/libs/adminSession";
import dbConnect from "@/libs/mongodb";
import AdminUser from "@/models/AdminUser";
import { hashPassword } from "@/libs/adminSession";

// --- Server-component session helper -----------------------------------

export async function getAdminSession() {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return null;
  return verifyToken(token);
}

// --- Default admin seed ------------------------------------------------

export async function ensureDefaultAdmin(): Promise<void> {
  await dbConnect();
  const count = await AdminUser.countDocuments();
  if (count === 0) {
    await AdminUser.create({
      username: "admin",
      passwordHash: await hashPassword("admin"),
    });
    console.log("[adminAuth] Default admin user created (admin/admin)");
  }
}
