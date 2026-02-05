import {Funnel} from "../../domain";
import type {IFunnelRepository} from "../repositories/IFunnelRepository";

export class LoadFunnelUseCase {
    constructor(public readonly funnelRepository: IFunnelRepository) {}

    execute(): Funnel {
        return this.funnelRepository.load() ?? new Funnel();
    }
}