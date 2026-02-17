"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export interface ContextMenuItem {
  label: string;
  icon?: string;
  onClick: () => void;
  danger?: boolean;
  separator?: boolean;
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

export default function ContextMenu({ x, y, items, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleTouch = (e: TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleTouch);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleTouch);
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  // Clamp position so menu stays on screen
  const menuWidth = isMobile ? 220 : 200;
  const menuHeight = items.length * 36 + 8;
  const clampedX = Math.min(x, window.innerWidth - menuWidth - 8);
  const clampedY = Math.min(y, window.innerHeight - menuHeight - 8);

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        className={`fixed z-[10000] py-1 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden ${isMobile ? "min-w-[220px]" : "min-w-[200px]"}`}
        style={{ left: clampedX, top: clampedY }}
        initial={{ opacity: 0, scale: 0.92, y: -4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.12 }}
      >
        {items.map((item, i) => (
          <div key={i}>
            {item.separator && i > 0 && (
              <div className="h-px bg-white/8 mx-2 my-1" />
            )}
            <button
              className={`flex items-center gap-2.5 w-full px-3 ${isMobile ? "py-2.5" : "py-1.5"} text-left text-sm transition-colors ${
                item.danger
                  ? "text-red-400 hover:bg-red-500/15"
                  : "text-neutral-200 hover:bg-white/10"
              }`}
              onClick={() => {
                item.onClick();
                onClose();
              }}
            >
              {item.icon && <span className="text-base w-5 text-center" aria-hidden="true">{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
