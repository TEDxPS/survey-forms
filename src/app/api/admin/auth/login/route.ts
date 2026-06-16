import dbConnect from "@/libs/mongodb";
import AdminUser from "@/models/AdminUser";
import {
  ensureDefaultAdmin,
  hashPassword,
  createSessionCookie,
} from "@/libs/adminAuth";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return Response.json({ error: "Username and password are required" }, { status: 400 });
    }

    await ensureDefaultAdmin();
    await dbConnect();

    const user = await AdminUser.findOne({ username });
    if (!user || user.passwordHash !== (await hashPassword(password))) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return Response.json(
      { success: true, username: user.username },
      { headers: { "Set-Cookie": await createSessionCookie(user._id.toString(), user.username) } }
    );
  } catch (err) {
    console.error("[admin/auth/login]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
