export class NodePosition {

    constructor(public readonly x: number, public readonly y: number) {}

    static create(position: NodePosition): NodePosition {
        if (!isFinite(position.x) || !isFinite(position.y)) {
            throw new Error('NodePosition must contains finite numbers');
        }
        return new NodePosition(position.x, position.y);
    }
}