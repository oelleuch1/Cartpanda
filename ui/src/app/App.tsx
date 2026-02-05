import { getAppDependencies } from "../plugins";
import { NodePalette, FunnelCanvas } from "../components";
import { useFunnelState, DnDProvider } from "../state";
import { ReactFlowProvider } from "@xyflow/react";

function App() {
  const { funnelState: initialFunnelState } = getAppDependencies();
  const funnelState = useFunnelState(initialFunnelState);

  return (
    <ReactFlowProvider>
      <DnDProvider>
        <div className="h-screen flex">
          <NodePalette />
          <FunnelCanvas funnelState={funnelState} />
        </div>
      </DnDProvider>
    </ReactFlowProvider>
  );
}

export default App;
