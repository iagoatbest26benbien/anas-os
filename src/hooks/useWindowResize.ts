"use client";

import { useCallback, useRef } from "react";
import { useWindowStore, type WindowState } from "@/stores/windowStore";

type ResizeDirection =
  | "n"
  | "s"
  | "e"
  | "w"
  | "ne"
  | "nw"
  | "se"
  | "sw";

interface UseWindowResizeOptions {
  windowId: string;
  minSize: { width: number; height: number };
}

export function useWindowResize({ windowId, minSize }: UseWindowResizeOptions) {
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });
  const startWindowPos = useRef({ x: 0, y: 0 });
  const direction = useRef<ResizeDirection>("se");
  const isResizing = useRef(false);

  const updateSize = useWindowStore((s) => s.updateSize);
  const updatePosition = useWindowStore((s) => s.updatePosition);

  const getWindow = useCallback((): WindowState | undefined => {
    return useWindowStore.getState().windows.find((w) => w.id === windowId);
  }, [windowId]);

  const handleResizeStart = useCallback(
    (dir: ResizeDirection) => (e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      isResizing.current = true;
      direction.current = dir;

      const win = getWindow();
      if (!win) return;

      startPos.current = { x: e.clientX, y: e.clientY };
      startSize.current = { ...win.size };
      startWindowPos.current = { ...win.position };

      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [getWindow]
  );

  const handleResizeMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isResizing.current) return;

      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;
      const dir = direction.current;

      let newWidth = startSize.current.width;
      let newHeight = startSize.current.height;
      let newX = startWindowPos.current.x;
      let newY = startWindowPos.current.y;

      if (dir.includes("e")) newWidth = startSize.current.width + dx;
      if (dir.includes("w")) {
        newWidth = startSize.current.width - dx;
        newX = startWindowPos.current.x + dx;
      }
      if (dir.includes("s")) newHeight = startSize.current.height + dy;
      if (dir.includes("n")) {
        newHeight = startSize.current.height - dy;
        newY = startWindowPos.current.y + dy;
      }

      newWidth = Math.max(minSize.width, newWidth);
      newHeight = Math.max(minSize.height, newHeight);

      if (newWidth === minSize.width && dir.includes("w")) {
        newX = startWindowPos.current.x + startSize.current.width - minSize.width;
      }
      if (newHeight === minSize.height && dir.includes("n")) {
        newY = startWindowPos.current.y + startSize.current.height - minSize.height;
      }

      updateSize(windowId, { width: newWidth, height: newHeight });
      if (dir.includes("w") || dir.includes("n")) {
        updatePosition(windowId, { x: newX, y: newY });
      }
    },
    [windowId, minSize, updateSize, updatePosition]
  );

  const handleResizeEnd = useCallback(() => {
    isResizing.current = false;
  }, []);

  return {
    handleResizeStart,
    handleResizeMove,
    handleResizeEnd,
    isResizing: isResizing.current,
  };
}
