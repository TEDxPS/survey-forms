import { google } from "googleapis";
import { Readable } from "stream";
import { parsePrivateKey } from "@/libs/googleAuth";
import dbConnect from "@/libs/mongodb";
import Form, { IForm } from "@/models/Form";

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
    const form = await Form.findOne({ slug }) as IForm | null;

    if (!form?.google?.private_key || !form?.google?.client_email || !form?.google?.driveFolderId) {
      return Response.json(
        { error: "No Google Drive configuration found for this form." },
        { status: 400 }
      );
    }

    const auth = new google.auth.JWT({
      email: form.google.client_email,
      key: parsePrivateKey(form.google.private_key),
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });

    const drive = google.drive({ version: "v3", auth });

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResponse = await drive.files.create({
      requestBody: {
        name: file.name,
        parents: [form.google.driveFolderId],
      },
      media: {
        mimeType: file.type,
        body: Readable.from(buffer),
      },
      fields: "id, webViewLink",
    });

    const fileId = uploadResponse.data.id!;

    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    return Response.json({
      success: true,
      fileUrl: uploadResponse.data.webViewLink,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json(
      { success: false, error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
