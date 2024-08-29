import useCursorContext from "@/src/hooks/useCursorContext";
import { useEffect } from "react";

export default function Cursor() {
  const { ref, pos, actions } = useCursorContext();

  useEffect(() => {
    if (ref.current && actions) {
      document.addEventListener("scroll", actions.scroll);
      document.addEventListener("mousemove", actions.move);
      document.addEventListener("mouseenter", actions.unhide);
      document.addEventListener("mouseleave", actions.hide);
    } else {
      document.removeEventListener("scroll", actions.scroll);
      document.removeEventListener("mousemove", actions.move);
      document.removeEventListener("mouseenter", actions.unhide);
      document.removeEventListener("mouseleave", actions.hide);
    }

    return () => {
      document.removeEventListener("scroll", actions.scroll);
      document.removeEventListener("mousemove", actions.move);
      document.removeEventListener("mouseenter", actions.unhide);
      document.removeEventListener("mouseleave", actions.hide);
    };
  }, [ref]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.top = `${pos.y + pos.sY}px`;
      ref.current.style.left = `${pos.x + pos.sX}px`;
    }
  }, [pos]);

  return <div ref={ref} id="cursor"></div>;
}
