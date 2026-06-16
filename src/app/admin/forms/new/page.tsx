import { redirect } from "next/navigation";
import { getAdminSession } from "@/libs/adminAuth";
import FormWizard from "../_components/FormWizard";

export default async function NewFormPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex flex-col h-screen">
      <div className="px-8 py-4 border-b border-gray-200 bg-white flex items-center gap-3">
        <a href="/admin/forms" className="text-sm text-gray-400 hover:text-gray-600">
          ← Forms
        </a>
        <span className="text-gray-300">/</span>
        <h1 className="text-sm font-semibold text-gray-800">New Form</h1>
      </div>
      <div className="flex-1 overflow-hidden">
        <FormWizard isEdit={false} />
      </div>
    </div>
  );
}
