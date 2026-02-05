import {FunnelNode} from "../entitites/FunnelNode";
import {NodeType} from "../value-objects/NodeType";
import {FunnelEdge} from "../entitites/FunnelEdge";
import {NodeId} from "../value-objects/NodeId";

export class FunnelValidator {
    static isValidEdge(fromNode: FunnelNode): boolean {
        return fromNode.id.value !== NodeType.THANK_YOU
    }

    static isExistingEdge(edges: FunnelEdge[], from: NodeId, to: NodeId): boolean {
        const edge = new FunnelEdge(from, to);
        return edges.some(e => e.equals(edge));
    }
}