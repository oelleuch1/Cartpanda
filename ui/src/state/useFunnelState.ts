import { useState } from "react";
import { Funnel } from "../../../domain";
import {FunnelState} from "../../../application";

export function useFunnelState(initial: FunnelState) {
    const [state, setState] = useState<FunnelState>(initial);

    return {
        get funnel() {
            return state.getCurrent();
        },

        update(next: Funnel) {
            setState(prev => {
                prev.update(next);
                return prev;
            });
        },

        undo() {
            setState(prev => {
                prev.undo();
                return prev;
            });
        }
    };
}
