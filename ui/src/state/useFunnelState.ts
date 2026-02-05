import { useState, useCallback, useMemo } from "react";
import { Funnel } from "../../../domain";
import { FunnelState } from "../../../application";
import type { UseFunnelStateReturn } from "../types";

export type { UseFunnelStateReturn } from "../types";

export function useFunnelState(initial: FunnelState): UseFunnelStateReturn {
  const [version, setVersion] = useState(0);

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

  return useMemo(
    () => ({
      get funnel() {
        return initial.getCurrent();
      },
      update,
      undo,
    }),
    [initial, update, undo],
  );
}
