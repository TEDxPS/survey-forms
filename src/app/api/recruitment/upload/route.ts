import { bucket } from "@/libs/gcpbucket";
import { createHash } from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    const fileNameHash = createHash("sha256").update(file.name).digest("hex");

    // Create a unique filename to avoid collisions
    const filename = `${Date.now()}-${fileNameHash}`;

    // Create a write stream to GCP bucket
    const blob = bucket.file(filename);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.type,
    });

    // Handle errors during upload
    const streamPromise = new Promise((resolve, reject) => {
      blobStream.on("error", (err) => {
        console.log("Error uploading file:", err);
        reject(err);
      });

      blobStream.on("finish", () => {
        // Make the file public to get URL

        blob
          .makePublic()
          .then(() => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
            resolve(publicUrl);
          })
          .catch(reject);
      });

      blobStream.end(buffer);
    });

    const publicUrl = await streamPromise;

    return Response.json({
      success: true,
      fileUrl: publicUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to upload file",
      },
      { status: 500 }
    );
  }
}
