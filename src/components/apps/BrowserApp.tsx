"use client";

import { useState } from "react";
import { useLocaleStore } from "@/stores/localeStore";

interface BrowserAppProps {
  initialUrl?: string;
}

export default function BrowserApp({
  initialUrl = "about:blank",
}: BrowserAppProps) {
  const t = useLocaleStore((s) => s.t);
  const [url, setUrl] = useState(initialUrl);
  const [inputUrl, setInputUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let target = inputUrl;
    if (!target.startsWith("http")) {
      target = `https://${target}`;
    }
    setUrl(target);
    setIsLoading(true);
  };

  return (
    <div className="h-full flex flex-col">
      {/* URL bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-neutral-800 bg-neutral-900/50">
        {/* Navigation buttons */}
        <div className="flex items-center gap-0.5">
          <button
            className="px-1.5 py-1 rounded hover:bg-neutral-800 text-neutral-500 text-sm transition-colors cursor-not-allowed"
            aria-label="Back"
            disabled
          >
            ←
          </button>
          <button
            className="px-1.5 py-1 rounded hover:bg-neutral-800 text-neutral-500 text-sm transition-colors cursor-not-allowed"
            aria-label="Forward"
            disabled
          >
            →
          </button>
          <button
            className="px-1.5 py-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white text-sm transition-colors"
            onClick={() => { setUrl(url); setIsLoading(true); }}
            aria-label="Refresh"
          >
            ↻
          </button>
        </div>
        <button
          className="px-2 py-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white text-sm transition-colors"
          onClick={() => {
            setUrl("about:blank");
            setInputUrl("about:blank");
          }}
          aria-label="Home"
        >
          <span aria-hidden="true">🏠</span>
        </button>
        <form onSubmit={handleNavigate} className="flex-1 flex">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-1 bg-neutral-800 rounded-md px-3 py-1.5 text-sm text-white placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            placeholder={t("browser.placeholder")}
          />
        </form>
        {isLoading && (
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 bg-white">
        {url === "about:blank" ? (
          <div className="h-full flex items-center justify-center bg-neutral-900">
            <div className="text-center">
              <p className="text-2xl mb-2" aria-hidden="true">🌐</p>
              <p className="text-neutral-400 text-sm">
                {t("browser.title")}
              </p>
            </div>
          </div>
        ) : (
          <iframe
            src={url}
            className="w-full h-full border-0"
            title={url}
            sandbox="allow-scripts allow-same-origin allow-popups"
            onLoad={() => setIsLoading(false)}
          />
        )}
      </div>
    </div>
  );
}
