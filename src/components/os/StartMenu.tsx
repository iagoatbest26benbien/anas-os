"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getStartMenuApps } from "@/lib/appRegistry";
import { useWindowStore } from "@/stores/windowStore";
import { useLocaleStore } from "@/stores/localeStore";
import { useSettingsStore, wallpapers } from "@/stores/settingsStore";
import { useIsMobile } from "@/hooks/useIsMobile";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StartMenu({ isOpen, onClose }: StartMenuProps) {
  const isMobile = useIsMobile();
  const openWindow = useWindowStore((s) => s.openWindow);
  const t = useLocaleStore((s) => s.t);
  const apps = getStartMenuApps();
  const { wallpaperId, setWallpaper } = useSettingsStore();
  const [showSettings, setShowSettings] = useState(false);

  const handleAppClick = (appId: string) => {
    openWindow(appId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[9998]" onClick={onClose} />

          <motion.div
            className={`absolute bottom-14 left-2 ${isMobile ? "w-[calc(100vw-16px)]" : "w-80"} bg-neutral-900/95 backdrop-blur-2xl rounded-xl border border-white/10 shadow-[0_8px_50px_rgba(0,0,0,0.6)] z-[9999] overflow-hidden`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/5">
              <h2 className="text-white font-semibold">{t("system.name")}</h2>
              <p className="text-xs text-neutral-500">{t("system.subtitle")}</p>
            </div>

            <AnimatePresence mode="wait">
              {showSettings ? (
                <motion.div
                  key="settings"
                  className="p-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <button
                    className="text-xs text-blue-400 hover:text-blue-300 mb-3"
                    onClick={() => setShowSettings(false)}
                  >
                    {t("system.back")}
                  </button>

                  {/* Wallpaper picker */}
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">
                    {t("system.wallpaper")}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {wallpapers.map((wp) => (
                      <button
                        key={wp.id}
                        className={`w-full aspect-video rounded-md bg-gradient-to-br ${wp.gradient} border transition-all ${
                          wallpaperId === wp.id
                            ? "border-blue-400 ring-1 ring-blue-400/50 scale-105"
                            : "border-white/10 hover:border-white/20"
                        }`}
                        onClick={() => setWallpaper(wp.id)}
                        title={wp.name}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="apps"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Apps grid */}
                  <div className={`p-3 grid ${isMobile ? "grid-cols-4" : "grid-cols-3"} gap-1`}>
                    {apps.map((app) => (
                      <button
                        key={app.id}
                        className="flex flex-col items-center gap-1.5 p-3 rounded-lg hover:bg-white/10 transition-colors"
                        onClick={() => handleAppClick(app.id)}
                      >
                        <span className="text-2xl">{app.icon}</span>
                        <span className="text-[11px] text-neutral-300 text-center leading-tight">
                          {t(app.titleKey)}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-neutral-500">Anas El Manssouri</span>
              <button
                className="text-xs text-neutral-400 hover:text-white transition-colors"
                onClick={() => setShowSettings(!showSettings)}
              >
                <span aria-hidden="true">⚙️</span> {t("system.settings")}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
