import { NodeType } from "../../../../domain";
import {NodePaletteItem} from "./NodePaletteItem.tsx";
import {getNodeConnectionType} from "../../mappers/reactFlowMapper.ts";

export function NodePalette() {
    return (
        <aside className="w-64 bg-white border-r p-4 space-y-2">
            <h2 className="font-semibold mb-2">Pages</h2>
            {Object.values(NodeType).map(type => (
              <NodePaletteItem type={type} connectionType={getNodeConnectionType(type)} key={type} />
            ))}
        </aside>
    );
}
