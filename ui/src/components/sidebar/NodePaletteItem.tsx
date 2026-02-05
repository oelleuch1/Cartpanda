import React, { type ReactNode } from "react";
import {
  FileText,
  GripVertical,
  PartyPopper,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { NodeType } from "../../../../domain";
import { cn, ICON_SIZE } from "../../utils";
import { useDnD } from "../../hooks";
import type { NodePaletteItemProps } from "../../types";

const createNodePaletteItem = (
  type: NodeType,
): { label: string; icon: ReactNode } => {
  switch (type) {
    case NodeType.SALES:
      return { label: "Sales", icon: <FileText className={ICON_SIZE.md} /> };
    case NodeType.ORDER:
      return {
        label: "Order",
        icon: <ShoppingCart className={ICON_SIZE.md} />,
      };
    case NodeType.UPSELL:
      return {
        label: "Up sell",
        icon: <TrendingUp className={ICON_SIZE.md} />,
      };
    case NodeType.DOWNSELL:
      return {
        label: "Down sell",
        icon: <TrendingDown className={ICON_SIZE.md} />,
      };
    case NodeType.THANK_YOU:
      return {
        label: "Thank you",
        icon: <PartyPopper className={ICON_SIZE.md} />,
      };
  }
};

export function NodePaletteItem({ type }: NodePaletteItemProps) {
  const [, setType] = useDnD();
  const item = createNodePaletteItem(type);

  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border border-border cursor-grab",
        "transition-all duration-200 active:cursor-grabbing active:scale-95",
        "bg-card hover:shadow-md",
      )}
      role="button"
      tabIndex={0}
      aria-label={`Drag to add ${item.label}`}
    >
      <GripVertical
        className={cn(ICON_SIZE.sm, "text-muted-foreground shrink-0")}
      />
      <div className="flex-shrink-0'">{item.icon}</div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm text-foreground truncate">
          {item.label}
        </div>
        <div className="text-xs text-muted-foreground truncate">
          {type === NodeType.THANK_YOU
            ? "End of funnel"
            : `Connect to next step`}
        </div>
      </div>
    </div>
  );
}
