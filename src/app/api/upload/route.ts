import dbConnect from "@/libs/mongodb";
import Form, { IForm } from "@/models/Form";
import { getFileStorageProvider } from "@/libs/fileStorage/registry";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const slug = formData.get("slug") as string;
    if (!slug) {
      return Response.json({ error: "No form slug provided" }, { status: 400 });
    }

    await dbConnect();
    const form = (await Form.findOne({ slug })) as IForm | null;

    const provider = getFileStorageProvider(form?.fileStorage?.provider);
    if (!provider) {
      return Response.json(
        { error: "No file storage provider configured for this form." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const { url } = await provider.upload(
      { buffer, filename: file.name, mimeType: file.type },
      { google: form?.google, slug, config: form?.fileStorage?.config ?? {} }
    );

    return Response.json({ success: true, fileUrl: url });
  } catch (error) {
    console.error("Upload error:", error);
    const message = error instanceof Error ? error.message : "Failed to upload file";
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}
