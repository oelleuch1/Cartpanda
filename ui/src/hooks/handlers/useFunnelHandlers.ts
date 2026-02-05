import { useCallback } from "react";
import type { Connection, NodeChange, EdgeChange, Node } from "@xyflow/react";
import { NodePosition, NodeId } from "../../../../domain";

import type {
  FunnelHandlersDeps,
  DomainContext,
  FunnelNodeData,
} from "../../types";
import {
  isCompletedPositionChange,
  isNodeRemoveChange,
  isEdgeRemoveChange,
  parseEdgeId,
} from "./typeGuards";
import {
  executeNodeMove,
  executeNodeRemove,
  executeEdgeRemove,
  executeNodeConnect,
  executeNodeAdd,
} from "./domainOperations";

function useDragOverHandler() {
  return useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
}

function useDropHandler(
  ctx: DomainContext,
  screenToFlowPosition: FunnelHandlersDeps["screenToFlowPosition"],
  nodeType: FunnelHandlersDeps["nodeType"],
) {
  return useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (!nodeType) {
        console.warn("No node type selected");
        return;
      }
      const flowPosition = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      executeNodeAdd(
        ctx,
        nodeType,
        new NodePosition(flowPosition.x, flowPosition.y),
      );
    },
    [ctx, screenToFlowPosition, nodeType],
  );
}

function useNodesChangeHandler(
  ctx: DomainContext,
  onNodesChange: FunnelHandlersDeps["onNodesChange"],
) {
  return useCallback(
    (changes: NodeChange<FunnelNodeData>[]) => {
      onNodesChange(changes);

      changes.filter(isCompletedPositionChange).forEach((change) => {
        executeNodeMove(ctx, change.id, change.position);
      });

      changes.filter(isNodeRemoveChange).forEach((change) => {
        executeNodeRemove(ctx, change.id);
      });
    },
    [ctx, onNodesChange],
  );
}

function useEdgesChangeHandler(
  ctx: DomainContext,
  onEdgesChange: FunnelHandlersDeps["onEdgesChange"],
) {
  return useCallback(
    (changes: EdgeChange[]) => {
      onEdgesChange(changes);

      changes
        .filter(isEdgeRemoveChange)
        .map((change) => parseEdgeId(change.id))
        .filter(
          (parsed): parsed is NonNullable<typeof parsed> => parsed !== null,
        )
        .forEach((parsed) => {
          executeEdgeRemove(ctx, parsed.sourceId, parsed.targetId);
        });
    },
    [ctx, onEdgesChange],
  );
}

function useConnectHandler(ctx: DomainContext) {
  return useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target) return;
      executeNodeConnect(ctx, connection.source, connection.target);
    },
    [ctx],
  );
}

function useNodesDeleteHandler(ctx: DomainContext) {
  return useCallback(
    (nodesToDelete: Node[]) => {
      if (nodesToDelete.length === 0) return;
      ctx.appFunnelState.saveSnapshot();
      nodesToDelete.forEach((node) => {
        ctx.removeNode.execute(ctx.funnel, NodeId.create(node.id));
      });
      ctx.refreshUI();
    },
    [ctx],
  );
}
export function useFunnelHandlers(deps: FunnelHandlersDeps) {
  const {
    funnel,
    appFunnelState,
    addNode,
    moveNode,
    removeNode,
    connectNodes,
    removeEdge,
    saveFunnel,
    screenToFlowPosition,
    nodeType,
    onNodesChange,
    onEdgesChange,
    refreshUI,
  } = deps;

  const ctx: DomainContext = {
    funnel,
    appFunnelState,
    refreshUI,
    addNode,
    moveNode,
    removeNode,
    connectNodes,
    removeEdge,
    saveFunnel,
  };

  return {
    handleDragOver: useDragOverHandler(),
    handleDrop: useDropHandler(ctx, screenToFlowPosition, nodeType),
    handleNodesChange: useNodesChangeHandler(ctx, onNodesChange),
    handleEdgesChange: useEdgesChangeHandler(ctx, onEdgesChange),
    handleConnect: useConnectHandler(ctx),
    handleNodesDelete: useNodesDeleteHandler(ctx),
  };
}
