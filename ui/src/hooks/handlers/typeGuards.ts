import type { NodeChange, EdgeChange } from "@xyflow/react";
import type { FunnelNodeData } from "../../types";


type PositionChange = Extract<NodeChange<FunnelNodeData>, { type: "position" }>;


export function isCompletedPositionChange(
  change: NodeChange<FunnelNodeData>,
): change is PositionChange & { position: { x: number; y: number } } {
  return (
    change.type === "position" &&
    "position" in change &&
    change.position != null &&
    "dragging" in change &&
    !change.dragging
  );
}


export function isNodeRemoveChange(
  change: NodeChange<FunnelNodeData>,
): change is Extract<NodeChange<FunnelNodeData>, { type: "remove" }> {
  return change.type === "remove";
}


export function isEdgeRemoveChange(
  change: EdgeChange,
): change is EdgeChange & { type: "remove"; id: string } {
  return change.type === "remove";
}


export function parseEdgeId(
  edgeId: string,
): { sourceId: string; targetId: string } | null {
  const [sourceId, targetId] = edgeId.split("-");
  if (!sourceId || !targetId) return null;
  return { sourceId, targetId };
}
