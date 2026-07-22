import mongoose from "mongoose";

export type { ISiteConfig } from "@/types/siteConfig";

// Singleton collection — the app reads the first (only) document in it.
const SiteConfigSchema = new mongoose.Schema(
  {},
  { strict: false, collection: "siteconfig", timestamps: true }
);

const SiteConfig =
  mongoose.models.SiteConfig || mongoose.model("SiteConfig", SiteConfigSchema);

export default SiteConfig;
