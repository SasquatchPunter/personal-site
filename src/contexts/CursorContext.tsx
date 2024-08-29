import { createContext, useMemo, useRef, useState } from "react";

type ContextDefault = {
  ref: React.RefObject<HTMLDivElement>;
  pos: { x: number; y: number; sX: number; sY: number };
  actions: {
    move: (event: MouseEvent) => void;
    scroll: (event: Event) => void;
    activate: () => void;
    deactivate: () => void;
    hide: () => void;
    unhide: () => void;
  };
};

export const CursorContext = createContext<ContextDefault>({
  ref: { current: null },
  pos: { x: 0, y: 0, sX: 0, sY: 0 },
  actions: {
    move() {},
    scroll() {},
    activate() {},
    deactivate() {},
    hide() {},
    unhide() {},
  },
});

interface Props {
  children: React.ReactNode;
}
export default function Provider({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [pos, setPos] = useState({ x: 0, y: 0, sX: 0, sY: 0 });

  const actions = useMemo(() => {
    return {
      move: (event: MouseEvent) => {
        setPos(({ sX, sY }) => ({
          x: event.clientX,
          y: event.clientY,
          sX,
          sY,
        }));
      },
      scroll: () => {
        setPos(({ x, y }) => ({
          x,
          y,
          sX: window.scrollX,
          sY: window.scrollY,
        }));
      },
      activate: () => {
        ref.current?.classList.add("cursor-active");
      },
      deactivate: () => {
        ref.current?.classList.remove("cursor-active");
      },
      hide: () => {
        ref.current?.classList.add("cursor-hidden");
      },
      unhide: () => {
        ref.current?.classList.remove("cursor-hidden");
      },
    };
  }, [ref]);

  return (
    <CursorContext.Provider value={{ ref, pos, actions }}>
      {children}
    </CursorContext.Provider>
  );
}
