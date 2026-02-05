export class NodeId {

    private constructor(public readonly value: string) {}

    static create(value: string): NodeId {
        if (!value) {
            throw new Error(`NodeId cannot be an empty string`);
        }
        return new NodeId(value);
    }

    equals(other: NodeId): boolean {
        return this.value === other.value;
    }
}