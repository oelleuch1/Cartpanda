import {NodeId} from "../value-objects/NodeId";

export class FunnelEdge {

    // @ts-ignore
    constructor(public readonly from: NodeId, public readonly to: NodeId) {}

    equals(other: FunnelEdge): boolean {
        return this.from.equals(other.from) && this.to.equals(other.to);
    }

}