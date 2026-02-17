import { create } from "zustand";
import { persist } from "zustand/middleware";

export const wallpapers = [
  { id: "default", name: "Default", path: "/wallpapers/default.svg", gradient: "from-[#0a0a1a] via-[#0d1b2a] to-[#1b2a4a]" },
  { id: "ocean", name: "Ocean", path: "/wallpapers/gradient-ocean.svg", gradient: "from-[#0c1222] via-[#0a192f] to-[#0d2137]" },
  { id: "purple", name: "Purple", path: "/wallpapers/gradient-purple.svg", gradient: "from-[#0f0520] via-[#1a0a3e] to-[#2d1b69]" },
  { id: "dark", name: "Dark", path: "/wallpapers/gradient-dark.svg", gradient: "from-[#050505] to-[#111111]" },
  { id: "ember", name: "Ember", path: "/wallpapers/gradient-ember.svg", gradient: "from-[#1a0a0a] via-[#1f0f0a] to-[#2a1508]" },
];

interface SettingsStore {
  wallpaperId: string;
  setWallpaper: (id: string) => void;
  getWallpaper: () => (typeof wallpapers)[number];
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      wallpaperId: "default",
      setWallpaper: (id) => set({ wallpaperId: id }),
      getWallpaper: () => {
        const { wallpaperId } = get();
        return wallpapers.find((w) => w.id === wallpaperId) || wallpapers[0];
      },
    }),
    {
      name: "anas-os-settings",
    }
  )
);
