import type { TranslationKey } from "@/lib/i18n";

export interface AppDefinition {
  id: string;
  titleKey: TranslationKey;
  icon: string;
  defaultSize: { width: number; height: number };
  minSize: { width: number; height: number };
  showOnDesktop: boolean;
  showInStartMenu: boolean;
}

export const appRegistry: Record<string, AppDefinition> = {
  about: {
    id: "about",
    titleKey: "app.about",
    icon: "👤",
    defaultSize: { width: 700, height: 520 },
    minSize: { width: 400, height: 300 },
    showOnDesktop: true,
    showInStartMenu: true,
  },
  projects: {
    id: "projects",
    titleKey: "app.projects",
    icon: "🗂️",
    defaultSize: { width: 900, height: 600 },
    minSize: { width: 500, height: 400 },
    showOnDesktop: true,
    showInStartMenu: true,
  },
  terminal: {
    id: "terminal",
    titleKey: "app.terminal",
    icon: "⬛",
    defaultSize: { width: 700, height: 450 },
    minSize: { width: 400, height: 250 },
    showOnDesktop: true,
    showInStartMenu: true,
  },
  skills: {
    id: "skills",
    titleKey: "app.skills",
    icon: "⚡",
    defaultSize: { width: 800, height: 550 },
    minSize: { width: 450, height: 350 },
    showOnDesktop: true,
    showInStartMenu: true,
  },
  experience: {
    id: "experience",
    titleKey: "app.experience",
    icon: "💼",
    defaultSize: { width: 700, height: 480 },
    minSize: { width: 400, height: 300 },
    showOnDesktop: true,
    showInStartMenu: true,
  },
  contact: {
    id: "contact",
    titleKey: "app.contact",
    icon: "✉️",
    defaultSize: { width: 550, height: 450 },
    minSize: { width: 380, height: 300 },
    showOnDesktop: true,
    showInStartMenu: true,
  },
  "file-manager": {
    id: "file-manager",
    titleKey: "app.files",
    icon: "📁",
    defaultSize: { width: 800, height: 500 },
    minSize: { width: 400, height: 300 },
    showOnDesktop: true,
    showInStartMenu: true,
  },
  "pdf-viewer": {
    id: "pdf-viewer",
    titleKey: "app.pdf-viewer",
    icon: "📄",
    defaultSize: { width: 700, height: 600 },
    minSize: { width: 400, height: 400 },
    showOnDesktop: false,
    showInStartMenu: true,
  },
  browser: {
    id: "browser",
    titleKey: "app.browser",
    icon: "🌐",
    defaultSize: { width: 900, height: 600 },
    minSize: { width: 500, height: 400 },
    showOnDesktop: false,
    showInStartMenu: true,
  },
};

export function getApp(appId: string): AppDefinition | undefined {
  return appRegistry[appId];
}

export function getDesktopApps(): AppDefinition[] {
  return Object.values(appRegistry).filter((app) => app.showOnDesktop);
}

export function getStartMenuApps(): AppDefinition[] {
  return Object.values(appRegistry).filter((app) => app.showInStartMenu);
}
