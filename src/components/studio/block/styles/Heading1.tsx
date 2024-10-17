import type { BlockStyleProps } from "sanity";
import BaseHeading from "./BaseHeading";

export default function Heading1(props: BlockStyleProps) {
  return <BaseHeading as="h2" {...props} />;
}
