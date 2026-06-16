import dbConnect from "@/libs/mongodb";
import AdminUser from "@/models/AdminUser";
import { getSessionFromRequest, hashPassword } from "@/libs/adminAuth";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!(await getSessionFromRequest(req))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { password } = await req.json();
    if (!password || password.length < 6) {
      return Response.json({ error: "password must be at least 6 characters" }, { status: 400 });
    }
    await dbConnect();
    const user = await AdminUser.findByIdAndUpdate(
      params.id,
      { passwordHash: await hashPassword(password) },
      { new: true }
    );
    if (!user) return Response.json({ error: "User not found" }, { status: 404 });
    return Response.json({ success: true });
  } catch (err) {
    console.error("[admin/users PUT]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getSessionFromRequest(req);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  if (session.userId === params.id) {
    return Response.json({ error: "Cannot delete your own account" }, { status: 403 });
  }
  await dbConnect();
  const user = await AdminUser.findByIdAndDelete(params.id);
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });
  return Response.json({ success: true });
}
