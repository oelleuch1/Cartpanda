import ReactFlow from "reactflow";
import { funnelToReactFlow } from "../../mappers/reactFlowMapper";
import {Funnel} from "../../../../domain";

export type FunnelCanvasProps = {
    funnelState: { funnel: Funnel };
}

export function FunnelCanvas({ funnelState }: FunnelCanvasProps) {
    const { nodes, edges } = funnelToReactFlow(funnelState.funnel);

    return (
        <div className="flex-1">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
            />
        </div>
    );
}
