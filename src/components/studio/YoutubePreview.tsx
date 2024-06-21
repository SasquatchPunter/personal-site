import type { PreviewProps } from "sanity";

import { Flex, Text } from "@sanity/ui";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function YoutubePreview(props: PreviewProps) {
  const { title: url } = props;

  const YoutubePlayer = useMemo(
    () => dynamic(import("react-player/youtube"), { ssr: false }),
    []
  );

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
