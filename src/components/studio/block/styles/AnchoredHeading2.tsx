import { BlockStyleProps } from "sanity";
import BaseAnchoredHeading from "./BaseAnchoredHeading";

export default function AnchoredHeading2(props: BlockStyleProps) {
  return <BaseAnchoredHeading as="h3" {...props} />;
}
