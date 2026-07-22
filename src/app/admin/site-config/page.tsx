import { redirect } from "next/navigation";
import { getAdminSession } from "@/libs/adminAuth";
import { getSiteConfig } from "@/libs/siteConfig";
import SiteConfigForm from "./_components/SiteConfigForm";

export default async function SiteConfigPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const initialConfig = await getSiteConfig();

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-gray-900">Site Config</h1>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Controls the logo, favicon, social links, default hero image, and site metadata
        shown across all forms. Asset paths must point at files that already exist in{" "}
        <span className="font-mono">public/</span> — this page doesn&apos;t upload files.
      </p>
      <SiteConfigForm initialConfig={initialConfig} />
    </div>
  );
}
