import {getAppDependencies} from '../plugins/dependencies';
import {NodePalette} from "../components/sidebar/NodePalette.tsx";
import {FunnelCanvas} from "../components/canvas/FunnelCanvas.tsx";
import {useFunnelState} from "../state/useFunnelState.ts";

function App() {
    const { funnelState: initialFunnelState } = getAppDependencies();
    const funnelState = useFunnelState(initialFunnelState);

    return (
        <div className="h-screen flex">
          <NodePalette onAddNode={(t) => console.log({ t })} />
          <FunnelCanvas funnelState={funnelState} />
      </div>
    )
}

export default App
