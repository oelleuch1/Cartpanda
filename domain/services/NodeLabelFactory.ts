import {NodeType} from "../value-objects/NodeType";
import {FunnelNode} from "../entitites/FunnelNode";
import {NodeLabel} from "../value-objects/NodeLabel";

export class NodeLabelFactory {

    static create(type: NodeType, existingNodes: FunnelNode[]): NodeLabel {
        switch (type) {
            case NodeType.UPSELL:
                return this.increment('Upsell', type, existingNodes);
            case NodeType.DOWNSELL:
                return this.increment('DownSell', type, existingNodes);
            case NodeType.SALES:
                return NodeLabel.create('Sales Page');
            case NodeType.ORDER:
                return NodeLabel.create('Order Page');
            case NodeType.THANK_YOU:
                return NodeLabel.create('Thank you');
            default:
                throw new Error(`Unsupported type ${type}`);
        }
    }

    private static increment(
        base: string,
        type: NodeType,
        nodes: FunnelNode[],
    ): NodeLabel {
        const nodesWithSameType = nodes.filter(node => node.type === type);
        return NodeLabel.create(`${base} ${nodesWithSameType.length + 1}`)
    }
}