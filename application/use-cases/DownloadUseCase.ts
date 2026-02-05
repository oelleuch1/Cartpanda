import { type IFunnelState} from "../state/IFunnelState";

export class DownloadUseCase {

    // @ts-ignore
    constructor(public readonly funnelState: IFunnelState) {}

    execute(): void {
        this.funnelState.download();
    }
}