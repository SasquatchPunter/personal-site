import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Youtube(props: any) {
  const Player = useMemo(
    () => dynamic(import("react-player/youtube"), { ssr: false }),
    []
  );
  return (
    <div className="w-full h-96">
      <Player
        url={props.value.url}
        controls={true}
        width="100%"
        height="100%"
      />
    </div>
  );
}
