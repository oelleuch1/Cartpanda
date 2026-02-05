import { NodeType } from "../../../../domain";

/**
 *
 * import React from 'react';
 * import { useDnD } from './DnDContext';
 *
 * export default () => {
 *   const [_, setType] = useDnD();
 *
 *   const onDragStart = (event, nodeType) => {
 *     setType(nodeType);
 *     event.dataTransfer.effectAllowed = 'move';
 *   };
 *
 *   return (
 *     <aside>
 *       <div className="description">You can drag these nodes to the pane on the right.</div>
 *       <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
 *         Input Node
 *       </div>
 *       <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
 *         Default Node
 *       </div>
 *       <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
 *         Output Node
 *       </div>
 *     </aside>
 *   );
 * };
 */

export interface NodePaletteProps {
    onAddNode: (type: NodeType) => void
}

export function NodePalette({ onAddNode }: NodePaletteProps) {
    return (
        <aside className="w-64 bg-white border-r p-4 space-y-2">
            <h2 className="font-semibold mb-2">Pages</h2>

            {Object.values(NodeType).map(type => (
                <button
                    key={type}
                    className="w-full px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-left"
                    onClick={() => onAddNode(type)}
                >
                    {type.replace("_", " ")}
                </button>
            ))}
        </aside>
    );
}
