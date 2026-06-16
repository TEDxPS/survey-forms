"use client";

import "survey-core/survey-core.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { IForm } from "@/types/form";
import Step1BaseInfo from "./Step1BaseInfo";
import Step2GoogleAuth from "./Step2GoogleAuth";
import JsonPreview from "./JsonPreview";
import HelpPanel from "./HelpPanel";

const SurveyCreatorStep = dynamic(() => import("./SurveyCreatorStep"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
      Loading form builder…
    </div>
  ),
});

interface Props {
  initialForm?: Partial<IForm>;
  isEdit?: boolean;
}

const STEPS = ["Base Info", "Google Auth", "Pages"] as const;

export default function FormWizard({ initialForm = {}, isEdit = false }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<IForm>>({
    allowDuplicateEmails: true,
    pages: [],
    ...initialForm,
  });
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [previewOpen, setPreviewOpen] = useState(true);
  const [helpOpen, setHelpOpen] = useState(false);

  function patch(update: Partial<IForm>) {
    setForm((prev) => ({ ...prev, ...update }));
  }

  async function handleSave() {
    setError("");
    setSaving(true);
    try {
      const url = isEdit
        ? `/api/admin/forms/${form.slug}`
        : "/api/admin/forms";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Save failed");
        return;
      }
      router.push("/admin/forms");
      router.refresh();
    } catch {
      setError("Network error, please try again");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
    <HelpPanel open={helpOpen} onClose={() => setHelpOpen(false)} />
    <div className="flex h-[calc(100vh-4rem)]">
      {/* ── Left panel ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden border-r border-gray-200">
        {/* Step indicator */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-0">
            {STEPS.map((label, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <div key={label} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setStep(i as 0 | 1 | 2)}
                    className="flex items-center gap-2"
                  >
                    <span
                      className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors
                        ${done ? "bg-green-500 text-white" : active ? "bg-red-600 text-white" : "bg-gray-200 text-gray-500"}`}
                    >
                      {done ? "✓" : i + 1}
                    </span>
                    <span
                      className={`text-sm font-medium ${active ? "text-gray-900" : "text-gray-400"}`}
                    >
                      {label}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <span className="mx-3 text-gray-300 text-xs">→</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* JSON preview toggle */}
            <button
              type="button"
              onClick={() => setPreviewOpen((o) => !o)}
              title={previewOpen ? "Hide JSON preview" : "Show JSON preview"}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700
                         border border-gray-200 rounded-md px-2.5 py-1.5 transition-colors"
            >
              <span className="font-mono">{"{}"}</span>
              <span>{previewOpen ? "Hide preview" : "Show preview"}</span>
            </button>

            {/* Help */}
            <button
              type="button"
              onClick={() => setHelpOpen(true)}
              title="Open editor help"
              className="flex items-center justify-center w-8 h-8 rounded-md text-gray-400
                         hover:bg-gray-100 hover:text-gray-700 transition-colors text-base"
            >
              ?
            </button>
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {step === 0 && (
            <Step1BaseInfo form={form} onChange={patch} isEdit={isEdit} />
          )}
          {step === 1 && (
            <Step2GoogleAuth form={form} onChange={patch} />
          )}
          {step === 2 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-800">Pages</h2>
              <p className="text-sm text-gray-500">
                Use the editor below to build your form pages and questions.
              </p>
              <SurveyCreatorStep
                pages={(form.pages ?? []) as object[]}
                onPagesChange={(pages) => patch({ pages: pages as IForm["pages"] })}
              />
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div className="flex items-center justify-between px-8 py-4 border-t border-gray-200 bg-white">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1) as 0 | 1 | 2)}
            disabled={step === 0}
            className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-30"
          >
            ← Back
          </button>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {step < 2 ? (
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(2, s + 1) as 0 | 1 | 2)}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-5 py-2 rounded-md"
            >
              Next →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-sm font-medium px-5 py-2 rounded-md"
            >
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Form"}
            </button>
          )}
        </div>
      </div>

      {/* ── Right panel: JSON preview ───────────────────── */}
      <div
        className={`flex flex-col overflow-hidden bg-white transition-all duration-200 ${
          previewOpen ? "w-80 border-l border-gray-200" : "w-0"
        }`}
      >
        {previewOpen && <JsonPreview json={form} />}
      </div>
    </div>
    </>
  );
}
