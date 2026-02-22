import { bucket as defaultBucket, storage as defaultStorage } from "@/libs/gcpbucket";
import { createHash } from "crypto";
import { Storage } from "@google-cloud/storage";
import dbConnect from "@/libs/mongodb";
import Form from "@/models/Form";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    let targetBucketId = null;
    let customStorage = null;

    const slug = formData.get("slug") as string;
    if (slug) {
      await dbConnect();
      const form = await Form.findOne({ slug });
      if (form && form.google) {
        if (form.google.bucketId) {
          targetBucketId = form.google.bucketId;
        }

        if (form.google.apiKey && form.google.apiKey.includes('private_key')) {
          try {
            const credentials = typeof form.google.apiKey === 'string'
              ? JSON.parse(form.google.apiKey)
              : form.google.apiKey;
            customStorage = new Storage({ credentials });
          } catch (e) {
            console.error("Failed to parse provided apiKey as JSON:", e);
          }
        }
      }
    }

    const storageToUse = customStorage || defaultStorage;
    const bucket = targetBucketId ? storageToUse.bucket(targetBucketId) : defaultBucket;

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
