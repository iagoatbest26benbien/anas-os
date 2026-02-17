import { create } from "zustand";
import { appRegistry, type AppDefinition } from "@/lib/appRegistry";
import type { TranslationKey } from "@/lib/i18n";

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  titleKey?: TranslationKey;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minSize: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface WindowStore {
  windows: WindowState[];
  activeWindowId: string | null;
  nextZIndex: number;

  openWindow: (appId: string, overrides?: Partial<Pick<WindowState, "title" | "size" | "position">>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
}

let windowCounter = 0;

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  activeWindowId: null,
  nextZIndex: 1,

  openWindow: (appId, overrides) => {
    const { windows, nextZIndex } = get();

    // If already open and minimized, restore
    const minimized = windows.find((w) => w.appId === appId && w.isMinimized);
    if (minimized) {
      get().restoreWindow(minimized.id);
      get().focusWindow(minimized.id);
      return;
    }

    // If already open, focus
    const existing = windows.find((w) => w.appId === appId);
    if (existing) {
      get().focusWindow(existing.id);
      return;
    }

    const app: AppDefinition | undefined = appRegistry[appId];
    const id = `window-${++windowCounter}`;
    const offset = (windows.length % 8) * 30;

    const newWindow: WindowState = {
      id,
      appId,
      title: overrides?.title || appId,
      titleKey: app?.titleKey,
      position: overrides?.position || { x: 100 + offset, y: 60 + offset },
      size: overrides?.size || app?.defaultSize || { width: 700, height: 500 },
      minSize: app?.minSize || { width: 400, height: 300 },
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex,
    };

    set({
      windows: [...windows, newWindow],
      activeWindowId: id,
      nextZIndex: nextZIndex + 1,
    });
  },

  closeWindow: (id) => {
    set((state) => {
      const filtered = state.windows.filter((w) => w.id !== id);
      if (filtered.length === 0) windowCounter = 0;
      const newActive =
        state.activeWindowId === id
          ? filtered.length > 0
            ? filtered.reduce((a, b) => (a.zIndex > b.zIndex ? a : b)).id
            : null
          : state.activeWindowId;
      return { windows: filtered, activeWindowId: newActive };
    });
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
      activeWindowId:
        state.activeWindowId === id ? null : state.activeWindowId,
    }));
  },

  maximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: true } : w
      ),
    }));
  },

  restoreWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: false, isMinimized: false } : w
      ),
    }));
    get().focusWindow(id);
  },

  focusWindow: (id) => {
    const { nextZIndex } = get();
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: nextZIndex, isMinimized: false } : w
      ),
      activeWindowId: id,
      nextZIndex: nextZIndex + 1,
    }));
  },

  updatePosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    }));
  },

  updateSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, size } : w
      ),
    }));
  },
}));
