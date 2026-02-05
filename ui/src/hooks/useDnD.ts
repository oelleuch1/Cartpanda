import { useContext } from "react";
import { DnDContext, type DnDContextType } from "../state";

export function useDnD(): DnDContextType {
  return useContext(DnDContext);
}
