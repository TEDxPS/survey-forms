import dbConnect from "@/libs/mongodb";
import Form from "@/models/Form";
import { getSessionFromRequest } from "@/libs/adminAuth";

export async function GET(req: Request) {
  if (!(await getSessionFromRequest(req))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  await dbConnect();
  const forms = await Form.find({}, { slug: 1, title: 1, createdAt: 1 }).sort({ createdAt: -1 });
  return Response.json(forms);
}

export async function POST(req: Request) {
  if (!(await getSessionFromRequest(req))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    if (!body.slug || !body.title) {
      return Response.json({ error: "slug and title are required" }, { status: 400 });
    }
    if (!/^[a-z0-9-]+$/.test(body.slug)) {
      return Response.json({ error: "slug must only contain lowercase letters, numbers, and hyphens" }, { status: 400 });
    }
    await dbConnect();
    const existing = await Form.findOne({ slug: body.slug });
    if (existing) {
      return Response.json({ error: `Form with slug '${body.slug}' already exists` }, { status: 409 });
    }
    const form = await Form.create(body);
    return Response.json({ slug: form.slug }, { status: 201 });
  } catch (err) {
    console.error("[admin/forms POST]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
