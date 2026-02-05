import { funnelToReactFlow } from "../../mappers";
import { useRef, useCallback, useState, useEffect } from "react";
import { getAppDependencies } from "../../plugins";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
} from "@xyflow/react";
import { useDnD, useFunnelHandlers } from "../../hooks";
import { FunnelCanvasActions } from "./FunnelCanvasActions";
import type { FunnelCanvasProps } from "../../types";

import "@xyflow/react/dist/style.css";

export function FunnelCanvas({ funnelState }: FunnelCanvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const deps = getAppDependencies();
  const { screenToFlowPosition } = useReactFlow();
  const [nodeType] = useDnD();

  const [updateCount, setUpdateCount] = useState(0);
  const { nodes: initialNodes, edges: initialEdges } = funnelToReactFlow(
    funnelState.funnel,
  );
  const [currentNodes, setUINodes, onNodesChange] = useNodesState(initialNodes);
  const [currentEdges, setUIEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    const { nodes, edges } = funnelToReactFlow(funnelState.funnel);
    setUINodes(nodes);
    setUIEdges(edges);
  }, [updateCount, funnelState.funnel, setUINodes, setUIEdges]);

  const refreshUI = useCallback(() => {
    setUpdateCount((c) => c + 1);
    deps.saveFunnel.execute(funnelState.funnel);
  }, [deps.saveFunnel, funnelState.funnel]);

  const {
    handleDragOver,
    handleDrop,
    handleNodesChange,
    handleEdgesChange,
    handleConnect,
    handleNodesDelete,
  } = useFunnelHandlers({
    funnel: funnelState.funnel,
    appFunnelState: deps.funnelState,
    addNode: deps.addNode,
    moveNode: deps.moveNode,
    removeNode: deps.removeNode,
    connectNodes: deps.connectNodes,
    removeEdge: deps.removeEdge,
    saveFunnel: deps.saveFunnel,
    screenToFlowPosition,
    nodeType,
    onNodesChange,
    onEdgesChange,
    setUINodes,
    setUIEdges,
    refreshUI,
  });

  return (
    <div className="flex-1 h-full relative">
      <FunnelCanvasActions funnelState={funnelState} onUpdate={refreshUI} />
      <div className="reactflow-wrapper h-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={currentNodes}
          edges={currentEdges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onConnect={handleConnect}
          onNodesDelete={handleNodesDelete}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          fitView
          deleteKeyCode={["Backspace", "Delete"]}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}
