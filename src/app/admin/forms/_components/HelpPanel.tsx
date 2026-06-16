"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function HelpPanel({ open, onClose }: Props) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || content) return;
    setLoading(true);
    fetch("/api/admin/docs")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setContent(data.content);
      })
      .catch(() => setError("Failed to load documentation"))
      .finally(() => setLoading(false));
  }, [open, content]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />

      {/* Slide-in panel — 65vw, min 640px */}
      <div className="fixed top-0 right-0 z-50 h-full bg-white shadow-2xl flex flex-col"
           style={{ width: "clamp(640px, 65vw, 960px)" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-lg">📖</span>
            <h2 className="font-semibold text-gray-800">Form Editor Help</h2>
            <span className="text-xs text-gray-400 ml-1">populate-google-sheet.md</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400
                       hover:bg-gray-200 hover:text-gray-700 transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {loading && (
            <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
              Loading…
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {content && (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                /* ── Headings ─────────────────────────── */
                h1: ({ children }) => (
                  <h1 className="text-xl font-bold text-gray-900 mt-8 mb-3 pb-2 border-b border-gray-200 first:mt-0">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-base font-semibold text-gray-800 mt-7 mb-2">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-sm font-semibold text-gray-700 mt-5 mb-1.5">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-sm font-semibold text-red-700 mt-4 mb-1.5 font-mono">
                    {children}
                  </h4>
                ),

                /* ── Paragraph ───────────────────────── */
                p: ({ children }) => (
                  <p className="text-sm text-gray-800 leading-relaxed mb-3">{children}</p>
                ),

                /* ── Code ────────────────────────────────────────────
                   react-markdown v8 removed the `inline` prop.
                   Detect inline vs block by checking for a language class:
                   block code always has className="language-xxx", inline never does.
                ─────────────────────────────────────────────────── */
                code: ({ className, children }: any) => {
                  const isBlock = Boolean(className?.startsWith("language-"));
                  if (isBlock) {
                    return (
                      <code className="text-green-300 text-xs font-mono leading-relaxed">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="bg-red-50 text-red-700 text-xs font-mono px-1.5 py-0.5 rounded border border-red-100">
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="bg-gray-900 rounded-lg px-4 py-3 my-3 overflow-x-auto text-xs leading-relaxed">
                    {children}
                  </pre>
                ),

                /* ── Table ───────────────────────────── */
                table: ({ children }) => (
                  <div className="overflow-x-auto my-4">
                    <table className="w-full text-xs border-collapse border border-gray-200 rounded-lg overflow-hidden">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-gray-50">{children}</thead>
                ),
                th: ({ children }) => (
                  <th className="text-left px-3 py-2 font-semibold text-gray-600 border border-gray-200 text-xs">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-3 py-2 border border-gray-200 text-gray-800 align-top leading-relaxed">
                    {children}
                  </td>
                ),
                tr: ({ children }) => (
                  <tr className="even:bg-gray-50">{children}</tr>
                ),

                /* ── Lists ───────────────────────────── */
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-sm text-gray-800 space-y-1.5 mb-3 pl-2">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-sm text-gray-800 space-y-1.5 mb-3 pl-2">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed text-gray-800">{children}</li>
                ),

                /* ── Blockquote ──────────────────────── */
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-red-400 pl-4 my-3 text-sm text-gray-500 italic bg-red-50 py-2 rounded-r-md">
                    {children}
                  </blockquote>
                ),

                /* ── HR ──────────────────────────────── */
                hr: () => <hr className="my-6 border-gray-200" />,

                /* ── Strong / Em ─────────────────────── */
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-900">{children}</strong>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </>
  );
}
