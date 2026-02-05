import { Funnel } from "../../../domain";

export function funnelToReactFlow(funnel: Funnel) {
    const nodes = funnel.getNodes().map(node => ({
        id: node.id.value,
        position: {
            x: node.position.x,
            y: node.position.y
        },
        data: {
            label: node.label.value
        }
    }));

    const edges = funnel.getEdges().map(edge => ({
        id: `${edge.from.value}-${edge.to.value}`,
        source: edge.from.value,
        target: edge.to.value
    }));

    return { nodes, edges };
}
