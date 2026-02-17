"use client";

import { motion } from "framer-motion";
import { useLocaleStore } from "@/stores/localeStore";

export default function ExperienceApp() {
  const t = useLocaleStore((s) => s.t);

  const tasks = [
    t("experience.task.1"),
    t("experience.task.2"),
    t("experience.task.3"),
    t("experience.task.4"),
  ];

  return (
    <div className="h-full flex flex-col p-6 gap-5 overflow-y-auto">
      {/* Company header */}
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl shrink-0 shadow-lg">
          <span aria-hidden="true">💼</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{t("experience.role")}</h2>
          <p className="text-blue-400 font-medium">{t("experience.company")}</p>
          <div className="flex items-center gap-3 mt-1 text-sm text-neutral-500">
            <span><span aria-hidden="true">📅</span> {t("experience.period")}</span>
            <span><span aria-hidden="true">📍</span> {t("experience.location")}</span>
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.map((task, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-3 p-3 bg-neutral-800/50 rounded-lg border border-neutral-700/50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <span className="text-blue-400 mt-0.5">▸</span>
            <p className="text-neutral-300 text-sm leading-relaxed">{task}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
