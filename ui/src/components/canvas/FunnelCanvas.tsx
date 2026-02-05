import {Funnel, NodeType} from "../../../../domain";
import {funnelToReactFlow} from "../../mappers/reactFlowMapper";
import {useRef, useCallback} from 'react';
import {getAppDependencies} from "../../plugins/dependencies";
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    Controls,
    useReactFlow,
    Background,
} from '@xyflow/react';
import { useDnD } from '../../state/DnDContext';

import '@xyflow/react/dist/style.css';

export type FunnelCanvasProps = {
    funnelState: { funnel: Funnel };
}

export function FunnelCanvas({ funnelState }: FunnelCanvasProps) {
    const { nodes, edges } = funnelToReactFlow(funnelState.funnel);
    const reactFlowWrapper = useRef(null);
    const { addNode, moveNode, removeNode, connectNodes, removeEdge } = getAppDependencies();

    const { screenToFlowPosition } = useReactFlow();
    const [type, setType] = useDnD();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setUINodes] = useNodesState(nodes);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [__, setUIEdges] = useEdgesState(edges);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const { ok } = addNode.execute(funnelState.funnel, type, position);
            if (ok) {
                const { nodes } = funnelToReactFlow(funnelState.funnel);
                setUINodes(nodes)
            }
        },
        [],
    );

    const onDragStart = (event) => {
        setType?.(nodeType);
        event.dataTransfer.setData('text/plain', 'SALES');
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="dndflow">
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onDrop={onDrop}
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    fitView
                >
                    <Controls />
                    <Background />
                </ReactFlow>
            </div>
        </div>
    );
}
