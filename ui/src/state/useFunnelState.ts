import { useState, useCallback, useMemo } from "react";
import { Funnel } from "../../../domain";
import { FunnelState } from "../../../application";
import type { UseFunnelStateReturn } from "../types";

export type { UseFunnelStateReturn } from "../types";

/**
 * React hook that wraps FunnelState and triggers re-renders on state changes.
 * Uses a version counter to force React to detect changes.
 */
export function useFunnelState(initial: FunnelState): UseFunnelStateReturn {
  const [version, setVersion] = useState(0);

  // Force re-render by incrementing version
  const forceUpdate = useCallback(() => {
    setVersion((v) => v + 1);
  }, []);

  const update = useCallback(
    (next: Funnel) => {
      initial.update(next);
      forceUpdate();
    },
    [initial, forceUpdate],
  );

  const undo = useCallback(() => {
    initial.undo();
    forceUpdate();
  }, [initial, forceUpdate]);

  // Memoize to maintain stable reference while allowing funnel to update
  return useMemo(
    () => ({
      get funnel() {
        return initial.getCurrent();
      },
      update,
      undo,
    }),
    [initial, update, undo, version],
  );
}
