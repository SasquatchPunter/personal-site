import { BlockStyleProps } from "sanity";
import BaseAnchoredHeading from "./BaseAnchoredHeading";

export default function AnchoredHeading1(props: BlockStyleProps) {
  return <BaseAnchoredHeading as="h2" {...props} />;
}
