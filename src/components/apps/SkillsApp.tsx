"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocaleStore } from "@/stores/localeStore";
import { skills, categoryKeys, type SkillCategory } from "@/data/skills";
import type { TranslationKey } from "@/lib/i18n";

const categoryI18nKeys: Record<SkillCategory, TranslationKey> = {
  frontend: "skills.frontend",
  backend: "skills.backend",
  devops: "skills.devops",
  ai: "skills.ai",
  databases: "skills.databases",
  tools: "skills.tools",
};

export default function SkillsApp() {
  const t = useLocaleStore((s) => s.t);
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "all">("all");

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <div className="h-full flex flex-col">
      {/* Category tabs */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-neutral-800 overflow-x-auto" role="tablist">
        <button
          role="tab"
          aria-selected={activeCategory === "all"}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
            activeCategory === "all"
              ? "bg-blue-600 text-white"
              : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
          }`}
          onClick={() => setActiveCategory("all")}
        >
          {t("skills.all")}
        </button>
        {categoryKeys.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeCategory === cat
                ? "bg-blue-600 text-white"
                : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {t(categoryI18nKeys[cat])}
          </button>
        ))}
      </div>

      {/* Skills list - key forces re-mount to re-animate */}
      <div key={activeCategory} className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredSkills.map((skill, i) => (
          <div key={skill.name} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white font-semibold">{skill.name}</span>
              <span className="text-xs text-neutral-400">{skill.level}%</span>
            </div>
            <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full skill-bar-gradient"
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 0.8, delay: i * 0.03, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
