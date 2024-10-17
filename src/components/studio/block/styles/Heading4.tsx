import type { BlockStyleProps } from "sanity";
import BaseHeading from "./BaseHeading";

export default function Heading4(props: BlockStyleProps) {
  return <BaseHeading as="h5" {...props} />;
}
