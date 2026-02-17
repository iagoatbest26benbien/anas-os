"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface DesktopIconProps {
  icon: string;
  label: string;
  onDoubleClick: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  isRenaming?: boolean;
  onRename?: (newName: string) => void;
  onCancelRename?: () => void;
}

export default function DesktopIcon({
  icon,
  label,
  onDoubleClick,
  onContextMenu,
  isRenaming,
  onRename,
  onCancelRename,
}: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [renameValue, setRenameValue] = useState(label);
  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <motion.button
      className={`flex flex-col items-center justify-center gap-2 w-24 h-[104px] rounded-xl p-2 cursor-default select-none transition-colors ${
        isSelected || isRenaming
          ? "bg-white/15 ring-1 ring-blue-400/40"
          : "hover:bg-white/8"
      }`}
      onClick={() => setIsSelected(true)}
      onDoubleClick={isRenaming ? undefined : onDoubleClick}
      onContextMenu={(e) => {
        e.preventDefault();
        setIsSelected(true);
        onContextMenu?.(e);
      }}
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
      whileHover={isRenaming ? undefined : { scale: 1.05 }}
      whileTap={isRenaming ? undefined : { scale: 0.95 }}
      aria-label={label}
      tabIndex={0}
    >
      <span className="text-4xl drop-shadow-lg" aria-hidden="true">{icon}</span>
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
        <span className="text-xs text-white/90 text-center leading-tight line-clamp-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-medium">
          {label}
        </span>
      )}
    </motion.button>
  );
}
