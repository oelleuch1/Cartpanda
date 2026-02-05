export class NodeLabel {

    constructor(public readonly value: string) {}

    static create(value: string): NodeLabel {
        if (!value.trim()) {
            throw new Error('NodeLabel cannot be empty');
        }
        return new NodeLabel(value);
    }

}