import { redirect, notFound } from "next/navigation";
import { getAdminSession } from "@/libs/adminAuth";
import dbConnect from "@/libs/mongodb";
import Form from "@/models/Form";
import { IForm } from "@/types/form";
import FormWizard from "../_components/FormWizard";

export default async function EditFormPage({ params }: { params: { slug: string } }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  await dbConnect();
  const doc = await Form.findOne({ slug: params.slug }).lean();
  if (!doc) notFound();

  // Serialise Mongoose document (strip _id, __v, timestamps for the wizard)
  const { _id, __v, createdAt, updatedAt, ...formData } = doc as any;
  const initialForm = formData as Partial<IForm>;

  return (
    <div className="flex flex-col h-screen">
      <div className="px-8 py-4 border-b border-gray-200 bg-white flex items-center gap-3">
        <a href="/admin/forms" className="text-sm text-gray-400 hover:text-gray-600">
          ← Forms
        </a>
        <span className="text-gray-300">/</span>
        <h1 className="text-sm font-semibold text-gray-800">
          Edit: <span className="font-mono">{params.slug}</span>
        </h1>
      </div>
      <div className="flex-1 overflow-hidden">
        <FormWizard initialForm={initialForm} isEdit={true} />
      </div>
    </div>
  );
}
