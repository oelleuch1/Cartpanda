import { FunnelNodeDTO } from "./FunnelNodeDTO";
import { FunnelEdgeDTO } from "./FunnelEdgeDTO";

export interface FunnelDTO {
    nodes: FunnelNodeDTO[];
    edges: FunnelEdgeDTO[];
}