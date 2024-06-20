import dynamic from "next/dynamic";

const Player = dynamic(import("react-player/youtube"), { ssr: false });

export default function Youtube(props: any) {
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
