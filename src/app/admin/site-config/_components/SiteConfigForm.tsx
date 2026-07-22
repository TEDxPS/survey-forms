"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ResolvedSiteConfig } from "@/libs/siteConfig";
import { SocialLink } from "@/types/siteConfig";

interface Props {
  initialConfig: ResolvedSiteConfig;
}

const inputCls =
  "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent";

const emptyLink: SocialLink = { platform: "", icon: "", url: "", label: "" };

export default function SiteConfigForm({ initialConfig }: Props) {
  const router = useRouter();
  const [config, setConfig] = useState<ResolvedSiteConfig>(initialConfig);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function patch(update: Partial<ResolvedSiteConfig>) {
    setSaved(false);
    setConfig((prev) => ({ ...prev, ...update }));
  }

  function patchLink(index: number, update: Partial<SocialLink>) {
    const socialLinks = config.socialLinks.map((link, i) =>
      i === index ? { ...link, ...update } : link
    );
    patch({ socialLinks });
  }

  function addLink() {
    patch({ socialLinks: [...config.socialLinks, { ...emptyLink }] });
  }

  function removeLink(index: number) {
    patch({ socialLinks: config.socialLinks.filter((_, i) => i !== index) });
  }

  async function handleSave() {
    setError("");
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/site-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Save failed");
        return;
      }
      setSaved(true);
      router.refresh();
    } catch {
      setError("Network error, please try again");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <section className="space-y-5">
        <h2 className="text-lg font-semibold text-gray-800">Metadata</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
          <input
            type="text"
            value={config.siteName}
            onChange={(e) => patch({ siteName: e.target.value })}
            className={inputCls}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Default Title</label>
          <input
            type="text"
            value={config.title}
            onChange={(e) => patch({ title: e.target.value })}
            className={inputCls}
          />
          <p className="mt-1 text-xs text-gray-400">A form&apos;s own `title` field overrides this.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Default Description</label>
          <textarea
            rows={2}
            value={config.description}
            onChange={(e) => patch({ description: e.target.value })}
            className={inputCls}
          />
          <p className="mt-1 text-xs text-gray-400">A form&apos;s own `description` field overrides this.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Keywords <span className="text-gray-400 font-normal">(comma-separated)</span>
          </label>
          <input
            type="text"
            value={config.keywords.join(", ")}
            onChange={(e) =>
              patch({
                keywords: e.target.value
                  .split(",")
                  .map((k) => k.trim())
                  .filter(Boolean),
              })
            }
            className={inputCls}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Canonical Domain <span className="text-gray-400 font-normal">(no trailing slash)</span>
          </label>
          <input
            type="text"
            value={config.domain}
            onChange={(e) => patch({ domain: e.target.value })}
            placeholder="https://forms.example.com"
            className={inputCls}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Repo URL</label>
          <input
            type="text"
            value={config.repoUrl}
            onChange={(e) => patch({ repoUrl: e.target.value })}
            placeholder="https://github.com/your-org/your-fork"
            className={inputCls}
          />
          <p className="mt-1 text-xs text-gray-400">
            Shown in the footer CTA and as a GitHub icon in the header&apos;s social links.
          </p>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-lg font-semibold text-gray-800">Assets</h2>
        <p className="text-xs text-gray-400 -mt-3">
          Paths must point at files that already exist in <span className="font-mono">public/</span>.
        </p>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo Path</label>
          <input
            type="text"
            value={config.logo}
            onChange={(e) => patch({ logo: e.target.value })}
            placeholder="/my-org-logo.png"
            className={inputCls}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Favicon Path</label>
          <input
            type="text"
            value={config.favicon}
            onChange={(e) => patch({ favicon: e.target.value })}
            placeholder="/icons/favicon.ico"
            className={inputCls}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Default Hero Image Path</label>
          <input
            type="text"
            value={config.defaultHeroImage}
            onChange={(e) => patch({ defaultHeroImage: e.target.value })}
            placeholder="/my-org-hero.jpeg"
            className={inputCls}
          />
          <p className="mt-1 text-xs text-gray-400">Used when a form doesn&apos;t set its own `heroImage`.</p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Social Links</h2>
          <button
            type="button"
            onClick={addLink}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            + Add link
          </button>
        </div>
        <p className="text-xs text-gray-400 -mt-2">
          Leave a link out entirely to hide it from the header. Icon paths must already exist in{" "}
          <span className="font-mono">public/</span>.
        </p>

        <div className="space-y-3">
          {config.socialLinks.map((link, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_1fr_1.5fr_1fr_auto] gap-2 items-start border border-gray-200 rounded-md p-3"
            >
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Platform</label>
                <input
                  type="text"
                  value={link.platform}
                  onChange={(e) => patchLink(i, { platform: e.target.value })}
                  placeholder="facebook"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Icon Path</label>
                <input
                  type="text"
                  value={link.icon}
                  onChange={(e) => patchLink(i, { icon: e.target.value })}
                  placeholder="/icons/facebook.png"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">URL</label>
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => patchLink(i, { url: e.target.value })}
                  placeholder="https://facebook.com/..."
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Label <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={link.label ?? ""}
                  onChange={(e) => patchLink(i, { label: e.target.value })}
                  placeholder="Official Site"
                  className={inputCls}
                />
              </div>
              <button
                type="button"
                onClick={() => removeLink(i)}
                title="Remove"
                className="mt-6 h-9 w-9 flex items-center justify-center rounded-md text-gray-400 hover:bg-red-50 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          {config.socialLinks.length === 0 && (
            <p className="text-sm text-gray-400">No social links configured.</p>
          )}
        </div>
      </section>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && !error && <p className="text-sm text-green-600">Saved.</p>}

      <div className="flex justify-end border-t border-gray-200 pt-6">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
