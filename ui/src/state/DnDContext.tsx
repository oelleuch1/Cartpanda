import { type ReactNode, useState } from "react";
import { NodeType } from "../../../domain";
import { DnDContext } from "./dndContextValue";

export type { DnDContextType } from "./dndContextValue";
export { DnDContext } from "./dndContextValue";

export function DnDProvider({ children }: { children: ReactNode }) {
  const [type, setType] = useState<NodeType | null>(null);

  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
}
