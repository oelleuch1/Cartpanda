import { createContext, type Dispatch, type SetStateAction } from "react";
import { NodeType } from "../../../domain";
import type { DnDContextType } from "../types";

export type { DnDContextType } from "../types";

/** Default no-op setter for context */
const noopSetter: Dispatch<SetStateAction<NodeType | null>> = () => {};

export const DnDContext = createContext<DnDContextType>([null, noopSetter]);
