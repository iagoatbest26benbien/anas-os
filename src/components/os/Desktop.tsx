"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowStore } from "@/stores/windowStore";
import { useLocaleStore } from "@/stores/localeStore";
import { useSettingsStore, wallpapers } from "@/stores/settingsStore";
import { getDesktopApps, type AppDefinition } from "@/lib/appRegistry";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import Taskbar from "./Taskbar";
import ErrorBoundary from "./ErrorBoundary";
import ContextMenu, { type ContextMenuItem } from "./ContextMenu";
import AboutApp from "../apps/AboutApp";
import ProjectsApp from "../apps/ProjectsApp";
import TerminalApp from "../apps/TerminalApp";
import SkillsApp from "../apps/SkillsApp";
import ContactApp from "../apps/ContactApp";
import ExperienceApp from "../apps/ExperienceApp";
import FileManager from "../apps/FileManager";
import PDFViewerApp from "../apps/PDFViewerApp";
import BrowserApp from "../apps/BrowserApp";

const STORAGE_KEY = "anas-os-desktop";

const appComponents: Record<string, React.ComponentType> = {
  about: AboutApp,
  projects: ProjectsApp,
  terminal: TerminalApp,
  skills: SkillsApp,
  contact: ContactApp,
  experience: ExperienceApp,
  "file-manager": FileManager,
  "pdf-viewer": PDFViewerApp,
  browser: BrowserApp,
};

interface DesktopState {
  iconOrder: string[];
  hiddenIcons: string[];
  customNames: Record<string, string>;
}

function loadDesktopState(): DesktopState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function saveDesktopState(state: DesktopState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export default function Desktop() {
  const windows = useWindowStore((s) => s.windows);
  const openWindow = useWindowStore((s) => s.openWindow);
  const t = useLocaleStore((s) => s.t);
  const wallpaper = useSettingsStore((s) => s.getWallpaper());
  const allDesktopApps = getDesktopApps();

  // Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Desktop icon state (order + hidden + custom names), persisted to localStorage
  const [iconOrder, setIconOrder] = useState<string[]>(() => {
    const allIds = allDesktopApps.map((a) => a.id);
    if (typeof window === "undefined") return allIds;
    const saved = loadDesktopState();
    if (saved) {
      const validOrder = saved.iconOrder.filter((id) => allIds.includes(id));
      const newApps = allIds.filter((id) => !validOrder.includes(id));
      return [...validOrder, ...newApps];
    }
    return allIds;
  });
  const [hiddenIcons, setHiddenIcons] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = loadDesktopState();
    const allIds = allDesktopApps.map((a) => a.id);
    return saved ? saved.hiddenIcons.filter((id) => allIds.includes(id)) : [];
  });
  const [customNames, setCustomNames] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};
    const saved = loadDesktopState();
    return saved?.customNames || {};
  });
  const [renamingIconId, setRenamingIconId] = useState<string | null>(null);

  // Save to localStorage on changes
  useEffect(() => {
    if (iconOrder.length > 0) {
      saveDesktopState({ iconOrder, hiddenIcons, customNames });
    }
  }, [iconOrder, hiddenIcons, customNames]);

  // Visible icons in saved order
  const visibleApps: AppDefinition[] = iconOrder
    .filter((id) => !hiddenIcons.includes(id))
    .map((id) => allDesktopApps.find((a) => a.id === id))
    .filter((a): a is AppDefinition => !!a);

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    items: ContextMenuItem[];
  } | null>(null);

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  // Right-click on icon
  const handleIconContextMenu = useCallback(
    (e: React.MouseEvent, app: AppDefinition) => {
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        items: [
          {
            label: t("context.open"),
            icon: "📂",
            onClick: () => openWindow(app.id),
          },
          {
            label: t("context.rename"),
            icon: "✏️",
            onClick: () => setRenamingIconId(app.id),
          },
          {
            label: t("context.hideFromDesktop"),
            icon: "👁️",
            separator: true,
            onClick: () => setHiddenIcons((prev) => [...prev, app.id]),
          },
        ],
      });
    },
    [t, openWindow]
  );

  // Right-click on desktop background
  const handleDesktopContextMenu = useCallback(
    (e: React.MouseEvent) => {
      // Only trigger on the background, not on icons or windows
      if ((e.target as HTMLElement).closest("[data-window]") || (e.target as HTMLElement).closest("button")) {
        return;
      }
      e.preventDefault();

      const hiddenApps = allDesktopApps.filter((a) => hiddenIcons.includes(a.id));
      const showItems: ContextMenuItem[] = hiddenApps.map((app) => ({
        label: `${t("context.showOnDesktop")}: ${t(app.titleKey)}`,
        icon: app.icon,
        onClick: () => setHiddenIcons((prev) => prev.filter((id) => id !== app.id)),
      }));

      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        items: [
          ...(showItems.length > 0
            ? [
                ...showItems,
                { label: "", icon: "", onClick: () => {}, separator: true } as ContextMenuItem,
              ]
            : []),
          {
            label: t("context.sortByName"),
            icon: "🔤",
            onClick: () => {
              const sorted = [...iconOrder].sort((a, b) => {
                const appA = allDesktopApps.find((x) => x.id === a);
                const appB = allDesktopApps.find((x) => x.id === b);
                return (appA ? t(appA.titleKey) : a).localeCompare(appB ? t(appB.titleKey) : b);
              });
              setIconOrder(sorted);
            },
          },
          {
            label: t("context.changeWallpaper"),
            icon: "🖼️",
            onClick: () => {
              const store = useSettingsStore.getState();
              const currentIdx = wallpapers.findIndex((w) => w.id === store.wallpaperId);
              const nextIdx = (currentIdx + 1) % wallpapers.length;
              store.setWallpaper(wallpapers[nextIdx].id);
            },
          },
          {
            label: t("context.resetLayout"),
            icon: "↩️",
            separator: true,
            onClick: () => {
              const allIds = allDesktopApps.map((a) => a.id);
              setIconOrder(allIds);
              setHiddenIcons([]);
              setCustomNames({});
            },
          },
        ],
      });
    },
    [t, allDesktopApps, hiddenIcons, iconOrder]
  );

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ backgroundColor: "#0a0a1a" }}
      onContextMenu={handleDesktopContextMenu}
    >
      {/* Wallpaper with crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={wallpaper.id}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${wallpaper.path}')` }}
          initial={mounted ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>

      {/* Desktop icons — vertical column layout, top to bottom then next column */}
      <motion.div
        className="absolute inset-0 bottom-12 p-4 flex flex-col flex-wrap gap-2 content-start items-start"
        initial={mounted ? "hidden" : "visible"}
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.06, delayChildren: 0.2 },
          },
        }}
      >
        {visibleApps.map((app) => (
          <motion.div
            key={app.id}
            variants={{
              hidden: { opacity: 0, y: 15, scale: 0.9 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
          >
            <DesktopIcon
              icon={app.icon}
              label={customNames[app.id] || t(app.titleKey)}
              onDoubleClick={() => openWindow(app.id)}
              onContextMenu={(e) => handleIconContextMenu(e, app)}
              isRenaming={renamingIconId === app.id}
              onRename={(newName) => {
                if (newName.trim()) {
                  setCustomNames((prev) => ({ ...prev, [app.id]: newName.trim() }));
                } else {
                  // Empty name = reset to default
                  setCustomNames((prev) => {
                    const next = { ...prev };
                    delete next[app.id];
                    return next;
                  });
                }
                setRenamingIconId(null);
              }}
              onCancelRename={() => setRenamingIconId(null)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Windows */}
      {windows.map((win) => {
        const AppComponent = appComponents[win.appId];
        return (
          <Window key={win.id} window={win}>
            <ErrorBoundary appName={win.appId}>
              {AppComponent ? (
                <AppComponent />
              ) : (
                <div className="p-4 text-neutral-400">
                  <p>Application: {win.appId}</p>
                </div>
              )}
            </ErrorBoundary>
          </Window>
        );
      })}

      {/* Hire Me CTA */}
      <motion.button
        className="absolute bottom-16 right-4 z-[9000] flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-full shadow-lg shadow-blue-500/25 font-medium text-sm"
        onClick={() => openWindow("contact")}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={mounted ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        <span aria-hidden="true">💼</span>
        {t("cta.hire")}
      </motion.button>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenu.items}
          onClose={closeContextMenu}
        />
      )}

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
}
