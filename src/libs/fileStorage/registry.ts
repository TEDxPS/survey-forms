import gcsProvider from "./providers/gcs";
import { FileStorageProvider } from "./types";

const providers: Record<string, FileStorageProvider> = {
  [gcsProvider.key]: gcsProvider,
};

export function getFileStorageProvider(key: string | undefined): FileStorageProvider | undefined {
  if (!key) return undefined;
  return providers[key];
}
