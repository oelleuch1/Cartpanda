import {Funnel} from "../../domain";

export interface IFunnelState {
    getCurrent(): Funnel
    saveSnapshot(): void
    update(next: Funnel): void
    undo(): void
    download(): void
}