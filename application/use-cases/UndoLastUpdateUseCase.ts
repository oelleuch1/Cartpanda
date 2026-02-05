import { FunnelState } from "../state/FunnelState";

export class UndoLastUpdateUseCase {

    constructor(public readonly funnelState: FunnelState) {}

    execute(): void {
        this.funnelState.undo();
    }
}