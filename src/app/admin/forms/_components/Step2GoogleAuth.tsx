"use client";

import { useState } from "react";
import { IForm } from "@/types/form";

interface Props {
  form: Partial<IForm>;
  onChange: (patch: Partial<IForm>) => void;
}

const inputCls =
  "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent";

export default function Step2GoogleAuth({ form, onChange }: Props) {
  const [pasteOpen, setPasteOpen] = useState(false);
  const [pasteJson, setPasteJson] = useState("");
  const [pasteError, setPasteError] = useState("");

  type GoogleConfig = NonNullable<IForm["google"]>;
  const google: Partial<GoogleConfig> = form.google ?? {};

  function setGoogle(patch: Record<string, unknown>) {
    onChange({ google: { ...google, ...patch } as NonNullable<IForm["google"]> });
  }

  function applyPastedJson() {
    try {
      const parsed = JSON.parse(pasteJson);
      onChange({
        google: {
          sheetId: google.sheetId,
          driveFolderId: google.driveFolderId,
          ...parsed,
        } as NonNullable<IForm["google"]>,
      });
      setPasteOpen(false);
      setPasteJson("");
      setPasteError("");
    } catch {
      setPasteError("Invalid JSON — please paste the raw service account JSON.");
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Google Auth</h2>
        <button
          type="button"
          onClick={() => setPasteOpen(true)}
          className="text-sm text-red-600 hover:underline"
        >
          Paste service account JSON
        </button>
      </div>

      {/* Paste overlay */}
      {pasteOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6">
            <h3 className="text-base font-semibold text-gray-800 mb-3">
              Paste Service Account JSON
            </h3>
            <p className="text-xs text-gray-500 mb-3">
              Paste the entire contents of your <code>google-services.json</code> file.
              Existing <code>sheetId</code> and <code>driveFolderId</code> values will be preserved.
            </p>
            <textarea
              rows={10}
              value={pasteJson}
              onChange={(e) => { setPasteJson(e.target.value); setPasteError(""); }}
              className={`${inputCls} font-mono text-xs`}
              placeholder='{ "type": "service_account", "project_id": "...", ... }'
            />
            {pasteError && <p className="text-red-600 text-xs mt-2">{pasteError}</p>}
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => { setPasteOpen(false); setPasteError(""); }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyPastedJson}
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sheet & Drive */}
      <fieldset className="border border-gray-200 rounded-md p-4 space-y-3">
        <legend className="text-xs font-semibold text-gray-500 px-1 uppercase tracking-wider">
          Sheet &amp; Drive
        </legend>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Google Sheet ID</label>
          <input type="text" value={(google.sheetId as string) ?? ""} onChange={(e) => setGoogle({ sheetId: e.target.value })} placeholder="1aBcDeFgHiJk…" className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Drive Folder ID</label>
          <input type="text" value={(google.driveFolderId as string) ?? ""} onChange={(e) => setGoogle({ driveFolderId: e.target.value })} placeholder="1YfwjATxb6_…" className={inputCls} />
        </div>
      </fieldset>

      {/* Service Account fields */}
      <fieldset className="border border-gray-200 rounded-md p-4 space-y-3">
        <legend className="text-xs font-semibold text-gray-500 px-1 uppercase tracking-wider">
          Service Account
        </legend>
        {(
          [
            { key: "client_email", label: "Client Email", placeholder: "service@project.iam.gserviceaccount.com" },
            { key: "project_id",   label: "Project ID",   placeholder: "my-project-id" },
            { key: "private_key_id", label: "Private Key ID", placeholder: "abc123…" },
            { key: "client_id",    label: "Client ID",    placeholder: "123456789…" },
          ] as const
        ).map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input type="text" value={(google[key] as string) ?? ""} onChange={(e) => setGoogle({ [key]: e.target.value })} placeholder={placeholder} className={inputCls} />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Private Key</label>
          <textarea
            rows={5}
            value={(google.private_key as string) ?? ""}
            onChange={(e) => setGoogle({ private_key: e.target.value })}
            placeholder={"-----BEGIN PRIVATE KEY-----\n…\n-----END PRIVATE KEY-----\n"}
            className={`${inputCls} font-mono text-xs`}
          />
        </div>

        {(
          [
            { key: "auth_uri",                    label: "Auth URI",                    placeholder: "https://accounts.google.com/o/oauth2/auth" },
            { key: "token_uri",                   label: "Token URI",                   placeholder: "https://oauth2.googleapis.com/token" },
            { key: "auth_provider_x509_cert_url", label: "Auth Provider Cert URL",     placeholder: "https://www.googleapis.com/oauth2/v1/certs" },
            { key: "client_x509_cert_url",        label: "Client Cert URL",            placeholder: "https://www.googleapis.com/robot/…" },
            { key: "universe_domain",             label: "Universe Domain",            placeholder: "googleapis.com" },
          ] as const
        ).map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input type="text" value={(google[key] as string) ?? ""} onChange={(e) => setGoogle({ [key]: e.target.value })} placeholder={placeholder} className={inputCls} />
          </div>
        ))}
      </fieldset>
    </div>
  );
}
