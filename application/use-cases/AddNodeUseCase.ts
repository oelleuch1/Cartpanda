import {
    Funnel,
    FunnelNode,
    NodeId,
    NodePosition,
    NodeType,
    NodeLabelFactory
} from "../../domain";

export class AddNodeUseCase {

    execute(
        funnel: Funnel,
        type: NodeType,
        position: NodePosition
    ): Funnel {
        const id = NodeId.create(crypto.randomUUID());
        const label = NodeLabelFactory.create(type, funnel.getNodes());

        const node = new FunnelNode(id, type, label, position);

        funnel.addNode(node);
        return funnel;
    }
}
