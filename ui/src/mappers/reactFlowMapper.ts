import {Funnel, NodeType} from "../../../domain";

export function getNodeConnectionType(type: NodeType) {
    switch (type) {
        case NodeType.THANK_YOU:
            return 'output'
        default:
            return 'default'
    }
}

export function funnelToReactFlow(funnel: Funnel) {
    const nodes = funnel.getNodes().map(node => ({
        id: node.id.value,
        type: getNodeConnectionType(node.type),
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
