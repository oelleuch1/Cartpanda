import { Funnel, NodeId, type DomainResult } from "../../domain";

export class RemoveNodeUseCase {

    execute(
        funnel: Funnel,
        nodeId: NodeId
    ): DomainResult<void> {
        return funnel.removeNode(nodeId);
    }
}