import { create } from "zustand";

export interface FileNode {
  name: string;
  type: "file" | "folder";
  path: string;
  children?: FileNode[];
  content?: string;
  extension?: string;
  icon?: string;
  opensWith?: string;
}

interface FileSystemStore {
  root: FileNode;
  currentPath: string;
  setCurrentPath: (path: string) => void;
  getNodeAtPath: (path: string) => FileNode | null;
}

const defaultFileSystem: FileNode = {
  name: "C:",
  type: "folder",
  path: "/",
  children: [
    {
      name: "Bureau",
      type: "folder",
      path: "/Bureau",
      children: [
        {
          name: "resume-junior-en.pdf",
          type: "file",
          path: "/Bureau/resume-junior-en.pdf",
          extension: "pdf",
          opensWith: "pdf-viewer",
        },
        {
          name: "resume-junior-fr.pdf",
          type: "file",
          path: "/Bureau/resume-junior-fr.pdf",
          extension: "pdf",
          opensWith: "pdf-viewer",
        },
        {
          name: "resume-alternance.pdf",
          type: "file",
          path: "/Bureau/resume-alternance.pdf",
          extension: "pdf",
          opensWith: "pdf-viewer",
        },
        {
          name: "README.md",
          type: "file",
          path: "/Bureau/README.md",
          extension: "md",
          content:
            "# AnasOS\nInteractive portfolio by Anas El Manssouri.\nBuilt with Next.js, TypeScript, Tailwind CSS, Framer Motion & Zustand.",
        },
      ],
    },
    {
      name: "Projets",
      type: "folder",
      path: "/Projets",
      children: [
        {
          name: "facturia",
          type: "folder",
          path: "/Projets/facturia",
          children: [
            {
              name: "README.md",
              type: "file",
              path: "/Projets/facturia/README.md",
              extension: "md",
              content:
                "# Facturia\nFull SaaS invoicing platform.\nStack: Next.js 15, TypeScript, Supabase, Stripe Connect, Claude API",
            },
          ],
        },
        {
          name: "hookrust",
          type: "folder",
          path: "/Projets/hookrust",
          children: [
            {
              name: "README.md",
              type: "file",
              path: "/Projets/hookrust/README.md",
              extension: "md",
              content:
                "# HookRust\nSelf-hosted webhook gateway.\nStack: Rust, Axum, Tokio, SQLite, Docker",
            },
          ],
        },
        {
          name: "salle-de-marche",
          type: "folder",
          path: "/Projets/salle-de-marche",
          children: [
            {
              name: "README.md",
              type: "file",
              path: "/Projets/salle-de-marche/README.md",
              extension: "md",
              content:
                "# Salle de Marché\nMulti-agent AI trading bot.\nStack: Python, Anthropic SDK, AsyncIO, Finnhub, Alpaca, React",
            },
          ],
        },
        {
          name: "om-cv-pipeline",
          type: "folder",
          path: "/Projets/om-cv-pipeline",
          children: [
            {
              name: "README.md",
              type: "file",
              path: "/Projets/om-cv-pipeline/README.md",
              extension: "md",
              content:
                "# OM CV Pipeline\nComputer vision for football tactical analysis.\nStack: Python, YOLOv8, OpenCV, scikit-learn",
            },
          ],
        },
        {
          name: "mcp-context",
          type: "folder",
          path: "/Projets/mcp-context",
          children: [
            {
              name: "README.md",
              type: "file",
              path: "/Projets/mcp-context/README.md",
              extension: "md",
              content:
                "# MCP Context Server\nDev tool for project context across Claude sessions.\nStack: TypeScript, Node.js, MCP SDK, Zod",
            },
          ],
        },
      ],
    },
    {
      name: "Documents",
      type: "folder",
      path: "/Documents",
      children: [],
    },
  ],
};

export const useFileSystemStore = create<FileSystemStore>((set, get) => ({
  root: defaultFileSystem,
  currentPath: "/Bureau",

  setCurrentPath: (path: string) => {
    set({ currentPath: path });
  },

  getNodeAtPath: (path: string) => {
    const parts = path.split("/").filter(Boolean);
    let current: FileNode | null = get().root;

    for (const part of parts) {
      if (!current || !current.children) return null;
      const found: FileNode | undefined = current.children.find((c) => c.name === part);
      if (!found) return null;
      current = found;
    }

    return current;
  },
}));
