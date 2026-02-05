import { FunnelState } from "../state/FunnelState";

export class UndoLastOperationUseCase {

    constructor(public readonly funnelState: FunnelState) {}

    execute(): void {
        this.funnelState.undo();
    }
}