import {type ReactNode} from "react";
import {FileText, GripVertical, PartyPopper, ShoppingCart, TrendingDown, TrendingUp} from 'lucide-react';
import {NodeType} from "../../../../domain";
import {cn} from '../../utils/tailwind';
import {useDnD} from "../../state/DnDContext";

export type NodePaletteItemProps = {
    type: NodeType
}

const createNodePaletteItem = (type: NodeType): { label: string, icon: ReactNode } => {
    switch (type) {
        case NodeType.SALES:
            return { label: 'Sales', icon: <FileText className="w-5 h-5" /> }
        case NodeType.ORDER:
            return { label: 'Order', icon: <ShoppingCart className="w-5 h-5" /> }
        case NodeType.UPSELL:
            return { label: 'Up sell', icon: <TrendingUp className="w-5 h-5" /> }
        case NodeType.DOWNSELL:
            return { label: 'Down sell', icon: <TrendingDown className="w-5 h-5" /> }
        case NodeType.THANK_YOU:
            return { label: 'Thank you', icon: <PartyPopper className="w-5 h-5" /> }
    }
}

export function NodePaletteItem({ type }: NodePaletteItemProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setType] = useDnD();
    const item = createNodePaletteItem(type);

    const onDragStart = (event: DragEvent, nodeType: NodeType) => {
        setType?.(nodeType);
        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = 'move';
        }
    };

   return (
       <div
           draggable
           onDragStart={(event) => onDragStart(event, type)}
           className={cn(
               'flex items-center gap-3 p-3 rounded-lg border border-border cursor-grab',
               'transition-all duration-200 active:cursor-grabbing active:scale-95',
               'bg-card hover:shadow-md',
           )}
           role="button"
           tabIndex={0}
           aria-label={`Drag to add ${item.label}`}
       >
           <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />
           <div className="flex-shrink-0'">
               {item.icon}
           </div>
           <div className="flex-1 min-w-0">
               <div className="font-medium text-sm text-foreground truncate">
                   {item.label}
               </div>
               <div className="text-xs text-muted-foreground truncate">
                   {type === NodeType.THANK_YOU ? 'End of funnel' : `Connect to next step`}
               </div>
           </div>
       </div>
   )
}