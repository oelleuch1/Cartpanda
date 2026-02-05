import {NodeId} from "../value-objects/NodeId";
import {NodeType} from "../value-objects/NodeType";
import {NodeLabel} from "../value-objects/NodeLabel";
import {NodePosition} from "../value-objects/NodePosition";

export class FunnelNode {

    constructor(
        public readonly id: NodeId,
        public readonly type: NodeType,
        public readonly label: NodeLabel,
        private _position: NodePosition
    ) {}

    get position(): NodePosition {
        return this._position;
    }

    moveTo(position: NodePosition) {
        this._position = position;
    }
}