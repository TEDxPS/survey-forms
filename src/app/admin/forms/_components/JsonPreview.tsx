"use client";

import { useEffect, useRef } from "react";

interface Props {
  json: object;
}

export default function JsonPreview({ json }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    let editor: any;
    (async () => {
      const ace = (await import("ace-builds")).default;
      await import("ace-builds/src-noconflict/mode-json");
      await import("ace-builds/src-noconflict/theme-github");

      if (!containerRef.current) return;
      editor = ace.edit(containerRef.current);
      editor.setTheme("ace/theme/github");
      editor.session.setMode("ace/mode/json");
      editor.setOptions({
        useWorker: false,
        readOnly: true,
        showPrintMargin: false,
        fontSize: 12,
        wrap: true,
      });
      editor.setValue(JSON.stringify(json, null, 2), -1);
      editorRef.current = editor;
    })();
    return () => editor?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!editorRef.current) return;
    editorRef.current.setValue(JSON.stringify(json, null, 2), -1);
  }, [json]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          JSON Preview
        </span>
      </div>
      <div ref={containerRef} className="flex-1" />
    </div>
  );
}
