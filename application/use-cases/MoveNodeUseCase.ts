import { Funnel, NodeId, NodePosition, DomainResult } from "../../domain";

export class MoveNodeUseCase {

    execute(
        funnel: Funnel,
        nodeId: NodeId,
        position: NodePosition
    ): DomainResult<void> {
        return funnel.moveNode(nodeId, position);
    }
}
