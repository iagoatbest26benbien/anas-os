"use client";

import { useEffect, useState } from "react";
import { useLocaleStore } from "@/stores/localeStore";
import { profile } from "@/data/profile";

export default function AboutApp() {
  const t = useLocaleStore((s) => s.t);
  const locale = useLocaleStore((s) => s.locale);

  const bio = t("about.bio.1") + "\n\n" + t("about.bio.2");
  const [displayedBio, setDisplayedBio] = useState("");
  const [bioComplete, setBioComplete] = useState(false);

  useEffect(() => {
    setDisplayedBio("");
    setBioComplete(false);
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedBio(bio.slice(0, index + 1));
      index++;
      if (index >= bio.length) {
        clearInterval(interval);
        setBioComplete(true);
      }
    }, 12);
    return () => clearInterval(interval);
  }, [bio]);

  return (
    <div className="h-full flex flex-col p-4 sm:p-6 gap-5 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-5">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-lg">
          {profile.initials}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-white">{t("about.title")}</h1>
          <p className="text-blue-400 font-medium mt-1">{t("about.role")}</p>
          <p className="text-neutral-500 text-sm mt-1">
            <span aria-hidden="true">📍</span> {t("about.location")}
          </p>
          <p className="text-neutral-500 text-xs mt-1">
            <span aria-hidden="true">🎓</span> {t("about.education")}
          </p>
        </div>
      </div>

      {/* Bio */}
      <div className="bg-neutral-800/50 rounded-lg p-4 border border-neutral-700/50">
        <p className="text-neutral-300 leading-relaxed whitespace-pre-line text-sm">
          {displayedBio}
          {!bioComplete && (
            <span className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5 animate-pulse" />
          )}
        </p>
        {!bioComplete && (
          <button
            className="text-xs text-neutral-500 hover:text-neutral-300 mt-2 transition-colors"
            onClick={() => {
              setDisplayedBio(bio);
              setBioComplete(true);
            }}
          >
            {t("about.skipAnimation")}
          </button>
        )}
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-2">
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm text-neutral-300 transition-colors"
          aria-label="GitHub (opens in new tab)"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 016.02 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm text-neutral-300 transition-colors"
          aria-label="LinkedIn (opens in new tab)"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.47 2H3.53A1.45 1.45 0 002.06 3.43v17.14A1.45 1.45 0 003.53 22h16.94a1.45 1.45 0 001.47-1.43V3.43A1.45 1.45 0 0020.47 2zM8.09 18.74h-3v-9h3v9zM6.59 8.48a1.56 1.56 0 11.04-3.12 1.57 1.57 0 01-.04 3.12zm12.32 10.26h-3v-4.83c0-1.21-.43-2-1.52-2A1.65 1.65 0 0012.85 13a2 2 0 00-.1.73v5h-3v-9h3v1.2a3 3 0 012.71-1.5c2 0 3.45 1.29 3.45 4.06v5.25z"/>
          </svg>
          LinkedIn
        </a>
      </div>

      {/* CVs */}
      <div>
        <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">
          {t("contact.downloadCv")}
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href={profile.cvs.fr}
            download
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm text-white transition-colors"
          >
            <span aria-hidden="true">📄</span> {t("contact.cv.fr")}
          </a>
          <a
            href={profile.cvs.en}
            download
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm text-white transition-colors"
          >
            <span aria-hidden="true">📄</span> {t("contact.cv.en")}
          </a>
          <a
            href={profile.cvs.alternance}
            download
            className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm text-neutral-300 transition-colors"
          >
            <span aria-hidden="true">📄</span> {t("contact.cv.alternance")}
          </a>
        </div>
      </div>
    </div>
  );
}
