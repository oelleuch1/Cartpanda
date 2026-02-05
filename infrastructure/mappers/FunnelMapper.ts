import {
    Funnel,
    FunnelNode,
    NodeId,
    NodeType,
    NodeLabel,
    NodePosition
} from "../../domain";
import { type FunnelDTO } from "../dtos/FunnelDTO";

export class FunnelMapper {

    static toDTO(funnel: Funnel): FunnelDTO {
        return {
            nodes: funnel.getNodes().map(node => ({
                id: node.id.value,
                type: node.type,
                label: node.label.value,
                position: {
                    x: node.position.x,
                    y: node.position.y
                }
            })),
            edges: funnel.getEdges().map(edge => ({
                from: edge.from.value,
                to: edge.to.value
            }))
        };
    }

    static toDomain(dto: FunnelDTO): Funnel {
        const funnel = new Funnel();

        dto.nodes.forEach(({ id, type, label, position }) => {
            funnel.addNode(
                new FunnelNode(
                    NodeId.create(id),
                    type as NodeType,
                    NodeLabel.create(label),
                    new NodePosition(position.x, position.y)
                )
            );
        });

        dto.edges.forEach(({ from, to })=> {
            funnel.connectNodes(NodeId.create(from), NodeId.create(to));
        });

        return funnel;
    }
}
