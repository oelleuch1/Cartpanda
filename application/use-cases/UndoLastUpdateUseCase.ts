import { type IFunnelState} from "../state/IFunnelState";

export class UndoLastUpdateUseCase {

    // @ts-ignore
    constructor(public readonly funnelState: IFunnelState) {}

    execute(): void {
        this.funnelState.undo();
    }
}