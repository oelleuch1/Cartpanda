import {
    Funnel,
    FunnelNode,
    NodeId,
    NodePosition,
    NodeType,
    NodeLabelFactory, DomainResult
} from "../../domain";

export class AddNodeUseCase {

    execute(
        funnel: Funnel,
        type: NodeType,
        position: NodePosition
    ):  DomainResult<void> {
        const id = NodeId.create(crypto.randomUUID());
        const label = NodeLabelFactory.create(type, funnel.getNodes());

        const node = new FunnelNode(id, type, label, position);
        return funnel.addNode(node);
    }
}
