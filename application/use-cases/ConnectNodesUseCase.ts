import { Funnel, NodeId, type DomainResult } from "../../domain";

export class ConnectNodesUseCase {

    execute(
        funnel: Funnel,
        fromId: NodeId,
        toId: NodeId
    ): DomainResult<void> {
        return funnel.connectNodes(fromId, toId);
    }
}
