"use client";

import { motion } from "framer-motion";
import { useLocaleStore } from "@/stores/localeStore";
import { profile } from "@/data/profile";

export default function ContactApp() {
  const t = useLocaleStore((s) => s.t);

  return (
    <div className="h-full flex flex-col p-4 sm:p-6 gap-5 overflow-y-auto">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-white">{t("contact.title")}</h2>
        <p className="text-neutral-400 text-sm mt-1">{t("contact.subtitle")}</p>
      </div>

      {/* Links */}
      <div className="space-y-2">
        <motion.a
          href={`mailto:${profile.email}`}
          whileHover={{ x: 4 }}
          className="flex items-center gap-3 w-full px-4 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
        >
          <span className="text-xl" aria-hidden="true">✉️</span>
          <div>
            <p className="text-white text-sm font-medium">{t("contact.email")}</p>
            <p className="text-neutral-500 text-xs">{profile.email}</p>
          </div>
        </motion.a>

        <motion.a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 4 }}
          className="flex items-center gap-3 w-full px-4 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
          aria-label="GitHub (opens in new tab)"
        >
          <span className="text-xl" aria-hidden="true">🐙</span>
          <div>
            <p className="text-white text-sm font-medium">GitHub</p>
            <p className="text-neutral-500 text-xs">iagoatbest26benbien</p>
          </div>
        </motion.a>

        <motion.a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 4 }}
          className="flex items-center gap-3 w-full px-4 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
          aria-label="LinkedIn (opens in new tab)"
        >
          <span className="text-xl" aria-hidden="true">💼</span>
          <div>
            <p className="text-white text-sm font-medium">LinkedIn</p>
            <p className="text-neutral-500 text-xs">anas-el-manssouri</p>
          </div>
        </motion.a>
      </div>

      {/* CV Downloads */}
      <div>
        <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">
          {t("contact.downloadCv")}
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2">
          <a
            href={profile.cvs.en}
            download
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm text-white transition-colors"
          >
            <span aria-hidden="true">📄</span> {t("contact.cv.en")}
          </a>
          <a
            href={profile.cvs.fr}
            download
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm text-white transition-colors"
          >
            <span aria-hidden="true">📄</span> {t("contact.cv.fr")}
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
