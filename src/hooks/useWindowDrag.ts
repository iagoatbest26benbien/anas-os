"use client";

import { useCallback, useRef } from "react";
import { useWindowStore } from "@/stores/windowStore";

interface UseWindowDragOptions {
  windowId: string;
  isMaximized: boolean;
}

export function useWindowDrag({ windowId, isMaximized }: UseWindowDragOptions) {
  const dragOffset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const updatePosition = useWindowStore((s) => s.updatePosition);
  const focusWindow = useWindowStore((s) => s.focusWindow);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (isMaximized) return;

      isDragging.current = true;
      const target = e.currentTarget as HTMLElement;
      const rect = target.closest("[data-window]")?.getBoundingClientRect();
      if (!rect) return;

      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      focusWindow(windowId);
      target.setPointerCapture(e.pointerId);
    },
    [windowId, isMaximized, focusWindow]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;

      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 60;
      const x = Math.max(0, Math.min(maxX, e.clientX - dragOffset.current.x));
      const y = Math.max(0, Math.min(maxY, e.clientY - dragOffset.current.y));

      updatePosition(windowId, { x, y });
    },
    [windowId, updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return {
    dragHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
    },
  };
}
