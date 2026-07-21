import Link from "next/link";
import { redirect } from "next/navigation";
import dbConnect from "@/libs/mongodb";
import Form from "@/models/Form";
import { getAdminSession } from "@/libs/adminAuth";
import { getFormSubmissionModel } from "@/models/FormSubmission";
import FormsGrid from "./_components/FormsGrid";

export default async function AdminFormsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  await dbConnect();
  const forms = await Form.find({}).sort({ createdAt: -1 }).lean();

  // Enrich each form with submission count + derived metadata
  const enriched = await Promise.all(
    forms.map(async (f: any) => {
      // Submission count from per-slug DB
      let submissionCount = 0;
      try {
        const Model = getFormSubmissionModel(f.slug);
        submissionCount = await Model.countDocuments();
      } catch {}

      // Expiry status
      let expiryStatus: "active" | "expired" | "none" = "none";
      let expiryDate: string | null = null;
      if (f.expiry?.date) {
        expiryDate = new Date(f.expiry.date).toLocaleDateString();
        expiryStatus = new Date(f.expiry.date) > new Date() ? "active" : "expired";
      }

      // Config completeness
      const hasSheet = Boolean(f.google?.sheetId);
      const hasFileStorage = Boolean(f.fileStorage?.provider) &&
        Object.values(f.fileStorage?.config ?? {}).some(Boolean);
      const hasAuth  = Boolean(f.google?.client_email && f.google?.private_key);

      // Pages / questions count
      const pageCount = (f.pages ?? []).length;
      const questionCount = (f.pages ?? []).reduce(
        (acc: number, page: any) => acc + (page.elements?.length ?? 0),
        0
      );

      return {
        slug: f.slug,
        title: f.title || "(untitled)",
        createdAt: f.createdAt
          ? new Date(f.createdAt).toLocaleDateString()
          : "—",
        submissionCount,
        expiryStatus,
        expiryDate,
        hasSheet,
        hasFileStorage,
        hasAuth,
        pageCount,
        questionCount,
        allowDuplicateEmails: f.allowDuplicateEmails ?? true,
      };
    })
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Forms</h1>
          <p className="text-sm text-gray-500 mt-0.5">{enriched.length} form{enriched.length !== 1 ? "s" : ""} total</p>
        </div>
        <Link
          href="/admin/forms/new"
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium
                     px-4 py-2 rounded-md transition-colors"
        >
          + New Form
        </Link>
      </div>

      <FormsGrid forms={enriched} />
    </div>
  );
}
