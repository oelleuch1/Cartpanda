import { Funnel } from '../../domain';
import { IFunnelRepository } from '../../application';
import { FunnelMapper } from '../mappers/FunnelMapper';
import { FunnelDTO } from '../dtos/FunnelDTO';

const STORAGE_KEY = 'funnel';

export class LocalStorageFunnelRepository implements IFunnelRepository {

    load(): Funnel | null {
        const funnelStr = localStorage.getItem(STORAGE_KEY);
        if (!funnelStr) return null;

        const dto: FunnelDTO = JSON.parse(funnelStr);
        return FunnelMapper.toDomain(dto);
    }

    save(funnel: Funnel): void {
        const dto = FunnelMapper.toDTO(funnel);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dto));
    }
}
