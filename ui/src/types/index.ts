import type { Dispatch, SetStateAction } from "react";
import type { OnNodesChange, OnEdgesChange } from "@xyflow/react";
import type { Funnel, NodeType } from "../../../domain";
import type { FunnelState } from "../../../application";
import type {
  AddNodeUseCase,
  MoveNodeUseCase,
  RemoveNodeUseCase,
  ConnectNodesUseCase,
  RemoveEdgeUseCase,
  SaveFunnelUseCase,
} from "../../../application";
import type { funnelToReactFlow } from "../mappers/reactFlowMapper";

// ============================================================================
// ReactFlow Types
// ============================================================================

/** Node data structure used in ReactFlow */
export type FunnelNodeData = ReturnType<
  typeof funnelToReactFlow
>["nodes"][number];

/** Edge data structure used in ReactFlow */
export type FunnelEdgeData = ReturnType<
  typeof funnelToReactFlow
>["edges"][number];

// ============================================================================
// Drag and Drop Types
// ============================================================================

/** DnD context type for drag-and-drop functionality */
export type DnDContextType = [
  NodeType | null,
  Dispatch<SetStateAction<NodeType | null>>,
];

// ============================================================================
// State Types
// ============================================================================

/** Return type for useFunnelState hook */
export interface UseFunnelStateReturn {
  readonly funnel: Funnel;
  update: (next: Funnel) => void;
  undo: () => void;
}

// ============================================================================
// Handler Types
// ============================================================================

/** Dependencies required by the funnel handlers hook */
export interface FunnelHandlersDeps {
  funnel: Funnel;
  appFunnelState: FunnelState;
  addNode: AddNodeUseCase;
  moveNode: MoveNodeUseCase;
  removeNode: RemoveNodeUseCase;
  connectNodes: ConnectNodesUseCase;
  removeEdge: RemoveEdgeUseCase;
  saveFunnel: SaveFunnelUseCase;
  screenToFlowPosition: (position: { x: number; y: number }) => {
    x: number;
    y: number;
  };
  nodeType: NodeType | null;
  onNodesChange: OnNodesChange<FunnelNodeData>;
  onEdgesChange: OnEdgesChange<FunnelEdgeData>;
  setUINodes: (nodes: FunnelNodeData[]) => void;
  setUIEdges: (edges: FunnelEdgeData[]) => void;
  refreshUI: () => void;
}

/** Encapsulates all dependencies needed for domain operations */
export interface DomainContext {
  funnel: Funnel;
  appFunnelState: FunnelState;
  refreshUI: () => void;
  // Use cases
  addNode: AddNodeUseCase;
  moveNode: MoveNodeUseCase;
  removeNode: RemoveNodeUseCase;
  connectNodes: ConnectNodesUseCase;
  removeEdge: RemoveEdgeUseCase;
  saveFunnel: SaveFunnelUseCase;
}

// ============================================================================
// Component Props Types
// ============================================================================

/** Props for FunnelCanvas component */
export interface FunnelCanvasProps {
  funnelState: { funnel: Funnel };
}

/** Props for FunnelCanvasActions component */
export interface FunnelCanvasActionsProps {
  funnelState: { funnel: Funnel };
  onUpdate: () => void;
}

/** Props for NodePaletteItem component */
export interface NodePaletteItemProps {
  type: NodeType;
}
