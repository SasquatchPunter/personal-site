import type { PreviewProps } from "sanity";

import { Flex, Text } from "@sanity/ui";
import dynamic from "next/dynamic";

const YoutubePlayer = dynamic(import("react-player/youtube"), { ssr: false });

export default function YoutubePreview(props: PreviewProps) {
  const { title: url } = props;

  return (
    <Flex padding={3} align="center" justify="center">
      {typeof url === "string" ? (
        <YoutubePlayer url={url} />
      ) : (
        <Text>Add a YouTube URL</Text>
      )}
    </Flex>
  );
}
