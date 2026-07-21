import { IForm } from "@/types/form";

// Client-safe: no node-only imports here, so admin UI can import
// FILE_STORAGE_PROVIDERS_META without pulling provider SDKs into the browser bundle.

export interface FileStorageConfigField {
  key: string;
  label: string;
  placeholder?: string;
}

export interface FileStorageProviderMeta {
  key: string;
  label: string;
  configFields: FileStorageConfigField[];
}

export interface UploadInput {
  buffer: Buffer;
  filename: string;
  mimeType: string;
}

export interface FileStorageProvider extends FileStorageProviderMeta {
  upload(
    input: UploadInput,
    ctx: { google?: IForm["google"]; slug: string; config: Record<string, unknown> }
  ): Promise<{ url: string }>;
}

export const FILE_STORAGE_PROVIDERS_META: FileStorageProviderMeta[] = [
  {
    key: "gcs",
    label: "Google Cloud Storage",
    configFields: [
      { key: "bucketId", label: "Bucket Name", placeholder: "my-gcs-bucket" },
    ],
  },
];
