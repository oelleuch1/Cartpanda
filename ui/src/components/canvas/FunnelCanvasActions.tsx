import { Undo2, Save, Download } from "lucide-react";
import { getAppDependencies } from "../../plugins";
import { useEffect, useCallback } from "react";
import { cn, ICON_SIZE, KeyboardShortcuts, Toasts } from "../../utils";
import type { FunnelCanvasActionsProps } from "../../types";

export function FunnelCanvasActions({
  funnelState,
  onUpdate,
}: FunnelCanvasActionsProps) {
  const { undoLastUpdate, saveFunnel, downloadFunnel } = getAppDependencies();

  const handleUndo = useCallback(() => {
    undoLastUpdate.execute();
    onUpdate();
    Toasts.undone();
  }, [undoLastUpdate, onUpdate]);

  const handleSave = useCallback(() => {
    saveFunnel.execute(funnelState.funnel);
    Toasts.saved();
  }, [saveFunnel, funnelState.funnel]);

  const handleDownload = useCallback(() => {
    downloadFunnel.execute();
    Toasts.downloaded();
  }, [downloadFunnel]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (KeyboardShortcuts.isUndo(event)) {
        event.preventDefault();
        handleUndo();
      }
      if (KeyboardShortcuts.isSave(event)) {
        event.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleSave]);

  const buttonClass = cn(
    "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer",
    "bg-card border border-border text-foreground",
    "hover:bg-muted transition-colors duration-200",
    "text-sm font-medium",
  );

  return (
    <div className="absolute top-4 right-4 z-10 flex gap-2">
      <button
        onClick={handleUndo}
        className={buttonClass}
        title="Undo (Ctrl+Z)"
      >
        <Undo2 className={ICON_SIZE.sm} />
        <span>Undo</span>
      </button>
      <button
        onClick={handleSave}
        className={buttonClass}
        title="Save (Ctrl+S)"
      >
        <Save className={ICON_SIZE.sm} />
        <span>Save</span>
      </button>
      <button
        onClick={handleDownload}
        className={buttonClass}
        title="Download (Ctrl+D)"
      >
        <Download className={ICON_SIZE.sm} />
        <span>Download</span>
      </button>
    </div>
  );
}
