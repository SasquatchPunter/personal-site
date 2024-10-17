import type { PreviewProps } from "sanity";
import { Stack, Text, Card } from "@sanity/ui";

export default function DefaultImage(
  props: PreviewProps & { caption?: string }
) {
  const { caption } = props;
  return (
    <Stack>
      {props.renderDefault(props)}
      <Card padding={2}>
        <Text size={1}>{caption}</Text>
      </Card>
    </Stack>
  );
}
