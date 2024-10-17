import type { BlockStyleProps } from "sanity";
import { LinkIcon } from "@sanity/icons";
import { Heading, Inline, Box } from "@sanity/ui";

const dimensions = {
  h2: { paddingTop: 4, paddingBottom: 4, size: 4 },
  h3: { paddingTop: 4, paddingBottom: 3, size: 3 },
  h4: { paddingTop: 4, paddingBottom: 3, size: 2 },
  h5: { paddingTop: 4, paddingBottom: 3, size: 1 },
};

interface Props {
  as: "h2" | "h3" | "h4" | "h5";
}
export default function BaseAnchoredHeading({
  children,
  as,
}: BlockStyleProps & Props) {
  const { paddingTop, paddingBottom, size } = dimensions[as];
  return (
    <Box
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      className="[&_svg]:hover:opacity-75"
    >
      <Heading as={as} size={size}>
        <Inline>
          {children}
          <Box marginLeft={2}>
            <LinkIcon className="opacity-25" />
          </Box>
        </Inline>
      </Heading>
    </Box>
  );
}
