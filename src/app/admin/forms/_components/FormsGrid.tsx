"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormCard {
  slug: string;
  title: string;
  createdAt: string;
  submissionCount: number;
  expiryStatus: "active" | "expired" | "none";
  expiryDate: string | null;
  hasSheet: boolean;
  hasFileStorage: boolean;
  hasAuth: boolean;
  pageCount: number;
  questionCount: number;
  allowDuplicateEmails: boolean;
}

interface PopulateState {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
  sheets?: string[];
}

export default function FormsGrid({ forms }: { forms: FormCard[] }) {
  const router = useRouter();
  const [populateStates, setPopulateStates] = useState<Record<string, PopulateState>>({});

  function setSlugState(slug: string, state: PopulateState) {
    setPopulateStates((prev) => ({ ...prev, [slug]: state }));
  }

  async function handleDelete(slug: string, title: string) {
    if (!confirm(`Delete "${title}" (${slug})?\nThis cannot be undone.`)) return;
    const res = await fetch(`/api/admin/forms/${slug}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else alert("Delete failed");
  }

  async function handlePopulate(slug: string) {
    if (!confirm(`Initialize Google Sheet headers for "${slug}"?\n\nRow 1 of Sheet1 will be overwritten.`)) return;
    setSlugState(slug, { status: "loading" });
    try {
      const res = await fetch(`/api/admin/forms/${slug}/populate`, { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setSlugState(slug, { status: "error", message: data.error });
      } else {
        setSlugState(slug, { status: "success", message: data.message, sheets: data.sheets });
      }
    } catch {
      setSlugState(slug, { status: "error", message: "Network error. Please try again." });
    }
  }

  if (forms.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 border-2 border-dashed border-gray-300 rounded-xl">
        <p className="text-4xl mb-3">📋</p>
        <p className="text-base font-medium text-gray-500">No forms yet</p>
        <Link href="/admin/forms/new" className="mt-2 inline-block text-red-600 hover:underline text-sm">
          Create your first form →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      {forms.map((f) => {
        const ps = populateStates[f.slug] ?? { status: "idle" };
        const configScore = [f.hasAuth, f.hasSheet, f.hasFileStorage].filter(Boolean).length;

        return (
          <Fragment key={f.slug}>
            <div className="bg-white border-2 border-gray-200 rounded-xl shadow hover:shadow-lg
                            hover:border-gray-300 transition-all flex flex-col">

              {/* ── Card header ──────────────────────────────── */}
              <div className="px-6 pt-6 pb-4 border-b-2 border-gray-100">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="font-bold text-gray-900 text-lg leading-snug truncate">
                      {f.title}
                    </h2>
                    <span className="inline-block mt-1.5 font-mono text-sm text-gray-500
                                     bg-gray-100 border border-gray-200 px-2.5 py-0.5 rounded">
                      /{f.slug}
                    </span>
                  </div>

                  {/* Expiry badge */}
                  {f.expiryStatus === "expired" && (
                    <span className="shrink-0 text-xs font-semibold bg-red-100 text-red-700
                                     border border-red-200 px-3 py-1.5 rounded-full">
                      Expired {f.expiryDate}
                    </span>
                  )}
                  {f.expiryStatus === "active" && (
                    <span className="shrink-0 text-xs font-semibold bg-green-100 text-green-700
                                     border border-green-200 px-3 py-1.5 rounded-full">
                      Active · expires {f.expiryDate}
                    </span>
                  )}
                  {f.expiryStatus === "none" && (
                    <span className="shrink-0 text-xs font-semibold bg-gray-100 text-gray-500
                                     border border-gray-200 px-3 py-1.5 rounded-full">
                      No expiry
                    </span>
                  )}
                </div>
              </div>

              {/* ── Stats row ────────────────────────────────── */}
              <div className="px-6 py-4 grid grid-cols-3 gap-2 border-b-2 border-gray-100">
                <Stat icon="📥" value={f.submissionCount} label="Submissions" />
                <Stat icon="📄" value={f.pageCount} label={f.pageCount === 1 ? "Page" : "Pages"} />
                <Stat icon="❓" value={f.questionCount} label="Questions" />
              </div>

              {/* ── Config & meta ─────────────────────────────── */}
              <div className="px-6 py-3.5 flex flex-wrap items-center gap-2.5 border-b-2 border-gray-100">
                <ConfigBadge ok={f.hasAuth}  label="Auth"  icon="🔑" />
                <ConfigBadge ok={f.hasSheet} label="Sheet" icon="📊" />
                <ConfigBadge ok={f.hasFileStorage} label="Storage" icon="🪣" />

                <div className="ml-auto flex items-center gap-3 text-sm text-gray-500">
                  {!f.allowDuplicateEmails && (
                    <span className="text-blue-600 font-medium">No duplicate emails</span>
                  )}
                  <span>Created {f.createdAt}</span>
                </div>
              </div>

              {/* ── Config warning ───────────────────────────── */}
              {configScore < 3 && (
                <div className="px-6 py-2.5 bg-amber-50 border-b-2 border-amber-100">
                  <p className="text-sm text-amber-800">
                    ⚠️ Missing:
                    {!f.hasAuth  && " Google credentials"}
                    {!f.hasAuth && (!f.hasSheet || !f.hasFileStorage) && ","}
                    {!f.hasSheet && " Sheet ID"}
                    {!f.hasSheet && !f.hasFileStorage && ","}
                    {!f.hasFileStorage && " File storage configuration"}
                    {" — submissions won't sync to Google / uploads will fail."}
                  </p>
                </div>
              )}

              {/* ── Populate result ──────────────────────────── */}
              {ps.status === "success" && (
                <div className="px-6 py-2.5 bg-green-50 border-b-2 border-green-100">
                  <p className="text-sm font-medium text-green-800">✓ {ps.message}</p>
                  {ps.sheets && (
                    <p className="mt-0.5 text-sm text-green-700">{ps.sheets.join("  ·  ")}</p>
                  )}
                </div>
              )}
              {ps.status === "error" && (
                <div className="px-6 py-2.5 bg-red-50 border-b-2 border-red-100">
                  <p className="text-sm text-red-700">✗ {ps.message}</p>
                </div>
              )}

              {/* ── Actions ──────────────────────────────────── */}
              <div className="px-6 py-4 flex items-center gap-2 mt-auto">
                <button
                  onClick={() => handlePopulate(f.slug)}
                  disabled={ps.status === "loading" || !f.hasAuth || !f.hasSheet}
                  title={!f.hasAuth || !f.hasSheet ? "Requires Google Auth + Sheet ID" : "Initialize Google Sheet headers"}
                  className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg
                             bg-green-50 text-green-800 hover:bg-green-100 border-2 border-green-200
                             disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <span>{ps.status === "loading" ? "⟳" : "📊"}</span>
                  Populate Sheet
                </button>

                <div className="flex items-center gap-1 ml-auto">
                  <Link
                    href={`/${f.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open public form"
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500
                               hover:bg-gray-100 hover:text-gray-800 transition-colors text-base"
                  >
                    ↗
                  </Link>
                  <Link
                    href={`/admin/forms/${f.slug}`}
                    title="Edit form"
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500
                               hover:bg-red-50 hover:text-red-600 transition-colors text-base"
                  >
                    ✏️
                  </Link>
                  <button
                    onClick={() => handleDelete(f.slug, f.title)}
                    title="Delete form"
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500
                               hover:bg-red-50 hover:text-red-600 transition-colors text-base"
                  >
                    🗑️
                  </button>
                </div>
              </div>

            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

function Stat({ icon, value, label }: { icon: string; value: number; label: string }) {
  return (
    <div className="text-center py-1">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{icon} {label}</p>
    </div>
  );
}

function ConfigBadge({ ok, label, icon }: { ok: boolean; label: string; icon: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm px-3 py-1 rounded-full font-medium border
      ${ok
        ? "bg-green-50 text-green-800 border-green-300"
        : "bg-gray-50 text-gray-500 border-gray-300"
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
      <span className={ok ? "text-green-600 font-bold" : "text-gray-400 font-bold"}>
        {ok ? "✓" : "✗"}
      </span>
    </span>
  );
}
