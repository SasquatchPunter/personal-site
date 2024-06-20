import dynamic from "next/dynamic";

const Player = dynamic(import("react-player/youtube"), { ssr: false });

export default function Youtube(props: any) {
  return <Player url={props.value.url} controls={true} />;
}
