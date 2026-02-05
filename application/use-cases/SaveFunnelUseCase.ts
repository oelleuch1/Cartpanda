import {Funnel} from "../../domain";
import type {IFunnelRepository} from "../repositories/IFunnelRepository";

export class SaveFunnelUseCase {
    // @ts-ignore
    constructor(public readonly funnelRepository: IFunnelRepository) {}

    execute(funnel: Funnel): void {
        this.funnelRepository.save(funnel);
    }
}