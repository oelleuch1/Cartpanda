import { FunnelState } from "../state/FunnelState";

export class DownloadUseCase {

    constructor(public readonly funnelState: FunnelState) {}

    execute(): void {
        this.funnelState.download();
    }
}