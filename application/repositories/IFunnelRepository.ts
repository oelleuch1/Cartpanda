import { type Funnel } from '../../domain';

export interface IFunnelRepository {
    load(): Funnel | null;
    save(funnel: Funnel): void;
}