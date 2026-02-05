import { Funnel } from "../../domain";
// import { FunnelMapper } from "../../infrastructure/mappers/FunnelMapper";
// import { FunnelDTO } from "../../infrastructure/dtos/FunnelDTO";

export class FunnelState {
    private current: Funnel;
    // private readonly history: FunnelDTO[] = [];

    constructor(initial: Funnel) {
        this.current = initial;
    }

    getCurrent(): Funnel {
        return this.current;
    }

    update(next: Funnel): void {
        // this.history.push(FunnelMapper.toDTO(this.current));
        this.current = next;
    }

    undo(): void {
        const snapshot = this.history.pop();
        if (!snapshot) return;

        // this.current = FunnelMapper.fromDTO(snapshot);
    }
}
