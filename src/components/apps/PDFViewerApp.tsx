"use client";

import { useLocaleStore } from "@/stores/localeStore";

interface PDFViewerAppProps {
  src?: string;
  title?: string;
}

export default function PDFViewerApp({
  src = "/cv/resume-junior-fr.pdf",
  title,
}: PDFViewerAppProps) {
  const t = useLocaleStore((s) => s.t);
  const displayTitle = title || t("app.pdf-viewer");

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-800 bg-neutral-900/50">
        <span className="text-sm text-neutral-400 truncate">{displayTitle}</span>
        <a
          href={src}
          download
          className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
        >
          {t("misc.download")}
        </a>
      </div>

      {/* PDF rendered via browser native */}
      <iframe
        src={src}
        className="flex-1 w-full border-0 bg-neutral-800"
        title={displayTitle}
      />
    </div>
  );
}
