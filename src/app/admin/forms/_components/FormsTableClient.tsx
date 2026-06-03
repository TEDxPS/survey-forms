"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormRow {
  slug: string;
  title: string;
  createdAt: string;
}

interface PopulateState {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
  sheets?: string[];
}

export default function FormsTableClient({ forms }: { forms: FormRow[] }) {
  const router = useRouter();
  const [populateStates, setPopulateStates] = useState<
    Record<string, PopulateState>
  >({});

  function setSlugState(slug: string, state: PopulateState) {
    setPopulateStates((prev) => ({ ...prev, [slug]: state }));
  }

  async function handleDelete(slug: string) {
    if (!confirm(`Delete form "${slug}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/forms/${slug}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else alert("Delete failed");
  }

  async function handlePopulate(slug: string) {
    if (
      !confirm(
        `Initialize Google Sheet headers for "${slug}"?\n\nNote: Row 1 of Sheet1 will be overwritten.`
      )
    )
      return;

    setSlugState(slug, { status: "loading" });
    try {
      const res = await fetch(`/api/admin/forms/${slug}/populate`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setSlugState(slug, { status: "error", message: data.error });
      } else {
        setSlugState(slug, {
          status: "success",
          message: data.message,
          sheets: data.sheets,
        });
      }
    } catch {
      setSlugState(slug, {
        status: "error",
        message: "Network error. Please try again.",
      });
    }
  }

  if (forms.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400 text-sm">
        No forms yet.{" "}
        <Link href="/admin/forms/new" className="text-red-600 hover:underline">
          Create one
        </Link>
        .
      </div>
    );
  }

  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
          <th className="text-left px-5 py-3 font-medium text-gray-600">Slug</th>
          <th className="text-left px-5 py-3 font-medium text-gray-600">Title</th>
          <th className="text-left px-5 py-3 font-medium text-gray-600">Created</th>
          <th className="px-5 py-3" />
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {forms.map((f) => {
          const ps = populateStates[f.slug] ?? { status: "idle" };
          return (
            <Fragment key={f.slug}>
              <tr className="hover:bg-gray-50">
                <td className="px-5 py-3 font-mono text-gray-700">{f.slug}</td>
                <td className="px-5 py-3 text-gray-900">{f.title}</td>
                <td className="px-5 py-3 text-gray-500">{f.createdAt}</td>
                <td className="px-5 py-3 text-right space-x-3 whitespace-nowrap">
                  {/* Populate Sheet */}
                  <button
                    onClick={() => handlePopulate(f.slug)}
                    disabled={ps.status === "loading"}
                    title="Initialize Google Sheet headers"
                    className="inline-flex items-center gap-1 text-green-700 hover:text-green-900
                               disabled:opacity-50 transition-colors font-medium"
                  >
                    {ps.status === "loading" ? (
                      <span className="animate-spin text-xs">⟳</span>
                    ) : (
                      <span className="text-xs">📊</span>
                    )}
                    <span>Populate Sheet</span>
                  </button>

                  <Link
                    href={`/${f.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open public form in new tab"
                    className="text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    ↗
                  </Link>
                  <Link
                    href={`/admin/forms/${f.slug}`}
                    className="text-red-600 hover:underline font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(f.slug)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>

              {/* Result row */}
              {ps.status !== "idle" && ps.status !== "loading" && (
                <tr className="bg-gray-50">
                  <td colSpan={4} className="px-5 py-2">
                    {ps.status === "success" && (
                      <div className="text-xs text-green-700">
                        <p className="font-medium">✓ {ps.message}</p>
                        {ps.sheets && ps.sheets.length > 0 && (
                          <ul className="mt-1 space-y-0.5 text-green-600">
                            {ps.sheets.map((s) => (
                              <li key={s}>· {s}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                    {ps.status === "error" && (
                      <p className="text-xs text-red-600">✗ {ps.message}</p>
                    )}
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
