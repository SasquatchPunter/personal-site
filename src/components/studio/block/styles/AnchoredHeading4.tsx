import type { BlockStyleProps } from "sanity";
import BaseAnchoredHeading from "./BaseAnchoredHeading";

export default function AnchoredHeading4(props: BlockStyleProps) {
  return <BaseAnchoredHeading as="h5" {...props} />;
}
