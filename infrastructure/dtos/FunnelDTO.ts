import { type FunnelNodeDTO } from "./FunnelNodeDTO";
import { type FunnelEdgeDTO } from "./FunnelEdgeDTO";

export interface FunnelDTO {
    nodes: FunnelNodeDTO[];
    edges: FunnelEdgeDTO[];
}