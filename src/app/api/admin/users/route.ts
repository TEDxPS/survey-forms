import dbConnect from "@/libs/mongodb";
import AdminUser from "@/models/AdminUser";
import { getSessionFromRequest, hashPassword } from "@/libs/adminAuth";

export async function GET(req: Request) {
  if (!(await getSessionFromRequest(req))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  await dbConnect();
  const users = await AdminUser.find({}, { passwordHash: 0 }).sort({ createdAt: 1 });
  return Response.json(users);
}

export async function POST(req: Request) {
  if (!(await getSessionFromRequest(req))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return Response.json({ error: "username and password are required" }, { status: 400 });
    }
    if (password.length < 6) {
      return Response.json({ error: "password must be at least 6 characters" }, { status: 400 });
    }
    await dbConnect();
    const existing = await AdminUser.findOne({ username });
    if (existing) {
      return Response.json({ error: `User '${username}' already exists` }, { status: 409 });
    }
    const user = await AdminUser.create({ username, passwordHash: await hashPassword(password) });
    return Response.json({ _id: user._id, username: user.username }, { status: 201 });
  } catch (err) {
    console.error("[admin/users POST]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
