import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.split(String.raw`\n`).join(
      "\n"
    ),
  },
});

export const bucket = storage.bucket(process.env.GOOGLE_BUCKET_NAME as string);
