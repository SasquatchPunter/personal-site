import { useContext } from "react";
import { CursorContext } from "@/src/contexts/CursorContext";

export default function useCursorContext() {
  return useContext(CursorContext);
}
