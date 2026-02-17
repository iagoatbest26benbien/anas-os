"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface DesktopIconProps {
  icon: string;
  label: string;
  onDoubleClick: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  isRenaming?: boolean;
  onRename?: (newName: string) => void;
  onCancelRename?: () => void;
  isMobile?: boolean;
}

export default function DesktopIcon({
  icon,
  label,
  onDoubleClick,
  onContextMenu,
  isRenaming,
  onRename,
  onCancelRename,
  isMobile,
}: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [renameValue, setRenameValue] = useState(label);
  const inputRef = useRef<HTMLInputElement>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Focus input when entering rename mode
  useEffect(() => {
    if (isRenaming) {
      setRenameValue(label);
      // Delay to let the input render
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
    }
  }, [isRenaming, label]);

  const handleRenameSubmit = () => {
    onRename?.(renameValue);
  };

  const handleRenameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleRenameSubmit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onCancelRename?.();
    }
  };

  // Long press handlers for mobile context menu
  const clearLongPress = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!isMobile || !onContextMenu) return;
      const touch = e.touches[0];
      const clientX = touch.clientX;
      const clientY = touch.clientY;
      longPressTimer.current = setTimeout(() => {
        longPressTimer.current = null;
        // Create a synthetic MouseEvent-like object for onContextMenu
        const fakeEvent = {
          clientX,
          clientY,
          preventDefault: () => {},
          stopPropagation: () => {},
        } as unknown as React.MouseEvent;
        setIsSelected(true);
        onContextMenu(fakeEvent);
      }, 500);
    },
    [isMobile, onContextMenu]
  );

  const handleTouchEnd = useCallback(() => {
    clearLongPress();
  }, [clearLongPress]);

  const handleTouchMove = useCallback(() => {
    clearLongPress();
  }, [clearLongPress]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => clearLongPress();
  }, [clearLongPress]);

  return (
    <motion.button
      className={`flex flex-col items-center justify-center gap-2 ${
        isMobile ? "w-20 h-[88px]" : "w-24 h-[104px]"
      } rounded-xl p-2 cursor-default select-none transition-colors ${
        isSelected || isRenaming
          ? "bg-white/15 ring-1 ring-blue-400/40"
          : "hover:bg-white/8"
      }`}
      onClick={() => {
        if (isMobile && !isRenaming) {
          onDoubleClick();
        } else {
          setIsSelected(true);
        }
      }}
      onDoubleClick={isMobile ? undefined : isRenaming ? undefined : onDoubleClick}
      onContextMenu={(e) => {
        e.preventDefault();
        setIsSelected(true);
        onContextMenu?.(e);
      }}
      onTouchStart={isMobile ? handleTouchStart : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
      onTouchMove={isMobile ? handleTouchMove : undefined}
      onKeyDown={(e) => {
        if (!isRenaming && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onDoubleClick();
        }
      }}
      onBlur={(e) => {
        // Don't deselect if focus moves to the rename input inside
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsSelected(false);
          if (isRenaming) onCancelRename?.();
        }
      }}
      whileHover={isRenaming || isMobile ? undefined : { scale: 1.05 }}
      whileTap={isRenaming || isMobile ? undefined : { scale: 0.95 }}
      aria-label={label}
      tabIndex={0}
    >
      <span className={`${isMobile ? "text-3xl" : "text-4xl"} drop-shadow-lg`} aria-hidden="true">{icon}</span>
      {isRenaming ? (
        <input
          ref={inputRef}
          type="text"
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          onKeyDown={handleRenameKeyDown}
          onBlur={handleRenameSubmit}
          className="w-full text-xs text-white text-center bg-blue-600/40 border border-blue-400/50 rounded px-1 py-0.5 outline-none"
          spellCheck={false}
          maxLength={30}
        />
      ) : (
        <span className={`${isMobile ? "text-[11px]" : "text-xs"} text-white/90 text-center leading-tight line-clamp-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-medium`}>
          {label}
        </span>
      )}
    </motion.button>
  );
}
