"use client";

import { IForm } from "@/types/form";

interface Props {
  form: Partial<IForm>;
  onChange: (patch: Partial<IForm>) => void;
  isEdit: boolean;
}

const inputCls =
  "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent";

export default function Step1BaseInfo({ form, onChange, isEdit }: Props) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-gray-800">Base Info</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Slug <span className="text-red-500">*</span>
        </label>
        {isEdit ? (
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-gray-700">
              {form.slug}
            </span>
            <span className="text-xs text-gray-400">(cannot be changed after creation)</span>
          </div>
        ) : (
          <>
            <input
              type="text"
              value={form.slug ?? ""}
              onChange={(e) => onChange({ slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
              placeholder="my-form-2026"
              className={inputCls}
            />
            <p className="mt-1 text-xs text-gray-400">Lowercase letters, numbers, and hyphens only.</p>
          </>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.title ?? ""}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Recruitment Form 2026"
          className={inputCls}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image URL</label>
        <input
          type="text"
          value={form.heroImage ?? ""}
          onChange={(e) => onChange({ heroImage: e.target.value })}
          placeholder="https://example.com/cover.jpg"
          className={inputCls}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
          <input
            type="datetime-local"
            value={form.expiry?.date ? form.expiry.date.slice(0, 16) : ""}
            onChange={(e) =>
              onChange({ expiry: { ...form.expiry, date: e.target.value ? new Date(e.target.value).toISOString() : "" } })
            }
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Expiry Message{" "}
          <span className="text-gray-400 font-normal">(HTML allowed)</span>
        </label>
        <textarea
          rows={3}
          value={form.expiry?.message ?? ""}
          onChange={(e) =>
            onChange({ expiry: { ...form.expiry, date: form.expiry?.date ?? "", message: e.target.value } })
          }
          placeholder="<p>Registration is closed!</p>"
          className={inputCls}
        />
      </div>

      <div className="flex items-center justify-between py-3 border border-gray-200 rounded-md px-4">
        <div>
          <p className="text-sm font-medium text-gray-700">Allow Duplicate Emails</p>
          <p className="text-xs text-gray-400 mt-0.5">
            If off, the same email address can only submit once.
          </p>
        </div>
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={form.allowDuplicateEmails ?? true}
              onChange={(e) => onChange({ allowDuplicateEmails: e.target.checked })}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-red-600 transition-colors" />
            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
          </div>
        </label>
      </div>
    </div>
  );
}
