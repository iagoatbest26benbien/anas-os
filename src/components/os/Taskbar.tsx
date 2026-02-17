"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useWindowStore } from "@/stores/windowStore";
import { useLocaleStore } from "@/stores/localeStore";
import { getApp } from "@/lib/appRegistry";
import { useIsMobile } from "@/hooks/useIsMobile";
import StartMenu from "./StartMenu";

export default function Taskbar() {
  const isMobile = useIsMobile();
  const windows = useWindowStore((s) => s.windows);
  const activeWindowId = useWindowStore((s) => s.activeWindowId);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const restoreWindow = useWindowStore((s) => s.restoreWindow);
  const t = useLocaleStore((s) => s.t);
  const locale = useLocaleStore((s) => s.locale);
  const toggleLocale = useLocaleStore((s) => s.toggleLocale);

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  useEffect(() => {
    const loc = locale === "fr" ? "fr-FR" : "en-US";
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" }));
      setDate(now.toLocaleDateString(loc, { day: "2-digit", month: "2-digit", year: "numeric" }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [locale]);

  const handleTaskbarClick = (windowId: string, isMinimized: boolean) => {
    if (activeWindowId === windowId && !isMinimized) {
      minimizeWindow(windowId);
    } else if (isMinimized) {
      restoreWindow(windowId);
    } else {
      focusWindow(windowId);
    }
  };

  return (
    <>
      <StartMenu isOpen={startMenuOpen} onClose={() => setStartMenuOpen(false)} />

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-neutral-900/90 backdrop-blur-xl border-t border-white/10 flex items-center px-2 z-[9999]">
        {/* Start button */}
        <button
          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors mr-1 ${
            startMenuOpen ? "bg-white/15" : "hover:bg-white/10"
          }`}
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          aria-label="Start Menu"
        >
          <svg width="20" height="20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="38" stroke="url(#taskbarGrad)" strokeWidth="2" opacity="0.6" />
            <text x="40" y="52" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="36" fontWeight="700" fill="url(#taskbarGrad)">A</text>
            <defs>
              <linearGradient id="taskbarGrad" x1="0" y1="0" x2="80" y2="80">
                <stop stopColor="#3b82f6" />
                <stop offset="1" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </button>

        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Open apps */}
        <div className="flex-1 flex items-center gap-1 overflow-x-auto">
          {windows.map((win) => {
            const app = getApp(win.appId);
            const isActive = activeWindowId === win.id;
            const label = win.titleKey ? t(win.titleKey) : win.title;
            return (
              <motion.button
                key={win.id}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex items-center gap-2 px-3 h-9 rounded-md text-sm transition-colors ${
                  isActive
                    ? "bg-white/15 text-white shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                    : "text-neutral-400 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => handleTaskbarClick(win.id, win.isMinimized)}
              >
                <span aria-hidden="true">{app?.icon || "📱"}</span>
                {!isMobile && <span className="truncate max-w-[120px]">{label}</span>}
                {isActive && (
                  <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-400 rounded-full" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Availability indicator */}
        {!isMobile && (
          <div className="flex items-center gap-1.5 mr-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-green-400/80 font-medium hidden sm:inline">
              {t("cta.hireSubtitle")}
            </span>
          </div>
        )}

        {/* Language toggle */}
        <button
          className="px-2 py-1 rounded text-xs font-bold text-neutral-400 hover:text-white hover:bg-white/10 transition-colors mr-2"
          onClick={toggleLocale}
          aria-label={locale === "en" ? "Switch to French" : "Passer en anglais"}
        >
          {locale === "en" ? "FR" : "EN"}
        </button>

        {/* System tray */}
        {!isMobile && (
          <div className="flex items-center gap-3 text-neutral-400 text-xs mr-2">
            <span title="Volume" aria-hidden="true">🔊</span>
            <span title="Wi-Fi" aria-hidden="true">📶</span>
            <span title="Battery" aria-hidden="true">🔋</span>
          </div>
        )}

        {/* Clock & Date */}
        <div className="text-right min-w-[56px]">
          <div className="text-sm text-neutral-300 font-medium leading-tight">{time}</div>
          {!isMobile && <div className="text-[10px] text-neutral-500 leading-tight">{date}</div>}
        </div>
      </div>
    </>
  );
}
