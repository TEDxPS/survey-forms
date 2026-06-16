import dbConnect from "@/libs/mongodb";
import Form from "@/models/Form";
import { getSessionFromRequest } from "@/libs/adminAuth";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  if (!(await getSessionFromRequest(req))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  await dbConnect();
  const form = await Form.findOne({ slug: params.slug });
  if (!form) return Response.json({ error: "Form not found" }, { status: 404 });
  return Response.json(form.toObject());
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  if (!(await getSessionFromRequest(req))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    delete body.slug;
    await dbConnect();
    const form = await Form.findOneAndUpdate(
      { slug: params.slug },
      { ...body, slug: params.slug },
      { new: true }
    );
    if (!form) return Response.json({ error: "Form not found" }, { status: 404 });
    return Response.json(form.toObject());
  } catch (err) {
    console.error("[admin/forms PUT]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
  if (!(await getSessionFromRequest(req))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  await dbConnect();
  const form = await Form.findOneAndDelete({ slug: params.slug });
  if (!form) return Response.json({ error: "Form not found" }, { status: 404 });
  return Response.json({ success: true });
}
