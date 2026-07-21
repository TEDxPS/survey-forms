import { Storage } from "@google-cloud/storage";
import { parsePrivateKey } from "@/libs/googleAuth";
import { FileStorageProvider } from "../types";

const gcsProvider: FileStorageProvider = {
  key: "gcs",
  label: "Google Cloud Storage",
  configFields: [
    { key: "bucketId", label: "Bucket Name", placeholder: "my-gcs-bucket" },
  ],
  async upload({ buffer, filename, mimeType }, { google, slug, config }) {
    const bucketId = config.bucketId as string | undefined;
    if (!google?.client_email || !google?.private_key || !bucketId) {
      throw new Error(
        "Missing Google Cloud Storage configuration (client_email, private_key, bucketId)."
      );
    }

    const storage = new Storage({
      credentials: {
        client_email: google.client_email,
        private_key: parsePrivateKey(google.private_key),
      },
    });

    const file = storage.bucket(bucketId).file(`${slug}/${Date.now()}-${filename}`);
    await file.save(buffer, { contentType: mimeType, resumable: false });

    return { url: file.publicUrl() };
  },
};

export default gcsProvider;
