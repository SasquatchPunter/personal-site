import dynamic from "next/dynamic";
import { useMemo } from "react";

import CursorHover from "@/src/components/CursorHover";

export default function Youtube(props: any) {
  const Player = useMemo(
    () => dynamic(import("react-player/youtube"), { ssr: false }),
    []
  );
  return (
    <div className="w-full h-96">
      <CursorHover
        enterEffect="hide"
        leaveEffect="unhide"
        className="size-full"
      >
        <Player
          url={props.value.url}
          controls={true}
          width="100%"
          height="100%"
        />
      </CursorHover>
    </div>
  );
}
