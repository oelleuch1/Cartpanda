import { NodePosition, NodeId, FunnelEdge, NodeType } from "../../../../domain";
import type { DomainContext } from "../../types";
import type { DomainResult } from "../../../../domain";

function withSnapshot<T>(
  ctx: DomainContext,
  operation: () => DomainResult<T>,
  onSuccess: () => void = () => ctx.refreshUI(),
): void {
  ctx.appFunnelState.saveSnapshot();
  const result = operation();
  if (result.ok) onSuccess();
}


export function executeNodeMove(
  ctx: DomainContext,
  nodeId: string,
  position: { x: number; y: number },
): void {
  withSnapshot(
    ctx,
    () =>
      ctx.moveNode.execute(
        ctx.funnel,
        NodeId.create(nodeId),
        new NodePosition(position.x, position.y),
      ),
  );
}


export function executeNodeRemove(ctx: DomainContext, nodeId: string): void {
  withSnapshot(ctx, () =>
    ctx.removeNode.execute(ctx.funnel, NodeId.create(nodeId)),
  );
}


export function executeEdgeRemove(
  ctx: DomainContext,
  sourceId: string,
  targetId: string,
): void {
  withSnapshot(ctx, () => {
    const edge = new FunnelEdge(
      NodeId.create(sourceId),
      NodeId.create(targetId),
    );
    return ctx.removeEdge.execute(ctx.funnel, edge);
  });
}


export function executeNodeConnect(
  ctx: DomainContext,
  sourceId: string,
  targetId: string,
): void {
  withSnapshot(ctx, () =>
    ctx.connectNodes.execute(
      ctx.funnel,
      NodeId.create(sourceId),
      NodeId.create(targetId),
    ),
  );
}


export function executeNodeAdd(
  ctx: DomainContext,
  nodeType: NodeType,
  position: NodePosition,
): void {
  withSnapshot(ctx, () => ctx.addNode.execute(ctx.funnel, nodeType, position));
}
