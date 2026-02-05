import {Funnel, FunnelEdge, type DomainResult} from "../../domain";

export class RemoveEdgeUseCase {
    execute(
        funnel: Funnel,
        edge: FunnelEdge
    ): DomainResult<void> {
        return funnel.removeEdge(edge);
    }
}
