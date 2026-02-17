"use client";

import { type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowStore, type WindowState } from "@/stores/windowStore";
import { useLocaleStore } from "@/stores/localeStore";
import { useWindowDrag } from "@/hooks/useWindowDrag";
import { useWindowResize } from "@/hooks/useWindowResize";
import { useIsMobile } from "@/hooks/useIsMobile";

interface WindowProps {
  window: WindowState;
  children: ReactNode;
}

const resizeHandleClass = "absolute z-50 select-none";

const resizeHandles: {
  dir: "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
  className: string;
  isCorner: boolean;
}[] = [
  { dir: "n", className: `${resizeHandleClass} top-0 left-2 right-2 h-1 cursor-n-resize`, isCorner: false },
  { dir: "s", className: `${resizeHandleClass} bottom-0 left-2 right-2 h-1 cursor-s-resize`, isCorner: false },
  { dir: "e", className: `${resizeHandleClass} top-2 bottom-2 right-0 w-1 cursor-e-resize`, isCorner: false },
  { dir: "w", className: `${resizeHandleClass} top-2 bottom-2 left-0 w-1 cursor-w-resize`, isCorner: false },
  { dir: "ne", className: `${resizeHandleClass} top-0 right-0 w-3 h-3 cursor-ne-resize`, isCorner: true },
  { dir: "nw", className: `${resizeHandleClass} top-0 left-0 w-3 h-3 cursor-nw-resize`, isCorner: true },
  { dir: "se", className: `${resizeHandleClass} bottom-0 right-0 w-3 h-3 cursor-se-resize`, isCorner: true },
  { dir: "sw", className: `${resizeHandleClass} bottom-0 left-0 w-3 h-3 cursor-sw-resize`, isCorner: true },
];

export default function Window({ window: win, children }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, restoreWindow, focusWindow, activeWindowId } =
    useWindowStore();
  const t = useLocaleStore((s) => s.t);

  const isMobile = useIsMobile();
  const isActive = activeWindowId === win.id;
  const displayTitle = win.titleKey ? t(win.titleKey) : win.title;

  const { dragHandlers } = useWindowDrag({
    windowId: win.id,
    isMaximized: win.isMaximized,
  });

  const { handleResizeStart, handleResizeMove, handleResizeEnd } =
    useWindowResize({
      windowId: win.id,
      minSize: win.minSize,
    });

  return (
    <AnimatePresence>
      {!win.isMinimized && (
        <motion.div
          data-window={win.id}
          className={`group absolute flex flex-col overflow-hidden border backdrop-blur-sm ${
            isActive
              ? "border-white/15 shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_1px_rgba(255,255,255,0.1)]"
              : "border-white/8 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          }`}
          animate={
            isMobile
              ? { top: 0, left: 0, width: "100%", height: "calc(100dvh - 48px)", borderRadius: 0, opacity: 1, scale: 1 }
              : win.isMaximized
                ? { top: 0, left: 0, width: "100%", height: "calc(100vh - 48px)", borderRadius: 0, opacity: 1, scale: 1 }
                : {
                    top: win.position.y,
                    left: win.position.x,
                    width: win.size.width,
                    height: win.size.height,
                    borderRadius: 12,
                    opacity: 1,
                    scale: 1,
                  }
          }
          style={{ zIndex: win.zIndex }}
          initial={{ opacity: 0, scale: 0.95 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          onPointerDown={() => focusWindow(win.id)}
        >
          {/* Title bar */}
          <div
            className={`flex items-center justify-between h-10 px-3.5 select-none shrink-0 ${
              isActive
                ? "bg-neutral-800/95 text-white"
                : "bg-neutral-900/95 text-neutral-500"
            }`}
            {...(isMobile ? {} : dragHandlers)}
            onDoubleClick={isMobile ? undefined : () =>
              win.isMaximized ? restoreWindow(win.id) : maximizeWindow(win.id)
            }
          >
            <span className="text-sm font-medium truncate" title={displayTitle}>
              {displayTitle}
            </span>

            <div className="flex items-center gap-1.5 ml-4" onPointerDown={(e) => e.stopPropagation()}>
              {!isMobile && (
                <button
                  className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 hover:scale-110 transition-all"
                  onClick={() => minimizeWindow(win.id)}
                  aria-label={t("system.minimize")}
                  title={t("system.minimize")}
                />
              )}
              {!isMobile && (
                <button
                  className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 hover:scale-110 transition-all"
                  onClick={() =>
                    win.isMaximized ? restoreWindow(win.id) : maximizeWindow(win.id)
                  }
                  aria-label={win.isMaximized ? t("system.restore") : t("system.maximize")}
                  title={win.isMaximized ? t("system.restore") : t("system.maximize")}
                />
              )}
              <button
                className={`${isMobile ? "w-5 h-5" : "w-3 h-3"} rounded-full bg-red-500 hover:bg-red-400 hover:scale-110 transition-all`}
                onClick={() => closeWindow(win.id)}
                aria-label={t("system.close")}
                title={t("system.close")}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto bg-neutral-900 text-white">
            {children}
          </div>

          {/* Resize handles */}
          {!isMobile && !win.isMaximized &&
            resizeHandles.map(({ dir, className, isCorner }) => (
              <div
                key={dir}
                className={`${className} opacity-0 group-hover:opacity-100 transition-opacity`}
                onPointerDown={handleResizeStart(dir)}
                onPointerMove={handleResizeMove}
                onPointerUp={handleResizeEnd}
              >
                {isCorner && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  </div>
                )}
              </div>
            ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
