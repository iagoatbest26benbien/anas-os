import type { FileNode } from "@/stores/fileSystemStore";

export function getParentPath(path: string): string {
  const parts = path.split("/").filter(Boolean);
  parts.pop();
  return parts.length === 0 ? "/" : "/" + parts.join("/");
}

export function getFileName(path: string): string {
  const parts = path.split("/").filter(Boolean);
  return parts[parts.length - 1] || "";
}

export function getExtension(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? parts[parts.length - 1] : "";
}

export function getFileIcon(node: FileNode): string {
  if (node.type === "folder") return "📁";

  const ext = node.extension || getExtension(node.name);
  switch (ext) {
    case "pdf":
      return "📄";
    case "md":
      return "📝";
    case "txt":
      return "📃";
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "webp":
      return "🖼️";
    case "ts":
    case "tsx":
    case "js":
    case "jsx":
      return "💻";
    case "json":
      return "📋";
    default:
      return "📄";
  }
}

export function sortNodes(nodes: FileNode[]): FileNode[] {
  return [...nodes].sort((a, b) => {
    if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}
