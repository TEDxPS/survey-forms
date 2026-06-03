import { clearSessionCookie } from "@/libs/adminAuth";

export async function POST() {
  return Response.json(
    { success: true },
    { headers: { "Set-Cookie": clearSessionCookie() } }
  );
}
