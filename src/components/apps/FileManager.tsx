"use client";

import { useFileSystemStore, type FileNode } from "@/stores/fileSystemStore";
import { useLocaleStore } from "@/stores/localeStore";
import { getFileIcon, sortNodes, getParentPath } from "@/lib/fileSystem";

export default function FileManager() {
  const { currentPath, setCurrentPath, getNodeAtPath } = useFileSystemStore();
  const t = useLocaleStore((s) => s.t);
  const currentNode = getNodeAtPath(currentPath);

  const children = currentNode?.children ? sortNodes(currentNode.children) : [];

  const handleOpen = (node: FileNode) => {
    if (node.type === "folder") {
      setCurrentPath(node.path);
    }
  };

  const handleBack = () => {
    if (currentPath !== "/") {
      setCurrentPath(getParentPath(currentPath));
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-neutral-800 bg-neutral-900/50">
        <button
          className="px-2 py-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors disabled:opacity-30"
          onClick={handleBack}
          disabled={currentPath === "/"}
        >
          ←
        </button>
        <div className="flex-1 bg-neutral-800 rounded-md px-3 py-1 text-sm text-neutral-300 font-mono">
          {currentPath}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {children.length === 0 ? (
          <div className="flex items-center justify-center h-full text-neutral-500 text-sm">
            {t("files.emptyFolder")}
          </div>
        ) : (
          <div className="space-y-0.5">
            {children.map((node) => (
              <button
                key={node.path}
                className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-neutral-800 transition-colors text-left"
                onDoubleClick={() => handleOpen(node)}
              >
                <span className="text-lg">{getFileIcon(node)}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-white truncate block">{node.name}</span>
                  {node.type === "file" && node.extension && (
                    <span className="text-xs text-neutral-500 uppercase">{node.extension}</span>
                  )}
                </div>
                {node.type === "folder" && (
                  <span className="text-neutral-600 text-sm">→</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
