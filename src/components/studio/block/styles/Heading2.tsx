import { BlockStyleProps } from "sanity";
import BaseHeading from "./BaseHeading";

export default function Heading2(props: BlockStyleProps) {
  return <BaseHeading as="h3" {...props} />;
}
