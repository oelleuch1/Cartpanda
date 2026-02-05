import {FunnelNode} from "./FunnelNode";
import {FunnelEdge} from "./FunnelEdge";
import {NodeId} from "../value-objects/NodeId";
import {NodePosition} from "../value-objects/NodePosition";
import {DomainResult, DomainResultErrorFactory} from "../shared/DomainResult";
import {FunnelErrorCode} from "../shared/FunnelError";
import {FunnelValidator} from "../services/FunnelValidator";

export class Funnel {
    private nodes: FunnelNode[] = [];
    private edges: FunnelEdge[] = [];

    getNodes(): FunnelNode[] {
        return [...this.nodes];
    }

    getEdges(): FunnelEdge[] {
        return [...this.edges];
    }

    addNode(node: FunnelNode) {
        this.nodes.push(node);
    }

    moveNode(id: NodeId, position: NodePosition): DomainResult<void> {
       const node = this.nodes.find(node => node.id.equals(id));

       if (!node) {
           return DomainResultErrorFactory.createFunnelError(FunnelErrorCode.NODE_NOT_FOUND)
       }
       node.moveTo(position);
       return { ok: true }
    }

    connectNodes(from: NodeId, to: NodeId): DomainResult<void> {
        const fromNode = this.nodes.find(node => node.id.equals(from));
        const toNode = this.nodes.find(node => node.id.equals(to));

        if (!fromNode) {
            return DomainResultErrorFactory.createFunnelError(FunnelErrorCode.NODE_NOT_FOUND);
        }

        if (!toNode) {
            return DomainResultErrorFactory.createFunnelError(FunnelErrorCode.NODE_NOT_FOUND);
        }

        if (!FunnelValidator.isValidEdge(fromNode)) {
            return DomainResultErrorFactory.createFunnelError(FunnelErrorCode.CANNOT_HAVE_OUTGOING_EDGE);
        }

        if (FunnelValidator.isExistingEdge(this.edges, from, to)) {
            return DomainResultErrorFactory.createFunnelError(FunnelErrorCode.EDGE_ALREADY_EXISTS);
        }

        this.edges.push(new FunnelEdge(from, to));
        return { ok: true };
    }

    removeNode(id: NodeId) {
        const node = this.nodes.find(node => node.id.equals(id));
         if (!node) {
             return DomainResultErrorFactory.createFunnelError(FunnelErrorCode.NODE_NOT_FOUND)
         }

         this.nodes = this.nodes.filter(node => !node.id.equals(id));
         this.edges = this.edges.filter(edge => !edge.from.equals(id) && !edge.to.equals(id))
        return { ok: true };
    }

    removeEdge(edge: FunnelEdge) {
        this.edges = this.edges.filter(e => !e.equals(edge));
    }
}