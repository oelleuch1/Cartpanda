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

export type FunnelNodeData = ReturnType<
  typeof funnelToReactFlow
>["nodes"][number];

export type FunnelEdgeData = ReturnType<
  typeof funnelToReactFlow
>["edges"][number];

export type DnDContextType = [
  NodeType | null,
  Dispatch<SetStateAction<NodeType | null>>,
];

export interface UseFunnelStateReturn {
  readonly funnel: Funnel;
  update: (next: Funnel) => void;
  undo: () => void;
}

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

export interface DomainContext {
  funnel: Funnel;
  appFunnelState: FunnelState;
  refreshUI: () => void;
  addNode: AddNodeUseCase;
  moveNode: MoveNodeUseCase;
  removeNode: RemoveNodeUseCase;
  connectNodes: ConnectNodesUseCase;
  removeEdge: RemoveEdgeUseCase;
  saveFunnel: SaveFunnelUseCase;
}

export interface FunnelCanvasProps {
  funnelState: { funnel: Funnel };
}

export interface FunnelCanvasActionsProps {
  funnelState: { funnel: Funnel };
  onUpdate: () => void;
}

export interface NodePaletteItemProps {
  type: NodeType;
  connectionType: string;
}
