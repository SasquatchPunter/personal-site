import { BlockStyleProps } from "sanity";
import { Heading } from "@sanity/ui";

const dimensions = {
  h2: { size: 4 },
  h3: { size: 3 },
  h4: { size: 2 },
  h5: { size: 1 },
};

interface Props {
  as: "h2" | "h3" | "h4" | "h5";
}
export default function BaseHeading({ as, children }: BlockStyleProps & Props) {
  const { size } = dimensions[as];
  return (
    <Heading as={as} size={size}>
      {children}
    </Heading>
  );
}
