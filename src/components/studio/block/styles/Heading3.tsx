import { BlockStyleProps } from "sanity";
import BaseHeading from "./BaseHeading";

export default function Heading3(props: BlockStyleProps) {
  return <BaseHeading as="h4" {...props} />;
}
