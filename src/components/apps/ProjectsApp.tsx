"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocaleStore } from "@/stores/localeStore";
import { projects, type Project } from "@/data/projects";

export default function ProjectsApp() {
  const t = useLocaleStore((s) => s.t);
  const locale = useLocaleStore((s) => s.locale);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const allTechs = [...new Set(projects.flatMap((p) => p.stack))].sort();

  const filteredProjects = filter
    ? projects.filter((p) => p.stack.includes(filter))
    : projects;

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-neutral-800 overflow-x-auto" role="tablist">
        <button
          role="tab"
          aria-selected={!filter}
          className={`px-3 py-1 rounded-full text-xs transition-colors shrink-0 ${
            !filter
              ? "bg-blue-600 text-white"
              : "bg-neutral-800 text-neutral-400 hover:text-white"
          }`}
          onClick={() => setFilter(null)}
        >
          {t("projects.all")}
        </button>
        {allTechs.map((tech) => (
          <button
            key={tech}
            role="tab"
            aria-selected={filter === tech}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors shrink-0 ${
              filter === tech
                ? "bg-blue-600 text-white"
                : "bg-neutral-800 text-neutral-400 hover:text-white"
            }`}
            onClick={() => setFilter(tech)}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {selectedProject ? (
          <div className="flex flex-col gap-4">
            <button
              className="text-sm text-blue-400 hover:text-blue-300 self-start"
              onClick={() => setSelectedProject(null)}
            >
              {t("projects.back")}
            </button>

            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">
                {selectedProject.title}
              </h2>
              {selectedProject.featured && (
                <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-[10px] rounded-full font-medium">
                  {t("projects.featured")}
                </span>
              )}
            </div>

            <p className="text-neutral-300 text-sm">
              {selectedProject.description[locale]}
            </p>

            <div className="flex flex-wrap gap-2">
              {selectedProject.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-neutral-800 rounded text-xs text-neutral-400"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Highlights */}
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">
                {t("projects.highlights")}
              </p>
              <ul className="space-y-1.5">
                {selectedProject.highlights[locale].map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                    <span className="text-blue-400 mt-0.5">▸</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 mt-2">
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm text-neutral-300 transition-colors"
                >
                  {t("projects.viewGithub")}
                </a>
              )}
              {selectedProject.live && (
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm text-white transition-colors"
                >
                  {t("projects.viewDemo")}
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.button
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{
                    y: -3,
                    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="flex flex-col gap-2 p-4 bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-700/50 hover:border-blue-500/30 rounded-lg transition-colors text-left"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-medium">{project.title}</h3>
                    {project.featured && (
                      <span className="px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 text-[9px] rounded-full font-medium">
                        ★
                      </span>
                    )}
                  </div>
                  <p className="text-neutral-400 text-sm line-clamp-2">
                    {project.description[locale]}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 bg-neutral-700 rounded text-[10px] text-neutral-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[10px] text-neutral-500">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
