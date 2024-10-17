import type { BlockStyleProps } from "sanity";
import BaseAnchoredHeading from "./BaseAnchoredHeading";

export default function AnchoredHeading3(props: BlockStyleProps) {
  return <BaseAnchoredHeading as="h4" {...props} />;
}
